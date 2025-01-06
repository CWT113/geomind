# 雪花 ID

雪花 ID 的优势：**全局唯一**、**有序递增**的 64bit 的 long 类型 ID。

> 文章阅读：[什么是雪花 ID_weixin_57101315 的博客-CSDN 博客](https://blog.csdn.net/weixin_57101315/article/details/131261973)

> Github 地址：[https://github.com/yitter/IdGenerator](https://github.com/yitter/IdGenerator)

> C#.NET 雪花 Id 使用教程：[https://github.com/yitter/IdGenerator/tree/master/C%23.NET](https://github.com/yitter/IdGenerator/tree/master/C%23.NET)

> 注意：官方示例中 雪花 ID 的 `workerId` 值须在 `[0, 63]`之间。

项目中，在 Configurations 的 OtherConfig 配置中引入并配置了雪花 Id，并且 workerId 按照 **应用系统的枚举值** 来进行设置。

```C#
public static class OtherConfig
{
	public static void AddOtherConfiguration(this IServiceCollection services)
	{
		// 雪花ID
		var options = new IdGeneratorOptions(((ushort)IdGeneratorWorkerIdEnum.WebApiAppServer));
        YitIdHelper.SetIdGenerator(options);
	}
}
```

```C#
/// <summary>
/// IdGenerator生成WorkId枚举，建议按应用系统来比较合适
/// </summary>
public enum IdGeneratorWorkerIdEnum
{
    [Display(Description = "APP服务1")]
    FlightTrack = 1,
    [Display(Description = "APP服务2")]
    FlightOperate = 2,
    [Display(Description = "APP服务3")]
    WebApiAppServer = 3,
    [Display(Description = "APP服务4")]
    WebApiOtrServer = 4,
}
```

最后，在 ASP.NET Core WebAPI 的 program.cs 文件中，将雪花 ID 进行全局注册。

```C#
// 配置 Others 其他依赖注入项目
builder.Services.AddOtherConfiguration(builder.Configuration);
```

在项目中使用，为 Id 赋值即可。

```C#
User.Id = YitIdHelper.NextId();
```
