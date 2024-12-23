# List 接口

`List` 接口定义了所有 List 集合应该具有的基本功能，比如添加元素、删除元素、查找元素等。

List 中的元素是有序的，即每个元素都有一个索引，可以通过索引访问元素，并且它允许元素重复。



## ArrayList

`ArrayList<T>` 是 List 接口的主要实现类，底层使用 **数组** 来存储元素，所以它的随机访问率很高，也就是通过索引查找元素的速度很快。

ArrayList 的大小是动态的，可以随意的扩容和缩容。

常用方法：

:::tip TIP

Collection 集合中的方法，ArrayList 也是可以使用的哦！

:::

| 方法                       | 作用                                                         |
| :------------------------- | ------------------------------------------------------------ |
| add(Object obj)            | 添加元素                                                     |
| add(int index, Object obj) | 在指定索引处添加元素                                         |
| addAll(Collection col)     | 添加一个集合到另一个集合中（集合合并）                       |
| remove(Object obj)         | 删除指定的元素，注意：删除数字时，需要使用包装类对象，否则会当索引删除 |
| remove(int index)          | 删除指定索引的元素                                           |
| set(int index, Object obj) | 修改指定索引处的旧元素为新元素                               |
| get(int index)             | 获取指定索引处的元素                                         |
| size()                     | 获取集合的元素数量                                           |
| isEmpty()                  | 判断集合是否为空                                             |
| contains()                 | 判断集合中是否包含某个元素                                   |
| clear()                    | 清空集合                                                     |

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

- 使用 iterator() 迭代器；
- 使用增强 for 循环；
- 使用原始 for 循环（因为它有索引的）；

```java
@Test
public void junitTest4() {
  List<String> list = new ArrayList<>();
  list.add("Tom");
  list.add("Sunny");
  list.add("王一博");

  //方式1
  Iterator<String> iterator = list.iterator();
  while (iterator.hasNext()) {
    System.out.println(iterator.next());
  }

  //方式2
  for (String s : list) {
    System.out.println(s);
  }

  //方式3
  for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
  }
}
```



## LinkedList

`LinkedList<T>` 是 List 接口的一个实现类，底层使用 **双向链表** 来存储元素。

LinkedList 也是 `Queue` 和 `Deque` 接口的实现类，因此可以用作 **队列** 和 **双端队列**。

LinkedList 和 ArrayList 的常用方法相同，包括遍历方式也相同：

```java
public static void main(String[] args) {
  List<String> list = new LinkedList<>();
  list.add("Apple");
  list.add("Banana");
  list.add("Cherry");

  list.add(1, "Blueberry");

  String fruit = list.get(2);  //Banana

  list.set(2, "Mango");

  list.remove("Apple");
  list.remove(0);

  int size = list.size();

  list.clear();
}
```

::: warning 重点

ArrayList 和 LinkedList 对比：

|     特性      |     ArrayList      |        LinkedList         |
| :-----------: | :----------------: | :-----------------------: |
|   底层结构    |      动态数组      |         双向链表          |
| 插入/删除效率 | 慢（需要移动元素） |    快（只需修改指针）     |
| 查询/修改效率 |   快（索引访问）   |    慢（需要遍历链表）     |
|   内存消耗    |        较少        |   较多（额外指针开销）    |
|   适合场景    | 读多写少，随机访问 | 插入/删除频繁，顺序访问多 |

:::



## Vector
