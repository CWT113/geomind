/**
 * 侧边栏配置
 */
export const sidebar = {
  // 前端
  "/fontend/": [
    {
      text: "TypeScript",
      link: "/fontend/typescript/TypeScript.md"
    },
    {
      text: "Vue",
      collapsed: false,
      items: [
        { text: "Markdown Examples", link: "/markdown-examples" },
        { text: "Runtime API Examples", link: "/api-examples" }
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
  // .NET
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
    }
  ]
};
