# Servlet生命周期

`Servlet` 对象是 Servlet 容器帮我们创建的，因此生命周期的方法都是由容器（Tomcat）来管理和调用的。



## 生命周期

`Servlet` 对象的生命周期：

| 生命周期 | 对应方法  |        执行时机        | 执行次数 |
| :------: | :-------: | :--------------------: | :------: |
| 构造对象 |  构造器   | 第一次请求或容器启动后 |   1 次    |
|  初始化  |  init()   | 第一次请求或容器启动后 |   1 次    |
| 处理服务 | service() |        每次请求        |   多次   |
|   销毁   | destory() |       容器关闭时       |   1 次    |

```java
@WebServlet("/servletLifeCycle")
public class ServletLifeCycle extends HttpServlet {
  public ServletLifeCycle() {
    // 执行一次
    System.out.println("constructor");
  }

  @Override
  public void init() throws ServletException {
    // 执行一次
    System.out.println("init");
  }

  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 执行多次
    System.out.println("service");
  }

  @Override
  public void destroy() {
    // 执行一次
    System.out.println("destroy");
  }
}
```

::: warning 注意

由上面的案例中，可以看出 Servlet 在 Tomcat 中是单例的！

因此，在 Servlet 实现类中定义的成员变量是全局的，在多个线程之间共享同一份数据，所以强烈不建议在其内部定义可以被修改的成员变量，因为在并发请求时，会引发线程安全问题！

```java
@WebServlet("/servletLifeCycle")
public class ServletLifeCycle extends HttpServlet {
  private int count = 0;

  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// ❌ 强烈不建议
    count++;
    System.out.println("service");
  }
}
```

:::



## 立即初始化

上面的案例中，可以看到 构造器和 `init()` 方法是在第一次请求的时候被触发的。那么能不能在容器启动的时候就触发呢？

可以，此时需要设置注解的 `loadOnStartup` 属性。

| loadOnStartup 值 | 作用                                                  |
| :-------------: | ----------------------------------------------------- |
|       -1        | 默认值，Tomcat 启动时不会初始化该 Servlet               |
|       >= 1       | Tomcat 启动时，实例化该 Servlet 的顺序，值越小越优先执行 |

```java {2}
// Tomcat内部已经预定义用到5了，所以我们从6开始，以免重复
@WebServlet(value = "/servletLifeCycle", loadOnStartup = 6)
public class ServletLifeCycle extends HttpServlet {
  // ...

  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    System.out.println("service");
  }
}
```



## DefaultServlet

`DefaultServlet` 是 Tomcat 内置的一个 Servlet，专门用于处理 当客户端请求静态资源的路径和任何 Servlet 都不匹配时，就需要用它来获取静态资源。

它默认随服务启动，并且启动的 `loadOnStartup` 为 1。 

在 Tomcat 的 `conf/web.xml` 中，有一段下面的配置：

```xml
<servlet>
  <servlet-name>default</servlet-name>
  <servlet-class>org.apache.catalina.servlets.DefaultServlet</servlet-class>
  <init-param>
    <param-name>debug</param-name>
    <param-value>0</param-value>
  </init-param>
  <init-param>
    <param-name>listings</param-name>
    <param-value>false</param-value>
  </init-param>
  <load-on-startup>1</load-on-startup>
</servlet>

<servlet-mapping>
  <servlet-name>default</servlet-name>
  <url-pattern>/</url-pattern>
</servlet-mapping>
```

::: info 提示

后续在学习 SpringMVC 的时候，SpringMVC 也会提供一个 DefaultServlet，它会把 Tomcat 的 DefaultServlet 覆盖掉，这时请求静态资源时会报 404，造成的原因就在这里，这时候需要我们手动配置修改这个问题。

:::
