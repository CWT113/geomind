# Filter过滤器

`Filter` 过滤器，是将对目标资源的请求进行过滤的一套技术规范，所有的过滤器都要实现该接口。

常见的场景：

- 日志记录
- 性能分析
- 乱码处理
- 登录控制
- 跨域处理

<img src=".\assets\过滤器.png" alt="过滤器" style="zoom:50%;" />



## 基本使用

>写一个简单的日志过滤器。

新建 `com.geomind.filters/LoggingFilter.java` 文件，并实现 `Filter` 过滤器。

```java {12}
public class LoggingFilter implements Filter {
  private final DateTimeFormatter dateTimeFormatter
    = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    // 请求之前，记录日志
    String start = dateTimeFormatter.format(LocalDateTime.now());
    System.out.println("[" + start + "]: " + "before doFilter invoked.");

    // 过滤器放行，才能到达具体的 servlet 请求
    filterChain.doFilter(servletRequest, servletResponse);

    // 请求之后
    String end = dateTimeFormatter.format(LocalDateTime.now());
    System.out.println("[" + end + "]: " + "after doFilter invoked.");
  }
}
```

在 `web.xml` 中，配置让过滤器对哪些请求生效：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee https://jakarta.ee/xml/ns/jakartaee/web-app_6_0.xsd"
         version="6.0">
  <filter>
    <filter-name>logging-filter</filter-name>
    <filter-class>com.geomind.filters.LoggingFilter</filter-class>
  </filter>
  <filter-mapping>
    <filter-name>logging-filter</filter-name>
    <!-- url-pattern和serlvet-name二选一即可 -->
    
    <!-- url-pattern根据请求的资源路径，对指定的请求进行过滤：
				如： /* 表示对任何资源都进行过滤；
					  /servletA  表示只对servletA进行过滤
				    index.html 表示对web目录下的index.html进行过滤
		-->
    <url-pattern>/*</url-pattern>
    
    <!-- servlet-name根据请求的servlet的别名，对指定的servlet进行过滤
 				如： servletA 表示对别名是servletA的请求进行过滤
		-->
    <serlvet-name>servletAAA</serlvet-name>
  </filter-mapping>
</web-app>
```

写 `servletA` 进行测试：

```java
// name属性就是别名，搭配 web.xml 中 servlet-name 属性使用
@WebServlet(value = "/servletA", name = "servletAAA")
public class ServletA extends HttpServlet {
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    System.out.println("ServletA invoked...");
  }
}
```



## 生命周期

|    阶段    | 对应方法 |   执行实际    | 执行次数 |
| :--------: | :------: | :-----------: | :------: |
|  创建对象  |  构造器  | web应用启动时 |   1次    |
| 初始化方法 |   init   |   构造完毕    |   1次    |
|  过滤请求  | foFilter |  每次请求时   |   多次   |
|    销毁    | destory  | web应用关闭时 |   1次    |

```java
public class LifeCycleFilter implements Filter {
  public LifeCycleFilter() {
    System.out.println("LifeCycleFilter constructor");
  }

  @Override
  public void init(FilterConfig filterConfig) throws ServletException {
    System.out.println("LifeCycleFilter init");
    System.out.println("username = " + filterConfig.getInitParameter("username")); // SuperAdmin
  }

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    filterChain.doFilter(servletRequest, servletResponse);
  }

  @Override
  public void destroy() {
    System.out.println("LifeCycleFilter destroy");
  }
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee https://jakarta.ee/xml/ns/jakartaee/web-app_6_0.xsd"
         version="6.0">    
  <filter>
    <filter-name>lifeCycle-filter</filter-name>
    <filter-class>com.geomind.filters.LifeCycleFilter</filter-class>
    <!-- 初始化参数 -->
    <init-param>
      <param-name>username</param-name>
      <param-value>SuperAdmin</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>lifeCycle-filter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
</web-app>
```



## 过滤器链

过滤器链就是一个项目可以有多个过滤器，他们可以同时共存，当有多个过滤器同时生效时，就形成了过滤器链。

::: success 注意

1. 如果是 `web.xml` 中配置过滤器信息，则过滤器执行顺序由 `<filter-mapping>` 标签的配置顺序决定；
2. 如果是 注解 的方式配置过滤器信息，则过滤器执行顺序由 类的名称 决定（这种情况下，推荐所有的过滤器都以 F1_xxx、F2_xxx的形式统一命名，这样就不用为顺序发愁了）。

:::



`web.xml` 方式配置：

::: code-group

```java
public class Filter1 implements Filter {
  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    System.out.println("Filter1 doFilter start");
    filterChain.doFilter(servletRequest, servletResponse);
    System.out.println("Filter1 doFilter end");
  }
}
```

```java
public class Filter2 implements Filter {
  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    System.out.println("Filter2 doFilter start");
    filterChain.doFilter(servletRequest, servletResponse);
    System.out.println("Filter2 doFilter end");
  }
}
```

```java
public class Filter3 implements Filter {
  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    System.out.println("Filter3 doFilter start");
    filterChain.doFilter(servletRequest, servletResponse);
    System.out.println("Filter3 doFilter end");
  }
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee https://jakarta.ee/xml/ns/jakartaee/web-app_6_0.xsd"
         version="6.0">
  <filter>
    <filter-name>filter1</filter-name>
    <filter-class>com.geomind.filters.Filter1</filter-class>
  </filter>
  <!-- 第一个执行 -->
  <filter-mapping>
    <filter-name>filter1</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>

  <filter>
    <filter-name>filter2</filter-name>
    <filter-class>com.geomind.filters.Filter2</filter-class>
  </filter>
   <!-- 第二个执行 -->
  <filter-mapping>
    <filter-name>filter2</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>

  <filter>
    <filter-name>filter3</filter-name>
    <filter-class>com.geomind.filters.Filter3</filter-class>
  </filter>
   <!-- 第三个执行 -->
  <filter-mapping>
    <filter-name>filter3</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
</web-app>
```

:::



注解 方式配置：

::: code-group

```java
@WebFilter("/*")
public class Filter1 implements Filter {
  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    System.out.println("Filter1 doFilter start");
    filterChain.doFilter(servletRequest, servletResponse);
    System.out.println("Filter1 doFilter end");
  }
}
```

```java
@WebFilter("/*")
public class Filter2 implements Filter {
  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    System.out.println("Filter2 doFilter start");
    filterChain.doFilter(servletRequest, servletResponse);
    System.out.println("Filter2 doFilter end");
  }
}
```

```java
@WebFilter("/*")
public class Filter3 implements Filter {
  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    System.out.println("Filter3 doFilter start");
    filterChain.doFilter(servletRequest, servletResponse);
    System.out.println("Filter3 doFilter end");
  }
}
```

:::

上面的代码执行时，请求进入时的执行顺序是 Filter1 --> Filter2 --> Filter3，但是当请求返回时，过滤器执行的顺序是 Filter3 --> Filter2 --> Filter1。

执行流程如图所示：

![过滤器执行顺序](.\assets\过滤器执行顺序.png)



## 注解

Filter 注解的使用方法和 Servlet 注解的使用方法一样。

```java
@WebFilter(
  filterName = "loggingFilter",
  initParams = {@WebInitParam(name = "username", value = "superAdmin")},
  // urlPatterns = "/*", // 所有请求都过滤，对应xml配置中的 url-pattern
  urlPatterns = {"/servletA", "index.html"}, // 过滤指定路径
  servletNames = {"servletA"} // 按照别名过滤，对应xml配置中的 serlvet-name
)
public class LoggingFilter implements Filter {
  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    filterChain.doFilter(servletRequest, servletResponse);
  }
}
```