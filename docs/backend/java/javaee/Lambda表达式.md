---
date: 2025-12-23 15:34:28
---

# Lambda 表达式

Lambda 表达式是 Java8 引入的重要新特性之一，本质上是一个 **匿名函数**（没有名称的函数），它允许将函数作为方法参数，使代码更简洁、可读性更强。

## 基本语法

> [!NOTE] Lambda 表达式特点
>
> - **参数类型可省略：** 不需要声明参数类型，编译器可以自动推断；
> - **参数小括号可省略：** 如果只有一个参数，可省略参数周围的小括号；
> - **方法体大括号可省略：** 如果方法体只有一行语句，可省略大括号；
> - **return 关键字可省略：** 如果方法体只有一行语句，并且该语句的值就作为返回值返回，则可以省略 `return`；

```java
// 无参数
() -> System.out.println("Hello World");

// 一个参数（可省略括号）
x -> x * x;

// 多个参数
(x, y) -> x + y;

// 指定参数类型
(int x, int y) -> x + y

// 有多行语句
(a, b) -> {
  int c = a + b;
  system.out.println("Hello World");
  return c;
}
```



## 常见示例

### 线程创建

```java {12}
public static void main(String[] args) {
  // 传统匿名内部类
  Runnable r1 = new Runnable() {
    @Override
    public void run() {
      System.out.println("Hello World");
    }
  };
  new Thread(r1).start();

  // Lambda表达式
  Runnable r2 = () -> System.out.println("Hello World");
  new Thread(r2).start();
}
```



### 集合操作

```java {13,18}
public static void main(String[] args) {
  List<Integer> list = Arrays.asList(4, 2, 1, 5, 6);

  // 传统方式排序
  Collections.sort(list, new Comparator<Integer>() {
    @Override
    public int compare(Integer o1, Integer o2) {
      return o1.compareTo(o2);
    }
  });

  // Lambda 表达式
  Collections.sort(list, (a, b) -> a.compareTo(b));
  // 方法引用简化
  Collections.sort(list, Integer::compareTo); // [!code ++]

  // 集合排序，不借助 Collections
  list.sort((a, b) -> a.compareTo(b));
  // 方法引用简化（推荐）
  list.sort(Integer::compareTo); // [!code ++]
}
```



### Stream 流操作

```java {6,7}
public static void main(String[] args) {
  List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);

  // 过滤偶数，并计算平方
  List<Integer> result = list.stream()
    .filter(n -> n % 2 == 0) // Lambda表达式作为谓词
    .map(n -> n * n) // Lambda表达式作为函数
    .toList();
  System.out.println(result); // [4, 16]
}
```

> [!TIP] 什么是 Lambda 表达式的谓词和函数？
>
> - **作为谓词：** 表示是一个返回 `boolean` 值的函数，主要用于测试条件是否成立，如 筛选、过滤等；
>
>   ```java
>   List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
>   
>   // 检查是否以"A"开头
>   names.stream().filter(name -> name.startsWith("A"));
>   // 检查长度是否大于3
>   names.stream().filter(name -> name.length() > 3);
>   ```
>
> - **作为函数：** 表示接收一个输入，返回一个（可能不同类型的）输出，主要用于转换数据，如映射、转换；
>
>   ```java
>   // 类型转换
>   List<String> nums = Arrays.asList("1", "2", "3");
>   nums.stream().map(s -> Integer.parseInt(s));
>         
>   // 获取字符串长度
>   List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
>   names.stream().map(name -> name.length());
>   ```



### 自定义函数接口

```java {8}
public class LambdaTest {
  interface Calculator {
    int add(int a, int b);
  }

  public static void main(String[] args) {
    // Lambda 表达式
    Calculator calculator = (a, b) -> a + b;
    // 方法引用
    Calculator calculator2 = Integer::sum; // [!code ++]
    int added = calculator.add(10, 20);
    System.out.println(added);
  }
}
```





## 外部参数

因为 Lambda 表达式其实是函数接口的内联实现，也就是匿名内部类，因此可以 **引用表达式外的变量或者常量。**

但是，Lambda 表达式对外部的变量是有要求的：

- 如果不是当前作用域内声明的变量，可随意使用；
- 如果是当前作用域内声明的变量：
  - 要么不要进行二次赋值；
  - 要么使用 `final` 关键字修饰；

::: code-group

```java [外部变量] {7,13,14}
public class LambdaTest {
  interface GreetingService {
    void sayMessage(String message);
  }

  // 作用域外声明的变量
  static String name = "sunny";

  public static void main(String[] args) {
    name = "tom";

    // 使用函数式接口接收 Lambda 表达式
    GreetingService service = message -> System.out.println(message + name);
    service.sayMessage("Hello, "); // Hello, Amy

    name = "amy";
  }
}
```

```java [内部变量] {10,11}
public class LambdaTest {
  interface GreetingService {
    void sayMessage(String message);
  }

  public static void main(String[] args) {
    // 作用域内部声明的变量
    final String name = "world"; // 建议使用 final 修饰

    GreetingService service = message -> System.out.println(message + name);
    service.sayMessage("Hello, "); // Hello, world

    // name = "tom"; // 报错：不允许被修改 // [!code --]
  }
}
```

:::
