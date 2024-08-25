# 文件IO操作

流 是一个字节序列，可用于对后备存储进行 读取 和 写入操作，后备存储可以是多个存储媒介之一，例如磁盘和内存。

![System.IO](./image/System.IO.png)

## Path类

Path类 主要用于处理文件和目录路径。

| 方法                          | 作用                   |
| ----------------------------- | ---------------------- |
| GetExtension()                | 获取文件扩展名         |
| ChangeExtension()             | 修改文件扩展名         |
| HasExtension()                | 判断文件是否带有扩展名 |
| Combine()                     | 合并两个路径           |
| GetFileName()                 | 获取文件名，带有扩展名 |
| GetFileNameWithoutExtension() | 获取文件名，不带扩展名 |
| GetFullPath()                 | 获取文件的绝对路径     |
| GetDirectoryName()            | 获取路径中的目录部分   |
| GetPathRoot()                 | 获取路径中的根目录部分 |

```C#
string path1 = "E:\\code";
string path2 = "file\\test.txt";

// 获取文件扩展名
var extension = Path.GetExtension(path2);//.txt
// 修改文件扩展名
var newExtension = Path.ChangeExtension(path2, "pdf");// /file/test.pdf
// 判断文件是否带有扩展名
var isExtension = Path.HasExtension(path1);//false
// 合并两个路径
var combinePath = Path.Combine(path1, path2);//E:\\code\\file\\test.txt
// 获取文件名
var fileName = Path.GetFileName(path2);//test.txt
var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(path2);//test
// 获取文件绝对路径
var fullPath = Path.GetFullPath(path2);
// 获取路径中的目录部分
var dirPath = Path.GetDirectoryName(fullPath);
// 获取路径中的根路径
var rootPath = Path.GetPathRoot(fullPath);
```



## Directory类

`Directory` 用于通过目录和子目录进行 创建、移动、删除、枚举的 **静态方法**。

| 方法            | 作用                     |
| --------------- | ------------------------ |
| Exists          | 判断目录是否存在         |
| CreateDirectory | 创建目录                 |
| Delete          | 删除文件夹，支持递归删除 |
| Move            | 移动文件夹               |
| GetDirectories  | 获取子目录文件夹         |
| GetFiles        | 获取目录下的文件         |

```C#
string path = @"E:/code/test/test001";

if (!Directory.Exists(path))
{
    Directory.CreateDirectory(path);
}
// 删除文件夹，只能删除空文件夹
Directory.Delete(path);
// 递归删除目录下所有空文件夹
Directory.Delete(@"E:/code", true);
// 移动文件
Directory.Move(@"E:/code/test", @"E:/code/test2");
// 获取子目录
var childDirs = Directory.GetDirectories(@"E:/code/");
// 获取文件
var files = Directory.GetFiles(path);
```



## DirectoryInfo类

`DirectoryInfo` 用于 创建、移动、删除、枚举目录和子目录的 **实例方法**（就是要 `new DirectoryInfo()`）。

| 方法                     | 作用                                              |
| ------------------------ | ------------------------------------------------- |
| Exists                   | 一个属性，判断是否存在当前路径                    |
| Create                   | 创建文件夹                                        |
| Delete                   | 递归删除文件夹                                    |
| Refresh                  | 刷新文件夹                                        |
| EnumerateDirectories     | 获取文件夹集合                                    |
| EnumerateFiles           | 获取文件集合                                      |
| EnumerateFileSystemInfos | 获取文件夹和文件的集合                            |
| GetDirectories           | 获取文件夹数组（效果和 EnumerateDirectories相同） |
| GetFiles                 | 获取文件集合                                      |
| GetFileSystemInfos       | 获取文件夹和文件的集合                            |

