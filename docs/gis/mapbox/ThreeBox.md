# Threebox

> NPM 包：https://www.npmjs.com/package/@enfexia/threebox-plugin
>
> Github 文档：https://github.com/jscastro76/threebox/blob/master/docs/Threebox.md
>
> Mapbox 官网示例：https://docs.mapbox.com/mapbox-gl-js/example/add-3d-model-threebox/

Threebox 可以用来在 Mapbox 中添加 Three.js 的三维场景，可以创建一个实现了 CustomLayerInterface 的 Mapbox 自定义图层。

## 安装

安装 @enfexia/threebox-plugin 插件：

```shell
pnpm i @enfexia/threebox-plugin
```

在项目中导入 Threebox 对象：

```js
import { Threebox } from "@enfexia/threebox-plugin";
```



## 基本使用

```ts
// @ts-nocheck
import { Threebox } from "@enfexia/threebox-plugin";

export class useMap3dModelRender {
  private activeMap: any;

  constructor(map: any) {
    this.activeMap = map;

    this.init3dModel();
  }

  /**
   * @description 初始化 3d 模型
   */
  init3dModel() {
    this.activeMap.on("style.load", () => {
      this.activeMap.addLayer({
        id: "custom-threebox-model",
        type: "custom",
        renderingMode: "3d",
        onAdd: (map, gl) => {
          // tb 属性必须挂载到 window 上，因为 Threebox 内部会从 window 中获取它
          window.tb = new Threebox(map, gl, {
            defaultLights: true
          });

          const options = {
            obj: "/model/terminal.glb",
            type: "gltf",
            scale: { x: 1.6, y: 2, z: 1.6 },
            units: "meters",
            rotation: { x: 90, y: -90, z: 0 },
            adjustment: { x: 0.3, y: 0.5, z: 0 }
          };

          tb.loadObj(options, model => {
            model.setCoords([118.78355380411114, 37.50484242549551]);
            model.setRotation({ x: 0, y: 0, z: 183 });
            tb.add(model);
          });
        },
        render: (gl, matrix) => {
          tb.update();
        }
      });
    });
  }
}
```

`tb` 参数：

| 参数                   |  类型   | 描述                                                  |
| :--------------------- | :-----: | :---------------------------------------------------- |
| defaultLights          | boolean | 默认的灯光，为 false 的话，模型会为黑色               |
| enableSelectingObjects | boolean | 模型是否可被选中，当使用下方的三个属性时，必须为 true |
| enableDraggingObjects  | boolean | 模型是否可被拖动，按住 shift + 鼠标左键 拖动          |
| enableRotatingObjects  | boolean | 模型是否可被拉升 z 轴高度，按住 ctrl + 鼠标左键 拉升  |
| enableTooltips         | boolean | 是否添加模型的提示标签                                |

`options` 参数：

