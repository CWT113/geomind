# String

在 java 中，`String` 是一个引用数据类型，它本身也是一个 `class`。但是，java 编译器对`String` 有特殊处理，即可以使用 `""` 来表示字符串。

下面三种声明方式等价：

```java
String s1 = "hello";

String s2 = new String("hello");
// 字符串内部也是转为了 char[] 数组
String s3 = new String(new char[]{'h', 'e', 'l', 'l', 'o'});
```



`String` 字符串最重要的一个特点就是 **不可变**。这种不可变性是通过内部的 `private final char[]` 字段实现的，并且没有任何修改 `char[]` 的方法。

下面的示例展示了 `String`字符串的不可变性：

```java
public static void main(String[] args) {
    String s = "hello";
    System.out.println(s); 	// hello

    var s1 = s.toUpperCase();
    System.out.println(s); 	// hello
    System.out.println(s1); // HELLO
}
```



## 字符串比较

当我们想要比较两个字符串是否相等时（即字符串内容是否相等），必须使用 `equals()` 而不能使用 `==`。

:::info TIP

1. 对于基本数据类型，直接使用 `==` 判断值是否相等即可；
2. 对于引用数据类型，`==` 比较的是地址值，而 `equals()` 比较的是内容是否相等；

:::

 ```java
 String s1 = "hello";
 String s2 = new String("hello"); 	// 重新开辟了内存空间
 
 System.out.println(s1 == s2); 		// false
 System.out.println(s1.equals(s2)); 	// true
 ```

结论：

1. 两个 `String` 类型的字符串比较，必须使用 `equals()` 方法；
2. 对于引用数据类型，我们可以在其内部重写 `equals()` 方法，从而达到简单判断引用类型的内容是否相等；



## 字符串格式化

字符串提供了 `formatted()` 和 `format()` 两个方法，可以用来替换占位符，然后生成新的字符串。

```java
String str = "Hi, %s, your score is %d";
var res1 = str.formatted("王一博", 90); // Hi, 王一博, your score is 90
var res2 = String.format(str, "王二博", 90); // Hi, 王二博, your score is 90
```

常用的占位符：

| 占位符 | 描述                                           |
| ------ | ---------------------------------------------- |
| %s     | 显示字符串                                     |
| %d     | 显示整数                                       |
| %x     | 显示十六进制整数                               |
| %f     | 显示浮点数，可以带格式，如：`%.2f`表示两位小数 |

>不确定用什么占位符的时候，就是用 `%s` ，因为它可以显示任何数据类型。聪明吧！


## 类型转换

要把任意基本类型或引用类型转换为字符串，可以使用静态方法 `valueOf()` 。

```java
String.valueOf(123); 	// "123"
String.valueOf(44.44); 	// "44.44"
String.valueOf(true); 	// "true"
String.valueOf(new Object()); // java.lang.Object@10f87f48
```

把字符串转为其他类型，就需要相应的类方法了：

- 把字符串转换为 `int` 类型：

  ```java
  Integer.parseInt("100"); 	// 100
  Integer.parseInt("ff", 16); // 十六进制转换，255
  ```

- 把字符串转为 `boolean` 类型：

  ```java
  Boolean.parseBoolean("true"); 	// true
  Boolean.parseBoolean("FALSE"); 	// false
  ```

  

## 常用方法

| 方法               | 描述                                    | 示例                                              |
| ------------------ | --------------------------------------- | ------------------------------------------------- |
| equalsIgnoreCase() | 忽略大小写                              | s1.equalsIgnoreCase(s2)                           |
| contains()         | 是否包含字符串                          | "hello".contains("he")                            |
| indexOf()          | 搜索字符所在位置的索引，查询不到返回 -1 | "hello".indexOf("e")                              |
| startsWith()       | 检查字符串是否以某字符开头              | "hello".startsWith("he")                          |
| endsWith()         | 检查字符串是否以某字符结尾              | "hello".endsWith("llo")                           |
| subString()        | 截取字符串，索引从0开始                 | "hello".substring(2)<br />"hello".substring(2, 4) |
| trim()             | 去除首尾空白字符                        | "  hello  ".trim()                                |
| strip()            | 去除首位空白字符，包括 \u3000           | "\u3000hello\u3000".strip()                       |
| stripLeading()     | 去除头部的空白字符，包括 \u3000         | " hello ".stripLeading()                          |
| stripTrailing()    | 去除尾部的空白字符，包括 \u3000         | " hello ".stripTrailing()                         |
| isEmpty()          | 判断字符串是否为空                      | " ".isEmpty()                                     |
| isBlank()          | 判断是否为空白字符串                    | "  ".isBlank()                                    |
| replace()          | 替换字符串                              | "hello".replace("ll", "~~")                       |
| split()            | 分割字符串                              | "h,e,l,l,o".split(",")                            |
| join()             | 拼接字符串                              | String.join(",", arr)                             |

```java
public static void main(String[] args) {
    System.out.println("hello".startsWith("he"));		// false
    System.out.println("hello".endsWith("llo"));		// true

    System.out.println("hello".substring(2)); 			// llo
    System.out.println("hello".substring(2, 4)); 		// ll

    System.out.println("  hello  ".trim()); 			// hello
    System.out.println("\u3000hello\u3000".strip()); 	// hello
    System.out.println("  \u3000 hello ".stripLeading()); // hello
    System.out.println(" hello ".stripTrailing()); 		// hello

    System.out.println("".isEmpty()); 		 // true
    System.out.println(" ".isEmpty()); 		 // false
    System.out.println("  ".isBlank()); 	 // true
    System.out.println(" hello ".isBlank()); // false

    System.out.println("hello".replace("ll", "~~")); // he~~o

    var str = "h,e,l,l,o".split(","); // ["h", "e", "l", "l", "o"]

    String[] arr = {"A", "B", "C"};
    System.out.println(String.join(",", arr)); 		// A,B,C
}
```