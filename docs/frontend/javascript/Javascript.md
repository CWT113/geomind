# 基础使用

## Object.assign()

::: success 提示

1. 如果有重复的属性，则后面对象会覆盖掉前面对象的属性；
2. 原对象中的第一层属性不是浅拷贝，第二层嵌套的对象就是浅拷贝了；

:::

::: code-group


   ```javascript [属性覆盖] {11}
   const obj = {
     name: 'tom',
     age: 20,
   };
   
   const newObj = {
     name: '王一博'
   };
   
   // 会更改 obj 原对象，返回值是合并后的对象
   const res = Object.assign(obj, newObj);
   console.log(res); // {name: '王一博', age: 20, hobby: 'football'}
   console.log(obj); // {name: '王一博', age: 20, hobby: 'football'}
   ```

   ```javascript [属性浅拷贝] {10,13,16}
   const obj = {
     name: 'tom',
     age: 20,
     hobby: {
       a: 'music',
       b: 'football'
     }
   };
   
   const newObj = Object.assign({}, obj);
   console.log(newObj); // 原样复制一份
   
   newObj.name = '王一博';
   console.log(obj); // newObj对象的第一层属性更新，不会影响obj对象
   
   newObj.hobby.a = 'basketball';
   console.log(obj); // newObj对象中嵌套对象的值更新，obj的值也会跟着改变
   ```

:::



## for in循环

```javascript {5}
const array = [1, 2, 3, 4, 5];

// 遍历数组，返回 index 索引
for (const index in array) {
  const value = array[index];
  console.log(value);
}
```

```js {5}
const obj = {name: '王一博', age: 20, hobby: 'football'};

// 遍历对象，返回元素的 key
for (const key in obj) {
  const value = obj[key];
  console.log(value);
}
```



## for of循环

for of循环 **不能用来遍历对象**，遍历数组时会直接返回元素值。

```js
const array = [1, 2, 3, 4, 5];

// 遍历数组，直接返回数组元素值
for (const element of array) {
  console.log(element);
}
```
