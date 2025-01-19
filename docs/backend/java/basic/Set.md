# Set

`Set<T>` 表示一组 **不允许包含重复元素** 的集合。



特点：

1. **元素无序**：元素插入和读取的顺序不一定保持一致，具体取决于底层实现；
2. **不允许重复**：已经存在的元素，不会再次存储；
3. **允许包含一个 null 元素**：只允许包含一个；



常用方法：

| 方法             | 作用                                           |
| ---------------- | ---------------------------------------------- |
| add(e)           | 将指定元素添加到集合中，若元素存在则返回 false |
| remove(o)        | 从集合中移除指定元素                           |
| first()          | TreeSet特有，返回集合中的第一个元素            |
| last()           | TreeSet特有，返回集合中的最后一个元素          |
| lower(e)         | 返回小于指定元素的最大元素                     |
| floor(e)         | 返回小于等于指定元素的最大元素                 |
| higher(e)        | 返回大于指定元素的最小元素                     |
| ceiling(e)       | 返回大于等于指定元素的最小元素                 |
| subSet(from, to) | 返回从 from（包含）到 to（不包含）的子集       |
| headSet(to)      | 返回小于 to 的所有元素的子集                   |
| tailSet(from)    | 返回大于等于 from 的所有元素的子集             |
| iterator()       | 返回一个用于遍历元素的迭代器                   |



## HashSet

`HashSet<T>` 是 Set 接口的一个实现类，底层使用 `HashMap` 实现。

::: success HashSet剖析

- 数据结构：HashMap

- 特点：

  - **元素无序**：插入和取出的顺序可能不同，如果相同，纯属巧合；
  - **哈希表存储**：查找和插入的操作效率较高；
  - **无索引**：由于底层是哈希表存储，所以没有索引；
  - **线程不安全**：插入和查询速度快；

- 原理：

  - 基于 HashMap 实现，HashSet 内部实际使用一个 HashMap 存储元素；

  - HashSet 的元素作为 HashMap 的 Key，而 Value 统一是一个固定的对象 PRESENT（一个静态常量）；

    ```java
    static final Object PRESENT = new Object();
    
    public boolean add(E e) {
      return map.put(e, PRESENT)==null;
    }
    ```

:::

HashSet 拥有上面的方法，同样也拥有和 Collection 集合的一样的方法：

```java
public static void main(String[] args) {
  HashSet<String> set = new HashSet<>();
  set.add("Apple");
  set.add("Banana");
  set.add("Orange");
  set.add("Apple"); //重复元素，不会被添加

  System.out.println(set); //[Apple, Orange, Banana]

  boolean apple = set.contains("Apple"); //true

  set.remove("Apple");

  // 增强 for
  for (String s : set) {
    System.out.println(s);
  }
  // 迭代器遍历
  Iterator<String> iterator = set.iterator();
  while (iterator.hasNext()) {
    System.out.println(iterator.next());
  }
}
```



## HashSet去重

`HashSet` 想要进行元素去重，必须重写 `hashCode()` 和 `equals()` 两个方法。

> 为什么 String 方法不用重写呢？
>
> 因为 String 类型已经重写过这两个方法了。

::: info 原理

1. 先计算元素的哈希值，再比较元素的内容；
2. 如果哈希值不一样，则直接存储；
3. 如果元素哈希值一样，内容不一样，则存储，如果内容也一样，去重复；

:::

::: code-group

```java [main]
public static void main(String[] args) {
  HashSet<String> set = new HashSet<>();
  set.add("ABC");
  set.add("通话");
  set.add("重地");
  set.add("ABC");
  System.out.println(set); //[ABC, 通话, 重地]

  HashSet<Person> people = new HashSet<>();
  people.add(new Person("王一博",23));
  people.add(new Person("陈伟霆",24));
  people.add(new Person("彭于晏",28));
  people.add(new Person("王一博",23));
  System.out.println(people);
}
```

