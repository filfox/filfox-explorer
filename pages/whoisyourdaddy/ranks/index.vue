<template>
  <div>
    <MinerRanks
      class="hidden lg:block"
      :top-miners-by-power="topMinersByPower"
      :top-miners-by-blocks="topMinersByBlocks"
      :top-miners-by-power-delta="topMinersByPowerDelta"
      :page-size="pageSize"
      :loading="loading"
      @updateTopMinersByPower="getTopMinersByPower"
      @updateTopMinersByBlocks="getTopMinersByBlocks"
      @updateTopMinersByPowerDelta="getTopMinersByPowerDelta"
    />
    <MinerRanksMobile
      class="lg:hidden"
      :top-miners-by-power="topMinersByPower"
      :top-miners-by-blocks="topMinersByBlocks"
      :top-miners-by-power-delta="topMinersByPowerDelta"
      :page-size="pageSize"
      :loading="loading"
      @updateTopMinersByPower="getTopMinersByPower"
      @updateTopMinersByBlocks="getTopMinersByBlocks"
      @updateTopMinersByPowerDelta="getTopMinersByPowerDelta"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      topMinersByPower: {},
      topMinersByBlocks: {},
      topMinersByPowerDelta: {},
      loading: false,
      pageSize: 20
    }
  },
  mounted() {
    this.getTopMinersByPower(this.pageSize, 0)
  },
  methods: {
    async getTopMinersByPower(pageSize, page) {
      this.loading = true
      this.topMinersByPower = await this.$axios.$get('/miner/list/power', { params: { pageSize, page } })
      this.loading = false
    },
    async getTopMinersByBlocks(pageSize, page, duration) {
      this.loading = true
      this.topMinersByBlocks = await this.$axios.$get('/miner/list/blocks', { params: { pageSize, page, duration } })
      this.loading = false
    },
    async getTopMinersByPowerDelta(pageSize, page, duration) {
      this.loading = true
      this.topMinersByPowerDelta = await this.$axios.$get('/miner/list/power-delta', { params: { pageSize, page, duration } })
      this.loading = false
    }
  },
  head() {
    return {
      title: `${this.$t('meta.titles.ranks')}`
    }
  }
}
</script>
