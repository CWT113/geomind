# Primitive

Primitive 是由 Geometry 和 Appearance 组合来构造几何图形的，想对于 Entity 实体，它具有以下优势：

- 性能高：当需要绘制大量静态图形时，使用 Primitive 可以将图形组合成一个大图形，从而减少 CPU 的开销；
- 更灵活：Primitive 可以随意组合图形，以达到目的；
- 更底层：Appearance 提供了接近底层的编程风格，可以轻松的顶点、片源着色器、自定义渲染等；



## 多边形

先创建一个[多边形](https://cesium.com/learn/cesiumjs/ref-doc/PolygonGeometry.html)，然后再使用 [Primitive](https://cesium.com/learn/cesiumjs/ref-doc/Primitive.html?classFilter=Primitive) 进行加载。

```js
// 创建多边形
const polygon = new Cesium.PolygonGeometry({
    polygonHierarchy: new Cesium.PolygonHierarchy(
        // 多边形的点可以不用闭合
        Cesium.Cartesian3.fromDegreesArray([
            105.68605750741426, 34.75288383565426, 108.29624998881121,
            31.81290436762565, 111.03516081164923, 34.710256022229814
        ])
    ),
    // 拉伸为柱体
    extrudedHeight: 300000
});

// 创建几何实例
const instance = new Cesium.GeometryInstance({
    id: "polygon",
    geometry: polygon
});

// 使用 Primitive 添加到场景中
viewer.scene.primitives.add(
    new Cesium.Primitive({
        geometryInstances: [instance], // 写为数组是因为可以同时添加多个实例
        appearance: new Cesium.EllipsoidSurfaceAppearance({
            material: Cesium.Material.fromType("Checkerboard")
        }),
        vertexCacheOptimize: true,
        interleave: true
    })
);
```



## 矩形

先创建一个[矩形](https://cesium.com/learn/cesiumjs/ref-doc/RectangleGeometry.html)，然后再通过 [Primitive](https://cesium.com/learn/cesiumjs/ref-doc/Primitive.html?classFilter=Primitive) 进行添加。

```js
const rectangle = new Cesium.RectangleGeometry({
    // 矩形所在的椭球体
    ellipsoid: Cesium.Ellipsoid.WGS84,
    // 左下角和右上角
    rectangle: Cesium.Rectangle.fromDegrees(
        97.60600216295973,
        30.63225182117263,
        104.08431420428155,
        33.91239781994055
    ),
    height: 0, 						// 距离地面的高度(单位:米)
    extrudedHeight: 500000, 		// 矩形的拉伸高度(单位:米)
    rotation: Cesium.Math.toRadians(90) 	// 旋转角度(弧度)
});
```



## 椭圆

先创建一个[椭圆]([EllipseGeometry - Cesium 文档](https://cesium.com/learn/cesiumjs/ref-doc/EllipseGeometry.html))，然后再通过 [Primitive](https://cesium.com/learn/cesiumjs/ref-doc/Primitive.html?classFilter=Primitive) 进行添加。

```js
const ellipse = new Cesium.EllipseGeometry({
    ellipsoid: Cesium.Ellipsoid.WGS84, 			// 椭圆位于椭圆体上
    center: Cesium.Cartesian3.fromDegrees(97.60600216295973, 30.63225182117263),
    semiMajorAxis: 500000.0,
    semiMinorAxis: 300000.0,
    rotation: Cesium.Math.toRadians(60.0),
    vertexFormat: Cesium.VertexFormat.DEFAULT, 	// 顶点格式
    height: 0,
    extrudedHeight: 500000
});
```



## 圆

先创建一个[圆](https://cesium.com/learn/cesiumjs/ref-doc/CircleGeometry.html)，然后再通过 [Primitive](https://cesium.com/learn/cesiumjs/ref-doc/Primitive.html?classFilter=Primitive) 进行添加。

```js
const circle = new Cesium.CircleGeometry({
    ellipsoid: Cesium.Ellipsoid.WGS84,
    center: Cesium.Cartesian3.fromDegrees(97.60600216295973, 30.63225182117263),
    radius: 500000,
    height: 0,
    extrudedHeight: 0,
    granularity: 0.02,
    vertexFormat: Cesium.VertexFormat.DEFAULT
});
```



## 墙面

先创建一个[墙面](https://cesium.com/learn/cesiumjs/ref-doc/WallGeometry.html)，然后再通过 [Primitive](https://cesium.com/learn/cesiumjs/ref-doc/Primitive.html?classFilter=Primitive) 进行添加。

```js
const wall = new Cesium.WallGeometry({
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        100.03950607459842, 33.306117242468474, 100000, 101.92803028254224,
        30.454030583269756, 100000, 105.61159600279109, 32.987925976586666,
        100000, 100.03950607459842, 33.306117242468474, 100000
    ])
});
```







