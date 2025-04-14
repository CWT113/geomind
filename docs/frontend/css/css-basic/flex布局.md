# flex 布局

参考文章：[Flex 布局语法教程 | 菜鸟教程](https://www.runoob.com/w3cnote/flex-grammar.html)



## 基本概念

采用 flex 布局的元素，称为 flex 容器（flex container），简称“容器”。

容器内的所有子元素，称为 flex 项目（flex item），简称“项目”。

<img src="https://www.runoob.com/wp-content/uploads/2015/07/3791e575c48b3698be6a94ae1dbff79d.png" style="display:block;margin:auto;"/>

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。



## 容器的属性

### flex-direction

`flex-direction` 属性 **决定项目的排列方向**。

![image-20250410002855371](E:\Github.Projects\Alikaid\docs\frontend\css\css-basic\assets\image-20250410002855371.png)

```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

|     属性值     | 作用                                 |
| :------------: | ------------------------------------ |
|      row       | 默认值。主轴为水平方向，起点在最左端 |
|  row-reverse   | 主轴为水平方向，起点在最右端         |
|     column     | 主轴为垂直方向，起点在最上端         |
| column-reverse | 主轴为垂直方向，起点在最下端         |

### flex-warp

默认情况下，项目水平排布在一条线上。`flex-warp` 属性 决定如果 **一条轴线上排布不下，该如何换行**。

<img src="https://www.runoob.com/wp-content/uploads/2015/07/903d5b7df55779c03f2687a7d4d6bcea.png" alt="flex-warp" />

```css
.container {
  flex-warp: nowarp | warp | warp-reverse;
}
```

|    属性值    | 作用                                                         |
| :----------: | ------------------------------------------------------------ |
|    nowarp    | 默认值。不换行                                               |
|     warp     | 换行，第一行在上方（[查看菜鸟文档图示](https://www.runoob.com/wp-content/uploads/2015/07/3c6b3c8b8fe5e26bca6fb57538cf72d9.jpg)） |
| warp-reverse | 换行，第一行在下方（[查看菜鸟文档图示](https://www.runoob.com/wp-content/uploads/2015/07/fb4cf2bab8b6b744b64f6d7a99cd577c.jpg)） |

### flex-flow

`flex-flow` 属性 是 `flex-direction` 和 `flex-warp` 属性的简写。

```css
.container {
  flex-flow: <flex-direction> <flex-warp>;
  // 默认值
  flex-flow: row nowarp;
}
```



### justify-content

`justify-content` 属性 决定了**项目在主轴方向上的对齐方式**。

```css
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
}
```

|    属性值     | 作用                                                         |
| :-----------: | ------------------------------------------------------------ |
|  flex-start   | 默认值。左对齐（[查看MDN示例](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content#%E7%BB%93%E6%9E%9C)） |
|   flex-end    | 右对齐                                                       |
|    center     | 居中                                                         |
| space-between | 两端对齐                                                     |
| space-around  | 每个项目两侧的间隔相等                                       |
| space--evenly | 空白的空隙被项目平分                                         |



### align-items

`align-items` 属性 **决定了项目在交叉轴上如何布局**。

```css
.container {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

|   属性值   | 作用                                                         |
| :--------: | ------------------------------------------------------------ |
| flex-start | 顶部对齐                                                     |
|  flex-end  | 底部对齐                                                     |
|   center   | 中点对齐                                                     |
|  baseline  | 项目的第一行文字的底部对齐                                   |
|  stretch   | 默认值。如果项目没有设置高度或设为auto，将拉伸占满整个容器的高度 |



### align-content

`align-content` 属性 **决定了有多行盒子时的对齐方式**。如果项目只有一行，该属性不起作用。

```css
.container {
  // 结合换行属性，当有多行盒子下面属性才生效
  flex-wrap: wrap;
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

|    属性值     | 作用                                                         |
| :-----------: | ------------------------------------------------------------ |
|  flex-start   | 与交叉轴的顶部对齐（[查看菜鸟文档图示](https://www.runoob.com/wp-content/uploads/2015/07/f10918ccb8a13247c9d47715a2bd2c33.png)） |
|   flex-end    | 与交叉轴的底部对齐                                           |
|    center     | 与交叉轴的中间对齐                                           |
| space-between | 与交叉轴的两端对齐，轴线之间间隔平均分布                     |
| space-around  | 项目两侧的间隔相等                                           |
|    stretch    | 默认值。拉伸占满整个交叉轴                                   |



## 项目的属性

### order

`order` 属性 **决定了项目的排列顺序**。数值越小，排列的越靠前。默认值为0。

```css
.item {
  order: 0
}
```

<img src="https://www.runoob.com/wp-content/uploads/2015/07/59e399c72daafcfcc20ede36bf32f266.png" alt="order" />

### flex-grow

`flex-grow` 属性 **决定了项目的放大比例**，默认值为0。即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: 0; // 允许负值
}
```

![flex-grow](https://www.runoob.com/wp-content/uploads/2015/07/f41c08bb35962ed79e7686f735d6cd78.png)

如图所示，如果每个项目的 flex-grow 属性都为 1，则它们将平分剩余空间。如果有一个项目的 flex-grow 属性为 2，其余为 1，则前者占据的剩余空间比其他项大一倍。



### flex-shrink

`flex-shrink` 属性 决定了项目的缩小比例，默认值为 1。如果空间不足，则该项目将缩小。

```css
.item {
  flex-shrink: 1; // 不允许负值
}
```

![flex-shrink](https://www.runoob.com/wp-content/uploads/2015/07/240d3e960043a729bb3ff5e34987904f.jpg)

如图所示，如果所有项目的 flex-shrink 属性值都为 1，而第2个的属性值为0，则当空间不足时，其他项目都会等比例缩小，而第2个不会。



### flex-basis

`flex-basis` 属性 决定了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。默认值为 auto，即项目原本的大小。

```css
.item {
  flex-basis: <length> | auto;
}
```



### flex

`flex` 属性是 `flex-grow`、`flex-shrink`、`flex-basis` 的简写。

```css
.item {
  flex: none | <flex-grow> <flex-shrink> <flex-basis>; // 后两个属性可选
}
```



### align-self

`align-self` 属性 允许单个项目有与其他项目不一样的对齐方式，可覆盖容器的 align-items  属性。默认值为auto，表示集成容器的 align-items 属性。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

![align-self](https://www.runoob.com/wp-content/uploads/2015/07/55b19171b8b6b9487d717bf2ecbba6de.png)
