# List接口

List 接口定义了所有 List集合应该具有的基本功能，如添加元素、删除元素、查找元素等。

List 中的元素是有序的，即每个元素都有一个索引，可以通过索引访问元素，并且它允许元素重复。



## ArrayList

`ArrayList<T>` 是 List接口的主要实现类，底层使用 **动态数组** 来存储元素，所以它通过索引查找元素的速度很快。

ArrayList的大小是动态的，可以随意的扩容和缩容。

::: success ArrayList原理

底层结构：使用数组存储元素，元素增加时，如果数组空间不足，会自动扩容然后把原数组中的元素复制到扩容数组中。

特点：

- **动态扩容**：随着元素的增加而扩容，每当数组容量不足时，它会自动扩容并复制元素过去；
- **元素顺序**：元素是按照插入的顺序存储的；
- **线程不安全**：多个线程之间使用，注意并发问题；
- **按索引访问**：底层使用 Array 实现，因此可以使用索引访问元素；
- 允许null值

:::



常用方法：

:::info 提示

[Collection集合拥有的个方法](https://cwt113.github.io/Alikaid/backend/java/basic/Collection.html#%E5%B8%B8%E7%94%A8%E6%96%B9%E6%B3%95)，ArrayList也可以使用！

:::

|          方法          | 作用                                                         |
| :--------------------: | ------------------------------------------------------------ |
|        add(obj)        | 添加元素                                                     |
|    add(index, obj)     | 在指定索引处添加元素                                         |
| addAll(Collection col) | 添加一个集合到另一个集合中（集合合并）                       |
|      remove(obj)       | 删除指定的元素<br />注意：**删除数字时，需要使用包装类对象，否则会当索引删除** |
|     remove(index)      | 删除指定索引的元素                                           |
|    set(index, obj)     | 修改指定索引处的旧元素为新元素                               |
|       get(index)       | 获取指定索引处的元素                                         |
|         size()         | 获取集合的元素数量                                           |
|       isEmpty()        | 判断集合是否为空                                             |
|      contains(o)       | 判断集合中是否包含某个元素                                   |
|        clear()         | 清空集合                                                     |

::: code-group

```java [增] {9,12,13}
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

  //Iterator迭代器
  Iterator<String> iterator = list.iterator();
  while (iterator.hasNext()) {
    System.out.println(iterator.next());
  }

  //增强for循环
  for (String s : list) {
    System.out.println(s);
  }

  //原始for循环
  for (int i = 0; i < list.size(); i++) {
    System.out.println(list.get(i));
  }
}
```



## LinkedList

`LinkedList<T>` 也是 List接口的一个实现类，底层使用 **双向链表** 来存储元素。

LinkedList 也是 `Queue` 和 `Deque` 接口的实现类，因此可以用作 **队列** 和 **双端队列**。



::: success LinkedList原理

底层结构：底层是由一组节点组成的链表，每个节点包含

- data：当前节点数据
- next：指向下一个节点的引用
- prev：指向前一个节点的引用

特点：

- **双向链表**：每个元素节点都有指向前后元素的指针，因此可以方便的进行双向遍历；
- **动态大小**：与 ArrayList 类似，它也是动态扩容的，没有固定大小；
- **插入和删除效率高**：插入和删除元素效率高，但是查询效率慢（要遍历链表）；
- **随机访问性差**：访问链表中第 n 个元素，必须从头开始遍历；
- **内存消耗大**：每个节点要存储前一个和下一个节点的引用，内存开销大；
- **线程不安全**：多线程环境中使用，需要注意并发问题；

使用场景：

- **插入/删除数据频繁**：需要在列表头部或中间插入/删除元素时，LinkedList 比 ArrayList 更高效；
- **大数据量顺序访问**：按顺序遍历大数据量时，链表结构可以避免 _内存碎片_；
- **不需要频繁随机访问**：因为链表的随机访问性差，所以主要适合于头尾操作，查询多的场景应该使用 ArrayList；

:::

LinkedList也拥有 Collection集合的方法，但它也有自己的方法：

|     方法      | 作用                                                 |
| :-----------: | ---------------------------------------------------- |
| addFirst(obj) | 往列表最前面添加一个元素                             |
| addLast(obj)  | 往列表最后面添加一个元素                             |
|  getFirst()   | 获取第一个元素                                       |
|   getLast()   | 获取最后一个元素                                     |
| removeFirst() | 移除第一个元素                                       |
| removeLast()  | 移除最后一个元素                                     |
|     pop()     | 弹出列表第一个元素（底层还是使用了 removeFirst() ）  |
|    push()     | 弹出列表最后一个元素（底层还是使用了 removeLast() ） |

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



## Vector

Vector 也是 List接口的一个实现类，底层也是使用 **动态数组** 来存储元素，它在 Java 1.0 版本就存在，是早期 List 接口的实现者，后来 List取代了它的地位。

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

 ::: info 提示

1. Vector 的方法是同步的，每个方法都有 `synchronized` 关键字，确保在多线程环境下不会发生数据不一致的情况；

2. ArrayList 是非线程安全的，如果在多线程环境下使用，需要手动加锁：

   ```java
   List<String> list = Collections.synchronizedList(new ArrayList<>());
   ```

:::
