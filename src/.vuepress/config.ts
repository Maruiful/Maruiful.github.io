import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "The blog of Maruiful",
      description: "The blog of Maruiful",
      head: [
        ["link", { rel: "icon", href: "/myLgo.svg" }],
      ]
    },
    "/zh/": {
      lang: "zh-CN",
      title: "The blog of Maruiful",
      description: "Maruiful的博客",
      head: [
        ["link", { rel: "icon", href: "/myLgo.svg" }],
      ]
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
