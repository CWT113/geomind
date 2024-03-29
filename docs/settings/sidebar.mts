/**
 * 侧边栏配置
 */
export const sidebar = {
  // 前端
  "/fontend/": [
    {
      text: "TypeScript",
      collapsed: false,
      items: [
        {
          text: "TypeScript基础",
          link: "/fontend/typescript/TypeScript.md"
        },
        {
          text: "TypeScript技巧",
          link: "/fontend/typescript/TypeScript技巧.md"
        }
      ]
    },
    {
      text: "Javascript",
      collapsed: false,
      items: [
        {
          text: "JS常用方法",
          link: "/fontend/javascript/Javascript.md"
        }
      ]
    },
    {
      text: "Vue",
      collapsed: false,
      items: [
        { text: "vue3", link: "/fontend/vue3/vue3.md" }
        // { text: "Runtime API Examples", link: "/api-examples" }
      ]
    },
    {
      text: "Node.js",
      collapsed: false,
      items: [
        { text: "包管理工具", link: "/fontend/node/包管理工具.md" },
        {
          text: "postman配置token",
          link: "/fontend/node/Postman全局配置token.md"
        }
      ]
    },
    {
      text: "工具集",
      collapsed: false,
      items: [
        { text: "alasql", link: "/fontend/utils/alasql.md" },
        { text: "LZ-String", link: "/fontend/utils/LZ-String.md" },
        { text: "Pubsub-JS", link: "/fontend/utils/Pubsub-JS.md" },
        { text: "Websocket", link: "/fontend/utils/WebSocket.md" },
        { text: "文字转语音", link: "/fontend/utils/文字转语音.md" }
      ]
    }
  ],
  // C#
  "/csharp/": [
    {
      text: "C#",
      collapsed: false,
      items: [
        { text: "面向过程", link: "/csharp/basicCsharp/面向过程.md" },
        { text: "面向对象", link: "/csharp/basicCsharp/面向对象.md" },
        { text: "面向对象高级", link: "/csharp/basicCsharp/面向对象高级.md" }
      ]
    },
    {
      text: "C#技巧",
      collapsed: false,
      items: [
        { text: "雪花Id", link: "/csharp/skillCsharp/雪花ID.md" },
        { text: "字典", link: "/csharp/skillCsharp/字典的CURD.md" },
        { text: "元组", link: "/csharp/skillCsharp/元组.md" },
        { text: "模式匹配", link: "/csharp/skillCsharp/模式匹配.md" },
        {
          text: "检查null语法糖",
          link: "/csharp/skillCsharp/检查null语法糖.md"
        },
        {
          text: "序列化与反序列化",
          link: "/csharp/skillCsharp/序列化与反序列化.md"
        }
      ]
    }
  ],
  // sql
  "/sql/": [
    {
      text: "MySQL",
      collapsed: false,
      items: [
        { text: "基本SQL语句", link: "/sql/mysql/基本SQL语句.md" },
        {
          text: "函数/约束/多表查询/事务",
          link: "/sql/mysql/函数约束多表查询事务.md"
        },
        {
          text: "存储引擎/InnoDB引擎",
          link: "/sql/mysql/存储引擎InnoDB引擎.md"
        },
        { text: "索引/SQL优化", link: "/sql/mysql/索引SQL优化.md" },
        { text: "视图/存储过程", link: "/sql/mysql/视图存储过程.md" },
        { text: "锁", link: "/sql/mysql/锁.md" }
      ]
    },
    {
      text: "SQLite",
      collapsed: false,
      items: [{ text: "SQLite", link: "/sql/sqlite/SQLite.md" }]
    },
    {
      text: "Postgresql",
      collapsed: false,
      items: [{ text: "权限与表分区", link: "/sql/postgres/权限与表分区.md" }]
    }
  ],
  // .NET微服务
  "/net/": [
    {
      text: "ORM",
      collapsed: false,
      items: [{ text: "EFCore", link: "/net/orm/EFCore.md" }]
    },
    {
      text: "任务调度",
      collapsed: false,
      items: [{ text: "QuartZ", link: "/net/scheduling/QuartZ.md" }]
    },
    {
      text: "Redis",
      collapsed: false,
      items: [{ text: "CSRedis", link: "/net/redis/CSRedis.md" }]
    }
  ],
  // gis
  "/gis/": [
    {
      text: "Mapbox",
      collapsed: false,
      items: [
        { text: "快速入门", link: "/gis/mapbox/01-快速入门.md" },
        { text: "Style 样式", link: "/gis/mapbox/02-Style样式.md" },
        { text: "Map 方法", link: "/gis/mapbox/03-Map方法.md" },
        { text: "Map 事件", link: "/gis/mapbox/04-Map事件.md" },
        { text: "表达式", link: "/gis/mapbox/05-表达式.md" },
        { text: "练习案例", link: "/gis/mapbox/06-练习案例.md" }
      ]
    },
    {
      text: "Maplibre",
      items: [{ text: "快速入门", link: "/gis/maplibre/01-maplibre.md" }]
    },
    {
      text: "Mapbox插件",
      items: [{ text: "MapboxDraw", link: "/gis/mapbox/MapboxDraw.md" }]
    },
    {
      text: "其他",
      items: [{ text: "瓦片地图url", link: "/gis/mapbox/瓦片地图url.md" }]
    }
  ]
};
