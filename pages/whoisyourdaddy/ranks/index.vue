<template>
  <div class="bg-socialBg">
    <div class="relative flex items-end h-64">
      <img src="~/assets/img/social/ranks-header.png" class="absolute w-full">
      <span class="text-white text-sm mx-auto text-center mb-5">
        Filfox.info 更新于 {{ topMinersByPower.timestamp | timestamp('datetime') }} ({{ network.networks[network.currentNetwork].name }})
      </span>
    </div>
    <div class="h-2 bg-socialHeader mx-3 rounded"></div>
    <div class="bg-white rounded-sm mx-4">
      <div class="flex text-xs pt-2">
        <div class="pl-2 w-1/8 font-medium">
          {{ $t('home.minerRanks.tableHeadersByPower.rank') }}
        </div>
        <div class="w-3/8 font-medium">
          {{ $t('home.minerRanks.tableHeadersByPower.miner') }}
        </div>
        <div class="w-1/4 text-left font-medium">
          {{ $t('home.minerRanks.tableHeadersByPower.validPower') }} /  {{ $t('home.minerRanks.rate') }}
        </div>
        <div class="w-1/4 text-right font-medium pr-2">
          24h{{ $t('home.minerRanks.tableHeadersByPowerDelta.powerIncreaseSpeed') }}
        </div>
      </div>

      <div v-for="(miner, index) in topMinersByPower.miners" :key="index" class="flex items-center text-xs border-b">
        <div class="pl-3 w-1/8">
          <RankIndex :index="index + 1" />
        </div>
        <div class="w-3/8 flex items-center py-2">
          <AddressLink :id="miner.address" :format="4" />
          <MinerTag v-if="miner.tag" :tag="miner.tag" :type="2" />
        </div>
        <div class="w-1/4">
          {{ miner.qualityAdjPower | size_metric(2) }}
          /
          {{ miner.qualityAdjPower / topMinersByPower.totalQualityAdjPower | percentage }}
        </div>
        <div class="w-1/4 text-right pr-2">
          {{ (miner.qualityAdjPowerDelta) | size_metric(2) }}
          /
          {{ $t('shared.time.day') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { network } from '~/filecoin/filecoin.config'
export default {
  data() {
    return {
      topMinersByPower: {},
      loading: false,
      pageSize: 20,
      network
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
    }
  },
  head() {
    return {
      title: `${this.$t('meta.titles.ranks')}`
    }
  },
  layout(context) {
    return 'social'
  }
}
</script>
