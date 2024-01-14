import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Alikaid",
  description: "A VitePress Site",
  base: "/Alikaid/",
  head: [["link", { rel: "icon", href: "/Alikaid/logo.png" }]],
  themeConfig: {
    logo: "/logo.png",

    outlineTitle: "目录",
    outline: [2, 6],
    // sidebar: false,
    // aside: "left",

    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" }
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" }
        ]
      }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" }
    ],

    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档"
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清楚查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换"
            }
          }
        }
      }
    },

    footer: {
      copyright: "Copyright © 2024 Albert Su Starter"
    }
  }
});
