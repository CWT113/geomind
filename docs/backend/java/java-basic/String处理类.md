# String处理类

java 的编译器对 `String` 类型做了处理，让我们可以直接使用 `+` 拼接字符串。

```java
String s = "";
for (int i = 0; i < 30; i++) {
  s = s + "," + i;
}
System.out.println(s);
```

虽然可以直接拼接字符串，但是，在循环中每次都会创建新的字符串对象，然后扔掉旧的字符串。

这样下来，绝大部分字符串都是临时对象，不仅浪费内存，还影响垃圾回收的效率。



## StringBuffer

`StringBuffer` 是一个可变字符序列。它可以用于大量字符串的操作，尤其是需要 <span style="color:#CC0000; font-weight:bold;">对字符串进行修改 或 拼接时</span>，效率比 String 高。

::: info 特点

1. <span style="color:#CC0000; font-weight:bold;">线程安全</span>，多线程环境下操作同一个字符串，不会出现数据不一致的情况，但是效率比较低；
2. 提供了许多方法来修改字符序列，如：`append()`、`insert()`、`delete()`、`replace()`；

:::

```java
StringBuffer sb2 = new StringBuffer();
sb2.append("Hello, ");
sb2.append("world!");
System.out.println(sb2.toString()); //Hello, world!
```



## StringBuilder

`StringBuilder` 也是一个可变字符序列。和 StringBuffer 不同的是，它是 <span style="font-weight:bold; color:#CC0000;">线程不安全</span> 的，但是效率比 StringBuffer 高。

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 30; i++) {
  sb.append(",");
  sb.append(i);
}
System.out.println(sb);
```

`StringBuilder` 还可以进行链式调用：

```java
StringBuilder sb = new StringBuilder();
sb.append("Mr ")
  .append("Tom")
  .append("!")
  .insert(0, "Hello, ");
System.out.println(sb); //Hello, Mr Tom!
```

::: details 仿写 StringBuilder 链式调用

`StringBuilder` 可以链式调用的关键是，定义的 `append()` 方法会返回 `this`。

```java
class StringBuilder {
  private StringBuilder sb;

  public StringBuilder() {
    this.sb = new StringBuilder();
  }

  public StringBuilder append(String str) {
    sb.append(str).append(" ");
    return this;
  }

  public StringBuilder insert(int offset, String str) {
    sb.insert(offset, str);
    return this;
  }

  @Override
  public String toString() {
    return this.sb.toString();
  }
}
```

```java
StringBuilder sb = new StringBuilder();
var s = sb.append("wang")
  .append("yibo!")
  .insert(0, "hello, ")
  .toString();

System.out.println(s); //hello, wang yibo!
```

:::



## StringJoiner

`StringJoiner` 是 Java 8 引入的一个工具类，用于构造一个由分隔符分割的序列。它简化了使用逗号（或者其他分隔符）连接字符串的过程。

使用场景：<span style="color:#CC0000; font-weight:bold;">当需要将一组字符串或元素用某种分隔符连接起来时使用</span>。

::: info 特点

1. 允许指定分隔符，前缀，后缀；
2. 它的内部使用 `StringBuilder` 来构建字符串；

:::

|                构造函数                 | 作用                                                  |
| :-------------------------------------: | :---------------------------------------------------- |
|       new StringJoiner(delimiter)       | delimiter：分隔符                                     |
| StringJoiner(delimiter, prefix, suffix) | delimiter：分隔符<br />prefix：前缀<br />suffix：后缀 |

要高效拼接字符串，应该使用 `StringBuilder` 类。但是很多时候，我们可能会遇到下面的场景：

```java
public static void main(String[] args) {
  String[] names = {"Tom", "Sunny", "WangYiBo"};

  StringBuilder sb = new StringBuilder();
  sb.append("Hello ");
  for (String name : names) {
    sb.append(name).append("，");
  }
  //去掉最后的逗号
  sb.delete(sb.length() - 2, sb.length());

  System.out.println(sb); //Hello Tom，Sunny，WangYiB
}
```

上面的操作使用 `StringJoiner` 进行简化后：

```java {2,4}
public static void main(String[] args) {
  StringJoiner sj = new StringJoiner("，", "Hello ", "");
  for (String name : names) {
    sj.add(name);
  }
  System.out.println(sj); //Hello Tom，Sunny，WangYiB
}
```



## String.join()

`String.join()` 方法在内部也使用了 StringJoiner 来拼接字符串，在**不需要指定前缀和后缀**的时候，用 String.join() 更方便。

```java {3}
public static void main(String[] args) {
  String[] names = {"Tom", "Sunny", "WangYiBo"};
  String s = String.join("，", names);
  
  System.out.println(s); //Tom，Sunny，WangYiBo
}
```

