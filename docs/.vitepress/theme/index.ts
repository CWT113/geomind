// https://vitepress.dev/guide/custom-theme

// @ts-nocheck
import { h } from "vue";
import ThemeSwich from "./components/ThemeSwich.vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import "./rainbow.css";
import "./overrides.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(ThemeSwich, null, {});
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme;
