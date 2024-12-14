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







