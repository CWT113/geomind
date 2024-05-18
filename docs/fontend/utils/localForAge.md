# localForAge

>Github：https://github.com/localForage/localForage

>推荐文章：https://juejin.cn/post/7275943591410483258



前端本地化存储常用的方案有 Web Storage（localStorage、sessionStorage），但是它有明显的缺点：

- 存储量有限：Web Storage 的存储大小只有 5M 左右；
- 存取不方便：存储时需要序列化，取值的时候需要反序列化；
- 存取是同步操作：当 Web Storage 中存储信息太多时，前端取值会导致页面卡顿；



为了解决存储量较大，不影响前端获取卡顿等问题，可以使用 IndexedDB 存储，它具有如下优势：

- 存储量大：IndexedDB 的存储大小在 500M， 甚至更多；
- 存取方便：存储时不需要序列化，并且可以直接存储字符串、对象、数组等，并且取值不需要序列化；
- 存取可以异步操作：查询可以异步化，不影响页面加载；



IndexedDB 原始的存储和获取比较麻烦，但是第三方库 localForAge 却大大简化了操作 IndexedDB 的操作。



## 安装

使用 pnpm 安装包：

```typescript
// 安装
pnpm i localforage

// 导入
import localforage from "localforage"
```



## 基本使用

由于 IndexedDB 存储都是异步的，返回值是一个 Promise，所以推荐使用 `.then()` 或 `async/await` 操作。

```typescript
// 创建 indexedDB 存储库
const store = localforage.createInstance({
  name: "UserDB"
});

// 存储数据
await store.setItem("user", { name: "Alkaid", age: 18 });

// 获取数据（返回值是 Promise，所以使用异步获取）
const result = await store.getItem("User");

// 移除数据
await store.removeItem("User");

// 清理数据库
await store.clear();
```



## 搭配 Pinia 使用

::: code-group

```typescript [useIndexedDB.ts]
// useIndexedDB.ts
import { defineStore } from "pinia";
import localforage from "localforage";

export const useIndexDBStore = defineStore("indexDB", {
  state: () => ({
    userDB: localforage.createInstance({
      name: "UserDB"
    })
  }),
  actions: {
    async setUserDB(key: string, value: any) {
      if (!key) return;
      await this.userDB.setItem(key, value);
    },
    async getUserDB(key: string) {
      return await this.userDB.getItem(key);
    },
    async removeUserDB(key: string) {
      if (!key) return;
      await this.userDB.removeItem(key);
    },
    async clear() {
      await this.userDB.clear();
    }
  }
});

```

```vue [App.vue]
<template>
  <h2>{{ user?.name }}</h2>
  <h2>{{ user?.age }}</h2>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, toRaw } from "vue";
import { useIndexedDBStore } from "./stores/useIndexedDB";

const store = useIndexedDBStore();

const person = reactive({
  name: "张三",
  age: 18
});

const user = ref<{ name: string; age: number }>();

onMounted(async () => {
  // 设置数据
  await store.setUserDB("Person", toRaw(person));

  // 获取数据
  user.value = await store.getUserDB("Person");

  // 清理数据库
  await store.clear();
});
</script>
```

:::