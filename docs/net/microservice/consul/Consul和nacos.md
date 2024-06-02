# Consul和Nacos

## 基本概述

**服务注册**：就是将提供某个服务的模块信息(通常是服务的ip和端口)注册到1个公共的组件上去（如consul）。

**服务发现**：就是新注册的这个服务模块能够及时的被其他调用者发现，不管是服务新增和服务删减都能实现自动发现。



服务注册流程：

1. 服务提供者 向 service-center 注册服务信息

2. 服务提供者发送心跳，维持在 service-center 中的 UP 状态

3. 服务消费者 向 service-center 注册服务信息

4. 服务消费者 从 service-center 发现服务提供者的信息

5. 服务消费者 向 服务提供者 发送请求，并获取通讯结果

![image.png](./images/image.png)



## Consul

### 概述

概念：Consul是 service mesh（服务网格）的一个解决方案，它提供了注入**服务发现**、**配置**和**隔离**等功能的一整套控制平面（control plane）。



核心功能（优势）：

- **服务发现**：Consul 客户端可以注册一个服务，比如 API 接口或者 mysql 服务，其他的客户端可以通过 Consul 来发现这些服务的提供方，通过 DNS 或 HTTP，引用可以很方便的找到它依赖的服务。

- **健康检查**：Consul 客户端可以提供任意数量的健康检查，运维人员可以通过这些信息管理集群的健康情况，服务发现组件也可以使用这些信息管理集群的健康情况。

- **KV存储**：应用可以使用Consul的树状 key/value 存储很多信息，比如动态配置，开关，协作，leader选举等。

- 服务通信加密，Consul 可以生成并分发 TLS 证书给服务，从而保证服务之间使用 TLS 通信。

- 多数据中心：Consul 支持开箱即用的多数据中心功能。这意味着当工作区域扩展至多个的时候，用户不需要费心去创建额外的抽象层来满足多中心需求。



两个角色：

- **client**：客户端，无状态，将 HTTP 和 DNS 接口请求转发给局域网内的服务器集群。

- **server**：服务端，保存配置信息，高可用集群，每个数据中心的 server 数量推荐为 3 或 5 个。

![image.png](./images/image%201.png)



### 安装

#### Windows 安装

