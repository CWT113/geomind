# AutoMapper

> 官方文档：[https://docs.automapper.org/en/stable/](https://docs.automapper.org/en/stable/)
>
> Github：[https://github.com/AutoMapper/AutoMapper](https://github.com/AutoMapper/AutoMapper)



概念：AutoMapper 是一个在 .NET 应用程序中自动将一个对象的属性映射到另一个对象的属性的开源库。



在实际应用中，我们常常需要将一个实体对象转换为另一个实体对象，或者从数据访问层获取到的数据对象映射到业务逻辑层的对象。手动实现这种转换往往需要大量的重复代码，而 AutoMapper 则可以大大简化这个过程。



AutoMapper 的主要特点包括：

- 支持对象间复杂映射关系的配置；

- 支持映射关系的自动发现，从而减少手动配置的工作量；

- 支持 LINQ 查询中的投影映射；

- 支持批量映射；

- 可以与 DI 容器集成；



## 安装和配置

在 Visual Studio 中使用 NuGet 安装 AutoMapper，可以通过以下命令：

```Shell
Install-Package AutoMapper
Install-Package AutoMapper.Extensions.Microsoft.DependencyInjection
```

安装完成后，在 `Progrem.cs` 中注册 AutoMapper（.Net6版本以上）：

```C#
//注册 AutoMapper
builder.Services.AddAutoMapper(typeof(Program));
```



## 使用示例

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
    public string Name { get; set; }
    public string Password { get; set; }
}
```



### Profile

在项目中，一个比较好的方式是创建一个单独的 `Profile` 文件，例如：`PersonProfile.cs`。

注意：转换协议的类，必须以 Profile 作为结尾，例如：PersonProfile.cs，且需继承自 Profile。

```C#
public class PersonProfile : Profile
{
    public PersonProfile()
    {
        //CreateMap<Person, PersonDto>();
        //CreateMap<PersonDto, Person>();
      
        // 若 Person 和 PersonDto 之间需要相互转换，可以进行简写
        CreateMap<Person, UsPersonDtoerDTO>().ReverseMap();
    }
}
```



### Controller

新建一个 `PersonController.cs` 控制器，用于测试转换：

```C#
// 依赖注入 IMapper
private readonly IMapper _mapper;

public UserController(IMapper mapper)
{
    _mapper = mapper;
}

[HttpGet]
[Route("GetPersonDto")]
public IActionResult GetPersonDto()
{
    var person = new Person
    {
        Id = 1,
        Name = "张三",
        Password = "123456",
    };

    // person -> PersonDto
    var PersonDto = _mapper.Map<PersonDto>(person);
    return Ok(PersonDto);
}

[HttpGet]
[Route("GetPerson")]
public IActionResult GetPerson()
{
    var PersonDto = new PersonDto
    {
        Id = 2,
        Name = "李四",
        Password = "777777",
    };

    // PersonDto -> person
    var person = _mapper.Map<Person>(PersonDto);
    return Ok(person);
}
```



## 基本映射

除了上面的示例，我们还可以通过 `ForMember` 方法单独对某个字段进行映射。

`ForMember`方法接收两个参数，第一个参数是目标属性的表达式，第二个参数是选项。

**选项**中包含多个配置项，可以用于控制映射的行为，例如：

- `MapFrom`：指定源属性的表达式；

- `Ignore`：忽略该属性；

- `Condition`：根据条件判断是否映射该属性；

- `NullSubstitute`：指定当源属性为 null 时，目标属性应该使用的默认值；

- `ConvertUsing`：指定转换器，用于将源属性转换为目标属性；



### MapFrom

```C#
// 参数1为目标属性，参数2为源属性。即：dest: PersonDto，d: Person
CreateMap<Person, PersonDto>()
    .ForMember(dest => dest.Id, opt => opt.MapFrom(d => d.Id))
    .ForMember(dest => dest.Name, opt => opt.MapFrom(d => d.Name))
    .ForMember(dest => dest.Password, opt => opt.MapFrom(d => d.Password));
```



### Ignore

```C#
// 忽略 Password 字段
CreateMap<Person, PersonDto>()
    .ForMember(dest => dest.Password, opt => opt.Ignore());
```



### Condition

```C#
// 当 Person 中 Password 字段值为 "123456" 时，才会映射
CreateMap<Person, PersonDto>()
    .ForMember(dest => dest.Password, opt => opt.Condition(d => d.Password == "123456"));
```



### NullSubstitute

```C#
// 疑问：没有测试通...
CreateMap<Person, PersonDto>()
    .ForMember(dest => dest.Address, opt => opt.NullSubstitute("默认值来了(搞个默认名字)"));
```



## 批量映射

在实际应用中，我们常常需要将多个实体对象转换为另一个实体对象。如果使用循环逐一转换，代码会非常繁琐。而 AutoMapper 可以通过批量映射实现快速转换。

例如，我们可以通过以下代码将 `Person` 实体对象列表转换为 `PersonDto` 实体对象列表：

```C#
var person = new Person { Id = 1, Name = "张三1", Password = "111" };
var person1 = new Person { Id = 2, Name = "张三2", Password = "222" };
var person2 = new Person { Id = 3, Name = "张三3", Password = "333" };

List<Person> people = new() { person, person1, person2 };

// 批量映射：AutoMapper 会自动遍历源列表，依次将每个对象转换为目标对象。
var PersonDto = _mapper.Map<List<PersonDto>>(people);
```



## 嵌套映射

在实际应用中，我们常常需要将一个复杂的对象转换为另一个复杂的对象。例如，我们有一个包含多个 `Person` 对象的 `Department` 对象，我们需要将其转换为一个包含多个 `PersonDto` 对象的 `DepartmentDto` 对象。

这时，我们可以使用嵌套映射来解决这个问题。例如，我们可以定义以下实体对象和 DTO 对象：

```C#
public class Department
{
    public int Id { get; set; }
    public List<Person> Person { get; set; }
}

public class DepartmentDto
{
    public int Id { get; set; }
    public List<PersonDto> PersonDto { get; set; }
}
```

然后，我们可以通过以下代码实现嵌套映射：

```C#
// 定义了 Department 和 DepartmentDto 之间的关系，又使用 ForMember 方法指定了 PersonDto 属性与 Person 属性之间的映射关系
CreateMap<Department, DepartmentDto>()
    .ForMember(dest => dest.PersonDto, opt => opt.MapFrom(d => d.Person));
```

```C#
[HttpGet]
[Route("GetListPersonDto")]
public IActionResult GetListPersonDto()
{
    var department = new Department
    {
        Id = 1,
        Person = new List<Person>
        {
            new Person { Id = 1, Name = "张三1", Password = "111" },
            new Person { Id = 2, Name = "张三2", Password = "222" },
            new Person { Id = 3, Name = "张三3", Password = "333" }
        }
    };

    var PersonDto = _mapper.Map<DepartmentDto>(department);
    return Ok(PersonDto);
}
```
