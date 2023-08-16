<template>
  <div v-loading="loading" class="pt-1">
    <ContractCode :contract="contract" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      contract: {},
      loading: false
    }
  },

  computed: {
    address() {
      return this.$route.params.id
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      try {
        this.loading = true
        const data = await this.$axios.$get(`/address/${this.address}/contract`)
        this.contract = { ...data, address: this.address }
      } catch (error) {
        this.$message.error(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
