<template>
  <div>
    <MinerRanks class="hidden lg:flex"
      :topMinersByPower="topMinersByPower"
      :topMinersByBlocks="topMinersByBlocks"
      :topMinersByPowerDelta="topMinersByPowerDelta"
      :pageSize="pageSize"
      :loading="loading"
      @updateTopMinersByPower="getTopMinersByPower"
      @updateTopMinersByBlocks="getTopMinersByBlocks"
      @updateTopMinersByPowerDelta="getTopMinersByPowerDelta"
    />
    <MinerRanksMobile class="lg:hidden"
      :topMinersByPower="topMinersByPower"
      :topMinersByBlocks="topMinersByBlocks"
      :topMinersByPowerDelta="topMinersByPowerDelta"
      :pageSize="pageSize"
      :loading="loading"
      @updateTopMinersByPower="getTopMinersByPower"
      @updateTopMinersByBlocks="getTopMinersByBlocks"
      @updateTopMinersByPowerDelta="getTopMinersByPowerDelta"
    />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `${this.$t('meta.titles.ranks')}`
    }
  },
  data() {
    return {
      topMinersByPower: {},
      topMinersByBlocks: {},
      topMinersByPowerDelta: {},
      loading: false,
      pageSize: 20,
    }
  },
  methods: {
    async getTopMinersByPower(pageSize, page) {
      this.loading = true
      this.topMinersByPower = {}
      this.topMinersByPower = await this.$axios.$get("/miner/list/power", {params: {pageSize, page}})
      this.loading = false
    },
    async getTopMinersByBlocks(pageSize, page, duration) {
      this.loading = true
      this.topMinersByBlocks = {}
      this.topMinersByBlocks = await this.$axios.$get("/miner/list/blocks", {params: {pageSize, page, duration}})
      this.loading = false
    },
    async getTopMinersByPowerDelta(pageSize, page, duration) {
      this.loading = true
      this.topMinersByPowerDelta = {}
      this.topMinersByPowerDelta = await this.$axios.$get("/miner/list/power-delta", {params: {pageSize, page, duration}})
      this.loading = false
    }
  }
}
</script>
