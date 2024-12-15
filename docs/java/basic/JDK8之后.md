# JDK8 之后

Java JDK1.0中包含了 Date 类，但是它的大部分方法在 JDK1.1 中被 Calendar 类所代替了，但是 Calendar 类也并不好用，她们面临的共同问题有：

- 可变性：像日期、时间这些类应该是不可变的，但是 Date 和 Calendar 类却可变；
- 偏移性：Date 中的年份是从 1900 年开始的，月份是从 0 开始的，存在偏移量；
- 格式化：格式化只对 Date 类生效，Calendar 类不行；
- 线程不安全：不能处理闰秒等情况；



因此，Java8 之后提供了新的时间 API，纠正了上面 API 的一些缺点，新的 API 包括：

- java.time：包含值对象的基础包
- java.time.chrono：提供对不同的日历系统的访问
- java.time.format：格式化和解析时间和日期
- java.time.temporal：包括底层框架和扩展特性
- java.time.zone：包括底层框架和扩展特性



## 本地日期时间

获取本地日期时间的API有 3 个：`LocalDate`、`LocalTime`、`LocalDateTime`。

常用方法：

|                             方法                             | 作用                                                         |
| :----------------------------------------------------------: | ------------------------------------------------------------ |
|                          **now()**                           | 静态方法，根据当前时间创建对象                               |
|               **of(yyyy, MM, dd, HH, mm, ss)**               | 静态方法，根据指定日期/时间创建对象                          |
|               getDayOfMonth() / getDayOfYear()               | 获取月份天数 / 获取年份天数                                  |
|                        getDayOfWeek()                        | 获取星期几，返回一个 DayOfWeek 枚举值                        |
|                          getYear()                           | 获取年份                                                     |
|                 getMonth() / getMonthValue()                 | 获取月份（枚举值）/ 获取月份(1-12)                           |
|            getHours() / getMinute() / getSecond()            | 获得当前对象对应的时、钟、秒                                 |
| withDayOfMonth() <br />withDayOfYear() <br />withMonth() <br />withYear() | 将月份天数、年份天数、月份、年份修改为指定的值并返回新的对象 |
| plusYears()<br />plusMonths()<br />plusWeeks()<br />plusDays()<br />plusHours() | 向当前对象添加年、月、周、天、小时                           |
| minusYears()<br />minusMonths()<br />minusWeeks()<br />minusDays()<br />minusHours() | 向当前对象减去年、月、周、天、小时                           |
|     plus(TemporalAmount t)<br />minus(TemporalAmount t)      | 添加或减少一个间隔或周期                                     |
|               **format(DateTimeFormatter  t)**               | 格式化本地日期、时间，返回一个字符串                         |
|                 **parse(Charsequence text)**                 | 将指定格式的字符串解析为日期、时间                           |

::: code-group

```java {3,4,5} [创建时间对象]
@Test
public void junitTest() {
  LocalDate localDate = LocalDate.now();
  LocalTime localTime = LocalTime.now();
  LocalDateTime localDateTime = LocalDateTime.now();

  System.out.println(localDate);     //2024-12-15
  System.out.println(localTime);     //16:24:14.497
  System.out.println(localDateTime); //2024-12-15T16:24:14.497
}
```

```java {4,5,6} [日期增加]
@Test
public void junitTest1() {
  LocalDate localDate = LocalDate.now();
  LocalDate localDate1 = localDate.plusYears(1);
  LocalDate localDate2 = localDate.plusMonths(2);
  LocalDate localDate3 = localDate.plusDays(10);

  System.out.println(localDate);  //2024-12-15
  System.out.println(localDate1); //2025-12-15
  System.out.println(localDate2); //2025-02-15
  System.out.println(localDate3); //2024-02-25
}
```

```java {3,4,5} [of方式时间减少]
@Test
public void junitTest2() {
  LocalDateTime localDateTime = LocalDateTime.of(2024, 3, 24, 12, 30, 20);
  LocalDateTime localDateTime1 = localDateTime.minusYears(1);
  LocalDateTime localDateTime2 = localDateTime.minusHours(2);

  System.out.println(localDateTime);  //2024-03-24T12:30:20
  System.out.println(localDateTime1); //2023-03-24T12:30:20
  System.out.println(localDateTime2); //2024-03-24T10:30:20
}
```

```java {4,8,13} [时间格式化与解析]
@Test
public void junitTest3() {
  //创建格式化器
  DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

  //时间格式化为字符串
  LocalDateTime now = LocalDateTime.now();
  String format = now.format(formatter);
  System.out.println(format); //2024-12-15 16:38:07

  //字符串解析为时间
  String str = "2024-12-15 16:38:07";
  LocalDateTime dateTime = LocalDateTime.parse(str, formatter);
  System.out.println(dateTime); //2024-12-15T16:38:07
}
```

:::



## Instant（瞬时）

Instant（瞬时）是时间线上的一个瞬时点，可以用来记录程序中事件的时间戳。

常用方法：

|             方法              | 作用                                                         |
| :---------------------------: | ------------------------------------------------------------ |
|             now()             | 静态方法，返回默认 UTC 时区对象                              |
|        toEpochMilli()         | 静态方法，返回当前时间的时间戳                               |
| ofEpochMilli(long epochMilli) | 静态方法，返回在1970-01-01 00:00:00基础上加上指定毫秒数之后的 Instant 类的对象 |
|  atOffset(ZoneOffset offset)  | 结合即时的偏移来创建一个 OffsetDateTime                      |

