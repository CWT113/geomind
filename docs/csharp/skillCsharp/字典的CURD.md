# 字典的增删改查

C# 字典是一种数据结构，它是由**键值对组成的集合**。每个键值对都包含一个键和一个对应的值。C# 字典可以用来存储和查找数据，通过键来访问对应的值。

```C#
//创建一个 C# 字典
Dictionary<string, string> myDictionary = new Dictionary<string, string>();
```

1. 添加键值对到字典中（注意：相同的 key 值只能 Add 一次，否则报错）

```C#
myDictionary.Add("1", "apple");
myDictionary.Add("2", "banana");
myDictionary.Add("3", "orange");
```

2. 索引器取值（注意：若字典中没有此 key 时，直接报错）

```C#
Console.WriteLine(myDictionary["1"]);    //apple
Console.WriteLine(myDictionary["2"]);    //banana
Console.WriteLine(myDictionary["3"]);    //orange
```

3. `TryGetValue`取值（注意：取到值时返回 True，内部对`value`赋值，否则返回 False）

```C#
bool myDictionary.TryGetValue("1", out string? value);    // True

if (myDictionary.TryGetValue("1", out string? value))
{
    Console.WriteLine("Value = " + value);    // Value = apple
}
```

4. 修改字典中”键 对应”的“值”

```C#
myDictionary["1"] = "王一博";
Console.WriteLine(myDictionary["1"]);    //王一博
```

5. 遍历字典

```C#
// 5.1 常规遍历
foreach (KeyValuePair<string, string> kvp in myDictionary)
{
    Console.WriteLine("Key = " + kvp.Key + ", Value = " + kvp.Value);
}

// 5.2 元组分解语法遍历
foreach (var (key, value) in myDictionary)
{
    Console.WriteLine("Key = " + key + ", Value = " + value);
}

// 5.3 迭代器遍历
var enumerator = myDictionary.GetEnumerator();
while (enumerator.MoveNext())
{
    var (key, value) = enumerator.Current;
    Console.WriteLine($"key = {key}, value = {value}");
}
```

```C#
// 5.4 单独遍历所有key值
foreach (var key in myDictionary.Keys)
{
    Console.WriteLine($"key = {key}");
}

// 5.5 单独遍历所有value值
foreach (var value in myDictionary.Values)
{
    Console.WriteLine($"value = {value}");
}
```

6. 判断字典中是否包含指定的键

```C#
if (myDictionary.ContainsKey("1"))
{
    Console.WriteLine("字典中包含此键值对");
}
```

7. 删除字典中的键值对

```C#
myDictionary.Remove("3");
```
