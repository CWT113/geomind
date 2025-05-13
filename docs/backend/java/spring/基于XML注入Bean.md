# 基于XML注入Bean

## 获取Bean

获取 Bean 的方式一共有三种：

- 通过 **名称** 获取
- 通过 **类型** 获取
- 通过 **名称+类型** 获取

::: code-group

```java [UserTest] {7,11,15}
@Test
public void testUser() {
  ApplicationContext context
    = new ClassPathXmlApplicationContext("bean.xml");

  // 方式一：通过xml中的 id 属性获取
  User user1 = (User) context.getBean("user");
  System.out.println("user1 = " + user1); // com.geomind.dtos.User@77b14724

  // 方式二：通过类型获取
  User user2 = context.getBean(User.class);
  System.out.println("user2 = " + user2); // com.geomind.dtos.User@77b14724

  // 方式三：通过id属性和类型同时获取
  User user3 = context.getBean("user", User.class);
  System.out.println("user3 = " + user3); // com.geomind.dtos.User@77b14724
}
```

```xml [bean.xml] {5}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  <bean id="user" class="com.geomind.dtos.User"></bean>
</beans>
```

:::

::: warning 注意点1

当根据 **类型获取 Bean 时**，要求 IoC 容器中 **指定类型的 Bean 只能有一个**。

> 例如，当在 `bean.xml` 中为同一个类配置了两个 `<bean>`，这时会报错！

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  <!-- 同一个类允许配置多次，但是id值必须不同，如果相同则会报错 -->
  <bean id="user" class="com.geomind.dtos.User"></bean>
  <bean id="user" class="com.geomind.dtos.User"></bean> <!-- ❌ -->
  <bean id="user1" class="com.geomind.dtos.User"></bean> <!-- ✔️ -->
</beans>
```

  <br/>

```java
@Test
public void testUser() {
  ApplicationContext context = new ClassPathXmlApplicationContext("bean.xml");
  // 根据类型获取bean时，重复配置是会报错的
  // 解决办法：使用id方式获取，或者使用id+类型同时获取
  User user2 = context.getBean(User.class); // 报错
}
```

:::

::: warning 注意点 2

当 **一个接口有多个实现类时**，通过 **接口获取 Bean 也会报错**，一个接口只能获取一个实现类的 Bean。

```xml [bean.xml]
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  <!-- 配置 Person 接口的两个实现类 -->
  <bean id="userImpl" class="com.geomind.dtos.UserImpl"></bean>
  <bean id="personImpl" class="com.geomind.dtos.PersonImpl"></bean>
</beans>
```

<br/>

```java [UserDaoTest]
@Test
public void testUserDao() {
  ApplicationContext context = new ClassPathXmlApplicationContext("bean.xml");
  // 当bean.xml中为同一个接口的多个实现类进行了配置时，通过类型获取会报错
  IUserDao userDao = context.getBean(IUserDao.class); // 报错
}
```

:::



## 依赖注入的方式

### Setter注入

::: info 提示

使用 Setter 进行注入时，如果类中有空构造器的话，空构造器是会执行的！

:::

::: code-group

```xml [bean.xml] {6-10}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  <!-- Setter方式注入 -->
  <bean id="book" class="com.geomind.dtos.Book">
    <!-- name属性的值就是setter方法去掉set后首字母小写 -->
    <property name="name" value="红楼梦"/>
    <property name="author" value="曹雪芹"/>
  </bean>
</beans>
```

```java [Book]
public class Book {
  private String name;
  private String author;

  public Book() {
    // 空构造器也是会执行的（原因可查看bean的生命周期）
    System.out.println("empty constructor");
  }

  public void setAuthor(String author) {
    this.author = author;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "Book{" +
      "name='" + name + '\'' +
      ", author='" + author + '\'' +
      '}';
  }
}
```

```java [BookTest]
@Test
public void testBookSetter() {
  ApplicationContext context = new ClassPathXmlApplicationContext("bean.xml");
  Book book = context.getBean("book", Book.class);
  System.out.println("book = " + book); // Book{name='红楼梦', author='曹雪芹'}
}
```

:::



### 构造器注入

::: code-group

```xml [bean.xml] {6-9}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
	<!-- 构造器方式注入 -->
  <bean id="book" class="com.geomind.dtos.Book">
    <constructor-arg name="name" value="红楼梦"/>
    <constructor-arg name="author" value="曹雪芹"/>
  </bean>
