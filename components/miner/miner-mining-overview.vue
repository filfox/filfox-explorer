<template>
  <div v-if="portable" class="bg-white pb-3">
    <div class="flex justify-between flex-row border-b border-background">
      <p class="pl-3 flex py-2 text-sm font-medium">
        {{ $t('detail.address.miner.miningOverview.title') }}
      </p>
      <DurationSelect v-model="duration" portable class="my-2 mr-3" />
    </div>
    <div v-loading="loading" class="pt-2 pb-2 rounded-sm mx-3 mt-3 shadow justify-between">
      <div class="flex items-center justify-between mx-3">
        <p class="text-xs text-gray-800">
          {{ $t('detail.address.miner.miningOverview.headers.qualityAdjPowerDelta') }}:
        </p>
        <p class="text-xs text-gray-800">
          {{ addressData.miner.miningStats.qualityAdjPowerDelta | size_metric(2) }}
        </p>
      </div>
      <div class="flex items-center justify-between mx-3 mt-2">
        <p class="text-xs text-gray-800">
          {{ $t('detail.address.miner.miningOverview.headers.qualityAdjPowerDeltaSpeed') }}:
        </p>
        <p class="text-xs text-gray-800">
          {{ miningStats.qualityAdjPowerDelta / durationDays / miningStats.durationPercentage | size_metric(2) }}
          /
          {{ $t('shared.time.day') }}
        </p>
      </div>
      <div class="flex items-center justify-between mx-3 mt-2">
        <p class="text-xs text-gray-800">
          {{ $t('detail.address.miner.miningOverview.headers.minerEquivalent') }}:
        </p>
        <p class="text-xs text-gray-800">
          {{ miningStats.equivalentMiners.toFixed(2) }}
        </p>
      </div>
      <div class="flex items-center justify-between mx-3 mt-2">
        <p class="text-xs text-gray-800">
          {{ $t('detail.address.miner.miningOverview.headers.blockNums') }}:
        </p>
        <p class="text-xs text-gray-800">
          {{ miningStats.blocksMined }}
        </p>
      </div>
      <div class="flex items-center justify-between mx-3 mt-2">
        <p class="text-xs text-gray-800">
          {{ $t('detail.address.miner.miningOverview.headers.blocksReward') }}:
        </p>
        <p class="text-xs text-gray-800">
          {{ miningStats.totalRewards | filecoin(4) }}
        </p>
      </div>
      <div class="flex items-center justify-between mx-3 mt-2">
        <p class="text-xs text-gray-800">
          {{ $t('detail.address.miner.miningOverview.headers.blocksRewardRate') }}:
        </p>
        <p class="text-xs text-gray-800">
          {{ miningStats.totalRewards / miningStats.networkTotalRewards | percentage }}
        </p>
      </div>
      <div class="flex items-center justify-between mx-3 mt-2">
        <p class="text-xs text-gray-800">
          {{ $t('detail.address.miner.miningOverview.headers.miningEfficiency') }}:
        </p>
        <p class="text-xs text-gray-800">
          {{ miningStats.rewardPerByte * 2 ** 40 * epochsInDay | filecoin(2, '/TiB') }}
        </p>
      </div>
      <div class="flex items-center justify-between mx-3 mt-2">
        <p class="text-xs text-gray-800">
          {{ $t('detail.address.miner.miningOverview.headers.luckyValue') }}:
        </p>
        <p class="text-xs text-gray-800">
          {{ miningStats.luckyValue | percentage }}
        </p>
      </div>
    </div>
  </div>

  <div v-else class="bg-white rounded-md pb-6">
    <div class="flex flex-row justify-between">
      <p class="ml-8 flex py-4">
        {{ $t('detail.address.miner.miningOverview.title') }}
      </p>
      <DurationSelect v-model="duration" class="flex items-center mr-8" />
    </div>
    <div v-loading="loading" class="mx-8 border border-background rounded-sm p-4">
      <div class="flex items-center w-full mb-2">
        <p class="text-sm w-5/12 text-left">
          {{ $t('detail.address.miner.miningOverview.headers.qualityAdjPowerDelta') }}:
          {{ addressData.miner.miningStats.qualityAdjPowerDelta | size_metric(2) }}
        </p>
        <p class="text-sm w-5/12 text-left">
          {{ $t('detail.address.miner.miningOverview.headers.qualityAdjPowerDeltaSpeed') }}:
          {{ miningStats.qualityAdjPowerDelta / durationDays / miningStats.durationPercentage | size_metric(2) }}
          /
          {{ $t('shared.time.day') }}
        </p>
        <p class="text-sm w-1/6 text-right">
          {{ $t('detail.address.miner.miningOverview.headers.minerEquivalent') }}:
          {{ miningStats.equivalentMiners.toFixed(2) }}
        </p>
      </div>
      <div class="flex items-center w-full mb-2">
        <p class="text-sm w-5/12 text-left">
          {{ $t('detail.address.miner.miningOverview.headers.blockNums') }}:
          {{ miningStats.blocksMined }}
        </p>
        <p class="text-sm w-5/12 text-left">
          {{ $t('detail.address.miner.miningOverview.headers.blocksReward') }}:
          {{ miningStats.totalRewards | filecoin(4) }}
        </p>
        <p class="text-sm w-1/6 text-right">
          {{ $t('detail.address.miner.miningOverview.headers.blocksRewardRate') }}:
          {{ miningStats.totalRewards / miningStats.networkTotalRewards | percentage }}
        </p>
      </div>
      <div class="flex items-center w-full">
        <p class="text-sm w-5/12 text-left">
          {{ $t('detail.address.miner.miningOverview.headers.miningEfficiency') }}:
          {{ miningStats.rewardPerByte * 2 ** 40 * epochsInDay | filecoin(2, '/TiB') }}
        </p>
        <p class="text-sm w-5/12 text-left">
          {{ $t('detail.address.miner.miningOverview.headers.luckyValue') }}:
          {{ (miningStats.luckyValue * 100).toFixed(2) }}%
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { epochsInDay } from '@/filecoin/filecoin.config'

export default {
  props: {
    addressData: { type: Object, required: true },
    portable: { type: Boolean, default: false }
  },
  data() {
    return {
      duration: '24h',
      miningStats: this.addressData.miner.miningStats,
      epochsInDay,
      loading: false
    }
  },
  computed: {
    durationDays() {
      if (this.duration === '24h') {
        return 1
      } else if (this.duration === '7d') {
        return 7
      } else if (this.duration === '30d') {
        return 30
      } else {
        return 365
      }
    }
  },
  watch: {
    duration() {
      this.getMinigStats()
    }
  },
  methods: {
    async getMinigStats() {
      this.loading = true
      const params = { duration: this.duration }
      this.miningStats = await this.$axios.$get(`/miner/${this.addressData.address}/mining-stats`, { params })
      this.loading = false
    }
  }
}
</script>
