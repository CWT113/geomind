# CSRedis

>Github：https://github.com/2881099/csredis

>发布订阅教程：https://www.cnblogs.com/kellynic/p/9952386.html



CSRedis 是一个 .NET 平台下的 Redis 客户端，提供了高效的操作 Redis 数据库的方法。本文将详细介绍如何在 .NET 项目中使用 CSRedis。



特点：

- CSRedisClient 和 RedisHelper 保持所有方法名称与 redis-cli 一致
- 支持geo类型命令（需要redis-server 3.2或以上版本）
- 支持Redis集群 redis-trib.rb
- 支持Redis哨兵和主从
- 支持流类型命令（需要redis-server 5.0及以上版本）



## 安装

首先需要安装 CSRedisCore 包，可以通过 NuGet 包管理器安装，或者通过命令行安装，如下所示：

```shell
Install-Package CSRedisCore
```



## 基本使用

>标准连接字符串：127.0.0.1:6379,password=123,defaultDatabase=13,poolsize=50,ssl=false,writeBuffer=10240,prefix=key前辍

```c#
string connectionString = "127.0.0.1:6379,defaultDatabase=0,poolsize=50,ssl=false,writeBuffer=10240";

// 初始化 redis 服务
RedisHelper.Initialization(new CSRedis.CSRedisClient(null, connectionString));
```



## 数据类型

### String

字符串类型的 value 可以存储多种格式的数据，如 字符串、整数、浮点数、json、jpg、甚至是视频文件。

```C#
public record Person(string Name, int Age, DateTime DateTime);

Person? person = new("sunny", 200, DateTime.Now);
```

```C#
// 存储元素
bool isSuccess = await RedisHelper.SetAsync("person", person);

// 获取元素
Person? data = await RedisHelper.GetAsync<Person>("person");

// 删除元素
long res = await RedisHelper.DelAsync("person");
```



### List

List 列表可以有序的存储多个字符串（允许重复），列表是通过链表实现的，用它添加新元素速度较快。

:::tip 注意

`RPushAsync` 是右侧推入，`RPopAsync` 则取最后一个元素，而 `LPushAsync` 是左侧推入，`LPopAsync` 则取第一个元素。

:::

```C#
for (int i = 0; i < 100; i++)
{
    Person? person = new($"sunny-{i}", i, DateTime.Now);

    //从右侧推入元素（升序）
    long count1 = await RedisHelper.RPushAsync("List_Person1", person);
    //从左侧推入元素（倒序）
    long count2 = await RedisHelper.LPushAsync("List_Person2", person);
}

//从右侧弹出一个元素（最后一个元素）
Person? data1 = await RedisHelper.RPopAsync<Person>("List_Person1");
//从左侧弹出一个元素（第一个元素）
Person? data2 = await RedisHelper.LPopAsync<Person>("List_Person1");

//获取列表所有元素
string[]? allDatas = await RedisHelper.LRangeAsync("List_Person1", 0, -1);
foreach (string item in allDatas)
{
    Person? person = JsonConvert.DeserializeObject<Person>(item);
}
```



### Set

Set 集合以**无序**的方式存储的元素，在集合中的每个元素的 value 都不可重复。

```C#
// 插入元素(Set会去重)
string[] collection = ["A", "A", "B", "B", "C", "C"];
long count = await RedisHelper.SAddAsync("Person_Set", collection);

// 获取元素
string[]? res = await RedisHelper.SMembersAsync("Person_Set");

// 判断元素是否存在
bool isExist = await RedisHelper.SIsMemberAsync("Person_Set", "A");

// 删除元素
long count = await RedisHelper.SRemAsync("Person_Set", "C");
```



### Hash

Hash 可以使用散列将多个键值对存储在一个 redis 的键上，从而达到一系列相关数据存放在一起的目的。

存储 Hash 值的方式有两种：

1. `HSet()`：设置 Hash 中**单**个字段的值，存在更新，不存在新增；
2. `HMSet()`：设置 Hash 中**多**个字段的值，存在更新，不存在新增；

#### HSet

```C#
// 存储元素
Dictionary<string, object> dic = new()
{
    { "Name", "sunny" },
    { "Age", 20 },
    { "Datetime", DateTime.Now },
    { "IsMan", true }
};
foreach (var item in dic)
{
    await RedisHelper.HSetAsync("Hash", item.Key, item.Value);
}

// 方式1: 获取所有元素
Dictionary<string, object> result = await RedisHelper.HGetAllAsync("Hash");

// 方式2: 获取元素，可以指定键获取某几个字段
string[] fields = ["Name", "Age", "Datetime", "IsMan"];
Dictionary<string, object> dicResult = [];
foreach (var item in fields)
{
    string? res = await RedisHelper.HGetAsync("Hash", item);
    dicResult.Add(item, res);
}

// 方式3: 先获取所有键，遍历键获取值
string[]? keys = await RedisHelper.HKeysAsync("Hash");
foreach (var item in keys)
{
    string? res = await RedisHelper.HGetAsync("Hash", item);
    dicResult.Add(item, res);
}
```

