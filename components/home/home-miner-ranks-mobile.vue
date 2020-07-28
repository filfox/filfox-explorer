<template>
  <div class="mb-2 bg-white">
    <div>
      <HomeTitle type="minerRanks" />
      <div class="flex justify-between">
        <div class="flex w-full h-10 px-4 items-center relative">
          <el-tabs v-model="type" class="w-full">
            <el-tab-pane :label="$t('home.minerRanks.filters.qualityAdjPower')" name="0" class="text-sm" />
            <el-tab-pane :label="$t('home.minerRanks.filters.blocks')" name="1" />
            <el-tab-pane :label="$t('home.minerRanks.filters.powerDelta')" name="2" />
          </el-tabs>
          <el-dropdown
            v-if="type != '0'"
            trigger="click"
            hide-on-click
            class="border border-background px-2 rounded-sm absolute right-0 bottom-0 mb-4"
            @command="didDurationSwitched"
          >
            <span class="el-dropdown-link text-sm">
              {{ durationName }} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="24h">
                {{ '24' + $t('shared.time.hour') }}
              </el-dropdown-item>
              <el-dropdown-item command="7d">
                {{ '7' + $t('shared.time.day') }}
              </el-dropdown-item>
              <el-dropdown-item command="30d">
                {{ '30' + $t('shared.time.day') }}
              </el-dropdown-item>
              <el-dropdown-item command="1y">
                {{ '1' + $t('shared.time.year') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <div v-loading="loading">
      <div v-if="type == 0" class="flex bg-mobileHeader text-xs px-4">
        <div class="w-1/6">
          {{ $t('home.minerRanks.tableHeadersByPower.rank') }}
        </div>
        <div class="w-1/3">
          {{ $t('home.minerRanks.tableHeadersByPower.miner') }}
        </div>
        <div class="w-1/2 text-right">
          {{ $t('home.minerRanks.tableHeadersByPower.validPower') }} /  {{ $t('home.minerRanks.rate') }}
        </div>
      </div>

      <div v-if="type == 1" class="flex bg-mobileHeader text-xs px-4">
        <div class="w-1/6">
          {{ $t('home.minerRanks.tableHeadersByPower.rank') }}
        </div>
        <div class="w-1/3">
          {{ $t('home.minerRanks.tableHeadersByPower.miner') }}
        </div>
        <div class="w-1/2 text-right">
          {{ $t('home.minerRanks.tableHeadersByBlock.blockNums') }} /  {{ $t('home.minerRanks.tableHeadersByBlock.luckyValue') }}
        </div>
      </div>

      <div v-if="type == 2" class="flex bg-mobileHeader text-xs px-4">
        <div class="w-1/6">
          {{ $t('home.minerRanks.tableHeadersByPower.rank') }}
        </div>
        <div class="w-1/3">
          {{ $t('home.minerRanks.tableHeadersByPower.miner') }}
        </div>
        <div class="w-1/2 text-right">
          {{ $t('home.minerRanks.tableHeadersByPowerDelta.validPower') }}
        </div>
      </div>

      <template v-if="type == 0">
        <div v-for="(miner, index) in topMinersByPower.miners" :key="index" class="flex items-center text-xs px-4 border-b">
          <div class="w-1/6 pl-1">
            <RankIndex :index="index + 1" />
          </div>
          <div class="w-1/2 flex items-center py-2">
            <AddressLink :id="miner.address" :format="4" />
            <MinerTag v-if="miner.tag" :tag="miner.tag" :type="2" />
          </div>
          <div class="w-1/3 text-right">
            {{ miner.qualityAdjPower | size_metric(2) }}
            /
            {{ miner.qualityAdjPower / topMinersByPower.totalQualityAdjPower | percentage }}
          </div>
        </div>
      </template>

      <template v-if="type == 1">
        <div v-for="(miner, index) in topMinersByBlocks.miners" :key="index" class="flex items-center text-xs px-4 border-b">
          <div class="w-1/6 pl-1">
            <RankIndex :index="index + 1" />
          </div>
          <div class="w-1/2 flex items-center py-2">
            <AddressLink :id="miner.address" :format="4" />
            <MinerTag v-if="miner.tag" :tag="miner.tag" :type="2" />
          </div>
          <div class="w-1/3 text-right">
            {{ miner.weightedBlocksMined }} / {{ (miner.luckyValue * 100).toFixed(2) }}%
          </div>
        </div>
      </template>

      <template v-if="type == 2">
        <div v-for="(miner, index) in topMinersByPowerDelta.miners" :key="index" class="flex items-center text-xs px-4 border-b">
          <div class="w-1/6 pl-1">
            <RankIndex :index="index + 1" />
          </div>
          <div class="w-1/2 flex items-center py-2">
            <AddressLink :id="miner.address" :format="4" />
            <MinerTag v-if="miner.tag" :tag="miner.tag" :type="2" />
          </div>
          <div class="w-1/3 text-right">
            {{ (miner.qualityAdjPowerDelta / durationDay / topMinersByPowerDelta.durationPercentage) | size_metric(2) }}
            /
            {{ $t('shared.time.day') }}
          </div>
        </div>
      </template>
    </div>
    <div class="flex items-center h-12">
      <nuxt-link :to="localePath('/ranks')" class="m-auto">
        <el-button size="mini" type="text">
          {{ $t('home.minerRanks.moreBtn') }}
        </el-button>
      </nuxt-link>
    </div>
  </div>
</template>

<style>
  .el-tabs__item {
      padding: 0 10px;
      font-size: 12px;
  }
  .el-button--text {
    color: #606266
  }
</style>

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
    didDurationSwitched(command) {
      this.duration = command
      if (this.type === '1') {
        this.getTopMinersByBlocks()
      } else if (this.type === '2') {
        this.getTopMinersByPowerDelta()
      }
    }
  }
}
</script>
