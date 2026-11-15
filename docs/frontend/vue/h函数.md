---
date: 2026-05-18 16:39:24
---

# h 函数

`h()` 函数是一个用于 **手动创建虚拟 DOM 节点**（VNode）的工具函数。平时在 vue 文件中写的 `<template>` 模板语法，在底层会被编译成由 h 函数组成的渲染函数。

`h()` 函数最多接受三个参数：
$$
h(type, props, children)
$$

|   参数   | 是否必填 | 作用                                                      |
| :------: | :------: | :-------------------------------------------------------- |
|   type   |    是    | HTML 标签名、Vue 组件、或异步组件                         |
|  props   |    否    | 传给标签或组件的属性                                      |
| children |    否    | 子节点，可以是文本字符串、由 `h()` 组成的数组、或插槽对象 |



## type 属性

```typescript
import { h } from 'vue';

// 创建 div 节点
h('div');

// 创建一个 p 节点
h('p', '这是一段文字');

// 创建一个 button 节点
h('button', '确定');
```

第一个参数中，也可以传入 Vue 组件：

```typescript
import { h } from 'vue';
import MyButton from './MyButton.vue';

// 创建 MyButton 组件对应的 VNode
h(MyButton);
```

> [!WARNING] 注意
>
> `h('MyButton')` 中传入字符串会被当做元素标签名，而不是自动找到你导入的 MyButton 组件。



## props 属性

`props` 可以传入 HTML 属性、CSS 样式、事件监听器等。

```typescript
const vnode = h(
  'button',
  {
    // HTML 属性
    id: 'save-btn',
    title: '保存数据',

    // CSS
    class: 'primary-btn',

    // 内联样式
    style: {
      color: '#fff',
      backgroundColor: '#1677ff',
    },

    // 点击事件
    onClick: () => {
      console.log('按钮被点击');
    },
  },
  '保存'
);
```

特别需要注意事件的命名：

|     template 写法      |        h() 写法        |
| :--------------------: | :--------------------: |
|  @click =“handleClick”  |  onClick: handleClick  |
| @change =“handleChange” | onChange: handleChange |



## children 属性

### 纯文本

直接将纯文本当作子元素插入：

```typescript
h('div', null, 'Hello Vue3');
```

相当于：

```vue
<div>Hello Vue3</div>
```



### 嵌套多个节点

```typescript
h('div', { class: 'container' }, [
  h('h2', '用户信息'),
  h('p', '姓名：张三'),
  h('p', '年龄：25'),
]);
```

相当于：

```vue
<div class="container">
  <h2>用户信息</h2>
  <p>姓名：张三</p>
  <p>年龄：25</p>
</div>
```

由此可见，`h()` 本质上就是一个创建节点的工厂函数。



## 实际使用

实际开发中，最常见的方式是在组件的 `setup` 中 **返回渲染函数**。

```typescript {14}
import { defineComponent, h, ref } from 'vue';

export default defineComponent({
  name: 'MyCounter',

  setup() {
    const count = ref<number>(0);

    const increment = () => {
      count.value++;
    };

    // 返回值必须是一个函数，这样才能在后续视图变化时重新执行
    return () => {
      return h('div', { class: 'counter' }, [
        h('h2', `当前计数：${count.value}`),
        h(
          'button',
          {
            onClick: increment,
          },
          '点击 +1'
        ),
      ]);
    };
  },
});
```

然后在 App.vue 中使用：

```vue
<template>
	<MyCounter />
</template>

<script setup lang="ts">
  import MyCounter from './MyCounter';
</script>
```









