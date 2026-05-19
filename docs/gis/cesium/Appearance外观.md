---
date: 2026-05-07 23:38:26
---

# Appearance

Appearance（外观）决定了 Primitive（几何体）如何在屏幕上渲染物体。简单来说，Geometry（几何）定义了物体的“骨架”，而 Appearance 定义了它的“皮肤”和“质感”。

> [!NOTE] Appearance 的核心作用
>
> 1. **材质定义（Material）**
>
>    这是 Appearance 最主要的功能。它通过 Material 对象定义物体的颜色、纹理、透明度以及反射特性。
>
>    - 单一颜色：例如纯红色的立方体；
>    - 图片纹理：将一张图片（如木纹、大理石）贴在几何体表面；
>    - 动态材质：实现如流动的水面、闪烁的线条等效果；
>
> 2. **着色器管理（Shader Management）**
>
>    Appearance 封装了底层的 GLSL 着色器（Vertex Shader 和 Fragment Shader）。
>
>    - 它负责将几何体的顶点数据转换成屏幕上的像素；
>    - 如果你需要自定义特殊的渲染效果（如热力图或动态波纹），需要通过编写自定义着色器；
>
> 3. **渲染状态控制（Render State）**
>
>    它决定了显卡如何处理物体，常见的设置包括：
>
>    - 深度测试（Depth Test）：决定物体是否会被遮挡；
>    - 混合模式（Blending）：决定半透明物体如何与背景融合；
>    - 背面剔除（Culling）：决定是否渲染物体的背面（是否节省性能）；

Entity 的 material 和 Primitive 的 appearance 对比：

|  特性  | Entity（MaterialProperty） |  Primitive(Appearance)  |
| :----: | :------------------------: | :---------------------: |
| 易用性 |  高，自动处理很多底层逻辑  | 较低，需要了解 WebGL 知识 |
|  性能  | 一般，适合少量、动态的对象 | 极高，适合渲染数以万计的静态几何体 |
| 灵活性 | 预设丰富，但自定义空间有限 | 极高，可以完全控制着色器 |



## MaterialAppearance

`MaterialAppearance` 是通用的 3D 几何体外观类，它用于 **将材质属性（颜色、纹理、光照效应）映射到非地表平面的任意几何体上**。

> [!NOTE] 适用场景
>
> 由于它依赖法线和纹理坐标，通常可用于以下场景：
>
> - **自定义 3D 几何体**：当通过 `new Geometry()` 手动构建一个复杂的 3D 模型，并希望给它贴上图片或动态材质时；
> - **拉伸后的几何体**：比如拉伸的多边形（墙体、建筑），这些几何体有侧面和顶面，需要利用法线来表现光影明暗；
> - **动态特效**：
>   - **流动特效**：结合 `Material.fromType('PolylineGlossy')` 或自定义着色器实现流光特效；
>   - **雷达扫描**：在一个圆锥体或圆柱体 Primitive 上应用扇形扫描材质；
> - **需要光照交互的非贴地物体**：如果物体悬浮在空中且需要根据太阳光位置产生明暗变化，必须使用 `MaterialAppearance`；

|         参数         |   类型   | 作用说明                                                     |
| :------------------: | :------: | ------------------------------------------------------------ |
|         flat         | Boolean  | 是否禁用光照计算。若为 true，地表颜色保持纯净，不受太阳光阴影影响 |
|     faceForward      | Boolean  | 当光照计算时，是否让法线始终指向视点。通常用于没有厚度的平面，确保正反两面看起来光照一致 |
|     translucent      | Boolean  | 是否支持半透明，如果材质包含透明度，需要设置为 true           |
|        closed        | Boolean  | 几何体是否为封闭体（如球体、盒子）。如果为 true，Cesium 会优化背面剔除，可节省性能 |
|   materialSupport    |          |                                                              |
|       material       | Material | 定义物体的外观材质，默认为白色颜色材质                       |
|  vertexShaderSource  |  String  | 可选。自定义顶点着色器代码，会覆盖默认的着色器               |
| fragmentShaderSource |  String  | 可选。自定义片元着色器代码，会覆盖默认的着色器               |
|     renderState      |  Object  | 可选。底层深度测试、混合模式等渲染状态的配置                 |

