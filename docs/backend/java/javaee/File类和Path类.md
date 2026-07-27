---
date: 2026-06-17 21:55:36
---

# 文件路径操作

Java 中文件路径操作有两种方式，`File` 类在传统开发中使用比较广泛，但从 Java7 之后，官方推荐使用更强大、性能更好的 NIO.2 API（`Path` 和 `Files` 类）。



## File 类

File 类是 Java 中用于 **表示文件或目录路径** 的类，它代表的是“文件或目录的路径”，而不是文件本身的内容。因此不能直接利用 File 类来读写文件内部的数据，但可以用它来创建文件、删除文件、获取文件属性等。



### 构造方法

常见的构造方法如下：

| 构造方法                          | 说明                                       |
| --------------------------------- | ------------------------------------------ |
| File(String pathname)             | 通过字符串路径创建 File 实例               |
| File(String parent, String child) | 通过父路径字符串和子路径字符串创建 File 实例 |
| File(File parent, String child)   | 通过父 File 对象和子路径字符串创建 File 实例   |

> [!NOTE] 路径分隔符
>
> - Windows 中使用反斜杠 `\` （在 Java 中需要将其进行转义 `\\`）；
> - Linux / macOS 中使用正斜杠 `/`；
> - 推荐写法：统一使用正斜杠 `/`，或者使用 `File.separator` 属性，它会自动适应不同操作系统；

```java {3,8,13}
public static void main(String[] args) {
  // 字符串路径构建 File 实例
  File file1 = new File("C:\\Users\\lhx\\Desktop\\text.txt");
  System.out.println(file1); // C:\Users\lhx\Desktop\text.txt

  // 通过父路径和子路径构建 File 实例
  String parentPath = "C:/Users/lhx/Desktop";
  File file2 = new File(parentPath, "text.txt");
  System.out.println(file2); // C:\Users\lhx\Desktop\text.txt

  // 通过父File和子路径构建 File 实例
  File parentFile = new File(parentPath);
  File file3 = new File(parentFile, "text.txt");
  System.out.println(file3); // C:\Users\lhx\Desktop\text.txt
}
```



### 常用方法

####  判断与检测

|     方法      | 描述                   |
| :-----------: | ---------------------- |
|    exist()    | 判断文件或目录是否存在 |
|   isFile()    | 判断是否是一个文件     |
| isDirectory() | 判断是否是一个目录     |
| isAbsolute()  | 判断是否是绝对路径     |

```java
public static void main(String[] args) {
  File file = new File("C:\\Users\\lhx\\Desktop\\text.txt");

  System.out.println("文件是否存在：" + file.exists()); // true

  System.out.println("是否是文件：" + file.isFile()); // true

  System.out.println("是否是目录：" + file.isDirectory()); // false

  System.out.println("是否绝对路径：" + file.isAbsolute()); // true
}
```



#### 获取属性信息

|       方法        | 描述                       |
| :---------------: | -------------------------- |
|     getName()     | 获取文件或目录的名称       |
|     getPath()     | 获取构造时传入的路径字符串 |
| getAbsolutePath() | 获取绝对路径               |
|     length()      | 获取文件大小               |
|  lastModified()   | 获取最后一次修改的时间戳   |

```java
public static void main(String[] args) {
  File file = new File("C:\\Users\\lhx\\Desktop\\text.txt");

  System.out.println("文件名称：" + file.getName()); // text.txt

  System.out.println("路径字符串：" + file.getPath()); // C:\Users\lhx\Desktop\text.txt

  System.out.println("绝对路径：" + file.getAbsolutePath()); // C:\Users\lhx\Desktop\text.txt

  System.out.println("文件大小：" + file.length()); // 12

  System.out.println("最后修改时间：" + file.lastModified()); // 1784883500296
}
```



#### 创建与删除

|      方法       | 描述                               |
| :-------------: | ---------------------------------- |
| createNewFile() | 当文件不存在时，创建一个新的空文件 |
|     mkdir()     | 创建单级目录                       |
|    mkdirs()     | 创建多级目录                       |
|    delete()     | 删除文件或空目录                   |

```java
public static void main(String[] args) throws IOException {
  // 创建文件
  File file = new File("C:/Users/lhx/Desktop/text123.txt");
  boolean created = file.createNewFile();
  System.out.println("是否创建成功：" + created); // true

  // 创建单级目录
  File file1 = new File("C:/Users/lhx/Desktop/temp");
  boolean mkdired = file1.mkdir();
  System.out.println("是否创建成功：" + mkdired); // true

  // 创建多级目录
  File file2 = new File("C:/Users/lhx/Desktop/temp2/aaa/bbb");
  boolean mkdired2 = file2.mkdirs();
  System.out.println("是否创建成功：" + mkdired2); // true

  // 删除文件或目录
  file.delete();
  file1.delete();
  file2.delete(); // 删除的是 bbb 文件夹
}
```



#### 目录遍历

|    方法     | 描述                                             |
| :---------: | ------------------------------------------------ |
|   list()    | 返回当前目录下所有子文件和子目录的名称数组       |
| listFiles() | 返回当前目录下所有子文件和子目录的 File 对象数组 |

::: code-group

```java [基础演示]
public static void main(String[] args) throws IOException {
  File file = new File("C:/Users/lhx/Desktop/temp");
  String[] list = file.list();
  System.out.println(Arrays.toString(list));

  File[] files = file.listFiles();
  System.out.println(Arrays.toString(files));
}
```

```java [递归遍历文件夹]
public static void main(String[] args) throws IOException {
  File file = new File("C:/Users/lhx/Desktop/temp");
  scanDirectory(file);
}

