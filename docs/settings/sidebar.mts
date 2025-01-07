/**
 * 侧边栏配置
 */
export const sidebar = {
  "/frontend/css/": [
    {
      text: "CSS",
      items: [{ text: "CSS", link: "/frontend/css/css.md" }]
    }
  ],

  "/frontend/javascript/": [
    {
      text: "Javascript",
      items: [
        { text: "经验记录", link: "/frontend/javascript/Javascript.md" },
        { text: "Lodash", link: "/frontend/javascript/lodash.md" },
        { text: "数组", link: "/frontend/javascript/数组.md" },
        { text: "垃圾回收机制", link: "/frontend/javascript/垃圾回收机制.md" },
        { text: "WeakMap和Map", link: "/frontend/javascript/WeakMap和Map.md" },
        { text: "WeakSet和Set", link: "/frontend/javascript/WeakSet和Set.md" },
        {
          text: "ResizeObserver",
          link: "/frontend/javascript/ResizeObserver.md"
        }
      ]
    },
    {
      text: "第三方库",
      items: [{ text: "Lodash", link: "/frontend/javascript/lodash.md" }]
    }
  ],

  "/frontend/git/": [
    {
      text: "Git Flow",
      items: [{ text: "分支简介", link: "/frontend/git/分支分类.md" }]
    },
    {
      text: "Git 代理",
      items: [{ text: "Git代理", link: "/frontend/git/Git代理.md" }]
    }
  ],

  "/frontend/node/": [
    {
      text: "工具",
      items: [
        { text: "包管理器", link: "/frontend/node/包管理器.md" },
        { text: "Monorepo", link: "/frontend/node/Monorepo.md" }
      ]
    },
    {
      text: "其他",
      items: [{ text: "NVM的使用", link: "/frontend/node/nvm.md" }]
    }
  ],

  "/frontend/other/": [
    { text: "Postman", link: "/frontend/other/Postman全局配置token.md" },
    { text: "Typora", link: "/frontend/other/Typora.md" }
  ],

  "/frontend/typescript/": [
    { text: "TypeScript", link: "/frontend/typescript/TypeScript.md" },
    {
      text: "TypeScript技巧",
      link: "/frontend/typescript/TypeScript技巧.md"
    }
  ],

  "/frontend/vue/": [
    {
      text: "Vue3",
      items: [
        { text: "基本使用", link: "/frontend/vue/vue3.md" },
        { text: "h 函数", link: "/frontend/vue/h渲染函数.md" },
        { text: "jsx 语法", link: "/frontend/vue/JSX语法.md" },
        { text: "ref 全家桶", link: "/frontend/vue/ref函数.md" },
        { text: "路由传参", link: "/frontend/vue/路由传参.md" }
      ]
    },
    {
      text: "Pinia",
      items: [
        { text: "基本使用", link: "/frontend/vue/pinia/基础使用.md" },
        {
          text: "persistedstate",
          link: "/frontend/vue/pinia/persistedstate.md"
        },
        {
          text: "useLocalStorage",
          link: "/frontend/vue/pinia/useLocalStorage.md"
        }
      ]
    },
    {
      text: "第三方库",
      items: [
        { text: "Ant-Design-Vue", link: "" },
        { text: "dayjs", link: "/frontend/vue/vue-utils/dayjs.md" },
        { text: "ECharts", link: "/frontend/vue/vue-utils/ECharts.md" },
        { text: "alasql", link: "/frontend/vue/vue-utils/alasql.md" },
        { text: "LZ-String", link: "/frontend/vue/vue-utils/LZ-String.md" },
        { text: "Pubsub-JS", link: "/frontend/vue/vue-utils/Pubsub-JS.md" },
        { text: "Websocket", link: "/frontend/vue/vue-utils/WebSocket.md" },
        { text: "localForAge", link: "/frontend/vue/vue-utils/localForAge.md" },
        { text: "文字转语音", link: "/frontend/vue/vue-utils/文字转语音.md" },
        {
          text: "西瓜视频播放器",
          link: "/frontend/vue/vue-utils/西瓜视频播放器.md"
        },
        {
          text: "vue-esign手写签字",
          link: "/frontend/vue/vue-utils/vue-esign手写签字.md"
        }
      ]
    }
  ],

  "/database/mysql/": [
    {
      text: "MySQL基础",
      items: [
        { text: "基本SQL语句", link: "/database/mysql/基本SQL语句.md" },
        {
          text: "函数/约束/多表查询/事务",
          link: "/database/mysql/函数约束多表查询事务.md"
        },
        {
          text: "存储引擎/InnoDB引擎",
          link: "/database/mysql/存储引擎InnoDB引擎.md"
        },
        { text: "索引/SQL优化", link: "/database/mysql/索引SQL优化.md" },
        { text: "视图/存储过程", link: "/database/mysql/视图存储过程.md" },
        { text: "锁", link: "/database/mysql/锁.md" }
      ]
    },
    { text: "MySQL进阶", items: [] }
  ],

  "/database/postgres/": [
    {
      text: "PostgreSQL基础",
      items: [
        { text: "基本使用", link: "/database/postgres/基本使用.md" },
        { text: "分区表", link: "/database/postgres/分区表.md" },
        { text: "TimescaleDB", link: "/database/postgres/TimescaleDB.md" }
      ]
    },
    { text: "PostgreSQL进阶", items: [] }
  ],

  "/database/sqlite/": [
    {
      text: "SQLite基础",
      items: [{ text: "基本使用", link: "/database/postgres/SQLite.md" }]
    },
    { text: "SQLite进阶", items: [] }
  ]
};
