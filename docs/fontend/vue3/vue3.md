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

  

