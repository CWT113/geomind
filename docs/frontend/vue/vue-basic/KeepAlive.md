# KeepAlive

`<KeepAlive>` 是一个内置组件，它的功能是在多个**组件间动态切换时缓存被移除的组件实例**。



## 基础使用

默认情况下，一个组件实例在被替换掉后会被销毁。这会导致它丢失其中所有已变化的状态——当这个组件再一次被显示时，会创建一个只带有初始状态的新实例。

此时可以使用 `keep-alive` 组件进行包裹，将组件实例缓存起来：

::: code-group

```vue [App.vue] {9-13}
<template>
  <input type="radio" name="A" id="A" v-model="selectedView" value="home" />
  <label for="A">A</label>
  <input type="radio" name="B" id="B" v-model="selectedView" value="about" />
  <label for="B">B</label>

  <br />

  <Transition name="fade" mode="out-in">
    <keep-alive>
      <component :is="component"></component>
    </keep-alive>
  </Transition>
</template>

<script setup lang="ts">
  import { ref, computed } from "vue";
  import HomeView from "./components/HomeView.vue";
  import AboutView from "./components/AboutView.vue";

  const selectedView = ref("home");

  const component = computed(() => {
    return selectedView.value === "home" ? HomeView : AboutView;
  });
</script>
```

```vue [HomeView.vue]
<template>
  <div>
    <div>Current component: A</div>
    <input v-model="count" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const count = ref(0);
</script>
```

```vue [AboutView.vue]
<template>
  <div>
    <div>Current component: B</div>
    count: {{ count }}
    <button @click="count++">+</button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const count = ref(0);
</script>
```

:::

::: success 提示

在DOM内模板中使用时，它应该被写为 `<keep-alive>`。

:::



## 包含/排除

`<KeepAlive>` 默认会缓存内部的所有组件实例，但我们可以通过 `include` 和 `exclude`属性来指定缓存哪个组件。

```vue
<template>
  <Transition name="fade">
    <!-- 以英文逗号分隔的字符串 -->
    <keep-alive include="HomeView,AboutView">
      <component :is="component"></component>
    </keep-alive>

    <!-- 正则表达式 (需使用 `v-bind`) -->
    <keep-alive :include="/HomeView|AboutView/">
      <component :is="component"></component>
    </keep-alive>

    <!-- 数组 (需使用 `v-bind`) -->
    <keep-alive :include="['HomeView', 'AboutView']">
      <component :is="component"></component>
    </keep-alive>
    
    <!-- 排除 HomeView 组件，其余缓存 -->
    <keep-alive exclude="HomeView">
      <component :is="component"></component>
    </keep-alive>
  </Transition>
</template>
```



## 最大缓存实例数

`KeepAlive` 允许传入 `max` 选项来限制可被缓存的最大组件实例数，当超过指定的最大数量时，最久没有被缓存的实例将被销毁。

```vue {3}
<template>
  <Transition name="fade">
    <keep-alive :max="10">
      <component :is="component"></component>
    </keep-alive>
  </Transition>
</template>
```



## 缓存组件的生命周期

当一个组件实例从 DOM 上移除但因为被 `<KeepAlive>` 缓存而仍作为组件树的一部分时，它将变为 **不活跃** 状态而不是被卸载。

当一个组件实例作为缓存树的一部分插入到 DOM 中时，它将重新 **被激活**。

当组件处于不活跃和被激活的状态时，它有 2 个生命周期钩子可以被调用：

```vue
<script setup lang="ts">
  import { onActivated, onDeactivated } from 'vue'

  onActivated(() => {
    // 触发时机：组件首次挂载/重新被激活时
  })

  onDeactivated(() => {
    // 触发时机：组件被卸载时/组件被缓存时
  })
</script>
```

::: warning 注意

1. `onActivated` 在组件挂载时会被调用，`onDeactivated` 在组件卸载时也会被调用；

2. 这两个钩子不仅是用于 `KeepAlive` 缓存的根组件，也适用于缓存树中的后代组件；

:::