consul 下载地址：[https://developer.hashicorp.com/consul/downloads](https://developer.hashicorp.com/consul/downloads)

1. 选择 windows x64 版本

2. 进入下载好的文件夹中，打开 powershell，执行命令，启动服务端处理

```PowerShell
# -dev：开发环境
# --server：开发环境
consul.exe agent -dev
```

1. 浏览器输入 [http://localhost:8500](http://localhost:8500) 出现 consulweb 界面就表示成功了。



#### Linux 安装

1. yum 安装 consul 环境

```Shell
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo
sudo yum -y install consul
```

2. 安装完成后，执行命令查询是否安装成功

```Shell
consul version
# 输出 Consul v1.16.2 之类的表示安装成功
```

3. 执行命令，启动服务端

```Shell
consul agent -dev
```

4. 浏览器输入 [http://localhost:8500](http://localhost:8500) 出现 consulweb 界面就表示成功了。



### Consul 服务注册与发现

注意：在 .NET 中有两个Consul 的库可以使用，分别是：Consul 和 Consul.AspNetCore，下面分别介绍。

1. 安装 Consul 两个库的 Neget 包：

```Shell
Install-Package Consul
Install-Package Consul.AspNetCore
```

1. 在 appsettings.json 中配置 consul 相关的配置信息，常用的信息如下：

```JSON
"Consul": {
  "ConsulHost": "http://127.0.0.1:8500", // consul客户端地址
  "ServiceName": "Consul.Service-A",     // consul服务名称
  "ServiceIp": "127.0.0.1",              // 服务端ip
  "ServicePort": 5193,                   // 服务端端口号（可以在launchSettings.json查看）
  "DataCenter": "Test_Consul",           // 数据中心名称
  "Weight": 1                            // 权重
}
```

2. 创建与 appsettings.json 配置文件中配置信息一一对应的 类

```C#
public class ConfigOptions
{
    public string ConsulHost { get; set; }
    public string ServiceName { get; set; }
    public string ServiceIp { get; set; }
    public int ServicePort { get; set; }
    public string DataCenter { get; set; }
    public int Weight { get; set; }
}
```

3. 通过代码对  consul 进行配置，两个包的配置 API 略有不同

- Consul 包：

```C#
//获取配置信息
var section = configuration.GetSection("Consul");
services.Configure<ConfigOptions>(section);
var consulOptions = section.Get<ConfigOptions>();

//配置客户端
var client = new ConsulClient(d =>
{
    d.Address = new Uri(consulOptions!.ConsulHost);
    d.Datacenter = consulOptions.DataCenter;
});

//配置服务端
client.Agent.ServiceRegister(new AgentServiceRegistration()
{
    ID = Guid.NewGuid().ToString(),
    Name = consulOptions!.ServiceName,
    Address = consulOptions.ServiceIp,
    Port = consulOptions.ServicePort,
    Tags = new string[] { consulOptions.Weight.ToString() },

    //健康检测
    Check = new AgentServiceCheck()
    {
        // 1、健康检查失败，多久后移除当前服务
        DeregisterCriticalServiceAfter = TimeSpan.FromSeconds(10),
        // 2、设置心跳检测时长
        Interval = TimeSpan.FromSeconds(10),
        // 3、健康检查的地址(心跳地址)
        HTTP = $"http://{consulOptions.ServiceIp}:{consulOptions.ServicePort}/Health/HealthCheck",
        // 4、配置超时时间
        Timeout = TimeSpan.FromSeconds(10),
    }
});
```

- Consul.AspNetCore 包：

```C#
//读取Consul配置信息
var section = configuration.GetSection("Consul");
services.Configure<ConsulOptions>(section);
var consulOption = section.Get<ConsulOptions>();

//配置客户端
services.AddConsul(d =>
{
    d.Address = new Uri(consulOption!.HostAddress);
});

//配置服务中心
services.AddConsulServiceRegistration(d =>
{
    d.ID = Guid.NewGuid().ToString();
    d.Name = consulOption!.ServerName;
    d.Address = consulOption!.ServiceAddress;
    d.Port = consulOption!.Port;

    //健康监测
    d.Check = new()
    {
        // 1、健康检查失败，多久后移除当前服务
        DeregisterCriticalServiceAfter = TimeSpan.FromSeconds(10),
        // 2、设置心跳检测时长
        Interval = TimeSpan.FromSeconds(10),
        // 3、健康检查的地址(心跳地址)
        HTTP = $"http://{d.Address}:{d.Port}/Health",
        // 4、配置超时时间
        Timeout = TimeSpan.FromSeconds(5)
    };
});
```

4. 添加 健康监测 的控制器

```C#
[HttpGet]
[Route("HealthCheck")]
public IActionResult HealthCheck()
{
    Console.WriteLine($"心跳检测中 {DateTime.Now}");
    return Ok("健康监测正常！");
}
```

5. 启动项目，注意此时使用 http 启动，而非 https 。



### Consul 分布式配置中心

1. 新建 webapi 项目，安装包：`Consul.AspNetCore`、`Winton.Extensions.Configuration.Consul`；

2. 在其 appSetting.json 中添加 consul 本地配置以及获取远程配置的信息：

注意：此时需要生成两个类 Consul 和 ConsulServer，和下面的配置信息一一对应。

```JSON
//本地Consul配置
"Consul": {
  "HostAddress": "http://127.0.0.1:8500",
  "ServiceAddress": "127.0.0.1",
  "Port": 5094, //端口需要和当前项目匹配
  "ServerName": "Consul.Service-D"//名称需要和当前项目匹配
},
//远程Consul配置
"ConsulServer": {
  "Server": "http://127.0.0.1:8500",
  "DictionaySettingFiles": {
    "consulSetting": "Consul.Service.Cluster.Test/appSetting.Development.json"//配置文件路径
  }
}
```

3. 新建 Consul 和 ConsulOption 两个类，与上面的配置信息一一对应：

```C#
public class ConsulConfig
{
  public string HostAddress { get; set; }
  public string ServiceAddress { get; set; }
  public int Port { get; set; }
  public string ServerName { get; set; }
}
```

```C#
public class ConsulOption
{
    public string Server { get; set; }
    public Dictionary<string, string> DictionaySettingFiles { get; set; }
}
```

4. 注册服务发现 和 分布式配置获取远程配置信息 的方法：

```C#
public static void AddConsulConfiguration(this IServiceCollection services, IConfiguration configuration)
{
    //从本地读取Consul配置信息
    //var consulOption = GetLocalConsulConfig(services, configuration);

    //从远程读取Consul配置信息
    var consulOption = GetRemoteConsulConfig(services, (ConfigurationManager)configuration);

    ...
}
```

```C#
/// <summary>
/// 获取本地 consul 配置
/// </summary>
/// <returns></returns>
public static ConsulConfig? GetLocalConsulConfig(IServiceCollection services, IConfiguration configuration)
{
    var section = configuration.GetSection("Consul").Get<ConsulConfig>();
    return section;
}

/// <summary>
/// 获取远程 Consul 配置
/// </summary>
/// <param name="services"></param>
/// <param name="configuration"></param>
public static ConsulConfig? GetRemoteConsulConfig(IServiceCollection services, ConfigurationManager configuration)
{
    configuration.AddJsonFile("appsettings.json");

    ConsulOption? consulSettings = configuration.GetSection("ConsulServer").Get<ConsulOption>();

    if (consulSettings != null)
    {
        foreach (var itemSetting in consulSettings.DictionaySettingFiles)
        {
            configuration.AddConsul(itemSetting.Value, options =>
            {
                options.ConsulConfigurationOptions = cco =>
                {
                    cco.Address = new Uri(consulSettings.Server);
                };

                options.ReloadOnChange = true;
            });
        }
    }

    var consulConfig = configuration.GetSection("Consul").Get<ConsulConfig>();
    return consulConfig;
}
```

5. 在 Progrem.cs 中注入 Consul 的所有配置：

```C#
//注入 Consul 服务注册与发现
builder.Services.AddConsulConfiguration(builder.Configuration);
```

6. 添加 心跳检测 ：

```C#
/// <summary>
/// 健康检测
/// </summary>
/// <returns></returns>
[HttpGet]
public IActionResult HealthCheck()
{
    Console.WriteLine($"心跳检测正常 {DateTime.Now}");
    return Ok("连接正常!");
}
```

7. 启动项目，在 consul 客户端查看到当前服务，并且 心跳检测 正常，则表示分布式配置成功。



## Nacos

### 概述

>官网：[https://nacos.io/zh-cn/docs/what-is-nacos.html](https://nacos.io/zh-cn/docs/what-is-nacos.html)
>
>.NET Github示例：[https://github.com/nacos-group/nacos-sdk-csharp](https://github.com/nacos-group/nacos-sdk-csharp)
>
>.NET 博客文档：[https://nacos-sdk-csharp.readthedocs.io/en/latest/blogs/info.html](https://nacos-sdk-csharp.readthedocs.io/en/latest/blogs/info.html)



概念：Nacos 是一个构建云原生应用的动态服务发现、配置管理和服务管理的平台。



关键特性（优势）：

- 服务发现和服务健康监测：提供对服务的实时的健康检查，阻止向不健康的主机或服务实例发送请求。

- 动态配置服务：动态配置消除了配置变更时重新部署应用和服务的需要，让配置管理变得更加高效和敏捷。

- 动态DNS服务：动态 DNS 服务支持权重路由，让您更容易地实现中间层负载均衡、更灵活的路由策略、流量控制以及数据中心内网的简单DNS解析服务。

- 服务及其元数据管理：Nacos 能让您从微服务平台建设的视角管理数据中心的所有服务及元数据。



### 安装

1. 先安装 java jdk 环境，安装步骤可查看：[https://blog.csdn.net/ACE_U_005A/article/details/114840497](https://blog.csdn.net/ACE_U_005A/article/details/114840497)

2. 安装 nacos ，安装步骤可查看：[https://cloud.tencent.com/developer/article/1873947](https://cloud.tencent.com/developer/article/1873947)

注意：下载好的 nacos，需要放在路径中没有 数字 的文件夹下！！

3. 安装完成后，浏览器打开 [http://localhost:8848/nacos](http://localhost:8848/nacos) （默认账户和密码均为：nacos）即可打开 nacos 的客户端。



### nacos 服务注册与发现

1. 安装 nacos 的三个Neget 包：

```Shell
Install-Package nacos-sdk-csharp
Install-Package nacos-sdk-csharp.AspNetCore
Install-Package nacos-sdk-csharp.Extensions.Configuration
```

3. 在 appSetting.json 中，配置 nacos 相关的配置信息：

注意：命名空间Id需要在 浏览器客户端 自行创建，再进行添加。

```JSON
"nacos": {
  "ServerAddresses": [ "http://localhost:8848" ],
  "DefaultTimeOut": 15000, //超时时间
  "Namespace": "fdf628a2-8056-492e-ae7e-8b3088b9e850", //命名空间id
  "ListenInterval": 1000, //监听间隔时间
  "ServiceName": "nacos.service",
  "GroupName": "DEFAULT_GROUP", //默认分组
  "ClusterName": "DEFAULT",
  //"Ip": "localhost", //不写系统自动获取服务Ip（建议不写让系统自动获取）
  //"PreferredNetworks": "localhost", //首选网络
  //"Port": 0, //不写系统自动获取服务端口号，0表示80端口
  "Weight": 100, //权重
  "RegisterEnabled": true, //表示当前实例是否注册到注册中心
  "InstanceEnabled": true, //当前实例是否可用
  "Ephemeral": true,
  "Secure": false, //表示当前服务是否是安全实例，用于标识访问的时候是否要启用 https
  "AccessKey": "",
  "SecreKey": "",
  "UserName": "",
  "Password": "",
  "ConfigUseRpc": false,
  "NamingUseRpc": false,
  "NamingLoadCacheAtStart": "",
  "LBStrategy": "WeightRandom", //负载均衡策略，WeightRandom(随机)，WeightRoundRobin(轮询)
  "Metadata": {
    "aa": "bb",
    "cc": "dd"
  }
}
```

3. 在 Progrem.cs 中，注册 nacos 服务：

```C#
//注册 nacos 中心
builder.Services.AddNacosAspNet(builder.Configuration);
```

4. 启动项目之后，可在 nacos 客户端的“服务列表”查看到当前项目的服务。



### nacos 负载均衡

负载均衡，其实就是将服务分摊到多个服务单元执行，客户端请求时，服务端可根据自身性能，向客户端提供服务。

下面使用 nacos 模拟负载均衡（也可以叫集群）：

服务端：

1. 新建两个 webapi 项目，分别命名为 Nacos.Service-A 和 Nacos.Service-B；

2. 两者的相关配置，和 【nacos 服务注册】中的步骤一样；

3. 在两个webapi中，分别新建 ServiceController，里面提供一个接口，返回一些测试数据：

```C#
[HttpGet]
[Route("GetUser")]
public IActionResult GetUser()
{
    List<UserInfo> user = new List<UserInfo>
    {
        new UserInfo("张三", 30),
        new UserInfo("李四", 255),
    };
    return Ok(user);
}
```

```C#
[HttpGet]
[Route("GetUser")]
public IActionResult GetUser()
{
    List<UserInfo> user = new List<UserInfo>
    {
        new UserInfo("王五6666", 30),
        new UserInfo("赵六9999", 255),
    };
    return Ok(user);
}
```



客户端：

1. 新建一个 webapi 项目，命名为 Nacos.Client；

2. Nacos.Client 的相关配置，也和 【nacos 服务注册】中的步骤一样；

3. 新建一个 ClientController，写一个接口向服务端获取数据：

```C#
private readonly INacosNamingService _nacosNamingService;

public ClientController(INacosNamingService nacosNamingService)
{
    _nacosNamingService = nacosNamingService;
}

[HttpGet]
public async Task<IActionResult> GetUserInfo()
{
    //获取健康服务的实例（自带负载均衡）
    //注意：此处请求的服务名称，必须和appsetting.json中配置的ServiceName一致！！
    var instance = await _nacosNamingService.SelectOneHealthyInstance("nacos.service");
    //获取ip地址和端口
    var host = $"{instance.Ip}:{instance.Port}";

    var baseUrl = instance.Metadata.TryGetValue("secure", out _)//放弃 out 输出
        ? $"https://{host}"
        : $"http://{host}";

    if (string.IsNullOrWhiteSpace(baseUrl))
    {
        return Ok("Empty baseUrl");
    }

    //获取服务端口
    //注意：这里的地址要和 Nacos.Service-A 和 Nacos.Service-B 中提供的接口对上！！
    var url = $"{baseUrl}/api/Service/GetUser";

    using (HttpClient client = new HttpClient())
    {
        //通过 url 获取到数据
        var result = await client.GetAsync(url);
        //获取内容是字符串类型
        var json = await result.Content.ReadAsStringAsync();
        //反序列化为 UserInfo 类型
        var user = JsonConvert.DeserializeObject<List<UserInfo>>(json);

        return Ok(user);
    }
}
```

4. 启动 Nacos.Service-A、Nacos.Service-B、Nacos.Client 三个项目，在 Nacos.Client 的接口中获取数据，此时会随即返回数据，模拟集群的效果。

注意：获取时如出现“目标计算机积极抗拒”的错误，需要将 Nacos.Service-A、Nacos.Service-B 两个中的`Properties → launchSettings.json` 中的 `profiles → http → applicationUrl` 改为自己本机的 Ip 地址，而不是 localhost。



### nacos 分布式配置中心

1. 将 【nacos 服务注册与发现】的 appSetting.json 中的信息挪到远程配置中心：

::: tip 注意

需要修改两个地方：

1. Namespace 需要替换为当前配置的 develop；
2. ServiceName 可以替换为 服务端 或 客户端。两个或多个服务端的 ServiceName 要一致，这样才是集群
3. 将 ServerAddresses 改为自己本机的 ip，不是 localhost

:::

```JSON
"nacos": {
  "ServerAddresses": [ "http://localhost:8848" ],
  "DefaultTimeOut": 15000,
  "Namespace": "fdf628a2-8056-492e-ae7e-8b3088b9e850", //命名空间id
  "ListenInterval": 1000,
  "ServiceName": "nacos.service",
  ...
  }
}
```

![image.png](./images/image%202.png)

2. 在 Nacos.Service-A、Nacos.Service-B、Nacos.Client 三个项目的 appsettings.Development.json 文件中，添加如下配置：

注意：DataId 替换为各自项目的名称，从上图也可以看出；

```JSON
//读取服务远程配置文件
"NacosConfig": {
  "Listeners": [
    {
      "Optional": true, //文件是否必须存在
      "DataId": "Nacos.Service-B", //配置文件名称(Id)
      "Group": "DEFAULT_GROUP"
    }
  ],
  "Namespace": "develop", //命名空间Id
  "ServerAddresses": [ "http://127.0.0.1:8848/" ], //服务器地址
  "UserName": "",
  "Password": "",
  "AccessKey": "",
  "SecretKey": "",
  "ConfigUseRpc": false, //配置中心是否使用RPC协议通信
  "NamingUseRpc": false //注册中心是否使用RPC协议通信
}
```

3. 在 Nacos.Service-A、Nacos.Service-B、Nacos.Client 三个项目的 Progrem.cs 中，添加如下代码：

```C#
//注册 nacos 中心
builder.Services.AddNacosAspNet(builder.Configuration);

//注册分布式配置中心
builder.Host.UseNacosConfig("NacosConfig");
```

4. 启动项目，看到 nacos 服务列表中，有三个服务的健康检测表示 服务注册与发现 + 分布式配置中心 完成。



