# Servlet简介

## 什么是 Servlet？

在客户端请求的时候，请求的结果有两种形式：

- 静态资源：无需在程序运行时通过代码生成的资源，如 HTML、CSS、图片等；
- 动态资源：需要在程序运行时通过代码生成的资源，如 Servlet、Thymeleaf 等；



`Servlet` 就是运行在服务端（Tomcat）的组件，是由 Sun 公司提供的一套定义动态资源的规范（从代码层面来讲 Servlet 就是一个接口）。

它用来接收、处理客户端请求，并响应给客户端动态资源，我们可以把 Servlet 称为 Web 应用中的控制器。



## 请求参数和响应参数

### HttpServletRequest

`HttpServletRequest` 代表 客户端发送过来的请求信息。常用方法有：

| 方法                      | 作用         |
| ------------------------- | ------------ |
| getParameter(String name) | 获取表单参数 |
| getMethod()               | 获取请求方式 |
| getHeader(String name)    | 获取请求头   |
| getRequestURI()           | 获取请求路径 |
| getSession()              | 获取会话对象 |

### HttpServletResponse

`HttpServletResponse` 代表 服务器返回给客户端的响应信息。常用方法有：

| 方法                                 | 作用                     |
| ------------------------------------ | ------------------------ |
| setHeader(String name, String value) | 设置响应头               |
| setContentType(String type)          | 设置响应类型（MIME 类型） |
| getWriter()                          | 获取字符输出流           |
| sendRedirect(String location)        | 重定向                   |



## 简单案例

>编写一个 UserServlet 类，判断用户名是否等于 admin，然后返回结果给客户端。

新建 `web/index.html` 文件，写入客户端请求的表单代码。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Title</title>
  </head>
  <body>
    <!-- method是 get/post 都可以。 action 就是请求的路径，和服务端配合使用。 -->
    <form method="get" action="userServlet">
      用户名：<input type="text" name="username"/>
      <br/>
      <input type="submit" value="提交"/>
    </form>
  </body>
</html>
```

新建 `src/com.geomind.servlet/UserServlet` 类，写接收请求并响应结果的代码，并配置 `web.xml` 中的请求路径映射。

::: code-group

```java [UserServlet] {12,20,21}
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class UserServlet extends HttpServlet {
  @Override
  protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // 获取客户端传递的参数，query形式和param形式都可以获取到
    String username = request.getParameter("username");

    String info = "YES";
    if ("admin".equals(username)) {
      info = "NO";
    }

    // 获取响应体中的打印流，向流中写入内容
    PrintWriter writer = response.getWriter();
    writer.write(info);
  }
}
```

```xml [web.xml]
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee https://jakarta.ee/xml/ns/jakartaee/web-app_6_0.xsd"
         version="6.0">
  <servlet>
    <!-- 关联请求的映射路径，和 mapping 中的 <servlet-name> 相同 -->
    <servlet-name>userServlet</servlet-name>
    <!-- 类在src中的路径 -->
    <servlet-class>com.geomind.servlet.UserServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <!-- 和 servlet 中的 <servlet-name> 相同 -->
    <servlet-name>userServlet</servlet-name>
    <!-- 客户端请求时的url路径 -->
    <url-pattern>/userServlet</url-pattern>
  </servlet-mapping>
</web-app>
```

:::



::: info 提示

1. `servlet-api.jar` 包是 Tomcat 服务端就已经提供的，所以不需要我们手动导入此包；

2. `Content-Type` 响应头，Tomcat 服务端在返回数据时，会自动携带 MIME 类型，但是我们也可以手动设置类型：

   ```java
   // 两种方式都可以
   response.setHeader("Content-Type", "text/html");
   response.setContentType("text/html");
   ```

:::



## 注解

前面的示例中，通过在 `web.xml` 中定义类和请求路径的映射关系，实现了接口的调用，但是这样配置太过繁琐，可以使用 `@WebServlet` 注解来简化。

::: warning 注意 

1. 如果使用 注解 的方式定义了请求路径，那么就不要在 web.xml 中定义了，二者冲突启动 Tomcat 会报错。
2. 注解内部的 value 值就是映射路径，它前面需要写 `/` ，不写也会报错。

:::

```java {1}
@WebServlet("/userServlet")
public class UserServlet extends HttpServlet {
  @Override
  protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// ...
  }
}
```

注解的参数：

|    参数     |   类型   | 作用                                                         |
| :---------: | :------: | ------------------------------------------------------------ |
|    name     |  String  | 注解的名称，和 web.xml 中 `<servlet-name>` 的作用一致        |
|    value    | String [] | 请求的 URI 地址，是一个数组，默认就是再给 value 赋值，和 urlPatterns 等价 |
| urlPatterns | String [] | 请求的 URI 地址，是一个数组，和 value 等价                   |

```java {1,2}
@WebServlet(name = "UserServlet", value = "/userServlet")
@WebServlet(name = "UserServlet", value = {"/user", "/userServlet"})
public class UserServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			// ...
    }
}
```
