# CallbackProperty

>参考博客：https://blog.51cto.com/u_15349906/5089189
>
>官方 API：https://cesium.com/learn/cesiumjs/ref-doc/CallbackProperty.html?classFilter=CallbackProperty



CallbackProperty 是一个回调函数，主要用于生成 Entity 实体闪烁的效果，如 点的闪烁、面的闪烁、线的延伸等。



## 线延伸

```js
/**
 * @description 线延伸
 */
function lineCallback() {
  let lon, lat, num = 0;
  const line = viewer.entities.add({
    id: "polyline",
    polyline: {
      positions: new Cesium.CallbackProperty(() => {
        num += 0.002;
        lon = 120 + num;
        lat = 30 + num;
        if (lon <= 121) {
          return Cesium.Cartesian3.fromDegreesArray([114, 30, lon, lat]);
        } else {
          viewer.entities.removeAll();
          const line1 = viewer.entities.add({
            polyline: {
              positions: Cesium.Cartesian3.fromDegreesArray([114, 30, 121, 31]),
              material: Cesium.Color.RED,
              width: 5
            }
          });
        }
      }, false),
      material: Cesium.Color.RED,
      width: 5
    }
  });

  viewer.zoomTo(line);
}
```



## 点闪烁

```js
/**
 * @description 点闪烁
 */
function pointSpark() {
  let x = 1;
  let flag = true;
  const point = viewer.entities.add({
    id: "point",
    position: Cesium.Cartesian3.fromDegrees(114, 30, 0),
    point: {
      outlineWidth: 0,
      outlineColor: Cesium.Color.RED,
      pixelSize: 100,
      color: new Cesium.CallbackProperty(() => {
        x += flag ? -0.02 : 0.02;
        if (x <= 0 || x >= 1) {
          flag = !flag;
        }
        return Cesium.Color.RED.withAlpha(x);
      }, false)
    }
  });

  viewer.zoomTo(point);
}
```



## 面闪烁

```js {15}
/**
 * @description 面闪烁
 */
function polygonSpark() {
  let x = 1;
  let flag = true;
  const polygon = viewer.entities.add({
    id: "polygon",
    position: Cesium.Cartesian3.fromDegrees(102.7362, 38.0249, 0),
    ellipse: {
      semiMajorAxis: 100,
      semiMinorAxis: 50,
      fill: true,
      extrudedHeight: 0,
      material: new Cesium.ColorMaterialProperty(
        new Cesium.CallbackProperty(() => {
          x += flag ? -0.02 : 0.02;
          if (x <= 0 || x >= 1) {
            flag = !flag;
          }
          return Cesium.Color.RED.withAlpha(x);
        }, false)
      ),
      rotation: Math.PI / 2,
      height: 0,
      outline: false,
      outlineColor: Cesium.Color.WHITE,
      numberOfVerticalLines: 128
    }
  });

  viewer.zoomTo(polygon);
}
```

