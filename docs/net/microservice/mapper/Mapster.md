# Mapster

> 中文文档：[https://github.com/rivenfx/Mapster-docs](https://github.com/rivenfx/Mapster-docs)
>
> Github：[https://github.com/MapsterMapper/Mapster](https://github.com/MapsterMapper/Mapster)
>
> 参考博客：[https://code-maze.com/mapster-aspnetcore-introduction/](https://code-maze.com/mapster-aspnetcore-introduction/)
>



概念：Mapster 是一个将一种对象类型映射到另一种对象类型的库。



## 安装与配置

Mapster 可以通过NuGet进行安装，命令如下：

```Shell
Install-Package Mapster
```



## 基本使用

### 创建实体对象

以下的示例将从一个实体对象 `Person` 转换为另一个实体对象 `PersonDto`：

```C#
public class Person
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Password { get; set; }
}

public class PersonDto
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string NewPassword { get; set; }
    public string NewAddress { get; set; }
}
```



### Controller

新建一个 `PersonController.cs` 控制器，用于测试转换：

```C#
[HttpGet]
public IActionResult GetPersonDto()
{
    var person = new Person { Id = 1, Name = "张三", Password = "123456" };

    // 方式一：映射到现有对象
    var personDto = new PersonDto();
    var res1 = person.Adapt(personDto);

    // 方式二：泛型映射（常用）
    var res2 = person.Adapt<PersonDto>();

    return Ok(new { res1, res2 });
}
```

在这个示例中，Mapster 会自动将源对象的属性值赋值给目标对象的相应属性，其中，源对象中没有 Address 字段，所以目标对象中 Address 字段的值为 null 。



### 自定义映射

有时候我们需要更复杂的映射，例如在源对象和目标对象之间存在一些不同的属性名称，或者需要进行一些转换才能进行映射。

Mapster 允许我们通过创建一个映射配置来实现自定义映射。

以下是一个示例，展示如何使用Mapster进行自定义映射：

1. 新建 `MapperConfig.cs` 文件，创建一个方法 RegisterMapsterConfiguration：

```C#
public static void RegisterMapsterConfiguration(this IServiceCollection services)
{
    // 自定义映射规则
    TypeAdapterConfig<Person, PersonDto>
        .NewConfig()
        .Map(dest => dest.Id, src => src.Id)
        .Map(dest => dest.UserName, src => src.Name)
        .Map(dest => dest.NewPassword, src => src.Password);
  
    // 启用全局设置，并扫描当前执行程序集中的所有映射配置
    TypeAdapterConfig.GlobalSettings.Scan(Assembly.GetExecutingAssembly());
}
```

2. 在 `Progrem.cs` 中，注入 自定义的映射规则：

```C#
builder.Services.RegisterMapsterConfiguration();
```

3. 在 `PersonController.cs` 中，写一个接口进行测试：

```C#
[HttpGet]
public IActionResult GetPersonDto2()
{
    var person = new Person { Id = 1, Name = "张三", Password = "123456" };
    
    // 映射转换
    var personDto = person.Adapt<PersonDto>();
  
    return Ok(personDto);
}
```



### IQueryable 类型映射

当源数据是 IQueryable 集合类型时，就不能使用 `Adapt<T>` 的形式映射了（会映射为 null），此时需要使用新的方法：`ProjectToType<T>();`

```C#
[HttpGet]
public IActionResult GetQueryableUserDto()
{
    List<User> user = new List<User>
    {
        new User
        {
            Id = 1,
            Name = "张三",
            Password = "123456",
            Address = "山东省济南市",
            Department = "软件研发部"
        },
        new User
        {
            Id = 2,
            Name = "李四",
            Password = "654321",
            Address = "甘肃省武威市",
            Department = "人民教师"
        }
    };

    //假设源数据是 IQueryable 类型
    IQueryable<User> queryUser = user.AsQueryable();
    //此时可以使用 ProjectToType<T> 类型进行映射
    IQueryable<UserDTO> userDto = queryUser.ProjectToType<UserDTO>();

    return Ok(userDto);
}
```

