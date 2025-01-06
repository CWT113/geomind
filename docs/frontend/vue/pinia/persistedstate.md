# pinia-plugin-persistedstate

Github：[prazdevs/pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate)

官网：[Pinia Plugin Persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)



pinia-plugin-persistedstate 是 Pinia 存储持久化的插件。



## 安装

1. 使用 pnpm 包管理器安装插件：

   ```sh
   pnpm install pinia-plugin-persistedstate
   ```

2. 将插件添加到 pinia 实例中：

   ```ts {5}
   import { createPinia } from 'pinia'
   import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
   
   const pinia = createPinia()
   pinia.use(piniaPluginPersistedstate)
   ```

   