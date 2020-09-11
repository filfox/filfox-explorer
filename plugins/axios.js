export default function({ $axios, app }) {
  $axios.interceptors.request.use(config => {
    config.headers.Locale = app.i18n.locale
    return config
  })
}
