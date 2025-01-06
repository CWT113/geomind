# Javascript

## Object.assign()

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
   
   // 浅拷贝
   const obj2 = Object.assign({}, obj1);
   obj2.b.c = 4;
   
   console.log(obj2); // { a: 1, b: { c: 4 } }
   console.log(obj1); // { a: 1, b: { c: 4 } }
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

   

## if else优化

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



## for..in..

遍历数组，返回 index 索引，遍历对象，返回元素的 key 。

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



## for..of..

遍历数组，直接返回元素的值，<span style="color: #e63e31">不能用来遍历对象</span>。

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
