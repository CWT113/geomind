# 介绍

MapLibre GL JS 是一个 TypeScript 库，它使用 WebGL 从浏览器中的矢量图块渲染交互式地图。地图的自定义样式需符合 [MapLibre 样式规范](https://maplibre.org/maplibre-style-spec)。它是 [MapLibre 生态系统](https://github.com/maplibre)的一部分，有一个用于移动、桌面、服务器的框架，称为 [MapLibre Native](https://maplibre.org/projects/maplibre-native/)。



## 快速入门

### npm

安装 maplibre-gl 的 npm [包](https://www.npmjs.com/package/maplibre-gl)：

```shell
pnpm i maplibre-gl
```

引入 maplibre-gl 的 js 文件和 css 样式文件：

```js
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
```

在 vue 文件的 template 模板中创建一个 container 容器，用于承载地图：

```vue
<div id="container"></div>
```

在 vue 文件的 onMounted 声明周期函数中初始化一个地图：

```js
onMounted(() => {
  const map = new maplibregl.Map({
    container: "container",
    style: "https://demotiles.maplibre.org/style.json",
    center: [118.78, 37.5],
    zoom: 6
  });
});
```
