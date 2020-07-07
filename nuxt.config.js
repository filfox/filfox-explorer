import messages from './locales'
import webpack from 'webpack'

export default {
  mode: 'universal',
  components: true,
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'apple-mobile-web-app-title', content: 'filfox.io' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'theme-color', content: '#1a4fc9' },
      { name: 'application-name', content: 'filfox.io' }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '~/plugins/i18n.js',
    '@/plugins/filters',
    '@/plugins/websocket.client',
    '@/plugins/components',
    '@/plugins/chart.client'
  ],
  extendPlugins(plugins) {
    const pluginIndex = plugins.findIndex(src => src === '~/plugins/i18n.js')
    const shouldBeFirstPlugin = plugins[pluginIndex]
    plugins.splice(pluginIndex, 1)
    plugins.unshift(shouldBeFirstPlugin)
    return plugins
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/components',
    ['@nuxtjs/google-analytics', {id: process.env.GOOGLE_ANALYTICS}]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'nuxt-i18n'
  ],
  axios: {
    proxy: true,
    prefix: '/api/v0',
  },
  proxy: {
    '/api': {
      target: 'https://filfox.io/',
      changeOrigin: true
    }
  },
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
      },
      {
        code: 'zh',
        iso: 'zh-CN',
        name: '中文',
      },
    ],
    defaultLocale: 'zh',
    strategy: 'prefix',
    vueI18n: {
      fallbackLocale: 'zh',
      messages,
    },
    detectBrowserLanguage: {
      useCookie: true,
      // alwaysRedirect: true,
    },
    seo: true,
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    extractCSS: true,
    babel: {
      plugins: [
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining'
      ]
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.plugins.push(new webpack.DefinePlugin({
        'process.env.WEBSOCKET_URL': JSON.stringify(process.env.WEBSOCKET_URL),
      }))
    }
  }
}
