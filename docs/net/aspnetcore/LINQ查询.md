# LINQ

## 委托

委托 就是为方法指定类型。

.NET 中为我们提供了自定义的委托类型，分为以下两种：

- 无返回值委托类型：`Action<>`

- 有返回值委托类型：`Func<>`

```C#
// 无参无返回值的委托类型
public static void Hello()
{
    Console.WriteLine("Hello, Tom!");
}
Action add = Hello;
add();

// 有参无返回值的委托类型
public static void Add(int x, int y)
{
    Console.WriteLine(x + y);
}
Action<int, int> add1 = Add;
add1(1, 2);
```

```C#
// 无参有返回值的委托类型
public static string Multi1()
{
    return 100;
}
Func<string> mutil1 = Multi1;
string res = mutil1();

// 有参有返回值（参数类型相同）的委托类型
public static int Multi2(int x, int y)
{
    return x * y;
}
Func<int, int, int> multi2 = Multi2;
multi2(2, 3);

// 有参有返回值（参数类型不同）的委托类型
public static string Multi3(int x, string y)
{
    return x + y;
}
Func<int, string, string> mutil3 = Multi3;
mutil3(1, "哈哈哈");
```



## 匿名委托

匿名委托 就是没有函数名称的委托类型。

```C#
// 无参无返回值的匿名委托
Action f1 = delegate ()
{
    Console.WriteLine("我是sunny");
};
f1();

// 有参无返回值的匿名委托
Action<int, string> f2 = delegate (int x, string y)
{
    Console.WriteLine("{0}, {1}", x, y);
};
f2(666, "sunny");

// 有参有返回值的匿名委托
Func<int, int, int> f3 = delegate (int x, int y)
{
    return x + y;
};
f3(2, 3);
```



## lambda表达式

Lambda表达式是一种匿名函数，类似于 JavaScript 中的箭头函数。

```C#
// lambda表达式简化 匿名委托类型（因为在Func的泛型中定义了数据类型，所以表达式中可以省略数据类型）
Func<int, int, int> f4 = (x, y) => { return x + y; };
f4(2, 3)

// 只有一行且没有返回值，可以省略花括号
Action f5 = () => Console.WriteLine("我是sunny");
f5();

// 只有一行且有返回值，可以省略花括号和return
Func<int, int, int> f6 = (x, y) => x + y;
f6(2, 3);

// 函数只有一个参数时，可以省略参数的小括号
Func<int, bool> f7 = i => i > 0;
f7(3);
```



## 常用 LINQ

|      LINQ语句       | 作用                                                         |
| :-----------------: | ------------------------------------------------------------ |
|       Where()       | 筛选满足条件的元素                                           |
|       Count()       | 统计满足条件数据的个数                                       |
|        Any()        | 有一条满足条件，则返回 True                                  |
|      Single()       | 有且只有一条满足要求的数据时，返回数据，其余情况都报错       |
|  SingleOrDefault()  | 最多只能有一条满足条件的语句，超出一条则报错，一条都没有则返回类型的默认值 |
|       First()       | 返回满足条件的第一条数据，若一条都不满足，则报错             |
|  FirstOrDefault()   | 返回满足条件的第一条数据，若一条都不满足，则返回类型的默认值 |
|      OrderBy()      | 按条件升序排序                                               |
| OrderByDescending() | 按条件降序排序                                               |
|      ThenBy()       | 在上一个条件排序之后，在进行升序排序                         |
| ThenByDescending()  | 在上一个条件排序之后，在进行降序排序                         |
|       Skip()        | 跳过几条数据，取其之后的数据                                 |
|       Take()        | 取指定的几条数据                                             |
|        Max()        | 求最大值                                                     |
|        Min()        | 求最小值                                                     |
|      Average()      | 求平均值                                                     |
|        Sum()        | 求和                                                         |
|      GroupBy()      | 对数据进行分组                                               |
|      Select()       | 投影：将集合中的每一项转换为另一种类型                       |
|      ToArray()      | 转换为数组类型                                               |
|       ToList        | 转换为集合类型                                               |

代码示例：

