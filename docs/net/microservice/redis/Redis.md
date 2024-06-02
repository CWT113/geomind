# Redis

Redis（Remote Dictionary Server）：远程词典服务器，是一个基于内存的键值型NoSQL数据库。

::: tip 优势

- 基于内存的数据库，速度快，性能高；

- 支持丰富的数据类型，如String、List、Set、Hash、SortedSet；

- 支持数据持久化，可将内存中的数据存储到磁盘，重启时从磁盘再次加载使用；

- 支持事务，所有操作都具备原子性，即操作全部成功或全部失败；

- 支持主从复制，主机自动将数据同步到从机，可以进行读写分离；

:::

::: danger 缺点

- 数据存储在内存，主机断电容易数据丢失；

- 存储容量受到物理内存的限制，只能用于小数据量的高性能操作；

- 用于缓存时，需要规避“缓存雪崩”、“缓存击穿”等问题；

:::



## Redis 命令

### 数据结构

Redis 是一个 key-value 的数据库，key 一般是 String 类型的，不过 value 的类型多种多样：

|类型|示例|
|:-:|-|
|String|hello world|
|Hash|"{ name: "tom", age: 21 }"|
|List|[A → B → C → D]|
|Set|"{ A, B, C }"|
|SortedSet（排序Set）|"{ A: 1, B: 2, C: 3 }"|
|GEO（拓展：地理信息）|"{ A: (120, 30) }"|



### 通用命令

|命令|作用|
|:-:|-|
|set|创建键值对|
|mset|同时创建多组键值对|
|get|查看对应键的值|
|mget|同时查看多组键值对|
|keys *|查看符合模板的所有 key|
|del|删除指定的 key|
|exists|判断 key 是否存在，存在：1，不存在：0|
|expire|为 key 设置一个有效期，有效期到期该 key 自动删除|
|ttl|查看 key 的剩余有效期|

```SQL
-- 创建键值对
set name tom  |  mset name tom age 30 gender 1
-- 获取键值对
get name  |  mget name age gender
-- 查看数据库中所有键值对
keys *
-- 删除键值对
del name
-- 判断指定 key 是否存在
exists name
-- 为指定 key 设置有效期
expire age 20
-- 查看指定 key 的剩余有效期
ttl age
```



### String 类型

|命令|作用|
|:-:|-|
|incr|让一个整数型的 key 自增 1|
|incrby|让一个整数型的 key 自增 n|
|incrbyfloat|让一个浮点型的 key 自增 n|
|senx|如果键值对不存在，则添加，否则不添加|
|setex|添加键值对，并设置有效期|

```SQL
-- age 每次自增 1
incr age
-- age 每次自增 5
incrby age 2
-- 浮点型的 age 每次自增 0.5
incrbyfloat age 0.5
-- 如果不存在 name，则添加，否则不添加
setnx name lili
-- 添加 name1，并设置有效期 10s
setex name1 10 lili
```



#### key 的格式

Redis 的 key 允许有多个单词形成层级结构，多个单词之间用 “`:`”隔开，格式如下：

**`项目名:业务名:类型:id`**

这个格式并非固定，可根据需求自行变更。

示例：

```SQL
-- 存储 用户信息
set aikaid:user:1 '{"id":1, "name":"Jack", "age": 21}'
set aikaid:user:2 '{"id":2, "name":"Rose", "age": 18}'

-- 存储 商品信息
set aikaid:rpoduct:1 '{"id":1, "name":"小米11", "price": 4999}'
set aikaid:rpoduct:2 '{"id":2, "name":"荣耀10", "price": 2999}'
```



### Hash 类型

Hash类型，也叫散列，其value是一个无序字典，类似于 java 中的 HashMap 结构。

Hash 结构可以将对象中的每个字段独立存储，可以针对单个字段做 增删改查。

|命令|作用|
|:-:|-|
|hset|添加或修改 hash 类型的键值对|
|hget|获取 hash 类型的键值对|
|hmset|批量添加 hash 类型的键值对|
|hmget|获取指定 field 的值|
|hgetall|获取 key 下所有的键值对|
|hkeys|获取 key 下所有的键|
|hvals|获取 key 下所有的值|
|hincrby|让 key 的字段值自增|
|hsetnx|如果字段不存在，则添加，否则不添加|

示例：

```SQL
-- 添加 hash 键值对
hset aikaid:user:3 name jack
-- 修改 hash 键值对
hset aikaid:user:3 name liuxu
-- 获取 hash 键值对
hget aikaid:user:3 name
-- 获取 key 下所有键值对
hgetall aikaid:user:3
```



### List 类型

Redis 中的 List 类型，可以看作是一个双向链表结构，既可以支持正向检索，也可以支持反向检索。

特点：有序、元素可以重复、插入和删除快、查询速度一般

