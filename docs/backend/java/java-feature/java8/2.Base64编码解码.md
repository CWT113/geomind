---
date: 2025-12-23 15:16:42
---

# Base64 编码解码

>🔖 **本节前览：** 本节讲述 Java8 以后新添加的 Base64 编码解码操作。



Java8 中的编码解码类 `Base64` 位于 `java.util.Base64` 包下，它提供了三种类型的编码解码格式：

|     格式     | 描述                                                         |
| :----------: | ------------------------------------------------------------ |
|   简单类型   | 编码字符只包含 A-Z a-Z 0-9 + / 等64个字符，且编码时不包含换行 |
| URL 安全编码 | 编码字符只包含 A-Z a-z 0-9 + _ 等64个字符，和简单类型相比，把 / 换成了 _，因为没有了 / 字符，能更好的对 **URL地址** 和 **文件名** 进行编码 |
|  MIME 编码   | 编码会被映射为 MIME 友好格式，每一行默认不超过 76 个字符，且每行以 \r\n 符结束（最后一行除外） |



## 核心方法

`Base64` 类提供的都是静态方法，常用的如下：

|          方法           | 描述                                                |
| :---------------------: | --------------------------------------------------- |
|   Base64.getEncoder()   | 返回 `Base64.Decoder` 类型的 **简单** 编码器        |
|   Base64.getDecoder()   | 返回 `Base64.Encoder` 类型的 **简单** 解码器        |
| Base64.getUrlEncoder()  | 返回 `Base64.Decoder` 类型的 **URL和文件名** 编码器 |
| Base64.getUrlDecoder()  | 返回 `Base64.Encoder` 类型的 **URL和文件名** 解码器 |
| Base64.getMimeEncoder() | 返回 `Base64.Decoder` 类型的 **MIME** 编码器        |
| Base64.getMimeDecoder() | 返回 `Base64.Encoder` 类型的 **MIME** 解码器        |





## 简单类型

```java
@Test
@DisplayName("测试Base64简单编码解码")
void testBase64Simple() {
  String str = "Java8 Base64 编码解码";

  // 按 UTF-8 进行编码
  String strByEncoder = Base64.getEncoder()
    .encodeToString(str.getBytes(StandardCharsets.UTF_8));
  System.out.println(strByEncoder); // SmF2YTggQmFzZTY0IOe8lueggeino+eggQ==

  // 按 UTF-8 进行解码
  byte[] decode = Base64.getDecoder().decode(strByEncoder);
  String strByDecoder = new String(decode, StandardCharsets.UTF_8);
  System.out.println(strByDecoder); // Java8 Base64 编码解码
}
```



## URL 安全编码

```java
@Test
@DisplayName("测试Base64 URL和文件名安全编码解码")
void testBase64Url() {
  String str = "http://127.0.0.1:8080/list?name=1";

  // 安全编码
  String strByUrlEncoder = Base64.getUrlEncoder()
    .encodeToString(str.getBytes(StandardCharsets.UTF_8));
  System.out.println(strByUrlEncoder); // aHR0cDovLzEyNy4wLjAuMTo4MDgwL2xpc3Q_bmFtZT0x

  // 安全解码
  byte[] decode = Base64.getUrlDecoder().decode(strByUrlEncoder);
  String strByUrlDecoder = new String(decode, StandardCharsets.UTF_8);
  System.out.println(strByUrlDecoder); // http://127.0.0.1:8080/list?name=1
}
```



## MIME 编码

```java
@Test
@DisplayName("单元测试")
void testBase64MIME() {
  StringBuilder sb = new StringBuilder();
  for (int i = 0; i < 10; i++) {
    sb.append(UUID.randomUUID());
  }

  // MIME 编码
  byte[] bytes = sb.toString().getBytes(StandardCharsets.UTF_8);
  String strByMimeEncoder = Base64.getMimeEncoder().encodeToString(bytes); // 默认76个字符换行
  // String strByMimeEncoder = Base64.getMimeEncoder(32, "$$\n".getBytes(StandardCharsets.UTF_8)).encodeToString(bytes); // 以32个字符换行，并且换行结尾拼接$$
  System.out.println(strByMimeEncoder);

  // MIME 解码
  byte[] decode = Base64.getMimeDecoder().decode(strByMimeEncoder);
  String strByMimeDecoder = new String(decode, StandardCharsets.UTF_8);
  System.out.println(strByMimeDecoder);
}
```







