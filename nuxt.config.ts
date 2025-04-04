import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxt/icon'],

  icon: {
    clientBundle: {
      scan: true,
    },
  },

  runtimeConfig: {
    public: {
      backend: 'http://localhost:3000/',
    },
  },

  devServer: {
    port: 8000,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
})
