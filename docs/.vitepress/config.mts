import { defineConfig } from "vitepress";
import { nav } from "../settings/nav.mts";
import { footer } from "../settings/search.mts";
import { search } from "../settings/search.mts";
import { sidebar } from "../settings/sidebar.mts";
import { socialLink } from "../settings/socialLinks.mts";

export default defineConfig({
  title: "Geomind",
  description: "Salvation lies within.",
  base: "/geomind/",
  head: [["link", { rel: "icon", href: "/geomind/butterfly-logo.png" }]],
  lastUpdated: true,
  ignoreDeadLinks: true,
  lang: "zh-CN",
  markdown: {
    theme: {
      light: "github-light",
      dark: "one-dark-pro",
    },
    image: {
      lazyLoading: true,
    },
    lineNumbers: true,
    config: async (md) => {
      const markdownItContainer = (await import("markdown-it-container"))
        .default;
      md.use(markdownItContainer, "success", {
        render(tokens, idx) {
          const token = tokens[idx];
          const info = token.info.trim().slice("success".length).trim(); // 获取 :::success 后面的内容

          if (token.nesting === 1) {
            const title = info || "SUCCESS";
            return `<div class="custom-block success"><p class="custom-block-title">${title}</p>\n`;
          } else {
            return `</div>\n`;
          }
        },
      });
    },
  },

  themeConfig: {
    logo: "/badminton-logo.png",
    outlineTitle: "目录",
    outline: [2, 6],
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    returnToTopLabel: "返回顶部",

    nav: nav,

    sidebar: sidebar,

    socialLinks: socialLink as any,

    search: search as any,

    footer: footer,

    editLink: {
      pattern: "https://github.com",
      text: "Edit this page on GitHub",
    },
  },

  vite: {
    optimizeDeps: {
      exclude: [
        "@nolebase/vitepress-plugin-enhanced-readabilities/client",
        "vitepress",
      ],
    },
    ssr: {
      noExternal: [
        // 如果还有别的依赖需要添加的话，并排填写和配置到这里即可
        "@nolebase/vitepress-plugin-enhanced-readabilities",
      ],
    },
  },
});
