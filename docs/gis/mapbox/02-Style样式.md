# style 样式

### version

版本号（必填，且值必须为 8 ）。

```js
version: 8;
```

### name

名称（可选，用于给 style 取名）。

```js
name: "mapbox-demo";
```

### sprite

雪碧图（可选，用来指定获取雪碧图及其元数据的 URL）。

```js
sprite: "mapbox://sprites/mapbox/streets-v8";
```

### glyphs

字形符号（可选，用来指定加载以 PBF 格式设置的 有向距离场 字形的 URL 模板）。

<p style="color: #e63e31">注意：当 layer 使用了 `text-filed` 属性时，glyphs 必填。</p>

```js
glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
```

### metadata

元数据（可选，用于给 style 附加一些任意属性）。

```js
metadata: {
    name: "custom name",
    anthor: "sunny",
    createTime: "2024/03/05 20:51:00"
}
```

### center

地图的默认中心点（可选，`[经度, 纬度]`）

```js
center: [110.17541, 36.05639];
```

### zoom

地图的默认缩放等级（可选，值越大，越靠近地表。mapbox 采用无极缩放，范围一般为 0 ~ 24）

```js
zoom: 12;
```

### bearing

地图默认的方位角（可选，默认值为 0）。

```js
bearing: 0;
```

### pitch

地图的默认倾斜角度（可选，默认值为 0，范围为 0 ~ 60）。

```js
pitch: 0;
```

### light

全局的光源（可选）。

```js
light: {
    "anchor": "viewport", // 锚点，指定作用的目标（可选，可选值 map、viewport，默认值为 viewport）
    "position": [1.15,210,30], // 位置（可选，默认值为 [1.15,210,30]）
    "color": "white", // 颜色（可选，默认值为 #ffffff）
    "intensity": 0.5 // 强度（可选，取值范围为 0 ~ 1，默认值为 0.5）
}
```

### sources

数据源集合（必填，用于包含一系列数据源 source，这些数据源提供了在地图上现实的数据）。

sources 是以 对象{} 的形式存在，其属性名就是数据的来源，这样根据数据源的名称可快速的获取数据源的信息。

```js
sources: {
}
```

