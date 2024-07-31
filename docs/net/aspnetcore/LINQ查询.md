# LINQ查询

![LINQ查询](./assets/LINQ查询.png)



## Join

`Join()` 方法是基于匹配键将两个序列的元素进行关联，类似于 SQL 中 Join。

```C# {17-20}
static void JoinEx()
{
    var customers = new List<Customer>
    {
        new(1, "Amy"),
        new(2, "Tom"),
        new(3, "Bob")
    };
    var orders = new List<Order>
    {
        new (101, 1, "大米"),
        new (102, 2, "黄豆"),
        new (103, 2, "苹果"),
        new (104, 3, "香蕉"),
    };

    var query = customers.Join(orders,
        customer => customer.CustomerId,
        order => order.CustomerId,
        (customer, order) => new { customer.Name, order.OrderId, order.Product });

    foreach (var item in query)
    {
        Console.WriteLine($"用户：{item.Name}，产品Id：{item.OrderId}，产品名称：{item.Product}");
    }
}

public record Customer(long CustomerId, string Name);

public record Order(long OrderId, long CustomerId, string Product);
```



## GroupJoin

`GroupJoin()` 方法将两个序列根据指定的键进行分组连接。

```C# {17-20}
static void JoinEx()
{
    var customers = new List<Customer>
    {
        new(1, "Amy"),
        new(2, "Tom"),
        new(3, "Bob")
    };
    var orders = new List<Order>
    {
        new (101, 1, "大米"),
        new (102, 2, "黄豆"),
        new (103, 2, "苹果"),
        new (104, 3, "香蕉"),
    };

    var query = customers.GroupJoin(orders,
        customer => customer.CustomerId,
        order => order.CustomerId,
        (customer, order) => new { customer.Name, Orders = order });

    foreach (var item in query)
    {
        Console.WriteLine($"用户：{item.Name}");
        foreach (var order in item.Orders)
        {
            Console.WriteLine($"订单Id：{order.OrderId}，产品名称：{order.Product}");
        }
    }
}

public record Customer(long CustomerId, string Name);

public record Order(long OrderId, long CustomerId, string Product);
```



## ZIP

将两个序列按元素位置配对，并生成一个新的序列。

```C# {6-10}
static void JoinEx()
{
    List<string> names = ["Alice", "Bob", "Sunny"];
    List<int> scores = [90, 95, 100];

    var result = names.Zip(scores, (name, score) => new
    {
        Name = name,
        Score = score
    });

    foreach (var item in result)
    {
        Console.WriteLine($"姓名：{item.Name}，分数：{item.Score}");
    }
}
```























