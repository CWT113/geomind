---
date: 2026-01-22 17:53:25
---

# 绘制 Entity 实体

Entity 是 Cesium 提供的高级 API，底层由 Primitive 封装而成，它将复杂的图形、结构化数据和时间动态性封装在一起，非常适合用来表示“业务对象”（如一架飞机、一辆车等）。

> [!NOTE] 特点
>
> - **易用性**：开发者只需声明属性（位置、形状、颜色），Cesium 会自动处理底层的渲染逻辑；
> - **数据驱动**：天然支持 CZML 数据格式；
> - **动态性**：包含 `Property` 系统，可以轻松实现随时间变化的位置；
> - **集成性**：自动处理选择（Selection）、信息框（InfoWindow）展示；



## Point（点）

::: code-group

```ts [单点]
const point = viewer.entities.add({
  name: "point",
  position: Cesium.Cartesian3.fromDegrees(102.7362, 38.0249, 0),
  properties: {
    despection: "这是自定义的点",
  },
  point: {
    // 点的大小
    pixelSize: 10,
    // 点的外边框宽度
    outlineWidth: 3,
    // 点的外边框颜色
    outlineColor: Cesium.Color.WHITE,
    // 点的填充色
    color: Cesium.Color.fromCssColorString("#14858B").withAlpha(1),
    // 点的高度参考模式
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    // 永远禁用深度检测
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    // 根据相机距离调整点大小
    scaleByDistance: new Cesium.NearFarScalar(1000, 2.0, 5000, 0.5),
    // 根据相机距离调整透明度
    translucencyByDistance: new Cesium.NearFarScalar(500, 1.0, 2000, 0.3),
    // 根据相机距离控制点是否显示
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 3000),
  },
});

viewer.flyTo(point, {
  duration: 3.0,
  offset: new Cesium.HeadingPitchRange(0, -90, 1000),
});
```

```ts [单点+Label]
const point = viewer.entities.add({
  name: "point",
  position: Cesium.Cartesian3.fromDegrees(102.7362, 38.0249, 0),
  properties: {
    despection: "这是自定义的点",
  },
  point: {
    // 点的大小
    pixelSize: 6,
    // 点的外边框宽度
    outlineWidth: 2,
    // 点的外边框颜色
    outlineColor: Cesium.Color.YELLOW,
    // 点的填充色
    color: Cesium.Color.fromCssColorString("#ff0000").withAlpha(1),
    // 点的高度参考模式
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    // 永远禁用深度检测
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    // 根据相机距离调整点大小
    scaleByDistance: new Cesium.NearFarScalar(1000, 2.0, 5000, 0.5),
    // 根据相机距离调整透明度
    translucencyByDistance: new Cesium.NearFarScalar(500, 1.0, 2000, 0.3),
    // 根据相机距离控制点是否显示
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 3000),
  },
  label: {
    text: "蓄水村",
    font: "22px 宋体",
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    fillColor: Cesium.Color.WHITE,
    outlineColor: Cesium.Color.YELLOW,
    outlineWidth: 1.0,
    verticalOrigin: Cesium.VerticalOrigin.CENTER,
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    heightReference: Cesium.HeightReference.NONE,
    // X 和 Y 轴方向上的偏移量
    pixelOffset: new Cesium.Cartesian2(0, -25),
  },
});

viewer.flyTo(point, {
  duration: 3.0,
  offset: new Cesium.HeadingPitchRange(0, -90, 1000),
});
```

:::

| ![2026-04-16_21-18-36](./assets/2026-04-16_21-18-36.png) | ![2026-04-16_21-38-40](./assets/2026-04-16_21-38-40.png) |
| :------------------------------------------------------: | :------------------------------------------------------: |
|                           单点                           |                     单点和 Label 标签                      |



## Polyline（线段）

