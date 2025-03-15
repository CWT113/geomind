# Camera类

## 属性



## 方法

### flyToBoundingSphere

[`flyToBoundingSphere`](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html?classFilter=camera#flyToBoundingSphere) 用于平滑地 **将相机移动到指定的包围球的位置**，并调整相机视角以适应包围球的大小。

语法：

```js
viewer.camera.flyToBoundingSphere(boundingSphere, options)
```

参数：

|      参数      |        描述        |
| :------------: | :----------------: |
| boundingSphere |  要查看的球体边界  |
|    options     | 配置对象，详见 API |

```js
const viewer = new Cesium.Viewer("cesiumContainer", {
  infoBox: false,
});

const boundingSphere = new Cesium.BoundingSphere(
  Cesium.Cartesian3.fromDegrees(108.948024, 34.263161, 20000), // center
  500.0 // radius
);

viewer.camera.flyToBoundingSphere(boundingSphere, {
  duration: 3,
  // 偏移量
  offset: new Cesium.HeadingPitchRange(
    Cesium.Math.toRadians(26.4),
    Cesium.Math.toRadians(-24),
    250
  ),
  complete: () => {
    console.log("飞行完毕！");
  },
});
```