每个数据源 source 都有一个 [`type` 属性](https://docs.mapbox.com/style-spec/reference/sources/)，用于指定该数据源的类型，共分为一下几种：

- vector：矢量
- raster：栅格
- raster-dem：栅格化的数字高程模型
- geojson：GeoJSON 数据源
- image：图片
- video：视频

#### vector

详细了解矢量图块的优势及工作原理，请参阅 [矢量图块](https://docs.mapbox.com/data/tilesets/guides/vector-tiles-introduction/) 文档。对于 mapbox 托管的矢量切片，url 需使用 `mapbox://username.tilesetid` 的形式。

```js
map.addSource("terrain", {
  type: "vector",
  url: "mapbox://mapbox.mapbox-terrain-v2"
});
```

#### raster

可用于绘制栅格地图，例如卫星影像等。

```js
map.addSource("openstreetmap", {
  type: "raster",
  tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
  tileSize: 256,
  attribution: "© copyright mapbox"
});
```

#### raster-dem

Raster-DEM 是 [`RasterTileSource`](https://docs.mapbox.com/mapbox-gl-js/api/sources/#rastertilesource) 的特例，它包含高程数据，并引用 Mapbox `Terrain-DEM()`，这是唯一受支持的栅格 DEM 源。

```js
map.addSource("dem", {
  type: "raster-dem",
  url: "mapbox://mapbox.mapbox-terrain-dem-v1"
});
```

#### geojson

GeoJSON 源是一个或多个地理要素的集合，这些集合可以是点、线、面。数据必须通过属性提供，其值可以是 url 或 geojson 数据。

```js
// url
map.addSource("floorplan", {
  type: "geojson",
  data: "https://maplibre.org/maplibre-gl-js/docs/assets/indoor-3d-map.geojson"
});

// geojson
map.addSource("maine", {
  type: "geojson",
  data: {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-66.96466, 44.8097],
          [-68.03252, 44.3252]
        ]
      ]
    }
  }
});
```

#### image

图像源 [`ImageSource`](https://docs.mapbox.com/mapbox-gl-js/api/sources/#imagesource) 是您与地理坐标一起提供的图像。将数组中的地理坐标指定为成对，以便地图知道将图像放置在世界的哪个位置。数组中的每个坐标对表示按顺时针顺序列出的图像角：左上角、右上角、右下角、左下角。

```js
map.addSource("radar", {
  type: "image",
  url: "/mapbox-gl-js/assets/radar.gif",
  coordinates: [
    [-80.425, 46.437],
    [-71.516, 46.437],
    [-71.516, 37.936],
    [-80.425, 37.936]
  ]
});
```

---

### layers

图层集合（必填，包含一系列图层 layer，这些图层指定了如何渲染数据源提供的数据）。

```js
layers: [];
```

每个图层 layer 都有一个 id （具有唯一性）和 type 属性，其中 type 属性指定了其具体的渲染类型：

- fill：填充
- line：线
- circle：圆点
- symbol：符号
- raster：栅格
- heatmap：热力图
- hillshade：坡面阴影
- fill-extrusion：三维填充
- background：背景



>注意：在 layer 中，`layout` 属性和 `paint` 属性有一个很重要的区别：
>
>1. `paint` 属性，只要缩放级别发生变化，都会重新计算 `paint` 属性，即使是小数变化，比如在 4.1 - 4.6 之间。
>2. `layout` 属性只在整数缩放级别时计算，在 4.1 - 4.6 之间不会发生变化，只有在高于 5 或小于 4 时计算。



#### fill

fill [样式图层 ](https://docs.mapbox.com/style-spec/reference/layers/#fill)可在地图上渲染一个或多个填充（以及可选的描边）面。您可以使用填充图层来配置面或多面要素的视觉外观。

要添加填充图层，您需要先添加包 含面数据的矢量 或 GeoJSON 源。然后，您可以使用 fill [图层中的可用属性](https://docs.mapbox.com/style-spec/reference/layers/#fill)来自定义其外观（例如，颜色、不透明度或图案）。

```js
{
  "id": "fill-id",
  "type": "fill",
  "metadata": {
    "mapbox:name": "fill-test"
  },
  "source": "fill-source-name",
  // 数据源的图层(只有数据源 source 的 type 为 vector 时，才能设置 source-layer，其它类型的不可以设置)
  "source-layer": "fill-source-layer-name",
  "minzoom": 0,  // 最小层级(地图zoom小于minzoom时，layer将被隐藏)
  "maxzoom": 24, // 最大层级(地图zoom大于maxzoom时，layer将被隐藏)
  "filter": [],  // 过滤(用特定的表达式过滤指定的数据源的要素)
  "paint": {
    "fill-antialias": true,         // 填充时是否反锯齿
    "fill-opacity": 1,              // 填充的不透明度(0~1)
    "fill-pattern": "",             // 填充用的图案(填写在雪碧图中的图标名称，为了图案能无缝填充，图标的宽高需要是2的                                        倍数)
    "fill-color": "#fff",           // 填充颜色(设置了fill-pattern，则该属性无效)
    "fill-outline-color": "#fff",   // 描边的颜色(默认和fill-color一致，如果设置了fill-pattern，则该属性无效。使                                        用该属性时，需设置fill-antialias为true)
    "fill-translate": [0, 0],       // 填充的平移
    "fill-translate-anchor": "map", // 平移的锚点，即相对的参考物(可选值:map/viewport)
    'fill-opacity-transition': { duration: 500 }  // 填充透明的过渡效果(官网有示例)
  },
  "layout": {
    "visibility": "visible"
  }
}
```

#### line

line [样式图层](https://docs.mapbox.com/style-spec/reference/layers/#line)可在地图上渲染一条或多条描边折线。您可以使用线图层来配置折线或多折线要素的可视外观。

要添加线图层，您需要先添加包含线数据的矢量或 GeoJSON 源。然后，您可以使用 line [图层中的可用属性](https://docs.mapbox.com/style-spec/reference/layers/#line)来自定义图层的外观（例如，颜色、宽度或虚线图案）。

```js
{
  "id": "line-id",
  "type": "line",
  "metadata": {
    "mapbox:name": "line-test"
  },
  "source": "line-source-name",
  "source-layer": "line-source-layer-name",
  "minzoom": 0,
  "maxzoom": 24,
  "filter": [],
  "paint": {
    "line-opacity": 1,
    "line-pattern": "",
    "line-color": "#fff",
    "line-width": 1,
    "line-translate": [0, 0], 		// 线平移
    "line-translate-anchor": "map", // 线平移的参考锚点(默认map，可选值:map/viewport)
    "line-gap-width": 0, 			// 线的外部间距宽度
    "line-offset": 0,
    "line-blur": 0,
    "line-dasharray": [0, 0], 		// 虚线的破折号和间隔的长度(设置了line-pattern，该属性将无效)
    "line-gradient": "#fff", 		// 线的渐变色(设置了line-pattern或line-dasharray，则line-gradient将无效。只有									   数据源source的type为geojson ，且source的lineMetrics为true时，line-								               gradient才有效)
  },
  "layout": {
    "visibility": "visible",
    "line-cap": "butt", 			// 线末端的显示样式(可选值:butt/round/square)
    "line-join": "miter", 			// 线交叉时的显示样式(可选值:bevel/round/miter)
    "line-miter-limit": 2, 			// 最大斜接长度(用来将miter尖型焦点自动转为bevel方型交点，默认值为2，只有line-join										为miter时，才设置该属性)
    "line-round-limit": 1.05   		// 最小圆角半径(用来将round尖型焦点自动转为bevel方型交点，默认值为1.05，只有line-									   join为round时，才设置该属性)
  }
}

```

#### circle

circle [样式图层](https://docs.mapbox.com/style-spec/reference/layers/#circle)可在地图上渲染一个或多个填充圆。

要添加圆形图层，您需要先添加 包含点数据的矢量或 GeoJSON 源。然后，您可以使用 circle [图层中的可用属性](https://docs.mapbox.com/style-spec/reference/layers/#circle)来自定义图层的外观（例如，半径、颜色或偏移）。

```js
{
  "id": "circle-id",
  "type": "circle",
  "metadata": {
    "mapbox:name": "circle-test"
  },
  "source": "circle-source-name",
  "source-layer": "circle-source-layer-name",
  "minzoom": 0,
  "maxzoom": 24,
  "filter": [],
  "paint": {
    "circle-opacity": 1,
    "circle-radius": 5,
    "circle-color": "#fff",
    "circle-blur": 0,
    "circle-translate": [0, 0],
    "circle-translate-anchor": "map",
    "circle-pitch-scale": "map", 		// 地图倾斜时圆点的缩放，当值为 viewport 时，圆点不会缩放
    "circle-pitch-alignment": "map", 	// 地图倾斜时圆点的对齐方式
    "circle-stroke-width": 0, 			// 圆点的描边宽度
    "circle-stroke-color": "#fff", 		// 圆点的描边颜色
    "circle-stroke-opacity": 1
  },
  "layout": {
    "visibility": "visible"
  }
}
```

#### symbol

symbol [样式图层](https://docs.mapbox.com/style-spec/reference/layers/#symbol)在地图上的点或沿线处渲染图标和文本标签。您可以使用符号图层来配置矢量切片中要素标注的视觉外观。

要添加符号图层，您需要先添加 包含点数据的矢量 或 GeoJSON 源。如果要在此图层中使用图标，还需要在添加图层之前将 图像添加到样式中。然后，您可以使用 symbol [图层中的可用属性](https://docs.mapbox.com/style-spec/reference/layers/#symbol)来自定义图层的外观。

**icon 图标：**

```js
{
  "id": "symbol-id",
  "type": "symbol",
  "metadata": {
    "mapbox:name": "symbol-test"
  },
  "source": "symbol-source-name",
  "source-layer": "symbol-source-layer-name",
  "minzoom": 0,
  "maxzoom": 24,
  "filter": [],
  "paint": {
    "icon-opacity": 1,
    "icon-color": "#fff",
    "icon-halo-color": "#fff",
    "icon-halo-width": 0, 			// 光晕宽度
    "icon-halo-blur": 0,
    "icon-translate": [0, 0],
    "icon-translate-anchor": "map" 	// 图标的平移锚点，即相对的参考物(可选值:map/viewport)
  },
  "layout": {
    "visibility": "visible",
    "symbol-placement": "point", 	// 符号的位置(可选值:point/line/line-center)
    "symbol-spacing": 250, 			// 符号之间的距离(只有symbol-placement为line时才有效)
    "symbol-avoid-edges": false, 	// 是否避免边缘冲突，当为 true 时，符号不会超过切片的边缘
    "symbol-sort-key": 1, 			// 排序的参考性，值越大，越在上方
    "symbol-z-order": "auto", 		// z轴上的顺序控制(可选值:auto/viewport-y/source)

    "icon-image": "",
    "icon-size": 1,
    "icon-padding": 2, 				// 图标的外边距
    "icon-offset": [0, 0],
    "icon-anchor": "center", 		// 图标与锚点的位置关系(可选值:center/left/right/top/bottom/top-left/top-right/bottom-left/bottom-right)
    "icon-rotate": 40,
    "icon-overlap": "always",              // 图标会始终叠加显示，即使有重叠的部分
    "icon-allow-overlap": false, 		   // 是否允许图标重叠
    "icon-ignore-placement": false,        // 是否忽略图标位置，当值为 true 时，其他符号即使与此图标触碰也会显示
    "icon-optional": false, 		       // 图标是否可不显示，当值为true时，如果图标与文本标签碰撞，则显示文本标签
    "icon-text-fit": "none", 		       // 图标与文本的大小适应关系(可选值:none/width/height/both)
    "icon-text-fit-padding": [0, 0, 0, 0], // 图标与文本的内边距
    "icon-keep-upright": false, 		   // 当 icon-rotation-alignment 为 map，且 symbol-placement 为                                                 line 或者 line-center 时，设置为 true 的话，可以避免图标上下颠倒
    "icon-rotation-alignment": "auto", 	   // 地图旋转时图标的对齐方式(可选:map/viewport/auto)
    "icon-pitch-alignment": "auto" 		   // 地图倾斜时图标的对齐方式
  }
}
```

**text 文字：**

```js
{
  "id": "symbol-id",
  "type": "symbol",
  "metadata": {
    "mapbox:name": "symbol-test"
  },
  "source": "symbol-source-name",
  "source-layer": "symbol-source-layer-name",
  "minzoom": 0,
  "maxzoom": 24,
  "filter": [],
  "paint": {
    "text-opacity": 1,
    "text-color": "#fff",
    "text-halo-color": "#fff",
    "text-halo-width": 0,
    "text-halo-blur": 0,
    "text-translate": [0, 0],
    "text-translate-anchor": "map"
  },
  "layout": {
    "visibility": "visible",
    "symbol-placement": "point",
    "symbol-spacing": 250,
    "symbol-avoid-edges": false,
    "symbol-sort-key": 1,
    "symbol-z-order": "auto",

    "text-rotation-alignment": "auto", 	// 与 icon-rotation-alignment 类似
    "text-pitch-alignment": "auto",
    "text-field": "hello, mapbox!!",
    "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
    "text-size": 16,
    "text-max-width": 10, 				// 文本最大宽度，超过则折行
    "text-line-height": 1.2,
    "text-letter-spacing": 0, 			// 文本的字符间距
    "text-justify": "center", 			// 文本的水平对齐方式(可选值:auto/left/center/right)
    "text-anchor": "center", 			// 文本与锚点的位置关系(可选值:center/left/right/top/bottom/top-left/top-right/bottom-left/bottom-right)
    "text-variable-anchor": "center",
    "text-max-angle": 45, 				// 当symbol-placement为line或line-center时，文本相邻字符的最大夹角
    "text-rotate": 0,
    "text-padding": 2, 					// 文本外边距
    "text-keep-upright": false, 		// 当 icon-rotation-alignment 为 map，且 symbol-placement 为 line 或者 line-center 时，设置为 true 的话，可以避免文本上下颠倒
    "text-transform": "none", 			// 文本大小写转换(可选值:none/uppercase/lowercase)
    "text-offset": [0, 0],
    "text-radial-offset": 0, 			// 文本的经向偏移量，优先级比 text-offset 高
    "text-overlap": "always",          // 文字会始终叠加显示，即使有重叠的部分
    "text-allow-overlap": false, 		// 是否允许文本重叠
    "text-ignore-placement": false, 	// 是否忽略文本位置，当为true时，其他符号即使与此文本触碰也会显示
    "text-optional": false 				// 文本是否不可显示，当为true时，如果文本与图标碰撞，则显示图标
  }
}
```

#### raster

raster [样式图层](https://docs.mapbox.com/style-spec/reference/layers/#raster)用于在地图上渲染栅格切片。

要添加栅格图层，需要先添加栅格源。然后，您可以使用 raster [图层中的可用属性](https://docs.mapbox.com/style-spec/reference/layers/#raster)来自定义图层的外观。

```js
{
  "id": "raster-id",
  "type": "raster",
  "metadata": {
    "mapbox:name": "raster-test"
  },
  "source": "raster-source-name",
  "source-layer": "raster-source-layer-name",
  "minzoom": 0,
  "maxzoom": 24,
  "filter": [],
  "paint": {
    "raster-opacity": 1, 			// 图片的不透明度（可选，取值范围为 0 ~ 1，默认值为 1）
    "raster-hue-rotate": 0, 		// 在色轮上旋转色相的角度（可选，默认值为 0，单位：角度）
    "raster-brightness-min": 0, 	// 图片的最小亮度（可选，取值范围为 0 ~ 1，默认值为 0）
    "raster-brightness-max": 1, 	// 图片的最大亮度（可选，取值范围为 0 ~ 1，默认值为 1）
    "raster-saturation": 0, 		// 图片的饱和度（可选，取值范围为 -1 ~ 1，默认值为 0）
    "raster-contrast": 0,			// 图片的对比度（可选，取值范围为 -1 ~ 1，默认值为 0）
    "raster-resampling": "linear", 	// 采样方式（可选，可选值为 linear、nearest，默认值为 linear）
    "raster-fade-duration": 300 	// 切换瓦片时的渐隐时间（可选，默认值为 300，单位：毫秒）
  },
  "layout": {
    "visibility": "visible"
  }
}
```

#### heatmap

heatmap [样式图层](https://docs.mapbox.com/style-spec/reference/layers/#heatmap)会渲染一系列颜色来表示区域中点的密度。

要添加热图图层，您需要首先添加 包含点数据的矢量或 GeoJSON 源。然后，您可以使用 heatmap [图层中的可用属性](https://docs.mapbox.com/style-spec/reference/layers/#heatmap)来自定义图层的外观。

```js
{
  "id": "heatmap-id",
  "type": "heatmap",
  "metadata": {
    "mapbox:name": "heatmap-test"
  },
  "source": "heatmap-source-name",
  "source-layer": "heatmap-source-layer-name",
  "minzoom": 0,
  "maxzoom": 24,
  "filter": [],
  "paint": {
    "heatmap-opacity": 1, 		// 热力图的不透明度（可选，取值范围为 0 ~ 1，默认值为 1）
    "heatmap-radius": 30, 		// 一个热力图点的影响半径（可选，值 >= 1，默认值为 30，单位：像素）
    "heatmap-weight": 1, 		// 一个热力图点的权重（可选，值 >= 0，默认值为 1）
    "heatmap-intensity": 1, 	// 热力图的强度，控制了所有的热力图点（可选，值 >= 0，默认值为 1）
    "heatmap-color": [     		// 热力图的颜色变化（可选，默认值如下）
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0,
      "rgba(0, 0, 255, 0)",
      0.5,
      "yellow",
      1,
      "red"
    ]
  },
  "layout": {
    "visibility": "visible"
  }
}
```

#### hillshade

Hillshade [样式图层](https://docs.mapbox.com/style-spec/reference/layers/#hillshade)用于在客户端渲染数字高程模型 （DEM） 数据。

该实现仅支持由 Mapbox Terrain RGB 或 Mapzen Terrarium 图块组成的源。添加适当的源后，可以使用 [`hillshade` 图层中的可用属性](https://docs.mapbox.com/style-spec/reference/layers/#hillshade)来自定义图层的外观。

```js
{
  "id": "hillshade-id",
  "type": "hillshade",
  "metadata": {
    "mapbox:name": "hillshade-test"
  },
  "source": "hillshade-source-name",
  "source-layer": "hillshade-source-layer-name",
  "minzoom": 0,
  "maxzoom": 24,
  "filter": [],
  "paint": {
    "hillshade-illumination-direction": 335, 	 // 光照的方向（可选，取值范围为 0 ~ 359，默认值为 335，单位：角度）
    "hillshade-illumination-anchor": "viewport", // 光照的锚点（可选，可选值为 map、viewport，默认值为 viewport）
    "hillshade-exaggeration": 0.5, 				 // 阴影的强度（可选，取值范围为 0 ~ 1，默认值为 0.5）
    "hillshade-shadow-color": "#000000", 		 // 阴影的颜色（可选，默认值为 #000000）
    "hillshade-highlight-color": "#ffffff",      // 光照部分的颜色（可选，默认值为 #ffffff）
    "hillshade-accent-color": "#000000" 	     // 用于强调地形的颜色（可选，默认值为 #000000）
  },
  "layout": {
    "visibility": "visible"
  }
}
```

#### fill-extrusion

fill-extrusion [样式图层](https://docs.mapbox.com/style-spec/reference/layers/#fill-extrusion)可在地图上渲染一个或多个填充（和可选描边）拉伸 （3D） 面。

要添加填充拉伸图层，您需要先添加 包含面数据的矢量或 GeoJSON 源。通常，数据需要包含一个数据属性，可以使用该属性来确定每个特征的拉伸高度。这可能是以米为单位的物理高度，也可以是说明人口普查区块中人口等区域的非物理属性的一种方式。

添加适当的源后，可以使用 fill-extrusion[图层类中的可用属性](https://docs.mapbox.com/style-spec/reference/layers/#fill-extrusion)来自定义图层的外观（例如，高度、不透明度或颜色）。

```js
{
  "id": "fill-extrusion-id",
  "type": "fill-extrusion",
  "metadata": {
    "mapbox:name": "fill-extrusion-test"
  },
  "source": "fill-extrusion-source-name",
  "source-layer": "fill-extrusion-source-layer-name",
  "minzoom": 0,
  "maxzoom": 24,
  "filter": [],
  "paint": {
    "fill-extrusion-opacity": 1, 				// 三维填充的不透明度（取值范围为0 ~ 1）
    "fill-extrusion-pattern": "", 				// 三维填充的图案（为了图案能无缝填充，图标的高宽需要是 2 的倍数）
    "fill-extrusion-color": "#000000", 			// 三维填充的颜色
    "fill-extrusion-translate": [0, 0], 		// 三维填充的平移
    "fill-extrusion-translate-anchor": "map", 	// 平移的锚点，即相对的参考物（可选值为map/viewport）
    "fill-extrusion-height": 0, 			  	// 三维填充的高度
    "fill-extrusion-base": 0, 				  	// 三维填充的底部高度（默认值为0米，值必须小于等于 fill-														   extrusion-height）
    "fill-extrusion-vertical-gradient": true,   // 是否开启垂直渐变
  },
  "layout": {
    "visibility": "visible"
  }
}
```

#### background

background [样式图层](https://docs.mapbox.com/style-spec/reference/layers/#background)，覆盖整个地图。

使用背景样式图层配置颜色或图案以显示在所有其他地图内容下方。如果背景图层是透明的或样式中省略了背景图层，则地图视图中未显示其他样式图层的任何部分都是透明的。

您可以使用 background [图层中的可用属性](https://docs.mapbox.com/style-spec/reference/layers/#background)来自定义图层的外观。

```js
{
  "id": "background-id",
  "type": "background",
  "metadata": {
    "mapbox:name": "background-test"
  },
  "minzoom": 0,
  "maxzoom": 24,
  "filter": [],
  "paint": {
    "background-color": "#000000",  // 背景颜色（如果设置了background-pattern，则background-color将无效）
    "background-pattern": "", 		// 背景图案
    "background-opacity": 1		    // 背景不透明度
  },
  "layout": {
    "visibility": "visible"
  }
}
```