</beans>
```

```java [Book]
public class Book {
  private String name;
  private String author;

  public Book() {
    System.out.println("empty constructor");
  }

  public Book(String name, String author) {
    System.out.println("not empty constructor");
    this.name = name;
    this.author = author;
  }

  @Override
  public String toString() {
    return "Book{" +
      "name='" + name + '\'' +
      ", author='" + author + '\'' +
      '}';
  }
}
```

```java [BookTest]
@Test
public void testBookConstructor() {
  ApplicationContext context = new ClassPathXmlApplicationContext("bean.xml");
  Book book = context.getBean("book", Book.class);
  System.out.println("book = " + book); // Book{name='红楼梦', author='曹雪芹'}
}
```

:::



## 特殊类型注入

### null值和特殊符号注入

特殊类型主要有 `null` 值、特殊符号（如 `>` 、`<` 等）、`CDATA` 节等。

>下面是 Setter 注入中 property 的写法，在使用 构造器 注入时，写法也是一样的。

::: code-group

```xml [Setter注入] {6-8,11,14-16}
<bean id="book" class="com.geomind.dtos.Book">
  <property name="name" value="红楼梦"/>
  <property name="author" value="曹雪芹"/>

  <!-- 要给属性赋值为null时，需要使用 <null /> 标签 -->
  <property name="other">
    <null/>
  </property>

  <!-- 要赋值的内容中包含了特殊符号，需要使用字符实体代替 -->
  <property name="other" value="a &lt; b"/>
  
  <!-- 要复制的内容中包含了特殊符号，也可以使用 CDATA节 操作 -->
  <property name="other">
    <value><![CDATA[a < b]]></value>
  </property>
</bean>
```

```xml [构造器注入]
<bean id="book" class="com.geomind.dtos.Book">
  <constructor-arg name="name" value="西游记"></constructor-arg>
  <constructor-arg name="author" value="吴承恩"></constructor-arg>

  <!-- 构造器赋 null 值 -->
  <constructor-arg name="other">
    <null/>
  </constructor-arg>

  <!-- 构造器赋值特殊符号 -->
  <constructor-arg name="other" value="a &lt; b"></constructor-arg>

  <!-- 构造器赋值CDATA节 -->
  <constructor-arg name="other">
    <value><![CDATA[a < b]]></value>
  </constructor-arg>
</bean>
```

:::



### 对象类型的注入

对象类型注入有两种方式：

- 引入外部 bean 注入
- 引入内部 bean 注入

>例如员工类和部门类，员工类初始化时要指定是哪个部门，这时候就要为员工类指定部门。

::: details 员工类和部门类

::: code-group

```java [Employee] {5,22}
public class Employee {
  private String empName;
  private Integer age;
  // 部门信息
  private Dept dept;

  public void setEmpName(String empName) {
    this.empName = empName;
  }

  public void setAge(Integer age) {
    this.age = age;
  }

  public void setDept(Dept dept) {
    this.dept = dept;
  }

  public void work() {
    System.out.println(this.empName + "：" + this.age + "岁，正在工作."); 
    // 调用部门的方法
    this.dept.info();
  }
}
```

```java [Dept]
public class Dept {
  private String deptName;

  public void setDeptName(String deptName) {
    this.deptName = deptName;
  }

  public void info() {
    System.out.println("所在部门: " + deptName); 
  }
}
```

:::



#### 引入外部Bean

::: code-group

```xml [bean.xml] {6-8,14}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  <!-- 定义部门类的初始化参数 -->
  <bean id="dept" class="com.geomind.dtos.Dept">
    <property name="deptName" value="研发部"/>
  </bean>

  <bean id="employee" class="com.geomind.dtos.Employee">
    <property name="empName" value="王一博"/>
    <property name="age" value="25"/>
    <!-- 通过ref属性链接到外部bean的id属性 -->
    <property name="dept" ref="dept"/>
  </bean>
