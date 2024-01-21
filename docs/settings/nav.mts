/**
 * 顶部导航条相关
 */
export const nav = [
  { text: "首页", link: "/" },

  {
    text: "前端",
    link: "/fontend/typescript/TypeScript.md"
  },

  {
    text: "C#",
    link: "/csharp/basicCsharp/面向过程.md"
  },

  {
    text: ".NET微服务",
    items: [
      { text: "ORM", link: "/net/orm/EFCore.md" },
      { text: "任务调度", link: "/net/scheduling/QuartZ.md" }
    ]
  },

  {
    text: "GIS",
    items: [
      { text: "Markdown Examples", link: "/markdown-examples" },
      { text: "Runtime API Examples", link: "/api-examples" }
    ]
  },

  {
    text: "随笔",
    items: [
      { text: "青岛看海之旅", link: "/essays/QingDao.md" },
      { text: "杭州水乡印象", link: "/essays/HangZhou.md" }
    ]
  },

  {
    text: "相关链接",
    items: [
      { text: "Markdown Examples", link: "/markdown-examples" },
      { text: "Runtime API Examples", link: "/api-examples" }
    ]
  }
];
