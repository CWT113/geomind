# record类

使用 `String` 、`Integer` 等类型的时候，这些类都是不变类，不变类具有以下特点：

- 定义 `class` 时使用 `final`，无法继承；
- 每个字段都使用 `final` ，保证创建实例后无法修改任何字段；



>假设定义一个 `Point` 类，有 `x`、`y` 两个变量，同时它是一个不变类。

```java
final class Point {
  private final int x;
  private final int y;

  public Point(int x, int y) {
    this.x = x;
    this.y = y;
  }

  public int x() {
    return this.x;
  }

  public int y() {
    return this.y;
  }
}
```

为了保证不变类的比较，还需要重写 `equals()` 、`hashCode()` 等方法，比较麻烦。



## record<Badge type="tip" text="java 14+" />

从 Java14 开始，引入了 `record` 类。定义 `record` 类时，使用关键字 `record` 即可。

改写上面的 Point 类为 record 类，代码如下：

```java
record Point(int x, int y) {
}
```

record 类重写了 `equals()` 、`hashCode()` 、`toString()` 等方法，相当于以下代码：

::: details record 类改写为 class类

```java
final class Point extends Record {
  private final int x;
  private final int y;

  public Point(int x, int y) {
    this.x = x;
    this.y = y;
  }

  public int x() {
    return this.x;
  }

  public int y() {
    return this.y;
  }

  public String toString() {
    return String.format("Point[x=%s, y=%s]", x, y);
  }

  public boolean equals(Object o) {
  }

  public int hashCode() {
  }
}
```

:::



## 构造函数

编译器默认按照 record 声明的变量顺序自动创建了一个构造方法，并在方法内给字段赋值了。

> 那么我们想要在构造函数中检查参数，该怎么办呢？

这时我们可以在 record 类中添加自定义的构造函数，构造函数有 2 中写法：

- 紧凑构造函数
- 规范构造函数



### 紧凑构造函数

```java
record Point(int x, int y) {
  Point {
    if (x < 0 || y < 0) {
      throw new IllegalArgumentException();
    }
  }
}
```



### 规范构造函数

```java
record Point(int x, int y) {
  Point(int x, int y) {
    this.x = x;
    this.y = y;
  }
}
```



上面两种构造函数的逻辑，在编译器处理后生成的最终构造方法如下：

::: details 查看最终构造函数

```java {3-5}
public final class Point extends Record {
  public Point(int x, int y) {
    if (x < 0 || y < 0) {
      throw new IllegalArgumentException();
    }

    this.x = x;
    this.y = y;
  }
}
```

:::



## 添加静态方法

`record` 类中仍然可以添加 静态方法。一种常用的静态方法是 `of()` 方法，如下：

```java [Point]
record Point(int x, int y) {
  static Point of(int x, int y) {
    return new Point(x, y);
  }
}
```

```java [main] {2}
public static void main(String[] args) {
  Point point = Point.of(114, 30);
  
  System.out.println(point); 			// Point[x=114, y=30]
  System.out.println(point.x()); 	// 114
  System.out.println(point.y()); 	// 30
}
```