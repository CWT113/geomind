# Serilog

>Github：https://github.com/serilog/serilog/wiki
>
>博客：https://easy-dotnet.com/pages/e6f01f/



Serilog 是一个 .NET 平台上的强大的日志记录库。它提供了丰富的 API 以及可插拔的日志格式化器和输出器，使得在 .NET 应用程序中实现可定制化的、可扩展的日志记录变得轻而易举。

Serilog 支持多个日志级别，包括以下级别（按照严重程度从高到低排列）：

- `Fatal`：程序已经无法继续运行，需要立即解决的问题。
- `Error`：一个错误发生，需要被处理。
- `Warning`：一个警告，通常需要被留意，但是不需要立即处理。
- `Information`：提供有用的信息，通常只有在调试应用程序时才需要关注。
- `Debug`：提供调试信息，有助于调试应用程序。
- `Verbose`：提供大量的细节信息，通常只用于调试复杂的问题。



## 安装

```bash
# 核心包
dotnet add package Serilog
# 输出到控制台
dotnet add package Serilog.Sinks.Console
# 输出到文件
dotnet add package Serilog.Sinks.File
```



## 基础使用

### 简单示例

下面的示例演示在控制台程序中如何输出日志：

```C#
using Serilog;

Log.Logger = new LoggerConfiguration()
           .MinimumLevel.Debug()	// 输出的最低级别为 Debug
           .WriteTo.Console()
           .CreateLogger();

Log.Information("Hello World!");

// 关闭日志记录器
Log.CloseAndFlush();
```



### 日志级别

下面的示例中，设置了 输出的最低级别为 Information，则 Debug、Verbose不会输出。

```C# {4}
using Serilog;

Log.Logger = new LoggerConfiguration()
           .MinimumLevel.Information()
           .WriteTo.Console()
           .CreateLogger();

Log.Verbose("Verbose");
Log.Debug("Debug");
Log.Information("Information");
Log.Warning("Warning");
Log.Error("Error");
Log.Fatal("Fatal");

Log.CloseAndFlush();
```



### 消息模板

Serilog 可以使用消息模板的方式格式化日志消息。

```C# {6}
using Serilog;

Log.Logger = new LoggerConfiguration()
           .MinimumLevel.Verbose()
           // Level:u3 表示日志级别的文字长度为 3 位
           .WriteTo.Console(outputTemplate: "[{Timestamp:yyyy-MM-dd HH:mm:ss}] [{Level:u3}] {Message:lj}{NewLine}{Exception}")
           .CreateLogger();

Log.Verbose("Verbose");
Log.Debug("Debug");
Log.Information("Information");
Log.Warning("Warning");
Log.Error("Error");
Log.Fatal("Fatal");

Log.CloseAndFlush();
```



### 日志属性

Serilog 支持日志属性，可以像模板字符串一样输出匿名对象到日志中。

```C#
using Serilog;

Log.Logger = new LoggerConfiguration()
           .MinimumLevel.Verbose()
           .WriteTo.Console()
           .CreateLogger();

Log.Information("Processed {@Person} records in {@Time} ms.", new { Name = "张三", Age = 100 }, 10); 
// 输出：[13:38:34 INF] Processed {"Name": "张三", "Age": 100} records in 10 ms.
Log.CloseAndFlush();
```



### 输出到文件

```C#
using Serilog;
using Serilog.Events;

Log.Logger = new LoggerConfiguration()
           .MinimumLevel.Verbose()
           .WriteTo.File($"log\\log-.txt",
               fileSizeLimitBytes: null,
               retainedFileCountLimit: null,
               rollingInterval: RollingInterval.Day,
               rollOnFileSizeLimit: true,
               restrictedToMinimumLevel: LogEventLevel.Information,
               outputTemplate: "[{Timestamp:yyyy-MM-dd HH:mm:ss}] [{Level:u3}] {Message:lj}{NewLine}{Exception}")
           .CreateLogger();

Log.Verbose("Verbose");
Log.Debug("Debug");
Log.Information("Information");
Log.Warning("Warning");
Log.Error("Error");
Log.Fatal("Fatal");

Log.CloseAndFlush();
```

