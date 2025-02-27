# Entity 拾取

## 鼠标事件拾取

鼠标点击事件通过 `new Cesium.ScreenSpaceEventHandler()` 方法注册，拾取实体的信息可以通过以下两种方式：

| 方法                     | 作用                                                      |
| ------------------------ | --------------------------------------------------------- |
| viewer.scene.pick()      | 拾取窗体坐标处最顶部的实体（如两个 point 完全重合在一起） |
| viewer.scene.drillPick() | 拾取窗体坐标处的实体列表                                  |

示例：

```js {5,9}
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

handler.setInputAction(e => {
  // 方式一
  const picked = viewer.scene.pick(e.position);
  const entity = Cesium.defaultValue(picked.id, picked.primitive.id);
    
  // 方式二  
  const pickedPrimitives = viewer.scene.drillPick(e.position);
  const entities: any[] = [];

  if (pickedPrimitives.length > 0) {
    pickedPrimitives.forEach(picked => {
      const entity = Cesium.defaultValue(picked.id, picked.primitive.id);
      entities.push(entity);
    });
  }
  console.log(entities);
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
```



## 快速拾取

Cesium 针对 Entity 方式添加的几何图形，提供了 [`selectedEntityChanged`](https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html?classFilter=viewer#selectedEntityChanged) 属性，来帮助我们快速选择 Entity，通过这个属性，用户无需再注册鼠标事件了。

```js
viewer.selectedEntityChanged.addEventListener(entity => {
  console.log(entity);
});
```



在某些场景中，我们可能需要跟踪一辆车或一个人员时，可以把车的 Entity 实体赋值给 viewer.tranckedEntity，把相机自动追踪到你绑定的 Entity 实体上。

```js
viewer.trackedEntity = entity;
```

当需要切换另一个车辆时，我们可以使用 [`trackedEntityChanged`](https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html?classFilter=viewer#trackedEntityChanged) 属性：

```js
// 需要双击才能触发
viewer.trackedEntityChanged.addEventListener(entity => {
  console.log(entity);
});
```
