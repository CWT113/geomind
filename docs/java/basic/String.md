# String

在 java 中，<span style="color:#CC0000; font-weight:bold;">String 是一个引用数据类型</span>，它本身也是一个 class 类。但是，java 编译器对 String 有特殊处理，即可以使用 `""` 来表示字符串。



下面三种声明方式等价：

```java
String s1 = "hello";
String s2 = new String("hello");
//字符串内部也是转为了 char[] 数组
String s3 = new String(new char[]{'h', 'e', 'l', 'l', 'o'});
```

String 字符串最重要的一个特点就是 **不可变**。这种不可变性是通过内部的 `private final char[]` 字段实现的，并且没有任何修改 `char[]` 的方法。

::: tip 提示

JDK8 之前，String 类型用的是 private final char[] 存储，JDK8 之后，改为了 private final byte[] 存储，因为 byte 可以节省空间。

:::

下面的示例展示了 String 字符串的不可变性：

```java
public static void main(String[] args) {
  String s = "hello";
  System.out.println(s); 	//hello

  var s1 = s.toUpperCase();
  System.out.println(s); 	//hello
  System.out.println(s1); //HELLO
}
```



::: details 测试题

1. <span style="font-weight:bold;">对于 String 类型，给方法传递形参的时候，不管是 new String() 还是 ""，始终使用的是 <span style="color:#CC0000;">值类型传递</span></span>，因此 s.str 传递给 change 方法时，只传递的值，而不是引用地址，在内存中又重新创建了一个 str ，值指向了 "test ok"。
2. char[] 数组类型是可变的，因此会发生改变；

```java
String str = "hello";
char[] charArr = new char[]{'t', 'e', 's', 't'};

public void change(String str, char[] c) {
  str = "test ok";
  System.out.println(str); //test ok
  c[0] = 'b';
}

public static void main(String[] args) {
  StringTest1 s = new StringTest1();
  s.change(s.str, s.charArr);

  System.out.println(s.str); //hello
  System.out.println(s.charArr); //best
}
```

:::



## 字符串比较

当我们想要比较 <span style="color:#CC0000; font-weight:bold;">两个字符串是否相等时（即字符串内容是否相等），必须使用 `equals()` 而不能使用 `==`。</span>

:::info TIP

1. 对于基本数据类型，直接使用 `==` 判断值是否相等即可；
2. 对于引用数据类型，`==` 比较的是地址值，而 `equals()` 比较的是内容是否相等；

:::

 ```java
 String s1 = "hello";
 String s2 = new String("hello"); 	//重新开辟了内存空间
 
 System.out.println(s1 == s2); 		//false
 System.out.println(s1.equals(s2)); 	//true
 ```

结论：

1. 两个 `String` 类型的字符串比较，必须使用 `equals()` 方法；
2. 对于引用数据类型，我们可以在其内部重写 `equals()` 方法，从而达到简单判断引用类型的内容是否相等；



## 字符串格式化

字符串提供了 `formatted()` 和 `format()` 两个方法，可以用来替换占位符，然后生成新的字符串。

```java
String str = "Hi, %s, your score is %d";
var res1 = str.formatted("王一博", 90);      // Hi, 王一博, your score is 90
var res2 = String.format(str, "王二博", 90); // Hi, 王二博, your score is 90
```

常用的占位符：

| 占位符 | 描述                                           |
| :----: | ---------------------------------------------- |
|   %s   | 显示字符串                                     |
|   %d   | 显示整数                                       |
|   %x   | 显示十六进制整数                               |
|   %f   | 显示浮点数，可以带格式，如：`%.2f`表示两位小数 |

>不确定用什么占位符的时候，就是用 `%s` ，因为它可以显示任何数据类型。



## 类型转换

### 基本数据类型

要把 基本类型或引用类型 转换为字符串，有 2 种方法：

- 使用 `变量 + ""` 操作；
- 使用 `valueOf()` 方法；

::: code-group

```java [变量+""]
byte b = -128;
System.out.println(b + "");  //"-128"

double d1 = 12.345D;
System.out.println(d1 + ""); //"12.345"

float f1 = 12.3F;
System.out.println(f1 + ""); //"12.3"
```

```java [valueOf()]
String.valueOf(123);    //"123"
String.valueOf(44.44); 	//"44.44"
String.valueOf(true); 	//"true"
String.valueOf(new Object()); //java.lang.Object@10f87f48
```

:::

把 字符串 转为 基本数据类型，调用基本数据类型的 <span style="font-style:italic;">parseXXX()</span> 方法：

- 把字符串转换为 `int` 类型：

  ```java
  Integer.parseInt("100"); 	//100
  Integer.parseInt("ff", 16); //十六进制转换，255
  ```

