# ASP.NET Core

## 异步编程

### 基本概念

异步编程：**await + async**

注意点：

- 异步方法的返回值一般是 `Task<T>`，T 是真正的返回值类型，例如：`Task<int>`；

- 即使方法没有返回值，也最好把返回值声明为 非泛型类 的 Task；

- 调用异步方法时，一般在方法前加上 await 关键字，这样拿到的返回值就是泛型指定的 T 类型的结果；

- 异步方法具有“传染性”，一个方法中如果使用了 await 调用，则这个方法外层必须使用 async 进行修饰；

示例：

```C#
//注意：此时就需要在函数外部添加 async 关键字了，并且返回值写为 Task
static async Task Main(string[] args)
{
    string filename = @"E:\projects\NetCore\awaitasync\测试.txt";
    await File.WriteAllTextAsync(filename, "HELLO");
    string s = await File.ReadAllTextAsync(filename);
    Console.WriteLine(s);
}
```



### 异步委托

文章阅读：[https://blog.csdn.net/HerryDong/article/details/82825548](https://blog.csdn.net/HerryDong/article/details/82825548)

```C#
// 重点是 await + async 的使用
ThreadPool.QueueUserWorkItem(async (obj) =>
{
    while (true)
    {
        string filename = @"E:\projects\NetCore\awaitasync\测试.txt";
        await File.WriteAllTextAsync(filename, "aaaaaaaaa");
    }
});
```



### 不使用async+await的情况

`async`方法会有缺点：

- 异步方法会生成一个类，运行效率并没有普通方法高；

- 可能会占用非常多的线程；

所以，如果一个异步方法只是对别的异步方法调用的转发（就是简单的返回值），并没有太多的逻辑（如等待A方法的结果，利用A的结果再调用B方法等等），那么此时我们就可以 不使用 async+await 进行简化。

请看下面的两个例子：

```C#
static async Task Main(string[] args)
{
    string s = await ReadAasync1(1);
    Console.WriteLine(s);
}

// 正常写法
static async Task<string> ReadAasync(int num)
{
    if (num == 1)
        return await File.ReadAllTextAsync(@"E:\projects\NetCore\awaitasync\测试.txt");
    else if (num == 2)
        return await File.ReadAllTextAsync(@"E:\projects\NetCore\awaitasync\测试2.txt");
}
```

重点思考：此时函数的返回值需要为 `Task<string>` 类型， 而 ReadAllTextAsync() 返回值就是 `Task<string>` 类型，直接返回就可以了呀，所以不用关键字修饰！

```C#
// 省略 async + await 的写法
static Task<string> ReadAasync1(int num)
{
    if (num == 1)
        return File.ReadAllTextAsync(@"E:\projects\NetCore\awaitasync\测试.txt");
    else if (num == 2)
        return File.ReadAllTextAsync(@"E:\projects\NetCore\awaitasync\测试2.txt");
}
```



### 异步暂停

如果想在异步方法中暂停一段时间，切记不要使用`Thread.Sleep();`，因为它会阻塞调用线程，请使用 `await Task.Delay();`代替。

```C#
//异步方式下载 两个网址 的 HTML 代码
using (HttpClient httpClient = new HttpClient())
{
    string s1 = await httpClient.GetStringAsync("http://www.youzack.com");
    textBox1.Text = s1.Substring(0, 200);

    //Thread.Sleep(3000);	// 程序会卡死
    await Task.Delay(3000);	// 程序不会卡死

    string s2 = await httpClient.GetStringAsync("http://www.baidu.com");
    textBox1.Text = s2.Substring(0, 200);
}
```



### whenAll 方法

- `WhenAny()`：任何一个 Task 完成，Task 就完成；

-  `WhenAll()`：所有 Task 方法完成，Task 才会完成，用于等待多个任务执行结束，但是不在乎他们的执行顺序；

```C#
Task<string> s1 = File.ReadAllTextAsync(@"E:\projects\NetCore\awaitasync\测试.txt");
Task<string> s2 = File.ReadAllTextAsync(@"E:\projects\NetCore\awaitasync\测试2.txt");
Task<string> s3 = File.ReadAllTextAsync(@"E:\projects\NetCore\awaitasync\测试3.txt");

string[] res = await Task.WhenAll(s1, s2, s3);
```



### 异步和yield

>参考文章：
>
>1. [https://www.cnblogs.com/ljx111/p/17411347.html](https://www.cnblogs.com/ljx111/p/17411347.html)
>
>2. [https://blog.csdn.net/wojiuguowei/article/details/124604083](https://blog.csdn.net/wojiuguowei/article/details/124604083)

yield return 是一个强大的关键字，它可以帮助我们在**不创建临时集合**的情况下，实现枚举的值的生成。yield return可以实现延迟执行，更具可读性和内存优化的使用。

当我们使用 yield return时，编译器会为我们生成一个名为 “Enumerator”的状态机，这个状态机将记录每次迭代的状态，从而从上一次迭代的地方继续执行，而不需要重新开始。这使得我们可以在循环中逐个返回值，而无需一次性返回所有值。

```C#
static IEnumerable<string> Test1()
{
    List<string> list = new List<string>();
    list.Add("hello");
    list.Add("sunny");
    list.Add("happy");
    return list;
}
```

```C#
// 不用创建临时集合
static IEnumerable<string> Test2()
{
    yield return "hello";
    yield return "sunny";
    yield return "happy";
}
```

注意：在旧版C#中，async 方法中不能使用 yield。但是从 C# 8.0 以后，可以在异步方法中把返回值声明为 IAsyncEnumerable（不要带Task），然后遍历时使用 await foreach() 即可。

```C#
await foreach (var item in Test3())
{
    Console.WriteLine(item);
}

// IEnumerable和yield都是用“状态机”编译，所以魔法+魔法=没法玩！
static async IAsyncEnumerable<string> Test3()
{
    yield return "hello";
    yield return "sunny";
    yield return "happy";
}
```



## LINQ

### 委托

概念：委托 就是 为方法指定类型。

.NET 中为我们提供了自定义的委托类型，分为以下两种：

- 无返回值委托类型：`Action<>`

- 有返回值委托类型：`Func<>`

```C#
// 1、无参无返回值 委托类型
public static void Add()
{
    Console.WriteLine("我不是刘德华");
}
Action add = Add;
add();

// 2、有参无返回值 委托类型
public static void Add1(int x, int y)
{
    Console.WriteLine(x + y);
}
Action<int, int> add1 = Add1;
add1(1,2);
```

```C#
// 3、无参有返回值 委托类型
public static string Multi1()
{
    return "刘德华";
}
Func<string> mutil1 = Multi1;
string res = mutil1();

// 4、有参有返回值（参数类型相同） 委托类型
public static int Multi2(int x, int y)
{
    return x * y;
}
Func<int, int, int> multi2 = Multi2;
Console.WriteLine(multi2(2, 3));

// 5、有参有返回值（参数类型不同） 委托类型
public static string Multi3(int x, string y)
{
    return x + y;
}
Func<int, string, string> mutil3 = Multi3;
Console.WriteLine(mutil3(1, "哈哈哈"));
```



### 匿名委托

概念：就是没有函数名称的委托类型。

```C#
// 1、无参无返回值的 匿名委托类型
Action f1 = delegate ()
{
    Console.WriteLine("我是sunny");
};
f1();

// 2、有参无返回值的 匿名委托类型
Action<int, string> f2 = delegate (int x, string y)
{
    Console.WriteLine("{0}, {1}", x, y);
};
f2(666, "sunny");

// 3、有参有返回值的 匿名委托类型
Func<int, int, int> f3 = delegate (int x, int y)
{
    return x + y;
};
Console.WriteLine(f3(2, 3));
```



### lambda表达式

概念：Lambda表达式是一种匿名函数，类似于 JavaScript 中的箭头函数。

```C#
// 1、lambda表达式简化 匿名委托类型（因为在Func的泛型中定义了数据类型，所以表达式中可以省略数据类型）
Func<int, int, int> f4 = (x, y) => { return x + y; };
Console.WriteLine(f4(2, 3));

// 2、只有一行且没有返回值，可以省略 花括号
Action f5 = () => Console.WriteLine("我是sunny");
f5();

// 3、只有一行且有返回值，可以省略 花括号和return
Func<int, int, int> f6 = (x, y) => x + y;
Console.WriteLine(f6(2, 3));

// 4、函数只有一个参数时，可以省略参数的 小括号
Func<int, bool> f7 = i => i > 0;
Console.WriteLine(f7(3));
```



### Where

概念：Where方法用来做条件筛选，从集合、数组等对象中获取满足条件的元素。

```C#
// 从 list 集合中取出大于 10 的元素
int[] nums = new int[] { 1, 2, 55, 33, 234, 45, 2 };

IEnumerable<int> res = nums.Where(i => i > 10);

// 手写 MyWhere 语句的调用
// IEnumerable<int> res = MyWhere1(nums, i => i < 10);

foreach (var item in res)
{
    Console.WriteLine(item);
}
```

> 面试题：手写一个 Where 语句。

::: code-group

```C# [常规]
static IEnumerable<int> MyWhere(IEnumerable<int> arr, Func<int, bool> fun)
{
    List<int> list = new List<int>();
    foreach (var item in arr)
    {
        if (fun(item))
        {
            list.Add(item);
        }
    }
    return list;
}
```

```C# [简化]
// MyWhere 需要传递两个参数：`arr` 和 `有返回值的委托函数`，在内部通过循环将满足条件的元素以集合形式返回
static IEnumerable<int> MyWhere1(IEnumerable<int> arr, Func<int, bool> fun)
{
    foreach (var item in arr)
    {
        if (fun(item))
        {
            yield return item;
        }
    }
}
```

:::



### 常用LINQ语句

|LINQ语句|作用|
|:-:|-|
|Where()|筛选满足条件的元素|
|Count()|统计满足条件数据的个数|
|Any()|有一条满足条件，则返回 True|
|Single()|有且只有一条满足要求的数据时，返回数据，其余情况都报错|
|SingleOrDefault()|最多只能有一条满足条件的语句，超出一条则报错，一条都没有则返回类型的默认值|
|First()|返回满足条件的第一条数据，若一条都不满足，则报错|
|FirstOrDefault()|返回满足条件的第一条数据，若一条都不满足，则返回类型的默认值|
|OrderBy()|按条件升序排序|
|OrderByDescending()|按条件降序排序|
|ThenBy()|在上一个条件排序之后，在进行升序排序|
|ThenByDescending()|在上一个条件排序之后，在进行降序排序|
|Skip()|跳过几条数据，取其之后的数据|
|Take()|取指定的几条数据|
|Max()|求最大值|
|Min()|求最小值 |
|Average()|求平均值|
|Sum()|求和|
|GroupBy()|对数据进行分组|
|Select()|投影：将集合中的每一项转换为另一种类型|
|ToArray()|转换为数组类型|
|ToList|转换为集合类型|

代码示例：

```C#
//1、Where 筛选
IEnumerable<Employee> res = list.Where(x => x.Age > 30);

// 2、Count 统计个数
int num = list.Count(x => x.Age > 30 && x.Salary >= 8000);

// 3、Any 有一条满足要求，则返回 True
bool flag = list.Any(x => x.Salary > 8000);
bool flag1 = list.Where(x => x.Salary >= 9000).Any();

//4、Single 有且只有一条满足要求的数据时，返回数据，其余情况都报错
Employee e = list.Single(x => x.Name == "jerry");
Employee e2 = list.Where(x => x.Name == "jerry").Single();

// 5、SingleOrDefault 最多只能有一条满足条件的语句，超出一条则报错，一条都没有则返回类型的默认值
Employee e3 = list.SingleOrDefault(x => x.Name == "jerry");

// 6、First 返回满足条件的第一条数据，若一条都不满足，则报错
Employee e4 = list.First(x => x.Age >= 30);

// 7、FirstOrDefault 返回满足条件的第一条数据，若一条都不满足，则返回类型的默认值
Employee e5 = list.FirstOrDefault(x => x.Age >= 300);

// 8、OrderBy 按条件升序排序
IOrderedEnumerable<Employee> e6 = list.OrderBy(x => x.Age);

// 9、OrderByDescending 按条件降序排序
IOrderedEnumerable<Employee> e7 = list.OrderByDescending(x => x.Age);

// 10、ThenBy 在上一个条件排序之后，在进行升序排序
IOrderedEnumerable<Employee> e8 = list.OrderBy(x => x.Age).ThenBy(y => y.Salary);

// 11、ThenByDescending 在上一个条件排序之后，在进行降序排序
IOrderedEnumerable<Employee> e9 = list.OrderBy(x => x.Age).ThenByDescending(y => y.Salary);

// 12、Skip 跳过几条数据，取其之后的数据，Take 取指定的几条数据
IEnumerable<Employee> e10 = list.Skip(3).Take(2);

// 13、Max 求最大值 Min 求最小值 Average 求平均值 Sum 求和 Count 求满足条件的个数
int max = list.Max(x => x.Age);
int min = list.Min(x => x.Age);
double average = list.Average(x => x.Salary);
double sum = list.Sum(x => x.Salary);
int count = list.Count(x => x.Salary >= 8000);
// 链式编程
int min1 = list.Where(x => x.Age >= 30).Min(y => y.Salary);

// 15、Select 从集合中挑出某一项组成另一个集合
IEnumerable<string> res = list.Select(x => x.Name);

 // 16、ToArray 转换为数组类型 ToList 转换为集合类型
IEnumerable<Employee> item = list.Where(x => x.Salary >= 6000);
Employee[] array = item.ToArray();
List<Employee> list1 = item.ToList();
```



#### 匿名类型

语法：

```C#
var obj = new { AAA = "哇哈哈", BBB = "王力宏" };
```

匿名类型 + Select：

```C#
// 1、可以指定具体的 对象，如 Dog
IEnumerable<Dog> dogs = list.Select(x => new Dog { Age = x.Age, NickName = x.Name });
foreach (var item in dogs)
{
    Console.WriteLine(item.NickName);
    Console.WriteLine(item.Age);
}

// 2、也可以不指定对象，使用 匿名类型
var res1 = list.Select(x => new { Name = x.Name, Age = x.Age });
foreach (var item in res1)
{
    Console.WriteLine(item.Name);
    Console.WriteLine(item.Age);
}
```



#### 查询语法

使用 Where、OrderBy、Select等扩展方法进行数据查询的写法叫做 “方法语法”。还有一种“查询语法”的写法。

但是本质没有变化：方法语法 会被编译成 查询语法 运行！

```C#
// 方法语法
var res = list.Where(x => x.Salary > 6000)
              .OrderBy(x => x.Age)
              .Select(x => new { x.Age, x.Salary, XB = x.Gender ? "男" : "女" });

// 查询语法
var res = from x in list
          where x.Salary > 6000
          orderby x.Age
          select new { x.Age, x.Salary, XB = x.Gender ? "男" : "女" };
```



## 依赖注入

### 基本概念

概念：依赖注入（Dependency Injection，DI）是**控制反转**（Inversion of Control，IOC）思想的实现方式。依赖注入 简化模块的组装过程，降低模块之间的耦合度。

DI的几个概念：

- 服务（service）：要获取服务的对象，例如数据库；

- 注册服务：就是注册要获取的服务；

- 服务容器：负责管理注册的服务；

- 查询服务：创建对象及关联对象；

- 对象声明周期：

    - **瞬态（Transient）**：每次获取服务，都会创建一个新的对象；

    - **范围（Scoped）**：某个范围内，获取到的都是同一个对象，但是出了这个范围，获取到的就是新对象；

    - **单例（Singleton）**：在全局获取服务，获取到的都是同一个对象；



### 生命周期的使用

三种生命周期的使用场景：

1. 如果 **类无状态**，建议使用 Singleton；

2. 如果 **类有状态**，且有 Scope 控制，建议为 Scoped，因为通常这种 Scoped 控制下的代码都是运行在同一个线程中，没有并发修改的问题；

3. 瞬态不建议使用；

写代码之前，请先安装 `Microsoft.Extensions.DependencyInjection` 这个 Nuget 包。

#### 瞬态

```C#
// 创建服务集合
ServiceCollection services = new ServiceCollection();
// 向服务集合中添加一个 瞬态 服务
services.AddTransient<TestServiceImpl>();
// 开启服务定位器
using (ServiceProvider sp = services.BuildServiceProvider())
{
    // 获取服务
    TestServiceImpl t = sp.GetService<TestServiceImpl>();
    t.Name = "sunny";
    t.SayHi();
  
    TestServiceImpl t2 = sp.GetService<TestServiceImpl>();
    Console.WriteLine(object.ReferenceEquals(t, t2));		// False 说明 t 和 t2 是两个对象
}
```

#### 范围

```C#
ServiceCollection services = new ServiceCollection();
services.AddScoped<TestServiceImpl>();

using (ServiceProvider sp = services.BuildServiceProvider())
{
    using (IServiceScope scope = sp.CreateScope())
    {
        TestServiceImpl t = scope.ServiceProvider.GetService<TestServiceImpl>();
        TestServiceImpl t2 = scope.ServiceProvider.GetService<TestServiceImpl>();

        Console.WriteLine(object.ReferenceEquals(t, t2));		// True：t 和 t2 指向同一个地址，说明在Scoped内是同一个对象
    }
}
```

#### 单例

```C#
ServiceCollection services = new ServiceCollection();
services.AddSingleton<TestServiceImpl>();

using (ServiceProvider sp = services.BuildServiceProvider())
{
    TestServiceImpl t = sp.GetService<TestServiceImpl>();
    t.Name = "sunny";
    t.SayHi();
    TestServiceImpl t2 = sp.GetService<TestServiceImpl>();
    t2.Name = "TOM";
    t2.SayHi();

    t.SayHi();	// 此时 t.Name 已经被更改为 TOM
    Console.WriteLine(object.ReferenceEquals(t, t2));		// True：t 和 t2 指向同一个地址，说明是在全局创建了一个对象
}
```



### ServiceProvider  的方法

ServiceProvider 类继承自 IServiceProvider，也可以当作是 IServiceProvider 的方法：

|方法|作用|
|-|-|
|`GetService<T>()`      →  注意：T建议写为接口|获取服务中的对象，若没有获取到，则返回null|
|GetService(Type serviceType)||
|`GetRequiredService<T>()`|获取服务中的对象，若没有获取到，则直接报错|
|GetRequiredService(Type serviceType)||
|`GetServices<T>()`|获取多个服务中的对象|

```C#
ServiceCollection services = new ServiceCollection();
services.AddScoped<ITestService, TestServiceImpl>();
services.AddScoped<ITestService, TestServiceImpl2>();

using (ServiceProvider sp = services.BuildServiceProvider())
{
    // GetService 获取服务中的对象，若没有获取到，则返回null
    ITestService t1 = sp.GetService<ITestService>();
    ITestService t2 = (ITestService)sp.GetService(typeof(ITestService));

    // GetRequiredService 获取服务中的对象，若没有获取到，则直接报错
    ITestService t3 = sp.GetRequiredService<ITestService>();
    ITestService t4 = (ITestService)sp.GetRequiredService(typeof(ITestService));

    // GetServices 获取多个服务中的对象
    IEnumerable<ITestService> t5 = sp.GetServices<ITestService>();
    foreach (ITestService item in t5)
    {
        Console.WriteLine(item.GetType());
    }
}
```



## 系统配置

.NET 中的配置系统支持丰富的配置源，包括文件（**json、xml、ini等**）、注册表、环境变量、命令行、Azure Key Vault等，还一个配置自定义配置源。可以跟踪配置的变化，可以**按照优先级覆盖**。

### 基本使用

- 项目中新建 config.json 文件，并将其属性中的【复制到输出目录】设置为“如果较新则复制”；

  ```json
  {
    "name": "sunny",
    "proxy": {
      "address": "127.0.0.1",
      "port": "8500"
    }
  }
  ```

- 安装 系统配置文件 和 json 文件读取的 Nuget 包：

  ```C#
  Microsoft.Extensions.Configuration
  Microsoft.Extensions.Configuration.Json
  ```

  

#### 手动读取配置文件

```C#
ConfigurationBuilder configBuilder = new ConfigurationBuilder();
// 添加待解析的配置文件
configBuilder.AddJsonFile("config.json", optional: true, reloadOnChange: false);
// 构建 IConfigurationRoot 对象，通过它读取配置项
IConfigurationRoot configRoot = configBuilder.Build();

// 常规读取配置文件中的值
string name = configRoot.GetSection("name").Value;
string address = configRoot.GetSection("proxy:address").Value;
string port = configRoot.GetSection("proxy:port").Value;
```

|参数|说明|
|:-:|-|
|optional|true：配置文件不存在，不报错|
|false|配置文件不存在，则报错|
|reloadOnChange|配置文件修改了，是否重新加载配置|



#### 模型类读取配置文件

模型类读取配置文件的时候，需要和依赖注入一起来使用。

安装包：`Microsoft.Extensions.Configuration.Binder`

```C#
class Proxy
{
    public string Address { get; set; }
    public string Port { get; set; }
}

class Config
{
    public string Name { get; set; }
    public Proxy Proxy { get; set; }
}
```

```C#
// 只读取 Proxy 属性
Proxy proxy = configRoot.GetSection("proxy").Get<Proxy>();
Console.WriteLine(proxy.Address);
Console.WriteLine(proxy.Port);

// 读取所有属性
Config config = configRoot.Get<Config>();
Console.WriteLine(config.Name);
Console.WriteLine(config.Proxy.Address);
Console.WriteLine(config.Proxy.Port);
```



#### 选项式读取配置文件（推荐）

1、推荐使用选项式方式读取配置文件，可以和 依赖注入（DI）更好的结合，且更好利用“reloadonchage”机制；
2、读取配置的时候，DI 要声明 `IOptions<T>`、`IOptionsMonitor<T>`、`IOptionsSnapshot<T>`等类型。推荐使用 `IOptionsSnapshot<T>`。

安装以下 Nuget 包：

```Plain Text
Microsoft.Extensions.Configuration
Microsoft.Extensions.Configuration.Json
Microsoft.Extensions.Configuration.Binder
Microsoft.Extensions.DependencyInjection
Microsoft.Extensions.Options
```

新建 Controller1 和 Controller2 来配置 DI，读取 根 节点和 Proxy 节点：

::: code-group

```C# [Controller1]
class Controller1
{
    // 1、声明读取配置的 IOptionsSnapshot，来读取 根 节点
    private readonly IOptionsSnapshot<Config> optConfig;
    public Controller(IOptionsSnapshot<Config> optConfig)
    {
        this.optConfig = optConfig;
    }

    public void Test()
    {
        Console.WriteLine("Config：" + optConfig.Value.Name);
        Console.WriteLine("Config：" + optConfig.Value.Proxy.Address);
        Console.WriteLine("Config：" + optConfig.Value.Proxy.Port);
    }
}
```

```C# [Controller2]
class Controller2
{
    // 1、声明读取配置的 IOptionsSnapshot，来读取 Proxy 节点
    private readonly IOptionsSnapshot<Proxy> optConfig;
    public Controller1(IOptionsSnapshot<Proxy> optConfig)
    {
        this.optConfig = optConfig;
    }

    public void Test()
    {
        Console.WriteLine("Proxy：" + optConfig.Value.Address);
        Console.WriteLine("Proxy：" + optConfig.Value.Port);
    }
}
```

```C# [配置DI]
ServiceCollection service = new ServiceCollection();
service.AddScoped<Controller1>();
service.AddScoped<Controller2>();

ConfigurationBuilder configBuilder = new ConfigurationBuilder();
configBuilder.AddJsonFile("config.json", optional: true, reloadOnChange: false);
IConfigurationRoot configRoot = configBuilder.Build();

service.AddOptions()
    .Configure<Config>(e => configRoot.Bind(e))
    .Configure<Proxy>(e => configRoot.GetSection("proxy").Bind(e));

using (ServiceProvider sp = service.BuildServiceProvider())
{
    Controller res = sp.GetRequiredService<Controller>();
    res.Test();

    Controller1 res1 = sp.GetRequiredService<Controller1>();
    res1.Test();
}
```

:::
