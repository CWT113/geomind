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

|             构造函数              | 描述                   |
| :-------------------------------: | :--------------------- |
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

|       方法        | 描述                                               |
| :---------------: | :------------------------------------------------- |
| getAbsolutePath() | 获取 File 的绝对路径（默认是当前项目的路径）       |
|     getPath()     | 获取 File 的封装路径（即new File()时写的参数路径） |
|     getName()     | 获取文件夹/文件名称                                |
|     length()      | 获取文件的字节数                                   |

```java
@Test
public void test() {
  File file1 = new File("1.txt");
  System.out.println(file1.getAbsolutePath()); // E:\StudyCode\java-demo\Module_FileStream\1.txt
  System.out.println(file1.getPath());         // 1.txt

  File file2 = new File("E:\\StudyCode\\1.txt");
  System.out.println(file2.getName()); // 1.txt
  System.out.println(file2.length());  // 3
}
```



## 常用创建方法

|      方法       | 描述                                                   |
| :-------------: | :----------------------------------------------------- |
| createNewFile() | 创建文夹                                               |
|    mkdirs()     | 创建文件夹（可以创建多级文件夹，也可以创建单级文件夹） |

::: warning 注意

上面两个方法：

1. 若创建的文件/文件夹之前有，则创建失败，会返回 false；
2. 若创建的文件/文佳佳之前没有，则创建成功，返回 true；

:::

```java
@Test
public void test1() throws IOException {
  File file1 = new File("E:\\StudyCode\\1.txt");
  System.out.println(file1.createNewFile()); // true

  File file2 = new File("E:\\StudyCode\\haha\\heihei\\hehe\\");
  System.out.println(file2.mkdirs()); // true
}
```



## 常用删除方法

|   方法   | 描述            |
| :------: | :-------------- |
| delete() | 删除文件/文件夹 |

::: danger 危险

1. delete方法删除文件/空文件夹时，不会走回收站，所以谨慎操作！
2. 删除文件夹时，只有空文件夹才可以删除，嵌套的文件夹只能从最里面开始删；

:::

```java
@Test
public void test2() {
  File file = new File("E:\\StudyCode\\1.txt");
  System.out.println(file.delete());

  File file1 = new File("E:\\StudyCode\\haha\\heihei\\");
  System.out.println(file1.delete());
}
```



## 常用判断方法

|     方法      | 描述                    |
| :-----------: | ----------------------- |
| isDirectoty() | 判断是否是文件夹        |
|   isFile()    | 判断是否是文件          |
|   exists()    | 判断文件/文件夹是否存在 |

```java
@Test
public void test3() {
  File file = new File("E:\\StudyCode\\1.txt");
  System.out.println(file.isDirectory()); // false
  System.out.println(file.isFile());      // true
  System.out.println(file.exists());      // true
}
```



## 常用遍历方法

|    方法     | 描述                                                         |
| :---------: | ------------------------------------------------------------ |
|   list()    | 遍历指定的文件夹，返回 String 数组（里面是每个文件名）       |
| listFiles() | 遍历指定的文件夹，返回 File 数组（里面是每个文件的完整路径名） |

```java
@Test
public void test4() {
  File file = new File("E:\\StudyCode\\前端");

  String[] list = file.list();
  for (String s : list) {
    System.out.println(s);
  }

  File[] files = file.listFiles();
  for (File file1 : files) {
    System.out.println(file1);
  }
}
```
