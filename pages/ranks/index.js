export default {
  render(createElement) {
    return createElement('div')
  },
  middleware({ redirect, route }) {
    redirect(`${route.path}/power`)
  }
}
