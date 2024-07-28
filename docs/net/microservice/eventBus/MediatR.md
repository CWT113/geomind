# MediatR

>Github：https://github.com/jbogard/MediatR
>
>学习视频：https://www.bilibili.com/video/BV1W14y1c7yt/?p=40



MediatR 是一个用于 .NET 引用程序的库，提供 **中介者模式**（Mediator Pattern）的实现。

它主要用于在应用程序中实现松散解耦的通信，简化组件之间的交互，使得代码变得更加清晰和可维护。



## 核心概念

### IRequest

`IRequest` 是一个泛型接口，表示一个请求，它有两种情况：

- `IRequest`：没有泛型参数，表示该请求没有返回值；
- `IRequest<TResponse>`：有泛型参数，表示该请求的返回值类型为 `TResponse`；

```C#
// 无泛型参数，则无返回值
public record CreateStudentCommand(string Name) : IRequest;

// 有泛型参数，则有返回值，且返回值类型为 Response
public record Response(bool IsSuccess, string Result);
public record CreateStudentCommand(string Name) : IRequest<Response>;
```



### IRequestHandler

`IRequestHandler` 也是一个泛型接口，第一个参数表示接收的请求，第二个参数表示返回值，它被用来处理上面定义的 `IRequest` 请求。

::: code-group

```C# [无返回值] {1,3}
public record CreateStudentCommand(string Name) : IRequest;

public class CreateStudentCommandHandler : IRequestHandler<CreateStudentCommand>
{
    public Task Handle(CreateStudentCommand request, CancellationToken cancellationToken)
    {
      	// ...
        return Task.CompletedTask;
    }
}
```

```C# [有返回值] {3,5,10}
public record Response(bool IsSuccess, string Result);

public record CreateStudentCommand(string Name) : IRequest<Response>;

public class CreateStudentCommandHandler() : IRequestHandler<CreateStudentCommand, Response>
{
    public Task<Response> Handle(CreateStudentCommand request, CancellationToken cancellationToken)
    {
        // ...
        return Task.FromResult(new Response(true, $"学生创建成功，姓名：{request.Name}"));
    }
}
```

:::



### INotification

`INotification` 是一个 非泛型接口，表示一个通知，它没有泛型，也就表示它没有返回值。

```C#
public record SendMessageNotification(string Address) : INotification;
```



### INotificationHandler

`INotificationHandler` 是一个泛型接口，泛型只有一个参数，表示接受的通知，它被用来处理上面定义的 `INotification` 通知。

```C#
public class SendMQNotificationHandler : INotificationHandler<SendMessageNotification>
{
    public Task Handle(SendMessageNotification notification, CancellationToken cancellationToken)
    {
        // ...
        return Task.CompletedTask;
    }
}
```



## 两种模式

MediatR 是一个中介者类，它负责将 IRequest 对象发送到 IRequestHandler，获取响应并返回。

它有 2 种模式：

| 中文名称        | 模式   | 发起者             | 消费者                        | 返回值             |
| --------------- | ------ | ------------------ | ----------------------------- | ------------------ |
| 命令（Command） | 一对一 | mediator.send()    | 实现接口 IRequestHandler      | 可以有，也可以没有 |
| 事件（Event）   | 一对多 | mediator.publish() | 实现接口 INotificationHandler | 没有返回值         |



## 基本使用

### 安装

安装 MediatR 的 Nuget 包：

```shell
Install-Package MediatR
```



### 注册服务

```C#
public static class MediatRConfig
{
  public static IServiceCollection AddMediatRConfiguration(this IServiceCollection services)
  {
    ArgumentNullException.ThrowIfNull(services);

    services.AddMediatR(configuration =>
    {
      //修改 MediatR 生命周期
      configuration.Lifetime = ServiceLifetime.Singleton;

      //自动扫描 Program.cs 中所有的请求处理器（Handlers）、通知处理器（Notification Handlers）
      configuration.RegisterServicesFromAssemblyContaining<Program>();
    });

    return services;
  }
}
```



### Command 模式

::: tip 提示

1. 消息传递模型继承自 `IRequest` ，通常以 `xxxCommand` 结尾；
2. 消息处理继承自 `IRequestHandler`，通常以 `xxxHandler` 结尾；

:::

#### 无返回值

