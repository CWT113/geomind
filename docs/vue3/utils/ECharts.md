# ECharts

## 初始化图表

::: warning 注意

如果在 Ant-Design vue 抽屉等组件中初始化图表，需要注意图表的初始化时机，直接在 onMounted 生命周期函数中初始化，会导致 div 实例获取不到而报错。

:::

```vue
<template>
	<div id="line-container"></div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  
  const props = defineProps<{open: boolean;}>();

  let chart: echarts.ECharts | null;

  watchEffect(() => {
    // 如果是抽屉类组件，在 onMounted 中初始化，会导致获取不到实例而报错
    if (props.open) {
      initializeEChart();
    }
  });

  /** 初始化统计图表 */
  function initializeEChart() {
    // nextTick等页面加载完成后，再获取div实例，避免实例获取为null
    nextTick(() => {
      const container = document.getElementById('line-container');
      if (container) {
        chart = echarts.init(container);
        // 获取图表配置项信息
        const options = getOptions();
        options && chart.setOption(options);
      }
    });
  }
</script>
```



## 图表自适应页面

```vue
<script setup lang="ts">
  let tabHolder: Element;
  let resizeObserver: ResizeObserver;

  // 页面尺寸发生变化时，自动调整图表尺寸
  window.addEventListener('resize', () => chart?.resize());

  onMounted(() => {
    // 解决侧边栏宽度变化，导致图表不自适应页面宽度的问题
    tabHolder = document.querySelector('.ant-tabs-content-holder')!;

    resizeObserver = new ResizeObserver((entries) => {
      if (entries.length > 0) {
        chart?.resize();
        chart?.setOption(chart?.getOption(), { notMerge: true, lazyUpdate: true });
      }
    });
    
    resizeObserver.observe(tabHolder);
  });

  onUnmounted(() => {
    // 销毁尺寸监视和图表实例
    resizeObserver?.unobserve(tabHolder);
    chart?.dispose();
  });

</script>
```

::: info setOption 参数配置

|        参数        | 作用                                                         |
| :----------------: | ------------------------------------------------------------ |
| chart?.getOption() | 获取当前 ECharts 图表的所有配置项                            |
|      notMerge      | 1. 新传入的配置是否完全覆盖旧的配置，true 覆盖，false 合并；<br />2. 使用场景：需要完全替换当前配置的情况，比如切换图表类型或重新加载数据时； |
|     lazyUpdate     | 1. 设置为 true，ECharts 图表不会立即重新渲染图表，而是下一次需要渲染时再渲染；<br />2. 使用场景： 在频繁更新图表时使用，可以避免多次触发不必要的重绘，提升性能； |

::: 





















































