# JDBC扩展

## 实体类和ORM

在使用 JDBC操作数据库时，可以发现数据都是零散的，不利于维护和管理。而 Java 是面向对象的，一张表对应的就是一个类，一行数据对应的就是一个对象，一个列对应的是对象的属性，所以把数据存储在一个载体里，这个载体就是**实体类**。 

ORM（Object Relational Mapping）思想，就是把关系型数据库的对象映射到一个对象。

::: code-group

```java [Test] {10-22}
@Test
public void testOrm() throws SQLException {
  Connection connection = DriverManager.getConnection("jdbc:mysql:///atguigu", "root", "1234");

  PreparedStatement preparedStatement = connection.prepareStatement("SELECT * from t_emp WHERE emp_id = ?");
  preparedStatement.setInt(1, 2);
  ResultSet resultSet = preparedStatement.executeQuery();

  // 将查询到的结果，存放到 Employee 对象中，就是 ORM 的过程
  Employee employee = null;
  if (resultSet.next()) {
    employee = new Employee();
    int empId = resultSet.getInt("emp_id");
    String empName = resultSet.getString("emp_name");
    double empSalary = resultSet.getDouble("emp_salary");
    int empAge = resultSet.getInt("emp_age");

    employee.setEmpId(empId);
    employee.setEmpName(empName);
    employee.setEmpSalary(empSalary);
    employee.setEmpAge(empAge);
  }

  System.out.println(employee);
}
```

```java [Employee]
public class Employee {
  private Integer empId;
  private String empName;
  private Integer empAge;
  private Double empSalary;

  public Employee() {
  }

  public Employee(Integer empId, String empName, Integer empAge, Double empSalary) {
    this.empId = empId;
    this.empName = empName;
    this.empAge = empAge;
    this.empSalary = empSalary;
  }

  public Integer getEmpId() {
    return empId;
  }

  public void setEmpId(Integer empId) {
    this.empId = empId;
  }

  public String getEmpName() {
    return empName;
  }

  public void setEmpName(String empName) {
    this.empName = empName;
  }

  public Integer getEmpAge() {
    return empAge;
  }

  public void setEmpAge(Integer empAge) {
    this.empAge = empAge;
  }

  public Double getEmpSalary() {
    return empSalary;
  }

  public void setEmpSalary(Double empSalary) {
    this.empSalary = empSalary;
  }

  @Override
  public String toString() {
    return "Employee{" +
      "empId=" + empId +
      ", empName='" + empName + '\'' +
      ", empAge=" + empAge +
      ", empSalary=" + empSalary +
      '}';
  }
}
```

:::





## 主键回显

在前面使用 JDBC 执行新增操作时，只能得到受影响的行数，无法获取到新增数据的主键值。

但其实可以通过为 `PreparedStatement` 对象传递第二个参数，令其返回新增数据的主键值：

```java
PreparedStatement preparedStatement 
  = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
```



```java {6,7,19-23}
@Test
public void testOrmReturnPK() throws SQLException {
  Connection connection = DriverManager.getConnection("jdbc:mysql:///atguigu", "root", "1234");

  String sql = "INSERT INTO t_emp (emp_name, emp_age, emp_salary) VALUES (?,?,?)";
  PreparedStatement preparedStatement 
    					= connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

  Employee employee = new Employee(null, "王尔博", 25, 2222.22);
  preparedStatement.setString(1, employee.getEmpName());
  preparedStatement.setInt(2, employee.getEmpAge());
  preparedStatement.setDouble(3, employee.getEmpSalary());

  int count = preparedStatement.executeUpdate();
  ResultSet resultSet = null;
  if (count > 0) {
    System.out.println("成功");
    // 主键回显操作
    resultSet = preparedStatement.getGeneratedKeys();
    if (resultSet.next()) {
      int empId = resultSet.getInt(1);
      employee.setEmpId(empId);
    }

    System.out.println(employee);
  } else {
    System.out.println("失败");
  }

  if (resultSet != null) {
    resultSet.close();
  }
  preparedStatement.close();
  connection.close();
}
```



## 批量操作

插入多条数据时，一条一条的发送给数据库，效率比较低，这时可以通过批量操作，提升效率。

::: success 提示

1. 在连接字符串中添加 `rewriteBatchedStatements=true` 属性；
2. 通过 `preparedStatement.addBatch()` 将多个要添加的值连接起来，类似于 insert into ... values (?,?,?), (?,?,?), ... 的形式；
3. 通过 `preparedStatement.executeBatch()` 一次性插入；

:::

::: code-group

```java [批量添加] {3,4,15,17}
@Test
public void testMoreBatch() throws SQLException {
  Connection connection
    = DriverManager.getConnection("jdbc:mysql:///atguigu?rewriteBatchedStatements=true", "root", "1234");

  String sql = "insert into t_emp (emp_name, emp_salary, emp_age) values (?,?,?)";
  PreparedStatement preparedStatement = connection.prepareStatement(sql);

  long start = System.currentTimeMillis();
  for (int i = 0; i < 10000; i++) {
    preparedStatement.setString(1, "刘旭" + i);
    preparedStatement.setDouble(2, 11000.00 + i);
    preparedStatement.setInt(3, 20 + i);

    preparedStatement.addBatch();
  }
  preparedStatement.executeBatch();
  long end = System.currentTimeMillis();

  System.out.println("耗时：" + (end - start));

  preparedStatement.close();
  connection.close();
}
```

```java [不批量添加]
@Test
public void testMoreInsert() throws SQLException {
  Connection connection = DriverManager.getConnection("jdbc:mysql:///atguigu", "root", "1234");

  String sql = "insert into t_emp (emp_name, emp_salary, emp_age) values (?,?,?);";
  PreparedStatement preparedStatement = connection.prepareStatement(sql);

  long start = System.currentTimeMillis();
  for (int i = 0; i < 10000; i++) {
    preparedStatement.setString(1, "刘旭" + i);
    preparedStatement.setDouble(2, 11000.00 + i);
    preparedStatement.setInt(3, 20 + i);

    preparedStatement.executeUpdate();
  }
  long end = System.currentTimeMillis();

  System.out.println("耗时：" + (end - start));

  preparedStatement.close();
  connection.close();
}
```

:::