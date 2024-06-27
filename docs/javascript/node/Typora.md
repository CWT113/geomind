# Typora破解

Typora 版本破解，当前最新版本 1.9.4。



##### 第 1 步

找到 Typora 安装目录，找到下面的文件：

```js
"...\Typora\resources\page-dist\static\js\LicenseIndex.xxxx.chunk.js"
```

文件内查找下面的内容，并进行替换：

```shell
# 查找
e.hasActivated="true"==e.hasActivated

# 替换
e.hasActivated="true"=="true"
```

替换完成后，即可破解成功！



##### 第 2 步

上面激活成功以后，每次打开软件都会弹出 ”已激活“ 的窗口，太烦了！

在 Typora 安装目录下，找到下面的文件：

```shell
"...\Typora\resources\page-dist\license.html"
```

打开之后，在文件的任意 `<script></script>` 标签中加入这段代码：

```js
window.onload = function () {
  setTimeout(() => {
    window.close();
  }, 5);
};
```



##### 第 3 步

去除 Typora 主界面左下角 ”未激活“ 的提示，找到下面这个文件：

```shell
"...\Typora\resources\locales\zh-Hans.lproj\Panel.json"
```

文件内查找下面的内容，并进行替换：

```shell
# 查找
"UNREGISTERED":"未激活"

# 替换
"UNREGISTERED":" "
```



##### 第 4 步

如果在启动时弹窗提示错误，可以点一下图中的 `Learn Data Recovery` ，然后关闭浏览器即可。

![image-20240627181451294](./image/报错.png)
