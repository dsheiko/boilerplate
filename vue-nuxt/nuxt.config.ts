export default defineNuxtConfig( {
  devtools: { enabled: true },

  typescript: { strict: true },

  css: [ "ant-design-vue/dist/reset.css", "~/assets/styles/main.scss" ],

  routeRules: {
    "/": { redirect: "/projects" },
  },

  app: {
    head: {
      title: "Projects",
      meta: [
        { name: "description", content: "Demo app built with Nuxt 3, Ant Design Vue v4, and Vue Query v5." },
      ],
    },
  },

  compatibilityDate: "2025-06-12",

  nitro: {
    esbuild: {
      options: {
        target: "es2022",
      },
    },
  },
} );