</beans>
```

```java [EmployeeTest]
@Test
public void testEmployee() {
  ApplicationContext context = new ClassPathXmlApplicationContext("bean.xml");
  Employee employee = context.getBean("employee", Employee.class);
  employee.work(); // 王一博：20岁，正在工作.
}
```

:::



#### 引入内部Bean

```xml [bean.xml] {10-14}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  <bean id="employee" class="com.geomind.dtos.Employee">
    <property name="empName" value="陈伟霆"/>
    <property name="age" value="25"/>

    <!-- 内部bean，就是把要引入的类挪到 property 中定义，不需要单独指定id属性 -->
    <property name="dept">
      <bean class="com.geomind.dtos.Dept">
        <property name="deptName" value="财务部"/>
      </bean>
    </property>
  </bean>
</beans>
```



### 数组类型注入

>例如员工类，一个员工可能会有多个爱好（hobbies），此时爱好就可以用数组存储。

::: code-group

```xml [bean.xml] {9-16}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  <bean id="employee" class="com.geomind.dtos.Employee">
    <property name="empName" value="陈伟霆"/>
    <property name="age" value="25"/>

    <property name="hobbies">
      <!--通过array标签，来为数组类型赋值多个值-->
      <array>
        <value>吃饭</value>
        <value>睡觉</value>
        <value>敲代码</value>
      </array>
    </property>
  </bean>
</beans>
```

```java [Empolyee] {4}
public class Employee {
  private String empName;
  // 数组类型
  private String[] hobbies;

  public void setEmpName(String empName) {
    this.empName = empName;
  }

  public void setHobbies(String[] hobbies) {
    this.hobbies = hobbies;
  }

  public void work() {
    System.out.println(Arrays.toString(this.hobbies)); // [吃饭,睡觉,敲代码]
  }
}
```

:::



### 集合类型注入

> 例如员工类和部门类，一个部门可以有多个员工，此时多个员工可以使用 `List` / `Map` 来存储。

#### List集合

::: code-group

```xml [bean.xml] {15-20}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  <bean id="emp1" class="com.geomind.dtos.Employee">
    <property name="empName" value="王一博"/>
  </bean>
  <bean id="emp2" class="com.geomind.dtos.Employee">
    <property name="empName" value="陈伟霆"/>
  </bean>

  <bean id="dept" class="com.geomind.dtos.Dept">
    <property name="deptName" value="研发部"/>
    <!--通过 <list> 标签中 <ref> 方式引用-->
    <property name="employees">
      <list>
        <ref bean="emp1"/>
        <ref bean="emp2"/>
      </list>
    </property>
  </bean>
</beans>
```

```java [Dept] {4}
public class Dept { 
  private String deptName;
  // 多个员工可以使用 List 存储
  private List<Employee> employees;

  public void setDeptName(String deptName) {
    this.deptName = deptName;
  }

  public void setEmployees(List<Employee> employees) {
    this.employees = employees;
  }

  public void info() {
    for (Employee employee : this.employees) {
      System.out.println("employee = " + employee.getEmpName());
    }
  }
}
```

```java [Employee]
public class Employee {
  private String empName;

  public void setEmpName(String empName) {
    this.empName = empName;
  }

  @Override
  public String toString() {
    return "Employee{" +
      "empName='" + empName + '\'' +
      '}';
  }
}
```

```java [DeptTest]
@Test
public void testDept() {
  ApplicationContext context
    = new ClassPathXmlApplicationContext("bean.xml");
  Dept dept = context.getBean("dept", Dept.class);
  dept.info();
}
```

:::



#### Map集合

::: code-group

```xml [bean.xml] {16-21}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

  <bean id="emp1" class="com.geomind.dtos.Employee">
    <property name="empName" value="王一博"/>
  </bean>
  <bean id="emp2" class="com.geomind.dtos.Employee">
    <property name="empName" value="陈伟霆"/>
  </bean>

  <bean id="dept" class="com.geomind.dtos.Dept">
    <property name="deptName" value="软件研发部"/>
    <!-- 通过 <map> 标签为 Map 类型赋值 -->
    <property name="employees">
      <map>
        <entry key="10010" value-ref="emp1"/>
        <entry key="10011" value-ref="emp2"/>
      </map>
    </property>
  </bean>
</beans>
```

```java [Dept] {4}
public class Dept {
  private String deptName;
  // 多个员工可以使用 Map 存储
  private Map<String, Employee> employees;

