import { defineConfig } from "vitepress"
import { nav } from "../settings/nav.mts"
import { sidebar } from "../settings/sidebar.mts"
import { socialLink } from "../settings/socialLinks.mts"
import { search } from "../settings/search.mts"
import { footer } from "../settings/search.mts"

export default defineConfig({
  title: "Butterfly",
  description: "Salvation lies within.",
  base: "/Alikaid/",
  head: [["link", { rel: "icon", href: "/Alikaid/butterfly-logo.png" }]],
  lastUpdated: true,
  ignoreDeadLinks: true,
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
  }
})