::: warning 注意

`Instant.now()` 返回的是 UTC 的时间，北京时间是以东八区为准，与 UTC 时间相差了 8 个小时。

:::

```java
@Test
public void junitTest4() {
  Instant now = Instant.now();
  System.out.println(now); //2024-12-15T08:49:14.984Z

  OffsetDateTime offsetDateTime = now.atOffset(ZoneOffset.ofHours(8)); //东八区，加8小时
  System.out.println(offsetDateTime); //2024-12-15T16:51:59.355+08:00

  long epochMilli = now.toEpochMilli();
  System.out.println(epochMilli); //1734252675600

  Instant instant = Instant.ofEpochMilli(1734552675600L);
  System.out.println(instant); //2024-12-18T20:11:15.600Z
}
```



## DateTimeFormatter

`DateTimeFormatter`类是用来格式化时间的，它提供了三种格式化方法：

- 预定义的标准格式（了解）：ISO_LOCAL_DATE_TIME、ISO_LOCAL_DATE、ISO_LOCAL_TIME；

- 本地化格式（了解）：如 ofLocalizedDate(FormatStyle.LONG)；

  |         格式          |                             参数                             |    适用于     |
  | :-------------------: | :----------------------------------------------------------: | :-----------: |
  | ofLocalizedDateTime() |  FormatStyle.LONG / FormatStyle.MEDIUM / FormatStyle.SHORT   | LocalDateTime |
  |   ofLocalizedDate()   | FormatStyle.FULL / FormatStyle.LONG / FormatStyle.MEDIUM / FormatStyle.SHORT |   LocalDate   |

- **自定义格式（重点）**：如 ofPattern(“yyyy-MM-dd HH:mm:ss”)；

  |            方法            | 作用                                               |
  | :------------------------: | -------------------------------------------------- |
  |        ofPattern()         | 静态方法，返回一个指定字符串格式 DateTimeFormatter |
  | format(TemporalAccessor t) | 格式化日期 / 时间，返回字符串                      |
  |  parse(CharSequence text)  | 将字符串解析为一个日期 / 时间                      |

  ::: code-group

  ```java [自定义格式（重点）] {6,7,10,11,16}
  @Test
  public void junitTest7() {
    LocalDateTime localDateTime = LocalDateTime.now();
  
    //时间转字符串
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    String format = localDateTime.format(formatter);
    System.out.println(format); //2024-12-15 17:42:58
  
    DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    String format1 = localDateTime.format(formatter1);
    System.out.println(format1); //2024-12-15
  
    //字符串转时间
    String strTime = "2024-12-15 16:38:07";
    LocalDateTime dateTime = LocalDateTime.parse(strTime, formatter);
    System.out.println(dateTime); //2024-12-15T16:38:07
  }
  ```

  ```java [预定义的标准格式] {5,9,13}
  @Test
  public void junitTest5() {
    LocalDateTime localDateTime = LocalDateTime.now();
  
    DateTimeFormatter isoLocalDateTime = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
    String format = localDateTime.format(isoLocalDateTime);
    System.out.println(format);  //2024-12-15T17:32:13.62
  
    DateTimeFormatter isoLocalDate = DateTimeFormatter.ISO_LOCAL_DATE;
    String format1 = localDateTime.format(isoLocalDate);
    System.out.println(format1); //2024-12-15
  
    DateTimeFormatter isoLocalTime = DateTimeFormatter.ISO_LOCAL_TIME;
    String format2 = localDateTime.format(isoLocalTime);
    System.out.println(format2); //17:32:13.62
  }
  ```

  ```java [本地化格式] {5,9,13}
  @Test
  public void junitTest6() {
    LocalDateTime localDateTime = LocalDateTime.now();
  
    DateTimeFormatter formatter = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.LONG);
    String format = localDateTime.format(formatter);
    System.out.println(format);  //2024年12月15日 下午05时35分10秒
  
    DateTimeFormatter formatter1 = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM);
    String format1 = localDateTime.format(formatter1);
    System.out.println(format1); //2024-12-15 17:36:08
  
    DateTimeFormatter formatter2 = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT);
    String format2 = localDateTime.format(formatter2);
    System.out.println(format2); //24-12-15 下午5:36
  }
  ```

  :::

  



## Duration和Period

`Duration` 类用于计算两个**时间之间的差值**，适用于 `LocalDateTime`。

`Period` 类用于计算两个**日期之间的差值**，适用于 `LocalDate` 。

::: code-group

```java [Duration] {6}
@Test
public void junitTest9() {
  LocalDateTime now = LocalDateTime.now();
  LocalDateTime before = LocalDateTime.of(2024, 12, 15, 12, 30, 00);

  Duration between = Duration.between(now, before);
  System.out.println(between.toDays());    //0
  System.out.println(between.toHours());   //-5
  System.out.println(between.toMinutes()); //-336
}
```

```java [Period] {6}
@Test
public void junitTest8() {
  LocalDate now = LocalDate.now();
  LocalDate before = LocalDate.of(2018, 11, 5);

  Period between = Period.between(now, before);
  System.out.println(between.getYears());  //-6
  System.out.println(between.getMonths()); //-1
  System.out.println(between.getDays());   //-10
}
```

:::