```ts
const polyline = viewer.entities.add({
  name: "polyline",
  polyline: {
    // 不需要高度时，使用 fromDegreesArray 传入经度、纬度
    positions: Cesium.Cartesian3.fromDegreesArray([104.413264, 32.603808, 104.450848, 32.5903484]),
    // 而需要高度时，使用 fromDegreesArrayHeights 传入经度、纬度、高度
    // positions: Cesium.Cartesian3.fromDegreesArrayHeights([104.413264, 32.603808, 2471.6, 104.450848, 32.5903484, 2344.1]),
    // 线宽
    width: 5,
    // 是否贴合地表
    clampToGround: true,
    // 沿地球表面绘制
    arcType: Cesium.ArcType.GEODESIC,
    // 基础材质
    material: new Cesium.ColorMaterialProperty(Cesium.Color.AQUAMARINE),
    // material: Cesium.Color.fromCssColorString("#00ffff"),
    // 根据距离控制折线的可见性
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000),
    // 折线的精细颗粒度，值越小颗粒度越精细，渲染压力越大
    // granularity: Cesium.Math.RADIANS_PER_DEGREE,
    // 图形如何贴附在场景中的事物上（BOTH：表示线会贴附在地形和3D Tiles模型上）
    classificationType: Cesium.ClassificationType.BOTH,
    // 是否接收投射阴影
    shadows: Cesium.ShadowMode.DISABLED,
    // 多条折线出现重叠时，该值越大，折线的显示优先级越高（仅在clampToGround为true时生效）
    zIndex: 1,
  },
});

viewer.flyTo(polyline, {
  duration: 3.0,
  offset: new Cesium.HeadingPitchRange(0, -90, 10000),
});
```

![2026-04-16_22-15-04](./assets/2026-04-16_22-15-04.png)



## Polygon（多边形）

::: code-group

```ts [基础多边形]
const positions = Cesium.Cartesian3.fromDegreesArray([110, 30, 110, 25, 115, 30]);
// 指定高度时，搭配 perPositionHeight 使用
// const positions = Cesium.Cartesian3.fromDegreesArrayHeights([110, 30, 10000, 110, 25, 200000, 115, 30, 300000]);

const polygon = viewer.entities.add({
  name: "polygon",
  polygon: {
    // 定义多边形的顶点位置
    hierarchy: {
      // 外部顶点
      positions: positions,
      // 内部带孔的顶点，平面多边形时可忽略
      holes: [],
    },
    // 是否开启多边形填充
    fill: true,
    // 多边形材质
    material: Cesium.Color.YELLOW.withAlpha(0.5),
    // 是否开启多边形外边框轮廓
    outline: true,
    // 外边框线宽（受WebGL底层影响，该线宽只会显示为1px）
    outlineWidth: 1,
    // 外边框颜色
    outlineColor: Cesium.Color.WHITE,
    // 多边形相对于椭球面的高度
    height: 10000,
    // 指定高度是相对于什么而言的
    heightReference: Cesium.HeightReference.NONE,
    // 多边形的拉伸高度
    extrudedHeight: 50000,
    // 指定拉伸高度相对于什么而言的
    extrudedHeightReference: Cesium.HeightReference.NONE,
    // 纹理旋转角度（弧度制）
    stRotation: Cesium.Math.toRadians(60),
    // 是否使用每个顶点的单独高度（可搭配 fromDegreesArrayHeights 使用）
    perPositionHeight: false,
    // 多边形按地球表面贴地绘制
    arcType: Cesium.ArcType.GEODESIC,
    // 是否闭合顶部
    closeTop: true,
    // 是否闭合底部
    closeBottom: true,
    // 图形如何贴附在场景中的事物上（BOTH：表示线会贴附在地形和3D Tiles模型上）
    classificationType: Cesium.ClassificationType.BOTH,
    // 根据距离控制多边形的可见性
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000000),
    // 多个多边形重合时，值越大多边形显示的越靠上
    zIndex: 0,
  },
});

viewer.zoomTo(polygon);
```