```C# {1,5}
public record CreateStudentCommand(string Name) : IRequest;

public class CreateStudentCommandHandler : IRequestHandler<CreateStudentCommand>
{
    public Task Handle(CreateStudentCommand request, CancellationToken cancellationToken)
    {
        Console.WriteLine($"学生创建成功，姓名：{request.Name}");
        return Task.CompletedTask;
    }
}
```

```C# {12}
public class HostedService : IHostedService
{
    private readonly IMediator _mediator;

    public HostedService(IMediator mediator)
    {
        _mediator = mediator;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await _mediator.Send(new CreateStudentCommand("hello, world!"), cancellationToken);
    }
}
```



#### 有返回值

```C# {4,8}
//返回值类型
public record Response(bool IsSuccess, string Result);

public record CreateStudentCommand(string Name) : IRequest<Response>;

public class CreateStudentCommandHandler() : IRequestHandler<CreateStudentCommand, Response>
{
    public Task<Response> Handle(CreateStudentCommand request, CancellationToken cancellationToken)
    {
        Console.WriteLine($"学生创建成功，姓名：{request.Name}");
        return Task.FromResult(new Response(true, $"创建了一个学生，姓名：{request.Name}"));
    }
}
```

```C#
public class HostedService : IHostedService
{
    private readonly IMediator _mediator;

    public HostedService(IMediator mediator)
    {
        _mediator = mediator;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        var res = await _mediator.Send(new CreateStudentCommand("hello, world!"), cancellationToken);
        Console.WriteLine($"返回值为：IsSuccess = {res.IsSuccess}，Result = {res.Result}");
    }
}
```



### Event 模式

::: tip 提示

1. 消息传递模型继承自 `INotification` ，通常以 `xxxEvent` 结尾；
2. 消息处理继承自 `INotificationHandler`，通常以 `xxxHandler` 结尾；

:::

由于 Event模式 是 “一对多”，因此声明了一个 `SendMessageNotification` 通知后，可以由多个 `NotificationHandler` 进行处理：

```C#
public record SendMessageEvent(string MQAddress, string EmailAddress) : INotification;

public class SendMQNotificationHandler : INotificationHandler<SendMessageEvent>
{
    public Task Handle(SendMessageEvent notification, CancellationToken cancellationToken)
    {
        Console.WriteLine($"A模块 --> 给 {notification.MQAddress} 发送MQ!");
        return Task.CompletedTask;
    }
}

public class SendEmailNotificationHandler : INotificationHandler<SendMessageEvent>
{
    public Task Handle(SendMessageEvent notification, CancellationToken cancellationToken)
    {
        Console.WriteLine($"B模块 --> 给 {notification.EmailAddress} 发送邮件!");
        return Task.CompletedTask;
    }
}
```

```C# {12,13}
public class HostedService : IHostedService
{
    private readonly IMediator _mediator;

    public HostedService(IMediator mediator)
    {
        _mediator = mediator;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
      	var message = new SendMessageNotification("127.0.0.1:8000", "123@qq.com");
        await _mediator.Publish(message, cancellationToken);
    }
}
```



### Pipeline 管道

MediatR 中也支持 事务管道，它可以在数据被传输之前和传输完成后进行拦截。

事务管道需要继承自 `IPipelineBehavior` 接口，该接口同样需要 `TRequest` 和 `TResponse` 两个参数，表示请求和返回值。

```C# {8,10}
public class TrsanctionPipelineBehavior<TRequest, TResponse> :
    IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        Console.WriteLine("管道事物已开启");
      	// next() 方法表示向下进行后续的 handler 处理，如果有返回值则将其返回出去
        var response = await next();
        Console.WriteLine("管道事物已提交");
        return response;
    }
}
```

```C# {13}
public static class MediatRConfig
{
  public static IServiceCollection AddMediatRConfiguration(this IServiceCollection services)
  {
      ArgumentNullException.ThrowIfNull(services);

      services.AddMediatR(configuration =>
      {
          configuration.Lifetime = ServiceLifetime.Singleton;
          configuration.RegisterServicesFromAssemblyContaining<Program>();
        
        	//配置事务管道
					configuration.AddBehavior(typeof(IPipelineBehavior<,>), typeof(TrsanctionPipelineBehavior<,>));
      });

    	return services;
  }
}
```

进行管道配置之后，可以发现无论是 Command模式 还是 Event模式，在执行之前都会被管道拦截到。