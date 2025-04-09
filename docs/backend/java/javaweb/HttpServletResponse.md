# HttpServletResponse

`HttpServletResponse` 是一个接口，其父接口是 `ServletResponse`。它是由 Tomcat 预先创建的，代表对客户端的响应，该对象会被转换成响应的报文发送给客户端。

![HttpServletRequest](.\assets\HttpServletRequest.png)

常用的方法：

```java

@WebServlet("/httpResponse")
public class HttpResponseServlet extends HttpServlet {
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 设置响应的状态码
    resp.setStatus(200);
    // 设置自定义响应头
    resp.setHeader("aaa", "valuea");
    
    // 设置Content-Type
    resp.setContentType("text/html");
    resp.setHeader("Content-Type", "text/html");
    
    // 设置Content-Length
    resp.setContentLength(1234);
    resp.setHeader("Content-Length", "1234");
    
    // 向客户端返回数据
    PrintWriter writer = resp.getWriter();
    writer.print("<h1>Hello World</h1>");
  }
}
```

