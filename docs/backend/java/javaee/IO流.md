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

```java {3,6} [基础读取]
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

```java {3,5,7,9} [缓冲区读取（推荐）]
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



### BufferedInputStream

BufferedInputStream（缓冲输入流）也是 InputStream 的子类，它本身并不直接与底层数据（如磁盘文件、网络套接字）建立连接，而是 **包裹另一个 InputStream，在内存中维护一个内部字节缓冲区**。

> [!NOTE] 工作原理
>
> - **传统的 `FileInputStream`**：每次读取 1 个字节，就要向操作系统发起一次磁盘 IO 请求，频繁的系统调用会导致效率极低；
> - **`BufferedInputStream`**：当请求读取字节时，它会一次性从底层流中预 **读出一大块数据**（默认 8KB）填充到内存缓冲区中，后续的读取操作直接从内存缓冲区中拿数据，当缓冲区空了才会再次发起磁盘 IO；

> [!TIP] 适用场景
>
> - **频繁读取小量数据**：例如逐字节读取文件内容，解析特定的二进制协议格式等；
> - **需要支持重置**：FileInputStream 不支持指针回退，而 BufferedInputStream 支持 `mark()` 和 `reset()` 操作，可以在读取过程中标记当前位置，并稍后跳回；
> - **提升低级流的读取效率**：包装网络流货基础文件流，减少实际的网络/磁盘交互次数；

| 构造方法                                      | 描述                       |
| --------------------------------------------- | -------------------------- |
| BufferedInputStream(InputStream in)           | 使用默认缓冲区包装指定流   |
| BufferedInputStream(InputStream in, int size) | 指定自定义缓冲区包装指定流 |

::: code-group

```java {5} [基础读取]
public static void main(String[] args) {
  String filePath = "text.txt";

  // 使用 BufferedInputStream 把 FileInputStream 包装起来
  try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream(filePath))) {
    byte[] buffer = new byte[1024];
    int len;
    while ((len = bis.read(buffer)) != -1) {
      String content = new String(buffer, 0, len, StandardCharsets.UTF_8);
      System.out.println(content);
    }
  } catch (IOException e) {
    e.printStackTrace();
  }
}
```