`WriteTo.File()` 的参数：

|           名称           | 描述                                                         |
| :----------------------: | ------------------------------------------------------------ |
|           path           | 日志的输出路径                                               |
|     rollingInterval      | RollingInterval.Day，表示按天生成日志                        |
|    fileSizeLimitBytes    | 单个文件的限制大小，单位字节，不配置默认为 1GB（null：不限制大小，1024：文件大于1024时，不再存储日志） |
|   rollOnFileSizeLimit    | 是否开启滚动日志文件，true时，当日志大于限制大小时，会生成新文件存储，生成类似：log.txt log_001.txt log_002.txt |
|  retainedFileCountLimit  | 保留文件数量，不配置只保留 31 天的日志                       |
| restrictedToMinimumLevel | 最低输出的日志级别                                           |
|      outputTemplate      | 输出日志的格式模板                                           |



### 输出上下文

Serilog 可以使用 `WithProperty` 自定义输出的日志上下文，这样就提高了日志的输出灵活度。

```C#
using Serilog;

Log.Logger = new LoggerConfiguration()
           .MinimumLevel.Verbose()
           .Enrich.FromLogContext()
           .Enrich.WithProperty("version", "1.0.0")
           .Enrich.WithProperty("customValue", "测试文字")
           .WriteTo.Console(outputTemplate: "[{Timestamp:yyyy-MM-dd HH:mm:ss}] [{Level:u3}] {Message:lj} {version} {customValue}{NewLine}{Exception}")
           .CreateLogger();

Log.Verbose("Verbose");
Log.Debug("Debug");
Log.Information("Information");
Log.Warning("Warning");
Log.Error("Error");
Log.Fatal("Fatal");

Log.CloseAndFlush();
```

输出的每项内容中都携带了自定义的 version 和 customValue 属性。



### 日志过滤器

```C# {6}
using Serilog;

Log.Logger = new LoggerConfiguration()
           .MinimumLevel.Verbose()
           .WriteTo.Console()
    		// 只显示等级大于 Warning 的日志
           .Filter.ByIncludingOnly(d => d.Level >= LogEventLevel.Warning)
           .CreateLogger();

Log.Verbose("Verbose");
Log.Debug("Debug");
Log.Information("Information");
Log.Warning("Warning");
Log.Error("Error");
Log.Fatal("Fatal");

Log.CloseAndFlush();
```



#### 按级别输出

```C#
using Serilog;

Func<LogEvent, bool> isInformation = (logEvent) => logEvent.Level == LogEventLevel.Information;
Func<LogEvent, bool> isWarning = (logEvent) => logEvent.Level == LogEventLevel.Warning;
Func<LogEvent, bool> isError = (logEvent) => logEvent.Level == LogEventLevel.Error;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Verbose()
    .WriteTo.Logger(d => d.Filter.ByIncludingOnly(p => isInformation(p))
    .WriteTo.File($"log\\log_information-.txt", rollingInterval: RollingInterval.Day))
    .WriteTo.Logger(d => d.Filter.ByIncludingOnly(p => isWarning(p))
    .WriteTo.File($"log\\log_waring-.txt", rollingInterval: RollingInterval.Day))
    .WriteTo.Logger(d => d.Filter.ByIncludingOnly(p => isError(p))
    .WriteTo.File($"log\\log_error-.txt", rollingInterval: RollingInterval.Day))
    .CreateLogger();

Log.Verbose("Verbose");
Log.Debug("Debug");
Log.Information("Information");
Log.Warning("Warning");
Log.Error("Error");
Log.Fatal("Fatal");

Log.CloseAndFlush();
```



#### 按文件输出

```C# {7,9}
using Serilog;
using Serilog.Filters;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Verbose()
    .WriteTo.Console()
    .WriteTo.Logger(d => d.Filter.ByIncludingOnly(Matching.FromSource<Weather>())) // Weather 文件
    .WriteTo.File($"log\\weather-.txt", rollingInterval: RollingInterval.Day)
    .WriteTo.Logger(d => d.Filter.ByIncludingOnly(Matching.FromSource<Book>())) // Book 文件
    .WriteTo.File($"log\\book-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

Log.Verbose("Verbose");
Log.Debug("Debug");
Log.Information("Information");
Log.Warning("Warning");
Log.Error("Error");
Log.Fatal("Fatal");

Log.CloseAndFlush();
```



