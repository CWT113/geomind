# WeakSet和Set

## WeakSet

`WeakSet` 是可以被垃圾回收的值的集合，它的值必须是 **对象或Symbol**（因为简单数据类型没有生命周期，可以随意创建，所以不能被垃圾回收），并且在集合中的值 **不可重复**。

它和 `Set` 对象的主要区别：

- `WeakSet` 只能是对象和Symbol的集合，它不能像 `Set` 一样包含任意类型的任意值；
- `WeakSet` 中对象的引用持弱引用，当对象没有其他强引用时，该对象就会自动被垃圾回收；
- `WeakSet` 由于其弱引用的性质，它是不可遍历的；

常用方法：

| 方法          | 作用                          |
| ------------- | ----------------------------- |
| add(value)    | 向 WeakSet 中添加值           |
| delete(value) | 删除 WeakSet 中的值           |
| has(value)    | 判断 WeakSet 中是否存在指定值 |

```js
const wset = new WeakSet()

const obj1 = { name: "tom" }
const symbol = Symbol("hello")

wset.add(obj1)
wset.add(symbol)

const res1 = wset.has(obj1) // true
const res2 = wset.has(symbol) // true

wset.delete(symbol)
```



## Set

`Set` 集合允许存储**任何类型**的唯一值。

Set 特点：

- 唯一性：Set 集合中的元素都是唯一的，不可重复；
- 有序性：Set 按照 add() 方法向集合有序的插入元素；
- 可遍历：Set 是可迭代对象，可以使用迭代方法（for..of..）遍历；

常用属性：

| 属性 | 作用             |
| ---- | ---------------- |
| size | 获取集合元素数量 |

常用方法：

| 方法          | 作用                       |
| ------------- | -------------------------- |
| add(value)    | 向集合中添加新值           |
| delete(value) | 从集合中删除指定值         |
| has(value)    | 判断集合中是否包含特定的值 |
| clear()       | 移除集合中的所有值         |

```js
const set = new Set()

set.add(1)
set.add("a")
set.add(true)
set.add({ name: "tom" })

const size = set.size // 4

const res = set.has("a") // true

set.delete(true)
set.clear()
```

常用遍历方法：

| 方法          | 作用                                                         |
| ------------- | ------------------------------------------------------------ |
| forEach()     | 循环                                                         |
| for..of..     | 循环                                                         |
| set.Keys()    | set.Values() 的别名                                          |
| set.Values()  | 返回新的迭代器对象                                           |
| set.entries() | 返回新的迭代器对象，该对象包含 Set 对象中每个元素的 [key, value] 数组，key == value |

```js
set.forEach(item => console.log(item))

for (const item of set) {
  console.log(item)
}
for (const item of set.keys()) {
  console.log(item)
}
for (const item of set.values()) {
  console.log(item)
}

for (const [key, value] of set.entries()) {
  console.log(key)
  console.log(value)
}
```



### 与数组关系

| 方法            | 作用                                    |
| --------------- | --------------------------------------- |
| Array.from(set) | 把 Set 集合转换为普通数组               |
| [...set]        | 使用扩展运算符把 Set 集合转换为普通数组 |
| new Set(array)  | 把 数组变为 Set 集合                    |

```js
const set = new Set()
set.add(1)
set.add("a")
set.add(true)
set.add({ name: "tom" })

// Set对象转换为普通数组
const array = Array.from(set)
// 使用扩展运算符把 Set 对象转换为普通数组
const array2 = [...set1]

// 将 Array 转换为 Set
const set1 = new Set(array)

// 用于从数组中删除重复元素
const numbers = [2, 3, 4, 4, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 5, 32, 3, 4, 5];
console.log([...new Set(numbers)]);
```

