# alasql

>Github：https://github.com/AlaSQL/alasql

>参考文章：https://blog.csdn.net/hao_13/article/details/130150978



AlaSQL 是一个为 javascript 构建的开源的 SQL 数据库。

AlaSQL 专注于关系数据和无模式数据的查询速度和数据源灵活性，使用 AlaSQL 不仅可以在数据中使用传统的 SQL 语句，还可以**读写 Excel** 和其他的数据文件。




### 安装

```TypeScript
// 安装
pnpm install alasql

// 引入
import alasql from "alasql";
```



### 基本使用

```TypeScript
// ⭐创建表
alasql("create table user(id int, name string, age number)");

// → 新增数据
alasql("insert into user (id, name) values(1, 'sunny')");
alasql("insert into user values(2, '张三', 14), (3, '李四', 20)");
alasql("insert into user values(?, ?, ?)", [data.id, data.name, data.age]);

// → 更新数据
alasql("update user set name = 'Bob' where id = 1");

// → 删除数据
alasql("delete from user where id = 4");
alasql("delete from user");

// → 查询数据
let result = alasql("select * from user");
let result = alasql("select * from user where id > 1 order by age");
```



### 查询已有数据

定义已有数据：

```TypeScript
let arr = [
  { id: 1, name: "张三1", age: 24, gender: "男" },
  { id: 2, name: "李四1", age: 24, gender: "男" },
  { id: 3, name: "王五1", age: 50, gender: "女" },
  { id: 4, name: "赵六1", age: 42, gender: "女" }
];
```

```TypeScript
// 查询数据
let result1 = alasql("select * from ?", [arr]);

// 查询总条数
let result2 = alasql("select count(*) as number from ?", [arr]);

// 排序查询
let result3 = alasql("select * from ? where id > 3 order by age desc", [arr]);
```



### 导出 Excel

```Vue
<template>
  <button @click="DownLoadToExcel">导出数据</button>
</template>

<script setup>
  import alasql from "alasql";
  
  const DownLoadToExcel = () => {
  // 默认导出
  alasql("select * into XLS('arr.xls',{headers:true}) from ?", [arr]);

  // 条件导出
  alasql(
    "select id, name, age into XLS('arr1.xls',{headers:true}) from ? where id > 4 order by age desc",
    [arr]
  );
};
</script>
```