- 把字符串转为 `boolean` 类型：

  ```java
  Boolean.parseBoolean("true"); 	//true
  Boolean.parseBoolean("FALSE"); 	//false
  ```




### 与char[]转换

```java {4,8}
public static void main(String[] args) {
  //char[] 转为 String
  char[] charArr1 = new char[]{'h', 'e', 'l', 'l', 'o'};
  String str1 = new String(charArr1); //hello

  //String 转 char[]
  String str2 = "hello";
  char[] charArr2 = str2.toCharArray();
  for (char c : charArr2) {
    System.out.println(c); //h e l l o
  }
}
```



### 与byte[]转换

String 转 byte[] 叫做 编码，byte[] 转 String 叫做 解码。

::: warning 注意

1. 在 UTF-8 字符集中，一个字母占 1 个字节，一个汉字占 3 个字节；
2. 在 GBK 字符集中，一个字母占 1 个字节，一个汉字占 2 个字节；
3. 编码和解码时，必须使用相同的字符集，否则会出现乱码；

:::

```java {5,6,13,18}
public static void main(String[] args) throws UnsupportedEncodingException {
  //String 转 byte[]
  String str1 = "hello中国";
  
  byte[] byteArr1 = str1.getBytes();      //默认UTF-8
  byte[] byteArr2 = str1.getBytes("GBK"); //使用GBK字符集
  
  for (byte b : byteArr1) {
    System.out.println(b);
  }

  //byte[] 转 String
  String str3 = new String(byteArr1);
  String str4 = new String(byteArr1, "UTF-8"); //和上面等价，默认就是UTF-8

  String str5 = new String(byteArr2); //中文乱码，因为编码是GBK，解码用了UTF-8 // [!code --]

  String str6 = new String(byteArr2, "GBK");
}
```



## 常用方法

|        方法        | 描述                                                         | 示例                                              |
| :----------------: | :----------------------------------------------------------- | ------------------------------------------------- |
| equalsIgnoreCase() | 忽略大小写                                                   | s1.equalsIgnoreCase(s2)                           |
|     contains()     | 是否包含字符串                                               | "hello".contains("he")                            |
|     indexOf()      | 搜索字符所在位置的索引，查询不到返回 -1                      | "hello".indexOf("e")                              |
|    startsWith()    | 检查字符串是否以某字符开头                                   | "hello".startsWith("he")                          |
|     endsWith()     | 检查字符串是否以某字符结尾                                   | "hello".endsWith("llo")                           |
|    subString()     | 截取字符串，索引从0开始，<span style="color:#CC00CC;">左闭右开</span> | "hello".substring(2)<br />"hello".substring(2, 4) |
|       trim()       | 去除首尾空白字符                                             | "  hello  ".trim()                                |
|      strip()       | 去除首位空白字符，包括 \u3000                                | "\u3000hello\u3000".strip()                       |
|   stripLeading()   | 去除头部的空白字符，包括 \u3000                              | " hello ".stripLeading()                          |
|  stripTrailing()   | 去除尾部的空白字符，包括 \u3000                              | " hello ".stripTrailing()                         |
|     isEmpty()      | 判断字符串是否为空                                           | " ".isEmpty()                                     |
|     isBlank()      | 判断是否为空白字符串                                         | "  ".isBlank()                                    |
|     replace()      | 替换字符串                                                   | "hello".replace("ll", "~~")                       |
|      split()       | 分割字符串                                                   | "h,e,l,l,o".split(",")                            |
|       join()       | 使用指定字符，拼接字符串                                     | String.join(",", arr)                             |
|       concat       | 将两个字符串连接起来，连接后的字符串是一个对象               | "hello".concat("world")                           |

```java
public static void main(String[] args) {
  System.out.println("hello".startsWith("he"));		//true
  System.out.println("hello".endsWith("llo"));		//true

  System.out.println("hello".substring(2)); 	    //llo
  System.out.println("hello".substring(2, 4)); 		//ll

  System.out.println("  hello  ".trim()); 			    //hello
  System.out.println("\u3000hello\u3000".strip()); 	    //hello
  System.out.println("  \u3000 hello ".stripLeading()); //hello
  System.out.println(" hello ".stripTrailing()); 		//hello

  System.out.println("".isEmpty()); 	   //true
  System.out.println(" ".isEmpty()); 	   //false
  System.out.println("  ".isBlank()); 	   //true
  System.out.println(" hello ".isBlank()); //false

  System.out.println("hello".replace("ll", "~~")); //he~~o

  var str = "h,e,l,l,o".split(","); //["h", "e", "l", "l", "o"]

  String[] arr = {"A", "B", "C"};
  System.out.println(String.join(",", arr)); //A,B,C
}
```