# JSX语法

>vue 官网：https://cn.vuejs.org/guide/extras/render-function.html#jsx-tsx

jsx（JavaScript XML）是一种用于在 javaScript 中编写类似 XML 的语法扩展。

jsx 允许开发者以声明式的方式描述 UI 组件的结构和交互，通过使用 jsx，可以将 HTML 结构、组件逻辑和数据绑定等内容组合在一起，更加直观地描述页面结构和交互。

默认的情况下，vue3 + vite 的项目是不支持 jsx 的，如果想支持 jsx，需要安装插件`@vitejs/plugin-vue-jsx`。



## 安装

- 安装插件：

  ```shell
  pnpm install @vitejs/plugin-vue-jsx
  ```

- 在 `vite.config.js` 文件中进行下相应配置：

  ```ts
  import vueJsx from "@vitejs/plugin-vue-jsx";
  
  export default defineConfig({
    plugins: [vue(), vueJsx()]
  });
  ```


- 在 `tsconfig.json` 文件中添加 jsx / tsx 的类型推断：

  ```json
  {
    "compilerOptions": {
      "jsx": "preserve",
      "jsxImportSource": "vue"
      // ...
    }
  }
  ```

  

## 基本使用

计数器的案例：

::: code-group

```tsx [App.tsx]
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.tsx";

export default defineComponent({
  name: "App",
  setup() {
    return () => (
      <div>
        <HelloWorld></HelloWorld>
      </div>
    );
  }
});
```

```tsx [HelloWorld.tsx]
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  setup() {
    const count = ref(100);
    const increment = () => count.value++;

    return () => (
      <div>
        <h2>{count.value}</h2>
        <button onClick={increment}>按钮+1</button>
      </div>
    );
  }
});
```

:::



## 插值

在 vue 中，插值表达式使用 双花括号 的语法，但在 tsx 使用的是 `{}` 。

```tsx
<!-- vue -->
<h2>{{ count.value }}</h2>

{/* tsx */}
<h2>{count.value}</h2>
```



## 指令

### v-if

::: tip

1. 在 tsx 语法中，`ref` 属性的 `.value` 不会被自动解析，需要我们自己加上 `.value`；
2. tsx 中最外层默认是需要包裹一层标签的，但是也可以使用 `<> </>` 来代替，它不会生成实际标签；

:::



tsx 中没有 `v-if` 指令，可以使用 `if..else..` 和 三元表达式 即可实现相同的作用：

```tsx
export default defineComponent({
  name: "HelloWorld",
  setup() {
    const isShow = ref(true);

    return () => (
      <>
        {isShow.value ? <h2>你好</h2> : <h2>Hello World</h2>}
      </>
    );
  }
});
```

```tsx
export default defineComponent({
  name: "HelloWorld",
  setup() {
    // 使用 if..else..
    const renderDiv = (text: string) => {
      if (text) {
        return <div>{text}</div>;
      } else {
        return <div>Hello World</div>;
      }
    };

    // 注意这里是 {}
    return () => {
      return renderDiv("早安, boy!");
    };
  }
});
```



### v-show

```tsx
export default defineComponent({
  name: "HelloWorld",
  setup() {
    const isShow = ref(true);

    return () => (
      <>
        <div v-show={isShow.value}>hello,world</div>
      </>
    );
  }
});
```



### v-for

列表渲染的时候，vue 使用 `v-for`，而在 tsx 语法中，我们可以使用 `map` 方法：

```tsx
export default defineComponent({
  name: "HelloWorld",
  setup() {
    const list = [
      { id: 1, name: "iphone", age: 18 },
      { id: 2, name: "xiaomi", age: 20 },
      { id: 3, name: "huawei", age: 16 }
    ];

    return () => (
      <div>
        {/* 使用解构 */}
        {list.map(({ id, name, age }) => {
          return (
            <div key={id}>
              {name} -- {age}
            </div>
          );
        })}

        {/* 不使用解构 */}
        {list.map(item => {
          return (
            <div key={item.id}>
              {item.name} -- {item.age}
            </div>
          );
        })}
      </div>
    );
  }
});
```



### v-model

基础使用：

```tsx
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "HelloWorld",
  setup() {
    const searchText = ref("666");

    return () => (
      <div>
        <h3>{searchText.value}</h3>
        <input type="text" v-model={searchText.value} />
      </div>
    );
  }
});
```

