<template>
  <div v-loading="loading" class="my-4 bg-white rounded-md flex flex-col">
    <div class="flex flex-row justify-between">
      <p class="ml-8 flex my-4">
        {{ $t('detail.address.miner.miningOverview.title') }}
      </p>
      <div class="flex items-center mr-8">
        <el-radio-group v-model="duration" size="mini" fill="#1a4fc9">
          <el-radio-button label="24h">
            {{ '24' + $t('shared.time.hour') }}
          </el-radio-button>
          <el-radio-button label="7d">
            {{ '7' + $t('shared.time.day') }}
          </el-radio-button>
          <el-radio-button label="30d">
            {{ '30' + $t('shared.time.day') }}
          </el-radio-button>
          <el-radio-button label="1y">
            {{ '1' + $t('shared.time.year') }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="mx-8 mb-6 border border-background rounded-sm p-4">
      <div class="flex items-center w-full mb-2">
        <p class="text-sm w-5/12 text-left">
          {{ $t('detail.address.miner.miningOverview.headers.qualityAdjPowerDelta') }}:
          {{ addressData.miner.miningStats.qualityAdjPowerDelta | size_metric(2) }}
        </p>
        <p class="text-sm w-5/12 text-left">
          {{ $t('detail.address.miner.miningOverview.headers.qualityAdjPowerDeltaSpeed') }}:
          {{ miningStats.qualityAdjPowerDelta / durationDay / miningStats.durationPercentage | size_metric(2) }} / {{ $t('shared.time.day') }}
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
          {{ (miningStats.totalRewards/ miningStats.networkTotalRewards) | percentage }}
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
    addressData: { type: Object, required: true }
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
    durationName() {
      return {
        '24h': `24${this.$t('shared.time.hour')}`,
        '7d': `7${this.$t('shared.time.day')}`,
        '30d': `30${this.$t('shared.time.day')}`,
        '1y': `1${this.$t('shared.time.year')}`
      }[this.duration]
    },
    durationDay() {
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
