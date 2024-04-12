# Map方法

## layers

### getLayer

获取指定 id 的图层

```js
const layer = map.getLayer('custom-layer');
```

### addLayer

[添加图层](https://docs.mapbox.com/mapbox-gl-js/api/map/#instance-members-layers)

```js
map.on("load", () => {
    map.addLayer(layerOptions, beforeId?);
});
```

### removeLayer

移除图层

```js
if (map.getLayer("custom-layer")) map.removeLayer("custom-layer");
```

### moveLayer

调整图层的层级关系

```js
// 将 custom-layer 移动到 beforeId 的上方。
map.moveLayer('custom-layer', 'beforeId');
```

::: info

下面的两个方法没有效果，不知道是否真实存在：

```js
// 将 custom-layer 移动到所有图层的最底部
map.moveLayer('custom-layer', null);

// 将 custom-layer 移动到所有图层的最顶部
map.moveLayer('custom-layer', undefined);
```

:::

### getFilter

获取图层的过滤信息

```js
const filter = map.getFilter('custom-layer');
```

### setFilter

设置图层的过滤信息

```js
map.setFilter('custom-layer', ['>=', ['get', 'available-spots'], 5]);
```

### getPaintProperty

获取图层 paint 属性

```js
const paintProperty = map.getPaintProperty('custom-layer', 'fill-color');
```

### setPaintProperty

设置图层 paint 属性

```js
if (paintProperty) 
    map.setPaintProperty('custom-layer', 'fill-color', '#faafee');
```

### getLayoutProperty

获取图层 layout 属性

```js
const visibility = map.getLayoutProperty("custom-layer", "visibility");
```

### setLayoutProperty

设置图层 layout 属性

```js
if (visibility === "visible")
    map.setLayoutProperty("custom-layer", "visibility", "visible");
```



## 加载 image

### loadImage

```js
// 添加在线图标
map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/cat.png', (error, image) => {
    if (error) throw error;
    if (!map.hasImage('cat')) map.addImage('cat', image);
});

// 添加本地图标（最好把图片放在 public 目录下）
map.loadImage('/model/airport.png', (error, image) => {
    if (error) throw error;
    if (!map.hasImage('airport')) map.addImage('airport', image);
});
```

示例：[添加 icon 到地图](https://docs.mapbox.com/mapbox-gl-js/example/add-image/) 



## flyTo 和 jumpTo

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
```

```js
map.jumpTo({
    center: [0, 0],
    zoom: 8,
    pitch: 45,
    bearing: 90
});
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


