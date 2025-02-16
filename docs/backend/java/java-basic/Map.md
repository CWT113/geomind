# Map

在 Java 中，Map 是一个用于存储键值对的数据结构接口。它提供了一种通过键快速查找值得方式，确保每个键都是唯一的。

特点：

- **键值对存储**：每个元素由一个键和值组成；
- **键唯一**：同一个 Map 中的键不能重复，但值可以重复；
- **无序或有序**：HashMap实现是无序的，LinkedHashMap和TreeMap实现是有序的；

常用方法：

|         方法         | 作用                                              |
| :------------------: | :------------------------------------------------ |
|   put(key, value)    | 将指定键值对插入到 Map 中，返回之前与该键关联的值 |
|       get(key)       | 根据键返回对应的值                                |
|   containsKey(key)   | 判断是否包含指定的键                              |
| containsValue(value) | 判断是否包含指定的值                              |
|     remove(key)      | 根据键移除对应的键值对                            |
|        size()        | 返回 Map 中键值对的数量                           |
|       keySet()       | 返回所有键的集合                                  |
|       values()       | 返回所有值的集合                                  |
|      isEmpty()       | 判断 Map 是否为空                                 |
|       clear()        | 清空 Map 中的所有键值对                           |
|      entrySet()      | 返回所有键值对的集合                              |





## HashMap

::: success HashMap原理

- 数据结构：基于 **数组 + 链表 + 红黑树** 实现。
- 原理：
  - 通过键的 hashCode() 方法计算哈希值，然后将其映射到数组的某个索引位置；
  - 如果发生哈希冲突（也叫哈希碰撞，指多个键的哈希值映射到同一个索引），会在该位置形成链表，Java8之后，当链表长度超过8时，会转为红黑树以提升性能；
- 优点：查询效率高，时间复杂度接近O(1)；
- 缺点：无序

:::

```java
public static void main(String[] args) {
  HashMap<String, String> map = new HashMap<>();
  // HashMap存储时无序的
  map.put("王一博", "20");
  map.put("陈伟霆", "23");
  map.put("彭于晏", "25");

  System.out.println(map); //{陈伟霆=23, 王一博=20, 彭于晏=25}

  String s = map.get("王一博"); //20

  boolean b = map.containsKey("王一博"); //true

  int size = map.size(); //2

  Set<String> keys = map.keySet(); //[王一博, 彭于晏]

  Collection<String> values = map.values(); //[20, 25]

  boolean empty = map.isEmpty(); //false

  for (var entry : map.entrySet()) {
    System.out.println(entry.getKey() + ":" + entry.getValue());
  }
}
```



## LinkedHashMap

::: success LinkedHashMap原理

数据结构：**继承自 HashMap**，在其基础上添加了 **双向链表** 以维护插入顺序；

特点：即具备 HashMap 的快速访问性能，又能按照插入顺序访问遍历；

:::

```java
public static void main(String[] args) {
  LinkedHashMap<String, String> linkedMap = new LinkedHashMap<>();

  linkedMap.put("apple", "苹果");
  linkedMap.put("banana", "香蕉");
  linkedMap.put("orange", "橙子");

  System.out.println(linkedMap); //{apple=苹果, banana=香蕉, orange=橙子}

  String s = linkedMap.get("apple"); //苹果

  for (String key : linkedMap.keySet()) {
    System.out.println(key + ": " + linkedMap.get(key));
  }
}
```



## TreeMap

::: success TreeMap原理

数据结构：基于 **红黑树**（自平衡二叉搜索树）实现；

特点：
- 键按自然顺序或指定的比较器顺序排序；
- 插入、删除和查询操作的时间复杂度为 O(log n)；

:::



:::code-group

```java [自然排序]
public static void main(String[] args) {
  TreeMap<String, String> treeMap1 = new TreeMap<>();
  treeMap1.put("b", "曲项向天歌");
  treeMap1.put("d", "红掌拨清波");
  treeMap1.put("a", "鹅鹅鹅");
  treeMap1.put("c", "白毛浮绿水");

  System.out.println(treeMap1); //{a=鹅鹅鹅, b=曲项向天歌, c=白毛浮绿水, d=红掌拨清波}
}
```

```java [Comparator接口]
public static void main(String[] args) {
  TreeMap<Person, String> treeMap2 = new TreeMap<>(new Comparator<Person>() {
    @Override
    public int compare(Person o1, Person o2) {
      return o1.getAge() - o2.getAge();
    }
  });

  treeMap2.put(new Person("王一博", 22),"");
  treeMap2.put(new Person("陈伟霆", 12),"");
  treeMap2.put(new Person("彭于晏", 8),"");

  System.out.println(treeMap2);
	//{Person{name='彭于晏', age=8}=, Person{name='陈伟霆', age=12}=, Person{name='王一博', age=22}=}
}
```

