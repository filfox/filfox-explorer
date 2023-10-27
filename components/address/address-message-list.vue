<template>
  <div>
    <div v-if="loading" v-loading="loading" class="h-32"></div>
    <template v-else>
      <div v-if="pendingsCount > 0" class="border-t-2 border-background mt-3 px-4 pt-5 pb-6">
        <AddressMessageListPending :address="address" />
        <AddressMessageListSuccess :address="address" />
      </div>
      <AddressMessageListNormal v-else :address="address" />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    address: { type: String, required: true }
  },

  data() {
    return {
      loading: true,
      pendingsCount: 0
    }
  },

  mounted() {
    this.getPendingsCount()
  },

  methods: {
    async getPendingsCount() {
      this.loading = true
      const { totalCount } = await this.$axios.$get(`/address/${this.address}/pending-messages`)
      this.loading = false
      this.pendingsCount = totalCount
    }
  }
}
</script>