```C# {2}
string path = @"E:/code/test";
DirectoryInfo dir = new DirectoryInfo(path);

if (!dir.Exists) dir.Create();
// 删除目录下的文件
dir.Delete(true);
// 刷新文件夹
dir.Refresh();

// 获取目录下子文件夹的集合
List<DirectoryInfo>? enumDirs = dir.EnumerateDirectories().ToList();
// 获取目录下文件的集合
List<FileInfo>? enumFiles = dir.EnumerateFiles().ToList();
// 获取目录下文件夹和文件的集合
List<FileSystemInfo>? enumAll = dir.EnumerateFileSystemInfos().ToList();

// 获取目录下子文件夹数组
DirectoryInfo[]? arrDirs = dir.GetDirectories();
// 获取目录下子文件数组
FileInfo[]? arrFiles = dir.GetFiles();
// 获取目录下文件夹和文件的数组
FileSystemInfo[]? arrAll = dir.GetFileSystemInfos();
```



## File类

`File` 提供用于创建、复制、删除、移动和打开文件的 **静态方法**，并协助创建 `FileStream` 对象。

| 方法           | 作用                                             |
| -------------- | ------------------------------------------------ |
| Create         | 创建文件，可以提供缓冲区                         |
| Delete         | 删除文件                                         |
| Copy           | 复制文件，源文件还会存在                         |
| Move           | 移动文件，源文件直接被移动到新目录               |
| AppendText     | 需要通过创建的 StreamWriter 对象，来进行文本追加 |
| AppendAllLines | 追加 IEnumable 集合到文件中（每行都带有换行）    |
| AppendAllText  | 追加一行文字到文件中（不带有换行）               |

```C#
string path = @"E:/code/text1.txt";

File.Create(path);
File.Create(path, 1024); // 1024为缓冲区大小

File.Delete(path);

File.Copy(path, @"E:/code2/test1.txt");
File.Move(path, @"E:/code2/test1.txt");

var fileWriter = File.AppendText(path);

List<string> list = ["hello，world！", "你好，世界！", "C#，你好！"];
File.AppendAllLines(path, list);
await File.AppendAllLinesAsync(path, list);

File.AppendAllText(path, "天王盖地虎，");
await File.AppendAllTextAsync(path, "宝塔镇河妖。");
```

### 打开文件

| 方法           | 作用                                                         |
| -------------- | ------------------------------------------------------------ |
| File.OpenRead  | 只读方式获取文件流                                           |
| File.OpenWrite | 写入方式获取文件流                                           |
| File.OpenText  | 针对文本的读取流                                             |
| File.Open      | 打开文件（只读、只写、创建、创建新文件、打开或创建），并可以设置读写权限 |

```C#
string path = @"E:/code/text1.txt";

FileStream readerStream = File.OpenRead(path);
FileStream writerStream = File.OpenWrite(path);
// 文本读取流
StreamReader texterStream = File.OpenText(path);

// 打开文件，不存在则报错
FileStream fileStram1 = File.Open(path, FileMode.Open);
// 创建文件，若文件存在则覆盖
FileStream fileStream2 = File.Open(path, FileMode.Create);
// 创建新文件，若存在则报错
FileStream fileStream3 = File.Open(path, FileMode.CreateNew);
// 文件不存在则创建，若存在则插入到文件末尾，并设置写入权限
FileStream fileStream4 = File.Open(path, FileMode.Append, FileAccess.Write);
// 打开或创建文件，并设置读写权限
FileStream fileStream5 = File.Open(path, FileMode.OpenOrCreate, FileAccess.ReadWrite);
```



### 读取文件

| 方法              | 异步方法               | 作用                      |
| ----------------- | ---------------------- | ------------------------- |
| File.ReadLines    | File.ReadLinesAsync    | 读取文件，结果为 集合     |
| File.ReadAllText  | File.ReadAllTextAsync  | 读取文件，结果为 字符串   |
| File.ReadAllLines | File.ReadAllLinesAsync | 读取文件，结果为 数组     |
| File.ReadAllBytes | File.ReadAllBytesAsync | 读取文件，结果为 字节数组 |

```C#
// 读取文件，结果为集合
IEnumerable<string> result = File.ReadLines(path);
IAsyncEnumerable<string> result1 = File.ReadLinesAsync(path);
await foreach (var item in result1)
{
    Console.WriteLine(item);
}

// 读取文件，结果为 字符串
string result3 = File.ReadAllText(path);
string result4 = await File.ReadAllTextAsync(path);

// 读取文件，结果为 数组
string[] result5 = File.ReadAllLines(path);
string[] result6 = await File.ReadAllLinesAsync(path);

// 读取文件，结果为 字节数组
byte[] result7 = File.ReadAllBytes(path);
byte[] result8 = await File.ReadAllBytesAsync(path);
string text = Encoding.UTF8.GetString(result8);
```