```java [Comparable接口]
public static void main(String[] args) {
  // Person 内部已经实现 Comparable 接口
  TreeMap<Person, String> treeMap2 = new TreeMap<>();
  treeMap2.put(new Person("王一博", 22),"");
  treeMap2.put(new Person("陈伟霆", 12),"");
  treeMap2.put(new Person("彭于晏", 8),"");

  System.out.println(treeMap2);
  //{Person{name='彭于晏', age=8}=, Person{name='陈伟霆', age=12}=, Person{name='王一博', age=22}=}
}
```

```java [Person]
public class Person implements Comparable<Person>{
  private String name;
  private Integer age;

  public Person() {
  }

  public Person(String name, Integer age) {
    this.age = age;
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getAge() {
    return age;
  }

  public void setAge(Integer age) {
    this.age = age;
  }

  @Override
  public String toString() {
    return "Person{" +
      "name='" + name + '\'' +
      ", age=" + age +
      '}';
  }


  @Override
  public int compareTo(Person o) {
    return this.age - o.age;
  }
}
```

:::



## Hashtable

Hashtable 从 Java1.0 就存在，它实现了 Map 接口，是一个线程安全的集合类，用于存储键值对。

::: success Hashtable原理

数据结构：底层基于 **哈希表** 实现，通过键的 hashCode() 确定键值对的存储位置。

特点：

- **线程安全**：所有方法都是同步的，因此性能比较低，但适用于多线程环境；
- **元素无序**：键值对没有特定的顺序存储；
- **键和值不允许为null**：不允许存储 null键和 null值，<span style="text-decoration:underline;">但 HashMap 允许哦</span>；

:::



常用方法：

| 方法               | 作用                                         |
| :----------------- | -------------------------------------------- |
| put(key, value)    | 将指定的键值对插入到 Hashtable 中            |
| get(key)           | 根据键获取对应的值，如果键不存在，则返回null |
| remove(key)        | 按键删除键值对                               |
| containsKey(key)   | 检查是否包含指定的键                         |
| containsValue(val) | 检查是否包含指定的值                         |
| size()             | 返回键值对的数量                             |
| isEmpty()          | 检查 Hashtable 是否为空                      |
| keys()             | 返回包含所有键的枚举                         |
| elements()         | 返回包含所有值的枚举                         |
| keySet()           | 返回所有的键到 Set 集合中                    |

```java
public static void main(String[] args) {
  Hashtable<String, String> table = new Hashtable<>();

  table.put("name", "王一博");
  table.put("city", "北京市");
  table.put("job", "演员&歌手");

  table.put("name", "陈伟霆"); //会覆盖前面 name 属性的值
  table.put(null, null);      //NullPointerException
  System.out.println(table);

  String name = table.get("name"); //王一博

  for (String s : table.keySet()) {
    System.out.println(s + ": " + table.get(s));
  }
}
```

Hashtable 与 HashMap 的对比：

|           特性           | Hashtable |          HashMap           |
| :----------------------: | :-------: | :------------------------: |
|         是否无序         |    是     |             是             |
|         有无索引         |    无     |             无             |
|       线程是否安全       |    是     |             否             |
| 是否允许存储 null 键值对 |  不允许   | 只允许一个 null键和 null值 |
|           性能           |   较低    |            较高            |
|         引入时间         |  JDK 1.0  |          JDK 1.2           |



## Properties

Properties 是 Hashtable 的一个子类，专门用于存储 String 类型的键值对。主要用于文件 IO流和配置文件读取写入。

::: success Properties原理

数据结构：哈希表

特点：

- **键值对存储**：键和值都是 String 类型；
- **继承自 Hashtable**：因为继承自 Hashtable，所以线程安全，方法默认都是同步的；
- **常用于配置文件**：常常与 `.properties` 配置文件一起使用；

:::

常用方法：

| 方法                    | 作用                                               |
| ----------------------- | -------------------------------------------------- |
| setProperty(key, value) | 设置属性键值对                                     |
| getProperty(key)        | 获取指定键的属性值，如果键不存在返回 null          |
| load(inStream)          | 从输入流中加载属性数据                             |
| stringPropertyNames()   | 获取所有的 key，保存到 set 集合中，相当于 keySet() |

```java
public static void main(String[] args) {
  Properties prop = new Properties();
  prop.setProperty("username", "admin");
  prop.setProperty("password", "123456");
  System.out.println(prop);

  for (String name : prop.stringPropertyNames()) {
    System.out.println(prop.getProperty(name));
  }
}
```
