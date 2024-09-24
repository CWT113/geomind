# ResizeObserver

[`ResizeObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver) 是一个用于观察元素大小变化的 API，能够在元素的尺寸发生变化时执行回调函数。



## 构造函数

`ResizeObserver()` 创建并返回一个新的 `ResizeObserver` 对象。



## 常用方法

| 方法      | 作用                                         |
| --------- | -------------------------------------------- |
| observe   | 通过该方法绑定要观察的元素                   |
| unobserve | 如果不再需要观察某个元素，可以该方法停止观察 |

 ```js
 // 创建一个 ResizeObserver 实例
 const resizeObserver = new ResizeObserver((entries) => {
   entries.forEach(entry => {
     // 每次观察的元素发生大小变化时都会执行这个回调
     console.log('Element:', entry.target);
     console.log('New size:', entry.contentRect.width, entry.contentRect.height);
   });
 });
 
 // 选择要观察的元素
 const element = document.querySelector('.my-element');
 
 // 开始观察元素的尺寸变化
 resizeObserver.observe(element);
 // 在某个时刻停止观察
 resizeObserver.unobserve(element);
 ```



:::details 示例

>当vben左侧侧边栏宽度变化时，右侧的ECharts图表自适应页面宽度。

```vue {5,11,15}
<script setup lang="ts">
  let tabHolder: Element;
  onMounted(() => {
    tabHolder = document.querySelector('.ant-tabs-content-holder')!;
    resizeObserver = new ResizeObserver((entries: string | any[]) => {
      if (entries.length > 0) {
        // echars图表更新尺寸
        chart?.resize();
      }
    });
    resizeObserver.observe(tabHolder);
  });

  onUnmounted(() => {
    resizeObserver?.unobserve(tabHolder);
  });
</script>
```

:::
