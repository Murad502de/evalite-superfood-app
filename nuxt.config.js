export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ruqi',
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
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
  },

  // Customize the progress-bar color
  loading: { color: 'blue' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/styles/colors.scss',
    '@/styles/style.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/auth.js', mode: 'client' },
    { src: '~/plugins/validation.js', mode: 'client' },
    { src: '~/plugins/vuetify.js', mode: 'client' },
    { src: '~/plugins/vue-infinite-scroll.js', mode: 'client', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    'nuxt-route-meta',
    'nuxt-svg-loader',
  ],

  vuetify: {
    customVariables: ['@/styles/variables.scss'],
    treeShake: true
  },

  auth: {
    redirect: {
      home: '/',
    },
  },

  router: {
    middleware: [
      'auth',
      // 'access_rights',
    ],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    baseURL: process.env.API_URL,
  },

  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
}
