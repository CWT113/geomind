# File类

在创建 File 对象的时候，需要传递一个路径，这个路径定位到哪个文件或文件夹上，当前 File 对象就表示哪个文件。



## 分隔符

|    分隔符     |    描述    | 符号 |
| :-----------: | :--------: | :--: |
| pathSeparator | 路径分隔符 |  ;   |
|   separator   | 名称分隔符 |  /   |

```java {3,6,13}
@Test
public void test() {
  char pathSeparatorChar = File.pathSeparatorChar;
  System.out.println(pathSeparatorChar); // ;

  String separator = File.separator;
  System.out.println(separator);         // \
}

@Test
public void test1() {
  // 使用 File.separator 可以适应不同的系统
  String path = "D" + File.separator + "java" + File.separator + "1.txt";
  System.out.println(path); // "D\java\1.txt"
}
```



## 构造函数

|             构造函数              |          描述          |
| :-------------------------------: | :--------------------: |
| File(String parent, String child) | 根据路径创建 File 对象 |
|  File(File parent, String child)  | 根据路径创建 File 对象 |
|       File(String pathname)       | 根据路径创建 File 对象 |

```java {4,8,9,13}
@Test
public void test() {
  // 方式一
  File file1 = new File("D:\\java", "1.txt");
  System.out.println(file1); // D:\java\1.txt

  // 方式二
  File parent = new File("D:\\java");
  File file2 = new File(parent, "1.txt");
  System.out.println(file2); // D:\java\1.txt

  // 方式三
  File file3 = new File("D:\\java\\1.txt");
  System.out.println(file3); // D:\java\1.txt
}
```

::: warning 注意

`File()` 的参数允许传递一个不存在的路径，程序不会报错，但是没有任何意义。

```java
@Test
public void test1() {
  // 正常输出，没有报错
  File file = new File("D:\\java\\1.txt");
  System.out.println(file); // D:\java\1.txt
}
```

:::



## 常用获取方法

|     常用方法      |                      描述                      |
| :---------------: | :--------------------------------------------: |
| getAbsolutePath() |              获取 File 的绝对路径              |
|     getPath()     | 获取 File 的封装路径（即new File()时写的路径） |
|     getName()     |              获取文件夹或文件名称              |
|     length()      |        获取文件的长度（即文件的字节数）        |

```java
```



## 常用创建方法

| 常用方法 | 描述 |
| :------: | :--: |
|          |      |
|          |      |
|          |      |

