# JDK8之前

## Date类

Java 中有两个包里有 Date 类，分别是 java.util.Date 和 java.sql.Date，前者是后者的父类包。



### java.util.Date包

java.util.Date包 包含时间和日期，可以精确到毫秒，适用于 <span style="color:#CC0000; font-weight:bold;">一般的日期和时间操作</span>，比如获取当前时间、计算时间差等。

|       构造器        |        作用        |
| :-----------------: | :----------------: |
|     new Date()      |     空参构造器     |
| new Date(long date) | 传递时间戳的构造器 |

常用方法：
|    方法    |         作用         |
| :--------: | :------------------: |
| toString() |     输出当前时间     |
| getTime()  | 获取当前时间的时间戳 |

```java {5,7,11,15}
import java.util.Date;

@Test
public void junitTest() {
  Date date = new Date();
  //获取当前时间
  String currentTime = date.toString();
  System.out.println(currentTime); //Sat Dec 14 22:15:38 CST 2024

  //获取时间戳
  long milliTime = date.getTime();
  System.out.println(milliTime);  //1734185738510

  //根据时间戳获取时间
  Date date1 = new Date(1734185738510L); //添加L，显式指明是long类型
  System.out.println(date1.toString());  //Sat Dec 14 22:15:38 CST 2024
}
```



### java.sql.Date包

java.sql.Date包只包含日期，没有时间部分，主要用于 <span style="color:#CC0000; font-weight:bold;">与数据库进行交互</span>，将 Java 的日期数据映射到数据库的 DATE 类型。

|       构造器        |        作用        |
| :-----------------: | :----------------: |
| new Date(long date) | 传递时间戳的构造器 |

```java {5,8}
import java.sql.Date;

@Test
public void junitTest() {
  Date date = new Date(1734185738510L);
  System.out.println(date.toString()); //2024-12-14

  long milliTime = date.getTime();
  System.out.println(milliTime);       //1734185738510
}
```



## SimpleDataFormat类

`SimpleDataFormat` 类是处理时间日期的一个工具类，属于 [java.text.DateFormat包](https://doc.qzxdp.cn/jdk/20/zh/api/java.base/java/text/SimpleDateFormat.html)下，主要用于 <span style="color:#CC0000; font-weight:bold;">将 Date 对象与字符串形式的日期和时间相互转换</span>。

>格式化（日期 → 文本）
>
>解析（文本 → 日期）

```java {8,11,15}
import java.text.ParseException;
import java.util.Date;
import java.text.SimpleDateFormat;

public static void main(String[] args) throws ParseException {
  Date now = new Date();
  //创建 SimpleDateFormat 对象，指定格式
  SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

  //格式化日期
  String strNow = sdf.format(now);
  System.out.println(strNow); //2024-12-15 11:09:57

  //解析字符串
  Date parsedDate = sdf.parse("2024-12-15 11:09:05");
  System.out.println(parsedDate); //Sun Dec 15 11:09:05 CST 2024
}
```



## Calender类

Calender类（日历类）是用来 <span style="color:#CC0000; font-weight:bold;">处理日期和时间的一个类</span>。在 Java1.1 版本中，Calender类 就已经取代了 Date 类中的很多方法。

它使用了 abstract关键字修饰，因此它不需要通过 new 创建实例，而是直接 **通过 `Calendar.getInstance()` 获取**。

常用方法：

|   方法    |          作用          |
| :-------: | :--------------------: |
|   get()   |    获取年月日时分秒    |
|   set()   | 自定义设置年月日时分秒 |
|   add()   |        添加时间        |
| getTime() |      获取当前时间      |
| setTime() |      设置当前时间      |

::: warning 注意

get() 和 set() 设置月份时，需要注意 0 表示一月份，0-11表示一年的12个月。

:::

```java {3,5-10,17,20,21,24,31}
public static void main(String[] args) {
  //获取Calendar实例
  Calendar calendar = Calendar.getInstance();

  int year = calendar.get(Calendar.YEAR);
  int month = calendar.get(Calendar.MONTH) + 1; //从0开始，0表示一月份
  int day = calendar.get(Calendar.DATE);
  int hour = calendar.get(Calendar.HOUR_OF_DAY);
  int minute = calendar.get(Calendar.MINUTE);
  int second = calendar.get(Calendar.SECOND);

  String strData = String
    .format("%04d-%02d-%02d %02d:%02d:%02d", year, month, day, hour, minute, second); 
  System.out.println(strData);     //2024-11-15 11:57:33

  //可以手动设置年月日时分秒
  calendar.set(Calendar.MONTH, 2); //手动设置为三月份

  //往前/往后添加时间
  calendar.add(Calendar.DATE, 5);   //当前时间往后加5天
  calendar.add(Calendar.DATE, -12); //当前时间往前推3天

  //获取当前时间
  Date time = calendar.getTime();   //Sun Mar 17 11:59:37 CST 2024
  SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
  String formatTime = sdf.format(time);
  System.out.println(formatTime);   //2024-12-17 11:59:37

  //手动设置时间
  Date now = new Date(1234235288845L);
  calendar.setTime(now);
  System.out.println(calendar.getTime()); //Tue Feb 10 11:08:08 CST 2009
}
```



::: details 练习题1

>需求：如何将 java.util.Date 下的时间转换为 java.sql.Date 下的时间？

思路：把 java.util.date 的时间转换为时间戳，再传递给 java.sql.date 的构造函数。

```java {3}
public static void main(String[] args) throws ParseException {
  java.util.Date date = new java.util.Date();
  java.sql.Date sqlDate = new java.sql.Date(date.getTime());
  System.out.println(sqlDate);
}
```

::: 



::: details 练习题2

>需求：如何把字符串类型的时间，转换为 java.sql.Date 下的时间？

思路：把字符串转为 java.util.Date 下的时间，然后再转为 java.sql.Date 的时间。

```java {4,5,8}
public static void main(String[] args) throws ParseException {
  String time = "2024-12-15";
  //将字符串形式的时间，转换为 util 下的时间
  SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
  Date date = sdf.parse(time);

  //再把 util 下的时间，转换为 sql 下的时间
  java.sql.Date sqlDate = new java.sql.Date(date.getTime());
  System.out.println(sqlDate); //2024-12-15
}
```

:::