```ts [回型多边形]
// 外部顶点坐标
const outerPositions = Cesium.Cartesian3.fromDegreesArray([
  116.39, 39.9, 116.41, 39.9, 116.41, 39.92, 116.39, 39.92,
]);
// 内部孔洞左边
const innerPositions = Cesium.Cartesian3.fromDegreesArray([
  116.397, 39.907, 116.403, 39.907, 116.403, 39.913, 116.397, 39.913,
]);

const polygon = viewer.entities.add({
  name: "polygon",
  polygon: {
    // 定义多边形的顶点位置
    hierarchy: new Cesium.PolygonHierarchy(outerPositions, [
      new Cesium.PolygonHierarchy(innerPositions),
    ]),
    // 是否开启多边形填充
    fill: true,
    // 多边形材质
    material: Cesium.Color.YELLOW.withAlpha(0.5),
    // 是否开启多边形外边框轮廓
    outline: true,
    // 外边框线宽（受WebGL底层影响，该线宽只会显示为1px）
    outlineWidth: 1,
    // 外边框颜色
    outlineColor: Cesium.Color.WHITE,
    // 多边形相对于椭球面的高度
    height: 1000,
    // 指定高度是相对于什么而言的
    heightReference: Cesium.HeightReference.NONE,
    // 多边形的拉伸高度
    extrudedHeight: 2000,
    // 指定拉伸高度相对于什么而言的
    extrudedHeightReference: Cesium.HeightReference.NONE,
    // 纹理旋转角度（弧度制）
    stRotation: Cesium.Math.toRadians(60),
    // 是否使用每个顶点的单独高度（可搭配 fromDegreesArrayHeights 使用）
    perPositionHeight: false,
    // 多边形按地球表面贴地绘制
    arcType: Cesium.ArcType.GEODESIC,
    // 是否闭合顶部
    closeTop: true,
    // 是否闭合底部
    closeBottom: true,
    // 图形如何贴附在场景中的事物上（BOTH：表示线会贴附在地形和3D Tiles模型上）
    classificationType: Cesium.ClassificationType.BOTH,
    // 根据距离控制多边形的可见性
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000000),
  },
});

viewer.zoomTo(polygon);
```

:::

| ![2026-04-16_22-51-31](./assets/2026-04-16_22-51-31.png) | ![2026-04-16_23-00-56](./assets/2026-04-16_23-00-56.png) |
| :------------------------------------------------------: | :------------------------------------------------------: |
|                        基础多边形                        |                        回型多边形                        |



## PolylineVolume（多线段柱体）

```ts
function addPolylineVolume() {
  const polylineVolume = viewer.entities.add({
    name: "polylineVolume",
    polylineVolume: {
      show: true,
      // 定义多段线柱体的位置数组
      positions: Cesium.Cartesian3.fromDegreesArray([-85.0, 32.0, -85.0, 36.0, -89.0, 36.0]),
      // 指定位置的数组，这些位置定义了要拉伸的形状
      shape: computeCircle(60000),
      // 定义拐角的样式
      cornerType: Cesium.CornerType.ROUNDED,
      // 是否开启填充
      fill: true,
      // 多段线柱体材质
      material: Cesium.Color.RED,
      // 是否开启外边线轮廓
      outline: true,
      // 外边线轮廓颜色
      outlineColor: Cesium.Color.WHITE,
      // 外边线轮廓宽度
      outlineWidth: 1,
      // 根据距离控制多段线柱体的可见性
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 300000),
    },
  });

  viewer.zoomTo(polylineVolume);
}

function computeCircle(radius: number) {
  const positions = [];
  for (let i = 0; i < 360; i++) {
    const radians = Cesium.Math.toRadians(i);
    positions.push(
      new Cesium.Cartesian2(
        radius * Math.cos(radians),
        radius * Math.sin(radians),
      ),
    );
  }
  return positions;
}
```

