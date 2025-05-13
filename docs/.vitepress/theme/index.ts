// https://vitepress.dev/guide/custom-theme

// @ts-nocheck
import ThemeSwich from "./components/ThemeSwich.vue" // 这个组件需要写在最前面

import "./style.css"
import "./rainbow.css"
import { h } from "vue"
import "./overrides.css"
import "./customContainer.css"
import "element-plus/dist/index.css"
import type { Theme } from "vitepress"
import { ElBacktop } from "element-plus"
import DefaultTheme from "vitepress/theme"
import BackTop from "../theme/components/BackTop.vue"

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(ThemeSwich, null, {})
  },
  enhanceApp({ app, router, siteData }) {
    app.provide("success", "SUCCESS")
    // 回到顶部按钮
    app.component("BackTop", BackTop)
    app.component(ElBacktop.name, ElBacktop)
  }
} satisfies Theme
