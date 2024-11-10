# 关于null的语法糖

## ??

如果 `??` 左边为 null，则返回右边的值，否则返回左边的值。

```C#
int? a = null;

int b = a ?? -1;
Console.WriteLine(b);  // -1
```



## ??=

当 `??=` 左边是 null 时，那么就对左边的变量赋值成右边的。

```C#
int? a = null;

a ??= -1;
Console.WriteLine(b);  // -1
```

```C#
if (x == null) 
{
  x = "Yibo";
}

// 优化
x ??= "Yibo";
```



## ?.

当左边是 null 时，那么不执行后面的操作，直接返回空，否则就返回实际操作的值。

```C#
string? str = null;
int? length = str?.Length;
Console.WriteLine(length); // null
```

```C#
if(obj != null) 
{
  obj.Act();
}

// 优化
obj?.Act();
```



## ?[]

索引器操作，和上面的操作类似。

```C#
string[] i = null;
string result = i?[1];
Console.WriteLine(result); //null
```



## !

`!` 通常用于处理可空引用类型，`!.` 运算符用于明确告诉编译器，我确定前面的表达式不会为 null，及时它在可空引用类型的上下文中。

```C#
if (_approachMSADrawParam!.Sectors != null)
{
  // ...
}
```
