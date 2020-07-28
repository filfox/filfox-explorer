<template>
  <div class="container mx-auto">
    <template v-if="addressData.actor === 'fil/1/storageminer'">
      <MinerAddressDetail :address-data="addressData" class="hidden lg:block" />
      <MinerAddressDetailMobile :address-data="addressData" class="lg:hidden" />
    </template>
    <template v-else>
      <NormalAddressDetail :address-data="addressData" class="hidden lg:block" />
      <NormalAddressDetailMobile :address-data="addressData" class="lg:hidden" />
    </template>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params, query, error }) {
    const id = params.id
    try {
      const addressData = await $axios.$get(`/address/${id}`, { params: query })
      return { addressData }
    } catch (err) {
      if (err?.response) {
        if (err.response.code === 404) {
          error({ code: 404, message: `Address ${id} not found` })
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
      addressData: {}
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  head() {
    return {
      title: `${this.$t('meta.titles.address')} ${this.id}`
    }
  }
}
</script>
