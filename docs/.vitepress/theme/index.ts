// https://vitepress.dev/guide/custom-theme
import { h } from "vue"
import Layout from "./Layout.vue"
import type { Theme } from "vitepress"
import DefaultTheme from "vitepress/theme"
import "./style.css"
import "./rainbow.css"
import "./overrides.css"

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })

    // return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
