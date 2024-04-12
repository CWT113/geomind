import { defineConfig } from "vitepress";
import { nav } from "../settings/nav.mts";
import { sidebar } from "../settings/sidebar.mts";
import { socialLink } from "../settings/socialLinks.mts";
import { search } from "../settings/search.mts";

export default defineConfig({
  title: "Alkaid",
  description: "A VitePress Site",
  base: "/Alikaid/",
  head: [["link", { rel: "icon", href: "/Alikaid/logo.png" }]],
  lastUpdated: true,
  markdown: {
    image: {
      lazyLoading: true
    }
  },

  themeConfig: {
    logo: "/logo.png",
    outlineTitle: "目录",
    outline: [2, 6],
    docFooter: {
      prev: "上一篇",
      next: "下一篇"
    },

    nav: nav,

    sidebar: sidebar,

    socialLinks: socialLink as any,

    search: search as any
  }
});
