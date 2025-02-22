# Properties

Properties 继承自 HashTable，用来表示一组键值对。

通常，Properties 类用于处理配置文件或者环境设置，他特别适用于存储和读取配置信息，如 `*.properties` 文件中的内容。



::: warning 创建 *.properties 时的注意事项

1. key和value必须是 key=value 形式，=号左右不需要加空格；
2. key和value都是 String 类型的，但是不需要加 ""；
3. 每个键值对写完以后，需要换行写下一个键值对，不需要 ; 结尾；
4. 每个键值对不建议使用中文；

```properties
jdbc.host=127.0.0.1
jdbc.port=9201
jdbc.username=root
jdbc.password=123456

# 可以使用 . 号，也可以不用
username=admin
password=123456
```

:::



构造函数：

| 构造函数                        | 描述                                               |
| ------------------------------- | -------------------------------------------------- |
| Properties()                    | 创建一个空的 Properties 对象                       |
| Properties(Properties defaults) | 可以传递一个已有的 Properties 对象，类似于复制内容 |

```java {7}
@Test
public void test1() {
  Properties defaultProps = new Properties();
  defaultProps.setProperty("username", "admin");
  defaultProps.setProperty("password", "123456");

  Properties props = new Properties(defaultProps);
  props.list(System.out);
}
```



常用方法：

| 方法                           | 描述                                                  |
| ------------------------------ | ----------------------------------------------------- |
| setProperty(key, value)        | 设置键值对，键已存在时，更新其值                      |
| getProperty(key)               | 根据键获取值，不存在返回 null                         |
| getProperty(key, defaultValue) | 根据键获取值，不存在返回 defaultValue                 |
| load(InputStream in)           | 从输入流中加载属性文件，通常用于读取 .properties 文件 |
| list(System.out)               | 输出 Properties 对象的内容，快速查看所有键值对        |
| stringPropertyNames()          | 获取键值对集合，以 `Set<String>` 形式返回             |

```java
@Test
public void test() throws IOException {
  Properties properties = new Properties();
  // 使用 load 方法，加载文件输入流对象，获取 Properties 的内容
  FileInputStream fis = new FileInputStream("jdbc.properties");
  properties.load(fis);

  // 快速打印查询 Properties 属性
  properties.list(System.out);
  fis.close();

  // 获取 Properties 所有键值对集合
  Set<String> names = properties.stringPropertyNames();
  for (String key : names) {
    String value = properties.getProperty(key);
    System.out.println(key + "=" + value);
  }
}
```