### 写入文件

| 方法               | 异步方法                | 作用                                             |
| ------------------ | ----------------------- | ------------------------------------------------ |
| File.WriteAllText  | File.WriteAllTextAsync  | 写入文本内容，没有换行，且会覆盖原有内容         |
| File.WriteAllLines | File.WriteAllLinesAsync | 以文本数组写入内容，带有换行，且会覆盖掉原本内容 |
| File.WriteAllBytes | File.WriteAllBytesAsync | 以字节数组写入内容，会覆盖掉原本内容             |

```C#
File.WriteAllText(path, "Today Weather is very good.");
await File.WriteAllTextAsync(path, "Weather is very good.");

File.WriteAllLines(path, ["落霞与孤鹜齐飞，", "秋水共长天一色。"]);
await File.WriteAllLinesAsync(path, ["道阻且长，", "行则将至。"]);

File.WriteAllBytes(path, Encoding.UTF8.GetBytes("hello，world！"));
await File.WriteAllBytesAsync(path, Encoding.UTF8.GetBytes("你好世界！"));
```



## FileInfo类

`FileInfo` 类提供用于创建、复制、删除、移动和打开文件的 **实例方法**，并协助创建 `FileStream` 对象。

常用方法：

| 方法       | 作用                 |
| ---------- | -------------------- |
| Create     | 创建文件             |
| Delete     | 删除文件             |
| CopyTo     | 复制文件，保留源文件 |
| MoveTo     | 移动文件，删除源文件 |
| AppendText | 追加文本             |

```C#
string path = @"E:/code/text1.txt";

var fileInfo = new FileInfo(path);
fileInfo.Create();
fileInfo.Delete();
fileInfo.CopyTo(@"E:/code2/text1.txt");
fileInfo.MoveTo(@"E:/code2/text1.txt");
var fileWriter = fileInfo.AppendText();
```



## FileStream



## MemoryStream



## BufferedStream



## Text

### StreamReader

`StreamReader` 继承自 TextReader，使其以一种特定的编码从字节流中读取字符。

| 方法      | 异步方法       | 作用                                 |
| --------- | -------------- | ------------------------------------ |
| ReadLine  | ReadLineAsync  | 每次读取一行数据，读到末尾返回null   |
| ReadToEnd | ReadToEndAsync | 读取整个文件内容到一个字符串中       |
| Read      | ReadAsync      | 读取指定数量的字符到缓冲区           |
| Close     | 无             | 关闭流，读取完数据之后一定记得关闭流 |

```C#
string path = @"E:/code/text1.txt";
var stream = new StreamReader(path);

// 循环读取每一行数据
while (true)
{
  var res = await stream.ReadLineAsync();
  if (string.IsNullOrWhiteSpace(res)) break;
  Console.WriteLine(res);
}
// 从头到尾读取整个文件
var result2 = await stream.ReadToEndAsync();

// 读取指定字符到缓冲区
char[] buffer = new char[50];
await stream.ReadAsync(buffer, 0, buffer.Length);
Console.WriteLine(new string(buffer));

stream.Close();
```



### StreamWriter

| 方法      | 异步方法       | 作用                                     |
| --------- | -------------- | ---------------------------------------- |
| WriteLine | WriteLineAsync | 将字符串写入到流中，并在字符后添加换行符 |
| Write     | WriteAsync     | 将字符串写入到流中，字符后不添加换行符   |
|           |                |                                          |

```C#
string path = @"E:/code/text1.txt";
var stream = new StreamWriter(path);

// 将字符串写入文件中，会覆盖旧的文件内容，但不会覆盖 WriteLine 已经写入的内容
stream.WriteLine("希望就在前方！");
await stream.WriteLineAsync("希望就在前方！");

stream.Close();
```



## Binary

### BinaryReader



### BinaryWriter







































































































































































































