# AOP

AOP 是一种编程思想，它关注的是“**横切关注点**”——也就是会影响多个模块的功能，比如：

- 日志记录
- 性能监控
- 安全控制
- 事务管理

这些功能通常和主业务逻辑无关，但又要散布在多个地方，使用 AOP 可以将其从核心业务逻辑中抽离出来，实现**模块解耦**。



## 场景案例

>有一个计算器的类，在其实现类中实现方法时，想要输出日志信息。

::: code-group

```java [CalculatorImpl]
public class CalculatorImpl implements Calculator {
  @Override
  public int add(int a, int b) {
    System.out.println("[日志] add方法，核心逻辑前被调用了");
    // 核心逻辑
    int res = a + b;
    System.out.println("[日志] add方法，核心逻辑后被调用了");
    return res;
  }

  @Override
  public int sub(int a, int b) {
    System.out.println("[日志] sub方法，核心逻辑前被调用了");
    // 核心逻辑
    int res = a - b;
    System.out.println("[日志] sub方法，核心逻辑后被调用了");
    return res;
  }
}
```

```java [Calculator]
public interface Calculator {
  int add(int a, int b);

  int sub(int a, int b);
}
```

:::

存在的问题：

1. 大量的日志输出，对核心业务功能存在影响，不便于阅读；
2. 附加功能分散在各个业务功能中，不利于统一维护；



## 代理模式

代理模式是一种设计模式，通过一个“代理对象”来控制对另一个对象的访问。

在 AOP 中，代理对象会：

- 拦截原始对象的调用
- 在调用前/后执行切面逻辑（如日志、事务）
- 最终调用原始方法



### 手动动态代理