![2026-04-16_23-16-50](./assets/2026-04-16_23-16-50.png)



## Plane（平面）

```ts {15}
const plane = viewer.entities.add({
  name: "plane",
  position: Cesium.Cartesian3.fromDegrees(116.39, 38.9, 10000),
  plane: {
    // 指定平面的法线和距离（UNIT_Z表示平面垂直于Z轴）
    plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0.0),
    // 平面的长度和宽度
    dimensions: new Cesium.Cartesian2(100000, 100000),
    // 根据距离控制实体是否展示
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 3000000),
    // 是否开启平面填充
    fill: true,
    // 平面材质，也可以填充一张图片
    material: Cesium.Color.YELLOW.withAlpha(0.5),
    // material: "/images/plane.jpg", // 可以指定图片作为填充
    // 是否开启外边框轮廓
    outline: true,
    // 外边框宽度
    outlineWidth: 1,
    // 外边框颜色
    outlineColor: Cesium.Color.WHITE,
  },
});

viewer.zoomTo(plane);
```

| ![2026-04-16_23-27-03](./assets/2026-04-16_23-27-03.png) | ![2026-04-16_23-27-26](./assets/2026-04-16_23-27-26.png) |
| :------------------------------------------------------: | :------------------------------------------------------: |
|                         颜色填充                         |                         图片填充                         |



## Box（盒子）

```ts
const box = viewer.entities.add({
  name: "box",
  position: Cesium.Cartesian3.fromDegrees(102.7362, 38.0249, 50000),
  box: {
    // 指定长宽高
    dimensions: new Cesium.Cartesian3(100000, 200000, 50000),
    // 指定高度是相对于什么的高度
    heightReference: Cesium.HeightReference.NONE,
    // 根据距离控制实体是否展示
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 3000),
    // 是否开启填充
    fill: true,
    // 填充材质
    material: Cesium.Color.YELLOW.withAlpha(0.5),
    // 是否开启外边框轮廓
    outline: true,
    // 外边框线宽
    outlineWidth: 5,
    // 外边框颜色
    outlineColor: Cesium.Color.WHITE,
  },
});

viewer.zoomTo(box);
```

![2026-04-16_23-34-32](./assets/2026-04-16_23-34-32.png)



## Rectangle（矩形）

> [!NOTE] 提示
>
> Rectangle 矩形默认是 **不贴地** 的，它是贴在椭球表面上的几何体，不会自动跟地形起伏走。

```ts
const rectangle = viewer.entities.add({
  name: "rectangle",
  // position: Cesium.Cartesian3.fromDegrees(102.7362, 38.0249, 0),
  rectangle: {
    // 矩形的坐标（西，南，东，北）
    coordinates: Cesium.Rectangle.fromDegrees(100.908314, 29.007281, 102.265492, 29.987075),
    // 距离地面的高度
    height: 10000,
    // 贴地显示（不生效）
    // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    // 拉伸高度
    extrudedHeight: 20000,
    // 是否开启材质填充
    fill: true,
    // 填充材质
    material: Cesium.Color.YELLOW.withAlpha(0.5),
    // material: "/images/plane.jpg", // 也可以使用图片填充
    // 填充材质纹理的旋转角度（正北，逆时针旋转）
    stRotation: Cesium.Math.toRadians(90),
    // 是否开启外边线框
    outline: true,
    // 外边线宽
    outlineWidth: 1,
    // 外边线框颜色
    outlineColor: Cesium.Color.WHITE,
    // 矩形旋转角度（正北, 顺时针旋转）
    rotation: Cesium.Math.toRadians(90),
    // 根据距离控制实体是否展示
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 3000),
    // 是否接收投射阴影
    shadows: Cesium.ShadowMode.DISABLED,
    // 图形如何贴附在场景中的事物上（不生效）
    classificationType: Cesium.ClassificationType.BOTH
  },
});

viewer.zoomTo(rectangle);
```

