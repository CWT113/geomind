# Cesium加载MVT数据

## 什么是MVT？

在 Mapbox 中，**MVT（Mapbox Vector Tile）矢量切片** 是一种用于存储和传输矢量地图数据的格式，它基于 protobuf 进行编码，以提高数据传输和渲染的效率。



::: MVT核心概念

1. **切片（Tile）**
   - 地图被分割成一系列的瓦片，通常使用 XYZ瓦片坐标系统（X/Y表示瓦片的列/行号，Z表示缩放等级）；
   - 每个瓦片包含其范围内的矢量数据，例如点、线、面等地理要素；
2. **矢量数据（Vector Data）**
   - MVT瓦片存储的是矢量数据，而非像栅格瓦片（Raster Tile）那样的图像数据；
   - 主要包括：
     - 点（Point），如兴趣点；
     - 线（LineString），如道路、河流；
     - 面（Polygon），如建筑、多边形区域；
3. **数据压缩**
   - MVT使用 protobuf 进行二进制编码，相比传统的 GeoJSON 格式更加紧凑，减少了网络传输和存储的开销；

:::



## Cesium中加载MVT

Cesium中加载MVT矢量瓦片，可以使用第三方库 [mvt-imagery-provider](https://www.npmjs.com/package/mvt-imagery-provider)。



### 安装

```bash
pnpm add mvt-imagery-provider
```



### 基础用法

```ts {2,6-8}
import * as Cesium from "cesium";
import MVTImageryProvider from 'mvt-imagery-provider';

const viewer = new Cesium.Viewer("cesiumContainer");

const provider = await MVTImageryProvider.fromUrl('https://demotiles.maplibre.org/style.json', {
  accessToken: MAPBOX_TOKEN
});

viewer.imageryLayers.addImageryProvider(provider);
```



### 加载Mapbox图层

::: code-group

```vue [App.vue] {9,10,19-22,24}
<template>
  <div id="cesiumContainer"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import MVTImageryProvider from "mvt-imagery-provider";
import { mapboxStyle } from "../data/mapbox/mapboxStyle";

Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NTEzMzUzMS05MjZkLTRkMzEtYjQwNy1iMjNkZmY5ZDAxODciLCJpZCI6MjEwNTg5LCJpYXQiOjE3MTM4NTMxODl9.gLMG3GJ5ifwwFC2dMI9FBgMiLuPS8Tl_zm_Ue1uur_Y";

onMounted(async () => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false,
  });

  const provider = await MVTImageryProvider.fromUrl(mapboxStyle, {
    accessToken:
      "pk.eyJ1IjoiNzc5MjIiLCJhIjoiY201bm45amJmMGEwbTJwczgzMTNoNXRmcCJ9.TY7n-MTlMJ3cTUfjkRS9SQ",
  });
  // 通过返回值，拿到 ImageryLayer 对象，从而进行图层移除
  const layer = viewer.imageryLayers.addImageryProvider(provider);

  setTimeout(() => {
    if (viewer.imageryLayers.contains(layer)) {
      viewer.imageryLayers.remove(layer);
    }
  }, 5000);
});
</script>

```

```ts [mapboxStyle.ts]
import type { StyleSpecification } from "mvt-imagery-provider";

const mapboxStyle: StyleSpecification = {
  version: 8,
  name: "mapboxStyle",
  metadata: {
    name: "custom layer",
    author: "Yibo wang",
    createTime: "2025/03/21 20:51:00",
  },
  sprite: "mapbox://sprites/mapbox/streets-v8",
  glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
  sources: {
    custom: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              name: "custom-source",
            },
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [100.81838159038534, 30.191581299608572],
                  [100.81838159038534, 26.597839940469342],
                  [119.2416776331695, 26.597839940469342],
                  [119.2416776331695, 30.191581299608572],
                  [100.81838159038534, 30.191581299608572],
                ],
              ],
            },
          },
        ],
      },
    },

    shanxi: {
      type: "geojson",
      data: "https://geo.datav.aliyun.com/areas_v3/bound/610000_full.json",
    },
  },
  layers: [
    // 自定义source配置样式
    {
      id: "custom",
      type: "fill",
      source: "custom",
      paint: {
        "fill-color": "#278821",
        "fill-outline-color": "#278821",
        "fill-opacity": 0.8,
      },
      layout: {
        visibility: "visible",
      },
    },
    // 在线source配置样式
    {
      id: "shanxi-layer",
      type: "fill",
      source: "shanxi",
      paint: {
        "fill-color": "red",
        "fill-opacity": 0.6,
      },
    },
    {
      id: "shanxi-line",
      type: "line",
      source: "shanxi",
      paint: {
        "line-color": "yellow",
        "line-width": 3,
        "line-opacity": 0.6,
      },
    },
  ],
};

export { mapboxStyle };
```

:::