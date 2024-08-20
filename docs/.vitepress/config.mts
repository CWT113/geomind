import { defineConfig } from "vitepress";
import { nav } from "../settings/nav.mts";
import { sidebar } from "../settings/sidebar.mts";
import { socialLink } from "../settings/socialLinks.mts";
import { search } from "../settings/search.mts";
import { footer } from "../settings/search.mts";

export default defineConfig({
  title: "Butterfly",
  description: "Salvation lies within.",
  base: "/Alikaid/",
  head: [["link", { rel: "icon", href: "/Alikaid/butterfly-logo.png" }]],
  lastUpdated: true,
  ignoreDeadLinks: true,
  lang: "zh-CN",
  markdown: {
    theme: {
      light: "github-light",
      dark: "vitesse-dark"
    },
    image: {
      lazyLoading: true
    },
    lineNumbers: true
  },

  themeConfig: {
    logo: "/badminton-logo.png",
    outlineTitle: "目录",
    outline: [2, 6],
    docFooter: {
      prev: "上一篇",
      next: "下一篇"
    },
    returnToTopLabel: "返回顶部",

    nav: nav,

    sidebar: sidebar,

    socialLinks: socialLink as any,

    search: search as any,

    footer: footer,

    editLink: {
      pattern: "https://github.com",
      text: "Edit this page on GitHub"
    }
  },

  vite: {
    optimizeDeps: {
      exclude: [
        "@nolebase/vitepress-plugin-enhanced-readabilities/client",
        "vitepress"
      ]
    },
    ssr: {
      noExternal: [
        // 如果还有别的依赖需要添加的话，并排填写和配置到这里即可
        "@nolebase/vitepress-plugin-enhanced-readabilities"
      ]
    }
  }
});
