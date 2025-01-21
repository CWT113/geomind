# List接口

List 接口定义了所有 List集合应该具有的基本功能，如添加元素、删除元素、查找元素等。

List 中的元素是有序的，即每个元素都有一个索引，可以通过索引访问元素，并且它允许元素重复。



## ArrayList

`ArrayList<T>` 是 List接口的主要实现类，底层使用 **数组** 来存储元素，所以它通过索引查找元素的速度很快。

ArrayList的大小是动态的，可以随意的扩容和缩容。

常用方法：

:::info 提示

[Collection集合拥有的个方法](https://cwt113.github.io/Alikaid/backend/java/basic/Collection.html#%E5%B8%B8%E7%94%A8%E6%96%B9%E6%B3%95)，ArrayList也可以使用！

:::

|           方法           | 作用                                   |
| :----------------------: | :------------------------------------- |  |  |
|         add(obj)         | 添加元素                               |
|     add(index, obj)      | 在指定索引处添加元素                   |
|  addAll(Collection col)  | 添加一个集合到另一个集合中（集合合并） |
|     remove(Object o)     |                                        | size() | 获取集合元素数量 |
|                          |                                        |
| set(int index, Object o) | 修改指定索引处的旧元素为新元素         |
|      get(int index)      | 获取指定索引处的元素                   |
|          size()          | 获取集合的元素数量                     |
|        isEmpty()         | 判断集合是否为空                       |
|    contains(Object o)    | 判断集合中是否包含某个元素             |
|         clear()          | 清空集合                               |

::: code-group

```java [增] {4,9,13}
1
@Test
2
public void junitTest() {
3
  List<String> list = new ArrayList<>();
4
  list.add("Tom");
5
  list.add("Sunny");
6
  list.add("王一博");
7
  System.out.println(list); //[Tom, Sunny, 王一博]
8
​
9
  list.add(1, "陈伟霆");
10
  System.out.println(list); //[Tom, 陈伟霆, Sunny, 王一博]
11
​
12
  List<String> list1 = Arrays.asList("1", "2", "3");
13
  list.addAll(list1);
14
  System.out.println(list); //[Tom, 陈伟霆, Sunny, 王一博, 1, 2, 3]
15
}
```

```java [删] {9,10}
1
@Test
2
public void junitTest1() {
3
  List<Object> list = new ArrayList<>();
4
  list.add("Tom");
5
  list.add(100);
6
  list.add(200);
7
  list.add(300);
8
​
9
  list.remove(1); //删除索引是 1 的元素
10
  list.remove(Integer.valueOf(200)); //删除值为 200 的元素
11
  System.out.println(list); //[Tom, 300]
12
}
```

## java [改] {8}
1
@Test
2
public void junitTest2() {
3
  List<String> list = new ArrayList<>();
4
  list.add("Tom");
5
  list.add("Sunny");
6
  list.add("王一博");
7
​
8
  list.set(1, "陈伟霆");
9
  System.out.println(list); //[Tom, 陈伟霆, 王一博]
10
}
##

```java [查] {8}
1
@Test
2
public void junitTest3() {
3
  List<String> list = new ArrayList<>();
4
  list.add("Tom");
5
  list.add("Sunny");
6
  list.add("王一博");
7
​
8
  String s = list.get(1);
9
  System.out.println(s); //Sunny
10
}
```

:::



遍历方法：

- 使用 `iterator()` 迭代器；

- 使用增强 for 循环；

- 使用原始 for 循环（因为它有索引的）；

```java
1
@Test
2
public void junitTest4() {
3
  List<String> list = new ArrayList<>();
4
  list.add("Tom");
5
  list.add("Sunny");
6
  list.add("王一博");
7
​
8
  //方式1 Iterator迭代器
9
  Iterator<String> iterator = list.iterator();
10
  while (iterator.hasNext()) {
11
    System.out.println(iterator.next());
12
  }
13
​
14
  //方式2 增强 for 循环
15
  for (String s : list) {
16
    System.out.println(s);
17
  }
18
​
19
  //方式3 原始 for 循环
20
  for (int i = 0; i < list.size(); i++) {
21
    System.out.println(list.get(i));
22
  }
23
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

|        方法        | 作用                                                 |
| :----------------: | ---------------------------------------------------- |
| addFirst(Object o) | 往列表最前面添加一个元素                             |
| addLast(Object o)  | 往列表最后面添加一个元素                             |
|     getFirst()     | 获取第一个元素                                       |
|     getLast()      | 获取最后一个元素                                     |
|   removeFirst()    | 移除第一个元素                                       |
|    removeLast()    | 移除最后一个元素                                     |
|       pop()        | 弹出列表第一个元素（底层还是使用了 removeFirst() ）  |
|       push()       | 弹出列表最后一个元素（底层还是使用了 removeLast() ） |

::: code-group

```java [继承方法]
1
public static void main(String[] args) {
2
  List<String> linkedList = new LinkedList<>();
3
  linkedList.add("Apple");
4
  linkedList.add("Banana");
5
  linkedList.add("Cherry");
6
​
7
  linkedList.add(1, "Blueberry");
8
​
9
  String fruit = linkedList.get(2);
10
​
11
  linkedList.set(2, "Mango");
12
​
13
  linkedList.remove("Apple");
14
  linkedList.remove(0);
15
​
16
  int size = linkedList.size();
17
​
18
  linkedList.clear();
19
}
```

```java [自有方法]
1
public static void main(String[] args) {
2
  LinkedList<String> linkedList = new LinkedList<>();
3
  linkedList.add("张三");
4
  linkedList.add("李四");
5
  linkedList.add("王五");
6
  linkedList.add("赵六");
7
​
8
  linkedList.addFirst("王一博");
9
​
10
  linkedList.addLast("陈伟霆");
11
​
12
  String first = linkedList.getFirst();
13
​
14
  String last = linkedList.getLast();
15
​
16
  linkedList.removeFirst();
17
​
18
  linkedList.removeLast();
19
​
20
  linkedList.pop();
21
​
22
  linkedList.push("彭于晏");
23
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
1
public static void main(String[] args) {
2
  List<String> vector = new Vector<>();
3
  vector.add("Apple");
4
  vector.add("Banana");
5
  vector.add("Orange");
6
​
7
  vector.add(1, "Blueberry");
8
​
9
  String fruit = vector.get(2);
10
​
11
  vector.set(3, "Mango");
12
​
13
  vector.remove("Mango");
14
  vector.remove(0);
15
​
16
  int size = vector.size();
17
​
18
  vector.clear();
19
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
