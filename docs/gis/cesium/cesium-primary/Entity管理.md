# Entity管理

初始化 Viewer 类之后，得到的 viewer 对象会包含一个属性 entities，它的类型是 [EntityCollection](https://cesium.com/learn/cesiumjs/ref-doc/EntityCollection.html?classFilter=EntityCollection) （Entity 集合），它包括了以下方法：

|     方法     | 作用                         |
| :----------: | ---------------------------- |
|    add()     | 添加 entity 实体             |
|  contains()  | 检查是否存在某个 entity 实体 |
|  getById()   | 通过 Id 获取 entity 实体     |
| removeById() | 通过 Id 移除 entity 实体     |
|   remove()   | 移除特定 entity 实体         |
| removeAll()  | 移除全部 entity 实体         |

```js
// 检查是否存在 point1
const hasPoint1 = viewer.entities.contains(point1);
// 通过 Id 获取 point1
const pointById = viewer.entities.getById("point1");
// 通过 Id 移除 point2
viewer.entities.removeById("point2");
// 移除 point3
viewer.entities.remove(point3);
// 移除全部 entity 实体
viewer.entities.removeAll();
```