::: info 有待深究

修饰符：

1. 在 jsx 中不能使用 `.` 或 `:` 的方式来声明修饰符，而是改为 `_` ，例如 .trim 更改为 _trim。

   ```tsx
   <input type="text" v-model_trim={searchText.value} />
   ```

2. vue 中可以使用 `v-model:title` 的方式，来进行 props 传值，在 jsx 中同样也可以使用 `_` 代替。

   ```tsx
   // _ 的方式
   <HelloWorld v-model_title={title.value}></HelloWorld>
   
   // 数组的方式
   <HelloWorld v-model={[title.value, "title"]}></HelloWorld>
   ```

:::



### 事件绑定

事件绑定需要注意的是，要使用 **`on`** 作为前缀，而不是 **`@`**，例如 template 中为 `@click`，而在 tsx 中为 `onClick`。

简单示例可查看 [基本使用](#基本使用)。



当给事件传递参数时，使用 箭头函数 进行包裹：

```tsx
export default defineComponent({
  setup() {
    const count = ref(100);

    const increment = (event: any, value: number) => {
      count.value += value;
      console.log(event);
    };

    return () => (
      <>
        <h2>{count.value}</h2>
        <button onClick={(e) => increment(e, 5)}>按钮+5</button>
      </>
    );
  }
});
```

[事件修饰符](https://cn.vuejs.org/guide/extras/render-function.html#event-modifiers)：

1. 借助 [`withModifiers`](https://cn.vuejs.org/api/render-function.html#withmodifiers) 方法：

   ```tsx
   import { ref, defineComponent, withModifiers } from "vue";
   
   export default defineComponent({
     name: "HelloWorld",
     setup() {
       const count = ref(100);
       const increment = () => count.value++;
   
       return () => (
         <>
           <h2>{count.value}</h2>
           <button onClick={withModifiers(increment, ["stop"])}>按钮</button>
         </>
       );
     }
   });
   ```

   

   

### slot 插槽

tsx 中没有 `<solt />` 标签，定义插槽需要使用 双花括号 ，并事先从 `setup()` 的上下文中获取 `slots`，每个 `slots` 对象中的 **插槽都是**一个返回 vnodes 数组的 **函数**。

- 默认插槽，可以使用 `#default` 或 省略；

- 具名插槽，则将 `#default` 改为具名插槽的名称；

- 作用域插槽，需要在函数里传入要传给插槽的参数；



::: code-group

```vue [App.vue]
<!-- App.vue template 写法 -->
<template>
  <div>
    <HelloWorld>
      <template #default>
        <span>父组件的默认插槽</span>
      </template>

      <template #customSlot>
        <span>父组件的 customSlot 插槽</span>
      </template>

      <template #scopeSlot="{ name, age }">
        <span>{{ name }} {{ age }}</span>
      </template>
    </HelloWorld>
  </div>
</template>

<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.tsx";
</script>
```

```tsx [App.vue]
<!-- App.vue tsx 写法 -->
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.tsx";

export default defineComponent({
  name: "App",
  setup() {
    return () => (
      <div>
        {/* 默认插槽的简写方式 */}
        <HelloWorld>{() => "父组件的默认插槽"}</HelloWorld>

        {/* 完整写法 */}
        <HelloWorld
          v-slots={{
            default: () => "父组件的默认插槽",
            customSlot: () => <span>父组件的 customSlot 插槽</span>,
            scopeSlot: (slots: { name: string; age: number }) => [
              <span>{slots.name}</span>,
              <span>{slots.age}</span>
            ]
          }}
        ></HelloWorld>
      </div>
    );
  }
});

```

```tsx [HelloWorld.vue]
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  // 不要省略 props 选项
  setup(props, { slots }) {
    return () => (
      <div>
        <h3>默认插槽：{slots.default?.()}</h3>
        <h3>具名插槽：{slots.customSlot?.()}</h3>
        <h3>作用域插槽：{slots.scopeSlot?.({ name: "张三", age: 20 })}</h3>
      </div>
    );
  }
});
```

:::



### style 样式

行内 style 样式，需要使用 双花括号 进行包裹。

```tsx
export default defineComponent({
  name: "HelloWorld",
  setup() {
    return () => (
      <div>
        <h2 style={{ color: "red", backgroundColor: "blue" }}>hello world</h2>
      </div>
    );
  }
});
```



### class 样式

在 tsx 中，使用 CSS Modules 的方式来编写作用域样式，在创建 CSS 样式文件的时候，将文件后缀名改为 `.modules.css` 即可。

```css
.red {
  color: red;
}
```

```tsx
import { red } from "./HelloWorld.module.css";

export default defineComponent({
  name: "HelloWorld",
  setup() {
    return () => (
      <div>
        {/* hello 为默认类名, red 为样式类名 */}
        <h2 class="hello" class={red}> hello world </h2>
      </div>
    );
  }
});
```



## 组件

在 tsx 中使用组件时，可以不用声明组件，在导入以后直接使用即可。

```tsx
export default defineComponent({
  name: "HelloWorld",
  setup() {
    const isShow = ref(false);

    const render = () => {
      return <>{isShow.value ? <Foo /> : <Bar />}</>;
    };

    return () => render();
  }
});
```



## 父向子传值

::: warning

注意：子组件的 props 不要使用解构的语法，否则会失去响应式！！

:::

::: code-group

```tsx [App.tsx]
import { ref, defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.tsx";

export default defineComponent({
  name: "App",
  setup() {
    const title = ref("在细雨中呼喊");

    return () => (
      <div>
        <HelloWorld title={title.value}></HelloWorld>
      </div>
    );
  }
});
```

```tsx [HelloWorld.tsx]
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    title: {
      type: String,
      default: "Hello World",
      required: true
    }
  },
  // props 不要使用解构的语法
  setup(props) {
    return () => (
      <div>
        <h2>{props.title}</h2>
      </div>
    );
  }
});
```

:::



## 父向子传方法

::: warning

注意：不要在子组件中更改 props 中的值，因为 props 是只读的，修改会 打破单向数据流！！

:::

::: code-group

```tsx [App.tsx]
import { ref, defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.tsx";

export default defineComponent({
  name: "App",
  setup() {
    const changeTitle = () => {
      console.log("父组件方法被触发了!")
    };

    return () => (
      <div>
        <HelloWorld changeTitle={changeTitle}></HelloWorld>
      </div>
    );
  }
});
```

```tsx [Helloworld.tsx]
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    title: String,
    changeTitle: Function
  },
  setup(props) {
    const handleClick = () => {
      // ❌ props.title 是只读属性
      // props.title += "~~~";

      // 子组件调用父组件的方法
      props.changeTitle && props.changeTitle();
    };

    return () => (
      <div>
        <h2>{props.title}</h2>
        <button onClick={handleClick}>子组件 按钮</button>
      </div>
    );
  }
});
```

:::



## 子向父传值

::: code-group

```tsx [App.tsx]
import { ref, defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.tsx";

export default defineComponent({
  name: "App",
  setup() {
    const count = ref(100);
    const onChangeCount = (value: number) => {
      count.value = value;
    };

    return () => (
      <>
        <h2>父: {count.value}</h2>
        <HelloWorld onValueChange={onChangeCount}></HelloWorld>
      </>
    );
  }
});
```

```tsx{5} [Helloworld.tsx]
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  emits: ["valueChange"],
  setup(props, { emit }) {
    const handleClick = () => emit("valueChange", 888);

    return () => (
      <>
        <button onClick={handleClick}>子组件 按钮</button>
      </>
    );
  }
});
```

:::



## 子向父传方法

::: code-group

```tsx [App.tsx]
import { ref, defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.tsx";

export default defineComponent({
  name: "App",
  setup() {
    const HelloWorldRef = ref<InstanceType<typeof HelloWorld>>();

    const handleClick = () => {
      HelloWorldRef.value?.handleChange();
    };

    return () => (
      <>
        <HelloWorld ref={HelloWorldRef}></HelloWorld>
        
        <button onClick={handleClick}>按钮</button>
      </>
    );
  }
});
```

```tsx [Helloworld.tsx]
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "HelloWorld",
  setup(props, { expose }) {
    const count = ref(0);

    const handleChange = () => {
      count.value++;
    };
    expose({ handleChange });

    return () => (
      <>
        <h2>{count.value}</h2>
      </>
    );
  }
});
```

:::









