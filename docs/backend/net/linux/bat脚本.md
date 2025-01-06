# bat 脚本

### 基本语法

```Shell
@echo off // 开始标签

start cmd /k "命令1 & 命令2 & 命令3" // 无论前面的命令是否成功，后面都会执行

start cmd /k "命令1 && 命令2 && 命令3" // 仅当前面的命令成功时，后面才执行

start cmd /k "命令1 || 命令2 || 命令3" // 仅当前面命令失败时，后面才执行

pause // 防止运行结束后直接关闭界面
```



### 启动 jar

命令：

```Shell
start cmd /c "title zipkin && java -jar zipkin.jar"
```

解释：

- 第一个 zipkin 为小黑框的名称

- 第二个 zipkin.jar 为启动 jar 包的命令



### 启动 exe

命令：

```Shell
start /d "D:\java\redis" redis-server.exe
```

解释：先通过路径到达 exe 存放地址，再执行 exe 文件。



### 启动 nacos

命令：

```Shell
start cmd /k "cd /d D:\Program Files\nacos\bin && startup.cmd -m standalone"
```

解释：先通过路径到达 cmd 存放地址，再执行 cmd 文件。



