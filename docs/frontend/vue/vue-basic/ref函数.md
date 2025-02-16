# ref家族

## ref

在 Vue3 中，`ref` 是一个用于**创建响应式数据**的函数，该对象具有 `.value` 属性，任何对 `.value` 的修改都会触发响应式更新。

```Vue {9,11}
<template>
  <h2>{{ name }}</h2>
  <button @click="changeName">按钮</button>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const name = ref<string>("tom");

  const changeName = () => name.value = "job";
</script>
```



## toRef

`toRef` 用于将普通对象的某**一个属性**转换为响应式数据。

::: success 提示

1. 从响应式对象中解构出来的值，会失去响应式，此时可以使用 `toRef` 函数再将其变为响应式。
2. 通过 `toRef` 创建的 ref 对象是一个独立的响应式对象，**修改它的值不会影响原始对象**。

:::

```Vue {18,19}
<template>
  <h2>{{ newName }} -- {{ newAge }}</h2>
  <button @click="changeName">按钮</button>
</template>

<script setup lang="ts">
  import { toRef, reactive } from "vue";

  const person = reactive({
    name: "tom",
    age: 30
  });

  // 从响应式对象中解构的值，会失去响应式！
  let { name, age } = person;

  // 把 name 和 age 重新转换为 ref 对象
  const newName = toRef(name);
  const newAge = toRef(age);

  const changeName = () => {
    newName.value = "job";
    newAge.value++;
  };
</script>
```



## toRefs

上面的 toRef 每次只能把对象的某一个属性进行响应式的转换，而 `toRefs` 用于将 响应式对象的**所有属性**转换为 `ref`对象。

::: success 提示

1. 通过 `toRefs` 转换得到的 ref 对象与原始对象的属性之间是 **双向绑定** 的，修改任一方都会影响另一方。

:::

```Vue {15}
<template>
  <h2>{{ name }} -- {{ age }}</h2>
  <button @click="changeName">按钮</button>
</template>

<script setup lang="ts">
  import { toRefs, reactive } from "vue";

  const person = reactive({
    name: "tom",
    age: 30
  });

  // 把整个对象的所有属性，都变为响应式属性
  const { name, age } = toRefs(person);

  const changeName = () => {
    name.value = "job";
    age.value++;
  };
</script>
```



## isRef

 `isRef` 用于检查一个值是否为 ref 对象。如果值是 ref 对象，则返回 `true`，否则返回 `false`。

```Vue
<script setup lang="ts">
  import { isRef, toRefs, reactive } from "vue";

  const person = reactive({
    name: "tom",
    age: 30
  });

  const { name, age } = toRefs(person);

  console.log(isRef(name));         // true
  console.log(isRef(age));          // true

  console.log(isRef(person.name));  // false
</script>
```



## unref

 `unref` 用于获取 ref 对象的原始值。其实，`unRef` 就是一个语法糖：

```js
const val = isRef(name) ? name.value : name;
```

下面示例演示 `unref` 的使用方法：

```Vue {6}
<script setup lang="ts">
  import { unref, ref } from "vue";

  const name = ref("tom");

  const newName = unref(name);
  console.log(newName); // tom
</script>
```



## shallowRef

`shallowRef` 也可以创建一个响应式的对象，但是与 `ref` 不同的是 `shallowRef` 创建的对象只会对对象进行**浅层次的响应式处理**，这意味着只有对象的第一层属性会变成响应式，而嵌套的内部属性不会成为响应式。

```Vue
<template>
  <h2>{{ age.a.b }}</h2>
  <button @click="changeName">按钮</button>
</template>

<script setup lang="ts">
  import { shallowRef } from "vue";

  const age = shallowRef({
    a: {
      b: 100
    }
  });

  const changeName = () => age.value.a.b++; // 没有效果
</script>
```



## triggerRef

它可以让 `shallowRef` 的深层属性强制触发更改，比如下面的 age 属性，当为它加入 `triggerRef`之后，就可以一直是响应式了。

```Vue {16}
<template>
  <h2>{{ age.a.b }}</h2>
  <button @click="changeName">按钮</button>
</template>

<script setup>
  import { shallowRef, triggerRef } from "vue";

  const age = shallowRef({
    a: {
      b: 100
    }
  });

  function changeName() {
    triggerRef(age);
    age.value.a.b++;    // 触发响应式
  }
</script>
```



## customRef

`customRef` 用于创建自定义的 ref 对象。通过 `customRef`，你可以定义自己的 getter 和 setter 来实现对 ref 对象的完全自定义控制。

```Vue
<template>
  <h2>{{ name }}</h2>
  <button @click="changeName">按钮</button>
</template>

<script setup lang="ts">
  import { customRef } from "vue";

  const name = customRef((track, trigger) => {
    let value = "tom";

    return {
      get() {
        track(); 		// 依赖追踪
        return value;
      },
      set(newValue) {
        trigger(); 	// 触发更新
        value = newValue;
      }
    };
  });

  const changeName = () => {
    name.value = "job";         // 触发 get
    console.log(name.value);    // 触发 set
  };
</script>
```