```java {5,11,13,21} [回退读取]
public static void main(String[] args) {
  byte[] data = "ABCDEFGH".getBytes();

  try (ByteArrayInputStream bais = new ByteArrayInputStream(data);
       BufferedInputStream bis = new BufferedInputStream(bais)) {
    // 读取前两个字节
    System.out.println((char) bis.read()); // A
    System.out.println((char) bis.read()); // B

    // 检查是否支持 mark() / reset()
    if (bis.markSupported()) {
      // 标记当前位置（指向'C'），设置最多再读10个字节内标记有效
      bis.mark(10);
    }

    // 继续读取两个字节
    System.out.println((char) bis.read()); // C
    System.out.println((char) bis.read()); // D

    // 回退
    bis.reset();

    // 继续读取两个字节
    System.out.println((char) bis.read()); // C
    System.out.println((char) bis.read()); // D
  } catch (IOException e) {
    e.printStackTrace();
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



### BufferedOutputStream

BufferedOutputStream（缓冲字节输出流）是 OutputStream 的子类，它自己并不负责把数据真正写入到磁盘，而是用于 **包装另一个 OutputStream**，它在内存中维护了一个 内部字节缓冲区。

> [!NOTE] 工作原理
>
> - **传统 `FileOutputStream`**：每次调用 `write(int)` 写入 1 个字节，操作系统就需要进行一次 IO 操作，效率极低；
> - **`BufferedOutputStream`**：当调用 `write()` 写入字节时，数据会先存在它的 **内存缓冲区** 中。只有当发生以下三种情况时，才会批量一次性写入底层的输入流：
>   - 内存缓冲区满了（默认大小为 8KB）；
>   - 显示调用了 `flush()` 方法；
>   - 流被关闭（调用了 `close()` 方法）；

> [!TIP] 适用场景
>
> - **频繁写入少量数据**：如在一个大循环里逐个字节、逐行地写文件，或者频繁向网络 Socket 写入小数据包；
> - **需要批量写入磁盘以提升性能**：包装 FileOutputStream，极大减少磁盘 IO 操作；

| 构造方法                                         | 描述                                      |
| ------------------------------------------------ | ----------------------------------------- |
| BufferedOutputStream(OutputStream out)           | 使用默认的缓冲区包装底层输出流（默认 8KB） |
| BufferedOutputStream(OutputStream out, int size) | 使用自定义的缓冲区包装底层输出流          |

::: code-group

```java {5,6,15} [基础写入]
public static void main(String[] args) {
  String filePath = "text.txt";

  // close() 内部会自动触发 flush() 刷盘，然后再关闭底层 FileOutputStream
  try (FileOutputStream fos = new FileOutputStream(filePath);
       BufferedOutputStream bos = new BufferedOutputStream(fos)) {
    // 模拟频繁写入小数据
    for (int i = 0; i < 1000; i++) {
      String line = "这是第 " + i + " 行数据。\n";
      byte[] bytes = line.getBytes(StandardCharsets.UTF_8);
      // 优先写入 8KB 的内存缓冲区
      bos.write(bytes);
    }
    // 如果有些关键数据需要立刻写入，可以手动flush()
    bos.flush();
    System.out.println("数据写入完毕！");
  } catch (IOException e) {
    e.printStackTrace();
  }
}
```

```java {6,7} [复制文件]
public static void main(String[] args) {
  String sourcePath = "example.mp4";
  String newPath = "example_copy.mp4";

  long start = System.currentTimeMillis();
  try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream(sourcePath));
       BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(newPath))) {
    byte[] buffer = new byte[8192];
    int len;
    while ((len = bis.read(buffer)) != -1) {
      bos.write(buffer, 0, len);
    }
    long end = System.currentTimeMillis();
    System.out.println("文件复制完毕，耗时：" + (end - start) + "ms");
  } catch (IOException e) {
    e.printStackTrace();
  }
}
```

:::



## 字符输入流

### FileReader

FileReader（文件字符输入流）是专门用于 **从文件中读取字符数据** 的便捷类。它是 `InputStreamReader` 的子类，属于字符流。与字节流按字节读取不同，FileReader 会自动根据指定的字符集将字节解码为字符，因此非常适合直接读取文本文件。

| 构造方法                                     | 描述                             |
| -------------------------------------------- | -------------------------------- |
| FileReader(String fileName)                  | 通过文件路径字符串构建字符输入流 |
| FileReader(File file)                        | 通过 File 对象创建字符输入流     |
| FileReader(String fileName, Charset charset) | 指定字符集读取文件（推荐）       |

```java {3}
public static void main(String[] args) {
  File file = new File("example.txt");
  try (FileReader reader = new FileReader(file, StandardCharsets.UTF_8)) {
    char[] buffer = new char[8192];
    int len;
    while ((len = reader.read(buffer)) != -1) {
      String content = new String(buffer, 0, len);
      System.out.println(content);
    }
  } catch (IOException e) {
    e.printStackTrace();
  }
}
```



### BufferedReader

BufferedReader 是 IO 流中专门用来从字符输入流中高效读取文本的缓冲字符输入流，它本身不直接读取底层文件，而是 **包装另一个字符输入流**（如 FileReader），并在内存中维护一个字符缓冲区。

> [!NOTE] 工作原理
>
> - **传统 FileReader**：每次调用 `read()` 读取字符时，都可能触发一次针对底层文件或系统的读取操作，频繁读写磁盘效率较低；
> - **BufferedReader**：一次性从底层数据源预读一大块字符数据存入内存缓冲区，当后续调用 `read()` 或 `readLine()` 时，优先直接从内存中拿数据，只有缓冲区空了才会再次触发底层的真实读取；

| 构造方法                          | 描述                                           |
| --------------------------------- | ---------------------------------------------- |
| BufferedReader(Reader in)         | 使用默认缓冲区大小（8192 字符）包装指定的字符流 |
| BufferedReader(Reader in, int sz) | 使用自定义缓冲区大小包装指定的字符流           |

```java {4,14}
public static void main(String[] args) {
  String filePath = "example.txt";

  try (BufferedReader br = new BufferedReader(new FileReader(filePath, StandardCharsets.UTF_8))) {
    char[] buffer = new char[8192];
    int len;
    while ((len = br.read(buffer)) != -1) {
      String content = new String(buffer, 0, len);
      System.out.println(content);
    }

    // 或者使用 readLine() 逐行读取，到达末尾返回 null
    String line;
    while ((line = br.readLine()) != null) {
      System.out.println(line);
    }
  } catch (IOException e) {
    e.printStackTrace();
  }
}
```



### InputStreamReader

InputStreamReader 是 IO 流中非常核心的 **转换流**，它是 **从字节流到字符流的桥梁**。它继承自 Reader（字符输入流），能够读取字节并使用指定的字符集将其解码为字符。

> [!NOTE] 适用场景
>
> - **解决乱码问题（核心）**：当文件的编码格式（如 GBK）与系统默认编码不一致时，使用 InputStreamReader 可以显式指定字符集进行读取；
> - **将字节流转换为字符流**：比如把控制台标准输入或网络 Socket 接收到的字节流转换为字符流，以便使用 BufferedReader 逐行读取；

| 构造方法                                          | 描述                                   |
| ------------------------------------------------- | -------------------------------------- |
| InputStreamReader(InputStream in)                 | 使用系统默认字符集包装指定的字节输入流 |
| InputStreamReader(InputStream in, String charset) | 指定字符集编码名称包装字节流           |
| InputStreamReader(InputStream in, Charset cs)     | 指定字符集编码名称包装字节流           |

::: code-group

```java [读取文件内容] {6}
public static void main(String[] args) {
  // 文件的编码格式是 GBK
  String filePath = "example.txt";

  // 显式指定使用 GBK 格式编码读取，默认 UTF 格式会导致乱码
  try (InputStreamReader isr = new InputStreamReader(new FileInputStream(filePath), Charset.forName("GBK"))) {
    System.out.println("当前使用的编码格式是：" + isr.getEncoding());

    char[] buffer = new char[8192];
    int len;
    while ((len = isr.read(buffer)) != -1) {
      String content = new String(buffer, 0, len);
      System.out.println(content);
    }
  } catch (IOException e) {
    e.printStackTrace();
  }
}
```

```java [读取控制台内容] {4}
public static void main(String[] args) {
  System.out.println("请输入内容（输入 exit 退出）：");

  try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8))) {
    String input;
    while ((input = br.readLine()) != null) {
      if ("exit".equals(input)) {
        System.out.println("程序退出");
        break;
      }
      System.out.println(input);
    }
  } catch (IOException e) {
    e.printStackTrace();
  }
}
```

:::



## 字符输出流

### FileWriter

FileWriter 是 IO 流中专门用来 **将字符数据写入文件** 的便捷类。它是 OutputStreamWriter 的子类，属于字符流。与字节流不同，FileWriter 可以直接接收 char 或 String 类型的数据，并自动将其编码为字节后写入文件，非常适合处理文本文件。

| 构造方法                                                     | 描述                                           |
| ------------------------------------------------------------ | ---------------------------------------------- |
| FileWriter(String fileName)                                  | 覆盖写入指定路径的文件                         |
| FileWriter(File file)                                        | 覆盖写入指定的 File 对象                       |
| FileWriter(String fileName, boolean append)                  | append 为 true，表示追加模式，不会清空原有文件 |
| FileWriter(String fileName, Charset charset)                 | 指定字符集写入文件（推荐使用）                 |
| FileWriter(String fileName, Charset charset, boolean append) | 指定字符集加追加模式                           |

```java {10}
public static void main(String[] args) {
  File file = new File("example.txt");

  // 确保父目录存在
  File parentDir = file.getParentFile();
  if (parentDir != null && !parentDir.exists()) {
    parentDir.mkdirs();
  }

  try (FileWriter writer = new FileWriter(file, StandardCharsets.UTF_8)) {
    writer.write("Hello World");
    writer.write(System.lineSeparator()); // 系统标准的换行符
    writer.write("这是第二行写入的中文内容。\n");

    System.out.println("写入文件成功！");
  } catch (IOException e) {
    e.printStackTrace();
  }
}
```



### BufferedWriter

BufferedWriter 是 IO 流中专门用来高效写入字符数据的缓冲字符输出流，它本身不直接负责将字符写入文件，而是包装另一个字符输出流，并在内部中维护一个字符缓冲区。

| 构造方法                           | 描述                                               |
| ---------------------------------- | -------------------------------------------------- |
| BufferedWriter(Writer out)         | 使用默认缓冲区大小（8192 字符）包装指定的字符输出流 |
| BufferedWriter(Writer out, int sz) | 自定义字符缓冲区的大小                             |

```java {11}
public static void main(String[] args) {
  File file = new File("example.txt");

  // 确保父目录存在
  File parentDir = file.getParentFile();
  if (parentDir != null && !parentDir.exists()) {
    parentDir.mkdirs();
  }

  // 指定字符集编码并追加写入文件
  try (BufferedWriter bw = new BufferedWriter(new FileWriter(file, StandardCharsets.UTF_8, true))) {
    bw.write("Hello World");
    bw.write(System.lineSeparator()); // 系统标准的换行符
    bw.write("这是第二行写入的中文内容。\n");

    System.out.println("写入文件成功！");
  } catch (IOException e) {
    e.printStackTrace();
  }
}
```





### OutputStreamWriter

OutputStreanWriter 是 IO 流中的转换流。它是从 **字符流到字节流转换的桥梁**。它继承自 Writer（字符输出流），能够接收字符，并根据指定的字符集将其编码为字节，然后写入底层的字节输出流。

> [!NOTE] 适用场景
>
> - **解决跨平台写入乱码问题**：当你需要明确指定文件的保存编码格式时使用；
> - **将字符流转换为字节流**：将 BufferedWriter 产生的字符文本转换后写入网络 Socket 的字节输出流中；

| 构造函数                                             | 描述                                   |
| ---------------------------------------------------- | -------------------------------------- |
| OutputStreamWriter(OutputStream out)                 | 使用系统默认字符集包装指定的字节输出流 |
| OutputStreamWriter(OutputStream out, String charset) | 指定字符编码包装字节流                 |
| OutputStreamWriter(OutputStream out, Charset cs)     | 指定 Charset 对象包装字节流            |

```java
public static void main(String[] args) {
  String filePath = "example.txt";

  try (OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(filePath), Charset.forName("GBK"))) {
    System.out.println("当前写入使用的编码是：" + osw.getEncoding());

    osw.write("hello world \n");
    osw.write("这是一行中文文本");

    osw.flush();
    System.out.println("写入文本成功！");

  } catch (IOException e) {
    e.printStackTrace();
  }
}
```
