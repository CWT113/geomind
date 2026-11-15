---
date: 2026-05-18 16:39:47
---

# render 函数

上一节中的 `h()` 函数主要用来 **创建 VNode 虚拟节点**。而 `render()` 函数则是 **负责将 VNode 虚拟节点渲染到真实的 DOM 容器中**，并且可以进行更新和卸载。



## 基本使用

```typescript
import { h, render } from 'vue';

// 真实的 DOM 容器
const container = document.createElement('div');
document.body.appendChild(container);

// 使用 h() 创建虚拟节点
const vnode = h(
  'div',
  {
    class: 'hello',
    style: {
      color: 'red',
      fontSize: '20px',
    },
  },
  'Hello Vue3'
);

// 将 虚拟节点 渲染到 container 容器中
render(vnode, container); // [!code ++]
```

最终页面上的 DOM 结构类似于：

```html
<body>
  <div>
    <div class="hello" style="color: red; font-size: 20px;">
      Hello Vue3
    </div>
  </div>
</body>
```





## 更新 DOM

`render()` 函数和 `h()` 函数另一个区别就是 `render()` 函数可以根据 DOM 节点的内容自动进行更新。

例如下面的代码首次渲染时，页面显示 “第一次渲染”：

```typescript {6}
import { h, render } from 'vue';

const container = document.createElement('div');
document.body.appendChild(container);

render(h('p', '第一次渲染'), container);
```

但是当我再次调用 `render()` 时：

```typescript
render(h('p', '第二次渲染'), container);
```

此时，container 容器中并不会简单的再追加一个新的 `p` 标签，而是将上一次容器内的内容进行替换。

> [!NOTE] 提示 
>
> 对于同一个由 Vue 管理的容器，Vue 会通过新旧 VNode 的比较，尽可能复用节点并只更新发生变化的部分。



## 卸载节点

只需要执行：

```typescript
// 卸载节点
render(null, container); // [!code ++]

// 如果不再使用容器，也可以删除容器
container.remove();
```



## 和 createApp 的区别

`render()` 和 `createApp()` 都能把 Vue 组件显示到页面中，但是二者的定位不同。

主要区别：

| 对比项   | render()                  | createApp()       |
| :------: | :-----------------------: | :---------------: |
| 主要用途 | 把虚拟节点渲染到真实 DOM 中 | 创建 Vue 应用示例   |
| 传入参数 | VNode、容器               | 根组件、可选 Props |
| 插件注册 | 不提供应用实例 | 支持 app.use() |
| 全局组件注册 | 不提供应用实例 | 支持 app.component() |
| 推荐场景 | 底层封装、特殊动态挂载 | 独立 Vue 应用或组件挂载 |

::: code-group

```typescript {8} [render()]
import { h, render } from 'vue';
import MyComponent from './MyComponent.vue';

const container = document.createElement('div');
document.body.appendChild(container);

// 创建组件 VNode
const vnode = h(MyComponent);

// 将 VNode 渲染到指定容器
render(vnode, container); // [!code ++]

// 卸载
render(null, container); // [!code ++]
container.remove();
```

```typescript [createApp()]
import { createApp } from 'vue';
import MyComponent from './MyComponent.vue';

const container = document.createElement('div');
document.body.appendChild(container);

// 创建独立 Vue 应用
const app = createApp(MyComponent); // [!code ++]

// 挂载应用
app.mount(container); // [!code ++]

// 卸载整个 Vue 应用
app.unmount(); // [!code ++]
container.remove();
```

:::





