# RabbitMQ

## 概述

概念：MQ（Message Queue）**消息队列**，是在消息的传输过程中保存消息的容器，多用于分布式系统之间的**异步通信**。

消息队列：指把要传输的数据与队列进行绑定，用队列先进先出的机制来实现消息传递。消息队列由 **生产者** 和 **消费者** 两部分构成，生产者负责把消息发送到队列中，消费者负责获取消息，执行或者返回结果。



优势和劣势：

|优势|劣势|
|-|-|
|应用解耦|系统可用性减低|
|异步提速|系统复杂度提高|
|削峰填谷|数据不一致性问题|

应用场景：

- 高峰流量：抢红包、秒杀活动、抢火车票等短时间内需要处理大数据量请求的情况。使用 MQ 后，用户请求先发送到 MQ 中，MQ 再进行消息派送，减低系统资源的占用。

- 消息分发：电商网站要推送促销活动，该业务耗费时间较多，但对时效性要求不高，可以使用 MQ 做消息分发。

- 数据同步：假如我们需要将数据保存到数据库之外，还需要一段时间将数据同步到缓存，此时可以将数据库的数据作为消息发送到 MQ 中，并同步到缓存。

- 异步处理：如电商系统中，订单完成后，需要及时的通知子系统进行下一步操作，为了保证订货系统的高性能，可以直接让 MQ 通知子系统做其他非实时的业务操作。

- 离线处理：在银行系统中，如果要查询近十年的历史账单，这是非常耗时的操作。如果发送同步请求，则会花费大量时间等待响应。此时使用MQ发送异步请求，等到查询出结果后获取结果即可。



两种模式：

- 消息队列-**点对点模式**：就是一个生产者对应一个消费者，相当于微信个人聊天；

- 消息队列-**发布订阅模式**：就是一个生产者可以对应多个消费者，相当于微信群聊。



常见的MQ产品对比：

||RabbitMQ|ActiveMQ|RocketMQ|Kafka|
|-|-|-|-|-|
|公司/社区|Rabbit|Apache|阿里自研|Apache|
|开发语言|Erlang|java|自定义|自定义|
|单机吞吐量|万级|❌ **万级（最差）**|十万级|十万级|
|消息延迟|✅ **微秒级**|毫秒级|毫秒级|毫秒级|
|功能特性|并发能力强，性能好、延迟低、社区活跃|老牌产品、成熟度高、社区生态好|MQ功能比较完备、扩展性差|只支持主要的MQ功能，为大数据而准备|



## 架构

核心概念：

- Virtual-host：虚拟主机，起到隔离数据的作用

- publisher：消息发送者

- consumer：消息消费者

- queue：消息队列，存储数据

- exchange：交换机，负责路由消息

![image.png](./images/image.png)



## 交换机

真实的生产环境都会经过 exchange 来发送消息，而不是直接发送到队列，交换机的类型有以下三种：

- Fanout：广播

- Direct：定向

- Topic：话题



### Fanout 广播

概念：Fanout 交换机会将接收到的消息 广播到每一个跟其绑定的 queue，所以也叫广播模式。

![image.png](./images/image%201.png)



### Direct 定向

概念：Direct 交换机会将接收到的消息根据 规则 路由到指定的queue，因此也成为 定向路由。

执行过程：

- 每个 queue 都与 exchange 设置一个 BindingKey；

- 发布者发送消息时，指定消息的 RoutingKey；

- exchange 将消息路由到 BindingKey 与消息 RoutingKey 相同的队列中。

![image.png](./images/image%202.png)



### Topic 话题

概念：Topic 交换机可以实现 Direct 交换机的功能，且更灵活，区别在于 RoutingKey 可以是多个单词的列表，并且以 `.` 分割。

queue 与 exchange 指定 BindingKey 时可以使用通配符：

- #：代指 0 个或多个单词（china、china.new、china.new.football、#.#）

- *：代指 1 个单词（china.new）

![image.png](./images/image%203.png)




## 生产者可靠性

### 生产者确认

Rabbit MQ 提供了 Publisher Confirm 和 Publisher Return 两种机制。开启确认机制后，在 MQ 成功受到消息后会返回确认消息给生产者。

返回的结果有以下几种情况：

- 消息投递到了 MQ，但是路由失败，此时会通过 Publisher Return返回路由异常原因，然后返回 **ACK**，告知投递成功。（这种情况可以人为避免）

- 临时消息投递到了 MQ，并且入队成功，返回 **ACK**，告知投递成功。

- 持久消息投递到了 MQ，并且入队完成持久化，返回 **ACK**，告知投递成功。

- 其他情况都会返回 **NACK**，告知投递失败。

![image.png](./images/image%204.png)