| ![2026-04-18_10-25-45](./assets/2026-04-18_10-25-45.png) | ![2026-04-18_10-15-18](./assets/2026-04-18_10-15-18.png) |
| :------------------------------------------------------: | :------------------------------------------------------: |
|                    颜色填充（不贴地）                    |                         图片填充                         |



## Ellipse（椭圆）

```ts
const ellipse = viewer.entities.add({
  name: "ellipse",
  position: Cesium.Cartesian3.fromDegrees(116.3975, 39.9075, 0),
  ellipse: {
    // 长半轴长度
    semiMajorAxis: 100,
    // 短半轴长度
    semiMinorAxis: 50,
    // 椭圆相对于椭球表面的高度
    height: 50,
    // 指定 height 属性的高度参考模式，设置为 NONE 时，height 才会生效
    heightReference: Cesium.HeightReference.NONE,
    // 椭圆的拉伸高度
    extrudedHeight: 100,
    // 指定 extrudedHeight 属性的高度参考模式
    extrudedHeightReference: Cesium.HeightReference.NONE,
    // 根据相机距离控制椭圆是否显示
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 3000),
    // 椭圆的旋转角度（正北，逆时针旋转）
    rotation: Cesium.Math.toRadians(0),
    // 椭圆的轮廓线数量，值越大，轮廓线越多，椭圆越圆
    numberOfVerticalLines: 128,
    // 是否填充
    fill: true,
    // 填充材质
    material: Cesium.Color.YELLOW.withAlpha(0.5),
    // material: "/images/plane.jpg", // 使用图片作为填充纹理
    // 纹理的旋转角度（正北，顺时针旋转）
    // stRotation: Cesium.Math.toRadians(45),
    // 是否开启外轮廓线
    outline: true,
    // 外轮廓线宽
    outlineWidth: 1,
    // 外轮廓线颜色
    outlineColor: Cesium.Color.WHITE,
    // 图形如何贴附在场景中的事物上（BOTH：表示线会贴附在地形和3D Tiles模型上）
    classificationType: Cesium.ClassificationType.BOTH,
  },
});
viewer.zoomTo(ellipse);
```

![2026-04-25_11-41-35](./assets/2026-04-25_11-41-35.png)



## Cylinder（圆柱/圆锥）

```ts
const cylinder = viewer.entities.add({
  name: "cylinder",
  position: Cesium.Cartesian3.fromDegrees(116.3975, 39.9075, 0),
  cylinder: {
    // 圆柱体长度
    length: 300,
    // 圆柱体顶部半径
    topRadius: 200,
    // 圆柱体底部半径
    bottomRadius: 200,
    // 指定高度参考，设置为 NONE 会飘
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    // 根据相机距离控制点是否显示
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 3000),
    // 沿轮廓的周长绘制的垂直线的数量
    numberOfVerticalLines: 128,
    // 侧面切片数，默认128（如 4 的时候表示四棱台）
    slices: 128,
    // 是否填充
    fill: true,
    // 填充材质
    material: Cesium.Color.YELLOW.withAlpha(0.8),
    // 是否开启外轮廓
    outline: true,
    // 外轮廓宽度
    outlineWidth: 1,
    // 外轮廓颜色
    outlineColor: Cesium.Color.WHITE,
  },
});
viewer.zoomTo(cylinder);
```

| ![2026-04-25_11-57-27](./assets/2026-04-25_11-57-27.png) | ![2026-04-25_11-57-50](./assets/2026-04-25_11-57-50.png) |
| :------------------------------------------------------: | :------------------------------------------------------: |
|                           圆柱                           |                           圆锥                           |
| ![2026-04-25_12-01-34](./assets/2026-04-25_12-01-34.png) | ![2026-04-25_12-00-00](./assets/2026-04-25_12-00-00.png) |
|                          六棱台                          |                         128 棱台                          |



