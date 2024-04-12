# Nlog

>官网：https://github.com/nlog/nlog/wiki
>
>nlog.config 类型配置：https://github.com/NLog/NLog/wiki/Getting-started-with-ASP.NET-Core-6
>
>appSetting.json 类型配置（重点）：https://github.com/NLog/NLog.Extensions.Logging/wiki/NLog-configuration-with-appsettings.json



## 日志级别

表中：LogLevel 按严重性由低到高的顺序列出。

|LogLevel|级别|方法|说明|
|-|-|-|-|
|Trace|0|LogTrace|包含最详细的消息。 这些消息可能包含敏感的应用数据。 这些消息默认情况下处于禁用状态，并且**不应在生产中启用**。|
|Debug|1|LogDebug|用于调试和开发。 由于量大，请在生产中小心使用。|
|Information|2|LogInformation|跟踪应用的常规流。 可能具有长期值。|
|Warning|3|LogWarning|对于异常事件或意外事件。 通常包括不会导致应用失败的错误或情况。|
|Error|4|LogError|表示无法处理的错误和异常。 这些消息表示当前操作或请求失败，而不是整个应用失败。|
|Critical|5|LogCritical|需要立即关注的失败。 例如数据丢失、磁盘空间不足。|
|None|6||指定日志记录类别不应写入消息|



## 安装

安装 Nlog 的包：

```shell
Install-Package NLog.Web.AspNetCore
```



## 配置

在 `appSetting.json` 中添加 Nlog 相关的配置：

```JSON
"NLog": {
    "throwConfigExceptions": true,
    "targets": {
      "async": true,
      // 文件输出
      "logfile": {
        "type": "File",
        "fileName": "logs/nlog-${shortdate}.log"//文件输出路径，/bin/Debug/.net7
      },
      // 控制台输出
      "logconsole": {
        "type": "Console"
      }
    },
    // 路由规则
    "rules": [
      {
        "logger": "*",
        "minLevel": "Info", // 控制台输出 Info 以上的信息
        "writeTo": "logconsole"
      },
      {
        "logger": "*",
        "minLevel": "Debug", // 文件输出 Debug 以上的信息
        "writeTo": "logfile"
      }
    ]
  }
```

在 Progrem.cs 中注册 Nlog 日志：

```C#
//注册 Nlog 日志
NLog.LogManager.Configuration = new NLogLoggingConfiguration(builder.Configuration.GetSection("NLog"));
//清除默认的日志提供程序
builder.Logging.ClearProviders();
//启用 Nlog 作为日志提供程序
builder.Host.UseNLog(new NLogAspNetCoreOptions() { RemoveLoggerFactoryFilter = false });
```

启动项目，可在 `/bin/Debug/.net7` 和 控制台中看到日志信息。



### 修改输出形式

上述配置，在控制台中的输出是以 ”|“ 进行分割的，我们还可以切换为 json 形式输出，作如下配置：

```JSON
"logconsole": {
  "type": "Console",
  // 在输出形式中添加 layout 配置
  "layout": {
    "type": "JsonLayout",
    "Attributes": [
      {
        "name": "appname", // 项目名称
        "layout": "${processname}"
      },
      {
        "name": "timestamp", // 时间
        "layout": "${date:format=o}"
      },
      {
        "name": "level", // 等级
        "layout": "${level}"
      },
      {
        "name": "logger", // logger
        "layout": "${logger}"
      },
      {
        "name": "message", // 提示信息：端口监听/日志输出路径
        "layout": "${message}"
      },
      {
        "name": "exception", // 异常信息
        "layout": "${exception}"
      }
    ]
  }
}
```



## 日志输出

在控制器中注入 `ILogger<T>`，其中 T 就是当前 Controller 的名称：

```C#
private readonly ILogger<NLogController> _logger;

public NLogController(ILogger<NLogController> logger)
{
    _logger = logger;
}
```

使用 _logger 输出日志信息：

```C#
[HttpGet]
[Route("NlogTest")]
public void NlogTest()
{
    _logger.LogError("Error：无法处理当前操作和请求！");
    _logger.LogWarning("Warning：异常事件或意外事件！");
    _logger.LogInformation("Info：跟踪应用的常规流");
    _logger.LogDebug("Debug：用于调试和开发！");
    _logger.LogTrace("Trace：包含最详细的消息！");
}
```
