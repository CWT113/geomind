# HashTable

HashTable 类表示由 **键值对** 构成的集合类。

它具有以下优势：

- **快速查找和插入**：HashTable 采用哈希表算法，使得查找和插入操作的平均时间复杂的为 O(1)，即使在数据量较大的情况下，性能也可以非常好；
- **灵活性**：Hashtable 允许存储不同类型的键和值，提供了极大的灵活性；
- **多线程安全**：可以使用 `Hashtable.Synchronized` 方法创建一个线程安全的 Hashtable，适合多线程环境。



## 属性

|  属性  | 作用                 |
| :----: | -------------------- |
| Count  | 获取哈希表键值对个数 |
|  Keys  | 获取哈希表中的键     |
| Values | 获取哈希表中的值     |

```C#
var table = new Hashtable()
{
    { "1", "Yibo wang" },
    { "2", 100 },
    { "3", true },
    { "4", new { Name = "Yibo wang", Age = 20 } }
};
// 键值对个数
var count = table.Count;
// 键和值
var keys = table.Keys;
var values = table.Values;
```



## 方法

| 方法                              | 描述                                              |
| --------------------------------- | ------------------------------------------------- |
| **Add(key, value)**               | **向哈希表添加键值对**                            |
| Contains(key)                     | 判断哈希表中是否存在指定 key                      |
| **ContainsKey(key)**              | **判断哈希表中是否存在指定 key（等价 Contains）** |
| ContainsValue(value)              | 判断哈希表中是否存在指定 value                    |
| Remove(object key)                | 从哈希表移除指定 key                              |
| Clear()                           | 清空哈希表                                        |
| hashTable.GetEnumerator()         | 返回一个用于循环访问哈希表的枚举数                |
| Hashtable.Synchronized(hashTable) | 返回一个线程安全的哈希表                          |

```C#
// 判断哈希表是否存在指定 key
var res1 = table.Contains("1");
var res2 = table.ContainsKey("4");

// 判断哈希表是否存在指定 value
var res3 = table.ContainsValue(new { Name = "Yibo wang", Age = 20 });

// 移除指定 key
table.Remove("2");
// 清空哈希表
table.Clear();

// 返回用于循环访问 Hashtable 的枚举数
var enumerator = table.GetEnumerator();
while (enumerator.MoveNext())
{
  Console.WriteLine($"{enumerator.Key}：{enumerator.Value}");
}

// 使用线程安全的 Hashtable，确保在访问期间的线程安全
var syncHashTable = Hashtable.Synchronized(table);
lock (syncHashTable.SyncRoot)
{
  foreach (var entry in syncHashTable)
  {
    Console.WriteLine($"{entry.Key}: {entry.Value}");
  }
}
```