|命令|作用|
|:-:|-|
|lpush|向列表左侧插入一个或多个元素|
|lpop|移除并返回列表左侧的第一个元素，没有则返回 nil|
|rpush|向列表右侧插入一个或多个元素|
|rpop|移除并返回列表右侧的第一个元素，没有则返回 nil|
|lrange|返回 start 到 end 范围内的所有元素|
|blpop 和 brpop|在没有元素时等待指定时间，而不是直接返回 |
|lindex|获取指定索引的值|

```SQL
-- 向列表左侧添加 A B C
lpush aikaid:user:1 A B C
-- 向列表右侧添加 D E F
rpush aikaid:user:1 D E F
-- 移除列表左侧第一个元素
lpop aikaid:user:1
-- 移除列表右侧第一个元素
rpop aikaid:user:1
```



### Set 类型

Redis 的 Set 结构可以看作是一个 value 为 null 的 HashMap。

它也是一个hash表，也具备一下特点：无序、元素不可重复、查找快、支持交集、并集、差集等功能。

|命令|作用|
|:-:|-|
|sadd|向 set 添加一个或多个元素|
|srem|移除 set 中指定的元素|
|scard|返回 set 中元素的个数|
|sismember|判断一个元素是否存在于 set 中|
|smembers|获取 set 中的所有元素|
|sinte|求 key1 和 key2 的交集|
|sdiff|求 key1 和 key2 的差集|
|sunion|求 key1 和 key2 的并集|

```SQL
-- 向 set 中添加 A B C 三个元素
sadd aikaid:set:1 A B C
-- 返回 set 集合的个数
scard aikaid:set:1
-- 返回 set 集合的元素
smembers aikaid:set:1
-- 判断 C 是否是 set 集合的一个元素
sismember aikaid:set:1 C
-- 删除 A 这个元素
srem aikaid:set:1 A
```



### SortedSet 类型

Redis 的 SortedSet 是一个可排序的 set 集合。SortedSet 中的每一个元素都带有一个 score 属性，可以基于 score 属性对元素排序，底层的实现是一个跳表加 hash表。

特点：可排序、元素不重复、查询速度快。

因为 SortedSet 的可排序性，经常被用来实现 排行榜 这样的功能。

|命令|作用|
|:-:|-|
|zadd key score value ... |添加一个或多个元素，如果存在则更新score值|
|zrem key value|删除指定的元素|
|zscore key value|获取指定元素的 score 值|
|zrank key member|获取指定元素的排名|
|zcard key|获取元素个数|
|zcount key min max|获取 score 值在给定范围内的元素个数|
|zincrby key n value|让 集合中的元素自增，步长为n|
|zrange key min max|按照 score 排序后，获取指定排名范围内的元素|
|zrangebyscore key min max|按照 score 排序后，获取指定 score 范围内的元素|
|zdiff、zinter、zunion|求差集、交集、并集|
|注意：所有的排名默认都是升序的，如果要降序则在命令的 Z 后面添加 **rev** 即可！||

```SQL
Jack 85, Lucy 89, Rose 82, Tom 95, Jerry 78, Amy 92, Miles 76

-- 将上面的学生分数存储到 redis 的 SortedSet 中
zadd stu 85 Jack 89 Lucy 82 Rose 95 Tom 78 Jerry 92 Amy 76 Miles
-- 删除 Tom 铜须
zrem stu Tom
-- 获取 Amy 同学的分数
zscore stu Amy
-- 查询 Rose 同学的排名
zrevrank stu Rose
-- 查询80分以下有几个学生
zcount stu 0 80
-- 给 Amy 同学加2分
zincrby stu 2 Amy
-- 查出成绩前3名的同学
zrevrange stu 0 2
-- 查出成绩80分以下的所有同学
zrangebyscore stu 0 80
```



### Geospatial 类型

Redis 中 Geospatial 类型主要用于存储地理位置信息，并对存储的信息进行操作，其存储的结果是一个 score 分数。

常见的应用场景有：朋友的定位、附近的人、打车计算距离等。

|命令|作用|
|:-:|-|
|geoadd|添加地理位置的坐标|
|geopos|获取地理位置的坐标|
|geodist|计算两个位置之间的距离|
|georadius|根据指定经纬度来获取指定范围内的地理位置集合|
|georadiusbymember|根据存储在位置集合中的地点，获取指范围内的地理位置集合|
|geohash|返回位置对象的 geohash 值|

示例：

```SQL
beijing 116.41339 39.91092, xian 108.94647 34.34727, hangzhou 120.21551 30.25308, jinan 117.12640 36.65655

-- 添加 beijing xian hanghzou jinan 四个城市的地理位置
geoadd city 116.41339 39.91092 beijing 108.94647 34.34727 xian ...
-- 获取 xian 的位置坐标
geopos city xian
-- 计算 beijing 到 xian 之间的直线距离
geodist city beijing xian km
-- 获取 120 30 这个点附近 1000km 以内的城市
georadius city 120 30 1000 km
-- 获取 beijing 附近 500km 以内的城市
 georadiusbymember city beijing 500 km
-- 获取 beijing xian jinan 的 geohash 值
geohash city beijing xian jinan
```
