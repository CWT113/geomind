# h 函数

在 Vue3 中，`h()` 是 hyperscript 的简称，用于创建虚拟 DOM 节点的函数，它是 createApp 函数返回的应用实例上的一个方法。

`h()`的作用是生成虚拟DOM节点，而不是直接操作真实的DOM节点。通过将虚拟DOM节点进行组合和更新，Vue会自动将更改应用到实际的DOM上，以实现界面渲染。



`h()`的基本语法如下：

```vue
h(tag, props, children)
```

参数解释：

- `tag`：要创建的元素的标签名或组件名，如 "div"、"p"、HellpView组件。
- `props`：包含一个元素属性的对象，如：class、style、onclick等。
- `children`：子节点，可以是字符串、嵌套的 h 函数、包含其他节点的数组。



## 基本用法

### 创建 vnodes

`h()` 函数的使用方式非常的灵活：

```vue
<template>
    <render />
</template>
```

```vue
<script setup lang="ts">
import { h } from "vue";

// 普通元素
const render = h("div", "hello");
// <div>hello</div>

// 添加 id 属性
const render = h("div", { id: "foo" }, "hello");
// <div id="foo">hello</div>

// 添加 class 属性
const render = h("div", { class: "bar" }, "hello");
// <div class="bar">hello</div>

// 添加动态 class 属性
const foo = "foo";
const bar = true;
// foo 直接取决于变量 foo 的值，而 bar 取决于 bar 的 bool 值(真值渲染,表示假的值不渲染)
const render = h("div", { class: [foo, { bar }] }, "hello");
// <div class="foo bar">hello</div>

// 添加 style 属性
const render = h(
  "div",
  { style: { color: "red", backgroundColor: "blue" } },
  "hello"
);
// <div style="color: red; background-color: blue;">hello</div>

// 添加事件
const render = h("button", { onClick: () => {} }, "按钮");

// 添加 children 子元素
const render = h("div", [h("span", "hello"), h("span", "world")]);
// <div> <span>hello</span> <span>world</span> </div>

const render = h("div", ["hello", h("span", "world")]);
// <div> hello <span>world</span> </div>
</script>
```



### 声明渲染函数

当组合式 API 与模板一起使用时，可以在 template 中直接使用生成的渲染函数：

```vue
<template>
  <render />
</template>

<script setup lang="ts">
import { h } from "vue";

const props = defineProps({
  title: String
});

const render = h("div", props.title);
</script>
```

除了返回一个 vnode ，你还可以返回数组：

```vue
<script setup lang="ts">
import { h } from "vue";

const props = defineProps({
  title: String
});

const render = () => [
  h("div", "hello world 1"),
  h("div", "hello world 2"),
  h("div", "hello world 3")
];
</script>
```



### vnodes 必须唯一

组件树中的 vnodes 必须是唯一的。下面是错误示范：

```js
// 疑问: vue 官网表示是错误的示范，但却可以这么使用，能够正常渲染 ??
function render() {
  const p = h("p", {}, "hello");
  return h("div", {}, [p, p]);
}
```

如果真的想在页面上渲染多个重复的元素或组件，使用工厂函数，下面是正确示范：

```js
function render() {
  return h(
    "div",
    Array.from({ length: 10 }).map(() => {
      return h(p);
    })
  );
}
```



## 指令

### v-if

模板：

```vue
<div>
  <div v-if="isShow">Hello</div>
  <div v-else>World</div>
</div>
```

`h()` ：

```js
const isShow = ref(true);

const render = () => h("div", [isShow.value ? h("div", "Hello") : h("div", "World")]);
```



### v-for

模板：

```vue
<ul>
    <li v-for="item in list" :key="item.id">{{ item.name }} {{ item.age }}</li>
</ul>
```

`h()`：

```js
const list = ref([
  { id: 1, name: "张三", age: 18 },
  { id: 2, name: "李四", age: 20 },
  { id: 3, name: "王五", age: 22 }
]);

// 不使用解构
const render = () =>
  h(
    "ul",
    list.value.map(item => {
      return h("li", { key: item.id }, item.name, item.age);
    })
  );

// 使用解构
const render2 = () =>
  h(
    "ul",
    list.value.map(({ id, name, age }) => {
      return h("li", { key: id }, name, age);
    })
  );
```



### v-on

以 `on` 开头，并跟着大写字母的 props 会被当作事件监听器。比如，`onClick` 与模板中的 `@click` 等价。

```js
const handleClick = (e, value) => console.log(e, value);

// 方式一
const render = () =>
  h("button", { onClick: e => handleClick(e, "hello") }, "按钮");

// 方式二
const render2 = () =>
  h(
    "button",
    {
      onClick(e) {
        console.log(e);
      }
    },
    "按钮"
  );
```



### v-model

::: code-group

```vue{16,17} [App.vue]
<template>
  <HelloWorldCom />
</template>

<script setup lang="ts">
import { ref, h } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

const title = ref("在细雨中呼喊");
const handleUpdate = (value: string) => {
  title.value = value;
};

// 渲染 HelloWorld 组件
// 注意: 子组件发送 "update:title" 事件，父组件要使用 "onUpdate:title" 来接收
const HelloWorldCom = () =>
  h(HelloWorld, { title: title.value, "onUpdate:title": handleUpdate });
</script>
```

```vue [HelloWorld.vue]
<template>
  <render />
</template>

<script setup lang="ts">
import { h, ref } from "vue";

const props = defineProps({
  title: String
});
const emits = defineEmits(["update:title"]);

const render = () =>
  h(
    "button",
    {
      onClick() {
        emits("update:title", "活着");
      }
    },
    props.title
  );
</script>
```

:::



## slot 插槽

::: code-group

```vue [App.vue]
<script setup lang="ts">
import { ref, h } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

const HelloWorldCom = () =>
  h(HelloWorld, null, {
    default: () => "默认插槽",
    nameSlot: () => [h("div", "具名插槽")],
    // 作用域插槽
    scopedSlot: (slots: { name: string; age: number }) => {
      return [h("div", slots?.name), h("div", slots?.age)];
    }
  });
</script>
```

```vue [HelloWorld.vue]
<script setup lang="ts">
import { h, ref } from "vue";

const slots = defineSlots();

const render = () =>
  h("div", [
    slots.default?.(),
    slots.nameSlot?.(),
    slots.scopedSlot?.({ name: "张三", age: 20 })
  ]);
</script>
```

:::



## 组件实例

```vue
<script setup lang="ts">
import { ref, h } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

const HelloWorldRef = ref<instanceType<typeof HelloWorld>>();

const HelloWorldCom = () => h(HelloWorld, { ref: HelloWorldRef });
</script>
```
