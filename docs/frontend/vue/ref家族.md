---
date: 2026-05-18 16:44:12
---

# ref 家族



## ref

`ref` 用于将普通的 JavaScript 变量包装成一个具有响应式能力的对象。当在组件中修改一个 `ref` 的值时，Vue 内部会 **自动检测变化并更新** 相关的 DOM。

> [!WARNING] 注意
>
> `ref` 默认是 **深层响应式** 的，这意味着在包装一个嵌套对象或数组时，vue 会递归地将所有嵌套属性都变成响应式。这在处理大数据（如几万条数据的表格、Echarts 实例、地图对象）时会导致严重的性能问题。此时推荐使用 `shallowRef` 代替。

```vue {3,14}
<template>
  <!-- 内部自动解包，不需要写 .value -->
  <h2>{{ count }}</h2>
  <button @click="increase">增加</button>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const count = ref(0);

  function increase() {
    // <script setup> 中使用，必须通过 .value 来访问和修改
    count.value++;
  }
</script>
```



## shallowRef

`shallowRef` 专门用于 **浅层响应式引用**，只监听整个对象 `.value` 本身的变化，不会深度代理对象内部的属性。

```vue {24,27}
<template>
  <h2>{{ state.zs.username }}</h2>
  <h2>{{ person.ls.username }}</h2>

	<button @click="handleChange">修改姓名</button>
</template>

<script setup lang="ts">
  import { ref, shallowRef, triggerRef } from "vue";

  const state = shallowRef({
    zs: {
      username: "张三",
    },
  });
  const person = ref({
    ls: {
      username: "李四",
    },
  });

  function handleChange() {
    // ref是深层次引用，这样赋值会触发依赖追踪，导致界面更新
    person.value.ls.username = "李四狗"; // 注意：这里由于 ref 重新触发了界面更新，所以会导致 state.zs.username 也变化了

    // shallowRef浅层次引用，这样赋值不会触发界面更新
    state.value.zs.username = "张三丰";
    // 如果需要，可以使用 triggerRef 强制触发界面更新
    // triggerRef(state); // [!code ++]
  }
</script>
```



## customRef

customRef 用于显式地 **控制依赖追踪**（track）和 **触发响应**（trigger）的时机。这在处理防抖、节流或数据过滤时非常有用。

::: code-group

```vue [响应式防抖] {21,28}
<template>
	<input v-model="keyword" placeholder="请输入关键字搜索"/>
</template>

<script setup lang="ts">
  import { customRef, ref, watch } from "vue";

  const keyword = useDebouncedRef("你好", 500);

  watch(keyword, () => {
    // TODO：发起请求等其他操作
    console.log(keyword.value);
  });

  function useDebouncedRef<T>(originalValue: T, delay: number = 500) {
    let value = originalValue;
    let timer: number;
    return customRef((track, trigger) => {
      return {
        get() {
          track(); // 收集依赖，vue内部自动追踪该值的变化
          return value;
        },
        set(newValue: T) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            value = newValue;
            trigger(); // 触发更新，界面自动更新
          }, delay);
        },
      };
    });
  }
</script>
```

```vue [响应式同步存储]
<template>
  <input v-model="keyword" placeholder="请输入关键字搜索"/>
</template>

<script setup lang="ts">
  import { customRef } from "vue";

  const keyword = useStorageRef("keyword");

  function useStorageRef(key: string, defaultValue = "") {
    return customRef<string>((track, trigger) => {
      let value = localStorage.getItem(key) || defaultValue;
      return {
        get() {
          track();
          return value;
        },
        set(newValue) {
          value = newValue;
          localStorage.setItem(key, newValue);
          trigger();
        },
      };
    });
  }
</script>
```

:::



## toRef 与 toRefs

从 `reactive` 构建的响应式对象中直接解构属性时，得到的解构属性就会失去响应式。

此时就可以通过 `toRef` 或 `toRefs` 在解构的同时，仍 **使解构后的属性保持响应式**。二者的区别在于：`toRef` 只能解构单个属性，而 `toRefs` 可以结构整个对象。

```vue
<template>
  <h2>{{ name }}</h2>
  <h2>{{ age }}</h2>

  <button @click="handleChange">修改姓名</button>
</template>

<script setup lang="ts">
  import { reactive, toRef, toRefs } from "vue";

  const user = reactive({
    name: "Alice",
    age: 25,
  });
  // 直接解构的 name 只是个普通字符串，已经失去响应式了
  const { name } = user; // [!code --]

  // 使用 toRef 解构对象中的单个属性，解构之后仍保持响应式
  const name = toRef(user, "name"); // [!code ++]
  const age = toRef(user, "age"); // [!code ++]
  
  // 使用 toRefs 将整个对象中所有属性都解构，并保持响应式
  const { name, age } = toRefs(user); // [!code ++]

  function handleChange() {
    name.value = "Tom";
    age.value = 30;
  }
</script>
```



## isRef 与 unref

在编写自定义组合式函数时，你无法预测用户传入的是一个普通的值，还是一个 ref 时，就可以使用这两个 API 进行判断：

- `isRef(val)`：判断一个变量是否为 ref；
- `unref(val)`：获取 ref 响应式变量的原始值。本质是一个语法糖：`isRef(val) ? val.value : val;`

```vue {6}
<script setup lang="ts">
  import { isRef, unref, type Ref } from "vue";

  function useSquare(num: number | Ref<number>) {
    // 这里只是演示 isRef 的作用，unref 内部已经解构出原始值了，不需要多此一举判断
    const rawValue = isRef(num) ? unref(num) : num;
    // 直接使用 unref 即可
    const rawValue = unref(num); // [!code ++]
    return rawValue * rawValue;
  }
</script>
```



## toValue

`toValue` 的核心作用是规范化参数。无论传入的是一个普通值、一个 ref 对象、一个 computed、还是一个有返回值的 getter 函数，它都能将其解包最原始的 JavaScript 基础值。

> [!TIP] 建议
>
> 在解包 ref 等响应式变量时，可以优先使用 `toValue` 来平替 `unref`。

```vue
<script setup lang="ts">
  import { onMounted, ref, type Ref, toValue, unref } from "vue";

  const query1 = "/api/user";
  const query2 = ref("/api/user?id=1");
  const query3 = ref("/api/user?id=2&username=zs");

  onMounted(() => {
    useFetch(query1);
    useFetch(query2);
    // 重点区别，toValue 能得到函数的返回值，而 unref 原样返回箭头函数字符串
    useFetch(() => query3.value); // [!code ++]
  });

  function useFetch(url: string | Ref<string> | Function) {
    const unRawUrl = unref(url);
    console.log("unref ==> ", unRawUrl);

    const rawUrl = toValue(url);
    console.log("toValue ==> ", rawUrl);
  }
</script>
```























