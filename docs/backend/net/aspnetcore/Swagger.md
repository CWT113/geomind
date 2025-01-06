# Swagger

## 忽略接口不生成Swagger

忽略接口不生成 Swagger，需要添加属性 `[ApiExplorerSettings(IgnoreApi = true)]` 。

- 该属性可以添加在 Controller 上，忽略整个 Controller 不生成 Swagger；
- 也可以添加在具体的接口上，只忽略当前接口不生成 Swagger；

```C# {3}
[ApiController]
[Route("api/[controller]")]
[ApiExplorerSettings(IgnoreApi = true)] // [!code ++]
public class ExampleController : ControllerBase
{
}
```

```C# {6}
[ApiController]
[Route("api/[controller]")]
public class ExampleController : ControllerBase
{
  [HttpGet("hidden")]
  [ApiExplorerSettings(IgnoreApi = true)] // [!code ++]
  public IActionResult HiddenMethod() => Ok("This is hidden in Swagger");
}
```



