# IoC相关概念

## IoC

IoC（Inversion of Control）意为“控制反转”，指的是 **把对象的创建和依赖的管理交给 Spring 来完成**，而不是在代码中手动 new 对象。

```java
// 传统做法
UserService userService = new UserService();

// 使用IoC做法
@Autowired
UserService userService; // Spring自动进行注入
```



## IoC容器

Spring 中实现控制反转的工具就是 IoC 容器。通俗来说，它就是一个“对象工厂”，负责 **创建**、**管理** 和 **组装** 各种对象。

::: success IoC容器的功能

- 创建 Bean对象
- 管理 java 对象的生命周期
- 处理对象与对象之间的依赖关系

:::

> 由 IOC 容器管理的 Java 对象一般称为 **Spring Bean**（只是为了和 class 的叫法以示区分，没什么高级的），它与使用关键字 new 创建的对象没有任何区别。



## DI

DI（Dependency Injection）意为“依赖注入”，它是控制反转的一种具体实现方式。

> 它的核心就是：你需要的对象（依赖），我 Spring 来帮你注入！

::: success 常见的注入方式

* 构造器注入

* Setter 方法注入

* 字段注入

:::



## 总结

|      名称       | 概念                                  | 角色     |
| :-------------: | ------------------------------------- | -------- |
| IoC（控制反转） | 一种思想，把对象创建和管理交给框架    | 核心理念 |
|     Ioc容器     | Spring 实现 IoC 的工具，用来管理 Bean | 实现手段 |
| DI（依赖注入）  | 一种实现 IoC 的具体方式               | 技术细节 |