public static void scanDirectory(File dir) {
  if (dir == null || !dir.exists()) {
    return;
  }
  System.out.println((dir.isDirectory() ? "📁 " : "📄 ") + dir.getName());
  if (dir.isDirectory()) {
    File[] files = dir.listFiles();
    if (files != null) {
      for (File file : files) {
        scanDirectory(file);
      }
    }
  }
}
```

:::



## Path 类

Path 类是 Java7 中引入的一个接口，用于在内存中表示文件或目录的路径。它是现代 Java 处理文件系统路径的核心基础，全面取代了传统的 File 类操作路径的功能。

需要明确的是：Path 类也只代表“路径本身”这一抽象概念，不代表真实文件或文件的数据内容。

> [!NOTE] 设计思想
>
> Java7 之后的文件操作体系中，设计遵循了 权责分离 的原则:
>
> - `Path`（接口）：纯粹的路径表达式，他只负责路径字符串的解析、拼接、规范化等逻辑运算，不需要访问磁盘；
> - `Files`（工具类）：实际的文件系统操作者，所有涉及磁盘IO的操作（如创建、删除、读写）都由 `Files` 类的静态方法完成，并以 `Path` 对象作为参数；



### 

### 创建方法

从 Java11 开始，最推荐的方式是使用 `Path.of()` 静态工厂方法创建。

```java {3,4}
public static void main(String[] args) {
  // Java11+ 推荐写法
  Path p1 = Path.of("project", "docs", "readme.txt");
  Path p2 = Path.of("C:/Users/lhx/Desktop/readme.txt");

  // Java7 ~ 10 的旧写法（Paths工具类）
  Path p3 = Paths.get("C:/Users/lhx/Desktop/readme.txt");

  // 与旧版本 File 类相互转换
  File oldFile = new File("readme.txt");
  Path p4 = oldFile.toPath(); // File -> Path
  File newFile = p4.toFile(); // Path -> File
}
```



### 常用方法

#### 获取基础信息

|      方法      | 描述             |
| :------------: | ---------------- |
| getFileName()  | 获取文件名       |
|  getParent()   | 获取父级路径     |
|   getRoot()    | 获取根目录       |
| getNameCount() | 获取路径层级深度 |
|   getName(n)   | 获取第 n 级目录  |

```java
public static void main(String[] args) {
  Path path = Path.of("C:/Users/lhx/Desktop/readme.txt");

  System.out.println("文件名：" + path.getFileName()); // readme.txt

  System.out.println("父级路径：" + path.getParent()); // C:\Users\lhx\Desktop

  System.out.println("根目录：" + path.getRoot()); // C:\

  System.out.println("路径层级深度：" + path.getNameCount()); // 4

  System.out.println("获取第 0 级目录：" + path.getName(0)); // Users
}
```



#### 路径拼接

|   方法    | 描述     |
| :-------: | -------- |
| resolve() | 路径拼接 |

```java
public static void main(String[] args) {
  Path baseDir = Path.of("C:/Users/lhx/Desktop");
  Path path = baseDir.resolve("readme.txt");
  System.out.println("拼接后的路径：" + path); // C:\Users\lhx\Desktop\readme.txt
}
```



#### Files 方法

|        方法         | 描述               |
| :-----------------: | ------------------ |
|      exists()       | 判断文件是否存在   |
|     notExists()     | 判定文件不存在     |
| createDirectories() | 创建文件夹         |
|    writeString()    | 向文件写入文本数据 |
|    readString()     | 读取文本数据       |
|   isRegularFile()   | 判断是否为普通文件 |
|       size()        | 文件大小           |
|       copy()        | 复制文件           |
|  deleteIfExists()   | 如果存在删除文件   |

::: code-group

```java [基础使用]
public static void main(String[] args) throws IOException {
  Path dir = Path.of("C:/Users/lhx/Desktop");
  Path file = dir.resolve("readme.txt");

  // 如果不存在，创建目录
  if (Files.notExists(file)) {
    Files.createDirectories(dir);
  }

  // 写入文本数据（覆盖之前的数据）
  Files.writeString(file, "Hello World\n这是第二行文本！");

  // 读取文本数据
  String content = Files.readString(file);
  System.out.println("读取文本：" + content);

  // 查询属性
  System.out.println("文件是否存在：" + Files.exists(file)); // true
  System.out.println("是否是普通文件：" + Files.isRegularFile(file)); // true
  System.out.println("文件大小：" + Files.size(file)); // 36

  // 复制与删除
  Path copy = dir.resolve("readme2.txt");
  Files.copy(file, copy, StandardCopyOption.REPLACE_EXISTING);
  System.out.println("复制成功：" + Files.exists(copy)); // true
  // 删除文件
  Files.deleteIfExists(copy);
}
```

```java [递归获取文件]
public static void main(String[] args) {
  Path root = Path.of("C:/Users/lhx/Desktop/demo");

  try (Stream<Path> stream = Files.walk(root)) {
    stream.filter(Files::isRegularFile)
      .filter(path -> path.toString().endsWith(".txt"))
      .forEach(path -> System.out.println(path.getFileName()));
  } catch (IOException e) {
    e.printStackTrace();
  }
}
```

:::