  public void setDeptName(String deptName) {
    this.deptName = deptName;
  }

  public void setEmployees(Map<String, Employee> employees) {
    this.employees = employees;
  }

  public void info() {
    System.out.println("部门" + this.deptName);
    System.out.println(employees);
  }
}
```

```java [Employee]
public class Employee {
  private String empName;

  public void setEmpName(String empName) {
    this.empName = empName;
  }

  @Override
  public String toString() {
    return "Employee{" +
      "empName='" + empName + '\'' +
      '}';
  }
}
```

```java [EmployeeTest]
@Test
public void testDept() {
  ApplicationContext context
    = new ClassPathXmlApplicationContext("bean.xml");
  Dept dept = context.getBean("dept", Dept.class);
  dept.info();
}
```

:::



#### 引用集合类型Bean

引用集合类型 bean 其实是对上面 `List` 和 `Map` 注入的另一种写法。就是使用了 `util规范`。

::: code-group

```xml {4，5，6，18-25,14,16}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="http://www.springframework.org/schema/util
                           http://www.springframework.org/schema/util/spring-util.xsd
                           http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd">
	<!-- 一个学生有多门课，有多个老师 -->
  <bean id="student" class="com.geomind.dtos.Student">
    <property name="name" value="王一博"/>
    <property name="age" value="25"/>
    <!-- 引用 <util:list id="lessonList"> -->
    <property name="lessons" ref="lessonList"/>
    <!-- 引用 <util:map id="teacherMap"> -->
    <property name="teachers" ref="teacherMap"/>
  </bean>
  <util:list id="lessonList">
    <ref bean="lessonOne"/>
    <ref bean="lessonTwo"/>
  </util:list>
  <util:map id="teacherMap">
    <entry key="1001" value-ref="teacherOne"/>
    <entry key="1002" value-ref="teacherTwo"/>
  </util:map>

  <bean id="lessonOne" class="com.geomind.dtos.Lesson">
    <property name="name" value="语文课"/>
  </bean>
  <bean id="lessonTwo" class="com.geomind.dtos.Lesson">
    <property name="name" value="数学课"/>
  </bean>
  <bean id="teacherOne" class="com.geomind.dtos.Teacher">
    <property name="id" value="100"/>
    <property name="name" value="王老师"/>
  </bean>
  <bean id="teacherTwo" class="com.geomind.dtos.Teacher">
    <property name="id" value="200"/>
    <property name="name" value="张老师"/>
  </bean>
</beans>
```

```java [Student]
public class Student {
  private String name;
  private Integer age;
  // 一个学生有多门课程
  private List<Lesson> lessons;
  // 一个学生有多个老师
  private Map<String, Teacher> teachers;

  public void setName(String name) {
    this.name = name;
  }

  public void setAge(Integer age) {
    this.age = age;
  }

  public void setLessons(List<Lesson> lessons) {
    this.lessons = lessons;
  }

  public void setTeachers(Map<String, Teacher> teachers) {
    this.teachers = teachers;
  }

  @Override
  public String toString() {
    return "Student{" +
      "name='" + name + '\'' +
      ", age=" + age +
      ", lessons=" + lessons +
      ", teachers=" + teachers +
      '}';
  }
}
```

```java [Lesson]
public class Lesson {
  private String name;

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "Lesson{" +
      "name='" + name + '\'' +
      '}';
  }
}
```

```java [Teacher]
public class Teacher {
  private Integer id;
  private String name;