```ts
```





## EllipsoidSurfaceAppearance

`EllipsoidSurfaceAppearance` 与通用的 `MaterialAppearance` 不同，它是一个专门为 **贴地或平行于地表的几何体** 设计的着色方案。

它的优势在于 假设几何体是平行于地表的，就可以使用大量的数学优化（如法向量计算），从而提高渲染性能。

> [!NOTE] 适用场景
>
> - **贴地多边形**：在地图上绘制一个行政区划图层，或者一块绿地；
> - **拉伸的多边形顶部**：当创建了一个有高度的建筑模型时，其顶面可以使用此外观；
> - **椭圆与圆**：在地面上绘制一个预警圆圈或雷达范围；
> - **矩形区域**：加载一张局部的卫星影像贴图或热力图贴图到特定的经纬度矩形框内；

| 参数                 | 类型     | 作用说明                                                     |
| -------------------- | -------- | ------------------------------------------------------------ |
| flat                 | Boolean  | 是否禁用光照计算。若为 true，地表颜色保持纯净，不受太阳光阴影影响 |
| faceForward          | Boolean  | 是否让法线始终面向视点，确保地表正反两面渲染一致             |
| translucent          | Boolean  | 是否支持半透明，如果材质包含透明度，需要设置为 true          |
| aboveGround          | Boolean  | 如果为 true，则假定几何体在地面之上（如拉升的墙），如果为 false，则假定几何体完全贴合表面 |
| material             | Material | 应用于地表的材质（如颜色、网格、自定义纹理）                 |
| vertexShaderSource   | String   | 可选。自定义顶点着色器代码，会覆盖默认的着色器               |
| fragmentShaderSource | String   | 可选。自定义片元着色器代码，会覆盖默认的着色器               |
| renderState          | Object   | 可选。底层深度测试、混合模式等渲染状态的配置                 |

```ts
```





## PerInstanceColorAppearance

`PerInstanceColorAppearance` 是最简单、性能最高的外观类之一。它的核心作用是让同一个 Primitive 中的每一个实例都能拥有自己独立的颜色。

假如要渲染 1000 个立方体，且希望每个立方体颜色各不相同，使用它最合理。

> [!TIP] 核心原理
>
> 与其他 Appearance 不同，`PerInstanceColorAppearance` 不使用 `Material` 对象，它的颜色信息必须存储在 `GeometryInsatnce` 的 `attributes` 中。这是因为：
>
> - **内存优化**：因为它不需要处理复杂的纹理映射（UV），只需要在每个顶点传递一个颜色值，因此开销极低；
>
> - **灵活性**：它允许你在运行时动态修改某个特定实例的颜色；
>
>   ```ts
>   const attributes = primitive.getGeometryInstanceAttributes('id');
>   attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.AQUA);
>   ```

> [!NOTE] 适用场景
>
> 它是处理大规模、异色、简单几何体的最佳方案：
>
> - **城市建筑群**：给几千个建筑根据高度或属性赋予不同的颜色（如热力图颜色）；
> - **分类显示**：在地图上展示成百上千个传感器范围，不同类型的传感器显示不同颜色；
> - **动态反馈**：当用户点击某个部件时，通过修改该实例的颜色属性（ColorGeometryInstanceAttribute）来实现高亮效果；

