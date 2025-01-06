# List 接口

`List` 接口定义了所有 List 集合应该具有的基本功能，比如添加元素、删除元素、查找元素等。

List 中的元素是有序的，即每个元素都有一个索引，可以通过索引访问元素，并且它允许元素重复。



## ArrayList

`ArrayList<T>` 是 List 接口的主要实现类，底层使用 **数组** 来存储元素，所以它的随机访问率很高，也就是通过索引查找元素的速度很快。

ArrayList 的大小是动态的，可以随意的扩容和缩容。

常用方法：

:::info TIP

Collection 集合中的 15 个方法，ArrayList 也可以使用！

:::

| 方法                     | 作用                                                         |
| :----------------------- | ------------------------------------------------------------ |
| add(Object o)            | 添加元素                                                     |
| add(int index, Object o) | 在指定索引处添加元素                                         |
| addAll(Collection col)   | 添加一个集合到另一个集合中（集合合并）                       |
| remove(Object o)         | 删除指定的元素，注意：删除数字时，需要使用包装类对象，否则会当索引删除 |
| remove(int index)        | 删除指定索引的元素                                           |
| set(int index, Object o) | 修改指定索引处的旧元素为新元素                               |
| get(int index)           | 获取指定索引处的元素                                         |
| size()                   | 获取集合的元素数量                                           |
| isEmpty()                | 判断集合是否为空                                             |
| contains(Object o)       | 判断集合中是否包含某个元素                                   |
| clear()                  | 清空集合                                                     |

::: code-group

```java [增] {4,9,13}
@Test
public void junitTest() {
  List<String> list = new ArrayList<>();
  list.add("Tom");
  list.add("Sunny");
  list.add("王一博");
  System.out.println(list); //[Tom, Sunny, 王一博]

  list.add(1, "陈伟霆");
  System.out.println(list); //[Tom, 陈伟霆, Sunny, 王一博]

  List<String> list1 = Arrays.asList("1", "2", "3");
  list.addAll(list1);
  System.out.println(list); //[Tom, 陈伟霆, Sunny, 王一博, 1, 2, 3]
}
```

```java [删] {9,10}
@Test
public void junitTest1() {
  List<Object> list = new ArrayList<>();
  list.add("Tom");
  list.add(100);
  list.add(200);
  list.add(300);

  list.remove(1); //删除索引是 1 的元素
  list.remove(Integer.valueOf(200)); //删除值为 200 的元素
  System.out.println(list); //[Tom, 300]
}
```

```java [改] {8}
@Test
public void junitTest2() {
  List<String> list = new ArrayList<>();
  list.add("Tom");
  list.add("Sunny");
  list.add("王一博");

  list.set(1, "陈伟霆");
  System.out.println(list); //[Tom, 陈伟霆, 王一博]
}
```

```java [查] {8}
@Test
public void junitTest3() {
  List<String> list = new ArrayList<>();
  list.add("Tom");
  list.add("Sunny");
  list.add("王一博");

  String s = list.get(1);
  System.out.println(s); //Sunny
}
```

:::



遍历方法：

- 使用 `iterator()` 迭代器；
- 使用增强 for 循环；
- 使用原始 for 循环（因为它有索引的）；

```java
@Test
public void junitTest4() {
  List<String> list = new ArrayList<>();
  list.add("Tom");
  list.add("Sunny");
  list.add("王一博");

  //方式1 Iterator迭代器
  Iterator<String> iterator = list.iterator();
  while (iterator.hasNext()) {
    System.out.println(iterator.next());
  }

  //方式2 增强 for 循环
  for (String s : list) {
    System.out.println(s);
  }

  //方式3 原始 for 循环
  for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
  }
}
```



## LinkedList

`LinkedList<T>` 是 List 接口的一个实现类，底层使用 **双向链表** 来存储元素。

LinkedList 也是 `Queue` 和 `Deque` 接口的实现类，因此可以用作 **队列** 和 **双端队列**。



::: 使用场景

1. **插入/删除数据频繁**：需要在列表头部或中间插入/删除元素时，LinkedList 比 ArrayList 更高效；
2. **大数据量顺序访问**：按顺序遍历大数据量时，链表结构可以避免 _内存碎片_；
3. **不需要频繁随机访问**：因为链表的随机访问性差，所以主要适合于头尾操作，查询多的场景应该使用 ArrayList；

