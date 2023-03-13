<template>
  <div></div>
</template>

<script>
export default {
  layout: 'abi',
  async mounted() {
    const address = this.$route.query.address
    const format = this.$route.query.format
    if (!address) return
    const contract = await this.$axios.$get(`/address/${address}/contract`)
    const abi = format === 'json' ? contract?.abi.replace(/"/ig, '\\"') : contract?.abi
    document.write(abi)
  },
  head() {
    return {
      title: this.$t('contract.guide.title.0')
    }
  }
}
</script>
