# Record模式

Record 模式（Record Patterns）是在 Java21 中正式成为了标准特性。

它是对 Java 原有的 `instanceof` 和 `switch` 模式匹配的升级。在 Java21 之前，只能判断一个对象是否属于某种类型，而有了 Record 模式，不仅能判断类型，还能直接 **在判断的同时解构其内部的属性字段**。



## 传统方式 vs Record模式

假设有一个用来表示坐标的 Record：

```java
public record Point(int x, int y) {
}
```

在 Java21 之前，使用 `instanceof` 之后，需要手动强转或调用 Getter 函数。但在 Java21 之后，可以通过 Record 模式直接提取出字段并绑定到局部变量 x 和 y 上。

```java {12}
public static void main(String[] args) {
  Object obj = new Point(10, 20);

  // JDK21 之前
  if (obj instanceof Point p) {
    int x = p.x();
    int y = p.y();
    System.out.println("x: " + x + ", y: " + y);
  }

  // JDK21 以后
  if (obj instanceof Point(int x, int y)) {
    // 直接使用 x 和 y，无需 p.x()
    System.out.println("x: " + x + ", y: " + y);
  }
}
```



## 嵌套解构

Record 模式最大的优势在于它支持嵌套，如果一个 Record 里面还包含另一个 Record，可以直接一层到底全部拆解开。

::: code-group

```java [Main] {5}
public static void main(String[] args) {
  Object obj = new Window(new Point(1, 2), new Point(3, 4));

  // 嵌套解构，一步拿到最里层的 x 和 y
  if (obj instanceof Window(Point(int x, int y), Point bottomRight)) {
    System.out.printf("左上角坐标：x = %d, y = %d %n", x, y);
    System.out.printf("右下角坐标：x = %d, y = %d", bottomRight.x(), bottomRight.y());
  }
}
```

```java [Point]
public record Point(int x, int y) {
}

public record Window(Point topLeft, Point bottomRight) {
}
```

:::



## 搭配 switch 使用

Java21 同时也发布了 Switch 模式匹配，它与 Record 模式完美结合，可以让类型分支判断变得更加简便。

::: code-group

```java [Main] {9,12}
public static void main(String[] args) {
  printShape(null);
  printShape(new Circle(new Point(1, 2), 10));
  printShape(new Rectangle(new Point(1, 2), new Point(3, 4)));
}

public static void printShape(Shape shape) {
  switch (shape) {
    case Rectangle(Point(int x1, int y1), Point(int x2, int y2)) -> {
      System.out.printf("矩形坐标：(%d, %d) 到 (%d, %d)%n", x1, y1, x2, y2);
    }
    case Circle(Point center, int radius) -> {
      System.out.printf("圆心坐标：(%d, %d)，半径为：%d %n", center.x(), center.y(), radius);
    }
    case null -> {
      System.out.println("空对象");
    }
    default -> throw new IllegalStateException("Unexpected value: " + shape);
  }
}
```

```java [Shape]
public interface Shape {
}

public record Circle(Point center, int radius) implements Shape {
}

public record Rectangle(Point topLeft, Point bottomRight) implements Shape {
}
```

:::