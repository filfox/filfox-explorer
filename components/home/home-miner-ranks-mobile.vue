<template>
  <div class="mb-2 bg-white">
    <div>
      <div class="flex justify-between items-center">
        <HomeTitle type="minerRanks" />
        <div
          v-if="$i18n.locale == 'zh' && false"
          class="flex items-center border border-socialTagBg rounded-full px-2 mr-4 text-xs cursor-pointer hover:border-button"
          @click="didSharedBtnClicked"
        >
          <img src="~/assets/img/social/share.svg" class="h-2 mr-1">
          <span>分享</span>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="flex w-full h-10 px-4 items-center relative">
          <el-tabs v-model="type" class="w-full">
            <el-tab-pane :label="$t('home.minerRanks.filters.qualityAdjPower')" name="0" class="text-sm" />
            <el-tab-pane :label="$t('home.minerRanks.filters.blocks')" name="1" />
            <el-tab-pane :label="$t('home.minerRanks.filters.powerDelta')" name="2" />
          </el-tabs>
          <DurationSelect v-if="type !== '0'" v-model="duration" portable class="absolute bottom-0 right-0 mb-4 mr-4" />
        </div>
      </div>
    </div>

    <div v-if="!loading">
      <div v-if="type == 0" class="flex bg-mobileHeader text-xs px-4">
        <div class="w-1/8">
          {{ $t('home.minerRanks.tableHeadersByPower.rank') }}
        </div>
        <div class="w-3/8">
          {{ $t('home.minerRanks.tableHeadersByPower.miner') }}
        </div>
        <div class="w-1/2 text-right">
          {{ $t('home.minerRanks.tableHeadersByPower.validPower') }} /  {{ $t('home.minerRanks.rate') }}
        </div>
      </div>

      <div v-if="type == 1" class="flex bg-mobileHeader text-xs px-4">
        <div class="w-1/8">
          {{ $t('home.minerRanks.tableHeadersByPower.rank') }}
        </div>
        <div class="w-3/8">
          {{ $t('home.minerRanks.tableHeadersByPower.miner') }}
        </div>
        <div class="w-1/2 text-right">
          {{ $t('home.minerRanks.tableHeadersByBlock.blockNums') }} /  {{ $t('home.minerRanks.tableHeadersByBlock.luckyValue') }}
        </div>
      </div>

      <div v-if="type == 2" class="flex bg-mobileHeader text-xs px-4">
        <div class="w-1/8">
          {{ $t('home.minerRanks.tableHeadersByPower.rank') }}
        </div>
        <div class="w-3/8">
          {{ $t('home.minerRanks.tableHeadersByPower.miner') }}
        </div>
        <div class="w-1/2 text-right">
          {{ $t('home.minerRanks.tableHeadersByPowerDelta.powerIncreaseSpeed') }}
        </div>
      </div>

      <template v-if="type == 0">
        <div v-for="(miner, index) in topMinersByPower.miners" :key="index" class="flex items-center text-xs px-4 border-b">
          <div class="w-1/8 pl-1">
            <RankIndex :index="index + 1" />
          </div>
          <div class="w-1/2 flex items-center py-2">
            <AddressLink :id="miner.address" :format="4" />
            <AddressTag :tag="miner.tag" type="mobile" :style="{maxWidth:'66%'}" />
          </div>
          <div class="w-3/8 text-right">
            {{ miner.qualityAdjPower | size_metric(2) }}
            /
            {{ miner.qualityAdjPower / topMinersByPower.totalQualityAdjPower | percentage }}
          </div>
        </div>
      </template>

      <template v-if="type == 1">
        <div v-for="(miner, index) in topMinersByBlocks.miners" :key="index" class="flex items-center text-xs px-4 border-b">
          <div class="w-1/8 pl-1">
            <RankIndex :index="index + 1" />
          </div>
          <div class="w-1/2 flex items-center py-2">
            <AddressLink :id="miner.address" :format="4" />
            <AddressTag :tag="miner.tag" type="mobile" :style="{maxWidth:'66%'}" />
          </div>
          <div class="w-3/8 text-right">
            {{ miner.weightedBlocksMined }} / {{ miner.luckyValue | percentage }}
          </div>
        </div>
      </template>

      <template v-if="type == 2">
        <div v-for="(miner, index) in topMinersByPowerDelta.miners" :key="index" class="flex items-center text-xs px-4 border-b">
          <div class="w-1/8 pl-1">
            <RankIndex :index="index + 1" />
          </div>
          <div class="w-1/2 flex items-center py-2">
            <AddressLink :id="miner.address" :format="4" />
            <AddressTag :tag="miner.tag" type="mobile" :style="{maxWidth:'66%'}" />
          </div>
          <div class="w-3/8 text-right">
            {{ (miner.qualityAdjPowerGrowth / durationDay / topMinersByPowerDelta.durationPercentage) | size_metric(2) }}
            /
            {{ $t('shared.time.day') }}
          </div>
        </div>
      </template>
    </div>
    <div v-else v-loading="loading" class="h-16">
    </div>
    <div class="flex items-center h-12">
      <nuxt-link :to="localePath('/ranks/' + ['power', 'blocks', 'power-growth'][type])" class="m-auto">
        <el-button size="mini" type="text">
          {{ $t('home.minerRanks.moreBtn') }}
        </el-button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    topMinersByPower: { type: Object, required: true },
    topMinersByBlocks: { type: Object, required: true },
    topMinersByPowerDelta: { type: Object, required: true },
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      type: '0',
      duration: '24h',
      rankTableHeadersByPowers: this.$t('home.minerRanks.tableHeadersByPower'),
      rankTableHeadersByBlocks: this.$t('home.minerRanks.tableHeadersByBlock'),
      rankTableHeadersByPowerDelta: this.$t('home.minerRanks.tableHeadersByPowerDelta')
    }
  },
  computed: {
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
    type() {
      switch (this.type) {
        case '0':
          this.$emit('updateTopMinersByPower')
          break
        case '1':
          this.$emit('updateTopMinersByBlocks', this.duration)
          break
        case '2':
          this.$emit('updateTopMinersByPowerDelta', this.duration)
          break
        default:
          break
      }
    }
  },
  methods: {
    didSharedBtnClicked() {
      this.$emit('didSharedBtnClicked')
    }
  }
}
</script>
