# WeakMap和Map

二者对标的数据类型都是对象类型，即存储键值对。



`Map` 可以存储 **键值对** 集合，且集合内的键不可重复，但是 `Map` 的键可以是任意类型，这样就可能会导致内存泄漏，因为 `Map` 中的键和值存在强引用，这种引用使得垃圾回收算法不能及时处理并进行回收，即使他们没有了任何引用关系。

<br />

`WeakMap` 也是一种 **键值对** 的集合，但它的键必须是 **对象** 或 **Symbol** ，而值可以是任意的 JavaScript 类型，并且值不会创建对它键的强引用。

换句话说，一个对象作为 `WeakMap` 的键存在，当该对象被垃圾回收时，那么它对应的值也就成为了垃圾回收的候选对象。

::: tip 思考

>为什么简单数据类型不能作为 WeakMap 的键呢？

1. 因为大多数简单数据类型可以被任意的创建，且没有生命周期，因此不能作为键。
2. 对象和 Symbol 都可以作为键，是因为他们具有生命周期，且可以被垃圾回收。

:::



但是，`WeakMap` 也存在缺点：

- **不可枚举性**：`WeakMap` 中键值对是不可枚举的，也就是不能通过遍历获取它的键和值；

- **垃圾回收的性能开销**：`WeakMap` 相比于 `Map` 可能性能提升了，因为具备了垃圾回收，但是 `WeakMap` 本身需要垃圾回收去追踪，这也是一种性能开销；



## WeakMap

Vue3 响应式系统中及大量使用到了 WeakMap 提升性能，而不是 Map ！

```js
const wMap = new WeakMap()

// 设置值，并返回该 WeakMap 对象
const obj = { foo: 1 }
wMap.set(obj, "foo")

// 获取值，不存在返回 undefined
wMap.get(obj)

// 判断是否存在某个键，返回 boolean 值
wMap.has(obj)

// 删除值
wMap.delete(obj)
```



## Map

```js
const map = new Map();

// 设置值
map.set("a", 1);

// 获取值
map.get("a");

// 判断是否存在某个键
map.has("a");

// 删除值
map.delete("a");

// 获取 Map 对象的大小
const size = map.size;
```

遍历 `Map` 对象的方法：

```js [7]
const map = new Map([
  ["a", 100],
  ["b", 200]
]);

// 注意参数 (value, key)
map.forEach((value, key) => console.log(key, value))

// for..of
for (const [key, value] of map) {
  console.log(key, value)
}

// 遍历所有的 key
const keys = map.keys();
for (const key of keys) {
  console.log(key)
}
// 遍历所有的 value
const values = map.values();
for (const value of values) {
  console.log(value)
}

// entries 键值对
const entries = map.entries();
for (const [key, value] of entries) {
  console.log(key, value)
}
```