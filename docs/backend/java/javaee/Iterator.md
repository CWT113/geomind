---
date: 2026-07-01 10:10:08
---

# Iterator 迭代器

迭代器（Iterator）是  Java 集合框架中用于遍历集合（如列表、集合和映射等）的接口，它提供了统一的方式来访问集合中的元素。

迭代器接口最常用的三个方法：

|   方法    | 描述                                                 |
| :-------: | ---------------------------------------------------- |
|  next()   | 返回迭代器的下一个元素，并将迭代器的指针向后移动一位 |
| hasNext() | 用于判断集合中是否还有下一个元素可访问               |
| remove()  | 从集合中删除迭代器访问的元素                         |

通过使用迭代器，可以实现逐个访问集合中的元素，而不需要使用传统的 for 循环或索引。



## 迭代集合

> [!WARNING] 注意
>
> - 迭代器在遍历集合时，是 **不依赖于索引** 的；
> - 迭代器是一种 **单向遍历** 机制，只能从前往后遍历集合中的元素，不能往回遍历；
> - 迭代器遍历集合时，**不能直接修改集中的元素**，而是需要使用迭代器的 `remove()` 方法来删除当前元素；

```java {10,16,17,20}
public static void main(String[] args) {
  ArrayList<Integer> list = new ArrayList<>();
  list.add(10);
  list.add(15);
  list.add(8);
  list.add(23);
  list.add(-5);

  // 获取迭代器
  Iterator<Integer> iterator = list.iterator();

  // 获取第一个元素
  System.out.println(iterator.next());

  // 循环获取所有元素
  while (iterator.hasNext()) {
    Integer i = iterator.next();
    System.out.println(i);
    if (i <= 10) {
      iterator.remove(); // 删除小于 10 的元素
    }
  }
  System.out.println(list);
}
```

> [!TIP] 提示
>
> 增强 for 循环底层就是使用迭代器实现的。
>
> ```java {5,7}
> for(String s : list){ // [!code ++]
> }
> 
> // 底层实现
> Iterator<String> it = list.iterator();
> while(it.hasNext()){
>     String s = it.next();
> }
> ```

