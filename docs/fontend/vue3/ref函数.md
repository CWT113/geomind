# ref 家族

## ref

在 Vue 3 中，`ref` 是一个用于创建响应式数据的函数。它的基本用法是通过 `ref`函数创建一个包装对象，该对象具有 `.value` 属性，任何对 `.value` 的修改都会触发响应式更新。

```Vue
<template>
  <h2>{{ name }}</h2>
  <button @click="changeName">按钮</button>
</template>

<script setup>
import { ref } from "vue";

const name = ref("tom");

function changeName() {
  name.value = "job.mis.wang";
}
</script>
```

## toRef

`toRef` 用于创建一个指向源对象某个属性的 ref 对象。这个函数可以用于将**对象的某个属性转换为响应式数据**，方便在组件中使用。

::: tip

1. 从响应式对象中解构出来的值，会失去响应式，此时可以使用 toRef 函数再将其变为响应式。
2. 通过 `toRef` 创建的 ref 对象是一个独立的响应式对象，**修改它的值不会影响原始对象**，反之亦然。
   :::

```Vue
<template>
  <h2>{{ name }}</h2>
  <h2>{{ age }}</h2>
  <button @click="changeName">按钮</button>
</template>

<script setup>
import { toRef, reactive } from "vue";

const person = reactive({
  name: "tom",
  age: 30
});

// 注意：从响应式对象中解构的值，会失去响应式！
let { name1, age1 } = person;

let name = toRef(person, "name");
let age = toRef(person, "age");

function changeName() {
  name.value = "job.mis.wang";
  age.value++;
}
</script>
```

## toRefs

上面的 toRef 示例中，我们可以学习到 toRef 每次只能对对象的某一个属性进行响应式的转换，要想直接将一个对象转换为响应式该怎么办呢？

`toRefs` 用于将**响应式对象的所有属性转换为 `ref`对象**。这个函数通常用于在 `setup` 函数中处理传入的 props 对象，以便在模板中能够更方便地访问和修改这些属性。

::: tip

1. 通过 `toRefs` 转换得到的 ref 对象与原始对象的属性之间是**双向绑定**的，因此修改任一方都会影响另一方。
   :::

```Vue
<template>
  <h2>{{ name }}</h2>
  <h2>{{ age }}</h2>
  <button @click="changeName">按钮</button>
</template>

<script setup>
import { toRefs, reactive } from "vue";

const person = reactive({
  name: "tom",
  age: 30
});

// 把整个对象变为响应式，此时可以使用解构的语法
let { name, age } = toRefs(person);

function changeName() {
  name.value = "job.mis.wang";
  age.value++;
}
</script>
```

## isRef

在 Vue3 中提供了一个 `isRef` 的辅助函数，用于检查一个值是否为 ref 对象。当确定一个值是否已经被包装成响应式对象时，可以使用。

如果值是 ref 对象，则返回 `true`；否则，返回 `false`。

```Vue
<template>
  <h2>{{ name }}</h2>
  <h2>{{ age }}</h2>
  <button @click="changeName">按钮</button>
</template>

<script setup>
import { isRef, toRefs, reactive } from "vue";

const person = reactive({
  name: "tom",
  age: 30
});

let { name, age } = toRefs(person);

function changeName() {
  console.log(isRef(name));  // true
  console.log(isRef(age));   // true

  console.log(isRef(person.name)); // false
}
</script>
```

## unref

在 Vue3 中提供了一个 `unref` 的辅助函数，用于获取 ref 对象的原始值。通常，在模板中使用 ref 对象时，Vue3 会自动解包，但在某些情况下，你可能需要显式地获取 ref 对象的原始值。

其实，unRef 就是一个语法糖：

```JavaScript
val = isRef(name) ? name.value : name;
```

下面示例演示 `unref` 的使用方法：

```Vue
<template>
  <h2>{{ name }}</h2>
  <button @click="changeName">按钮</button>
</template>

<script setup>
import { unref, ref } from "vue";

const name = ref("tom");

function changeName() {
  // vue3 自动解包
  console.log(name.value);

  // unref 获取原始值
  let name1 = unref(name);
  console.log(name1);
}
</script>
```

## shallowRef

`shallowRef` 也可以创建一个响应式的对象，但是与 `ref` 不同的是 `shallowRef` 创建的对象只会对对象进行**浅层次的响应式处理**，这意味着只有对象的第一层属性会变成响应式，而嵌套的内部属性不会成为响应式。

```Vue
<template>
  <h2>{{ name.a.b.c }}</h2>
  <h2>{{ age.a.b.c }}</h2>
  <button @click="changeName">按钮</button>
</template>

<script setup>
import { ref, shallowRef } from "vue";

const name = ref({
  a: {
    b: {
      c: "tom"
    }
  }
});

const age = shallowRef({
  a: {
    b: {
      c: 666
    }
  }
});

function changeName() {
  name.value.a.b.c = "job.mis.wang";
  age.value.a.b.c++; // 第一次的时候会触发更新，后续断开响应式
}
</script>
```

## triggerRef

它可以让浅层的 `ref` ，即 `shallowRef` 深层属性发生改变的时候强制触发更改，比如上面的 age 属性，当为它加入 `triggerRef`之后，就可以一直是响应式了。

```Vue
<template>
  <h2>{{ name.a.b.c }}</h2>
  <h2>{{ age.a.b.c }}</h2>
  <button @click="changeName">按钮</button>
</template>

<script setup>
import { ref, shallowRef, triggerRef } from "vue";

const name = ref({
  a: {
    b: {
      c: "tom"
    }
  }
});

const age = shallowRef({
  a: {
    b: {
      c: 666
    }
  }
});

function changeName() {
  name.value.a.b.c = "job.mis.wang";

  age.value.a.b.c++;
  triggerRef(age); // 强制让 age 属性变为响应式，强制触发更新
}
</script>
```

## customRef

`customRef` 是 Vue3 提供的一个函数，用于创建自定义的 ref 对象。通过 `customRef`，你可以定义自己的获取器和设置器来实现对 ref 对象的完全自定义控制。

感觉 ref 底层就是使用 customRef 实现的。🤣🤣

```Vue
<template>
  <h2>{{ name }}</h2>
  <button @click="changeName">按钮</button>
</template>

<script setup>
import { ref, customRef } from "vue";

const name = customRef((track, trigger) => {
  let value = "tom";

  return {
    get() {
      track(); 				// 依赖追踪
      return value;
    },
    set(newValue) {
      trigger(); 			// 触发更新
      value = newValue;
    }
  };
});

function changeName() {
  console.log(name.value); // tom

  name.value = "job.mis.wang";
}
</script>
```
