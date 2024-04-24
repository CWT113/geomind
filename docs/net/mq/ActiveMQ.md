# ActiveMQ

Apache ActiveMQ 是一个强大的开源消息代理，可促进分布式应用程序之间的异步通信。它实现 Java 消息服务 (JMS) API 并提供对各种消息传递模式的支持，包括 发布/订阅 和 点对点 通信。

ActiveMQ 作为面向消息的中间件 (MOM)，允许分布式系统中的组件通过消息进行异步通信，从而实现组件的解耦。 Apache ActiveMQ 的一些主要特性和功能包括：

- 消息传递协议：ActiveMQ 支持多种消息传递协议，包括 OpenWire、MQTT 和 STOMP，允许客户端使用各种技术和编程语言进行连接；
- 持久化：消息可以持久化在不同的存储选项中，如 JDBC、文件系统或关系数据库，确保数据的持久性；
- 集群：ActiveMQ可以配置在集群中，以增强可扩展性和容错能力；
- 消息组：它支持消息组的概念，用于在消费者组内进行有序消息处理；
- 消息过滤：ActiveMQ 能够根据标头属性进行消息过滤，从而能够高效地路由和选择特定消息；
- 安全性：提供认证、授权等安全特性，保证消息的机密性和完整性；



## 安装客户端

1. ActiveMQ 要以 Java JDK 作为环境运行，所以在安装 ActiveMQ 之前，先需要[安装 Java JDK](https://blog.csdn.net/weixin_47406082/article/details/133418026)，这里使用的是 Java JDK 8 版本；

   ::: danger 注意

   Java JDK 8 对应 ActiveMQ 5.16.X 版本，Java JDK 11 对应 ActiveMQ 5.17.X + 版本！

   :::

2. 在 [ActiveMQ 官网](https://activemq.apache.org/components/classic/download/classic-05-16-02)下载 ActiveMQ 5.16.2 版本；

3. 打开压缩包，启动 bin\win64\activemq.bat 文件；

   ::: tip 提示

   如果启动时报错，到 "任务管理器 -> 详细信息" 中，把 erl.exe 程序结束运行，再启动 activemq.bat 文件！

   :::

4. 在浏览器中输入 http://127.0.0.1:8161/ ，打开 ActiveMQ 客户端，默认用户名：admin，密码：admin；



## 安装

在控制台程序中，添加 ActiveMQ 的两个依赖包：

```shell
Install-Package Apache.NMS
Install-Package Apache.NMS.ActiveMQ
```

::: danger 注意

截至目前上面两个包的最新版本均为 2.1.0，请勿添加该版本包，而添加 2.0.0 版本的！

:::



## 基本使用

新建 ActiveMQ_Send 程序，用来生成消息创建者，发送消息：

```C#
using Apache.NMS;
using Apache.NMS.Util;

string queueName = "my_queue";

// ActiveMQ 服务器的地址
Uri uri = new("activemq:tcp://localhost:61616");
// 创建连接工厂
IConnectionFactory factory = new NMSConnectionFactory(uri);
// 使用连接工厂创建连接，并指定用户名和密码
using IConnection connection = factory.CreateConnection("admin", "admin");
// 创建会话
using ISession session = connection.CreateSession();
// 获取目的地（队列）
IDestination destination = SessionUtil.GetDestination(session, queueName);
// 创建消息生产者
using IMessageProducer producer = session.CreateProducer(destination);
// 启动连接
connection.Start();

for (int i = 0; i < 10; i++)
{
    ITextMessage request = session.CreateTextMessage($"ActiveMQ Message {i}");
    producer.Send(request);
    Console.WriteLine($"{DateTime.Now}：发送消息 --> ActiveMQ Message {i}");
    Thread.Sleep(1000);
}

Console.ReadLine();
```

<br />

新建 ActiveMQ_Recive 程序，用来生成消息接收者，接收消息：

```C#
using Apache.NMS;
using Apache.NMS.Util;

string queueName = "my_queue";
// 构建 ActiveMQ 服务器地址，并设置最大非活动时间为 0
Uri uri = new("activemq:tcp://localhost:61616?wireFormat.maxInactivityDuration=0");

// 创建连接工厂
IConnectionFactory factory = new NMSConnectionFactory(uri);
// 使用连接工厂创建连接，并指定用户名和密码
using IConnection connection = factory.CreateConnection("admin", "admin");
// 创建会话
using ISession sessiong = connection.CreateSession();
// 启动连接
connection.Start();
// 获取目的地（队列）
IDestination destination = SessionUtil.GetDestination(sessiong, queueName);
// 创建消息消费者
using IMessageConsumer consumer = sessiong.CreateConsumer(destination);

// 设置消息监听器，指定监听方法为 Consumer_Listener
consumer.Listener += new MessageListener(Consumer_Listener);

Console.ReadLine();

static void Consumer_Listener(IMessage message)
{
    if (message is ITextMessage msg)
    {
        Console.WriteLine($"接收消息 --> {msg.Text}");
    }
}
```