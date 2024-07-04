# StringBuilder

java 的编译器对 `String` 类型做了处理，让我们可以直接使用 `+` 拼接字符串。

请看这段代码：

```java
String s = "";
for (int i = 0; i < 30; i++) {
    s = s + "," + i;
}
System.out.println(s);
```

虽然可以直接拼接字符串，但是，在循环中每次都会创建新的字符串对象，然后扔掉旧的字符串。

这样下来，绝大部分字符串都是临时对象，不仅浪费内存，还影响 GC 效率。



## StringBuilder

为了能高效的拼接字符串，java 标准库中提供了 `StringBuilder` ，它是一个**可变对象**，可以**预分配缓冲区**，不会创建新的临时对象。

```java {3,4,6}
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 30; i++) {
    sb.append(",");
    sb.append(i);
}
String s = sb.toString();
System.out.println(s);
```

>早期版本存在 `StringBuffer` 类，是`StringBuilder` 的线程安全版本，但是现在没必要使用它了。



`StringBuilder` 还可以进行链式调用：

```java {2-5}
StringBuilder sb = new StringBuilder();
sb.append("Mr ")
    .append("Tom")
    .append("!")
    .insert(0, "Hello, ");
String s = sb.toString();
System.out.println(s); // Hello, Mr Tom!
```



## 链式调用

`StringBuilder` 可以链式调用的关键是，定义的 `append()` 方法会返回 `this`。

仿写链式调用：

:::code-group

```java [StringBuilder]
class StringBuilder1 {
    private StringBuilder sb;

    public StringBuilder1() {
        this.sb = new StringBuilder();
    }

    public StringBuilder1 append(String str) {
        sb.append(str).append(" ");
        return this;
    }

    public StringBuilder1 insert(int offset, String str) {
        sb.insert(offset, str);
        return this;
    }

    @Override
    public String toString() {
        return this.sb.toString();
    }
}
```

```java [main]
StringBuilder1 sb = new StringBuilder1();
var s = sb.append("wang")
    .append("yibo")
    .insert(0, "hello，")
    .toString();
System.out.println(s);
```

:::