## Ellipsoid（椭球体）

```ts
const ellipsoid = viewer.entities.add({
  name: "ellipsoid",
  position: Cesium.Cartesian3.fromDegrees(116.3975, 39.9075, 1000),
  ellipsoid: {
    // 椭球半径
    radii: new Cesium.Cartesian3(200, 100, 300),
    // 椭球内部半径（设置 maximumClock 为 180 查看）
    innerRadii: new Cesium.Cartesian3(100, 50, 150),
    // 椭球体绕着垂直轴(Z轴)旋转裁切的起始角度（对应地球的经度）
    minimumClock: 0,
    // 椭球体绕着垂直轴(Z轴)旋转裁切的结束角度（对应地球的经度）
    maximumClock: Cesium.Math.toRadians(360),
    // 椭圆体从北极向下偏离的起始角度（对应地球的纬度）
    minimumCone: 0,
    // 椭圆体从北极向下偏离的结束角度（对应地球的纬度）
    maximumCone: Cesium.Math.toRadians(180),
    // 指定高度参考，设置为 NONE 会飘
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    // 是否按视距控制实体的显示
    // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000),
    // 沿纬度切割的线数
    stackPartitions: 64,
    // 沿经度切割的线数
    slicePartitions: 64,
    // 每个轮廓环的样本数，确定曲率的粒度
    subdivisions: 128,
    // 是否填充
    fill: true,
    // 填充材质
    material: Cesium.Color.YELLOW.withAlpha(0.5),
    // 是否显示外轮廓线
    outline: true,
    // 外轮廓线宽度
    outlineWidth: 1,
    // 外轮廓线颜色
    outlineColor: Cesium.Color.WHITE,
  },
});
viewer.zoomTo(ellipsoid);
```

> [!NOTE] 参数详解
>
> **Clock (时钟角/经度方向)**
>
> 对应地球的 **经度**，它绕着 **垂直轴（Z 轴）旋转**。如果设置 0 ~ 180，结果就像是一个半开的西瓜。
>
> - `minimumClock`：起始角度，默认 0；
> - `maximumClock`：结束角度，默认 360；
>
> **Cone（圆锥角/纬度方向）**
>
> - `minimumCone`：从北极向下偏离的角度，默认 0；
> - `manimumCone`：停止偏离的角度，默认 180；
>
> 对应地球的纬度（从北极点开始计算）。如果设置 0 ~ 90，结果就像是一个半圆。

| ![2026-04-25_15-17-27](./assets/2026-04-25_15-17-27.png) | ![2026-04-25_15-23-58](./assets/2026-04-25_15-23-58.png) |
| :------------------------------------------------------: | :------------------------------------------------------: |
|                          椭球体                          |                        开启轮廓线                        |
| ![2026-04-25_15-23-06](./assets/2026-04-25_15-23-06.png) | ![2026-04-25_15-21-56](./assets/2026-04-25_15-21-56.png) |
|                     maximumCone 为 90                      |                    maximumClock 为 270                     |



## Corridor（走廊）

```ts
const corridor = viewer.entities.add({
  name: "corridor",
  corridor: {
    positions: Cesium.Cartesian3.fromDegreesArray([-80.0, 40.0, -85.0, 40.0, -85.0, 35.0]),
    // 走廊宽度
    width: 200000,
    // 走廊高度
    height: 200000,
    // 指定 height 属性的高度参考，设置为 CLAMP_TO_GROUND 时，height 无效
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    // 拉伸高度
    extrudedHeight: 100000,
    // 拉伸高度参考
    extrudedHeightReference: Cesium.HeightReference.NONE,
    // 拐角的类型
    cornerType: Cesium.CornerType.ROUNDED,
    // 是否填充
    fill: true,
    // 填充材质
    material: Cesium.Color.SKYBLUE.withAlpha(0.5),
    // 是否开启外轮廓
    outline: true,
    // 外轮廓宽度
    outlineWidth: 1,
    // 外轮廓颜色
    outlineColor: Cesium.Color.WHITE,
    // 图形如何贴附在场景中的事物上（BOTH：表示线会贴附在地形和3D Tiles模型上）
    classificationType: Cesium.ClassificationType.BOTH,
  },
});
viewer.zoomTo(corridor);
```

