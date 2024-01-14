# EFCore <Badge type="tip" text="^1.9.0" />

Entity Framework Core 是一个轻量级、跨平台的 ORM 框架，它允许 .NET 开发人员通过面向对象的方式访问数据库。EF Core 可以与各种关系型数据库进行交互，包括 SQL Server、MySQL、PostgreSQL 和 SQLite 等。

## 安装

EF Core 是一个 NuGet 包，可以通过 Visual Studio 的 NuGet 包管理器或者使用命令行来安装：

```shell
Install-Package Microsoft.EntityFrameworkCore
Install-Package Microsoft.EntityFrameworkCore.Tools
# 此教程连接的是 postgresql，可根据需要自行下载其他包
Install-Package Npgsql.EntityFrameworkCore.PostgreSQL
```

## 创建数据模型

在使用 EF Core 之前，我们需要先定义数据模型，这可以通过创建 C# 类来实现。比如，我们定义一个名为 `Blog` 的类来表示博客：

```C#
public class Blog
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
}
```

在这个示例中，`Blog` 类有三个属性：`Id`、`Title` 和 `Content`，其中 `Id` 属性作为主键，EF Core 将自动为其生成一个唯一标识符。

## 创建实体类的配置

创建一个实现了 `IEntityTypeConfiguration` 接口的实体类的配置类 BlogEntityConfig，它用于配置实体类和数据库表的对应关系：

```C#
public class BlogEntityConfig : IEntityTypeConfiguration<Blog>
{
    public void Configure(EntityTypeBuilder<Blog> builder)
    {
        //配置生成表的名称
        builder.ToTable("Blog");
        //配置字段的类型、长度、是否必须等
        builder.Property(e => e.Title).HasMaxLength(50).IsRequired();
    }
}
```

## 创建数据库上下文

在使用 EF Core 进行数据操作之前，需要先定义一个数据库上下文（`DbContext`），用于描述应用程序与数据库之间的映射关系。这个上下文类需要继承自 `DbContext`。

```C#
public class BlogContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //配置数据库连接字符串
        string connectionString = "Server=127.0.0.1;Port=5432;Database=postgres;User Id=postgres;Password=postgres;";
        optionsBuilder.UseNpgsql(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);
    }
}
```

在这个示例中，我们定义了一个名为 `BloggingContext` 的数据库上下文，并且包含了一个 `DbSet<Blog>` 属性来表示博客的集合。另外，在 `OnConfiguring` 方法中，我们指定了数据库的连接字符串，以便 EF Core 可以正确连接到数据库。

## 创建数据库

在配置好数据库上下文之后，我们需要在数据库中创建对应的表。这可以通过 EF Core 的迁移工具来实现。

在命令行工具中执行以下命令：

```shell
# 数据库迁移
PM> Add-Migration InitBlogTable

PM> Update-database
```

这两个命令将分别创建一个迁移文件并将其应用到数据库中，以便创建对应的 Blog 表。

## 数据操作

在 EF Core 中，我们使用 `BlogEntityContext` 创建了一个数据库上下文对象，在增删改查的时候，就需要通过它和数据库进行操作。

### 新增数据

```C#
[HttpPost]
[Route("AddBlog")]
public async Task AddBlog([FromBody] List<Blog> blogs)
{
    using BlogContext ctx = new BlogContext();

    if (blogs != null && blogs.Count > 0)
    {
        foreach (Blog blog in blogs)
        {
            await ctx.Blogs.AddAsync(blog);
        }
    }
    //提交事务，保存到数据库
    await ctx.SaveChangesAsync();
}
```

### 查询数据

```C#
[HttpGet]
[Route("GetBlog")]
public Blog GetBlog([FromQuery] int Id)
{
    using BlogContext ctx = new BlogContext();

    var res = ctx.Blogs.Where(d => d.Id == Id);

    foreach (Blog item in res)
    {
        return item;
    }

    return new Blog();
}
```

### 更新数据

```C#
[HttpPut]
[Route("UpdateBlog")]
public async Task UpdateBlog([FromQuery] int Id)
{
    using BlogContext ctx = new BlogContext();

    Blog res = ctx.Blogs.Single(d => d.Id == Id);
    res.Title = "赤壁赋";
    res.Content = "壬戌之秋，七月既望。";

    await ctx.SaveChangesAsync();
}
```

### 删除数据

```C#
[HttpDelete]
[Route("DeleteBlog")]
public async Task DeleteBlog([FromQuery] int Id)
{
    using BlogContext ctx = new BlogContext();

    Blog res = ctx.Blogs.Single(d => d.Id == Id);
    ctx.Blogs.Remove(res);

    await ctx.SaveChangesAsync();
}
```

## 总结

EF Core 是一个功能强大的 ORM 框架，可以帮助开发人员轻松地访问和操作关系型数据库。本文介绍了 EF Core 的基本用法，包括创建数据模型、配置数据库上下文、创建数据库、以及数据操作等方面。希望本文能够帮助读者更好地了解和使用 EF Core。
