# Set

`Set<T>` 表示一组 **不允许包含重复元素** 的集合。

特点：

1. **元素无序**：元素插入和读取的顺序不一定保持一致，具体取决于底层实现；
2. **不允许重复**：已经存在的元素，不会再次存储；
3. **允许包含一个 null 元素**：只允许包含一个；



## HashSet

`HashSet<T>` 是 Set 接口的一个实现类，底层使用 `HashMap` 实现。

特点：

1. **元素无序**：插入和取出的顺序可能不同，如果相同，纯属巧合；
2. **哈希表存储**：查找和插入的操作效率较高；
3. **无索引**：由于底层是哈希表存储，所以没有索引；
4. **线程不安全**：插入和查询速度快；



::: info 底层实现 

- 基于 `HashMap` 实现，HashSet 内部实际使用一个 HashMap 存储元素；

- HashSet 的元素作为 `HashMap`的 Key，而 Value 统一是一个固定的对象 PRESENT（一个静态常量）；

  ```java
  static final Object PRESENT = new Object();
  
  public boolean add(E e) {
    return map.put(e, PRESENT)==null;
  }
  ```

:::



HashSet 拥有的方法和 Collection 集合的方法一样，直接用就可以：

```java
public static void main(String[] args) {
  HashSet<String> set = new HashSet<>();
  set.add("王一博");
  set.add("陈伟霆");
  set.add("彭于晏");
  set.add("王一博");
  System.out.println(set);

  set.remove("王一博");
  System.out.println(set);

  //迭代器
  Iterator<String> iterator = set.iterator();
  while(iterator.hasNext()) {
    System.out.println(iterator.next());
  }
  //增强For
  for (String s : set) {
    System.out.println(s);
  }
}
```



### HashSet去重

`HashSet` 想要进行元素去重，必须重写 `hashCode()` 和 `equals()` 两个方法。String 类型已经重写过这两个方法了。

::: info 原理

1. 先计算元素的哈希值，再比较元素的内容；
2. 如果哈希值不一样，则直接存储；
3. 如果元素哈希值一样，内容不一样，则存储，如果内容也一样，去重复；

:::

::: code-group

```java
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

```java
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

`LinkedHashSet<T>` 继承自 `HashSet`，但使用了一个 **双向链表** 维护元素的插入顺序。

特点：

1. **元素有序**：通过双向链表，可以做到元素有序；
2. **哈希表存储**：查找和插入的操作效率较高；
3. **无索引**：由于底层是哈希表存储，所以没有索引；
4. **线程不安全**：插入和查询速度快；



LinkedHashSet 的常用方法和 HashSet 的用法一模一样：

```java
public static void main(String[] args) {
  LinkedHashSet<String> set = new LinkedHashSet<>();
  set.add("王一博");
  set.add("陈伟霆");
  set.add("彭于晏");
  set.add("王一博");
  System.out.println(set);

  set.remove("王一博");
  System.out.println(set);

  //迭代器
  Iterator<String> iterator = set.iterator();
  while(iterator.hasNext()) {
    System.out.println(iterator.next());
  }
  //增强For
  for (String s : set) {
    System.out.println(s);
  }
}
```



## TreeSet
