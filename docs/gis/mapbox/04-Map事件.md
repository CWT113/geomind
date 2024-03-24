# Map事件

参考博客：https://xiaozhuanlan.com/topic/1724036859



事件是增加用户与地图的交互关系，提高地图的实用性，在交互中实现业务的拓展。

### 地图加载事件

```js
map.on("load", e => {
    console.log(e);
})

// 地图渲染时触发
map.on("render", e => {
    console.log(e);
})
```



### 地图交互事件

1. 鼠标左键点击：

   ```js
   map.on("click", e => {
       console.log(e);
   });
   ```

2. 鼠标左键双击事件：

   ```js
   map.on("dblclick", e => {
       console.log(e);
   });
   ```

3. 鼠标右键点击：

   ```js
   map.on("contextmenu", e => {
       console.log(e);
   });
   ```

   

### 地图移动事件

这里指的是相机的移动，也就是用户看向地图的位置。

1. 地图层级变化事件：

   ```js
   // 地图缩放时一直会触发
   map.on("zoom", e => {
       console.log(e);
   });
   
   // 只在地图首次缩放时触发
   map.on("zoomstart", e => {
       console.log(e);
   });
   
   // 只在地图缩放完成后触发
   map.on("zoomend", e => {
       console.log(e);
   });
   ```

2. 地图倾斜角变化事件：

   ```js
   // 地图倾斜角变化时一直会触发
   map.on("pitch", e => {
       console.log(e);
   });
   
   // 只在地图倾斜角首次变化时触发
   map.on("pitchstart", e => {
       console.log(e);
   });
   
   // 只在地图倾斜角变化完成后触发
   map.on("pitchend", e => {
       console.log(e);
   });
   ```

   

### 地图数据加载

```js
map.on("styledata", e => {
    console.log(e);
});
```



### 地图图层事件

相比于地图事件，他仅仅监听发生在一个图层上的事件，常用于<span style="color:#e73f32;">某个特定图层的点击事件</span>，未点击在该图层上，事件不会触发。

```js
map.on("click", layerName, e => {
    console.log(e);
})
```