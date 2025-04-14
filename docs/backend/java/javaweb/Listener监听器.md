# Listener监听器

`Listener` 监听器 是专门用于监听域对象身上的事件或状态发生变化时的处理器。

监听器分类：

- **应用域监听器（掌握）**：`ServletContextListener`, `ServletContextAttributeListener`
- 会话域监听器：`HttpSessionListener`, `HttpSessionAttributeListener`
- 请求域监听器：`ServletRequestListener`, `ServletRequestAttributeListener`



## 应用域监听器

创建三个 servlet，分别用于对 应用域 增加、修改和删除属性。

```java
@WebServlet("/servletA")
public class ServletA extends HttpServlet {
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 向应用域新增属性
    ServletContext application = super.getServletContext();
    application.setAttribute("username", "superAdmin");
  }
}

@WebServlet("/servletB")
public class ServletB extends HttpServlet {
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 修改应用域属性
    ServletContext application = super.getServletContext();
    application.setAttribute("username", "liuxu");
  }
}

@WebServlet("/servletC")
public class ServletC extends HttpServlet {
  @Override
  protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 移除应用域属性
    ServletContext application = super.getServletContext();
    application.removeAttribute("username");
  }
}
```

创建监听应用域的 Listener。

```java
@WebListener
public class ApplicationListener implements ServletContextListener, ServletContextAttributeListener {
  @Override
  public void contextInitialized(ServletContextEvent sce) {
    // 当应用域创建时触发
    ServletContext application = sce.getServletContext();
    int i = application.hashCode();
    System.out.println("Application hashcode " + i + " init.");
  }

  @Override
  public void contextDestroyed(ServletContextEvent sce) {
    // 当应用域销毁时触发
    ServletContext application = sce.getServletContext();
    int i = application.hashCode();
    System.out.println("Application hashcode " + i + " destroyed.");
  }

  @Override
  public void attributeAdded(ServletContextAttributeEvent scae) {
    // 当应用域内有属性新增加时触发
    String name = scae.getName();
    Object value = scae.getValue();
    System.out.println("Attribute add " + name + ": " + value);
  }

  @Override
  public void attributeRemoved(ServletContextAttributeEvent scae) {
    // 当应用域内有属性移除时触发
    String name = scae.getName();
    Object value = scae.getValue();
    System.out.println("Attribute remove " + name + ": " + value);
  }

  @Override
  public void attributeReplaced(ServletContextAttributeEvent scae) {
    // 当应用域内有属性修改时触发
    String name = scae.getName();
    // 获取到的是旧的值
    Object oldVal = scae.getValue();
    // 通过name再获取一次value，拿到的就是新的值
    ServletContext application = scae.getServletContext();
    Object newVal = application.getAttribute(name);

    System.out.println("Attribute replace " + name + ": " + oldVal + " -> " + newVal);
  }
}
```



## 会话域监听器

```java
@WebListener
public class SessionListener implements HttpSessionListener, HttpSessionAttributeListener {
  @Override
  public void sessionCreated(HttpSessionEvent se) {
    // session会话域创建时触发
  }

  @Override
  public void sessionDestroyed(HttpSessionEvent se) {
    // session会话域销毁时触发
  }

  @Override
  public void attributeAdded(HttpSessionBindingEvent se) {
    // session会话域新增属性时触发
  }

  @Override
  public void attributeRemoved(HttpSessionBindingEvent se) {
    // session会话域移除属性时触发
  }

  @Override
  public void attributeReplaced(HttpSessionBindingEvent se) {
    // session会话域修改属性时触发
  }
}
```



## 请求域监听器

```java
@WebListener
public class RequestListener implements ServletRequestListener, ServletRequestAttributeListener {
  @Override
  public void requestInitialized(ServletRequestEvent sre) {
    // 请求域创建时触发
  }

  @Override
  public void requestDestroyed(ServletRequestEvent sre) {
    // 请求域销毁时触发
  }

  @Override
  public void attributeAdded(ServletRequestAttributeEvent srae) {
    // 请求域新增属性时触发
  }

  @Override
  public void attributeRemoved(ServletRequestAttributeEvent srae) {
    // 请求域移除属性时触发
  }

  @Override
  public void attributeReplaced(ServletRequestAttributeEvent srae) {
    // 请求域修改属性时触发
  }
}
```