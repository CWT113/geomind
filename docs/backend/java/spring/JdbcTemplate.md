# JdbcTemplate

`JdbcTemplate` 是 Spring 框架中提供的用于简化 JDBC 操作的工具类。



## 基础配置

引入 Spring 中对 JdbcTemplate 支持的包，以及 MySQL、Druid 等包：

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>6.2.6</version>
  </dependency>

  <dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
  </dependency>

  <dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.24</version>
  </dependency>
</dependencies>
```

创建名称为 spring 的数据库，并创建 `t_emp` 表用于后续测试：

```sql
CREATE TABLE `t_emp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `age` int NOT NULL,
  `sex` varchar(2) NOT NULL,
  PRIMARY KEY (`id`)
)
```

创建 jdbc.properties 配置文件，写入数据库连接信息：

```properties
jdbc.username=root
jdbc.password=1234
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/spring
```

创建 bean.xml，配置 Druid 连接池并创建 JdbcTemplate 对象：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

  <!--引入外部jdbc.properties配置文件-->
  <context:property-placeholder location="classpath:jdbc.properties"/>
  <bean id="druidDataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="url" value="${jdbc.url}"/>
    <property name="driverClassName" value="${jdbc.driver}"/>
    <property name="username" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
  </bean>

  <!--创建JdbcTemplate对象，注入dataSource属性-->
  <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
    <property name="dataSource" ref="druidDataSource"/>
  </bean>
</beans>
```



## 增/删/改

JdbcTemplate 中，增/删/改操作执行的是相同的方法，只不过 SQL 语句不相同而已。

::: code-group

```java [增加] {11}
// XML方式注入
@SpringJUnitConfig(locations = "classpath:bean.xml")
public class JdbcTemplateTest {
  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Test
  public void testAdd() {
    String sql = "insert into t_emp values (null, ?, ?, ?)";
    Object[] params = {"傅白衣", 40, "男"};
    int affectRows = jdbcTemplate.update(sql, params);
    System.out.println("操作成功，受影响行数：" + affectRows);
  }
}
```

```java [删除] {10}
// XML方式注入
@SpringJUnitConfig(locations = "classpath:bean.xml")
public class JdbcTemplateTest {
  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Test
  public void testDel() {
    String sql = "delete from t_emp where id = ?";
    int affectRows = jdbcTemplate.update(sql, 1);
    System.out.println("操作成功，受影响行数：" + affectRows);
  }
}
```

```java [修改] {11}
// XML方式注入
@SpringJUnitConfig(locations = "classpath:bean.xml")
public class JdbcTemplateTest {
  @Autowired
  private JdbcTemplate jdbcTemplate;

  @Test
  public void testUpdate() {
    String sql = "update t_emp set name = ? where id = ?";
    Object[] params = {"李修缘", 1};
    int affectRows = jdbcTemplate.update(sql, params);
    System.out.println("操作成功，受影响行数：" + affectRows);
  }
}
```

:::



## 查询

::: code-group

```java [JdbcTemplateTest] {13,23,34}
@SpringJUnitConfig(locations = "classpath:bean.xml")
public class JdbcTemplateTest {
  @Autowired
  private JdbcTemplate jdbcTemplate;

  /**
   * 查询单个对象
   */
  @Test
  public void testSelectObject() {
    String sql = "select * from t_emp where id = ?";
    // 通过 BeanPropertyRowMapper，将查询的结果转换为 Emp 类
    Emp emp = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Emp.class), 2);
    System.out.println(emp); // Emp{id=2, name='陈伟霆', age=25, sex='男'}
  }

  /**
   * 查询多个列表对象
   */
  @Test
  public void testSelectList() {
    String sql = "select * from t_emp";
    List<Emp> emps = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Emp.class));
    System.out.println(emps);
    // [Emp{id=2, name='陈伟霆', age=25, sex='男'}, Emp{id=3, name='傅白衣', age=40, sex='男'}]
  }

  /**
   * 查询单个值
   */
  @Test
  public void testSelectSingleValue() {
    String sql = "select count(*) from t_emp";
    Integer count = jdbcTemplate.queryForObject(sql, Integer.class);
    System.out.println("表中共有数据 " + count + " 条");
  }
}
```

```java [Emp]
public class Emp {
  private Integer id;
  private String name;
  private Integer age;
  private String sex;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getAge() {
    return age;
  }

  public void setAge(Integer age) {
    this.age = age;
  }

  public String getSex() {
    return sex;
  }

  public void setSex(String sex) {
    this.sex = sex;
  }

  @Override
  public String toString() {
    return "Emp{" +
      "id=" + id +
      ", name='" + name + '\'' +
      ", age=" + age +
      ", sex='" + sex + '\'' +
      '}';
  }
}
```

:::



## 改写为全注解开发

上面的配置和使用都是基于 XML 方式的，可以改写为全注解方式开发。

新建 `DataSourceConfig` 类，用于创建 Druid 连接池和注入 JdbcTemplate 对象：

```java
@Configuration
@PropertySource("classpath:jdbc.properties")
public class DataSourceConfig {
  @Value("${jdbc.url}")
  private String url;

  @Value("${jdbc.driver}")
  private String driverClassName;

  @Value("${jdbc.username}")
  private String username;

  @Value("${jdbc.password}")
  private String password;

  /**
   * 创建 Druid 连接池
   * @return DataSource 数据源对象
   */
  @Bean // 告诉IoC容器，我要手动注入一个 Bean 对象
  public DataSource dataSource() {
    DruidDataSource dataSource = new DruidDataSource();
    dataSource.setUrl(url);
    dataSource.setDriverClassName(driverClassName);
    dataSource.setUsername(username);
    dataSource.setPassword(password);
    return dataSource;
  }

  /**
   * 获取JdbcTemplate对象
   * @param dataSource Druid数据源
   * @return 绑定了DataSource的JdbcTemplate对象
   */
  @Bean
  public JdbcTemplate jdbcTemplate(DataSource dataSource) {
    return new JdbcTemplate(dataSource); // 注入dataSource
  }
}
```

新建 `SpringConfig`，用于开启组件自动扫描：

```java
@Configuration
@ComponentScan("com.geomind")
public class SpringConfig {
}
```

在单元测试中，配合 Junit5 进行测试：

```java {1}
@SpringJUnitConfig(SpringConfig.class)
public class JdbcTemplateTest {
  @Autowired
  private JdbcTemplate jdbcTemplate;

  /**
   * 查询多个列表对象
   */
  @Test
  public void testSelectList() {
    String sql = "select * from t_emp";
    List<Emp> emps = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Emp.class));
    System.out.println(emps);
  }
}
```
