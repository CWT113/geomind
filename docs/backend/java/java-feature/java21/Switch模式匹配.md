# Switch 模式匹配

Switch 模式匹配是在 Java21 中正式引入的新特性。

过去的 `switch` 只能用来判断常见的基本数据类型（如 `int`、`char`）或 `String` 和 `enum`。而 Java21 之后，它 **不仅能判断“值”，还能直接判断“类型”，甚至能在判断类型的同时完成变量类型的转换和解构。**



## 类型模式匹配

在 Java21 之前，处理一个未知类型的对象，需要写很多的 `if-else` 和 `instanceof`。

```java {4,6}
public static void main(String[] args) {
  Object obj = 10;

  if (obj instanceof String) {
    System.out.println("obj 是一个字符串！");
  } else if (obj instanceof Integer i) {
    System.out.println("obj 是一个整数类型，值为：" + i);
  }
}
```

但在 Java21 之后，可以使用 switch 进行简化：

```java
public static void main(String[] args) {
  Object obj = 10;

  switch (obj) {
    case String s -> {
      System.out.println("obj是一个字符串！");
    }
    case Integer i -> {
      System.out.println("obj是一个整数，数值是：" + i);
    }
    default -> {
      System.out.println("未知类型");
    }
  }
}
```



## 守卫模式

如果想在判断类型时顺便增加一个过滤条件，可以使用 `when` 关键字，直接在 `case` 后面写条件表达式：

```java {5}
public static void main(String[] args) {
  Object obj = "admin";

  switch (obj) {
    case String s when s.length() > 5 -> {
      System.out.println("长字符串: " + s.toUpperCase());
    }
    case String s -> {
      System.out.println("短字符串: " + s);
    }
    default -> {
      System.out.println("其他类型");
    }
  }
}
```



## null值判断

在之前，如果传给 switch 的变量是 `null`，程序直接会抛出 NullPointerException 空指针异常，我们必须在 switch 外面手动判空。

但在 Java21 之后，允许把 `null` 作为一个明确的 case 分支：

```java {8}
public static void main(String[] args) {
  Object obj = null;

  switch (obj) {
    case String s -> {
      System.out.println("短字符串: " + s);
    }
    case null -> {
      System.out.println("收到一个空对象");
    }
    default -> {
      System.out.println("其他类型");
    }
  }
}
```



## 穷举检查

当 switch 表达式配合 Java 的密封类使用时，编译器会明确的判断出当前的接口会父类一共有哪几个子类，从而进行穷举检查。

::: code-group

```java [Main]
public void checkedNode(Node node) {
  switch (node) {
    case SubA a -> {
      System.out.println("SubA");
    }
    case SubB b -> {
      System.out.println("SubB");
    }
      // 不需要写 default，因为所有的 case 可能性都已经被覆盖了
  }
}
```

```java [Node]
public sealed interface Node permits SubA, SubB {
}

record SubA() implements Node {
}

record SubB() implements Node {
}
```

:::
