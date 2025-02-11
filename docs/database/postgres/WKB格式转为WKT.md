# 解决geometry类型查询后，默认转为WKB格式

>场景：如有一张表 geo_vec_line，其中 geom 字段类型为 geometry，存储的数据类型为 WKT 格式，当查询或导出数据时，会默认压缩为 WKB 格式，如何就查询或导出时为 WKT 格式呢？



建表语句：

```sql
CREATE TABLE "public"."geo_vec_line" (
  "id" int4 NOT NULL,
  "geom" geometry (LINESTRING, 4326),
  "icao" varchar (10) COLLATE "pg_catalog"."default",
  "name" varchar (10) COLLATE "pg_catalog"."default",
CONSTRAINT "geo_vec_line_pkey_id" PRIMARY KEY ("id"));
```

插入数据：

```sql
INSERT INTO geo_vec_line (id, geom, icao, name)
VALUES
  (1, ST_GeomFromText('LINESTRING(114.202441190131 30.7738584109707, 114.202419630135 30.7730398098256)', 4326), 'ZHHH', '215'),
  (2, ST_GeomFromText('LINESTRING(114.206468707157 30.7776821093382, 114.206993559136 30.7772668807657)', 4326), 'ZHHH', '216'),
  (3, ST_GeomFromText('LINESTRING(114.206777020324 30.7779781927482, 114.207306227741 30.7775571241144)', 4326), 'ZHHH', '217'),
  (4, ST_GeomFromText('LINESTRING(114.212786783421 30.7791575173818, 114.211963143221 30.7783478401895)', 4326), 'ZHHH', '218'),
  (5, ST_GeomFromText('LINESTRING(114.215645763045 30.7769845950588, 114.214832413617 30.7761604876998)', 4326), 'ZHHH', '219');
```



默认查询时，查询结果中 geometry类型会以 WKB 的形式展示：

```sql
SELECT * from geo_vec_line;

-- 查询结果中geom字段值为 0102000020E61000000200000076BEE4CBF48C5C408BDAB6951BC63E40E3DF7671F48C5C40FFB4DDEFE5C53E40
```

```sql
SELECT id, ST_AsText(geom) as geom, icao, name FROM geo_vec_line;

-- 查询结果中geom字段值为 LINESTRING(114.202441190131 30.7738584109707,114.202419630135 30.7730398098256)
```

```sql
-- 显示SRID
SELECT id, ST_AsEWKT(geom) as geom, icao, name FROM geo_vec_line;

-- 查询结果中geom字段值为 SRID=4326;LINESTRING(114.202441190131 30.7738584109707,114.202419630135 30.7730398098256)
```

