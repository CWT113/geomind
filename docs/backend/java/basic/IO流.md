# IO流

## IO流分类

![IO流](.\assets\IO流.png)



## OutputStream

### FileOutputStream

`FileOutputStream` 是 `OutputStream` 的一个实现类，可以用来将数据写入文件中，适用于处理二进制数据，比如图片、音频等。

构造函数：

| 构造函数                                      | 描述                                               |
| :-------------------------------------------- | -------------------------------------------------- |
| FileOutputStream(File file)                   | 通过File对象创建                                   |
| FileOutputStream(String name)                 | 通过文件名创建（文件存在则覆盖，不存在则创建）     |
| FileOutputStream(String name, boolean append) | 通过文件名创建，append为true表示以追加模式打开文件 |

常用方法：

| 方法                              | 描述                                       |
| --------------------------------- | ------------------------------------------ |
| write(int b)                      | 将单个字节写入输出流                       |
| write(byte[] b)                   | 将字节数组写入输出流                       |
| write(byte[] b, int off, int len) | 将字节数组写入输出流，并指定偏移位置和长度 |
| close()                           | 关闭输出流                                 |

::: code-group

```java [基本使用] {14}
@Test
public void test() throws IOException {
  FileOutputStream fos = new FileOutputStream("1.txt", true);
  // 添加单个字节
  fos.write(97);

  byte[] bytes = {97, 98, 99, 100, 101};
  // 添加字节数组
  fos.write(bytes);
  // 从索引2开始，偏移3个元素添加至输出流中
  fos.write(bytes, 2, 3);
  
  // 字符串转字节数组后存入
  byte[] bytes1 = "abcd".getBytes();
  fos.write(bytes1);

  // 关闭流
  fos.close();
}
```

```java [换行符的使用]
@Test
public void test1() throws IOException {
  FileOutputStream fos = new FileOutputStream("2.txt", true);

  // \r\n 和 \n 都表示换行符
  fos.write("白日依山尽\r\n".getBytes());
  fos.write("黄河入海流\n".getBytes());
  fos.write("欲穷千里目\n".getBytes());
  fos.write("更上一层楼\n".getBytes());

  fos.close();
}
```

:::







