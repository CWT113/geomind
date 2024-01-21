# 基本 SQL 语句

## DML

概念：DML 英文全称是`Data Manipulation Lanquage`(数据操作语言)，用来对数据库中表的数据记录进行**增删改**操作。

### 插入数据

1. 插入指定字段：

```SQL
# 语法
insert into 表名 (列1, 列2, ...) values (值1, 值2, ...);

- 测试
insert into employee (id, name) values (1, '王一博');
```

2. 插入全部字段：

```SQL
# 语法
insert into 表名 values (值1, 值2, ...);

-- 测试
insert into employee values (1, '王一博');
```

3. 批量插入数据：

```SQL
# 语法
insert into 表名 values (值1, 值2, ...), (值1, 值2, ...);

-- 测试
insert into employee values (1, '王一博'), (2, '陈伟霆');
```

### 更新数据

更新字段或整张表：

```SQL
# 语法
update 表名 set 列1 = 值1, 列2 = 值2 [where 条件语句]; -- where 条件语句不写，默认更新整张表

-- 测试
-- 1、将 id 为 1 的用户，名称设置为 '王一博'
update employee set name = '王一博' where id = 1;

-- 2、将 id 为 1 的用户，名称设置为 '王一博'，性别改为 '女'
update employee set name = '王一博', gender = '女' where id = 1;

-- 3、将表中所有用户的入职日期设置为 2008-01-01
update employee set entrydate = '2008-01-01';
```

### 删除数据

删除字段或整张表：

```SQL
# 语法
delete from 表名 where 条件语句; -- where 条件语句不写，默认删除整张表

-- 测试
-- 1、删除表中 id 为 1 的用户
delete from employee where id = 1;

-- 2、删除表中所有数据
delete from employee;
```

## DQL

概念：DML 英文全称是`Data Query Lanquage`(数据查询语言)，专门用于查询数据库中的数据。

语法：

```SQL
SELECT
    字段列表
FROM
    表名字段
WHERE
    条件列表
GROUP BY
    分组字段列表
HAVING
    分组后的条件列表
ORDER BY
    排序字段列表
LIMIT
    分页参数
```

- 基础查询

- 条件查询（where）

- 聚合函数（count，max，min，avg，sum）

- 分组查询（group by）

- 排序查询（order by）

- 分页查询（limit）

### 基础查询

1. 查询多个字段

```SQL
# 语法
select 列1,列2,列3,... from 表名;

select * from 表名; -- 性能问题 --

-- 示例
-- 1、查询指定字段 id, name, gender, age
select id,name,gender,age from emp;

-- 2、查询所有字段（两条语句等价）
select id,workno,name,gender,age,idcard,entrydate from emp;
select * from emp;
```

2. 设置别名

```SQL
# 语法
select 列1 [as 别名1], 列2 [as 别名2], ... from 表名;

-- 示例
-- 3、查询所有员工的姓名和身份证号，起别名
select name as '姓名', idcard as '身份证号' from emp;
```

3. 去除重复记录

```SQL
# 语法
select distinct 列1 from 表名;

-- 示例
-- 4、查询员工的性别，并去重
select distinct gender from emp;
```

### 条件查询

语法：

```SQL
select * from 表名 where 条件语句
```

条件分类：

| 比较运算符          | 功能                                          |
| ------------------- | --------------------------------------------- |
| >                   | 大于                                          |
| > =                 | 大于等于                                      |
| <                   | 小于                                          |
| < =                 | 小于等于                                      |
| =                   | 等于                                          |
| ! = 或 <>           | 不等于                                        |
| between ... and ... | 在某个范围之内（包含最小、最大值）            |
| in(...)             | 在 in 之后的列表中的值，多选一                |
| like 占位符         | 模糊匹配（\_：匹配单个字符；%：匹配多个字符） |
| is null             | 是 null 的值                                  |
| is not null         | 不是 null 的值                                |

| 逻辑运算符 | 功能                         |
| ---------- | ---------------------------- |
| and 或 &&  | 并且（多个条件同时成立）     |
| or 或 \|\| | 或者（多个条件任意成立一个） |
| not 或 \|  | 非，不是                     |



示例：

```SQL
-- 1、查询没有身份证号的员工
select * from emp where idcard is null;

-- 2、查询年龄在15~20之间的员工
select * from emp where age >= 15 and age <= 20;

select * from emp where age between 15 and 20;

-- 3、查询年龄为 18，20，30的员工
select * from emp where age = 18 or age = 20 or age = 30;

select * from emp where age in (18,20,30);

-- 4、查询姓名为两个字的员工（模糊查询 _）
select * from emp where name like '__';

-- 5、查询身份证号最后一位为 X 的员工（模糊查询 %）
select * from emp where idcard like '%X';
```

### 聚合函数

语法：

```SQL
select 聚合函数(列) from 表名;
```

常见聚合函数：

| 聚合函数 | 功能     |
| -------- | -------- |
| count    | 统计总数 |
| max      | 最大值   |
| min      | 最小值   |
| avg      | 平均值   |
| sum      | 求和     |

注意：null 值不参与聚合函数的计算！

### 分组查询

语法：

```SQL
select 列 from 表名 [where 条件] group by 分组字段名 [having 分组后过滤条件];
```

where 和 having 有什么区别？

    1、执行时机不同：where 是分组之前进行过滤，不满足 where 条件不参与分组；而 having 是在分组之后对分组结果进行过滤；
    2、判断条件不同：where 不能对聚合函数进行判断，而 having 可以；

注意：

1. 执行顺序：where > 聚合函数 > having
2. 分组之后，查询的字段一般为 聚合函数 和 分组字段，查询其他字段无任何意义

示例：

```SQL
-- 1、根据性别分组，统计男性员工 和 女性员工的数量
select gender,count(*) from emp group by gender;

-- 2、根据性别分组，统计男性员工 和 女性员工的平均年龄
select gender,avg(age) from emp group by gender;

-- 3、查询年龄小于20的员工，并根据性别分组，获取性别数量大于等于3的性别
select gender,count(*) from emp
           where age < 20
           group by gender
           having count(*) >= 3;
```

### 排序查询

语法：

```SQL
select 列 from 表名 order by 列1 排序方式1, 列2 排序方式2;
```

| 排序方式 | 功能                       |
| -------- | -------------------------- |
| asc      | 默认值，升序排序（可省略） |
| desc     | 降序排序                   |

注意：如果多字段排序，当第一个字段值相同时，才会根据第二个字段值进行排序。

示例：

```SQL
-- 1、根据年龄对员工进行 升序排序
select * from emp order by age asc;

-- 2、根据入职时间对员工进行 降序排序
select * from emp order by entrydate desc;

-- 3、根据年龄对员工 升序排序，年龄相同，再按照入职时间 降序排序
select * from emp order by age asc, entrydate desc;
```

### 分页查询

语法：

```SQL
select 列 from 表名 limit 起始索引,查询记录数;
```

- 起始索引：(页数 - 1) \* 每页显示条数

- 查询记录数：就是每页显示几条数据

示例：

```SQL
-- 1、查询第 1 页员工数据，每页展示3条 ------> 公式：(页码-1) * 每页条数
select * from emp limit 0,3;

-- 2、查询第 2 页员工数据，每页展示3条
select * from emp limit 3,3;
```
