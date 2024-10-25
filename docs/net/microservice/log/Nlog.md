# NLog

>官网：https://github.com/nlog/nlog/wiki
>
>config 类型配置：[NLog config文件格式配置文档 🔗](https://github.com/NLog/NLog/wiki/Getting-started-with-ASP.NET-Core-6)
>
>appSetting.json 类型配置（重点）：[NLog json文件格式配置文档 🔗](https://github.com/NLog/NLog.Extensions.Logging/wiki/NLog-configuration-with-appsettings.json)



## 日志级别

表中，LogLevel 按严重性由低到高的顺序列出。

|LogLevel|级别|方法|说明|
|:-:|:-:|:-:|:--|
|Trace|0|LogTrace|包含最详细的消息（可能包含敏感数据，<span style="color:#FF0000;">不应在生产环境中启用</span>。）|
|Debug|1|LogDebug|用于常规调试和开发（由于量大，请在生产环境中小心使用。）|
|Information|2|LogInformation|输出正常的消息内容|
|Warning|3|LogWarning|输出警告级别的消息内容|
|Error|4|LogError|输出程序运行中无法处理的错误和异常|
|Critical|5|LogCritical|需要立即注意的错误，例如数据丢失、磁盘空间不足等|



## 安装与配置

### 安装

安装 Nlog 的包：

```shell
Install-Package NLog.Web.AspNetCore
```



### 配置

在 `appSetting.json` 中添加 Nlog 相关的配置：

::: warning 注意

`targets` 和 `rules` 中的配置名称需要一致，否则会报错！

:::

```JSON
{
  "NLog": {
    "throwConfigExceptions": true,
    "targets": {
      "async": true,
      "logfile": {
        "type": "File",
        "fileName": "logs/nlog-${shortdate}.log"
      },
      "logconsole": {
        "type": "Console"
      }
    },
    "rules": [
      {
        "logger": "*",
        "writeTo": "logconsole",
        "minLevel": "Info",
      },
      {
        "logger": "*",
        "writeTo": "logfile",
        "minLevel": "Info",
      }
    ]
  }
}
```

在 `Progrem.cs` 中注册 NLog 日志：

```C#
// 读取并设置 NLog 配置
var nlogConfig = builder.Configuration.GetSection("NLog");
LogManager.Configuration = new NLogLoggingConfiguration(nlogConfig);

// 清除默认日志提供程序
builder.Logging.ClearProviders();

// 启用NLog
builder.Host
    .UseNLog(new NLogAspNetCoreOptions()
    {
        RemoveLoggerFactoryFilter = false,
    });
```



### 修改输出形式

上述 NLog 配置，在控制台和文件中会以 `|` 进行分割输出。

还可以切换为以 `json` 的形式输出，只需作如下配置：

::: details json方式输出到文件

```JSON
{
  "NLog": {
    "throwConfigExceptions": true,
    "targets": {
      "async": true,
      "logfile": {
        "type": "File",
        "fileName": "logs/nlog-${shortdate}.log",
        "layout": {
          "type": "JsonLayout",
          "Attributes": [
            {
              "name": "appname",
              "layout": "${processname}"
            },
            {
              "name": "timestamp",
              "layout": "${date:format=yyyy-MM-dd HH\\:mm\\:ss}" // 格式化时间
            },
            {
              "name": "level",
              "layout": "${level}"
            },
            {
              "name": "logger",
              "layout": "${logger}"
            },
            {
              "name": "message",
              "layout": "${message}"
            },
            {
              "name": "exception",
              "layout": "${exception}"
            }
          ]
        }
      }
    },
    "rules": [
      {
        "logger": "*",
        "writeTo": "logfile",
        "minLevel": "Info"
      }
    ]
  }
}
```

:::

::: details 控制台带有颜色输出

```json
{
  "NLog": {
    "throwConfigExceptions": true,
    "targets": {
      "logconsole": {
        "type": "LimitingWrapper",
        "interval": "00:00:01",
        "messageLimit": 100,
        "target": {
          "type": "ColoredConsole",
          "layout": "${date:format=yyyy-MM-dd HH\\:mm\\:ss}|${level:uppercase=true}|${logger}|${message} ${exception:format=tostring}",
          "rowHighlightingRules": [
            {
              "condition": "level == LogLevel.Error", // Error类型输出呈现红色
              "foregroundColor": "Red"
            },
            {
              "condition": "level == LogLevel.Info", // Info类型输出呈现白底红字
              "foregroundColor": "Red",
              "backgroundColor": "White"
            }
          ],
          // 关键词高亮
          "wordHighlightingRules": [
            {
              "regex": "on|off", // 当出现 on|off 关键字时，呈现绿色
              "foregroundColor": "DarkGreen"
            },
            {
              "condition": "level == LogLevel.Debug",
              "text": "[TEST]",
              "foregroundColor": "Blue"
            }
          ]
        }
      }
    },
    "rules": [
      {
        "logger": "*",
        "writeTo": "logconsole",
        "minLevel": "Info"
      }
    ]
  }
}

```

:::



## 使用实例

以天气输出 API 接口为例：

```C#
[HttpGet(Name = "GetWeatherForecast")]
public IEnumerable<WeatherForecast> Get()
{
    _logger.LogInformation("Info：常规类型的消息输出！");
    _logger.LogWarning("Warning：警告类型的消息输出！");
    _logger.LogError("Error：错误类型的消息输出！");

    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
       {
         Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
         TemperatureC = Random.Shared.Next(-20, 55),
         Summary = Summaries[Random.Shared.Next(Summaries.Length)]
       })
      .ToArray();
}
```
