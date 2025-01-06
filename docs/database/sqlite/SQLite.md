# SQLite

> 菜鸟文档：https://www.runoob.com/sqlite/sqlite-tutorial.html

> Github：https://github.com/sqlite/sqlite

SQLite 是一个软件库，实现了自给自足的、无服务器的、零配置的、事务性的 SQL 数据库引擎。

## 安装

- 访问 [SQLite 下载页面](http://www.sqlite.org/download.html)，从 Windows 区下载预编译的二进制文件；

- 下载 **sqlite-tools-win32-\*.zip** 和 **sqlite-dll-win32-\*.zip** 两个压缩文件；

- 创建文件夹 `D:\sqlite`，并在此文件夹下解压上面两个压缩文件，将得到 `sqlite3.def`、`sqlite3.dll` 和 `sqlite3.exe` 文件；

- 添加 `D:\sqlite` 到 PATH 环境变量，最后在命令提示符下，使用 **sqlite3** 命令，测试是否安装成功：

  ```shell
  C:\Users\L7792> sqlite3
  SQLite version 3.44.2 2023-11-24 11:41:44 (UTF-16 console I/O)
  Enter ".help" for usage hints.
  Connected to a transient in-memory database.
  Use ".open FILENAME" to reopen on a persistent database.
  ```

## 基本数据类型

一般数据采用的是固定的静态数据类型，而 SQLite 采用的是动态数据类型，会根据存入的值自动判断。

常见的数据类型有以下 5 种：

| 数据类型 | 描述                       |
| -------- | -------------------------- |
| integer  | 带符号的整型（最多 64 位） |
| real     | 8 字节表示的浮点类型       |
| text     | 字符类型                   |
| blob     | 任意类型的数据，大小无限制 |
| NULL     | 空值                       |

## 基本使用

### 创建库

语法：

```sql
-- 创建 app.db 库
sqlite3 app.db

-- 查看数据库（此时才会显示创建的库）
.databases
```

```sql
-- 创建 test.db 库
.open test.db
```

### 创建表

语法：

```sql
create table table_name (列1 数据类型, 列2 数据类型, ...);
```

示例：

```sql
-- 创建 person 表，包含 id、name、age 字段
create table person (id integer, name text, age integer);
```

### 创建表（设置主键）

在使用 sqlite 设计表时，每张表都可以通过 `primary key` 手动设置主键，每张表只能有一个主键，并且设置为主键的列，数据不可重复。

语法：

```sql
create table table_name (列1 数据类型 primary key, 列2 数据类型, ...);
```

示例：

```sql
-- 创建 person 表，包含 id、name、age 字段，并将 id 设置为主键
create table person (id integer primary key, name text, age integer);
```

## 修改表

### 修改表字段

语法：

```sql
alter table table_name add 列名 数据类型;
```

示例：

```sql
-- 向 person 表中添加 sex 字段，类型为 text
alter table person add sex text;
```

### 修改表名

语法：

```sql
alter table table_name rename to new_table_name;
```

示例：

```sql
-- 修改 person 表的名称为 persons
alter table person rename to persons;
```

## 删除表

语法：

```sql
drop table table_name;
```

示例：

```sql
-- 删除 persons 表
drop table persons;
```

## 插入数据

语法：

```sql
insert into table_name values (列1值, 列2值, ...);
```

示例：

创建 person 表，并添加一条数据：

```sql
-- 创建 person 表
create table person (id integer primary key, name text, age integer);

-- 插入数据
insert into person values (1, 'sunny', 20);

-- 插入多条数据
insert into person values (2, 'job', 30), (3, 'luck', 40);
```

## 更新数据

使用 where 根据匹配条件，查找一行或多行，根据查找的结果修改表中相应行的列值。

语法：

```sql
update table_name set 列1 = 值1, 列2 = 值2 where 条件;
```

常见的条件匹配符有：`>`、`>=`、`<`、`<=`、`=`、`<>`

示例：

```sql
-- 查询 person 表中年龄为 40 的人员，修改名字为 hello world
update person set name = 'hello world' where age = 40;
```

## 删除数据

使用 where 根据匹配条件，查找一行或多行，根据查找的结果删除表中查找到的行。

语法：

```sql
-- 当 where 条件不存在时，删除表中所有数据
delete from table [where 条件];
```

示例：

```sql
-- 删除 person 表中，年龄为 40 岁的人员
delete from person where age = 40;
```

## 查询数据

从表中查询数据，结果被存储在一个结果表中（称为结果集）。

语法：

```sql
-- 当 where 条件不存在时，查询表中所有数据
select * from table_name [where 条件];

-- 查找表中指定列的数据
select 列1, 列2, ... from table_name [where 条件];
```

示例：

```sql
-- 查找表中所有数据
select * from person;

-- 查找表中 id 为 1 的人，并只查询 id, name 字段
select id, name from person where id = 1;
```

### in

作用：where 子句中规定多个值。

语法：

```sql
select * from table_name where id in (值1, 值2, ...);
```

示例：

```sql
-- 从 person 表中查询 id 为 1 和 2 的人
select * from person where id in (1, 2);
```

### and

作用：连接两个及两个以上的条件，只有两个条件都为满足时，才返回数据。

语法：

```sql
select * from table_name where 列1 = 值1 and 列2 = 值2;
```

示例：

```sql
-- 查询 person 表中 id 为 1，name 为 'sunny' 的人
select * from person where id = 1 and name = 'sunny';
```

### or

作用：连接两个及两个以上的条件，返回满足任何一个条件的数据。

语法：

```sql
select * from table_name where 列1 = 值1 or 列2 = 值2;
```

示例：

```sql
-- 查询 person 表中 id 为 1，name 为 'job' 的人
select * from person where id = 1 or name = 'job';
```

### between ... and ...

作用：查询介于 between ... and ... 之间的数据。

语法：

```sql
select * from table_name where 列1 between ... and ...;
```

示例：

```sql
-- 查询 person 表中 id 介于 1 和 3 之间的数据
select * from person where id between 1 and 3;
```

### like

作用：模糊查询。

语法：

```sql
select * from person where 列1 like 值1;
```

示例：

```sql
-- 查询 id 为 2 的数据
select * from person where id like 2;

-- 查询 name 中包含 s 的数据
select * from person where name like '%s%';
```

### not

作用：获取查找结果的 补集。

语法：

```sql
select * from person where 列1 not like 值1;
```

示例：

```sql
-- 查询 name 中不包含 s 的数据
select * from person where name not like '%s%';
```
