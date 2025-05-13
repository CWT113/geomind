# 基于注解注入 Bean

在 Java 中，基于注解管理 Bean 是指使用注解的方式，将类的实例（Bean）自动注入到其他类中，以实现依赖注入。



## 组件扫描

组件扫描是指 Spring 框架自动扫描指定包及其包下的子类，找出那些被特定注解标记的类，然后将他们注册为 Spring 容器中的 Bean。

```xml {4,6,7,11}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:context="http://www.springframework.org/schema/context"
  xsi:schemaLocation="
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd
    http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd">
  <!-- 开启组件扫描，base-package指定哪个包下的文件会被进行扫描 -->
  <context:component-scan base-package="com.geomind"/>
</beans>
```



## 注解类型

Spring 提供了多个注解，这些注解可以直接标注在 Java 类上，将他们定义成 Spring Bean。

后面三个注解都是 `@Component` 注解的特殊化版本，四者功能并无任何区别，只是后面三个语义化更加明确。

|     注解     | 作用                  |
| :----------: | --------------------- |
|  @Component  | 标记某个类的 Bean     |
|   @Service   | 标记业务逻辑层的 Bean |
| @Respository | 标记数据访问层的 Bean |
| @Controller  | 标记 Web 控制器       |

```java
// 使用 @Component 注解标记一个普通类
@Component(value = "user") // value值不写，默认值就是类名的首字母小写
public class User {
}
```

```java
@Test
public void testUser() {
  ApplicationContext context = new ClassPathXmlApplicationContext("bean.xml");
  User user = context.getBean(User.class);
  System.out.println(user); // com.geomind.bean.User@1b065145
}
```



## @Autowired注解

`@Autowired` 注解用于实现 Bean 的自动注入，它默认是通过 **类型注入** 的。

::: success @Autowired注解可标记的地方

* 标记在 **属性** 上

* 标记在 **setter 方法** 上

* 标记在 **构造器** 上

* 标记在 **形参** 上

* 标记在 **注解** 上

:::

::: info 提示

`@Autowired` 注解有一个 `required` 属性，默认值是 true，表示在注入的时候，要求被注入的 Bean 必须存在，否则报错。如果改为 false，则不存在也没关系，不会报错。

:::



### 标记构造器（推荐）

在三层架构中 Controller、Service、Dao 层，可以使用注解实现依赖注入。

```java {6-9}
@Controller
public class UserController {
  private UserService userService;

  // 标记构造器注入（当只有单个构造器时，注解可省略）
  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }
-9
  public void addUser() {
    userService.addUser();
  }
}
```



### 标记Setter方法

```java {6-9}
@Controller
public class UserController {
  private UserService userService;

  // 通过 Setter 方法注入
  @Autowired
  public void setUserService(UserService userService) {
    this.userService = userService;
  }

  public void addUser() {
    // 调用 Service 层
    userService.addUser();
  }
}
```



### 标记属性

> 标记属性注入时，IDEA报黄色波浪线提示：Field injection is not recommended（不建议使用字段注入），因此通过属性注入不是首选方法。

```java {4-5}
@Controller
public class UserController {
  // 通过属性注入
  @Autowired
  private UserService userService;

  public void addUser() {
    // 调用 Service 层
    userService.addUser();
  }
}
```



### 标记形参

```java {6-8}
@Controller
public class UserController {
  private UserService userService;

  // 标记形参注入
  public UserController(@Autowired UserService userService) {
    this.userService = userService;
  }

  public void addUser() {
    userService.addUser();
  }
}
```



## @Qualifier注解

::: info 提示

由于 `@Autowired` 是按照类型注入的，所以前面的注入方式都只适用于一个接口对应一个实现类的情况。

:::

当一个接口对应多个实现类时，就可以通过 `@Autowired`+`@Qualifier` 双注解的方式，它是按照 **名称注入**。

```java {3,6,7}
@Controller
public class UserController {
    @Autowired
    // 此时可以手动通过 value 值，指定要注入那个类，解决一个接口多个实现类的情况
    // @Qualifier(value = "userRedisServiceImpl")
    @Qualifier(value = "userServiceImpl")
    private UserService userService;

    public void addUser() {
        System.out.println("UserController addUser...");
        userService.addUser();
    }
}
```



## @Resource注解

`@Resource` 注解也可以完成依赖注入，它默认通过 **名称注入**，如果未指定名称则使用 **类名注入**（类名首字母小写），如果通过类名注入找不到对应 Bean，则再根据 **类型注入**。

::: success @Resource注解可以标记的地方

* 标记在 **属性** 上

* 标记在 **Setter方法** 上

:::

::: success @Autowired 和 @Resource 都能实现依赖注入，二者有什么区别？

- `@Autowired` 注解是 Spring 框架内置提供的，而 `@Resource` 注解是 JDK 扩展包中提供的；
- `@Autowired` 注解默认是根据 类型注入，而 `@Resource` 注解默认是通过 名称注入的；
- 二者能标记的范围不同，`@Autowired` 注解比 `@Resource` 注解能标记的范围更广；

:::



在 Java8 中，`@Resource` 注解可以直接使用，而在更高的版本中，需要引入第三方包使用。

```xml
<!-- pom.xml中引入 jakarta.annotation-api 包 -->
<dependency>
  <groupId>jakarta.annotation</groupId>
  <artifactId>jakarta.annotation-api</artifactId>
  <version>3.0.0</version>
</dependency>
```

```java {6,7}
import jakarta.annotation.Resource;

@Controller
public class UserController {
  // 不写 name 属性，默认是通过实现类的名称进行注入的
  @Resource(name = "userServiceImpl")
  private UserService userService;

  public void addUser() {
    System.out.println("UserController addUser...");
    userService.addUser();
  }
}
```



## 全注解开发

全注解开发，就是指不使用 xml 的配置方式，而是将组件扫描的操作也通过注解来配置。

在项目中新建 `config/SpringConfig.java` 类，专门用于配置组件扫描（其余注入操作和上面一样）。

```java
@Configuration
@ComponentScan("com.geomind") // 扫描 com.geomind 包下的所有文件
public class SpringConfig {
}
```

全注解方式在获取注入的 Bean 对象时，不再使用 `ClassPathXmlApplicationContext`，而是使用 `AnnotationConfigApplicationContext` 对象。

```java {4}
@Test
public void testUser3() {
  // 使用 AnnotationConfigApplicationContext 对象获取
  ApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);
  UserController user = context.getBean(UserController.class);
  user.addUser();
}
```