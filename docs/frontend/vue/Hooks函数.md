---
date: 2026-05-18 16:48:34
---

# Hooks 函数

组合式函数（Hooks）是利用 Vue 组合式 API 来封装和复用“**具有相同状态的逻辑**”的函数。

它有两个核心特征：

- 内部可以使用 Vue 的响应式 API，例如：`ref`、`computed`、`onMounted` 等；
- 通常以 `useXxx` 开头命名，遵循社区的约定俗成；

> [!NOTE] 优势
>
> - 解决 Mixins 的缺点：
>   - **命名冲突**：Mixins 中定义的变量如果和组件同名，会被覆盖且毫无提示。而 Hooks 则通过函数值接收，可以随意重命名（解构赋值）；
>   - **数据来源不明**：一个组件挂在多个 Mixin 时，很难一眼看出某个变量来自哪一个 Mixin；
> - 高内聚低耦合：在 vue2 中，处理一个功能的代码会被分散在 data、methods 之中，而 Hooks 允许把 **同一个功能的所有响应式状态和业务逻辑** 打包塞进一个函数中，方便管理；
> - 更好的类型推导：对 TS 支持更好，函数的输入、输出一目了然；



## 追踪鼠标坐标

```ts
import { onMounted, onUnmounted, ref } from "vue";

export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  onMounted(() => {
	window.addEventListener("mousemove", update);
  });

  onUnmounted(() => {
	window.removeEventListener("mousemove", update);
  });

  function update(event: MouseEvent) {
	x.value = event.pageX;
	y.value = event.pageY;
  }

  return { x, y };
}
```