#### HMSet

```C#
// 存储元素
Dictionary<string, object> dic = new()
{
    { "Name", "sunny" },
    { "Age", 20 },
    { "Datetime", DateTime.Now },
    { "IsMan", true }
};
foreach (var item in dic)
{
    await RedisHelper.HMSetAsync("HMSet", [item.Key, item.Value]);
}

// 方式1: 获取所有元素
var res1 = await RedisHelper.HGetAllAsync("HMSet");
// 方式2: 使用管道获取元素
string[]? keys = await RedisHelper.HKeysAsync("HMSet");
var values = RedisHelper.StartPipe(p =>
{
    p.HMGet("HMSet", keys);
});
// 方式3: 根据字段获取元素
string[]? values2 = await RedisHelper.HMGetAsync("HMSet", keys);

// 使用自定义方法，将 Hash 转为 DTO
User user = values2.Convert<User>(keys);
```

使用上述方法获取到的 Hash 值一般为 string[] 类型，可以使用下面的方法将其转换为 DTO ：

```C#
private static readonly Dictionary<string, bool> fieldsInfo = new()
{
    { "Name", true },	  // true: 值为字符串（时间类型也是字符串）
    { "Age", false },	  // false: 值不为字符串
    { "Datetime", true },
    { "IsMan", false },
};

public static T? Convert<T>(this object val, string[] fields) where T : class
{
    var valData = val as object[];
    if (valData == null || valData.Length == 0) return null;

    List<string> builder = [];
    for (int i = 0; i < fields.Length; i++)
    {
        var item = fields[i];
        if (fieldsInfo[item])
            builder.Add($"\"{item}\":\"{valData[i]}\"");
        else
            builder.Add($"\"{item}\":{valData[i]}");
    }

    if (builder?.Count > 0)
    {
        var json = "{" + string.Join(",", builder) + "}";
        return JsonConvert.DeserializeObject<T>(json);
    }

    return null;
}
```



### 有序集合

有序集合可以看作是可排序的散列，有序集合的 value 可以按照 score 进行排序。

```C#
// 添加元素
RedisHelper.ZAdd("sort", (20, "Math"));
RedisHelper.ZAdd("sort", (10, "English"));
RedisHelper.ZAdd("sort", (30, "Chinese"));

// 获取元素所在索引
var res = RedisHelper.ZCard("sort");

// 获取集合中指定分数范围的元素
var res1 = RedisHelper.ZRangeByScore("sort", 10, 20);

// 获取集合所有元素，并升序排序
var res2 = RedisHelper.ZRangeWithScores("sort", 0, -1);

// 删除元素
RedisHelper.ZRem("sort", "Math");
```



## 高级操作

### 管道操作

管道（Pipeline）操作是一种将多个 Redis 命令打包发送到服务器并一次性执行的机制，以提高性能。通过使用管道，可以减少网络延迟，因为多个命令可以一次性发送到服务器，而不是逐个发送。

```C#
// 存储元素
RedisHelper.StartPipe(p =>
{
    p.HSet("person", "name", "王一博");
    p.HSet("person", "age", 18);

    // 批量提交命令，返回结果包含了上述设置是否成功，重复插入返回 false
    var isSuccess = p.EndPipe();
});

// 获取元素
var result = RedisHelper.StartPipe(p =>
{
    p.HGet("person", "name");
    p.HGet("person", "age");
});

Console.WriteLine(result);
```



### 发布/订阅

使用 `RedisHelper.Publish()` 方法可以向 Redis 的消息通道 **发布消息**，方法原型如下：

```C#
long Publish(string channel, string message);
```

```C#
string msg1 = "落霞与孤鹜齐飞，秋水共长天一色。";
await RedisHelper.PublishAsync("Channel_msg1", msg1);

string msg2 = "锦瑟无端五十弦，一线一柱思华年。";
await RedisHelper.PublishAsync("Channel_msg2", msg2);
```

使用 `RedisHelper.Subscribe()` 方法可以**订阅** Redis 的 **消息通道**，方法原型如下：

```C#
void Subscribe(string channel, Action<string, string> onMessage);
```

```C#
var sub = RedisHelper.Subscribe(
    ("Channel_msg1", msg =>
	{
    	Console.WriteLine($"{msg.MessageId} -- {msg.Body}");
	}), 
    ("Channel_msg2", msg =>
	{
    	Console.WriteLine($"{msg.MessageId} -- {msg.Body}");
    })
);

// 取消订阅
sub.Unsubscribe();

// 销毁订阅
sub.Dispose();
```
