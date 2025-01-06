# WeakMap和Map

## WeakMap

`WeakMap` 是一种 **键值对** 的集合，键必须是 **对象** 或 **Symbol** ，而值可以是任意的 JavaScript 类型，并且值不会创建对它键的强引用。

换句话说，一个对象作为 `WeakMap` 的键存在，当该对象被垃圾回收时，那么它对应的值也就成为了垃圾回收的候选对象。

::: tip 思考

>为什么简单数据类型不能作为 WeakMap 的键呢？

1. 因为大多数简单数据类型可以被任意的创建，且没有生命周期，因此不能作为键；
2. 对象和 Symbol 都可以作为键，是因为他们具有生命周期，所有可以被垃圾回收；

:::

但是，`WeakMap` 也存在缺点：

- **不可枚举性**：`WeakMap` 中键值对是不可枚举的，也就是不能通过遍历获取它的键和值；

- **垃圾回收的性能开销**：`WeakMap` 相比于 `Map` 可能性能提升了，因为具备了垃圾回收，但是 `WeakMap` 本身需要垃圾回收去追踪，这也是一种性能开销；



常用方法：

| 方法               | 作用                          |
| ------------------ | ----------------------------- |
| set(object, value) | 向 WeakMap 添加键值对         |
| get(object)        | 从 WeakMap 获取指定键         |
| has(object)        | 判断 WeakMap 中是否存在指定键 |
| delete(object)     | 从 WeakMap 删除指定键         |

```js
const wMap = new WeakMap()

const obj = { foo: 1 }
wMap.set(obj, "foo")

wMap.get(obj)

wMap.has(obj)

wMap.delete(obj)
```



## Map

`Map` 用来存储 **键值对** 集合，且集合内的键不可重复。

但 `Map` 的键可以是任意类型，由于 `Map` 中的键和值存在强引用，这种引用使得垃圾回收算法不能及时处理并进行回收，很有可能发生内存泄漏。



常用属性：

| 属性 | 作用               |
| ---- | ------------------ |
| size | Map 集合的元素数量 |

常用方法：

| 方法            | 作用                       |
| --------------- | -------------------------- |
| set(key, value) | 向 Map 中添加键值对        |
| get(key)        | 从 Map 中获取指定键        |
| has(key)        | 判断  Map 中是否存在指定键 |
| delete(key)     | 从 Map 中删除指定键        |

```js
const map = new Map();
map.set("a", 1);

map.get("a");

map.has("a");

map.delete("a");

const size = map.size;
```

常用遍历方法：

| 方法          | 作用                   |
| ------------- | ---------------------- |
| forEach       | 遍历                   |
| for..of..     | 遍历                   |
| map.keys()    | 获取 Map 的所有键      |
| map.values()  | 获取 Map 的所有值      |
| map.entries() | 返回一个新的可迭代对象 |

```js [7]
const map = new Map([
  ["a", 100],
  ["b", 200]
]);

// 注意参数是 (value, key)
map.forEach((value, key) => console.log(key, value))

for (const [key, value] of map) {
  console.log(key, value)
}
for (const key of map.keys()) {
  console.log(key)
}
for (const value of map.values()) {
  console.log(value)
}

for (const [key, value] of map.entries()) {
  console.log(key, value)
}
```