动态代理（接口代理）适用于**目标类实现了接口**，它通过 `java.lang.reflect.Proxy` 包中的 [`Proxy.newProxyInstance()`](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/lang/reflect/Proxy.html#newProxyInstance(java.lang.ClassLoader,java.lang.Class%5B%5D,java.lang.reflect.InvocationHandler)) 动态生成代理类。

```java
static Object newProxyInstance(
  ClassLoader loader, 
  Class<?>[] interfaces, 
  InvocationHandler h
);
```

|    参数    | 描述                               |
| :--------: | :--------------------------------- |
|   loader   | 代理类的类加载器                   |
| interfaces | 代理类要实现的接口列表             |
|     h      | 将方法调用分发到真实方法的处理程序 |

::: code-group

```java [ProxyFactory] {10,12,14,20,26}
public class ProxyFactory {
  private Object target;

  public ProxyFactory(Object target) {
    this.target = target;
  }

  public Object getProxy() {
    // 获取代理类的类加载器
    ClassLoader classLoader = this.target.getClass().getClassLoader();
    // 获取代理类实现的接口列表
    Class<?>[] interfaces = this.target.getClass().getInterfaces();
    // 创建 InvocationHandler 方法分发处理器
    InvocationHandler invocationHandler = new InvocationHandler() {
      @Override
      public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 这里统一写入日志类，不影响核心业务逻辑
        System.out.println("[日志] 代理对象调用 " + method.getName() + " 方法前的日志");
        // 调用真实对象的方法
        Object result = method.invoke(target, args);
        System.out.println("[日志] 代理对象调用 " + method.getName() + " 方法后的日志");
        return result;
      }
    };

    return Proxy.newProxyInstance(classLoader, interfaces, invocationHandler);
  }
}
```

```java [CalculatorTest] {4,5}
@Test
public void testCalculator() {
  // 获取代理后的目标对象
  ProxyFactory proxyFactory = new ProxyFactory(new CalculatorImpl());
  Calculator calculator = (Calculator) proxyFactory.getProxy();

  int add = calculator.add(1, 2);
  System.out.println("add = " + add); // 3

  int sub = calculator.sub(5, 2);
  System.out.println("sub = " + sub); // 3
}
```

:::



### cglib动态代理

cglib动态代理 适用于目标类没有实现接口的情况。

::: code-group

```java
public class CglibProxy implements MethodInterceptor {
  public Object getProxy(Class<?> clazz) {
    Enhancer enhancer = new Enhancer();
    enhancer.setSuperclass(clazz);
    enhancer.setCallback(this);
    return enhancer.create();
  }

  @Override
  public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
    System.out.println("Before method" + method.getName());
    // 调用方法
    Object res = proxy.invokeSuper(obj, args);
    System.out.println("After method" + method.getName());
    return res;
  }
}
```

```java
@Test
public void testCglib() {
  CglibProxy proxy = new CglibProxy();
  UserService userService = (UserService) proxy.getProxy(UserService.class);
  userService.run();
}
```

```java
public class UserService {
  public void run() {
    System.out.println("UserService");
  }
}
```

:::



## 基于注解实现AOP

### JDK动态代理

JDK动态代理 适用于被目标类实现了接口的情况。

在使用 JDK动态代理 动态代理之前，先了解 AOP 中的几种通知类型：

| 通知类型        |   名称   | 描述                                                 |
| --------------- | :------: | ---------------------------------------------------- |
| @Before         | 前置通知 | 在目标方法调用之前执行                               |
| @AfterReturning | 返回通知 | 目标方法成功执行完毕后执行                           |
| @AfterThrowing  | 异常通知 | 目标方法抛出异常时执行                               |
| @After          | 后置通知 | 无论方法是否抛出异常，最终都会执行                   |
| @Around         | 环绕通知 | 包裹整个方法的调用过程（相当于前面四个通知的结合体） |

::: code-group

```java [LogAspect] {6,15,24,33,42}
@Aspect // 标识为切面类
@Component // IoC容器自动注入
public class LogAspect {
  // 前置通知：被代理方法执行之前触发
  // @Before(value = "execution(public int com.geomind.anno.CalculatorImpl.add(..))")
  @Before(value = "execution(* com.geomind.anno.CalculatorImpl.*(..))")
  public void before(JoinPoint joinPoint) {
    String name = joinPoint.getSignature().getName();
    Object[] args = joinPoint.getArgs();
    System.out.println("LogAspect前置通知 -> 方法名称：" + name
                       + "，参数列表：" + Arrays.toString(args));
  }

  // 返回通知：被代理方法执行后返回结果时触发
  @AfterReturning(value = "execution(* com.geomind.anno.CalculatorImpl.*(..))", returning = "result")
  public void afterReturning(JoinPoint joinPoint, Object result) {
    String name = joinPoint.getSignature().getName();
    Object[] args = joinPoint.getArgs();
    System.out.println("LogAspect返回通知 -> 方法名称：" + name +
                       "，参数列表：" + Arrays.toString(args) + "，返回结果：" + result);
  }

  // 异常通知：被代理方法执行出现异常时触发
  @AfterThrowing(value = "execution(* com.geomind.anno.CalculatorImpl.*(..))", throwing = "ex")
  public void throwException(JoinPoint joinPoint, Throwable ex) {
    String name = joinPoint.getSignature().getName();
    Object[] args = joinPoint.getArgs();
    System.out.println("LogAspect异常通知 -> 方法名称：" + name
                       + "，参数列表：" + Arrays.toString(args) + "，出现异常：" + ex.getMessage());
  }

  // 后置通知：被代理方法执行之后触发
  @After(value = "execution(* com.geomind.anno.CalculatorImpl.*(..))")
  public void after(JoinPoint joinPoint) {
    String name = joinPoint.getSignature().getName();
    Object[] args = joinPoint.getArgs();
    System.out.println("LogAspect后置通知 -> 方法名称：" + name
                       + "，参数列表：" + Arrays.toString(args));
  }

  // 环绕通知：该方法可以直接代替前面四个方法
  @Around(value = "execution(* com.geomind.anno.CalculatorImpl.*(..))")
  public Object around(ProceedingJoinPoint pjp) {
    String name = pjp.getSignature().getName();
    Object[] args = pjp.getArgs();
    Object proceed = null;
    try {
      System.out.println("LogAspect环绕通知，方法执行前 -> 方法名称：" + name
                         + "，参数列表：" + Arrays.toString(args));
      // 获取执行方法的返回值
      proceed = pjp.proceed();
      System.out.println("LogAspect环绕通知，方法执行返回后 -> 方法名称：" + name
                         + "，参数列表：" + Arrays.toString(args) + "，返回结果：" + proceed);
    } catch (Throwable e) {
      System.out.println("LogAspect环绕通知，方法执行异常时 -> 方法名称：" + name
                         + "，参数列表：" + Arrays.toString(args));
    } finally {
      System.out.println("LogAspect环绕通知，方法执行后 -> 方法名称：" + name
                         + "，参数列表：" + Arrays.toString(args));
    }
    return proceed;
  }
}
```

```java [SpringConfig]
// 全注解开发
@Configuration
@ComponentScan("com.geomind.anno")
@EnableAspectJAutoProxy // 开启AspectJ自动代理
public class SpringConfig {
}
```

```java [CalculatorTest]
@Test
public void testCalculator() {
  ApplicationContext context 
    = new AnnotationConfigApplicationContext(SpringConfig.class);
  Calculator calculator = context.getBean(Calculator.class);
  calculator.add(1, 3);
}
```

```java [CalculatorImpl]
public interface Calculator {
  int add(int a, int b);

  int sub(int a, int b);
}

@Component
public class CalculatorImpl implements Calculator {
  @Override
  public int add(int a, int b) {
    System.out.println("add方法核心逻辑被执行了");
    // int res = 1 / 0; // 模拟异常的情况
    return a + b;
  }

  @Override
  public int sub(int a, int b) {
    return a - b;
  }
}
```

:::

::: success 切入点表达式

切入点表达式定义了 AOP 要拦截的方法集合，即“在哪里执行通知”。

语法：

```java
execution([修饰符] 返回类型 包名.类名.方法名(参数))
```

示例：

```java
/**
 * public：共有的
 * int：返回值是int的
 * com.geomind.anno.CalculatorImpl.add：这个包下的
 * (..)：参数任意类型的 add 方法
 */
execution(public int com.geomind.anno.CalculatorImpl.add(..))

/**
 * *：任意修饰符、任意返回类型的
 * com.geomind.anno.CalculatorImpl.*：这个包下所有的
 * (..)：参数任意类型的方法
 */
execution(* com.geomind.anno.CalculatorImpl.*(..))
```

:::