:::



LinkedList 也拥有 Collection 集合的方法，但它也有自己的方法：

| 方法               | 作用                                                 |
| ------------------ | ---------------------------------------------------- |
| addFirst(Object o) | 往列表最前面添加一个元素                             |
| addLast(Object o)  | 往列表最后面添加一个元素                             |
| getFirst()         | 获取第一个元素                                       |
| getLast()          | 获取最后一个元素                                     |
| removeFirst()      | 移除第一个元素                                       |
| removeLast()       | 移除最后一个元素                                     |
| pop()              | 弹出列表第一个元素（底层还是使用了 removeFirst() ）  |
| push()             | 弹出列表最后一个元素（底层还是使用了 removeLast() ） |

::: code-group

```java [继承方法]
public static void main(String[] args) {
  List<String> linkedList = new LinkedList<>();
  linkedList.add("Apple");
  linkedList.add("Banana");
  linkedList.add("Cherry");

  linkedList.add(1, "Blueberry");

  String fruit = linkedList.get(2);

  linkedList.set(2, "Mango");

  linkedList.remove("Apple");
  linkedList.remove(0);

  int size = linkedList.size();

  linkedList.clear();
}
```

```java [自有方法]
public static void main(String[] args) {
  LinkedList<String> linkedList = new LinkedList<>();
  linkedList.add("张三");
  linkedList.add("李四");
  linkedList.add("王五");
  linkedList.add("赵六");

  linkedList.addFirst("王一博");

  linkedList.addLast("陈伟霆");

  String first = linkedList.getFirst();

  String last = linkedList.getLast();

  linkedList.removeFirst();

  linkedList.removeLast();

  linkedList.pop();

  linkedList.push("彭于晏");
}
```

:::

ArrayList 和 LinkedList 对比：

|     特性      |     ArrayList      |        LinkedList         |
| :-----------: | :----------------: | :-----------------------: |
|   底层结构    |      动态数组      |         双向链表          |
| 插入/删除效率 | 慢（需要移动元素） |    快（只需修改指针）     |
| 查询/修改效率 |   快（索引访问）   |    慢（需要遍历链表）     |
|   内存消耗    |        较少        |   较多（额外指针开销）    |
|   适合场景    | 读多写少，随机访问 | 插入/删除频繁，顺序访问多 |



## Vector（了解）

`Vector` 也是 List 接口的一个实现类，底层也是使用 **动态数组** 来存储元素，它在 Java 1.0 版本就存在，是早期 List 接口的实现者，后来 List 取代了它的地位。

Vector 和 ArrayList 都是可变长度的数组结构，**区别在于 Vector 是线程安全的，而 ArrayList 线程不安全**。

```java
public static void main(String[] args) {
  List<String> vector = new Vector<>();
  vector.add("Apple");
  vector.add("Banana");
  vector.add("Orange");

  vector.add(1, "Blueberry");

  String fruit = vector.get(2);

  vector.set(3, "Mango");

  vector.remove("Mango");
  vector.remove(0);

  int size = vector.size();

  vector.clear();
}
```

ArrayList 和 Vector 对比：

|   特性   |      ArrayList       |                  Vector                  |
| :------: | :------------------: | :--------------------------------------: |
| 线程安全 |        不安全        |       线程安全，所有方法自带同步锁       |
|   性能   |          快          |           慢（线程安全导致慢）           |
| 扩容方式 |     扩容 1.5 倍      |                扩容 2 倍                 |
| 适合场景 | 读多写少，单线程环境 |        多线程环境，有同步访问需求        |
| 遍历方式 |   迭代器 Iterator    | 早期：枚举器 Enumeration；现在：Iterator |

 ::: info

1. Vector 的方法是同步的，每个方法都有 `synchronized` 关键字，确保在多线程环境下不会发生数据不一致的情况；

2. ArrayList 是非线程安全的，如果在多线程环境下使用，需要手动加锁：

   ```java
   List<String> list = Collections.synchronizedList(new ArrayList<>());
   ```

:::
