# Entity 实体

cesium 中空间数据可视化 API 共分为 2 部分：

- `Entity` 实体：由 Primitive 图元封装组成，调用方便，但是加载大量数据时效率没有 Primitive 高；
- `Primitive` 图元：灵活性高，更接近 webGL 的底层，没有像 Entity 一样带有附加属性，加载大量数据时效率更高；

>参考文章：
>
>1. https://blog.csdn.net/appleshowc/article/details/123479194
>2. https://juejin.cn/post/6974592888420171790



<br/>

## [点实体](http://cesium.xin/cesium/cn/Documentation1.62/PointGraphics.html)

创建点实体的方法有两种：

- 方法 1：

  ```js
  const position = Cesium.Cartesian3.fromDegrees(102.7362, 38.0249, 0);
  
  const point = new Cesium.Entity({
      position: position,
      // 点样式
      point: {
          color: Cesium.Color.RED,
          // 大小
          pixelSize: 20
      }
  });
  
  // 将点添加到视图中
  viewer.entities.add(point);
  // 将视角飞行到点要素处
  viewer.zoomTo(point, {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-90),
      range: 500 // 距离中心点的高度
  });
  ```

- 方法 2：

  ```js
  const position = Cesium.Cartesian3.fromDegrees(102.7362, 38.0249, 0);
  
  const point = viewer.entities.add({
      // id 必须唯一
      id: "point",
      position: position,
      point: {
          color: Cesium.Color.RED,
          pixelSize: 20
      }
  });
  viewer.zoomTo(point);
  ```



## [线实体](http://cesium.xin/cesium/cn/Documentation1.62/PolylineGraphics.html)

```js
const polyline = viewer.entities.add({
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
            102.73523, 38.02712, 102.73625, 38.02405
        ]),
        // 材质
        material: Cesium.Color.RED.withAlpha(0.5),
        // 线宽
        width: 5
    }
});

viewer.zoomTo(polyline);
```



## [多边形](http://cesium.xin/cesium/cn/Documentation1.62/PolygonGraphics.html)

```js
```































