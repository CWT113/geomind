# mapbox-gl-draw

Github地址：https://github.com/mapbox/mapbox-gl-draw

API 地址：https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md



## 基本使用

安装 NPM 包 ：

```shell
pnpm install @mapbox/mapbox-gl-draw
```

引入 mapbox 和 mapbox-gl-draw 的依赖：

```js
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
```

添加控件的基本样式：

```js
MapboxDraw.constants.classes.CONTROL_BASE = "mapboxgl-ctrl";
MapboxDraw.constants.classes.CONTROL_PREFIX = "mapboxgl-ctrl-";
MapboxDraw.constants.classes.CONTROL_GROUP = "mapboxgl-ctrl-group";
```

添加地图和绘制控件：

```js
let map: any;
let draw: any;
mapboxgl.accessToken =
  "pk.eyJ1IjoiNzc5MjIiLCJhIjoiY2xhZ3RhcWJ0MTI1aTNwbnUwb3c1ZHM4diJ9.NJKYcr2I5XrXGniKKFX9tg";

onMounted(() => {
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: [114, 30],
    zoom: 9
  });

  initMap();
});

function initMap() {
  draw = new MapboxDraw({
    displayControlsDefault: false, // 关闭默认的控件
    // defaultMode: "draw_circle"  // 默认的绘制模式
    controls: {
      polygon: true,
      point: true,
      line_string: true,
      trash: true
    },
  });

  map.addControl(draw);

  // 创建图形时触发
  map.on("draw.create", updateArea);
  // 删除图形时触发
  map.on("draw.delete", updateArea);
  // 更新图形时触发
  map.on("draw.update", updateArea);
  // 当选中/取消选中图形时触发
  map.on("draw.selectionchange", updateArea);
}

function updateArea(e) {
  const data = draw.getAll();
  console.log("data", data);
  console.log("e", e);
}
```



## API

### options

以下所有选项都是可选的。

- `keybindings`：默认 true，是否启用绘图的键盘交互。
- `touchEnabled`：默认 true，是否启用绘图的触摸交互。
- `boxSelect`：默认 true，是否使用 shift + 鼠标左键滑动 启用要素的框选择。
- `clickBuffer`：默认值 2，单击任何要素或折点周围的像素数。
- `touchBuffer`：默认值 25，任何要素的顶点周围的像素数。
- `controls`：object 类型，隐藏或显示单个控件，每个属性名称代表一个控件，value 是一个 boolean 值，表示是否启用该控件。可选值：`point`、`line_string`、`polygon`、`trash`、`combine_features`、`uncombine_features`。
- `displayControlsDefault`：默认 true，如果希望不显示默认的控件，设置为 false 即可。
- `style`：`Array<Object>` 类型，地图样式对象的数组，Draw 默认提供了地图样式。想了解自定义样式，请参阅[“样式绘制”](https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/EXAMPLES.md)部分。
- `modes`：object 类型，用自定义的模式覆盖默认模式。想了解自定义模式，请参阅 [MapboxDraw.modes](https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/MODES.md)。
- `defaultMode`：默认值 `'simple_select'`，用户首次使用的模式。
- `useProperties`：默认 false，properties 的属性可以用于样式设置，并以 user_ 作为前缀。例如：`['==', 'user_custom_label', 'Example']`。



### Methods

```js
const draw = new MapboxDraw({});
```

添加了 MapboxDraw 以后，draw 属性上就会携带一下的所有方法。



#### add()

```js
const arrayId = draw.add(geojson | FeatureCollection | Geometry);
```

`add()` 方法的参数可以是 geojson、FeatureCollection、Geometry，并将其添加到 draw 中，返回一个 Id 数组，如果要素没有自己的 Id，draw 会自动生成 Id。

- 没有指定 Id 的情况：

  ```js
  const feature = { type: 'Point', coordinates: [0, 0] };
  const arrayId = draw.add(feature);
  ```

- 指定了 Id 的情况：

  ```js
  var feature = {
    id: 'unique-id',
    type: 'Feature',
    properties: {},
    geometry: { type: 'Point', coordinates: [0, 0] }
  };
  var arrayId = draw.add(feature);
  ```

  

#### get()

`get()` 方法用于获取 draw 中指定 Id 的 geojson 要素，如果没有要素与 Id 相同，返回 undefined。

```js
const feature = { type: 'Point', coordinates: [0, 0] };
const arrayId = draw.add(feature);

const geo = draw.get(arrayId[0]);
```



#### getFeatureIdsAt()

`getFeatureIdsAt({ x: number, y: number })` 方法返回当前鼠标在屏幕上的位置处所呈现要素的 Id 数组。

注意：x 和 y 是屏幕坐标，不是经纬度。

```js
const featureIds = draw.getFeatureIdsAt({x: 20, y: 20});
```



#### getSelectedIds()

`getSelectedIds()` 返回当前所选中要素的 Id 数组。

```js
const arrayId = draw.getSelectedIds();
```



#### getSelected()

`getSelected()` 返回当前选定的所有要素的 FeatureCollection。

```js
const featureCollection = draw.getSelected();
```



#### getSelectedPoints()

`getSelectedPoints()` 返回当前选定的所有折点的 FeatureCollection。

```js
const featureCollection = draw.getSelectedPoints();
```



#### getAll()

`getAll()` 返回当前地图所有要素的 FeatureCollection。

```js
draw.add({ type: 'Point', coordinates: [0, 0] });
draw.add({ type: 'Point', coordinates: [1, 1] });
draw.add({ type: 'Point', coordinates: [2, 2] });
console.log(draw.getAll());
```



#### delete()

`delete()` 用于删除具有指定 Id 的要素，返回可用于链式调用的绘制实例。

```js
var feature = { type: 'Point', coordinates: [0, 0] };
var ids = draw.add(feature);

draw.delete(ids).getAll();
```



#### deleteAll()

`deleteAll()` 删除所有要素，返回可用于链式调用的绘制实例。

```js
draw.add({ type: 'Point', coordinates: [0, 0] });

draw.deleteAll().getAll();
```



#### getMode()

`getMode()` 返回 draw 的当前模式。

```js
const mode = draw.getMode();
```



#### changeMode()

`changeMode()` 更改绘制模式，返回可用于链式调用的绘制实例。

该函数的参数必须是以下几种：`simple_select`、`direct_select`、`draw_line_string`。

```js
draw.changeMode("simple_select");
```



### Event

绘制会触发许多事件，所有的事件均以 `draw.` 开头，所有时间都由用户交互触发。



#### draw.create

在创建要素时触发。

```js
map.on('draw.create', (e) => {
  console.log(e);
});
```



#### draw.delete

删除一个或多个要素时触发。

```js
map.on('draw.delete', (e) => {
  console.log(e);
});
```



#### draw.update

在更新元素时触发，例如移动元素、更改元素的这点移动等。

```js
map.on('draw.update', (e) => {
  console.log(e);
});
```



#### draw.selectionchange

鼠标选中某个元素时触发。

```js
map.on('draw.selectionchange', (e) => {
  console.log(e);
});
```



#### draw.combine

在要素组合时触发。例如同时选中了 线 和 面时，该事件就会触发。

```js
map.on('draw.combine', (e) => {
  console.log(e);
});
```



#### draw.uncombine

在要素未合并时触发。

```js
map.on('draw.uncombine', (e) => {
  console.log(e);
});
```



#### draw.modechange

更改绘制模式时触发。例如 单击点、线或多边形按钮开始绘制 时就会触发。

```js
map.on('draw.modechange', (e) => {
  console.log(e);
});
```