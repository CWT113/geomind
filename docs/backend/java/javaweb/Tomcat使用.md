# Tomcat部署web项目

Tomcat 安装教程：[Tomcat安装教程](https://www.yuque.com/wangyibo-2nejh/rpmiex/gwvdpsnd8fut9n4i)



### 第一步

新建 java-web 项目，在 `Project Structure` 中，设置项目的 JDK 版本。

![第一步](.\assets\第一步.png)

### 第二步

新建 Demo-Web01 模块，在 `Project Structure` 中，为模块添加 Tomcat 的依赖。

![第一步](.\assets\第二步.png)



### 第三步

全局快捷键 `ctrl + shift + A`，搜索 `Add Frameword Support` 功能，并为当前项目设置框架支持。

![第三步](.\assets\第三步1.png)

![第三步](.\assets\第三步2.png)



### 第四步

第三步执行完成后，可以看到 Demo-Web01 模块下出现了 `web` 的文件夹，现在说明该模块已经是 JavaWeb 的项目了。

一个标准的 JavaWeb 项目的目录结构如下：

```
MyWebApp/
|-- resources/                # Java后台配置文件目录
|-- src/										# src目录，存放Java源代码
|	  |-- com.geomind.demo/     # Java包的路径，用于组织Java类
|	 	|	  |-- main.java         # 主入口程序，包含main方法，是程序的起点
|-- web/										# Web资源目录，存放前端相关文件
|   |-- static                # 静态资源目录，存放不需要服务器处理的资源
|		|   |-- css               # 存放CSS样式文件
|		| 	|-- js                # 存放JavaScript脚本文件
|   |   |-- img               # 存放图片文件
|   |-- WEB-INF               # Web应用特殊目录，客户端无法直接访问
|		|		|-- lib               # 存放Web应用依赖的JAR包
|		|		|-- web.xml           # Web应用配置文件，配置Servlet、Filter、Listener等
|   |-- index.html             # 首页文件，Web应用的入口页面
```

然后可以按照该目录，自由编写一些测试的代码，用于后续在 Tomcat 发布后查看。

![第四步](.\assets\第四步.png)



### 第五步

在 IDEA 运行程序的左边，选择 `Edit Configurations` 选项，设置 Tomcat 启动的一些配置。

![第五步](.\assets\第五步1.png)

![第五步](.\assets\第五步2.png)



### 第六步

运行程序，IDEA会先进行项目打包，然后再启动 Tomcat 将项目运行，然后在浏览器将项目的 web 应用打开。

![第六步](.\assets\第六步.png)

### 拓展

IDEA的控制台中，可以查看运行 Tomcat 的日志信息，如果出现乱码，需要更改 Tomcat 的 `conf/logging.properties` 文件：

```properties
# 1catalina.org.apache.juli.AsyncFileHandler.encoding = UTF-8
1catalina.org.apache.juli.AsyncFileHandler.encoding = GBK

# java.util.logging.ConsoleHandler.encoding = UTF-8
java.util.logging.ConsoleHandler.encoding = GBK
```

![拓展](.\assets\拓展.png)