![2026-04-25_15-53-22](./assets/2026-04-25_15-53-22.png)



## Wall（墙）

```ts
const wall = viewer.entities.add({
  name: "wall",
  wall: {
    positions: Cesium.Cartesian3.fromDegreesArray([
      116.3975, 39.9075,
      116.4075, 39.9075,
      116.4075, 39.9175,
      116.3975, 39.9175,
      116.3975, 39.9075,
    ]),
    // 每个顶点的最小高度
    minimumHeights: [100, 200, 300, 400, 100],
    // 每个顶点的最大高度
    maximumHeights: [300, 400, 500, 600, 300],
    // 是否开启填充
    fill: true,
    // 填充材质
    material: Cesium.Color.GREENYELLOW.withAlpha(0.8),
    // material: "/images/plane.jpg",
    // 是否开启外轮廓
    outline: true,
    // 外轮廓宽度
    outlineWidth: 1,
    // 外轮廓颜色
    outlineColor: Cesium.Color.WHITE,
    // 根据相机距离控制椭圆是否显示
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5000),
  },
});
viewer.zoomTo(wall);
```

| ![2026-04-25_16-03-04](./assets/2026-04-25_16-03-04.png) | ![2026-04-25_16-04-57](./assets/2026-04-25_16-04-57.png) |
| :------------------------------------------------------: | :------------------------------------------------------: |
|                       单独顶点高度                       |                 相同顶点高度（图片材质）                 |



## Label（文字）

```ts
const label = viewer.entities.add({
  name: "label",
  position: Cesium.Cartesian3.fromDegrees(102.7362, 38.0249, 10),
  label: {
    text: "天青色等烟雨，\n而我在等你。",
    // 字体大小和样式
    font: "30px 宋体",
    // 字体缩放
    scale: 1,
    // 指定坐标高度相对于什么，NONE时坐标高度生效
    heightReference: Cesium.HeightReference.NONE,
    // 文字垂直居中
    verticalOrigin: Cesium.VerticalOrigin.CENTER,
    // 文字水平居中
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    // 文字颜色样式
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    // 文字颜色
    fillColor: Cesium.Color.fromCssColorString("#22385b"),
    // 文字描边颜色
    outlineColor: Cesium.Color.fromCssColorString("#fff"),
    // 文字描边宽度
    outlineWidth: 3,
    // 是否显示背景颜色
    showBackground: true,
    // 背景颜色
    backgroundColor: Cesium.Color.fromCssColorString("#ffffff").withAlpha(0.6),
    // 背景的padding值
    backgroundPadding: new Cesium.Cartesian2(7, 5),
    // 永远禁用深度检测
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    // 根据相机距离调整文字大小
    scaleByDistance: new Cesium.NearFarScalar(1000, 2.0, 5000, 0.5),
    // 根据相机距离调整透明度
    translucencyByDistance: new Cesium.NearFarScalar(1000, 1.0, 5000, 0.3),
    // 根据相机距离控制点是否显示
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 3000),
    // 在屏幕平面上，将标签从描点位置向四周偏移
    pixelOffset: new Cesium.Cartesian2(50, 50),
    // 基于相机的偏移，即使点在山后，通过负Z值将其“拉近”到相机视角前方
    eyeOffset: new Cesium.Cartesian3(0.0, 0.0, -100.0)
  },
});
viewer.zoomTo(label);
```

![2026-04-25_16-31-06](./assets/2026-04-25_16-31-06.png)



