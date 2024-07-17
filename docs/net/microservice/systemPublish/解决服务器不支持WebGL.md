# 解决浏览器不支持WebGL

::: info 设置Google支持WebGL

1. 地址栏输入 `chrome://settings/system`，设置“使用图形加速功能（如果可用）”为开启；
2. 地址栏输入 `chrome://flags`，设置 WebGL Developer Extensions、WebGL Draft Extensions、Unsafe WebGPU Support、Override software rendering list、WebGPU Developer Features、Enables Display Compositor to use a new gpu thread.为 Enabled；
3. 重新启动Chrome后，打开 `chrome://gpu`，检查 WebGL、WebGL2 和 WebGPU 显示 Hardware accelerated 即可；

:::

:::info 设置火狐支持WebGL

1. 地址栏输入 `about:config`，在 search 中搜索 webgl，找到 webgl.force-enabled 设置为 true，webgl.disabled 设置为 false；
2. 在 search 中搜索 `security.fileuri.strict_origin_policy` 设置为 false；
3. 关闭浏览器，重新启动即可。

:::

