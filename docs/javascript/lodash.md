# lodash

## _.uniqBy

作用：对象数组去重。

```js
const array = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John' },
]

// lodash
const uniqueArray = _.uniqBy(array, 'id')
// javascript																															 // [!code ++]
const mapArray = [...new Map(array.map(item => [item.id, item])).values()] // [!code ++]
```