```C#
//1、Where 筛选
IEnumerable<Employee> res = list.Where(x => x.Age > 30);

// 2、Count 统计个数
int num = list.Count(x => x.Age > 30 && x.Salary >= 8000);

// 3、Any 有一条满足要求，则返回 True
bool flag = list.Any(x => x.Salary > 8000);
bool flag1 = list.Where(x => x.Salary >= 9000).Any();

//4、Single 有且只有一条满足要求的数据时，返回数据，其余情况都报错
Employee e = list.Single(x => x.Name == "jerry");
Employee e2 = list.Where(x => x.Name == "jerry").Single();

// 5、SingleOrDefault 最多只能有一条满足条件的语句，超出一条则报错，一条都没有则返回类型的默认值
Employee e3 = list.SingleOrDefault(x => x.Name == "jerry");

// 6、First 返回满足条件的第一条数据，若一条都不满足，则报错
Employee e4 = list.First(x => x.Age >= 30);

// 7、FirstOrDefault 返回满足条件的第一条数据，若一条都不满足，则返回类型的默认值
Employee e5 = list.FirstOrDefault(x => x.Age >= 300);

// 8、OrderBy 按条件升序排序
IOrderedEnumerable<Employee> e6 = list.OrderBy(x => x.Age);

// 9、OrderByDescending 按条件降序排序
IOrderedEnumerable<Employee> e7 = list.OrderByDescending(x => x.Age);

// 10、ThenBy 在上一个条件排序之后，在进行升序排序
IOrderedEnumerable<Employee> e8 = list.OrderBy(x => x.Age).ThenBy(y => y.Salary);

// 11、ThenByDescending 在上一个条件排序之后，在进行降序排序
IOrderedEnumerable<Employee> e9 = list.OrderBy(x => x.Age).ThenByDescending(y => y.Salary);

// 12、Skip 跳过几条数据，取其之后的数据，Take 取指定的几条数据
IEnumerable<Employee> e10 = list.Skip(3).Take(2);

// 13、Max 求最大值 Min 求最小值 Average 求平均值 Sum 求和 Count 求满足条件的个数
int max = list.Max(x => x.Age);
int min = list.Min(x => x.Age);
double average = list.Average(x => x.Salary);
double sum = list.Sum(x => x.Salary);
int count = list.Count(x => x.Salary >= 8000);
// 链式编程
int min1 = list.Where(x => x.Age >= 30).Min(y => y.Salary);

// 15、Select 从集合中挑出某一项组成另一个集合
IEnumerable<string> res = list.Select(x => x.Name);

 // 16、ToArray 转换为数组类型 ToList 转换为集合类型
IEnumerable<Employee> item = list.Where(x => x.Salary >= 6000);
Employee[] array = item.ToArray();
List<Employee> list1 = item.ToList();
```



#### 匿名类型

语法：

```C#
var obj = new { AAA = "哇哈哈", BBB = "王力宏" };
```

匿名类型 + Select：

```C#
// 1、可以指定具体的 对象，如 Dog
IEnumerable<Dog> dogs = list.Select(x => new Dog { Age = x.Age, NickName = x.Name });
foreach (var item in dogs)
{
    Console.WriteLine(item.NickName);
    Console.WriteLine(item.Age);
}

// 2、也可以不指定对象，使用 匿名类型
var res1 = list.Select(x => new { Name = x.Name, Age = x.Age });
foreach (var item in res1)
{
    Console.WriteLine(item.Name);
    Console.WriteLine(item.Age);
}
```



#### 查询语法

使用 Where、OrderBy、Select等扩展方法进行数据查询的写法叫做 “方法语法”。还有一种“查询语法”的写法。

但是本质没有变化：方法语法 会被编译成 查询语法 运行！

```C#
// 方法语法
var res = list.Where(x => x.Salary > 6000)
              .OrderBy(x => x.Age)
              .Select(x => new { x.Age, x.Salary, XB = x.Gender ? "男" : "女" });

// 查询语法
var res = from x in list
          where x.Salary > 6000
          orderby x.Age
          select new { x.Age, x.Salary, XB = x.Gender ? "男" : "女" };
```



