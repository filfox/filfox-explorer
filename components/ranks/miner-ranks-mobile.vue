<template>
  <div class="bg-white">
    <HomeTitle type="minerRanks" />
    <div class="flex justify-between">
      <div class="flex w-full h-10 px-4 items-center relative">
        <el-tabs v-model="type" class="w-full" @tab-click="didRankTypeSwitched">
          <el-tab-pane :label="$t('home.minerRanks.filters.qualityAdjPower')" name="0" class="text-sm" />
          <el-tab-pane :label="$t('home.minerRanks.filters.blocks')" name="1" />
          <el-tab-pane :label="$t('home.minerRanks.filters.powerDelta')" name="2" />
        </el-tabs>
        <DurationSelect v-if="type !== '0'" v-model="duration" portable class="absolute right-0 bottom-0 mb-4 mr-4" />
      </div>
    </div>

    <div v-if="loading" v-loading="loading" class="bg-white h-16"></div>

    <template v-if="type == '0' && !loading">
      <div v-for="(miner, index) in topMinersByPower.miners" :key="index" class="rounded-sm mx-3 mb-3 py-px shadow bg-white">
        <div class="flex items-center text-xs my-2 ml-1">
          <RankIndex :index="page * pageSize + index+1" :class="{'mb-1':page * pageSize + index < 3}" class="ml-1" />
          <AddressLink :id="miner.address" :format="4" class="ml-2" />
          <MinerTag v-if="miner.tag" :tag="miner.tag" :type="2" />
        </div>
        <div class="flex justify-between my-1 mx-2 text-xs">
          <p>
            {{ $t('home.minerRanks.tableHeadersByPower.validPower') }}:
            {{ miner.qualityAdjPower | size_metric(2) }}
          </p>
          <p>
            {{ $t('home.minerRanks.tableHeadersByPower.validPowerRate') }}:
            {{ miner.qualityAdjPower / topMinersByPower.totalQualityAdjPower | percentage }}
          </p>
        </div>
        <div class="flex justify-between my-1 mx-2 text-xs">
          <p>
            {{ $t('home.minerRanks.tableHeadersByPower.reward') }}:
            {{ miner.totalRewards | filecoin(2) }}
          </p>
          <p>
            {{ $t('home.minerRanks.tableHeadersByPower.powerIncrease') }}:
            {{ miner.qualityAdjPowerDelta | size_metric(2) }}
          </p>
        </div>
        <div class="flex justify-between my-1 mx-2 text-xs">
          <p>
            {{ $t('home.minerRanks.tableHeadersByPower.miningEfficiency') }}:
            {{ miner.rewardPerByte * 2 ** 40 * epochsInDay | filecoin(2) }}/TiB
          </p>
        </div>
      </div>
    </template>

    <template v-if="type == '1' && !loading">
      <div v-for="(miner, index) in topMinersByBlocks.miners" :key="index" class="rounded-sm mx-3 mb-3 py-px shadow bg-white">
        <div class="flex items-center text-xs my-2 ml-1">
          <RankIndex :index="page * pageSize + index+1" :class="{'mb-1':page * pageSize + index < 3}" class="ml-1" />
          <AddressLink :id="miner.address" :format="4" class="ml-2" />
          <MinerTag v-if="miner.tag" :tag="miner.tag" :type="2" />
        </div>
        <div class="flex justify-between my-1 mx-2 text-xs">
          <p>
            {{ $t('home.minerRanks.tableHeadersByBlock.blockNums') }}:
            {{ miner.weightedBlocksMined }}
          </p>
          <p>
            {{ $t('home.minerRanks.tableHeadersByBlock.luckyValue') }}:
            {{ miner.luckyValue | percentage }}
          </p>
        </div>
        <div class="flex justify-between my-1 mx-2 text-xs">
          <p>
            {{ $t('home.minerRanks.tableHeadersByBlock.totalRewards') }}:
            {{ miner.totalRewards | filecoin(2) }}
          </p>
          <p>
            {{ $t('home.minerRanks.tableHeadersByBlock.rewardsRatio') }}:
            {{ miner.totalRewards / topMinersByBlocks.totalRewards | percentage }}
          </p>
        </div>
      </div>
    </template>

    <template v-if="type == '2' && !loading">
      <div v-for="(miner, index) in topMinersByPowerDelta.miners" :key="index" class="rounded-sm mx-3 mb-3 py-px shadow bg-white">
        <div class="flex items-center text-xs my-2 ml-1">
          <RankIndex :index="page * pageSize + index+1" :class="{'mb-1':page * pageSize + index < 3}" class="ml-1" />
          <AddressLink :id="miner.address" :format="4" class="ml-2" />
          <MinerTag v-if="miner.tag" :tag="miner.tag" :type="2" />
        </div>
        <div class="flex justify-between my-1 mx-2 text-xs">
          <p>
            {{ $t('home.minerRanks.tableHeadersByPowerDelta.powerIncreaseSpeed') }}:
            {{ (miner.qualityAdjPowerDelta / durationDays / topMinersByPowerDelta.durationPercentage) | size_metric(2) }}
            /
            {{ $t('shared.time.day') }}
          </p>
          <p>
            {{ $t('home.minerRanks.tableHeadersByPowerDelta.equivalentMiners') }}:
            {{ miner.equivalentMiners.toFixed(2) }}
          </p>
        </div>
        <div class="flex justify-between my-1 mx-2 text-xs">
          <p>
            {{ $t('home.minerRanks.tableHeadersByPowerDelta.powerDelta') }}: {{ miner.qualityAdjPowerDelta | size_metric(2) }}
          </p>
          <p>
            {{ $t('home.minerRanks.tableHeadersByPowerDelta.validPower') }}: {{ miner.qualityAdjPower | size_metric(2) }}
          </p>
        </div>
      </div>
    </template>

    <div class="flex items-center text-center h-16">
      <el-pagination
        layout="prev, pager, next"
        :page-count="totalPageCount"
        :pager-count="5"
        :current-page="page + 1"
        class="mx-auto"
        @current-change="didCurrentPageChanged"
      />
    </div>
  </div>
