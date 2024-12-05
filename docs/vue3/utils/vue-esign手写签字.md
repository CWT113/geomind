# vue-esign 手写签字

>vue-esign NPM包：https://www.npmjs.com/package/vue-esign



## 安装

```shell
pnpm install vue-esign --save
```



## 基本使用

::: warning 注意

1. 页面中使用 `vue-esign` 组件时，必须设置 ref 获取组件实例，来调用 `generate()` 和 `reset()` 方法；
2. 无需为 `vue-esign` 组件手动设置 style 样式，默认使用父组件的宽高；

:::

```vue
<template>
	<vue-esign
    ref="esignRef"
    :width="800"
    :height="400"
    :isCrop="isCrop"
    :lineWidth="lineWidth"
    :lineColor="lineColor"
    v-model:bgColor="bgColor"
	/>
</template>

<script setup lang="ts">
	import vueEsign from "vue-esign"
  
  const bgColor = ref("")
  const lineWidth = ref(6)
  const isCrop = ref(false)
  const lineColor = ref("#000000")
</script>
```

参数介绍：

|      参数      | 默认值 | 作用                                 |
| :------------: | :----: | ------------------------------------ |
|     width      |  800   | 画布宽度，即导出图片的宽度           |
|     height     |  300   | 画布高度，即导出图片的高度           |
|   lineWidth    |   4    | 画笔粗细                             |
|   lineColor    |  #000  | 画笔颜色                             |
|    bgColor     |   空   | 画布背景色，为空时透明               |
|     isCrop     | false  | 是否裁剪                             |
| isClearBgColor |  true  | 清空画布时，是否同时清空设置的背景色 |



完整示例：

```vue {64}
<template>
  <a-button type="primary" @click="showModal">Open Model</a-button>

  <a-model
    :width="700"
    title="手写签批"
    v-model:open="open"
    @cancel="handleCancel"
  >
    <!-- 手写签字组件，外加黑色边框 -->
    <div style="border: 2px solid #000">
      <vue-esign
        ref="esignRef"
        :width="800"
        :height="400"
        :isCrop="isCrop"
        :lineWidth="lineWidth"
        :lineColor="lineColor"
        v-model:bgColor="bgColor"
      />
    </div>

    <!-- 自定义Model页脚 -->
    <template #footer>
      <a-button @click="handleReset">重置</a-button>
      <a-button type="primary" @click="handleOk">确认</a-button>
    </template>
  </a-model>

  <!-- 图片展示 -->
  <div style="margin-top: 20px">
    <a-image :width="800" :height="300" :src="imageUrl" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import vueEsign from "vue-esign"
import { Modal as AModel, Image as AImage, Button as AButton } from "ant-design-vue"

const open = ref(false)
const imageUrl = ref<string>("")

const esignRef = ref()

// 签字相关配置
const bgColor = ref("")
const lineWidth = ref(6)
const isCrop = ref(false)
const lineColor = ref("#000000")

/** 打开Model弹框 */
const showModal = () => {
  open.value = true
}

/** 确认时获取签字图片 */
const handleOk = async () => {
  try {
    imageUrl.value = await esignRef.value.generate() // base64格式
  } catch (error) {
    console.log(error)
  } finally {
    open.value = false
    handleReset()
  }
}

/** 关闭Model弹出 */
const handleCancel = () => {
  handleReset()
}

/** 重置画布 */
const handleReset = () => {
  esignRef.value.reset()
}
</script>
```

![](./image/手写签批.png)
