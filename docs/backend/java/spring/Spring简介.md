# Spring简介

## 什么是Spring?

Spring 是一个非常流行且功能强大的开源框架，主要用于简化企业级应用程序的开发。它的核心目标是实现松耦合、可测试性强、易于管理的 Java 应用程序。

Spring 提供了很多模块，涵盖了 Java 应用开发中的各个方面，比如：

|       模块       | 功能                                                   |
| :--------------: | ------------------------------------------------------ |
| Spring Framework | 提供最基础的功能，如 IOC（控制反转） 和 DI（依赖注入） |
|    Spring AOP    | 面向切片编程，比如日志、权限管理                       |
| Spring JDBC/ORM  | 简化数据库操作                                         |
|    Spring MVC    | 开发 Web 应用，处理请求和响应                          |
|   Spring Boot    | 更高层的封装，让 Spring 项目开发更快、更简单           |
| Spring Security  | 做权限控制、认证、授权                                 |
|   Spring Cloud   | 用于微服务架构，比如服务注册、调用、配置管理           |

> 狭义上来说，Spring 就是指 Spring Framework。



## 入门案例

新建一个 Maven 的父工程，并删除 `src` 目录（父工程不写逻辑），在里面新建一个子工程，实现父工程聚合子工程的项目结构。

::: info 提示

IDEA 里面创建完成项目后，记得查看设置中的 Maven 配置，是不是本地安装的 Maven 路径。

:::

::: code-group

```xml [bean.xml] {8}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  <!-- 通过xml配置，完成 User 对象的创建，其中： -->
  <!-- id：表示类的一个标识，通常使用类的首字母小写代替 -->
  <!-- class：表示类的全路径 -->
  <bean id="user" class="com.geomind.dtos.User"></bean>
</beans>
```

```java [UserTest] {5，7}
public class UserTest {
  @Test
  public void testUser() {
    // 获取 bean.xml 中的配置
    ApplicationContext context = new ClassPathXmlApplicationContext("bean.xml");
    // 获取 User 实例，获取实例后便可调用属性、方法等
    User user = (User) context.getBean("user");
    System.out.println("user = " + user); // com.geomind.dtos.User@1972e513
  }
} 
```

:::



::: details 上面通过 bean.xml 注入 User 类，其实底层使用了 **反射** 进行初始化

上面的代码等价于下面的代码：

```java
@Test
public void testUser2() throws Exception {
  // 反射获取到 User 类的字节码
  Class clazz = Class.forName("com.geomind.dtos.User");
  // 根据字节码创建 User 类
  User user = (User) clazz.getDeclaredConstructor().newInstance();
  System.out.println("user = " + user);
}
```

:::
