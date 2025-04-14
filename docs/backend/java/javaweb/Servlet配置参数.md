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



### 注解配置

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

`ServletContext` 可以配置 Servlet 的初始化配置参数，但是它也还有其他功能，如 获取资源的真实路径、获取项目的上下文路径等。

### 配置初始化参数

`ServletContext` 配置参数在全局只有一份，所有的 Servlet 都可以获取它配置的共享参数。

::: code-group

```java [NewsServlet]
@WebServlet(
  value = "/newsServlet",
  initParams = {@WebInitParam(name = "username", value = "admin"), @WebInitParam(name = "pageSize", value = "10")}
)
public class NewsServlet extends HttpServlet {
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
   	// ...
  }
}
```

```xml [web.xml]
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



### 获取资源的真实路径

`ServletContext` 可以获取资源的真实路径，这里的真实路径是文件打包后的路径。

>例如，在 WEB-INFO 文件夹下，新建 `upload/text.txt` 文件，想要获取它打包后的路径，就是在获取资源的真实路径

```java {8}
@WebServlet("/contextServlet")
public class ContextServlet extends HttpServlet {
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ServletContext servletContext = super.getServletContext();

    // 获取资源的真实路径
    String realPath = servletContext.getRealPath("upload/text.txt");
    System.out.println("realPath = " + realPath);
    // E:\StudyCode\Java-Web\out\artifacts\Demo_Web03_war_exploded\\upload\text.txt
  }
}
```



### 获取项目的上下文配置路径

`ServletContext` 也可以获取项目的上下文配置路径，上下文配置路径就是在配置 Tomcat 时 Deployment 中的 Application context 中配置的路径。

```java {8}
@WebServlet("/contextServlet")
public class ContextServlet extends HttpServlet {
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ServletContext servletContext = super.getServletContext();

    // 获取项目的上下文配置路径
    String contextPath = servletContext.getContextPath();
    System.out.println("contextPath = " + contextPath); // Demo03
  }
}
```



### 域对象

`ServletContext` 对象除了上面的两个作用，它还可以作为当前项目的**域对象**来进行使用。`ServletContext` 代表应用，所以也叫做应用域，是 webapp 中最大的域，可以在本应用内实现数据的传递。

webapp 中一共有三大域对象，分别是 应用域、会话域、请求域。

::: success 什么是域对象？

域对象 是用于存储数据和传递数据的对象，传递数据不同的范围，我们称之为不同的域，不同的域之间共享的数据也不同。

:::

常用的方法：

|                 方法                 | 作用                    |
| :----------------------------------: | ----------------------- |
| setAttribute(String key, Object val) | 向应用域中存储/修改数据 |
|       getAttribute(String key)       | 从应用域中获取数据      |
|     removeAttribute(String key)      | 从应用域中移除数据      |

::: code-group

```java [NewsServlet存储]
@WebServlet("/newsServlet")
public class NewsServlet extends HttpServlet {
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ServletContext servletContext1 = servletConfig.getServletContext();
    // 向应用域中存储数据
    servletContext1.setAttribute("password", "123456");
    // 多次存储，key相同时，后面的值会覆盖掉前面的值
    servletContext1.setAttribute("password", "888999");
  }
}
```

```java [ContextServlet读取]
@WebServlet("/contextServlet")
public class ContextServlet extends HttpServlet {
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ServletContext servletContext = super.getServletContext();

    // 从应用域中获取数据
    Object password = servletContext.getAttribute("password");
    System.out.println(password);

    // 从应用域中移除数据
    servletContext.removeAttribute("password");
  }
}
```

:::
