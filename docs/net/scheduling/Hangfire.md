# Hangfire

>官方地址：https://www.hangfire.io/
>
>Github：https://github.com/HangfireIO/Hangfire



Hangfire 是一个 .NET 库，用于管理后台任务。它提供了一种简单的方法来执行长时间运行的任务，例如发送电子邮件，生成报表，处理消息队列等。与其他后台任务调度库不同的是，Hangfire 提供了一个可靠的机制，可以在任务失败时自动重试，以确保任务始终被执行。Hangfire 还提供了一个简单的 Web 界面，可以查看任务状态、执行历史和性能指标。

Hangfire 的主要优点包括：

- 简单易用。Hangfire 提供了一个简单的 API，让您可以快速地定义和执行后台任务。
- 可靠性高。Hangfire 提供了一种可靠的机制，可以在任务失败时自动重试，以确保任务始终被执行。
- 灵活性高。Hangfire 可以与多种存储后端集成，包括 SQL Server，Redis，MongoDB 等，可以满足不同应用程序的需求。



## 安装和配置

在 ASP.NET Core WebAPI 项目下，使用 Nuget 安装下面的包：

```shell
# 核心包
Install-Package Hangfire
# postgresql依赖
Install-Package Hangfire.PostgreSql
```

在 `Program.cs` 文件中，注册 Hangfire：

```C#
// 注册 AddHangfire
builder.Services.AddHangfire(config =>
{
    // 连接 postgresql 数据库
    config.UsePostgreSqlStorage(c => c.UseNpgsqlConnection("Host=localhost;Port=5432;Username=postgres;Password=postgres;Database=HangfireSample"));
});

// 注册 AddHangfire 服务
builder.Services.AddHangfireServer();

// 启用 AddHangfire 的可视化界面（http://localhost:xxxx/hangfire/）
app.UseHangfireDashboard();
```



## 基本使用

新建 BackgroundJobService.cs 文件，创建一个定时任务：

```C#
public class BackgroundJobService
{
    public void SendEmail(string message)
    {
        // 执行定时任务
        Console.WriteLine($"{DateTime.Now} --> {message}");
    }
}
```



### 普通调度任务

普通调度任务只会在程序启动时被调用 1 次。

```C#
BackgroundJob.Enqueue(() => Console.WriteLine("普通调度任务"));
BackgroundJob.Enqueue<BackgroundJobService>(d => d.SendEmail("普通调度任务"));
```



### 延迟调度任务

```C#
// 延迟调度任务，延迟 5 秒后执行
BackgroundJob.Schedule<BackgroundJobService>(d => d.SendEmail("延迟调度任务"), TimeSpan.FromSeconds(5));
```



### 定时调度任务

当执行定时调度任务时，需要先修改 Hangfire 的默认定时时间：

```C#
builder.Services.AddHangfireServer(d =>
{
    // 修改调度时间为 1 秒，默认为 15 秒（只对定时调度任务有效）
    d.SchedulePollingInterval = TimeSpan.FromSeconds(1);
});
```

Hangfire 定时任务默认提供了定时的几个枚举，如 年、月、日、 时、分 等，它只能在这些固定的时间节点触发：

```C#
// 每年执行一次
RecurringJob.AddOrUpdate<BackgroundJobService>("SendEmailJob", d => d.SendEmail("定时调度任务"), Cron.Yearly());
// 每月执行一次
RecurringJob.AddOrUpdate<BackgroundJobService>("SendEmailJob", d => d.SendEmail("定时调度任务"), Cron.Monthly());
// 每天执行一次
RecurringJob.AddOrUpdate<BackgroundJobService>("SendEmailJob", d => d.SendEmail("定时调度任务"), Cron.Daily());
// 每小时执行一次
RecurringJob.AddOrUpdate<BackgroundJobService>("SendEmailJob", d => d.SendEmail("定时调度任务"), Cron.Hourly());
// 每分钟执行一次
RecurringJob.AddOrUpdate<BackgroundJobService>("SendEmailJob", d => d.SendEmail("定时调度任务"), Cron.Minutely());
```

当想 每秒执行一次的时候，需要使用自定义的 [CRON](https://cron.ciding.cc/) 表达式：

```C#
// 定时调度任务，每 1 秒执行一次
RecurringJob.AddOrUpdate<BackgroundJobService>("SendEmailJob", d => d.SendEmail("定时调度任务"), "0/1 * * * * ? ");
```