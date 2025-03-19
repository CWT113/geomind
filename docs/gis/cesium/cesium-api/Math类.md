# Math类

## toDegrees

将弧度转换为角度。

```js
// 弧度 -> 角度
const degrees = Cesium.Math.toDegrees(Math.PI)
console.log(degrees) // 180
```



## toRadians

将角度转换为弧度。

```js
// 角度 -> 弧度
const radians = Cesium.Math.toRadians(180)
console.log(radians) // 3.141592653589793
```



## randomBetween

生成一个指定范围内的随机数。

```js
const random = Cesium.Math.randomBetween(1, 10)
console.log(random)
```

