# 基本使用

## defineProps

父组件向子组件传递 **属性** 时，子组件使用 `defineProps` 来接收，有三种使用方式：

1. 泛型方式：

   ```typescript
   const { msg } = defineProps<{ msg?: string }>();
   ```

2. 函数方式：

   ```typescript
   const { msg } = defineProps({
     msg: {
       type: String,
       default: "Hello world",
       required: true
     }
   });
   ```

3. 基于类型声明：

   ```typescript
   interface Props {
     msg?: string;
     label?: string[];
   }
   
   // 基于类型声明时，就失去了为 props 声明默认值的能力，可以通过 withDefaults 编译器宏解决
   const { msg, label } = withDefaults(defineProps<Props>(), {
     msg: "Hello world",
     label: () => ["one", "two"]
   });
   ```



## defineOptions<Badge type="tip" text="3.3+" />

`defineOptions` 宏可以用来直接在 `<script setup>` 中声明 组件选项，而不必使用单独的 `script` 块：

:::code-group

```vue [传统方式]
<script>
  export default {
    name: "MyComponent"
  }
</script>

<script lang="ts" setup></script>
```

```vue [setup函数写法]
<script>
	import { defineComponent, defineOptions, ref } from 'vue'

  export default defineComponent({
    name: "MyComponent",
    setup() {
      defineOptions({
        name: "MyComponent"
      })
    }
  })
</script>
```

```vue [setup语法糖写法]
<script lang="ts" setup>
	defineOptions({
    name: "MyComponent",
    inheritAttrs: false,
    customOptions: {
      /* ... */
    }
  })
</script>
```

:::



## defineModel

>参考文章：https://juejin.cn/post/7338262742816981044#heading-2

`definedModel()` 宏 返回的是一个 `ref`，它可以正常使用 `.value` 被访问和修改，它最重要的作用是在**<span style="color:#FF0000;">父组件和子组件之间实现双向绑定</span>**。

- 子组件的 `.value` 和父组件的 `v-model` 的值同步；
- 当子组件的值变化了，会立马触发父组件绑定的值一起更新；



### 默认 v-model

::: code-group

```vue [App.vue]
<template>
  <h5>{{ count }}</h5>
  <HelloWorld v-model="count" />
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import HelloWorld from "./components/HelloWorld.vue";

  const count = ref<Number>(2000);
</script>
```

```vue [HelloWorld.vue]
<template>
	<input type="text" v-model="model" />
</template>

<script setup lang="ts">
  const model = defineModel<Number>();
  console.log(modle.value);    // 2000
</script>
```

:::



### 具名 v-model

::: code-group

```vue [App.vue]
<template>
  <h5>{{ count }}</h5>
  <HelloWorld v-model:count="count" />
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import HelloWorld from "./components/HelloWorld.vue";

  const count = ref<Number>(2000);
</script>
```

```vue [HelloWorld.vue]
<template>
	<input type="text" v-model="model" />
</template>

<script setup lang="ts">
  const model = defineModel<Number>("count");
  console.log(model.value);  // 2000
</script>
```

:::



### 同时绑定多个 v-model

::: code-group

```vue [App.vue]
<template>
  <h5>{{ count }}</h5>
  <HelloWorld v-model:count="count" v-model:name="name" />
  <h5>{{ name }}</h5>
  <HelloWorld v-model:count="count" v-model:name="name" />
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import HelloWorld from "./components/HelloWorld.vue";

  const count = ref<Number>(2000);
  const name = ref<String>("tom");
</script>
```

```vue [HelloWorld.vue]
<template>
  <input type="text" v-model="model" />
  <input type="text" v-model="model2" />
</template>

<script setup lang="ts">
  const model = defineModel<Number>("count");
  console.log(model.value); // 2000

  const model2 = defineModel<String>("name");
  console.log(model2.value); // tom
</script>
```

:::



### props 选项

::: code-group

```vue [App.vue]
<template>
  <h5>{{ visible }}</h5>
  <HelloWorld v-model:visible="visible" />
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import HelloWorld from "./components/HelloWorld.vue";

  const visible = ref<String>("1");
</script>
```

```vue [HelloWorld.vue]
<template>
  <input type="text" v-model="model" />
</template>

<script setup lang="ts">
  const model = defineModel("visible", {
    type: String,
    required: true,
    default: "1",
    // 校验值，传入的值必须是字符类型 0 或 1
    validator: (value: string) => ["0", "1"].includes(value)
  });
</script>
```

:::



## 子调用父的方法

### props 传递

::: code-group

```vue [App.vue]
<template>
  <HelloWorld @method="print" />
</template>

<script setup lang="ts">
  import HelloWorld from "./components/HelloWorld.vue";

  const print = (data: number) => console.log(data);
</script>
```

```vue [HelloWorld.vue]
<template>
  <button type="button" @click="handleClick">handleClick</button>
</template>

<script setup lang="ts">
  const { method } = defineProps<{ method: Function }>();

  // 直接传递参数,父组件接收到会打印
  const handleClick = () => method && method(200);
</script>
```

:::



### emit 传递

::: code-group

```vue [App.vue]
<template>
  <HelloWorld @method="print" />
</template>

<script setup lang="ts">
  import HelloWorld from "./components/HelloWorld.vue";

  const print = (data: number) => console.log(data);
</script>
```

```vue [HelloWorld.vue]
<template>
  <button type="button" @click="handleClick">handleClick</button>
</template>

<script setup lang="ts">
  const emit = defineEmits(["method"]);

  // emit 触发父组件的事件,并携带参数 200
  const handleClick = () => emit("method", 200);
</script>
```

:::



### defineModel 传递

`defineModel` 宏的主要用途是实现表单类元素的双向数据绑定，但是它也可以用来向子组件传递 属性或方法。

::: code-group

```vue [App.vue]
<template>
  <HelloWorld v-model="handleClick" />
</template>

<script setup lang="ts">
  import HelloWorld from "./components/HelloWorld.vue";

  const handleClick = (data: number) => console.log(data);
</script>
```

```vue [HelloWorld.vue]
<template>
  <h5>{{ model }}</h5>
</template>

<script setup lang="ts">
  // defineModel() 的返回值实际是一个 ref 对象，因此需要 .value，但总觉得有点儿奇怪，ref 能当函数调用???
  const model: any = defineModel();
  model.value(200);
</script>
```

:::



## 父调用子的方法

### defineExpose 暴漏

 `defineExpose` 编译器宏用来 <span style="color:#CC0000;">显式指定在 `<script setup>` 组件中要暴露出去的属性或方法</span>：

::: code-group

```vue [App.vue] {10}
<template>
  <HelloWorld ref="RefInstance" />
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import HelloWorld from "./components/HelloWorld.vue";

  // 通过 InstanceType 获取组件的实例，显式设置类型
  const RefInstance = ref<InstanceType<typeof HelloWorld>>();
  RefInstance.value?.increment(200);
</script>
```

```vue [HelloWorld.vue] {8}
<script setup lang="ts">
  import { ref } from "vue";

  const count = ref(555);
  const increment = (data: number) => count.value = data;

  // 向外暴漏 count 属性和 increment 方法
  defineExpose({ count, increment });
</script>
```

:::



## computed传参

```vue {10}
<template>
  <div v-for="item in 10">
    {{ render(item) }}
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";

  const render = computed(() => (value) => {
    if (value % 2 == 0) {
      return `${value} 是偶数`;
    }
  });
</script>
```





















