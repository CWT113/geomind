# Collection

Collection接口并不直接创建实例，而是由其子接口（如List、Set、Queue等）和实现类（如ArrayList、HashSet、LinkedList等）提供具体的实现。



## 常用方法

|            方法             | 作用                             |
| :-------------------------: | :------------------------------- |
|          add(obj)           | 添加单个元素到集合中             |
|   addAll(Collection col)    | 添加 B集合到 A集合中（集合合并） |
|           clear()           | 清空集合                         |
| remove(obj) / remove(index) | 移除指定元素                     |
|        contains(obj)        | 判断集合是否包含指定元素         |
|          isEmpty()          | 判断集合是否为空                 |
|           size()            | 获取集合元素数量                 |
|          toArray()          | 把集合转换为数组                 |

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

迭代器（Iterator）提供了一种 **顺序访问集合元素** 的方式，而不需要了解集合的底层实现细节。

```java {8-10}
@Test
public void junitTest4() {
  ArrayList<String> arrayList = new ArrayList<String>();
  arrayList.add("张三");
  arrayList.add("李四");
  arrayList.add("王五");

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
    String element1 = iterator.next(); // [!code --]
    System.out.println(element1);
  }
}
```

:::



## 并发修改异常

当使用 迭代器/增强For 遍历集合的过程中，尽量**不要随意修改集合的内容，例如增加、删除等**！

下面的示例，就会引发并发修改异常：

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

```java {9}
@Test
public void junitTest5() {
  ArrayList<String> arrayList = new ArrayList<String>();
  arrayList.add("张三");
  arrayList.add("李四");
  arrayList.add("王五");

  //使用 ArrayList 父类中的 listIterator() 迭代器进行遍历
  ListIterator<String> listIterator = arrayList.listIterator(); // [!code ++]
  while (listIterator.hasNext()) {
    String element = listIterator.next();
    if ("李四".equals(element)) {
      listIterator.add("陈伟霆");
    }
  }
  System.out.println(arrayList); //[张三, 李四, 陈伟霆, 王五]
}
```



## 扩展方法

|              方法              | 作用                                          |
| :----------------------------: | --------------------------------------------- |
| addAll(Collection c, T... ele) | 向集合批量添加元素                            |
|         shuffle(list)          | 将集合中的元素顺序打乱                        |
|           sort(list)           | 将集合中的元素进行排序（默认使用 ASCII 码值） |
| sort(List list, Comparator c)  | 将集合中的元素按自定义的排序方式排序          |

```java {4,7}
@Test
public void junitTest() {
  ArrayList<String> list = new ArrayList<>();
  Collections.addAll(list, "Apple", "Banana", "Orange");

  //打乱排序，每次运行顺序都不一样
  Collections.shuffle(list);
}
```

```java [默认排序] {10}
@Test
public void junitTest1() {
  ArrayList<String> list = new ArrayList<>();
  list.add("d.低头思故乡");
  list.add("a.窗前明月光");
  list.add("c.举头望明月");
  list.add("b.疑是地上霜");

  //默认使用 ASCII 码排序，如果第一个值相同，则按第二个比较
  Collections.sort(list);
}
```

```java [Comparator匿名排序] {9-15}
@Test
public void junitTest2() {
  ArrayList<Person> people = new ArrayList<>();
  people.add(new Person("王一博", 23));
  people.add(new Person("陈伟霆", 34));
  people.add(new Person("彭于晏", 32));
  people.add(new Person("Sunny", 18));

  Collections.sort(people, new Comparator<Person>() {
    @Override
    public int compare(Person o1, Person o2) {
      return o1.getAge() - o2.getAge();   //升序
      //return o2.getAge() - o1.getAge(); //降序
    }
  });

  System.out.println(people);
}
```

::: code-group

```java [实现Comparable接口] {9}
@Test
public void junitTest3() {
  ArrayList<Student> students = new ArrayList<>();
  students.add(new Student("王一博", 23));
  students.add(new Student("陈伟霆", 34));
  students.add(new Student("彭于晏", 32));
  students.add(new Student("Sunny", 18));

  Collections.sort(students);
  System.out.println(students);
}
```

```java [Student] {37-40}
public class Student implements Comparable<Student> {
  private String name;
  private Integer age;

  public Student() {
  }

  public Student(String name, Integer age) {
    this.name = name;
    this.age = age;
  }

  public Integer getAge() {
    return age;
  }

  public void setAge(Integer age) {
    this.age = age;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "Student{" +
      "name='" + name + '\'' +
      ", age=" + age +
      '}';
  }

  @Override
  public int compareTo(Student o) {
    return this.getAge() - o.getAge();
  }
}
```

:::