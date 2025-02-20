# reactive

## 类型标注

要显式地标注一个 reactive 变量的类型，可以使用接口：

```vue
<script setup lang="ts">
  import {reactive} from 'vue';

  interface Book {
    title: string,
      year?: number
  }

    const book: Book = reactive({
      title: "或者",
      year: 2022
    })
</script>
```

::: warning 注意

不推荐使用 reactive 的泛型参数，因为处理了深层次 ref 解包的返回值和泛型参数的类型不同。

:::































