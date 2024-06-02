# Log4Net

>参考博客1：https://blog.csdn.net/u013066730/article/details/117248306
>
>参考博客2：https://blog.csdn.net/weixin_44900027/article/details/128732197



## 日志级别

|LogLevel|级别|说明|
|-|-|-|
|Debug|1|用于调试和开发。 由于量大，请在生产中小心使用。|
|Information|2|跟踪应用的常规流。 可能具有长期值。|
|Warning|3|对于异常事件或意外事件。 通常包括不会导致应用失败的错误或情况。|
|Error|4|表示无法处理的错误和异常。 这些消息表示当前操作或请求失败，而不是整个应用失败。|
|Fatal|5|致命错误日志信息|



## 基本使用

新建 `log4net.config` 文件，写入以下配置（具体配置相关内容，可查看第二篇博客）：

```XML
<?xml version="1.0" encoding="utf-8" ?>
<log4net>
	<!--根配置-->
	<root>
		<!--日志级别:可选值: ERROR > WARN > INFO > DEBUG -->
		<level value="ERROR"/>
		<level value="WARN"/>
		<level value="INFO"/>
		<level value="DEBUG"/>
		<appender-ref ref="ErrorLog" />
		<appender-ref ref="WarnLog" />
		<appender-ref ref="InfoLog" />
		<appender-ref ref="DebugLog" />
	</root>

	<!-- 错误 Error.log-->
	<appender name="ErrorLog" type="log4net.Appender.RollingFileAppender">
		<!--目录路径，可以是相对路径或绝对路径-->
		<param name="File" value="logs"/>
		<!--文件名，按日期生成文件夹-->
		<param name="DatePattern" value="/yyyy-MM-dd/'error.log'"/>
		<!--追加到文件-->
		<appendToFile value="true"/>
		<!--创建日志文件的方式，可选值：Date[日期],文件大小[Size],混合[Composite]-->
		<rollingStyle value="Composite"/>
		<!--写到一个文件-->
		<staticLogFileName value="false"/>
		<!--单个文件大小。单位:KB|MB|GB-->
		<maximumFileSize value="200MB"/>
		<!--最多保留的文件数，设为"-1"则不限-->
		<maxSizeRollBackups value="-1"/>
		<!--日志格式-->
		<layout type="log4net.Layout.PatternLayout">
			<conversionPattern value="[%d{yyyy-MM-dd HH:mm:ss}] %a %c %L %m %n"/>
		</layout>
		<!--过滤日志，只存放ERROR级别-->
		<filter type="log4net.Filter.LevelRangeFilter">
			<param name="LevelMin" value="ERROR" />
			<param name="LevelMax" value="ERROR" />
		</filter>
	</appender>

	<!-- 警告 Warn.log-->
	<appender name="WarnLog" type="log4net.Appender.RollingFileAppender">
		<!--目录路径，可以是相对路径或绝对路径-->
		<param name="File" value="logs"/>
		<!--文件名，按日期生成文件夹-->
		<param name="DatePattern" value="/yyyy-MM-dd/'warn.log'"/>
		<!--追加到文件-->
		<appendToFile value="true"/>
		<!--创建日志文件的方式，可选值：Date[日期],文件大小[Size],混合[Composite]-->
		<rollingStyle value="Composite"/>
		<!--写到一个文件-->
		<staticLogFileName value="false"/>
		<!--单个文件大小。单位:KB|MB|GB-->
		<maximumFileSize value="200MB"/>
		<!--最多保留的文件数，设为"-1"则不限-->
		<maxSizeRollBackups value="-1"/>
		<!--日志格式-->
		<layout type="log4net.Layout.PatternLayout">
			<conversionPattern value="[%d{yyyy-MM-dd HH:mm:ss}] %a %c %L %m %n"/>
		</layout>
		<filter type="log4net.Filter.LevelRangeFilter">
			<param name="LevelMin" value="WARN" />
			<param name="LevelMax" value="WARN" />
		</filter>
	</appender>

	<!-- 信息 Info.log-->
	<appender name="InfoLog" type="log4net.Appender.RollingFileAppender">
		<!--目录路径，可以是相对路径或绝对路径-->
		<param name="File" value="logs"/>
		<!--文件名，按日期生成文件夹-->
		<param name="DatePattern" value="/yyyy-MM-dd/'info.log'"/>
		<!--追加到文件-->
		<appendToFile value="true"/>
		<!--创建日志文件的方式，可选值：Date[日期],文件大小[Size],混合[Composite]-->
		<rollingStyle value="Composite"/>
		<!--写到一个文件-->
		<staticLogFileName value="false"/>
		<!--单个文件大小。单位:KB|MB|GB-->
		<maximumFileSize value="200MB"/>
		<!--最多保留的文件数，设为"-1"则不限-->
		<maxSizeRollBackups value="-1"/>
		<!--日志格式-->
		<layout type="log4net.Layout.PatternLayout">
			<conversionPattern value="[%d{yyyy-MM-dd HH:mm:ss}] %a %c %L %m %n"/>
		</layout>
		<filter type="log4net.Filter.LevelRangeFilter">
			<param name="LevelMin" value="INFO" />
			<param name="LevelMax" value="INFO" />
		</filter>
	</appender>

	<!-- 调试 Debug.log-->
	<appender name="DebugLog" type="log4net.Appender.RollingFileAppender">
		<!--目录路径，可以是相对路径或绝对路径-->
		<param name="File" value="logs"/>
		<!--文件名，按日期生成文件夹-->
		<param name="DatePattern" value="/yyyy-MM-dd/'debug.log'"/>
		<!--追加到文件-->
		<appendToFile value="true"/>
		<!--创建日志文件的方式，可选值：Date[日期],文件大小[Size],混合[Composite]-->
		<rollingStyle value="Composite"/>
		<!--写到一个文件-->
		<staticLogFileName value="false"/>
		<!--单个文件大小。单位:KB|MB|GB-->
		<maximumFileSize value="200MB"/>
		<!--最多保留的文件数，设为"-1"则不限-->
		<maxSizeRollBackups value="-1"/>
		<!--日志格式-->
		<layout type="log4net.Layout.PatternLayout">
			<conversionPattern value="[%d{yyyy-MM-dd HH:mm:ss}] %a %c %L %m %n"/>
		</layout>
		<filter type="log4net.Filter.LevelRangeFilter">
			<param name="LevelMin" value="Debug" />
			<param name="LevelMax" value="Debug" />
		</filter>
	</appender>
</log4net>
```

在 `Progrem.cs` 中，注册 log4net：

```C#
//注册 log4net 日志
builder.Services.AddLogging(config =>
{
    config.AddLog4Net();
});
//过滤系统默认的日志配置
builder.Logging.AddFilter("system", LogLevel.Error); //只有错误时才打印日志
builder.Logging.AddFilter("Microsoft", LogLevel.Error); //只有错误时才打印日志
builder.Logging.AddFilter("Microsoft.Hosting.Lifetime", LogLevel.Error); //只有错误时才打印日志
//builder.Logging.AddFilter("Log4Net.Core", LogLevel.Error); //自定义项目过滤级别，使用项目命名空间
```

在 controller 中测试 log4net：

```C#
private readonly ILogger<Log4NetController> _logger;

public Log4NetController(ILogger<Log4NetController> logger)
{
    _logger = logger;
}

[HttpGet]
public void Log4NetTest()
{
    _logger.LogInformation("Info：程序正常输出信息！");
    _logger.LogDebug("Debug：程序调试输出信息！");
    _logger.LogWarning("Warning：程序出现警告！");
    _logger.LogError("Error：程序发生错误！");
}
```
