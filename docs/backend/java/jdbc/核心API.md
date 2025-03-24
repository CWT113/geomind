# 核心API

## 注册驱动

当使用 JDBC 连接数据库时，需要加载数据库特定的驱动程序，以便于数据库进行通信。

::: success 提示

从 JDK6 开始，不再需要显式的调用 `Class.forName()` 来注册驱动了，只要在项目中集成了对应驱动的 jar 包，会自动在初始化时注册驱动程序。

:::

```java
Class.forName("com.mysql.cj.jdbc.Driver");
```

其底层还是调用了 `DriverManager` 对象来注册驱动：

```java {7}
public class Driver extends NonRegisteringDriver implements java.sql.Driver {
  public Driver() throws SQLException {
  }

  static {
    try {
      DriverManager.registerDriver(new Driver());
    } catch (SQLException var1) {
      throw new RuntimeException("Can't register driver!");
    }
  }
}
```



## Connection

`Connection` 接口 **用于建立与数据库的通信通道**。

::: success 作用

1. 可以负责管理事务，提供了 `commit` 和 `rollback` 方法，用于提交事务和回滚事务；

2. 可以创建 `Statement` 对象，用于执行 SQL 语句并于数据库进行交互；

:::

```java
String url = "jdbc:mysql://localhost:3306/atguigu";
String username = "root";
String password = "1234";
Connection connection = DriverManager.getConnection(url, username, password);
```

参数：

|  参数  |                      描述                       |                示例                 |
| :----: | :---------------------------------------------: | :---------------------------------: |
|  URL   | 数据库连接地址，其中 `jdbc:mysql://` 是固定前缀 | jdbc:mysql://localhost:3306/atguigu |
| 用户名 |                     用户名                      |                root                 |
|  密码  |                      密码                       |                1234                 |

::: info 提示

- URL地址中可以通过 **键值对** 的方式，拼接其他连接参数：

  ```java
  jdbc:mysql://ip:port/数据库名称?参数键值对1&参数键值对2
  ```

- 如果连接本机的地址，即 `localhost:3306`，可以省略其不写：

  ```java
  String url = "jdbc:mysql://localhost:3306/atguigu";
  // 等同于
  String url = "jdbc:mysql:///atguigu";
  ```

:::



## Statement

`Statement` 接口用于**执行 SQL 语句并与数据库进行交互**。通过 Statement 对象，可以向数据库发送 SQL 语句并**获取执行结果**。

执行结果有两种情况：

- **增/删/改**：返回受影响的行数；
- **查**：单行单列、多行多列、单行多列等结果；

```java {6,7}
public static void main(String[] args) throws SQLException {
  Connection connection = DriverManager.getConnection("jdbc:mysql:///atguigu", "root", "1234");

  Statement statement = connection.createStatement();

  String sql = "SELECT emp_id, emp_name, emp_age, emp_salary from t_emp WHERE emp_name = '康师傅'";
  ResultSet resultSet = statement.executeQuery(sql);

  while (resultSet.next()) {
    int empId = resultSet.getInt("emp_id");
    String empName = resultSet.getString("emp_name");
    int empAge = resultSet.getInt("emp_age");
    double empSalary = resultSet.getDouble("emp_salary");

    System.out.println(empId + "\t" + empName + "\t" + empAge + "\t" + empSalary);
  }

  resultSet.close();
  statement.close();
  connection.close();
}
```



::: warning 注意

`Statement` 接口在执行 SQL 语句时，会产生 **SQL注入攻击问题**。

即当使用 Statement 执行动态构建的 SQL 查询时，往往需要将查询条件与 SQL 语句拼接在一起，此时要特别注意查询条件始终为 true 的情况，例如 `'1' = '1'` 的情况。

```java {10}
public static void main(String[] args) throws SQLException {
  Connection connection = DriverManager.getConnection("jdbc:mysql:///atguigu", "root", "1234");

  Statement statement = connection.createStatement();

  System.out.println("请输入用户名：");
  Scanner scanner = new Scanner(System.in);
  String name = scanner.nextLine(); // 在控制台输入 abc' or '1' = '1，可以查询到所有的数据 // [!code error]

  String sql = "SELECT emp_id, emp_name, emp_age, emp_salary from t_emp WHERE emp_name = '" + name + "'";
  ResultSet resultSet = statement.executeQuery(sql);

  while (resultSet.next()) {
    int empId = resultSet.getInt("emp_id");
    String empName = resultSet.getString("emp_name");
    int empAge = resultSet.getInt("emp_age");
    double empSalary = resultSet.getDouble("emp_salary");

    System.out.println(empId + "\t" + empName + "\t" + empAge + "\t" + empSalary);
  }

  resultSet.close();
  statement.close();
  connection.close();
}
```

:::



## PreparedStatement

`PreparedStatement` 是 `Statement` 的子接口，用于**执行预编译的 SQL 查询**。

::: success 作用

1. **预编译SQL语句**：在创建 `PreparedStatement` 时，就会预编译SQL语句；
2. **防止SQL注入**：<span style="color:#009900; font-weight:bold;"> `PreparedStatement` 支持参数化查询，将数据和SQL动态拼接时，使用 **`?`** 进行占位，它会将传入的参数用 `''` 包裹起来，并且传入的参数中带有特殊符号时会进行转义，有效规避了 `Statement` 注入攻击问题；</span>
3. **性能提升**：`PreparedStatement` 是预编译SQL语句，同一SQL语句多次执行的情况下，可以复用，不必多次重新编译和解析；

:::

```java {5,6,12}
public static void main(String[] args) throws SQLException {
  Connection connection = DriverManager.getConnection("jdbc:mysql:///atguigu", "root", "1234");

  // 先写入SQL语句，进行预编译
  PreparedStatement preparedStatement = connection
    .prepareStatement("SELECT emp_id, emp_name, emp_age, emp_salary from t_emp WHERE emp_name = ?");

  System.out.println("请输入用户姓名：");
  String name = new Scanner(System.in).nextLine();

  // 为 ? 占位符赋值，并执行SQL查询
  preparedStatement.setString(1, name); // 注意，这里的索引是从1开始，不是0
  ResultSet resultSet = preparedStatement.executeQuery();

  while (resultSet.next()) {
    int empId = resultSet.getInt("emp_id");
    String empName = resultSet.getString("emp_name");
    int empAge = resultSet.getInt("emp_age");
    double empSalary = resultSet.getDouble("emp_salary");

    System.out.println(empId + "\t" + empName + "\t" + empAge + "\t" + empSalary);
  }

  resultSet.close();
  preparedStatement.close();
  connection.close();
}
```



## ResultSet

`ResultSet` 用于 **表示从数据库中执行查询语句所返回的结果集**，它提供了用于遍历和访问查询结果的方式。

::: success 作用

1. **遍历结果**：ResultSet 可以使用 `next()` 方法将游标移动到结果集的下一行，逐行遍历数据库查询的数据，返回值为 boolean 类型，true表示后续有数据，false表示后续没有数据；
2. **获取单列结果**：可以通过 `getXxx()` 方法获取单列的数据，支持按索引和列名进行查询； 

:::

```java
while (resultSet.next()) {
  // 获取 int 类型值
  int empId = resultSet.getInt("emp_id");
  int empAge = resultSet.getInt("emp_age");
  // 获取 String 类型值
  String empName = resultSet.getString("emp_name");
  // 获取 double 类型值
  double empSalary = resultSet.getDouble("emp_salary");

  System.out.println(empId + "\t" + empName + "\t" + empAge + "\t" + empSalary);
}
```
