import webpack from 'webpack'
import MomentLocalePlugin from 'moment-locales-webpack-plugin'
import messages from './locales'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head() {
    return {
      title: process.env.npm_package_name || '',
      titleTemplate: `%s - ${this.$t('meta.titles.filfox')}`,
      htmlAttrs: { lang: this.$i18n.locale },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
        { name: 'keywords', content: '飞狐浏览器, Filfox, 飞狐区块浏览器, Filecoin, Filecoin Explorer, Filecoin 浏览器, FIL, IPFS, 6Block, 石榴矿池' },
        { name: 'description', content: this.$t('meta.description.default') },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: this.$t('meta.titles.filfox') },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'theme-color', content: '#1a4fc9' },
        { name: 'application-name', content: this.$t('meta.titles.filfox') }
      ],
      link: [
        { rel: 'manifest', href: '/dist/manifest.210c225a.json' },
        { rel: 'icon', href: '/dist/icons/icon_64x64.5eb771.png' },
        { rel: 'apple-touch-icon', href: '/dist/icons/icon_512x512.5eb771.png', sizes: '512x512' }
      ]
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/common.css',
    'vue-json-pretty/lib/styles.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/i18n.js',
    '@/plugins/axios',
    '@/plugins/filters',
    '@/plugins/websocket.client',
    '@/plugins/components',
    '@/plugins/vue-json-pretty'
  ],
  components: [
    '~/components/address',
    '~/components/block',
    '~/components/charts',
    '~/components/deal-list',
    '~/components/home',
    '~/components/markdown',
    '~/components/merchant',
    '~/components/message',
    '~/components/miner',
    '~/components/partner',
    '~/components/rich-list',
    '~/components/shared',
    '~/components/social',
    '~/components/tag',
    '~/components/utils',
    '~/components/transfer',
    '~/components/fns',
    '~/components/contract',
    '~/components/stats',
    '~/components/dapp-list',
    '~/components/token'
  ],
  extendPlugins(plugins) {
    const pluginIndex = plugins.findIndex(src => src === '@/plugins/i18n.js')
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
    '@nuxtjs/eslint-module',
    ...process.env.NODE_ENV === 'production' ? [
      ['@nuxtjs/google-analytics', { id: process.env.GOOGLE_ANALYTICS }],
      '@nuxtjs/pwa'
    ] : []
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    'nuxt-i18n'
  ],
  axios: {
    baseURL: 'https://filfox.info/api/v1'
  },
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English'
      },
      {
        code: 'zh',
        iso: 'zh-CN',
        name: '中文'
      },
      {
        code: 'ko',
        iso: 'ko_KR',
        name: '한국어'
      }
    ],
    defaultLocale: 'en',
    strategy: 'prefix',
    vueI18n: {
      fallbackLocale: 'en',
      messages
    },
    detectBrowserLanguage: {
      useCookie: true
      // alwaysRedirect: true,
    },
    seo: true
  },
  pwa: {
    meta: false,
    manifest: {
      name: 'Filfox',
      short_name: 'Filfox',
      theme_color: '#1a4fc9'
    },
    workbox: {
      assetsURLPattern: '/dist/',
      publicPath: '/dist/'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    ...process.env.NODE_ENV === 'production' ? {
      publicPath: '/dist/',
      extractCSS: true
    } : {},
    babel: {
      plugins: [
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining'
      ]
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, { loaders: { vue } }) {
      vue.compilerOptions = { whitespace: 'condense' }
      config.module.rules.push({
        enforce: 'pre',
        test: /\.md$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      })
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.WEBSOCKET_URL': JSON.stringify(process.env.WEBSOCKET_URL)
        }),
        new MomentLocalePlugin({
          localesToKeep: ['zh-cn', 'ko']
        })
      )
    }
  }
}
