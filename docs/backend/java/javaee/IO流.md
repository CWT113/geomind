# IO 流

![2026-07-27_16-16-58](./assets/2026-07-27_16-16-58.png)



IO 流是 Java 中处理数据输入和输出的核心机制，以内存为核心：

- **输入流（Input）**：将外部数据读取到程序内存中；
- **输出流（Output）**：将程序内存中的数据写入到外部设备中；

Java 中的 IO 流主要分为 2 大类，区分的关键在于 **处理数据的最小单位**：

|  分类  |          抽象基类          |     最小处理单位      | 适用场景                                         |
| :----: | :------------------------: | :-------------------: | :----------------------------------------------- |
| 字节流 | InputStream / OutputStream |    8 位（1 byte）     | 所有文件类型（图片、音视频、二进制文件、文本等） |
| 字符流 |      Reader / Writer       | 16 位（2 byte，Char） | 纯文本文件（如 txt、java 等）                    |



## 字节输入流

### FileInputStream

它是 InputStream 的子类，用于操作本地文件的字节输入流，把 **本地文件中的数据读取到程序中**。

| 构造方法                     | 描述                         |
| ---------------------------- | ---------------------------- |
| FileInputStream(String name) | 根据文件路径字符串创建输入流 |
| FileInputStream(File file)   | 通过 File 对象创建           |

> [!NOTE] 注意
>
> 使用 FileInputStream 时，有以下几个注意点：
>
> - **资源释放**：操作完文件后，必须关闭流（调用 `close()`），否则会引发内存泄漏。强烈建议使用 `try-with-resources` 语法自动关闭；
> - **文本文件乱码风险**：由于 `FileInputStream` 是字节流，按字节读取中文时，如果把一个汉字的字节截断（比如用小缓冲区读取），就会出现乱码。如果仅处理纯文本文件，建议使用字符流代替；

::: code-group

```java {3,6} [基础写入]
public static void main(String[] args) {
  File file = new File("example.txt");
  try (FileInputStream fis = new FileInputStream(file)) {
    int data;
    // 循环读取单个字节，直到返回 -1 位置
    while ((data = fis.read()) != -1) {
      System.out.print((char) data); // 强制转为 char（仅适用于纯 ASCII 字符）
    }
  } catch (IOException e) {
    System.err.println("读取文件失败：" + e.getMessage());
  }
}
```

```java {3,5,7,9} [缓冲区写入（推荐）]
public static void main(String[] args) {
  String filePath = "example.txt";
  try (FileInputStream fis = new FileInputStream(filePath)) {
    // 定义一个 8KB 的缓冲区
    byte[] buffer = new byte[8192];
    int len;
    while ((len = fis.read(buffer)) != -1) {
      // 将读取到的字节数组全部转为字符串，并解决中文编码问题
      String content = new String(buffer, 0, len, StandardCharsets.UTF_8);
      System.out.print(content);
    }
  } catch (IOException e) {
    System.err.println(e.getMessage());
  }
}
```

:::





## 字节输出流

### FileOutputStream

它是 OutputStream 的子类，用于操作本地文件的字节输出流，把 **程序中的数据写入到本地文件中**。

| 构造方法                                      | 描述                                                         |
| --------------------------------------------- | ------------------------------------------------------------ |
| FileOutputStream(String name)                 | 向指定名称的文件中写入数据，会默认覆盖已有的文件内容         |
| FileOutputStream(File file)                   | 同上，传入的是 File 对象                                     |
| FileOutputStream(String name, boolean append) | 如果第二个参数是 true，则将数据追加到文件末尾，而不是清空覆盖 |

> [!NOTE] 注意
>
> 使用 FileOutputStream 时，有以下几个注意点：
>
> - **资源释放**：操作完文件后，必须关闭流（调用 `close()`），否则会引发内存泄漏。强烈建议使用 `try-with-resources` 语法自动关闭；
> - **父目录不存在**：如果文件不存在，流会自动创建文件，但是流不会自动创建缺失的父目录；
> - **字符编码问题**：如果要写入中文内容，调用 `getBytes()` 时需要显式指定编码格式，否则在不同操作系统之间容易出现乱码；

::: code-group

```java {13,15,17} [自动关闭流（推荐）]
public static void main(String[] args) throws IOException {
  File file = new File("example.txt");
  // 当有多层路径时，获取父目录，不存在时自动创建
  File parentDir = file.getParentFile();
  if (parentDir != null && !parentDir.exists()) {
    parentDir.mkdirs();
  }

  String content = "Hello, Java IO\n这是写入的一行中文！\n";
  // 使用 try-with-resources 自动释放流资源
  try (FileOutputStream fos = new FileOutputStream(file, true)) { // [!code ++]
    // 获取字节数组时，显式指定字符编码
    byte[] bytes = content.getBytes(StandardCharsets.UTF_8);
    // 写入文件
    fos.write(bytes);
    // 刷新缓冲区（虽然 FileOutputStream 会直接写入，但养成 flush 的好习惯）
    fos.flush();
    System.out.println("数据写入成功！");
  } catch (IOException e) {
    System.err.println("文件写入失败：" + e.getMessage());
  }
}
```

```java [手动关闭流]
public static void main(String[] args) throws IOException {
  // 创建流
  FileOutputStream fos = new FileOutputStream("a.txt");
  // 写入内容，97是ASCII码值
  fos.write(97);
  // 手动关闭流
  fos.close();
}
```

```java [复制文件]
public static void main(String[] args) {
  String sourcePath = "source.png";
  String destPath = "source-new.png";

  try (FileInputStream fis = new FileInputStream(sourcePath);
       FileOutputStream fos = new FileOutputStream(destPath)) {
    // 定义一个 8KB 的缓冲区
    byte[] buffer = new byte[8192];
    int len;
    while ((len = fis.read(buffer)) != -1) {
      // 只写入读取到的实际长度 (0, len)，避免最后一次读取写入过多的垃圾数据
      fos.write(buffer, 0, len);
    }
    System.out.println("复制成功！");
  } catch (IOException e) {
    System.err.println(e.getMessage());
  }
}
```

:::



## 字符输入流



















## 字符输出流







