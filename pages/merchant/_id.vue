<template>
  <div class="container mx-auto">
    <MerchantDetail :merchant="merchantInfo" :name="id" />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params, query, error }) {
    const id = params.id
    try {
      const merchantInfo = await $axios.$get(`/merchant/${id}`)
      return { merchantInfo }
    } catch (err) {
      if (err?.response) {
        if (err.response.code === 404) {
          error({ code: 404, message: `Merchant ${id} not found` })
        } else {
          error({
            code: err.response.status,
            message: err.response.statusText
          })
        }
      } else {
        error({ code: 500, message: err.toString() })
      }
    }
  },
  data() {
    return {
      merchantInfo: {}
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  head() {
    return {
      title: `${this.merchantInfo.name}`
    }
  }
}
</script>
