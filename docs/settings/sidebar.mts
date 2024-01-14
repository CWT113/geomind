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
  // .NET
  "/net/": [
    {
      text: "ORM",
      collapsed: false,
      items: [{ text: "EFCore", link: "/net/orm/EFCore.md" }]
    }
  ]
};
