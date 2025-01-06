# nvm

::: danger

注意：在安装 nvm 之前，一定将电脑现有的 node 卸载干净！！

检查以下情况：

- 在 node 的安装路径中查看，是否存在 node 相关的文件夹，如果有，全部删除；
- 在 `C:\用户` 文件夹下查看是否存在 `.npmrc` 或 `.yarnrc` 等 node 相关的文件，如果有，全部删除；
- 检查环境变量中，是否存在 node 相关的信息，如果有，全部删除；

检查完成后，在 cmd 中再次检查 node 的版本号：`node -v`，若报红或提示 node 不是命令等的提示，表示卸载成功！

:::



## 安装

下载官网 nvm 安装包：https://github.com/coreybutler/nvm-windows/releases

![nvm安装](./image/nvm安装.jpg)

1. 下载后解压，安装完成后，输入命令：`nvm version` ，看到版本号，表示安装成功。

2. 打开 nvm 的安装目录，找到 `setting.txt` 文件，将淘宝的镜像源文件复制进去：

   ```shell
   # 查看 nvm 安装地址
   nvm root
   ```

   ```shell
   # 配置 node 镜像
   node_mirror: https://npmmirror.com/mirrors/node/
   # 配置 npm 镜像
   npm_mirror: https://npmmirror.com/mirrors/npm/
   ```



## 常用命令

```shell
# 安装 node 版本
nvm install 20.12.1

# 查看 node 版本列表（带 * 号表示当前使用版本）
nvm list

# 切换 node 版本
nvm use 16.14.1

# 查看当前 node 版本
node -v

# 查看 npm 版本
npm -v
```
