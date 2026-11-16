---
date: 2026-05-18 16:49:59
---

# Diff 算法

Vue3 中的 Diff 算法，是一种用于比较新旧虚拟 DOM 差异，并尽可能减少真实 DOM 操作的更新算法。

它的核心思想是：当响应式数据发生变化时，不直接销毁旧的 DOM 并重新创建，而是比较新旧虚拟 DOM，找到需要修改的部分，然后更新真实 DOM。



## 基本原理

Diff 算法有一个重要的判断规则：**先判断新旧节点是否是同一个类型的节点**。

```typescript
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key
}
```

其中：

- `type`：节点类型，例如 `div`、`span` 或 Vue 组件；
- `key`：节点的唯一标识，用于区分同级节点；



### 新旧节点类型不同

```html
<!-- 旧虚拟 DOM -->
<div>Hello</div>

<!-- 新虚拟 DOM -->
<p>Hello</p>
```

就节点是 `div`，新节点是 `p`。Vue3 判断他们不是同一种节点，会卸载旧节点，再创建新节点。



### 新旧节点类型相同

```html
<!-- 旧虚拟 DOM -->
<div class="red">Hello</div>

<!-- 新虚拟 DOM -->
<div class="blue">Hello</div>
```

节点类型相同，`key` 也相同（这里都没设置），Vue3 会复用原来的 DOM 元素，比较属性和子节点，然后更新变化的部分。

这里的核心函数是 `pitch()` 函数：

```typescript
function patch(oldVNode, newVNode) {
  if (!isSameVNodeType(oldVNode, newVNode)) {
    // 移除旧节点，创建新节点
    replaceNode(oldVNode, newVNode)
    return
  }

  // 复用原来的 DOM
  const el = (newVNode.el = oldVNode.el)
  // 比较并更新属性
  patchProps(oldVNode.props, newVNode.props, el)
  // 比较并更新子节点
  patchChildren(oldVNode, newVNode, el)
}
```



## key 的作用

`key` 是 Diff 算法中最重要的一个属性，用来在 Diff 算法时 **识别列表节点身份** 的重要依据。

> [!CAUTION] 注意
>
> 不推荐在会 插入、删除、排序 的列表中使用索引。这是因为数组元素发生变化时，索引无法稳定的标识每个对象。
>

::: code-group

```vue [推荐写法]
<template>
  <div v-for="item in list" :key="item.id">
    {{ item.name }}
  </div>
</template>
```

```vue [不推荐写法]
<template>
  <div v-for="(item, index) in list" :key="index">
    {{ item.name }}
  </div>
</template>
```

:::



























































