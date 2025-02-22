# Common IO工具包

Common IO是由 Apache 出品的第三方工具包，里面对 IO流相关的操作进行了封装。



## 下载解压

使用步骤：

1. [官网下载 jar 包](https://commons.apache.org/io/download_io.cgi)：

![CommonIO工具包下载](.\assets\CommonIO下载.png)

2. 当前模块下创建 lib/libs 文件夹，将解压后的 jar 包放到此文件夹下；
3. 右击 jar 包，选择 【add as library】，弹框中 level 选择 module，此时上面的 name 输入框会变为空的，不用管，直接 ok 即可解压完成；



## IOUtils

| 方法                             | 描述                               |
| -------------------------------- | ---------------------------------- |
| copy(inputStream, outputStream); | 文件复制                           |
| closeQuietly(stream)             | 关闭任意流对象，并且内部会异常捕获 |

::: code-group

```java [文件复制] {6}
@Test
public void test() throws IOException {
  FileInputStream fis = new FileInputStream("E:\\StudyCode\\1.mp4");
  FileOutputStream fos = new FileOutputStream("E:\\StudyCode\\1_copy.mp4");

  IOUtils.copy(fis, fos);
}
```

```java [释放流资源] {11}
@Test
public void test1() {
  FileWriter fw = null;
  try {
    fw = new FileWriter("E:\\StudyCode\\1.txt");
    fw.write("你好，世界~~~");
  } catch (IOException e) {
    e.printStackTrace();
  } finally {
    // 内部可以捕获异常，并关闭流，释放资源
    IOUtils.closeQuietly(fw);
  }
}
```

:::



## FileUtils

| 方法                                 | 描述                                   |
| ------------------------------------ | -------------------------------------- |
| copyDirectoryToDirectory(file, file) | 复制一个文件到另一个文件夹（递归复制） |
| writeStringToFile(file, s)           | 写入字符串到指定的文件中               |
| readFileToString(file)               | 从指定文件中读取所有的字符串           |

::: code-group

```java [复制文件夹]
@Test
public void test() throws IOException {
  File oldFile = new File("E:\\StudyCode\\demo");
  File newFile = new File("E:\\StudyCode\\demo_copy");
  FileUtils.copyDirectoryToDirectory(oldFile, newFile);
}
```

```java [字符串写入文件]
@Test
public void test1() throws IOException {
  String s = "青青子衿，悠悠我心。";
  File file = new File("E:\\StudyCode\\1.txt");
  FileUtils.writeStringToFile(file, s);
}
```

```java [从文件读取字符串]
@Test
public void test2() throws IOException {
  File file = new File("E:\\StudyCode\\1.txt");
  String s = FileUtils.readFileToString(file);
  System.out.println(s);
}
```

:::