|         参数         |  类型   | 作用说明                                                     |
| :------------------: | :-----: | ------------------------------------------------------------ |
|         flat         | Boolean | 是否禁用光照。若为 true，物体呈现纯色，若为 false，则会根据光照产生明暗变化 |
|     faceForward      | Boolean | 是否让法线始终面向视点。对于只有单面的几何体（如平面），开启此项可确保背面也能看到颜色 |
|     translucent      | Boolean | 是否支持半透明，如果材质包含透明度，需要设置为 true          |
|        closed        | Boolean | 几何体是否为封闭体（如球体、盒子）。如果为 true，Cesium 会优化背面剔除，可节省性能 |
|  vertexShaderSource  | String  | 可选。自定义顶点着色器代码，会覆盖默认的着色器               |
| fragmentShaderSource | String  | 可选。自定义片元着色器代码，会覆盖默认的着色器               |
|     renderState      | Object  | 可选。底层深度测试、混合模式等渲染状态的配置                 |

```ts
```





## PolylineColorAppearance

`PolylineColorAppearance` 是专门为 **线几何体**（PolylineGeometry）设计的一种外观类。它的核心作用是 **支持线段的顶点着色**。

假设你希望一条线的颜色从起点到终点有渐变效果，或者一个 Primitive 中的多条线各自拥有不同的颜色，该属性是最高效的选择。

|         属性         |  类型   | 作用说明                                            |
| :------------------: | :-----: | --------------------------------------------------- |
|     translucent      | Boolean | 是否支持半透明，如果材质包含透明度，需要设置为 true |
|  vertexShaderSource  | String  | 可选。自定义顶点着色器代码，会覆盖默认的着色器      |
| fragmentShaderSource | String  | 可选。自定义片元着色器代码，会覆盖默认的着色器      |
|     renderState      | Object  | 可选。底层深度测试、混合模式等渲染状态的配置        |











## PolylineMaterialAppearance



## DebugAppearance

`DebugAppearance` 是 Ceisum 提供的一个辅助调试工具。它是专门为了让开发者能够看清几何体的底层数据结构，比如法线方向、纹理坐标或分块情况。

当你发现模型显示异常（比如黑块、贴图扭曲或光照奇怪），就可以使用该类调试。

> [!TIP] 核心原理
>
> 它的作用是将不可见的顶点数据映射为可见的颜色：
>
> - **法线可视化（normal）**：将法线向量 $(x,y,z)$ 映射为颜色 $(r,g,b)$。如果物体看起来是一片混乱的彩色，说明法线定义是连续的；如果某个面是纯黑或颜色突变，说明法线计算有误；
> - **纹理坐标可视化（st）**：将 UV 坐标映射为颜色。通常表现为从黑色 $(0,0)$ 到红色、绿色再到黄色 $(1,1)$ 的渐变。这有助于检查贴图是否被错误地拉伸或翻转。

> [!NOTE] 适用场景
>
> - 排查光照问题：如果发现模型在阳光下该亮的地方不亮，可以使用 `attributeName: 'normal'`。如果法线朝向内部，光照计算就会出错，通过 `DebugAppearance` 可以一眼看出法线是否反了；
> - **纠正贴图错误**：当图片材质没法正常显示时，检查 `st` 属性。如果看到几何体表面颜色没有平滑渐变，说明纹理坐标没传对；
> - **自定义几何体开发**：在编写复杂的 `new Cesium.Geometry` 代码时，这是验证顶点着色器输入参数最直观的方法；

|         参数         |  类型   | 作用说明                                                     |
| :------------------: | :-----: | ------------------------------------------------------------ |
|    attributeName     | String  | 指定要可视化的属性名。常见值有：position（位置）、normal（法线）、st（纹理坐标）、binormal（副法线）、tangent（切线） |
| perInstanceAttribute | Boolean |                                                              |
|     glslDataType     | String  | 属性在 GLSL 中的数据类型。如 vec3（位置/法线）、vec2（纹理坐标） |
|  vertexShaderSource  | String  | 可选。自定义顶点着色器代码，会覆盖默认的着色器               |
| fragmentShaderSource | String  | 可选。自定义片元着色器代码，会覆盖默认的着色器               |
|     renderState      | Object  | 可选。底层深度测试、混合模式等渲染状态的配置                 |

```ts
```















