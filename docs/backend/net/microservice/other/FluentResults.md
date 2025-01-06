# FluentResults

>Github 地址：https://github.com/altmann/FluentResults
>
>相关教程：[.NET 结果与错误处理利器 FluentResults-CSDN博客](https://blog.csdn.net/u012573563/article/details/140843678)



FluentResults 是一个开源的 .NET 库，它提供了一种简洁而强大的方式来表示和处理结果和错误。

FluentResults 的核心思想是使用 Result 对象来封装操作的结果，Result 对象可以表示成功或失败，并且可以携带任意类型的值或错误。



## Success

`Result.Ok()` 可以创建一个简单的返回值对象，其中只包含 `IsSuccess = true` 的信息。它还包括其他的返回类型：

```C#
Result? result = Result.Ok();


```











## Error