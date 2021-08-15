export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  dev: process.env.NODE_ENV !== 'production',
  dir: {
    pages: 'views'
  },

  router: {
    trailingSlash: true,
    middleware: [
      'header-color'
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/detect-click-outside',
    '~/plugins/filters',
    '~/plugins/initialize-axios-interceptors',
    '~/plugins/dispatch-action-for-all-modules',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: '~/components/'},
    { path: '~/components/_globals/', prefix: 'base'}
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/svg'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/axios', // https://go.nuxtjs.dev/axios
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:8000/api/' : 'https://api.flis.no/api/',
    timeout: 30000,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Robots: https://github.com/nuxt-community/robots-module#readme
  robots: [
    {
      UserAgent: 'Googlebot',
      Disallow: () => '/admin'
    },
    {
      UserAgent: 'Bingbot',
      Disallow: () => '/admin'
    }
  ],

  // Sitemap: https://github.com/nuxt-community/sitemap-module#readme
  // sitemap: [

  // ]
}