## Billboard（广告牌）

::: code-group

```ts [标牌]
const billboard = viewer.entities.add({
  name: "billboard",
  position: Cesium.Cartesian3.fromDegrees(113.122717, 23.028762, 10),
  billboard: {
    image: "/images/billboard.png",
    width: 160,
    height: 160,
    // 标牌缩放比例
    scale: 0.8,
    // 在屏幕平面上，将标签从描点位置向四周偏移
    pixelOffset: new Cesium.Cartesian2(50, 50),
    // 基于相机的偏移，即使点在山后，通过负Z值将其“拉近”到相机视角前方
    eyeOffset: new Cesium.Cartesian3(0.0, 0.0, -100.0),
    // 垂直对齐方式
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    // 水平对齐方式
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    // 标牌的高度参考
    heightReference: Cesium.HeightReference.NONE,
    // 标牌颜色（通过该属性可直接修改标牌颜色）
    color: Cesium.Color.LIME,
    // 标牌旋转角度（正北，顺时针）
    rotation: Cesium.Math.toDegrees(90),
    // 指定标牌的旋转轴
    alignedAxis: Cesium.Cartesian3.ZERO,
    // 永远禁用深度检测
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    // 根据相机距离调整标牌大小
    scaleByDistance: new Cesium.NearFarScalar(1000, 2.0, 5000, 0.5),
    // 根据相机距离调整透明度
    translucencyByDistance: new Cesium.NearFarScalar(1000, 1.0, 5000, 0.3),
    // 根据相机距离控制点是否显示
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 3000),
  },
});
viewer.zoomTo(billboard);
```

```ts [标牌+文字]
const billboard = viewer.entities.add({
  name: "billboard",
  position: Cesium.Cartesian3.fromDegrees(113.122717, 23.028762, 10),
  label: {
    text: "百货大楼",
    font: "bold 30px 楷体",
    scale: 0.8,
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    fillColor: Cesium.Color.fromCssColorString("#22385b"),
    outlineColor: Cesium.Color.fromCssColorString("#ffffff"),
    outlineWidth: 3,
    pixelOffset: new Cesium.Cartesian2(0, -110),
  },
  billboard: {
    image: "/images/billboard.png",
    width: 160,
    height: 160,
    // 标牌缩放比例
    scale: 0.8,
    // 在屏幕平面上，将标签从描点位置向四周偏移
    pixelOffset: new Cesium.Cartesian2(50, 50),
    // 基于相机的偏移，即使点在山后，通过负Z值将其“拉近”到相机视角前方
    eyeOffset: new Cesium.Cartesian3(0.0, 0.0, -100.0),
    // 垂直对齐方式
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    // 水平对齐方式
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    // 标牌的高度参考
    heightReference: Cesium.HeightReference.NONE,
    // 标牌颜色（通过该属性可直接修改标牌颜色）
    color: Cesium.Color.LIME,
    // 标牌旋转角度（正北，顺时针）
    rotation: Cesium.Math.toDegrees(90),
    // 指定标牌的旋转轴
    alignedAxis: Cesium.Cartesian3.ZERO,
    // 永远禁用深度检测
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    // 根据相机距离调整标牌大小
    scaleByDistance: new Cesium.NearFarScalar(1000, 2.0, 5000, 0.5),
    // 根据相机距离调整透明度
    translucencyByDistance: new Cesium.NearFarScalar(1000, 1.0, 5000, 0.3),
    // 根据相机距离控制点是否显示
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 3000),
  },
});
viewer.zoomTo(billboard);
```

:::

| ![2026-04-25_20-23-48](./assets/2026-04-25_20-23-48.png) | ![2026-04-25_20-24-40](./assets/2026-04-25_20-24-40.png) |
| :------------------------------------------------------: | :------------------------------------------------------: |
|                      Billboard标牌                       |                 Billboard标牌+Label文字                  |