## WebAPI 使用

### 安装

```shell
# WebAPI 核心包
Install-Package Serilog.AspNetCore
# 日志格式化包
Install-Package Serilog.Formatting.Compact
```



### 配置

1. 在项目的 `appSetting.json` 中，配置 Serilog 的参数：

   ```json
   {
       "IsUseSerilogOnStartup": "true",
       "Serilog": {
         "MinimumLevel": {
           "Default": "Information",
           "Override": {
             "Microsoft.AspNetCore.Mvc": "Warning",
             "Microsoft.AspNetCore.Routing": "Warning",
             "Microsoft.AspNetCore.Hosting": "Warning"
           }
         },
         "WriteTo": [
           {
             "Name": "Console",
             "Args": {
               "outputTemplate": "[{Timestamp:yyyy-MM-dd HH:mm:ss}] [{Level:u3}] {Message:lj}{NewLine}{Exception}"
             }
           },
           {
             "Name": "File",
             "Args": {
               "path": "bin\\Debug\\net8.0\\logs\\log-.txt",
               "rollingInterval": "Day",
               "rollOnFileSizeLimit": true,
               //"formatter": "Serilog.Formatting.Compact.CompactJsonFormatter, Serilog.Formatting.Compact",
               "outputTemplate": "[{Timestamp:yyyy-MM-dd HH:mm:ss}] [{Level:u3}] {Message:lj}{NewLine}{Exception}"
             }
           }
         ]
       }
   }
   ```

2. 新建 `SerilogConfiguration.cs` 文件，用于读取配置初始化 Serilog ：

   ```C#
   public static class SerilogConfiguration
   {
       /// <summary>
       /// 添加 Serilog 配置
       /// </summary>
       /// <param name="services"> builder.Services </param>
       /// <param name="configuration"> builder.Configuration </param>
       public static void AddSerilogConfiguration(this IServiceCollection services, IConfiguration configuration)
       {
           services.AddSerilog((services, lc) => lc
                   .ReadFrom.Configuration(configuration)
                   .ReadFrom.Services(services));
       }
   
       /// <summary>
       /// 初始化项目时打印日志
       /// </summary>
       /// <param name="services"> builder.Services </param>
       /// <param name="message">初始化项目时的日志内容</param>
       public static void UseSerilogConfiguration(this IServiceCollection services, string message)
       {
           Log.Logger = new LoggerConfiguration()
               .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
               .WriteTo.Console(outputTemplate: "[{Timestamp:yyyy-MM-dd HH:mm:ss}] [{Level:u3}] {Message:lj}{NewLine}{Exception}")
               .WriteTo.File("bin\\Debug\\net8.0\\logs\\log-.txt", rollingInterval: RollingInterval.Day, outputTemplate: "[{Timestamp:yyyy-MM-dd HH:mm:ss}] [{Level:u3}] {Message:lj}{NewLine}{Exception}")
               .CreateBootstrapLogger();
   
           Log.Information(message);
       }
   }
   ```

3. 在 Program.cs 中添加 Serilog 的配置，注册 Serilog 的中间件：

   ```C#
   // 项目启动时，打印日志
   var isUseSerilogOnStartup = builder.Configuration.GetSection("IsUseSerilogOnStartup").Value == "true";
   if (isUseSerilogOnStartup) builder.Services.UseSerilogConfiguration("项目启动！");
   
   // 注册 Serilog 配置
   builder.Services.AddSerilogConfiguration(builder.Configuration);
   
   // ...
   
   // 注册 Serilog 中间件
   app.UseSerilogRequestLogging();
   ```

   

### 使用

在 TestController.cs 中，进行测试：

```C#
[HttpGet]
[Route("GetInt")]
public void GetInt()
{
    try
    {
        List<int> list = [1, 2, 3];
        Console.WriteLine(list[555]);
    }
    catch (Exception ex)
    {
        Log.Error(ex.Message);
    }
}
```

此时，查看控制台和日志文件，可以看到正常输出了 Error 日志。