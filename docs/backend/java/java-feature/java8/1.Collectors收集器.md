---
date: 2025-12-22 09:26:49
---

# Collectors（收集器）

> 🔖 **本节前览：** Java8 中 **流** 的新类 `java.util.stream.Collectors` 提供了大量操作流的方法。

## averagingXxx()

`Collectors.averagingXxx()` 方法用于将流中的所有元素视为 `Int`、`Double` 或 `Long` 类型，并计算它们的返回值。

该方法的返回值也是一个 `Collectors` 实例，因此可以进行链式调用。

> [!TIP] 提示
>
> `stram().collect()` 方法接收一个 **收集器实例** 作为其参数，并返回该收集器的计算结果。

|        方法         | 描述                          | 返回值类型  |
|:-----------------:|:----------------------------|:------:|
|  averagingInt()   | 把流中元素视为 Int 类型收集，然后计算平均值    | Double |
| averagingDouble() | 把流中元素视为 Double 类型收集，然后计算平均值 | Double |
|  averagingLong()  | 把流中元素视为 Long 类型收集，然后计算平均值   | Double |

```java {6,9,12}
@Test
@DisplayName("averagingXxx()计算平均值")
void testAveraging() {
  List<Integer> list = List.of(1, 2, 3, 4);

  Double collect1 = list.stream().collect(Collectors.averagingDouble(d -> d * 2));
  System.out.println(collect1); // 5.0

  Double collect2 = list.stream().collect(Collectors.averagingInt(d -> d * 2));
  System.out.println(collect2); // 5.0

  Double collect3 = list.stream().collect(Collectors.averagingLong(d -> d * 2));
  System.out.println(collect3); // 5.0
}
```

## summingXxx()

`Collectors.summingXxx()` 方法用于将流中的所有元素视为 `Int`、`Double` 或 `Long` 类型，并求和。

|             方法             | 描述                       |  返回值类型  |
|:--------------------------:|--------------------------|:-------:|
|  Collectors.summingInt()   | 把流中元素视为 Int 类型收集，然后求和    | Integer |
| Collectors.summingDouble() | 把流中元素视为 Double 类型收集，然后求和 | Double  |
|  Collectors.summingLong()  | 把流中元素视为 Long 类型收集，然后求和   |  Long   |

```java {6,10,14}
@Test
@DisplayName("summing()")
void testSumming() {
  List<Integer> list = List.of(1, 2, 3, 4);

  Integer collect1 = list.stream().collect(Collectors.summingInt(d -> d));
  Integer collect1 = list.stream().mapToInt(d -> d).sum(); // 简化代码 // [!code ++]
  System.out.println(collect1); // 10

  Double collect2 = list.stream().collect(Collectors.summingDouble(d -> d));
  Double collect2 = list.stream().mapToDouble(d -> d).sum(); // 简化代码 // [!code ++]
  System.out.println(collect2); // 10.0

  Long collect3 = list.stream().collect(Collectors.summingLong(d -> d));
  Long collect3 = list.stream().mapToLong(d -> d).sum(); // 简化代码 // [!code ++]
  System.out.println(collect3); // 10
}
```

## collectingAndThen()

`Collectors.collectingAndThen()` 方法接收两个参数，第一个参数用于 reduce 操作，第二个参数用于 map 操作。

```java {9}
@Test
@DisplayName("collectingAndThen()")
void testCollectingAndThen() {
  List<Integer> list = List.of(1, 2, 3, 4);

  // 先对每个元素先执行 s -> s * 2 操作，然后再执行 Collectors.averagingDouble(d -> d) 计算平均值
  Double collect = list
    .stream()
    .collect(Collectors.collectingAndThen(Collectors.averagingDouble(d -> d), s -> s * 2));
  System.out.println(collect); // 5.0
}
```

## counting()

`Collectors.counting()` 用于统计流中元素的个数。

```java {6}
@Test
@DisplayName("counting()")
void testCounting() {
  List<Integer> list = List.of(1, 2, 3, 4);

  Long count1 = list.stream().collect(Collectors.counting());  
  Long count2 = list.stream().count(); // 简化方式 // [!code ++]
  System.out.println(count1); // 4
  System.out.println(count2); // 4
}
```

## joining()

`Collectors.joining()` 方法用于流中的元素按拼接符拼接成一个字符串，并可添加可选的前缀和后缀。

```java {7,11,15,19}
@Test
@DisplayName("joining()")
void testJoining() {
  List<String> list = List.of("A", "B", "C");

  // 默认空字符串拼接
  String collect1 = list.stream().collect(Collectors.joining());
  System.out.println(collect1); // ABC

  // 指定字符串拼接
  String collect2 = list.stream().collect(Collectors.joining("-"));
  System.out.println(collect2); // A-B-C

  // 指定字符串拼接，并增加前缀和后缀
  String collect3 = list.stream().collect(Collectors.joining("-", "$", "￥"));
  System.out.println(collect3); // $A-B-C￥

  // 按 ', ' 拼接，前缀是 ' ，后缀也是 '
  String collect4 = list.stream().collect(Collectors.joining("', '", "'", "'"));
  System.out.println(collect4); // 'A', 'B', 'C'
}
```

## maxBy() 和 minBy()

`Collectors.maxBy()` 和 `Collectors.minBy()` 两个方法分别用于计算流中所有元素的最大值和最小值。

两个方法都接受一个比较器作为参数，用于计算最大值或最小值。

```java {6,10}
@Test
@DisplayName("maxBy()")
void testMaxBy() {
  List<Integer> list = List.of(1, 2, 3, 4);
  list.stream()
    .collect(Collectors.maxBy(new IntegerComp()))
    .ifPresent(i -> System.out.println(i));

  list.stream()
    .collect(Collectors.minBy(new IntegerComp()))
    .ifPresent(i -> System.out.println(i));

  list.stream()
    .max(new IntegerComp()) // 代码简化 // [!code ++]
    .ifPresent(System.out::println);

  list.stream()
    .min(new IntegerComp()) // 代码简化 // [!code ++]
    .ifPresent(System.out::println);
}

// 比较器
static class IntegerComp implements Comparator<Integer> {
  @Override
  public int compare(Integer o1, Integer o2) {
    return o1 >= o2 ? 1 : -1;
  }
}
```

## toList()

`Collectors.toList()` 方法用于将流中的所有元素导出到一个 List 集合中。

```java {4}
@Test
@DisplayName("toList()")
void testToList() {
  List<String> lists = Stream.of("A", "B", "C").collect(Collectors.toList());
  List<String> lists = Stream.of("A", "B", "C").toList(); // 简化代码 // [!code ++]
  for (String list : lists) {
    System.out.println(list);
  }
}
```

## toSet()

`Collectors.toSet()` 方法用于将流中所有元素导出到一个 Set 集合中，并去除重复元素。

```java {4}
@Test
@DisplayName("toSet()")
void testToSet() {
  Set<String> set = Stream.of("A", "B", "C", "A").collect(Collectors.toSet());
  for (String s : set) {
    System.out.print(s + "\t"); // A B C
  }
}
```

## toMap()

`Collectors.toMap()` 方法用于将流中的所有元素导出到一个 Map 哈希表中。

该方法第一个参数用于生成键 key，第二个参数用于生成值 value。

```java {4}
@Test
@DisplayName("toMap()")
void testToMap() {
  Map<String, String> map = Stream.of("A", "B", "C").collect(Collectors.toMap(k -> k, v -> v + "1"));
  map.forEach((k, v) -> {
    System.out.println("key: " + k + " value: " + v); // key: A value: A1
  });
}
```

