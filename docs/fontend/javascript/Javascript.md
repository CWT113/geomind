# Javascript

## 对象

### 合并对象

1. `Object.assign()` 方法

::: tip 注意

1. `Object.assign()` 方法中，后面对象的属性会覆盖前面对象的属性；
2. `Object.assign()` 方法 是**浅拷贝**，不是深拷贝；

:::


   ```js
   const obj1 = { a: 1, b: "str", c: true };
   const obj2 = { c: false, d: 6 };
   
   const result = Object.assign(obj1, obj2);  // { a: 1, b: "str", c: false, d: 6 }
   ```

   ```js
   const obj1 = { a: 1, b: { c: 2 } };
   
   // 把 obj1 浅拷贝一份
   const obj2 = Object.assign({}, obj1);
   obj2.b.c = 4;
   
   console.log(obj2); // { a: 1, b: { c: 4 } }
   console.log(obj1); // { a: 1, b: { c: 4 } }
   ```

2. lodash 库的 `_.assign()` 方法：

```js
const obj1 = { a: 1, b: "str", c: true };
const obj2 = { c: false, d: 6 };

_.assign(obj1, obj2);	// { a: 1, b: "str", c: false, d: 6 }
```




## 浅拷贝

1. lodash 库的 `_.clone()` 方法：

```js
var objects = [{ 'a': 1 }, { 'b': 2 }];
 
var shallow = _.clone(objects);
console.log(shallow[0] === objects[0]);  // true
```



## 深拷贝

1. `JSON.parse` + `JSON.stringify`：

   ```js
   const obj1 = { a: 1, b: { c: 2 }, d: [1, 2] };
   
   const obj4 = JSON.parse(JSON.stringify(obj1));
   obj4.b.c = 5;
   console.log(obj1);				// { a: 1, b: { c: 2 }, d: [ 1, 2 ] }
   console.log(obj4);				// { a: 1, b: { c: 5 }, d: [ 1, 2 ] }
   ```

2. lodash 库的 `_.cloneDeep()` 方法：

   ```js
   var objects = [{ 'a': 1 }, { 'b': 2 }];
    
   var deep = _.cloneDeep(objects);
   console.log(deep[0] === objects[0]);  // false
   ```

3. 手写深拷贝：

   ```js
   function deepClone(obj) {
     if (obj === null || typeof obj !== "object") return obj;
     const clonedObj = Array.isArray(obj) ? [] : {};
     for (const key in obj) {
       if (obj.hasOwnProperty(key)) {
         clonedObj[key] = deepClone(obj[key]);
       }
     }
     return clonedObj;
   }
   
   const obj5 = deepClone(obj1);
   obj5.b.c = 6;
   console.log(obj1);				// { a: 1, b: { c: 2 }, d: [ 1, 2 ] }
   console.log(obj5);				// { a: 1, b: { c: 6 }, d: [ 1, 2 ] }
   ```

   

## map 替换 if..else..

::: code-group

```js [if else写法]
const array = [
    { title: "未启用", state: "未反馈" },
    { title: "已启用", state: "已反馈" }
];

array.forEach(item => {
    if (item.title == "未启用") {
        item.title = "0";
    } else if (item.title == "已启用") {
        item.title = "1";
    }
    if (item.state == "未反馈") {
        item.state = "0";
    } else if (item.state == "已反馈") {
        item.state = "1";
    }
});
```

```js [map写法]
const accept = {
    未启用: "0",
    已启用: "1"
};
const appoint = {
    未反馈: "0",
    已反馈: "1"
};

array.forEach(item => {
    item.title = accept[item.title];
    item.state = appoint[item.state];
});
```

:::



## for..in.. 和 for..of..

1. `for..in..`

- 遍历数组，返回元素的 index

- 遍历对象，返回元素的 key

  ```js
  const array = [10, 20, 30, 40, 50];
  
  for (const index in array) {
      console.log(index); 			// 0 1 2 3 4
      console.log(arr[index]);		// 10 20 30 40 50
  }
  ```

  ```js
  const obj = { name: "tom", age: 20 };
  
  for (const key in obj) {
      console.log(key);				// name age
      console.log(obj[key]);			// tom 20
  }
  ```

2. `for..of..`

- 遍历数组，返回元素的 值

- <span style="color: #e63e31">**不能遍历对象哦！**</span>

  ```js
  const array = [10, 20, 30, 40, 50];
  
  for (const value of array) {
      console.log(value);				// 10 20 30 40 50
  }
  ```

  

## promise

### promise.all()

`promise.all()` 同时发起多个请求：

```js
// 正常请求
const users = await getUsers();
const infos = await getInfos();

// promise.all()
const [users1, infos1] = await Promise.all([getUsers(), getInfos()]);
```



### promise.allSettled()

`promise.allSettled()` 也可以用来同时发起多个请求，与 `promise.all()` 不同的是，它的返回值是带有 Promise 成功或失败状态的：

```js
const [users1, infos1] = await Promise.allSettled([getUsers(), getInfos()]);

console.log(users1); // { status: 'fulfilled', value: [ '123' ] }
```



## Set

Set 相当于是集合的数据结构，即 值与值，不允许存在重复的值。

1. 基本使用：

   ```js
   const set = new Set();
   
   set.add(1);
   set.add(2);
   
   set.delete(1);
   
   set.clear();
   
   const res = set.has(1);
   ```

2. 遍历 `Set`：

   ```js
   // forEach
   set2.forEach(value => console.log(value));
   
   // for..of..
   for (const value of set2) {
     console.log(value);
   }
   
   // iterator 迭代器
   const iterator1 = set3.values();
   for (const value of iterator1) {
     console.log(value);
   }
   
   // entries 键值对
   const iterator2 = set2.entries();
   for (const entry of iterator2) {
     console.log(entry);
   }
   ```



## Map

`Map` 相当于是字典的数据结构，即 键值对类型的有序列表，键和值可以是任意类型，但同一个键只能出现一次，不允许存在重复的键。

Map 的特点：

- 键值对：Map 中每个元素都是键值对，键和值可以是任意类型。

- 无序：Map 中的元素是无序的，插入顺序不会影响迭代顺序。

- 高效：Map 在查找、插入、删除等操作方面效率较高。

  

1. 基本使用：

   ```js
   const map = new Map();
   
   map.set("a", 1);
   map.set("b", 2);
   
   const a = map.get("a");
   
   const res = map.has("a");
   
   map.delete("a");
   
   const size = map.size;
   ```

   

2. 遍历 `Map`：

   ```js
   const map = new Map([
     ["a", 100],
     ["b", 200]
   ]);
   
   // 注意: forEach 遍历的时候是 (value, key)
   map.forEach((value, key) => console.log(key, value));
   
   // for..of
   for (const [key, value] of map) {
     console.log(key, value);
   }
   
   // 遍历所有的 key
   const keys = map.keys();
   for (const key of keys) {
     console.log(key);
   }
   // 遍历所有的 value
   const values = map.values();
   for (const value of values) {
     console.log(value);
   }
   
   // entries 键值对
   const entries = map.entries();
   for (const [key, value] of entries) {
     console.log(key, value);
   }
   ```

   































