export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  target: 'static',
  head: {
    title: 'Tech Times CMS',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // change default port to 8000
  server: {
    port: 8000
  },

  axios: {
   baseURL: 'https://api.sitechtimes.com/'
   //  baseURL: 'http://localhost:3000/dev/'
  },

  auth: {
    strategies: {
      local: {
        autoFetchUser: false,
        endpoints: {
          login: { url: '/auth/signin', method: 'post', propertyName: 'token' },
          user: false,
          logout: false,
        },

        tokenType: '',
      },
    },
    redirect: {
      login: false,
      logout: '/auth/signin',
      home: false,
    }
  },

  generate: {
    fallback: true
  }
}
