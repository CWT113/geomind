# pinia-plugin-persistedstate

Github：[prazdevs/pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate)

官网：[Pinia Plugin Persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)



pinia-plugin-persistedstate 是 Pinia 存储持久化的插件。



## 安装

1. 使用 pnpm 包管理器安装插件：

   ```sh
   pnpm install pinia-plugin-persistedstate
   ```

2. 将插件添加到 pinia 实例中：

   ::: code-group

   ```ts [默认配置] {5}
   import { createPinia } from 'pinia'
   import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
   
   const pinia = createPinia()
   pinia.use(piniaPluginPersistedstate)
   ```

   ```ts [自定义配置] {4-10}
   import { createPinia } from "pinia";
   import { createPersistedState } from "pinia-plugin-persistedstate";
   
   const namespace = "pinia-demo";
   pinia.use(
     createPersistedState({
       key: storeKey => `${namespace}-${storeKey}`,
       storage: localStorage
     })
   );
   ```

   :::



## 用法

简单的使用方法是，在声明 store 时，将 `persist` 选项设置为 `true`。

```ts {12}
import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    count: 1
  }),
  getters: {
    double: state => state.count * 2
  },
  actions: {
    increment() {
      this.count++;
    }
  },
  persist: true
});
```

```vue
<template>
  <div>count: {{ count }}</div>
  <button @click="increment()">+1</button>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "./stores/index.ts";

const store = useStore();

const { count, double } = storeToRefs(store);
const { increment } = store;
</script>
```

::: success storeToRefs的用法？

从 store 中直接解构属性，包括 state 和 getters，都会让其失去响应式，要想保持响应式，就需要用到 [`storeToRefs()`](https://pinia.vuejs.org/zh/core-concepts/#%E4%BB%8E-Store-%E8%A7%A3%E6%9E%84)。

:::









































