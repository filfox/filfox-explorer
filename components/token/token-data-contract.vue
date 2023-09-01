<template>
  <div v-loading="loading" class="py-4">
    <Contract :contract="contract" />
  </div>
</template>

<script>
export default {
  props: {
    token: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },

  data() {
    return {
      contract: {},
      loading: false
    }
  },

  watch: {
    token() {
      this.init()
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      if (!this.token.address) return

      try {
        this.loading = true
        const { address, ethAddress } = this.token
        const contractSelf = await this.$axios.$get(`/address/${address}/contract`)

        let contractImpl = null
        if (contractSelf?.proxyImpl) {
          contractImpl = await this.$axios.$get(`/address/${contractSelf.proxyImpl}/contract`)
          contractImpl.address = contractSelf.proxyImpl
          contractImpl.ethAddress = ethAddress
          contractImpl.implAddress = contractSelf.proxyImpl
        }

        this.contract = { ...contractSelf, address, ethAddress, contractImpl }
      } catch (error) {
        this.$notify({ title: 'Error', message: error, type: 'error' })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