| 参数       | 类型                                 | 描述                                     |
| ---------- | ------------------------------------ | ---------------------------------------- |
| obj        | string                               | obj、glb、gltf、fbx、dae 文件的 url 路径 |
| type       | string，可选：mtl、gltf、fbx、dae    | 加载模型的类型                           |
| scale      | number 或 `{x, y, z}`                | 模型在三个轴上的缩放比例                 |
| units      | string，可选：scene、meters          | 推荐使用 meters，更精确                  |
| rotation   | number 或 `{x, y, z}`                | 模型在三个轴上的旋转角度                 |
| adjustment | `{x, y, z}`                          | 模型在三个轴上的位置信息                 |
| feature    | [geojson](https://geojson.org/) 数据 | 存放模型相关的 properties 属性           |

![](./image/03-加载glb模型.jpg)



## [model 模型的事件](https://github.com/jscastro76/threebox/blob/master/docs/Threebox.md#object-events)

```ts
tb.loadObj(options, model => {
    model.setCoords([118.78355380411114, 37.50484242549551]);
    model.setRotation({ x: 0, y: 0, z: 183 });
    // 当选中模型是触发
    model.addEventListener('SelectedChange', onSelectedChange, false);
    // 当选中模型，出现线框时触发
    model.addEventListener('Wireframed', onWireframed, false);
    // 当模型对象的播放动画变化时触发
    model.addEventListener('IsPlayingChanged', onIsPlayingChanged, false);
    // 当拖拽模型时触发
    model.addEventListener('ObjectDragged', onDraggedObject, false);
    // 鼠标移入时触发
    model.addEventListener('ObjectMouseOver', onObjectMouseOver, false);
    // 鼠标移出时触发
    model.addEventListener('ObjectMouseOut', onObjectMouseOut, false);
    tb.add(model);
});
```

```ts
onSelectedChange(e) {
    // 获取模型相关信息
    const detail = e.detail;
    // 获取模型自定义的属性信息
    const properties = e.detail.userData.feature.properties;

    tb.update();
}
```



## [添加文字标签](https://github.com/jscastro76/threebox/blob/master/docs/Threebox.md#addlabel)

```js
onAdd: (map, gl) => {
    // ...
    const labelElement = document.createElement("div");
    labelElement.textContent = "T1航站楼";
    labelElement.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    labelElement.style.padding = "5px";
    labelElement.style.borderRadius = "5px";
    labelElement.style.color = "black";
    labelElement.style.fontSize = "14px";
    labelElement.style.fontWeight = 500;

    tb.loadObj(options, model => {
        // 添加文字标签
        model.addLabel(labelElement, true, model.anchor, 1);
        tb.add(model);
    });
}
```

语法：

```js
model.addLabel(HTMLElement, [visible, center, height])
```

参数：

| 参数        | 可选 | 默认值 | 描述                                                  |
| ----------- | :--: | :----: | ----------------------------------------------------- |
| HTMLElement | 必选 |  null  | 标签的HTML元素                                        |
| visiblk     | 可选 | false  | 标签是否一直可见                                      |
| center      | 可选 |  null  | 标签的中心位置，可以使用 model.anchor（model 的中心） |
| height      | 可选 |  0.5   | 0：标签位于最底部；0.5：标签位于中间；1：标签位于顶部 |



## [添加 line 线](https://github.com/jscastro76/threebox/blob/master/docs/Threebox.md#line)

```js {18}
this.activeMap.addLayer({
    id: "custom-line",
    type: "custom",
    renderingMode: "3d",
    onAdd: (map, gl) => {
        window.tb = new Threebox(map, gl, {
            defaultLights: true
        });
        const options = {
            width: 5,
            opacity: 0.5,
            color: "#ff0000",
            geometry: [
                [118.78845583671585, 37.52200818873794],
                [118.79064623291953, 37.48640108014209]
            ]
        };
        const line = tb.line(options);
        tb.add(line);
    },
    render: (gl, matrix) => {
        tb.update();
    }
});
```



## [添加 extrusion 填充](https://github.com/jscastro76/threebox/blob/master/docs/Threebox.md#extrusion)

```js {27,28}
this.activeMap.addLayer({
    id: "custom-extrusion",
    type: "custom",
    renderingMode: "3d",
    onAdd: (map, gl) => {
        window.tb = new Threebox(map, gl, {
            defaultLights: true
        });
        const options = {
            height: 10,
            units: "meters",
            scale: 2,
            rotation: 0,
            tooltip: true,
            bbox: true,
            raycasted: true,
            coordinates: [
                [
                    [118.78606915266533, 37.50579957412883],
                    [118.78606915266533, 37.502984587188635],
                    [118.79012449222688, 37.502984587188635],
                    [118.79012449222688, 37.50579957412883],
                    [118.78606915266533, 37.50579957412883]
                ]
            ]
        };
        const extrusion = tb.extrusion(options);
        extrusion.setCoords([118.78355380411114, 37.50484242549551]);
        tb.add(extrusion);
    },
    render: (gl, matrix) => {
        tb.update();
    }
});
```