</template>

<script>
import { epochsInDay } from '@/filecoin/filecoin.config'

export default {
  props: {
    topMinersByPower: { type: Object, required: true },
    topMinersByBlocks: { type: Object, required: true },
    topMinersByPowerDelta: { type: Object, required: true },
    pageSize: { type: Number, required: true },
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      type: '0',
      duration: '24h',
      page: 0,
      epochsInDay
    }
  },
  computed: {
    totalPageCount() {
      if (this.type === '0') {
        return this.topMinersByPower.miners == null
          ? 0
          : Math.ceil(this.topMinersByPower.totalCount / this.pageSize)
      } else if (this.type === '1') {
        return this.topMinersByBlocks.miners == null
          ? 0
          : Math.ceil(this.topMinersByBlocks.totalCount / this.pageSize)
      } else {
        return this.topMinersByPowerDelta.miners == null
          ? 0
          : Math.ceil(this.topMinersByPowerDelta.totalCount / this.pageSize)
      }
    },
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
      this.page = 0
      if (this.type === '1') {
        this.$emit('updateTopMinersByBlocks', this.pageSize, this.page, this.duration)
      } else if (this.type === '2') {
        this.$emit('updateTopMinersByPowerDelta', this.pageSize, this.page, this.duration)
      }
    }
  },
  methods: {
    didRankTypeSwitched() {
      this.page = 0
      switch (this.type) {
        case '0':
          this.$emit('updateTopMinersByPower', this.pageSize, this.page)
          break
        case '1':
          this.$emit('updateTopMinersByBlocks', this.pageSize, this.page, this.duration)
          break
        case '2':
          this.$emit('updateTopMinersByPowerDelta', this.pageSize, this.page, this.duration)
          break
        default:
          break
      }
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      switch (this.type) {
        case '0':
          this.$emit('updateTopMinersByPower', this.pageSize, this.page)
          break
        case '1':
          this.$emit('updateTopMinersByBlocks', this.pageSize, this.page, this.duration)
          break
        case '2':
          this.$emit('updateTopMinersByPowerDelta', this.pageSize, this.page, this.duration)
          break
        default:
          break
      }
    }
  }
}
</script>
