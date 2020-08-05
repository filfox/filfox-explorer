export const actions = {
  async nuxtServerInit({ commit }, { $axios }) {
    const { height } = await $axios.$get('/info')
    commit('blockchain/height', height)
  }
}
