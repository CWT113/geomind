# Map方法

## 改变图层层级

在 Maplibre GL JS 中，您可以使用 `moveLayer` 方法来调整图层的层级关系。

其语法如下：

```js
map.moveLayer('currentLayerId', 'beforeId');
```

这表示将 `currentLayerId` 移动到 `beforeId` 的上方。



1. 有两个图层分别为 `layer1` 和 `layer2`，将 `layer2` 移动到 `layer1` 的上方：

   ```js
   map.moveLayer('layer2', 'layer1');
   ```

2. 将 layer2 移动到所有图层的最底部：

   ```js
   map.moveLayer('layer1', null);
   ```

3. 将 layer2 移动到所有图层的最顶部：

   ```js
   map.moveLayer('layer2', undefined);
   ```

   

## 设置图层显隐

地图图层的 layout 中，默认存在属性 `visibility: "visible"` 表示图层处于显示状态，在地图 load 加载时，可以使用下面的方法控制其显示或隐藏：

```js
// 获取 layerName 图层的 visibility 属性
const visibility = map.getLayoutProperty(layerName, "visibility");

if (visibility === "visible") {
    map.setLayoutProperty(layerName, "visibility", "none");
} else {
    map.setLayoutProperty(layerName, "visibility", "visible");
}
```



## bearing

当前相机朝向方向与正北在水平面上的夹角，顺时针为正方向，如果是正北，那就是 0 ，其范围在正负180之间。

```js
// 获取
const bearing = map.getBearing();
// 设置
map.setBearing(90);

// 旋转到90度, 过渡时间为2秒
map.rotateTo(90, { duration: 2000 });
// 旋转到正北方向，也就是0度，过渡时间为2秒
map.resetNorth({ duration: 2000 });
```



## pitch

当前相机的俯仰角，当相机直接向下看地图时，pitch 介于 `[0, 60]` 之间。

```js
// 获取
const pitch = map.getPitch();
// 设置
map.setPitch(30);

// 设置最大倾斜角
map.setMaxPitch(70);
// 设置最小倾斜角
map.setMinPitch(5);
// 获取最大倾斜角
const maxPitch = map.getMaxPitch();
// 获取最小倾斜角
const minPitch = map.getMinPitch();
```



## zoom

地图缩放级别。

```js
// 获取
const zoom = map.getZoom();
// 设置
map.setZoom(5);

// 缩放到特定级别
map.zoomTo(8, { duration: 2000 });
// 放大1个级别
map.zoomIn({ duration: 1000 });
// 缩小1个级别
map.zoomOut({ offset: [80, 60] });
```



## center

地图的地理中心。

```js
// 获取地图的地理中心，返回值格式为 {lng: 0, lat: 0}
const center = map.getCenter();
// 设置地图的地理中心，作用等同于 jumpTo({center: center})
map.setCenter([-74, 38]);
```



## flyTo & jumpTo

从某地视角变成另外一个地方的视角，`flyTo` 带有动画，`jumpTo` 没有动画。

```js
map.flyTo({
    center: [0, 0],
    zoom: 9,
    speed: 0.2,
    curve: 1,
    easing(t) {
        return t;
    }
}); 

map.jumpTo({
    center: [0, 0],
    zoom: 8,
    pitch: 45,
    bearing: 90
});
```



## bounds

地图范围，就是将地图控制在一个矩形框内，由两个坐标点控制（左下，右上）。

```js
const bounds = new maplibregl.LngLatBounds(
    [118.61229390547766, 37.42688730469044],
    [118.93002792860182, 37.58613927790206]
);
// 设置
map.setMaxBounds(bounds);
// 获取
const maxBounds = map.getMaxBounds();
// 获取当前范围
const bounds = map.getBounds();
```
