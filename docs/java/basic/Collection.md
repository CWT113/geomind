# Collection

`Collection` 接口并不直接创建实例，而是由其子接口（如 `List`、`Set`、`Queue` 等）和实现类（如 `ArrayList`、`HashSet`、`LinkedList` 等）提供具体的实现。



## 常用方法

|    方法    | 作用                             |
| :--------: | :------------------------------- |
|   add()    | 添加单个元素到集合中             |
|  addAll()  | 添加 B集合到 A集合中（集合合并） |
|  clear()   | 清空集合                         |
|  remove()  | 移除指定元素                     |
| contains() | 判断集合是否包含指定元素         |
| isEmpty()  | 判断集合是否为空                 |
|   size()   | 获取集合元素数量                 |
| toArray()  | 把集合转换为数组                 |

::: code-group

```java [添加] {4,5,8,9,12}
@Test
public void junitTest() {
  Collection<String> collection = new ArrayList<>();
  collection.add("张三");
  collection.add("李四");

  Collection<String> collection1 = new ArrayList<>();
  collection1.add("Tom");
  collection1.add("Sunny");

  //将 collection1 集合与 collection 合并
  collection.addAll(collection1);

  System.out.println(collection); //[张三, 李四, Tom, Sunny]
}
```

```java [删除] {8,11}
@Test
public void junitTest1() {
  Collection<String> collection = new ArrayList<>();
  collection.add("张三");
  collection.add("李四");
  collection.add("王五");

  collection.remove("李四");
  System.out.println(collection); //[张三, 王五]

  collection.clear();
  System.out.println(collection); //[]
}
```

```java [判断] {8,11}
@Test
public void junitTest2() {
  Collection<String> collection = new ArrayList<>();
  collection.add("张三");
  collection.add("李四");
  collection.add("王五");

  boolean empty = collection.isEmpty();
  System.out.println(empty); //false

  boolean isContain = collection.contains("王五");
  System.out.println(isContain); //true
}
```

```java [其他方法] {8,11}
@Test
public void junitTest3() {
  Collection<String> collection = new ArrayList<>();
  collection.add("张三");
  collection.add("李四");
  collection.add("王五");

  int size = collection.size();
  System.out.println(size); //3

  Object[] array = collection.toArray();
  System.out.println(Arrays.toString(array)); //[张三, 李四, 王五]
}
```

:::

::: warning 注意

add() 方法如果添加 B集合到 A集合中，也能添加，但是会把 B集合当作一个整体添加到 A集合中。

```java {12}
@Test
public void junitTest() {
  //不写 <E> 默认是 Object
  Collection collection = new ArrayList();
  collection.add(100);
  collection.add(true);

  Collection collection1 = new ArrayList();
  collection1.add("hello");
  collection1.add("world");

  collection.add(collection1);

  System.out.println(collection); //[100, true, [hello, world]]
}
```

:::



## 迭代器

迭代器（Iterator）提供了一种顺序访问集合元素的方式，而不需要了解集合的底层实现细节。

```java {10,11,12}
@Test
public void junitTest4() {
  ArrayList<String> arrayList = new ArrayList<String>();
  arrayList.add("张三");
  arrayList.add("李四");
  arrayList.add("王五");
  arrayList.add("赵六");
  arrayList.add("王一博");

  Iterator<String> iterator = arrayList.iterator();
  while (iterator.hasNext()) {
    String element = iterator.next();
    System.out.println(element);
  }
}
```

::: warning 注意

使用 `iterator()` 迭代集合时，next() 方法不要同时使用 2 次，否则会报 NoSuchElementException 错。

```java
@Test
public void junitTest4() {
  ArrayList<String> arrayList = new ArrayList<String>();
  arrayList.add("张三");
  arrayList.add("李四");
  arrayList.add("王五");
  arrayList.add("赵六");
  arrayList.add("王一博");

  Iterator<String> iterator = arrayList.iterator();
  while (iterator.hasNext()) {
    String element = iterator.next();
    System.out.println(element);

    //如果是集合是偶数个元素，不会报错，奇数个元素时，next()获取不到元素了，就会报错
    String element1 = iterator.next();
    System.out.println(element1);
  }
}
```

:::



### 并发修改异常

当使用迭代器 / 增强For循环 遍历集合的过程中，尽量不要随意修改集合的内容，例如增加、删除等！

下面的示例，就会引发 并发修改异常：

```java
@Test
public void junitTest5() {
  ArrayList<String> arrayList = new ArrayList<String>();
  arrayList.add("张三");
  arrayList.add("李四");
  arrayList.add("王五");

  Iterator<String> iterator = arrayList.iterator();
  while (iterator.hasNext()) {
    String element = iterator.next(); //报错
    if ("李四".equals(element)) { 											 // [!code --]
      arrayList.add("陈伟霆");														// [!code --]
    }																										// [!code --]
    System.out.println(element);
  }
}
```

问题出在 iterator.next() 方法的调用上，内部使用了 checkForComodification() 函数来判断当前集合的 <span style="font-weight:bold;">预期迭代次数和实际迭代次数是否相同</span>，不相同时就会报并发修改异常。

其实，本质是 add() 方法添加新元素时，没有修改实际迭代次数，导致二者不相同下一次 iterator.next() 就会报错。

解决方法：

```java {9,10,11,13}
@Test
public void junitTest5() {
  ArrayList<String> arrayList = new ArrayList<String>();
  arrayList.add("张三");
  arrayList.add("李四");
  arrayList.add("王五");

  //使用 ArrayList 父类中的 listIterator() 迭代器进行遍历
  ListIterator<String> listIterator = arrayList.listIterator();
  while (listIterator.hasNext()) {
    String element = listIterator.next();
    if ("李四".equals(element)) {
      listIterator.add("陈伟霆");
    }
  }
  System.out.println(arrayList); //[张三, 李四, 陈伟霆, 王五]
}
```

















