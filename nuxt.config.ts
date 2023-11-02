// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Anime World",
      meta: [
        {
          name: "description",
          content: "Anime World with Jikan - Unofficial MyAnimeList API.",
        },
        {
          name: "keywords",
          content:
            "HTML, CSS, JavaScript, TypeScript, Vue.js, Nuxt.js, Tailwind CSS, Developer, Anime",
        },
        {
          name: "author",
          content: "Caio Costa",
        },
      ],
    },
  },
  build: {
    transpile: [
      "@fortawesome/vue-fontawesome",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
    ],
  },
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
});
