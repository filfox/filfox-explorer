<template>
  <div class="container mx-auto text-xs md:text-sm">
    <TokenHeader :token="tokenInfo" />
    <TokenOverview :token="tokenInfo" />
    <TokenHolderFilter v-if="holder" class="my-4" />
    <TokenData :token="tokenInfo" class="my-4" />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params, query, error }) {
    const id = params.id
    try {
      const tokenInfo = await $axios.$get(`/token/${id}`)
      return { tokenInfo }
    } catch (err) {
      if (err?.response) {
        if (err.response.code === 404) {
          error({ code: 404, message: `Token ${id} not found` })
        } else {
          error({ code: err.response.status, message: err.response.statusText })
        }
      } else {
        error({ code: 500, message: 'Server Error' })
      }
    }
  },

  data() {
    return { tokenInfo: {} }
  },

  computed: {
    holder() {
      return this.$route.query.h
    }
  },

  head() {
    return {
      title: this.tokenInfo.symbol
    }
  }
}
</script>
