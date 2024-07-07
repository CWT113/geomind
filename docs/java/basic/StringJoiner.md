# StringJoiner

要高效拼接字符串，应该使用 `StringBuilder` 。

很多时候，我们可能会遇到下面的场景：

```java
String[] names = {"Tom", "Sunny", "WangYiBo"};

StringBuilder sb = new StringBuilder();
sb.append("Hello ");
for (String name : names) {
    sb.append(name).append("，");
}

// 去掉最后的 ，
sb.delete(sb.length() - 2, sb.length());

System.out.println(sb);
```

## StringJoiner

类似于分隔符拼接数组的场景很常见，所以 Java标准库提供了 `StringJoiner` 来简化上面的操作：

```java
String[] names = {"Tom", "Sunny", "WangYiBo"};
StringJoiner sj = new StringJoiner("，");
for (String name : names) {
    sj.add(name);
}
System.out.println(sj); // Tom，Sunny，WangYiBo
```

`StringJoiner` 还可以指定 前缀 和 后缀：

```java
StringJoiner sj = new StringJoiner("，", "Hello ", "!"); // Hello Tom，Sunny，WangYiBo!
```

## String.join()

`String.join()` 方法在内部使用了 `StringJoiner` 来拼接字符串，在不需要指定 前缀 和 后缀的时候，用 `String.join()` 更方便。

```java
String[] names = {"Tom", "Sunny", "WangYiBo"};
String s = String.join("，", names);
System.out.println(s); // Tom，Sunny，WangYiBo
```