// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    '@nuxtjs/i18n',
    '@nuxt/content'
  ],

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap",
        },
      ],
    },
  },

  i18n: {
    restructureDir: "",
    locales: [
      {
        code: 'it',
        file: 'it.json',
        name: 'Italiano'
      },
      {
        code: 'en',
        file: 'en.json',
        name: 'English'
      }
    ],
    defaultLocale: 'en',
    strategy: 'prefix'
  },

  compatibilityDate: '2025-04-01'
})