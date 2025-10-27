import { defineConfig } from "vitepress";
import llmstxt from "vitepress-plugin-llms";
import { teekConfig } from "./teekConfig";
import { nav } from "./setting/nav";
import { search } from "./setting/search";
import { sidebar } from "./setting/sidebar";
import { socialLinks } from "./setting/socialLinks";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/geomind/",
  extends: teekConfig,
  title: "Geomind",
  description: "基于 vitepress-theme-teek 搭建的个人博客",
  cleanUrls: true,
  lastUpdated: true,
  lang: "zh-CN",
  head: [
    ["link", { rel: "icon", type: "image/png", href: "/badminton-logo.png" }],
  ],
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  // sitemap: {
  //   hostname: "https://vp.teek.top",
  //   transformItems: (items) => {
  //     const permalinkItemBak: typeof items = [];
  //     // 使用永久链接生成 sitemap
  //     const permalinks = (globalThis as any).VITEPRESS_CONFIG.site.themeConfig
  //         .permalinks;
  //     items.forEach((item) => {
  //       const permalink = permalinks?.map[item.url];
  //       if (permalink)
  //         permalinkItemBak.push({ url: permalink, lastmod: item.lastmod });
  //     });
  //     return [...items, ...permalinkItemBak];
  //   },
  // },
  themeConfig: {
    logo: "/badminton-logo.png",
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdated: {
      text: "上次更新时间",
    },
    outline: {
      level: [2, 4],
      label: "本页导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    nav: nav as any,
    sidebar: sidebar as any,
    socialLinks: socialLinks as any,
    search: search,
  },
  vite: {
    plugins: [llmstxt() as any],
  },
});
