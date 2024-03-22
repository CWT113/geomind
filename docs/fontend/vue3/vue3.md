# vue3

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


------

## defineModel

>参考文章：https://juejin.cn/post/7338262742816981044#heading-2

`definedModel()` 宏 返回的是一个 `ref`，它可以正常使用 `.value` 被访问和修改，它最重要的作用是在**父组件和子组件之间实现双向绑定**。

- 子组件的 `.value` 和父组件的 `v-model` 的值同步；
- 当子组件的值变化了，会立马触发父组件绑定的值一起更新；

### 1. 默认 v-model

- 父组件：

  ```vue
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

- 子组件：

  ```vue
  <template>
    <input type="text" v-model="model" />
  </template>
  
  <script setup lang="ts">
  const model = defineModel<Number>();
  console.log(modle.value);    // 2000
  </script>
  ```

  

### 2. 具名 v-model

- 父组件：

  ```vue
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

- 子组件：

  ```vue
  <template>
    <input type="text" v-model="model" />
  </template>
  
  <script setup lang="ts">
  const model = defineModel<Number>("count");
  console.log(model.value);
  </script>
  ```

  

### 3. 同时绑定多个 v-model

- 父组件：

  ```vue
  <template>
    <h5>{{ count }}</h5>
    <HelloWorld v-model:count="count" v-model:number="number" />
    <h5>{{ number }}</h5>
    <HelloWorld v-model:count="count" v-model:number="number" />
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import HelloWorld from "./components/HelloWorld.vue";
  
  const count = ref<Number>(2000);
  const number = ref<String>("hello");
  </script>
  ```

- 子组件：

  ```vue
  <template>
    <input type="text" v-model="model" />
    <input type="text" v-model="model2" />
  </template>
  
  <script setup lang="ts">
  const model = defineModel<Number>("count");
  console.log(model.value);
  
  const model2 = defineModel<String>("number");
  console.log(model2.value);
  </script>
  ```

  

### 4. props 选项

- 父组件：

  ```vue
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

- 子组件：

  ```vue
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

  

------

## 子调用父的方法

### 1. props 传递

- 父组件：

  ```vue
  <template>
    <HelloWorld @method="print" />
  </template>
  
  <script setup lang="ts">
  import HelloWorld from "./components/HelloWorld.vue";
  
  const print = (data: number) => console.log(data);
  </script>
  ```

- 子组件：

  ```vue
  <template>
      <button type="button" @click="handleClick">handleClick</button>
  </template>
  
  <script setup lang="ts">
  const { method } = defineProps<{ method: Function }>();
  
  // 直接传递参数,父组件接收到会打印
  const handleClick = () => method && method(200);
  </script>
  ```

  

### 2. emit 传递

- 父组件：

  ```vue
  <template>
    <HelloWorld @method="print" />
  </template>
  
  <script setup lang="ts">
  import HelloWorld from "./components/HelloWorld.vue";
  
  const print = (data: number) => console.log(data);
  </script>
  ```

- 子组件：

  ```vue
  <template>
      <button type="button" @click="handleClick">handleClick</button>
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits(["method"]);
  
  // emit 触发父组件的事件,并携带参数 200
  const handleClick = () => emit("method", 200);
  </script>
  ```



### 3. defineModel 传递

defineModel 宏的主要用途是实现表单类元素的双向数据绑定，但是它也可以用来向子组件传递 属性或方法。

- 父组件：

  ```vue
  <template>
    <HelloWorld v-model="handleClick" />
  </template>
  
  <script setup lang="ts">
  import HelloWorld from "./components/HelloWorld.vue";
  
  const handleClick = (data: number) => console.log(data);
  </script>
  ```

- 子组件：

  ```vue
  <template>
    <h5>{{ model }}</h5>
  </template>
  
  <script setup lang="ts">
  // defineModel() 的返回值实际是一个 ref 对象，因此需要 .value，但总觉得有点儿奇怪，ref 能当函数调用???
  const model: any = defineModel();
  model.value(200);
  </script>
  ```



------

## 父调用子的方法

### 1. defineExpose 暴漏

 `defineExpose` 编译器宏用来显式指定在 `<script setup>` 组件中要**暴露出去的 属性或方法**：

- 子组件（HelloWorld.vue）

  ```vue
  <script setup lang="ts">
  import { ref } from "vue";
  
  const count = ref(555);
  
  const increment = (data: number) => count.value = data;
  
  // 向外暴漏 count 属性和 increment 方法
  defineExpose({ count, increment });
  </script>
  ```

- 父组件（App.vue）

  ```vue
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

  

