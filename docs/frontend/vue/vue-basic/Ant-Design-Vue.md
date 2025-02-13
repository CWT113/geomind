# Ant-Design-Vue

## Model组件回车确认

::: warning 业务场景

使用 Ant-Design-Vue 中的 Drawer/Model 组件时，想要用户按下回车键，也可以像点击了 “确认” 按钮一样，完成表单提交并关闭 Model 框。

:::

代码实现：

```Vue
<script lang='ts' setup>
  import { onMounted, onBeforeUnmount } from "vue";

  onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      // 表单提交逻辑
      handleSubmit();
    }
  }
</script>
```



