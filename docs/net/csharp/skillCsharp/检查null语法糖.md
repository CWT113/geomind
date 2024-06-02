# 检查null语法糖

### `??`

如果左边是的null，那么返回右边的操作数，否则就返回左边的操作数。

```C#
int? a = null;

int b = a ?? -1;
Console.WriteLine(b);  // -1
```

```C#
//条件判断
string x;

if (i < 3)
  x = y;
else 
{  
    if (z != null) x = z; 
    else z = "notnull";
}

//替换
var x = i < 3 ? y : z ?? "notnull"
```



### `??=`

当左边是null时，那么就对左边的变量赋值成右边的。

```C#
int? a = null;

a ??= -1;

Console.WriteLine(b);  // -1
```

```C#
//参数给予默认值
if (x == null) x = "str";

//替换
x ??= "str";
```



### `?.`

当左边是null，那么不执行后面的操作，直接返回空，否则就返回实际操作的值。

```C#
string? str = null;

int? length = str?.Length;

Console.WriteLine(length); // null
```

```C#
//防止对象为null的时候，依然执行代码
if(obj != null) 
    obj.Act();

//替换
obj?.Act();
```



### `?[]`

索引器操作，和上面的操作类似。

```C#
string[] i = null;

string result = i?[1];

Console.WriteLine(result); //null
```



### `!.`

`!` 通常用于处理可空引用类型，`!.` 运算符用于告诉编译器，我确定前面的表达式不会为 null，及时它在可空引用类型的上下文中。

```C#
if (_approachMSADrawParam!.Sectors != null)
{
  //TODO 
}
```



















