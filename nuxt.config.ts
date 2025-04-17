import { locales } from "./config/locales";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", '@nuxtjs/i18n', "@nuxtjs/robots", "@nuxtjs/sitemap", '@nuxt/content'],

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

  site: {
    url: 'https://trulliheritage.com',
    name: 'Trulli Heritage'
  },

  robots: {
    allow: '/',
    disallow: [
      '/admin',
      '/temp',
      '/*.json',
      '/*.xml'
    ],

    // TODO
    sitemap: [
      '/sitemap.xml',
    ]
  },

  runtimeConfig: {
    mailgun: {
      apiKey: process.env.MAILGUN_SANDBOX_SENDING_KEY,
      domain: process.env.MAILGUN_DOMAIN
    },
    public: {
    }
  },

  i18n: {
    restructureDir: "",
    locales,
    defaultLocale: 'en',
    strategy: 'prefix',
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  compatibilityDate: '2025-04-01'
})