  public void setId(Integer id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "Teacher{" +
      "id=" + id +
      ", name='" + name + '\'' +
      '}';
  }
}
```

```java [StudentTest]
@Test
public void testStudent() {
  ApplicationContext context
    = new ClassPathXmlApplicationContext("bean.xml");
  Student student = context.getBean("student", Student.class);
  System.out.println(student);
}
```

:::



#### p命名空间

p 命名空间注入 是上面引用集合类型 bean 的一种简化写法。

```xml {5,11-19}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:util="http://www.springframework.org/schema/util"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="http://www.springframework.org/schema/util
                           http://www.springframework.org/schema/util/spring-util.xsd
                           http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd">

  <bean
    id="studentp"
    class="com.geomind.dtos.Student"
    p:name="王一博"
    p:age="24"
    p:lessons-ref="lessonList"
    p:teachers-ref="teacherMap"
  >
  </bean>

  <util:list id="lessonList">
    <ref bean="lessonOne"/>
    <ref bean="lessonTwo"/>
  </util:list>
  <util:map id="teacherMap">
    <entry key="1001" value-ref="teacherOne"/>
    <entry key="1002" value-ref="teacherTwo"/>
  </util:map>

  <bean id="lessonOne" class="com.geomind.dtos.Lesson">
    <property name="name" value="语文课"/>
  </bean>
  <bean id="lessonTwo" class="com.geomind.dtos.Lesson">
    <property name="name" value="数学课"/>
  </bean>
  <bean id="teacherOne" class="com.geomind.dtos.Teacher">
    <property name="id" value="100"/>
    <property name="name" value="王老师"/>
  </bean>
  <bean id="teacherTwo" class="com.geomind.dtos.Teacher">
    <property name="id" value="200"/>
    <property name="name" value="张老师"/>
  </bean>
</beans>
```



### 引入外部属性文件

> 使用场景：使用 Druid 连接 MySQL 数据库时，会创建 jdbc.properties 文件进行软编码，这时候就可以使用引入外部属性文件的方式，在 bean.xml 中配置 jdbc 的初始值。

在项目中添加 Druid 和 MySQL 的包：

```xml
<!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
  <version>8.0.33</version>
</dependency>

<!-- https://mvnrepository.com/artifact/com.alibaba/druid -->
<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>druid</artifactId>
  <version>1.2.24</version>
</dependency>
```

使用方式：

::: code-group

```xml [bean-jdbc.xml] {4,6,7}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="
          http://www.springframework.org/schema/context
          http://www.springframework.org/schema/context/spring-context.xsd
          http://www.springframework.org/schema/beans
          http://www.springframework.org/schema/beans/spring-beans.xsd">

  <!-- 通过 location 属性引入 jdbc.properties 配置文件 -->
  <context:property-placeholder location="jdbc.properties"/>
	<!-- 通过 ${} 的方式，动态添加 value 值 -->
  <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="username" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
    <property name="url" value="${jdbc.url}"/>
    <property name="driverClassName" value="${jdbc.driverClassName}"/>
  </bean>
</beans>
```

```properties [jdbc.properties]
jdbc.username=root
jdbc.password=1234
jdbc.url=jdbc:mysql:http://127.0.0.1:3306/atguigu
jdbc.driverClassName=com.mysql.cj.jdbc.Driver
```

```java [DruidTest]
@Test
public void testDruid() {
  ApplicationContext context =
    new ClassPathXmlApplicationContext("bean-jdbc.xml");
  DruidDataSource dataSource = context.getBean("dataSource", DruidDataSource.class);
  String url = dataSource.getUrl();
  System.out.println("url = " + url);
}
```

:::



## Bean的作用域

在 Spring 中，bean 标签可以通过 `scope` 属性来指定作用域范围。`scope` 有两个值：

|    值     |                      作用                       |     创建时机     |
| :-------: | :---------------------------------------------: | :--------------: |
| singleton | 默认值。在 IoC 容器中，当前 bean 对象始终为单例 | IoC 容器初始化时 |
| prototype |     在 IoC 容器中，当前 bean 对象有多个实例     |   获取 bean 时   |

::: code-group

```xml [bean.xml] {6}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  <!-- scope默认值是 singleton -->
  <bean id="order" class="com.geomind.scope.Orders" scope="singleton"/>
