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





















