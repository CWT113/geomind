# PreparedStatement实现增删改查

## 新增

::: success 提示

`executeUpdate()` 方法可以用于 增加、删除、更新！

:::

```java {7,8,11-13,16}
@Test
public void testInsert() throws SQLException {
  // 获取数据库连接
  Connection connection = DriverManager.getConnection("jdbc:mysql:///atguigu", "root", "1234");

  // 使用 PreparedStatement 预编译 SQL 语句
  PreparedStatement preparedStatement = connection
    .prepareStatement("INSERT INTO t_emp(emp_name, emp_age, emp_salary) VALUES (?, ?, ?)");

  // 为 ? 占位符设置值
  preparedStatement.setString(1, "陈伟霆");
  preparedStatement.setInt(2, 27);
  preparedStatement.setDouble(3, 11000);

  // executeUpdate 方法返回值为 int 类型，表示受影响行数
  int count = preparedStatement.executeUpdate();
  System.out.println(count); // 1

  preparedStatement.close();
  connection.close();
}
```



## 删除

```java {5,6,8,11}
@Test
public void testDelete() throws SQLException {
  Connection connection = DriverManager.getConnection("jdbc:mysql:///atguigu", "root", "1234");

  PreparedStatement preparedStatement = connection
    .prepareStatement("DELETE FROM t_emp WHERE emp_age >= ?");

  preparedStatement.setInt(1, 50);

  // 也使用 executeUpdate 方法，只是 SQL 语句不同了
  int count = preparedStatement.executeUpdate();
  System.out.println(count); // 2

  preparedStatement.close();
  connection.close();
}
```



## 修改

```java {5,6,8,9,12}
@Test
public void testUpdate() throws SQLException {
  Connection connection = DriverManager.getConnection("jdbc:mysql:///atguigu", "root", "1234");

  PreparedStatement preparedStatement = connection
    .prepareStatement("UPDATE t_emp SET emp_age = ? WHERE emp_id = ?");

  preparedStatement.setInt(1, 92);
  preparedStatement.setInt(2, 5);

  // 也使用 executeUpdate 方法，只是 SQL 语句不同了
  int count = preparedStatement.executeUpdate();
  System.out.println(count); // 1

  preparedStatement.close();
  connection.close();
}
```



## 查询

### 单行单列

单行单列 最经典的就是统计整张表的总条数。

```java [单行单列] {6,8}
@Test
public void testSingRowAndCol() throws SQLException {
  Connection connection = DriverManager.getConnection("jdbc:mysql:///atguigu", "root", "1234");

  // 查询表中总条数
  PreparedStatement preparedStatement = connection.prepareStatement("SELECT COUNT(*) as count from t_emp");

  ResultSet resultSet = preparedStatement.executeQuery();

  while (resultSet.next()) {
    int count = resultSet.getInt("count");
    System.out.println(count); // 5
    
    // 或者通过索引获取值（不推荐）
    int count1 = resultSet.getInt(1);
    System.out.println(count1); // 5
  }

  resultSet.close();
  preparedStatement.close();
  connection.close();
}
```



### 单行多列

```java [单行多列] {5,6,9,10}
@Test
public void testSingleRowAndMoreCol() throws SQLException {
  Connection connection = DriverManager.getConnection("jdbc:mysql:///atguigu", "root", "1234");

  PreparedStatement preparedStatement = connection
    .prepareStatement("SELECT * from t_emp WHERE emp_id = ?");

  // 给 ? 占位符设置值，表示给第 1 个占位符设置值为 2
  preparedStatement.setInt(1, 2);
  ResultSet resultSet = preparedStatement.executeQuery();

  while (resultSet.next()) {
    int empId = resultSet.getInt("emp_id");
    int empAge = resultSet.getInt("emp_age");
    double empSalary = resultSet.getDouble("emp_salary");
    String empName = resultSet.getString("emp_name");

    System.out.println(empId + "\t" + empName + "\t" + empAge + "\t" + empSalary);
  }

  resultSet.close();
  preparedStatement.close();
  connection.close();
}
```



### 多行多列

```java [多行多列] {5,6,9,10,11}
@Test
public void testMultiRowAndCol() throws SQLException {
  Connection connection = DriverManager.getConnection("jdbc:mysql:///atguigu", "root", "1234");

  PreparedStatement preparedStatement = connection
    .prepareStatement("SELECT emp_id, emp_name, emp_age, emp_salary from t_emp WHERE emp_age >= ? AND emp_name = ?");

  // 给多个 ? 占位符设置值
  preparedStatement.setInt(1, 25);
  preparedStatement.setString(2, "小鱼儿");
  ResultSet resultSet = preparedStatement.executeQuery();

  while (resultSet.next()) {
    int empId = resultSet.getInt("emp_id");
    int empAge = resultSet.getInt("emp_age");
    double empSalary = resultSet.getDouble("emp_salary");
    String empName = resultSet.getString("emp_name");

    System.out.println(empId + "\t" + empName + "\t" + empAge + "\t" + empSalary);
  }

  resultSet.close();
  preparedStatement.close();
  connection.close();
}
```

