# DAO封装

## DAO概念

DAO（Data Access Object），意为数据库访问对象。

Java 是面向对象语言，数据在 Java 中通常以对象的形式存在，一张表对应一个实体类，**一张表的操作就对应一个 DAO 对象**。

在 Java 操作数据库时，通常会将一张表的增删改查操作统一维护起来，维护的这个类就叫做 DAO 层。**DAO 层只关注对数据库的操作，供业务层 Service 调用**。



## BaseDAO

基本上每一张数据表都会对应一个 DAO接口及其实现类，可以发现所有表的增删改查代码重复度很高，所以可以抽取公共代码到 BaseDAO 中。

```java
public class BaseDAO {
  /**
     * 增、删、改通用方法
     *
     * @param sql    要执行的SQL语句
     * @param params 赋值占位符要填入的值
     * @return 返回执行成功后的影响行数
     * @throws SQLException SQL执行异常
     */
  public int executeUpdate(String sql, Object... params) throws SQLException {
    // 获取连接池对象
    Connection connection = JDBCUtilV2.getConnection();
    // 预编译SQL语句
    PreparedStatement preparedStatement = connection.prepareStatement(sql);
    // 为占位符赋值，执行SQL语句
    if (params != null && params.length > 0) {
      for (int i = 0; i < params.length; i++) {
        preparedStatement.setObject(i + 1, params[i]);
      }
    }
    int row = preparedStatement.executeUpdate();

    // 释放资源
    preparedStatement.close();
    JDBCUtilV2.release();

    return row;
  }

  /**
     * 查询通用方法
     *
     * @param clazz  泛型对象（由调用者传入）
     * @param sql    要执行的 SQL 语句
     * @param params 赋值占位符要填入的值
     * @param <T>    泛型类型
     * @return 查询到的结果集
     * @throws Exception SQL执行异常
     */
  public <T> List<T> executeQuery(Class<T> clazz, String sql, Object... params) throws Exception {
    // 获取连接池对象
    Connection connection = JDBCUtilV2.getConnection();
    // 预编译执行语句
    PreparedStatement preparedStatement = connection.prepareStatement(sql);
    if (params != null && params.length > 0) {
      for (int i = 0; i < params.length; i++) {
        preparedStatement.setObject(i + 1, params[i]);
      }
    }
    // 执行SQL语句
    ResultSet resultSet = preparedStatement.executeQuery();

    // 获取结果集中的元数据对象（包含了列的数量、列的名称）
    ResultSetMetaData metaData = resultSet.getMetaData();
    int columnCount = metaData.getColumnCount();

    List<T> list = new ArrayList<>();
    while (resultSet.next()) {
      // 通过反射创建类对象
      T t = clazz.newInstance();
      for (int i = 1; i <= columnCount; i++) {
        // 获取列的名称
        String fieldName = metaData.getColumnLabel(i);
        // 获取列的值
        Object fieldValue = resultSet.getObject(i);

        // 通过列名和类对象，获取要封装类的属性名
        Field declaredField = clazz.getDeclaredField(fieldName);
        // 突破 private 私有的封装（因为要给 private 属性赋值）
        declaredField.setAccessible(true);
        // 赋值
        declaredField.set(t, fieldValue);
      }
      list.add(t);
    }

    // 释放资源
    resultSet.close();
    preparedStatement.close();
    JDBCUtilV2.release();

    return list;
  }

  /**
     * 查询单条数据通用方法
     *
     * @param clazz  泛型对象（由调用者传入）
     * @param sql    要执行的 SQL 语句
     * @param params 赋值占位符要填入的值
     * @param <T>    泛型类型
     * @return 查询到的单条结果
     * @throws Exception SQL执行异常
     */
  public <T> T executeQueryBean(Class<T> clazz, String sql, Object... params) throws Exception {
    List<T> list = this.executeQuery(clazz, sql, params);
    if (list == null || list.isEmpty()) {
      return null;
    }
    return list.getFirst();
  }
}
```



## BaseDAO的使用

创建员工增删改查 DAO 接口和实现类：

::: code-group

```java [EmployeeDao]
public interface EmployeeDao {
  List<Employee> selectAll();

  Employee selectById(Integer empId);

  int insert(Employee employee);

  int update(Employee employee);

  int delete(Integer empId);
}
```

```java [EmployeeDaoImpl]
public class EmployeeDaoImpl extends BaseDAO implements EmployeeDao {
  @Override
  public List<Employee> selectAll() {
    try {
      // 查询的时候，为了让列名和字段名对应，需要起别名
      String sql = "select emp_id empId, emp_name empName, emp_age empAge, emp_salary empSalary from t_emp";
      return executeQuery(Employee.class, sql, null);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public Employee selectById(Integer empId) {
    try {
      String sql = "select emp_id empId, emp_name empName, emp_age empAge, emp_salary empSalary from t_emp where emp_id = ?";
      return executeQueryBean(Employee.class, sql, empId);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public int insert(Employee employee) {
    try {
      String sql = "insert into t_emp (emp_name, emp_salary, emp_age) values (?,?,?)";
      return executeUpdate(sql, employee.getEmpName(), employee.getEmpSalary(), employee.getEmpAge());
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public int update(Employee employee) {
    try {
      String sql = "update t_emp set emp_name = ? where emp_id = ?";
      return executeUpdate(sql, employee.getEmpName(), employee.getEmpId());
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public int delete(Integer empId) {
    try {
      String sql = "delete from t_emp where emp_id = ?";
      return executeUpdate(sql, empId);
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }
}
```

```java [单元测试]
public class JDBCTest {
  @Test
  public void testSelectAll() {
    EmployeeDao employeeDao = new EmployeeDaoImpl();
    List<Employee> employees = employeeDao.selectAll();
    for (Employee employee : employees) {
      System.out.println("employee = " + employee);
    }
  }

  @Test
  public void testSelectById() {
    EmployeeDao employeeDao = new EmployeeDaoImpl();
    Employee employee = employeeDao.selectById(1);
    System.out.println("employee = " + employee);
  }

  @Test
  public void testInsert() {
    EmployeeDao employeeDao = new EmployeeDaoImpl();
    Employee employee = new Employee(null, "张三丰", 108, 2000.00);
    int insert = employeeDao.insert(employee);
    System.out.println("insert = " + insert);
  }

  @Test
  public void testUpdate() {
    EmployeeDao employeeDao = new EmployeeDaoImpl();
    Employee employee = new Employee(1, "张无忌", 58, 12345.00);
    int update = employeeDao.update(employee);
    System.out.println("update = " + update);
  }

  @Test
  public void testDelete() {
    EmployeeDao employeeDao = new EmployeeDaoImpl();
    int delete = employeeDao.delete(1);
    System.out.println("delete = " + delete);
  }
}
```

:::