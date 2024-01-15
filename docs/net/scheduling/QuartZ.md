# Quartz

> Github：[https://github.com/quartznet/quartznet](https://github.com/quartznet/quartznet)

> 官方教程：[https://www.quartz-scheduler.net/](https://www.quartz-scheduler.net/)

Quartz 是一个强大且可靠的开源调度库，可用于在 .NET 应用程序中执行定时任务。它支持循环调度、延迟调度、并行执行等高级调度功能，并且具有可扩展性和高度定制化能力。

### 简介

Quartz 是一个调度框架，它有四个核心的概念：

- **作业**（Job）：由可执行代码组成的类，需继承自 `IJob` 接口。

- **作业执行器**（Job Executor）：是负责从作业中调用特定方法的组件。

- **触发器**（Trigger）：它指定何时触发任务。

- **调度器**（Scheduler）：负责调度所有计划的任务，并在任务需要执行时运行它们。

#### 安装

使用到的 NuGet 包：

```PowerShell
Install-Package Quartz
```

#### 作业

作业是 Quartz 中执行工作的<span style="color: #e63f32;font-weight: 700;">基本单元</span>。它们表示可执行代码的逻辑单元，并且由调度程序定期触发。作业实现 `IJob` 接口，该接口定义了一个执行方法 `Execute`，在每次调度时会调用该方法。

下面是一个简单的作业示例：

```C#
public class MyJob : IJob
{
    public async Task Execute(IJobExecutionContext context)
    {
        // 执行作业逻辑
    }
}
```

#### 触发器

触发器是 Quartz 中的计划单元，它指定<span style="color: #e63f32;font-weight: 700;">何时触发作业</span>。每个作业可以有多个触发器，每个触发器都有一个名称和一个与其相关联的作业。 Quartz 支持多种触发器类型，包括 SimpleTrigger、CronTrigger、CalendarIntervalTrigger 等。

下面是一个简单的触发器示例：

```C#
// 每分钟触发一次作业
var trigger = TriggerBuilder.Create()
    .WithIdentity("job1", "group1") // 作业名和组名
    .StartAt(DateTimeOffset.UtcNow.AddMinutes(5)) // 延迟调度
    .WithSimpleSchedule(x => x.WithIntervalInMinutes(1).RepeatForever()) // 循环调度
    .Build();
```

#### 调度器

调度器是 Quartz 中的核心组件，它负责<span style="color: #e63f32;font-weight: 700;">管理作业和触发器</span>，并根据其计划运行作业。每个应用程序只需要一个调度器实例，该实例可以在整个应用程序生命周期中重复使用。

下面是一个创建调度器示例：

```C#
var schedulerFactory = new StdSchedulerFactory();
var scheduler = await schedulerFactory.GetScheduler();
await scheduler.Start();
```

### 任务调度

一旦有了作业、触发器和调度器，就可以开始安排任务调度了。在 Quartz 中，任务调度的流程如下：

- 创建一个作业

- 创建一个触发器

- 将作业和触发器关联起来

- 将作业和触发器注册到调度中心

下面是一个简单的任务调度示例，它使用 SimpleTrigger 触发器每分钟调度一个作业：

```C#
// 1、创建作业
var jobDetail = JobBuilder.Create<MyJob>()
    .WithIdentity("job1", "group1")
    .Build();

// 2、创建触发器
var trigger = TriggerBuilder.Create()
    .WithIdentity("trigger1", "group1")
    .StartAt(DateTimeOffset.UtcNow.AddMinutes(5)) // 延迟调度
    .WithSimpleSchedule(x => x.WithIntervalInMinutes(1).RepeatForever()) // 循环调度
    .Build();

// 3、将作业和触发器注册到调度器中
await scheduler.ScheduleJob(jobDetail, trigger);
```

- 在上面的示例中，使用 `StartAt` 方法来指定触发器的开始时间，从而实现延迟调度。注意，需要使用 `DateTimeOffset.UtcNow` 来获取当前时间。

- 使用 `WithIntervalInSeconds` 方法来指定触发器的时间间隔为 1 分钟。`RepeatForever` 方法指定了触发器将永久重复执行，直到调度器停止。

### 并行串行执行

Quartz 支持并行执行多个作业。作业可以使用 `DisallowConcurrentExecution` 特性来指示调度程序不允许同一作业实例在同一时间执行。这样可以确保不同实例的作业在并行执行时互不干扰。

> _例如：一个任务，我们定义 5 秒运行一次,但是运行过程可能会比较长(例如要 12 秒才可以计算完成)，这样就会造成前一个任务还没有执行完毕，后一个新任务又启动了（这样会造成多个任务并行在执行）_

> _如果在类上标注:`[DisallowConcurrentExecution]`,这样新任务启动时，必须在前一个任务已经完成的情况下(这样任务是一个接一个的，是串行的) 以本 demo 来说：12 秒后才会启动一个新任务，任务和任务不会并行（当然任务与任务之间的间隔就不是原有的 5 秒了）_

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