## MQ 可靠性

### 数据持久化

在默认情况下，RabbitMQ 会将接收到的消息保存在内存中，以降低消息收发的延迟。

这样会导致两个问题：

- 一旦 MQ 宕机，内存中的数据会丢失

- 内存空间有限，当消费者故障或处理过慢时，会导致消息积压，引发 MQ 阻塞

RabbitMQ 实现数据持久化包括 3 个方面：交换机持久化、队列持久化、消息持久化。



### Lazy Queue

从 RabbitMQ 的 3.6.0 版本开始，增加了 Lazy Queue 的概念，也就是 **惰性队列**。

惰性队列的特征如下：

- 接收到消息后直接存入磁盘，而非内存（内存中只保留最近的消息，默认2048条）

- 消费者要消费消息时才会从磁盘中读取，并加载到内存

- 支持百万条的消息存储



## 消费者可靠性

### 消费者确认机制

为了确认消费者是否成功处理了消息，RabbitMQ 提供了消费者确认机制。

当消费者处理消息结束后，应该向 RabbitMQ 发送一个回执，告知 RabbitMQ 自己消息处理状态。

回执有三种可选值：

- **ACK**：成功处理消息，RabbitMQ 从队列中删除该消息

- **NACK**：消息处理失败，RabbitMQ 需要再次投递消息

- **reject**：消息处理失败并拒绝该消息，RabbitMQ从队列中删除该消息



## 延迟消息

概念：生产者发送消息时指定一个时间，消费者不会立刻收到消息，而是在指定时间之后才收到消息。

场景：抢购火车票、抢购商品 都会有一个提示“请在 xx 分钟之内支付，不支付则自动取消订单”。



## 死信交换机

当一个队列中的消息满足下列情况之一时，就会成为 **死信**（dead letter）：

- 消费者使用 basic.reject 或 basic.nack 声明消费失败，并且消息的 requeue 参数设置为 false；

- 消息是一个过期消息（达到了队列或消息本身设置的过期时间），超时无人消费；

- 要投递的队列消息堆积满了，最早的消息可能成为死信。

如果队列通过 dead-letter-exchange 属性（可能时java的属性，注意使用！）指定了交换机，那么该队列中的死信就会投递到这个交换机中，这个交换机就成为 **死信交换机**（Dead Letter Exchange）。

![image.png](./images/image%205.png)





## 简单 RabbitMQ 的实现

1. 新建两个控制台项目，分别命名为 RabbitMQ.Producer（生产者） 和 RabbitMQ.consumer（消费者）；

2. 两个项目都安装两个包：`Newtonsoft.Json`、`RabbitMQ.Client`；

3. 在 RabbitMQ.Producer（生产者）项目中，写入生产者提供消息的相关代码：

```C#
// 创建 RabbitMQ 的连接工厂
ConnectionFactory factory = new ConnectionFactory
{
    HostName = "localhost"
};

var connection = factory.CreateConnection();

// 创建 channel 信道
using (var channel = connection.CreateModel())
{
    // 声明队列
    channel.QueueDeclare("product", exclusive: false);

    var json = JsonConvert.SerializeObject("Hello, single dog.");
    var body = Encoding.UTF8.GetBytes(json);

    for (int i = 0; i < 50; i++)
    {
        // 发布消息到队列中
        channel.BasicPublish(exchange: "", routingKey: "product", body: body);

        Console.WriteLine($"生产者发送消息：{json}");
        Console.WriteLine($"==========================第{i}次========================");

        Thread.Sleep(2000);
    }
}
```

4. 在 RabbitMQ.consumer（消费者）项目中，写入消费者接收消息的相关代码：

```C#
// 创建 RabbitMQ 的连接工厂
ConnectionFactory factory = new ConnectionFactory
{
    HostName = "localhost"
};

var connection = factory.CreateConnection();

// 创建 channel 信道
using (var channel = connection.CreateModel())
{
    // 声明队列
    channel.QueueDeclare("product", exclusive: false);

    EventingBasicConsumer consumer = new EventingBasicConsumer(channel);

    // 订阅 Received 事件
    consumer.Received += (model, EventArgs) =>
    {
        byte[] body = EventArgs.Body.ToArray();
        string message = Encoding.UTF8.GetString(body);

        Console.WriteLine($"接收到生产者提供的消息为：{message}");
    };

    // 消费者自动确认接收消息
    channel.BasicConsume(queue: "product", autoAck: true, consumer: consumer);

    Console.ReadKey();
}
```

5. 登录 RabbitMQ 的客户端：`http://localhost:15672/`，在队列当中就能看到当前项目创建的队列 "product" ，切 生产者 在不断发送消息，消费者在不断接收消息。