</beans>
```

```java [OrderTest]
@Test
public void testOrder() {
  ApplicationContext context =
    new ClassPathXmlApplicationContext("bean-scope.xml");
  Orders order1 = context.getBean("order", Orders.class);
  System.out.println("order1 = " + order1); // com.geomind.scope.Orders@47f4e407
  Orders order2 = context.getBean("order", Orders.class);
  System.out.println("order2 = " + order2); // com.geomind.scope.Orders@47f4e407
}
```

:::



## Bean的生命周期

::: success Bean的生命周期

一共有 7 个阶段：

1. 第一步：调用无参构造，创建 bean 对象；
2. 第二步：调用 setXxx 方法，设置属性值；
3. 第三步：触发后置处理器，在初始化之前触发；
4. 第四步：调用 initMethod 初始化方法；
5. 第五步：触发后置处理器，在初始化之后触发；
6. 第六步：bean 对象创建完成，可以使用了；
7. 第七步：调用 destroyMethod 销毁方法；

:::

::: code-group

```xml [bean.xml]
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  <bean
        id="user"
        class="com.geomind.life.User"
        init-method="initMethod"
        destroy-method="destroyMethod">
    <property name="name" value="王一博"/>
  </bean>

  <!-- 初始化全局后置处理器，任何bean对象初始化都会走这里面的后置处理器 -->
  <bean id="globalProcessor" class="com.geomind.life.GlobalPostProcessor"/>
</beans>
```

```java [User]
public class User {
  private String name;

  public User() {
    System.out.println("第1步：调用无参构造，创建bean对象");
  }

  public void setName(String name) {
    this.name = name;
    System.out.println("第2步：调用set方法，设置属性值");
  }

  public void initMethod() {
    System.out.println("第4步：调用initMethod初始化方法");
  }

  public void destroyMethod() {
    System.out.println("第7步：调用destroyMethod销毁方法");
  }
}
```

```java [GlobalPostProcessor]
// 创建全局后置处理器
public class GlobalPostProcessor implements BeanPostProcessor {
  @Override
  public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
    System.out.println("第3步：bean后置处理器触发，在初始化方法之前触发");
    return BeanPostProcessor.super.postProcessBeforeInitialization(bean, beanName);
  }

  @Override
  public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
    System.out.println("第5步：bean后置处理器触发，在初始化方法之后触发");
    return BeanPostProcessor.super.postProcessAfterInitialization(bean, beanName);
  }
}
```

```java [LifeTest]
@Test
public void testLife() {
  // 如果想要调用 close() 方法手动销毁context对象，需要使用ClassPathXmlApplicationContext类接收
  ClassPathXmlApplicationContext context
    = new ClassPathXmlApplicationContext("bean-life.xml");
  User user = context.getBean("user", User.class);
  System.out.println("第6步：bean对象创建完成，可以使用了");
  System.out.println("user = " + user);
  context.close();
}
```

:::



## XML自动装配

XML 自动装配 就是指在 bean.xml 中通过 `autowire="byType"` 自动将 bean 进行注入。

>例如在三层架构中，controller 层调用 service 层，service 层调用 dao 层，此时就可以通过 xml 自动装配进行注入。

创建 User 的三层架构：

::: code-group

```java [UserController]
public class UserController {
  private UserService userService;

  public void setUserService(UserService userService) {
    this.userService = userService;
  }

  public void addUser() {
    System.out.println("addUser执行了");
    this.userService.addUserService();
  }
}
```

```java [UserService]
public interface UserService {
  public void addUserService();
}

public class UserServiceImpl implements UserService{
  private UserDao userDao;

  public void setUserDao(UserDao userDao) {
    this.userDao = userDao;
  }

  @Override
  public void addUserService() {
    System.out.println("addUserService被执行了");
    this.userDao.addUserDao();
  }
}
```

```java [UserDao]
public interface UserDao {
  public void addUserDao();
}

public class UserDaoImpl implements UserDao{
  @Override
  public void addUserDao() {
    System.out.println("addUserDao执行了");
  }
}
```

:::

在 bean.xml 中配置，然后测试从 controller 层能否调用到 dao 层的方法：

::: code-group

```xml [bean.xml] {8,9}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  <bean
        id="userController"
        class="com.geomind.auto.controller.UserController"
        autowire="byType"/>
  <!-- 一般注入接口的实现类，而不是接口类 -->
  <bean id="userService" class="com.geomind.auto.service.UserServiceImpl" autowire="byType"/>
  <bean id="userDao" class="com.geomind.auto.dao.UserDaoImpl"/>
</beans>
```

```java [UserTest]
@Test
public void testController() {
  ApplicationContext context
    = new ClassPathXmlApplicationContext("bean-auto.xml");
  UserController userController = context.getBean("userController", UserController.class);
  System.out.println(userController);
  // 调用方法，会依次执行到 dao 中的方法
  userController.addUser();
}
```

:::