```java [Person] {10-17,19-24}
public class Person {
  private String name;
  private Integer age;

  public Person(String name, Integer age) {
    this.age = age;
    this.name = name;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Person person = (Person) o;
    return Objects.equals(name, person.name) && Objects.equals(age, person.age);
  }

  @Override
  public int hashCode() {
    int result = Objects.hashCode(name);
    result = 31 * result + Objects.hashCode(age);
    return result;
  }

  @Override
  public String toString() {
    return "Person{" +
      "name='" + name + '\'' +
      ", age=" + age +
      '}';
  }
}
```

:::



## LinkedHashSet

`LinkedHashSet<T>` 继承自 HashSet，但使用了一个 **双向链表** 维护元素的插入顺序。

:::success LinkedHashSet剖析

- 数据结构：继承自 HashSet，增加 **双向链表** 维护元素顺序；

- 特点：
  - **元素有序**：通过双向链表，可以做到元素有序；
  - **哈希表存储**：查找和插入的操作效率较高；
  - **无索引**：由于底层是哈希表存储，所以没有索引；
  - **线程不安全**：插入和查询速度快；

:::



LinkedHashSet 的常用方法和 HashSet 的用法一样：

```java
public static void main(String[] args) {
  LinkedHashSet<String> linkedHashSet = new LinkedHashSet<>();
  linkedHashSet.add("Apple");
  linkedHashSet.add("Banana");
  linkedHashSet.add("Orange");
  linkedHashSet.add("Apple"); //重复元素，不会被添加

  System.out.println(linkedHashSet); //[Apple, Orange, Banana]

  boolean apple = linkedHashSet.contains("Apple"); //true

  linkedHashSet.remove("Apple"); //[Orange, Banana]

  //增强for
  for (String s : linkedHashSet) {
    System.out.println(s);
  }
  //迭代器遍历
  Iterator<String> iterator = linkedHashSet.iterator();
  while (iterator.hasNext()) {
    System.out.println(iterator.next());
  }
}
```



## TreeSet

TreeSet 是 Set 的一个实现类，用于存储 **唯一的、有序的**元素。

::: success TreeSet剖析

- 数据结构：**红黑树**
- 特点：
  - **有序性**：元素会按照 自然排序（ASCII码值 / 实现 Comparable 接口）或 自定义排序（通过 Comparator 接口）排列；
  - **唯一性**：TreeSet 内部使用 TreeMap 来存储，因此不允许重复元素；
  - **线程不安全**：TreeSet 是线程不安全的，如需要线程安全的集合，使用 Collections.synchronizedSet() 进行包装；
  - **不能存储null**

:::

::: code-group

```java [自然排序]
public static void main(String[] args) {
  TreeSet<String> set1 = new TreeSet<>();
  set1.add("b.曲项向天歌");
  set1.add("d.红掌拨清波");
  set1.add("a.鹅鹅鹅");
  set1.add("c.白毛浮绿水");

  System.out.println(set1); 
  //[a.鹅鹅鹅, b.曲项向天歌, c.白毛浮绿水, d.红掌拨清波]
}
```

```java [Comparator接口]
public static void main(String[] args) {
  TreeSet<Person> set2 = new TreeSet<>(new Comparator<Person>() {
    @Override
    public int compare(Person o1, Person o2) {
      return o1.getAge() - o2.getAge();
    }
  });
  set2.add(new Person("王一博", 22));
  set2.add(new Person("陈伟霆", 34));
  set2.add(new Person("彭于晏", 13));

  System.out.println(set2);
  //[Person{name='彭于晏', age=13}, Person{name='王一博', age=22}, Person{name='陈伟霆', age=34}]
}
```

```java [Comparable接口]
public static void main(String[] args) {
  // Person类中实现了 Comparable 接口
  TreeSet<Person> set2 = new TreeSet<>();
  set2.add(new Person("王一博", 22));
  set2.add(new Person("陈伟霆", 34));
  set2.add(new Person("彭于晏", 13));

  System.out.println(set2);
  //[Person{name='彭于晏', age=13}, Person{name='王一博', age=22}, Person{name='陈伟霆', age=34}]
}
```

```java [Person] {37-40}
public class Person implements Comparable<Person> {
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
