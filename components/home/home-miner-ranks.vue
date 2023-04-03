<template>
  <div class="mb-4 pb-2 bg-white rounded-md">
    <div class="border-b border-background">
      <div class="flex items-center pt-1">
        <HomeTitle type="minerRanks" />
        <nuxt-link :to="localePath('/ranks/' + ['power', 'blocks', 'power-growth'][type])" class="ml-auto mr-4">
          <el-button size="mini" round>
            {{ $t('home.minerRanks.moreBtn') }}
          </el-button>
        </nuxt-link>
      </div>
      <div class="flex justify-between mb-2 px-4">
        <div class="flex h-12 items-center">
          <el-row>
            <el-button
              size="mini"
              round
              v-bind="type === 0 ? {type: 'primary', plain: true, class: ['pointer-events-none']} : {}"
              @click="e => didRankTypeSwitched(e, 0)"
            >
              {{ $t('home.minerRanks.filters.qualityAdjPower') }}
            </el-button>
            <el-button
              size="mini"
              round
              v-bind="type === 1 ? {type: 'primary', plain: true, class: ['pointer-events-none']} : {}"
              @click="e => didRankTypeSwitched(e, 1)"
            >
              {{ $t('home.minerRanks.filters.blocks') }}
            </el-button>
            <el-button
              size="mini"
              round
              v-bind="type === 2 ? {type: 'primary', plain: true, class: ['pointer-events-none']} : {}"
              @click="e => didRankTypeSwitched(e, 2)"
            >
              {{ $t('home.minerRanks.filters.powerDelta') }}
            </el-button>
          </el-row>
        </div>
        <div class="flex items-center">
          <DurationSelect v-if="type !== 0" v-model="duration" class="flex items-center" />
        </div>
      </div>
    </div>

    <div class="px-4 mt-3 mb-5">
      <table v-loading="loading" class="table-fixed w-full">
        <thead class="text-gray-600 text-sm m-2">
          <tr v-if="type === 0">
            <th class="w-1/12">
              {{ $t('home.minerRanks.tableHeadersByPower.rank') }}
            </th>
            <th class="w-1/12">
              {{ $t('home.minerRanks.tableHeadersByPower.miner') }}
            </th>
            <th class="w-1/10">
              {{ $t('home.minerRanks.tableHeadersByPower.tag') }}
            </th>
            <th class="w-4/15">
              {{ $t('home.minerRanks.tableHeadersByPower.validPower') }} / {{ $t('home.minerRanks.tableHeadersByPower.rate') }}
            </th>
            <th class="w-1/10">
              {{ $t('home.minerRanks.tableHeadersByPower.reward') }}
            </th>
            <th class="w-1/10">
              <div class="flex justify-center items-center">
                {{ $t('home.minerRanks.tableHeadersByPower.miningEfficiency') }}
                <Tip class="ml-1" :content="$t('home.minerRanks.tipsByPower.miningEfficiency')" />
              </div>
            </th>
            <th class="w-1/10">
              <div class="flex justify-center items-center">
                {{ $t('home.minerRanks.tableHeadersByPower.powerIncrease') }}
                <Tip class="ml-1" :content="$t('home.minerRanks.tipsByPower.powerIncrease')" />
              </div>
            </th>
          </tr>
          <tr v-if="type === 1">
            <th class="w-1/12">
              {{ $t('home.minerRanks.tableHeadersByBlock.rank') }}
            </th>
            <th class="w-1/12">
              {{ $t('home.minerRanks.tableHeadersByBlock.miner') }}
            </th>
            <th class="w-1/10">
              {{ $t('home.minerRanks.tableHeadersByBlock.tag') }}
            </th>
            <th class="w-4/15">
              <div class="flex justify-center items-center">
                {{ $t('home.minerRanks.tableHeadersByBlock.blockNums') }}
                <Tip class="mx-1" :content="$t('home.minerRanks.tipsByBlock.winCount')" />
              </div>
            </th>
            <th class="w-1/10">
              <div class="flex justify-center items-center">
                {{ $t('home.minerRanks.tableHeadersByBlock.luckyValue') }}
                <Tip class="ml-1" :content="$t('home.minerRanks.tipsByBlock.luckyValue')" />
              </div>
            </th>
            <th class="w-3/20">
              <div class="flex justify-center items-center">
                {{ $t('home.minerRanks.tableHeadersByBlock.totalRewards') }} / {{ $t('home.minerRanks.tableHeadersByPower.rate') }}
                <Tip class="ml-1" :content="$t('home.minerRanks.tipsByBlock.rewardsRatio')" />
              </div>
            </th>
            <th class="w-1/10">
              {{ $t('home.minerRanks.tableHeadersByPowerDelta.validPower') }}
            </th>
          </tr>
          <tr v-if="type === 2">
            <th class="w-1/12">
              {{ $t('home.minerRanks.tableHeadersByPowerDelta.rank') }}
            </th>
            <th class="w-1/12">
              {{ $t('home.minerRanks.tableHeadersByPowerDelta.miner') }}
            </th>
            <th class="w-1/10">
              {{ $t('home.minerRanks.tableHeadersByPowerDelta.tag') }}
            </th>
            <th class="w-7/25">
              <div class="flex justify-center items-center">
                {{ $t('home.minerRanks.tableHeadersByPowerDelta.powerIncreaseSpeed') }}
                <Tip class="ml-1" :content="$t('home.minerRanks.tipsByPowerDelta.powerIncreaseSpeed')" />
              </div>
            </th>
            <th class="w-1/10">
              <div class="flex justify-center items-center">
                {{ $t('home.minerRanks.tableHeadersByPowerDelta.equivalentMiners') }}
                <Tip class="ml-1" :content="$t('home.minerRanks.tipsByPowerDelta.equivalentMiners')" />
              </div>
            </th>
            <th class="w-1/10">
              <div class="flex justify-center items-center">
                {{ $t('home.minerRanks.tableHeadersByPowerDelta.powerDelta') }}
                <Tip class="ml-1" :content="$t('home.minerRanks.tipsByPowerDelta.powerDelta')" />
              </div>
            </th>
            <th class="w-1/10">
              {{ $t('home.minerRanks.tableHeadersByPowerDelta.validPower') }}
            </th>
          </tr>
        </thead>
        <tbody v-if="type === 0" class="text-sm text-center">
          <tr v-for="(miner, index) in topMinersByPower.miners" :key="index" class="border-b border-background h-10">
            <td>
              <RankIndex :index="index + 1" />
            </td>
            <td>
              <AddressLink :id="miner.address" :format="10" />
            </td>
            <td>
              <AddressTag :tag="miner.tag" class="max-w-full" />
            </td>
            <td>
              <div class="flex items-center justify-start">
                <el-progress
                  :percentage="miner.qualityAdjPower / topMinersByPower.miners[0].qualityAdjPower * 100"
                  :show-text="false"
                  class="flex w-1/2 pr-3 ml-8"
                />
                <div>
                  {{ miner.qualityAdjPower | size_metric(2) }} / {{ miner.qualityAdjPower / topMinersByPower.totalQualityAdjPower | percentage }}
                </div>
              </div>
            </td>
            <td>{{ miner.totalRewards | filecoin(2) }}</td>
            <td>{{ miner.rewardPerByte * 2 ** 40 * epochsInDay | filecoin(2) }}/TiB</td>
            <td>{{ miner.qualityAdjPowerDelta | size_metric(2) }}</td>
          </tr>
        </tbody>
        <tbody v-else-if="type === 1" class="text-sm text-center">
          <tr v-for="(miner, index) in topMinersByBlocks.miners" :key="index" class="border-b border-background h-10">
            <td>
              <RankIndex :index="index + 1" />
            </td>
            <td>
              <AddressLink :id="miner.address" :format="10" />
            </td>
            <td>
              <AddressTag :tag="miner.tag" class="max-w-full" />
            </td>
            <td>
              <div class="flex items-center justify-start">
                <el-progress
                  :percentage="miner.weightedBlocksMined/topMinersByBlocks.miners[0].weightedBlocksMined * 100"
                  :show-text="false"
                  class="flex w-2/3 mr-3 ml-10"
                />
                <div>
                  {{ miner.weightedBlocksMined }}
                </div>
              </div>
            </td>
            <td>{{ miner.luckyValue | percentage }}</td>
            <td>{{ miner.totalRewards | filecoin(2) }} / {{ miner.totalRewards / topMinersByBlocks.totalRewards | percentage }} </td>
            <td>{{ miner.qualityAdjPower | size_metric(2) }}</td>
          </tr>
        </tbody>
        <tbody v-else-if="type === 2" class="text-sm text-center">
          <tr v-for="(miner, index) in topMinersByPowerDelta.miners" :key="index" class="border-b border-background h-10">
            <td>
              <RankIndex :index="index+1" />
            </td>
            <td>
              <AddressLink :id="miner.address" :format="10" />
            </td>
            <td>
              <AddressTag :tag="miner.tag" class="max-w-full" />
            </td>
            <td>
              <div class="flex items-center justify-end">
                <el-progress
                  :percentage="miner.qualityAdjPowerGrowth / topMinersByPowerDelta.miners[0].qualityAdjPowerGrowth * 100"
                  :show-text="false"
                  class="flex w-1/2 mx-1 mr-3"
                />
                <div class="flex w-1/3">
                  {{ (miner.qualityAdjPowerGrowth / durationDays / topMinersByPowerDelta.durationPercentage) | size_metric(2) }}
                  /
                  {{ $t('shared.time.day') }}
                </div>
              </div>
            </td>
            <td>{{ miner.equivalentMiners.toFixed(2) }}</td>
            <td>{{ miner.qualityAdjPowerDelta | size_metric(2) }}</td>
            <td>{{ miner.qualityAdjPower | size_metric(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { epochsInDay } from '@/filecoin/filecoin.config'
import { continents } from '@/filecoin/continent'

export default {
  props: {
    topMinersByPower: { type: Object, required: true },
    topMinersByBlocks: { type: Object, required: true },
    topMinersByPowerDelta: { type: Object, required: true },
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      type: 0,
      duration: '24h',
      rankTableHeadersByPowers: this.$t('home.minerRanks.tableHeadersByPower'),
      rankTableHeadersByBlocks: this.$t('home.minerRanks.tableHeadersByBlock'),
      rankTableHeadersByPowerDelta: this.$t('home.minerRanks.tableHeadersByPowerDelta'),
      epochsInDay,
      continents,
      currentContinent: continents[0].code
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
      if (this.type === 1) {
        this.$emit('updateTopMinersByBlocks', this.duration)
      } else if (this.type === 2) {
        this.$emit('updateTopMinersByPowerDelta', this.duration)
      }
    }
  },
  methods: {
    didRankTypeSwitched(e, type) {
      const code = this.currentContinent === 'All' ? null : this.currentContinent
      this.type = type
      this.requestData(code)
      let node = e.target
      while (true) {
        if (node?.tagName?.toLowerCase() === 'button') {
          node.blur()
          break
        } else {
          node = node.parentElement
        }
      }
    },
    didSelectChanged() {
      const code = this.currentContinent === 'All' ? null : this.currentContinent
      this.requestData(code)
    },
    requestData(code) {
      switch (this.type) {
        case 0:
          this.$emit('updateTopMinersByPower', code)
          break
        case 1:
          this.$emit('updateTopMinersByBlocks', this.duration, code)
          break
        case 2:
          this.$emit('updateTopMinersByPowerDelta', this.duration, code)
          break
        default:
          break
      }
    }
  }
}
</script>
