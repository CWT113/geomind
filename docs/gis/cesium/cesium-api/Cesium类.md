# Cesium类



## 方法

### sampleTerrain

[`sampleTerrain`](https://cesium.com/learn/cesiumjs/ref-doc/global.html?classFilter=sampleTerrain#sampleTerrain) 方法用于从 **地形数据中采样特定位置高度** 的方法。

语法：

```js
Cesium.sampleTerrain(terrainProvider, level, positions, rejectOnTileFail)
```

参数：

|       参数       | 描述                                                         |
| :--------------: | :----------------------------------------------------------- |
| terrainProvider  | 地图中使用的地形provider                                     |
|      level       | 查询地形的层次细节                                           |
|    positions     | 要查询地形中高度的位置点坐标，可以数组存放多个               |
| rejectOnTileFail | 默认为 false。为 true 时，若地形高度请求失败，则 Promise 直接抛出错误，为 false 时，则为 undefined |

```js {14}
// 地形Provider
const terrainProvider = await Cesium.createWorldTerrainAsync({
  requestVertexNormals: true,
  requestWaterMask: true,
});

const viewer = new Cesium.Viewer("cesiumContainer", {
  infoBox: false,
  terrainProvider: terrainProvider,
});

// positions可以是多个点的集合
const positions = [Cesium.Cartographic.fromDegrees(86.925145, 27.988257)];
const updatedPositions = await Cesium.sampleTerrain(terrainProvider, 11, positions);

console.log(`当前点的高度是 ${updatedPositions[0].height} 米`);
```



### CustomDataSource

`CustomDataSource`  是Cesium中的一个数据源类，允许你将**自定义的空间数据（例如点、线、面等）添加到场景中**。

```js {5}
const viewer = new Cesium.Viewer("cesiumContainer", {
  infoBox: false,
});

const customDataSource = new Cesium.CustomDataSource("myDataSource");

// 将自定义数据源添加到viewer
viewer.dataSources.add(customDataSource);
// 移除所有数据源
viewer.dataSources.removeAll();
```

还可以向 customDataSource 中添加 Entity 实体：

```js {26,27}
const viewer = new Cesium.Viewer("cesiumContainer", {
  infoBox: false,
});

const customDataSource = new Cesium.CustomDataSource("myDataSource");
// 将自定义数据源添加到viewer
viewer.dataSources.add(customDataSource);

// 想数据源中添加一个点
const entity = customDataSource.entities.add({
  id: "1001",
  name: "Point_1001",
  position: Cesium.Cartesian3.fromDegrees(114.169, 22.319, 100),
  point: {
    pixelSize: 10,
    color: Cesium.Color.RED,
  },
  label: {
    text: "Point_1001",
    font: "14pt sans-serif",
    fillColor: Cesium.Color.WHITE,
  },
});

// 允许随时更新实体对象
entity.position = Cesium.Cartesian3.fromDegrees(120.0, 30.0, 200);
entity.point.pixelSize = 15;

// 获取实体
const entityById = customDataSource.entities.getById("1001");
// 获取所有实体
const entities = customDataSource.entities.values;

// 移除已添加的实体
customDataSource.entities.remove(entity);
// 移除所有已添加的实体
customDataSource.entities.removeAll();
```











