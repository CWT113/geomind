---
date: 2026-06-17 13:40:55
---

# String 类

在 Java 中，`String` 类是使用最频繁的类之一，它位于 `java.lang` 包中，专门用来表示和操作 **字符串文本数据**。

> [!NOTE] 核心特性：不可变性
>
> Java 中的 `String` 对象是一旦创建就 **不可更改** 的。
>
> - 原理：在底层，字符串其实是一用字符数组（Java9 之后为了优化内存，改成了 **字节数组 `byte[]`**）来存储的，并且这个数组被修饰为 `private final`；
> - 表现：当对一个字符串进行拼接、裁剪或替换操作时，**并不会修改原字符串**，而是会创建一个全新的 `String` 对象；
>
> 因此，频繁修改字符串（如在循环中拼接）会产生大量垃圾对象，影响性能。这种情况下建议使用 `StringBuilder`（线程不安全，但效率高）或 `StringBuffer`（线程安全）。



## 创建字符串

创建字符串的方式主要有 2 种，但是它们在内存中的处理机制完全不同。



### 字面量赋值

字面量赋值方式创建的字符串，JVM 会先去内存中的 **字符串常量池** 种检查 “Hello” 是否存在。如果存在，直接把引用指向它，如果不存在，则在常量池中创建。

```java
public static void main(String[] args) {
  String s1 = "Hello";
  String s2 = "Hello";
  System.out.println(s1 == s2); // true
}
```

示例中的 `s1 == s2` 结果为 true，是因为它们指向同一个内存地址。



### 构造函数

构造函数创建的字符串，不管常量池里有没有 “Hello”，`new` 都会在 **堆内存中强制开辟一块新的空间** 来存放这个字符串对象。

```java
public static void main(String[] args) {
  String s1 = new String("Hello");
  String s2 = new String("Hello");
  System.out.println(s1 == s2); // false
}
```

示例中的 `s1 == s2` 结果为 false，是因为它们二者的地址不同。



## 字符串比较

由于 `String` 是一个对象（引用数据类型），而不是像 `int` 或 `double` 那样的基本数据类型，所以在比较时：

- 使用 `==`：比较的是两个字符串的内存地址；
- 使用 `equals()`：比较的是两个字符串的内容是否完全一致；

```java
public static void main(String[] args) {
  String s1 = "Hello";
  String s2 = "Hello";
  System.out.println(s1 == s2); // true
  System.out.println(s1.equals(s2)); // true

  String s3 = new String("Hello");
  String s4 = new String("Hello");
  System.out.println(s3 == s4); // false
  System.out.println(s3.equals(s4)); // true
}
```

::: info 防报错小技巧

在使用 `equals()` 时，如果变量为 null，调用方法会抛出空指针异常。因此为了安全起见，推荐把确定不为 null 的常量写在前面：

```java
public static void main(String[] args) {
  String s1 = null;
  // 报错：NullPointerException空指针异常
  System.out.println(s1.equals("Hello")); // [!code --]
  // 可以防止空指针异常
  System.out.println("Hello".equals(s1)); // [!code ++]
  System.out.println(Objects.equals(s1, "Hello")); // Java7的Objects工具类 // [!code ++]
}
```

:::



## 常用方法

### 查找与获取

|     方法      | 描述                                      |
| :-----------: | ----------------------------------------- |
|   length()    | 返回字符串长度                            |
| charAt(index) | 获取指定索引处的字符                      |
| indexOf(str)  | 查找子串第一次出现的索引，找不到返回 `-1` |

```java
public static void main(String[] args) {
  String s1 = "Hello World";
  System.out.println(s1.length()); // 1
  System.out.println(s1.charAt(0)); // H
  System.out.println(s1.indexOf("W")); // 6
}
```



### 

### 比较与判断

|         方法         | 描述                             |
| :------------------: | -------------------------------- |
|      equals(s2)      | 比较两个字符串内容是否相等       |
| equalsIgnoreCase(s2) | 忽略大小写比较字符串内容是否相等 |
|     contains(s2)     | 判断是否包含某个子串             |
|    startsWith(s2)    | 判断字符串是否以某某开头         |
|     endsWith(s2)     | 判断字符串是否以某某结尾         |

```java
public static void main(String[] args) {
  String s1 = "Hello World";
  System.out.println("Hello World".equals(s1)); // true
  System.out.println("hello world".equalsIgnoreCase(s1)); // true
  System.out.println(s1.contains("World")); // true
  System.out.println(s1.startsWith("He")); // true
  System.out.println(s1.endsWith("ld")); // true
}
```



### 转换与操作

|         方法          | 描述                                          |      |
| :-------------------: | --------------------------------------------- | ---- |
|     toLowerCase()     | 字符串转小写                                  |      |
|     toUpperCase()     | 字符串转大写                                  |      |
| substring(start, end) | 截取字符串，左闭右开                          |      |
| replace(str, target)  | 替换字符串                                    |      |
|        trim()         | 去除首位空格                                  |      |
|        strip()        | 去除首位空格（Java11 引入，能更好的处理空格） |      |
|       isEmpty()       | 判断字符串是否为空                            |      |
|      concat(str)      | 拼接字符串                                    |      |

```java
public static void main(String[] args) {
  String s1 = "Hello World";
  System.out.println(s1.toLowerCase()); // hello world
  System.out.println(s1.toUpperCase()); // HELLO WORLD
  System.out.println(s1.substring(0, 5)); // Hello
  System.out.println(s1.replace("Hello", "你好")); // 你好 World
  System.out.println(s1.trim()); // Hello World
  System.out.println(s1.strip()); // Hello World
  System.out.println(s1.isEmpty()); // false
  System.out.println(s1.concat(" 666")); // Hello World 666
}
```



## StringBuilder

前面提到，`String` 是不可变的，每次拼接等操作都会重新生成新的对象，这会非常消耗内存和性能。

而 `StringBuilder` 和 `StringBuffer` 就是专门用来 **处理可变字符串** 的工具类。这两个 API 的用法几乎一模一样，唯一的区别在于 **线程安全**：

|     类名      | 线程安全 |         性能         |  使用场景  |
| :-----------: | :------: | :------------------: | :--------: |
| StringBuilder |  不安全  |          高          | 单线程环境 |
| StringBuffer  |   安全   | 低（因为加了同步锁） | 多线程环境 |

::: code-group

```java [错误示范]
public static void main(String[] args) {
  String str = "";
  for (int i = 0; i < 2000; i++) {
    str += i;
  }
  System.out.println(str);
}
```

```java [正确示范]
public static void main(String[] args) {
  StringBuilder sb = new StringBuilder();
  for (int i = 0; i < 2000; i++) {
    sb.append(i);
  }
  String result = sb.toString();
  System.out.println(result);
}
```

:::



## StringBuffer

`StringBuilder` 和 `StringBuffer` 这两个使用的时候，最核心的操作就是 **追加（拼接）、插入、删除和反转**。

```java {2,4,7,10,13,17}
public static void main(String[] args) {
  StringBuffer sb = new StringBuffer("Hello");

  sb.append(", ").append("Java").append(20);
  System.out.println(sb); // Hello, Java20

  sb.insert(5, " World");
  System.out.println(sb); // Hello World, Java20

  sb.delete(11, 17);
  System.out.println(sb); // Hello World20

  sb.reverse();
  System.out.println(sb); // 02dlroW olleH

  sb.reverse();
  String result = sb.toString();
  System.out.println(result); // Hello World20
}
```

