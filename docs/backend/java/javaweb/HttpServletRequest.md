# HttpServletRequest

`HttpServletRequest` 是一个接口，其父接口是 `ServletRequest`。它是由 Tomcat 将请求报文转换后封装而来的对象，在 Tomcat 调用 service 方法时传入使用。

客户端发送过来的请求，在请求中携带的信息，都可以通过 HttpServletRequest 获取。

![HttpServletRequest](.\assets\HttpServletRequest.png)

获取请求行相关信息：

```java
@WebServlet("/httpRequest")
public class HttpRequestServlet extends HttpServlet {
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 获取客户端请求项目中的URI
    System.out.println(req.getRequestURI()); // /Demo03/httpRequest
    // 获取客户端请求的URL
    System.out.println(req.getRequestURL()); // http://localhost:8080/Demo03/httpRequest
    // 获取客户端发送请求时携带的端口
    System.out.println(req.getServerPort()); // 8080
    // 获取本应用所在容器的端口
    System.out.println(req.getLocalPort()); // 8080
    // 获取客户端程序的端口
    System.out.println(req.getRemotePort()); // 51193
    // 获取请求协议
    System.out.println(req.getScheme()); // http
    // 获取请求协议及版本号
    System.out.println(req.getProtocol()); // HTTP/1.1
    // 获取请求方式
    System.out.println(req.getMethod()); // GET
  }
}
```

获取请求头相关信息：

```java
@WebServlet("/httpRequest")
public class HttpRequestServlet extends HttpServlet {
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 获取单个请求头
    System.out.println(req.getHeader("user-agent"));

    // 遍历获取所有请求头
    Enumeration<String> headerNames = req.getHeaderNames();
    while (headerNames.hasMoreElements()) {
      String name = headerNames.nextElement();
      System.out.println(name + ": " + req.getHeader(name));
    }

    // 获取Context-Type请求头
    System.out.println(req.getContentType());
  }
}
```

获取请求参数相关信息：

```java
@WebServlet("/httpRequest")
public class HttpRequestServlet extends HttpServlet {
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 获取请求体中单个参数值
    String username = req.getParameter("username");
    System.out.println("username = " + username); // admin
    // 获取请求体中，同一个参数名获取多个参数值的情况
    String[] hobbies = req.getParameterValues("hobby");
    System.out.println("hobbies = " + Arrays.toString(hobbies)); // [1, 2]

    // 获取请求体中所有参数值（方式一）
    Enumeration<String> parameterNames = req.getParameterNames();
    while (parameterNames.hasMoreElements()) {
      String name = parameterNames.nextElement();
      String[] values = req.getParameterValues(name);
      if (values.length > 1) {
        System.out.println(name + "=" + Arrays.toString(values));
      } else {
        System.out.println(name + "=" + values[0]);
      }
    }
    
    // 获取请求体中所有参数值（方式二）
    Map<String, String[]> parameterMap = req.getParameterMap();
    Set<Map.Entry<String, String[]>> entries = parameterMap.entrySet();
    for (Map.Entry<String, String[]> entry : entries) {
      String key = entry.getKey();
      String[] values = entry.getValue();
      if (values.length > 1) {
        System.out.println(key + "=" + Arrays.toString(values));
      } else {
        System.out.println(key + "=" + values[0]);
      }
    }
  }
}
```

其他的一些方法：

```java
@WebServlet("/httpRequest")
public class HttpRequestServlet extends HttpServlet {
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 获取请求的Servlet映射路径
    String servletPath = req.getServletPath();
    // 获取ServletContext对象
    ServletContext servletContext = req.getServletContext();
    // 设置请求体字符集
    req.setCharacterEncoding("UTF-8");
    // 获取请求中所有的cookie
    Cookie[] cookies = req.getCookies();
    // 获取请求中Session对象
    HttpSession session = req.getSession();
  }
}
```