# Quartz

> Github：[https://github.com/quartznet/quartznet](https://github.com/quartznet/quartznet)

> 官方教程：[https://www.quartz-scheduler.net/](https://www.quartz-scheduler.net/)

Quartz 是一个强大且可靠的开源调度库，可用于在 .NET 应用程序中执行定时任务。它支持循环调度、延迟调度、并行执行等高级调度功能，并且具有可扩展性和高度定制化能力。

## 简介

Quartz 是一个调度框架，它有四个核心的概念：

- **作业**（Job）：由可执行代码组成的类，需继承自 `IJob` 接口。

- **作业执行器**（Job Executor）：是负责从作业中调用特定方法的组件。

- **触发器**（Trigger）：它指定何时触发任务。

- **调度器**（Scheduler）：负责调度所有计划的任务，并在任务需要执行时运行它们。

### 安装

使用到的 NuGet 包：

```PowerShell
Install-Package Quartz
```

### 作业

作业是 Quartz 中执行工作的<span style="color: #e63f32;font-weight: 700;">基本单元</span>。它们表示可执行代码的逻辑单元，并且由调度程序定期触发。作业实现 `IJob` 接口，该接口定义了一个执行方法 `Execute`，在每次调度时会调用该方法。

下面是一个简单的作业示例：

```js
// 创建具体的作业
public class SendEmailJob : IJob
{
    public async Task Execute(IJobExecutionContext context)
    {
        // 执行作业逻辑
    }
}
```

```C#
// 创建作业任务
var sendEmailJob = JobBuilder.Create<SendEmailJob>()
    .WithIdentity("SendEmailJob", "group")
    .Build();
```

### 触发器

触发器是 Quartz 中的计划单元，它指定<span style="color: #e63f32;font-weight: 700;">何时触发作业</span>。每个作业可以有多个触发器，每个触发器都有一个名称和一个与其相关联的作业。 Quartz 支持多种触发器类型，包括 SimpleTrigger、CronTrigger、CalendarIntervalTrigger 等。

下面是一个简单的触发器示例：

```C#
// 创建触发器
var sendEmailTigger = TriggerBuilder.Create()
    .WithIdentity("SendEmailTrigger", "group")
    .WithSimpleSchedule(d => d.WithIntervalInSeconds(2).RepeatForever())
    .Build();
```

### 调度器

调度器是 Quartz 中的核心组件，它负责<span style="color: #e63f32;font-weight: 700;">管理作业和触发器</span>，并根据其计划运行作业。每个应用程序只需要一个调度器实例，该实例可以在整个应用程序生命周期中重复使用。

下面是一个创建调度器示例：

```C#
// 创建调度工厂
var schedulerFactory = new StdSchedulerFactory();
// 获取调度器
var scheduler = await schedulerFactory.GetScheduler();
// 将 作业 和 触发器 注册到调度器中
await _scheduler.ScheduleJob(sendEmailJob, sendEmailTigger);
// 启动调度
await scheduler.Start();
```



## 循环调度

```C# {11}
// 获取调调度器实例
_scheduler = await _stdSchedulerFactory!.GetScheduler();

// 创建作业
var sendEmailJob = JobBuilder.Create<SendEmailJob>()
    .WithIdentity("SendEmailJob", "group")
    .Build();
// 创建触发器
var sendEmailTigger = TriggerBuilder.Create()
    .WithIdentity("SendEmailTrigger", "group")
    .WithSimpleSchedule(d => d.WithIntervalInSeconds(2).RepeatForever())	// 2秒执行一次作业，循环执行
    .Build();
// 将作业和触发器注册到调度器中
await _scheduler.ScheduleJob(sendEmailJob, sendEmailTigger);

// 开启调度
await _scheduler.Start();
```



## 延迟调度

```C# {7}
var sendEmailJob = JobBuilder.Create<SendEmailJob>()
    .WithIdentity("SendEmailJob", "group")
    .Build();

var sendEmailTigger = TriggerBuilder.Create()
    .WithIdentity("SendEmailTrigger", "group")
    .StartAt(DateTimeOffset.UtcNow.AddSeconds(10))      // 延迟 10 秒之后触发，然后开始循环调度
    .WithSimpleSchedule(d => d.WithIntervalInSeconds(2).RepeatForever())
    .Build();

await _scheduler.ScheduleJob(sendEmailJob, sendEmailTigger);
```



## 并行串行执行

Quartz 支持并行执行多个作业。作业可以使用 `DisallowConcurrentExecution` 特性来指示调度程序不允许同一作业实例在同一时间执行。这样可以确保不同实例的作业在并行执行时互不干扰。

> 例如：一个任务，我们定义 5 秒运行一次,但是运行过程可能会比较长(例如要 12 秒才可以计算完成)，这样就会造成前一个任务还没有执行完毕，后一个新任务又启动了（这样会造成多个任务并行在执行）

> 如果在类上标注:`[DisallowConcurrentExecution]`,这样新任务启动时，必须在前一个任务已经完成的情况下(这样任务是一个接一个的，是串行的) 以本 demo 来说：12 秒后才会启动一个新任务，任务和任务不会并行（当然任务与任务之间的间隔就不是原有的 5 秒了）

下面是一个并行执行示例：

```C#
[DisallowConcurrentExecution]
public class MyJob : IJob
{
    public async Task Execute(IJobExecutionContext context)
    {
        // 执行作业逻辑
    }
}
```



## 传递参数

使用 Quartz 时，无论是 job 任务中，还是 trigger 触发器中，都可以使用 `UsingJobData()` 进行参数传递。

```C# {4,5,7,12}
// 使用 job 传递参数
var sendEmailJob = JobBuilder.Create<SendEmailJob>()
    .WithIdentity("sendEmailJob", "group")
    .UsingJobData("name", "tom")
    .UsingJobData("age", 100)
    .Build();
sendEmailJob.JobDataMap.Add("active", true);

// 使用 trigger 传递参数
var sendEmailTigger = TriggerBuilder.Create()
    .WithIdentity("SendEmailTrigger", "group")
    .UsingJobData("trigger", "hello world")
    .WithSimpleSchedule(d => d.WithIntervalInSeconds(2).RepeatForever())
    .Build();

await _scheduler.ScheduleJob(sendEmailJob, sendEmailTigger);
```

然后在实现 `IJob` 接口类的 `Execute(IJobExecutionContext context)` 方法中，通过参数 `context` 获取参数。

```C# {7,13}
Task IJob.Execute(IJobExecutionContext context)
{
    if (context == null) return;
    Console.WriteLine($"{DateTime.Now}：定时任务开启！");

    // 获取 Job 传递的参数
    JobDataMap jobDataMap = context.JobDetail.JobDataMap;
    string? name = jobDataMap.GetString("name");
    int age = jobDataMap.GetInt("age");
    bool active = jobDataMap.GetBoolean("active");

    // 获取 Trigger 传递的参数
    JobDataMap triggerDataMap = context.Trigger.JobDataMap;
    string? trigger = triggerDataMap.GetString("trigger");
}
```

通过上面的方法接收到参数后，可以进行修改，然后再次传递给下一次任务的触发，注意此时要在类的顶部添加 `[PersistJobDataAfterExecution]`特性，表示 jobDataMap 中数据变化，传递给下一次任务触发使用。

```C#
// ...

// 下一次触发任务 name 的值就会变化
jobDataMap.Put("name", "任嘉伦");

context.JobDetail.JobDataMap.Put("love", "美女");
context.Trigger.JobDataMap.Put("love", "野兽");
```



## 存储 job 到数据库

- 安装 Npgsql 包:

  ```shell
  Install-Package Npgsql
  ```

- 数据库中新建 Quartz 库, 并创建 任务存储相关的表, 表结构详见 [database/tables/tables_postgres.sql](https://github.com/quartznet/quartznet/blob/main/database/tables/tables_postgres.sql)

- 配置 Quartz 连接数据库的相关参数:

  ```C#
  NameValueCollection props = new()
  {
      ["quartz.serializer.type"] = "binary",
      ["quartz.jobStore.type"] = "Quartz.Impl.AdoJobStore.JobStoreTX, Quartz",
      ["quartz.jobStore.driverDelegateType"] = "Quartz.Impl.AdoJobStore.PostgreSQLDelegate, Quartz",
      ["quartz.jobStore.performSchemaValidation"] = "false",
      ["quartz.jobStore.dataSource"] = "myDS",
      ["quartz.jobStore.tablePrefix"] = "QRTZ_",
      ["quartz.dataSource.myDS.connectionString"] = "User ID=postgres;Password=postgres;Host=127.0.0.1;Port=5432;Database=Quartz",
      ["quartz.dataSource.myDS.provider"] = "Npgsql"
  };
  StdSchedulerFactory _stdSchedulerFactory = new StdSchedulerFactory(props);
  
  // 获取调调度器实例
  _scheduler = await _stdSchedulerFactory!.GetScheduler();
  
  // 创建作业
  var sendEmailJob = JobBuilder.Create<SendEmailJob>()
      .WithIdentity("SendEmailJob", "group")
      .Build();
  // 创建触发器
  var sendEmailTigger = TriggerBuilder.Create()
      .WithIdentity("SendEmailTrigger", "group")
      .WithSimpleSchedule(d => d.WithIntervalInSeconds(2).RepeatForever())
      .Build();
  // 将作业和触发器注册到调度器中
  await _scheduler.ScheduleJob(sendEmailJob, sendEmailTigger);
  
  // 开启调度
  await _scheduler.Start();
  ```

  
