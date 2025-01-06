# lodash

## uniqBy

作用：对象数组去重。

```js
const array = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 1, name: "tom" }
];
// lodash
const res = _.uniqBy(array, "id");
```

::: details 仿写

```js [仿写]
const res = uniqBy(array, "id");

function uniqBy(array, key) {
  const set = new Set();
  return array.filter(item => {
    const field = item[key];
    if (set.has(field)) {
      return false;
    } else {
      set.add(field);
      return true;
    }
  });
}
```

:::



## countBy

作用：统计字段值累计出现的次数。

```js
const array = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 1, name: "tom" },
  { id: 3, name: "Jane" }
];
// lodash
const res = _.countBy(array, "name");
```

::: details 仿写

```js [仿写]
const res = countBy(array, "name");

function countBy(collection, key) {
  return collection.reduce((acc, item) => {
    const val = item[key];
    acc[val] = (acc[val] || 0) + 1; // acc默认为{}，字段首次出现时acc[val]为undefined，默认赋值为0
    return acc;
  }, {});
}
```

:::



## groupBy

作用：对数组按照指定字段进行分组。

```js
const array = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 1, name: "tom" },
  { id: 3, name: "Jane" }
];
// lodash
const res = _.groupBy(array, "name");
```

::: details 仿写

```js [仿写]
const res = groupBy(array, "name");

function groupBy(collection, key) {
  return collection.reduce((acc, item) => {
    const field = item[key];
    if (!acc[field]) {
      acc[field] = [];
    }
    acc[field].push(item);
    return acc;
  }, {});
}
```

:::



## maxBy & minBy

作用：对数组按照指定字段，获取最大值所在元素并返回。

```js
const arr = [
  { id: 1, name: "John", age: 12 },
  { id: 2, name: "Jane", age: 30 },
  { id: 3, name: "tom", age: 10 },
  { id: 4, name: "lili", age: -19 }
]
// lodash
const max = _.maxBy(arr, "age") // { id: 2, name: "Jane", age: 30 }
const min = _.minBy(arr, "age") // { id: 4, name: "lili", age: -19 }
```

::: details

::: code-group

```js {6,12} [lodash]
const max = maxBy(arr, "age") // { id: 2, name: "Jane", age: 30 }
const min = minBy(arr, "age") // { id: 4, name: "lili", age: -19 }

function maxBy(array, key) {
  return array.reduce((acc, item) => {
    return item[key] > (acc[key] || -Infinity) ? item : acc // 特别注意首个元素比较时的初始值
  }, {})
}

function minBy(array, key) {
  return array.reduce((acc, item) => {
    return item[key] > (acc[key] || Infinity) ? acc : item
  }, {})
}
```

```js {5} [radash]
const max = maxBy(arr, f => f?.age) // { id: 2, name: "Jane", age: 30 }

function maxBy(array, iteratee) {
  return array.reduce((acc, item) => {
    return iteratee(item) > (iteratee(acc) || -Infinity) ? item : acc
  }, {})
}
```

:::

:::









