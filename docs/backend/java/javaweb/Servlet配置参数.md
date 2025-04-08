# Servlet配置参数

Servlet 配置参数的方式有两种：

- `ServletConfig` 配置：它只能为单个 Servlet 配置参数，并且是多例的，可以有多个；
- `ServletContext` 配置：它可以为全局所有的 Servlet 配置共享参数，它是单例的，全局只有一个；



## ServletConfig

ServletConfig配置参数是在 `web.xml` 或 `@WebServlet` 注解中为 Servlet 设置的初始化参数。

这些参数以键值对的形式存在，Servlet 在启动的时候可以通过 `ServletConfig` 的对象来进行读取。

>例如：你有一个 Servlet 用来显示你网站上的新闻，你可以通过配置参数来告诉 Servlet 新闻数据存储在哪里，或者一次显示多少条新闻。



### web.xml配置

::: code-group

```java [NewsServlet] {5,14-17}
public class NewsServlet extends HttpServlet {
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 调用父类中的 getServletConfig 方法获取初始化参数
    ServletConfig servletConfig = super.getServletConfig();

    // 获取单个参数
    String username = servletConfig.getInitParameter("username");
    String password = servletConfig.getInitParameter("pageSize");
    System.out.println("username = " + username);
    System.out.println("pageSize = " + password);

    // 获取所有参数
    Enumeration<String> initParameterNames = servletConfig.getInitParameterNames();
    while (initParameterNames.hasMoreElements()) {
      String name = initParameterNames.nextElement();
      String value = servletConfig.getInitParameter(name);
      System.out.println(name + "=" + value);
    }
  }
}
```

```xml [web.xml] {11-18}
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee https://jakarta.ee/xml/ns/jakartaee/web-app_6_0.xsd"
         version="6.0">

  <servlet>
    <servlet-name>newsServlet</servlet-name>
    <servlet-class>com.geomind.servlet.NewsServlet</servlet-class>
    <!-- 配置servlet默认的初始化参数 -->
    <init-param>
      <param-name>username</param-name>
      <param-value>admin</param-value>
    </init-param>
    <init-param>
      <param-name>pageSize</param-name>
      <param-value>10</param-value>
    </init-param>
  </servlet>
  <servlet-mapping>
    <servlet-name>newsServlet</servlet-name>
    <url-pattern>/newsServlet</url-pattern>
  </servlet-mapping>
</web-app>
```

:::



### @WebServlet配置

把上面 web.xml 中配置的内容，修改为注解的方式。

```java {3}
@WebServlet(
  value = "/newsServlet",
  initParams = {@WebInitParam(name = "username", value = "admin"), @WebInitParam(name = "pageSize", value = "10")}
)
public class NewsServlet extends HttpServlet {
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 调用父类中的 getServletConfig 方法获取初始化参数
    ServletConfig servletConfig = super.getServletConfig();

    // 获取单个参数
    String username = servletConfig.getInitParameter("username");
    String password = servletConfig.getInitParameter("pageSize");
    System.out.println("username = " + username);
    System.out.println("pageSize = " + password);

    // 获取所有参数
    Enumeration<String> initParameterNames = servletConfig.getInitParameterNames();
    while (initParameterNames.hasMoreElements()) {
      String name = initParameterNames.nextElement();
      String value = servletConfig.getInitParameter(name);
      System.out.println(name + "=" + value);
    }
  }
}
```



## ServletContext

`ServletContext` 配置参数在全局只有一份，所有的 Servlet 都可以获取它配置的共享参数。



### 配置参数

::: code-group

```java
@WebServlet(
  value = "/newsServlet",
  initParams = {@WebInitParam(name = "username", value = "admin"), @WebInitParam(name = "pageSize", value = "10")}
)
public class NewsServlet extends HttpServlet {
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 三种方式都可以获取 ServletContext 配置对象，并且三种方式获取到的是同一个对象
    ServletContext servletContext1 = servletConfig.getServletContext();
    ServletContext servletContext2 = req.getServletContext();
    ServletContext servletContext3 = super.getServletContext();

    // 获取单个参数
    String encoding = servletContext1.getInitParameter("encoding");
    String author = servletContext1.getInitParameter("author");
    System.out.println("encoding = " + encoding);
    System.out.println("author = " + author);

    // 获取多个参数
    Enumeration<String> initParameterNames1 = servletContext2.getInitParameterNames();
    while (initParameterNames1.hasMoreElements()) {
      String name = initParameterNames1.nextElement();
      String value = servletContext2.getInitParameter(name);
      System.out.println(name + "=" + value);
    }
  }
}
```

```java
<?xml version="1.0" encoding="UTF-8"?>
  <web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee https://jakarta.ee/xml/ns/jakartaee/web-app_6_0.xsd"
      version="6.0">

   <context-param>
     <param-name>encoding</param-name>
     <param-value>UTF-8</param-value>
   </context-param>
   <context-param>
     <param-name>author</param-name>
     <param-value>superAdmin</param-value>
   </context-param>
</web-app>
```

:::















































