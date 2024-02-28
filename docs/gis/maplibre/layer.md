# Layer

## 图层层级

在 Maplibre GL JS 中，您可以使用 `moveLayer` 方法来调整图层的层级关系。

其语法如下：

```js
map.moveLayer('currentLayerId', 'beforeId');
```

这表示将 `currentLayerId` 移动到 `beforeId` 的上方。



1. 有两个图层分别为 `layer1` 和 `layer2`，将 `layer2` 移动到 `layer1` 的上方：

   ```js
   map.moveLayer('layer2', 'layer1');
   ```

2. 将 layer2 移动到所有图层的最底部：

   ```js
   map.moveLayer('layer1', null);
   ```

3. 将 layer2 移动到所有图层的最顶部：

   ```js
   map.moveLayer('layer2', undefined);
   ```

   