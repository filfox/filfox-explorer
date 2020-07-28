<template>
  <div class="container mx-auto">
    <div class="my-4 bg-white rounded-md">
      <div class="border-b border-background">
        <HomeTitle type="minerRanks" />
        <div class="flex justify-between">
          <div class="flex h-12 ml-4 items-center">
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
          <div v-if="type != 0" class="flex h-12 items-center mr-4">
            <el-radio-group
              v-model="duration"
              size="mini"
              fill="#1a4fc9"
              @change="didDurationSwitched"
            >
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
        <div class="flex h-2"></div>
      </div>

      <div class="flex mt-3">
        <table v-loading="loading" class="w-full" :class="page === 0 ? 'table-fixed' : 'table-auto ml-4'">
          <thead class="text-gray-600 text-sm">
            <tr v-if="type === 0">
              <th class="w-1/10">
                {{ $t('home.minerRanks.tableHeadersByPower.rank') }}
              </th>
              <th class="w-1/10">
                {{ $t('home.minerRanks.tableHeadersByPower.miner') }}
              </th>
              <th class="w-1/10">
                {{ $t('home.minerRanks.tableHeadersByPower.tag') }}
              </th>
              <th class="w-1/5">
                {{ $t('home.minerRanks.tableHeadersByPower.validPower') }}
              </th>
              <th class="w-1/8">
                {{ $t('home.minerRanks.tableHeadersByPower.validPowerRate') }}
              </th>
              <th class="w-1/8">
                {{ $t('home.minerRanks.tableHeadersByPower.reward') }}
              </th>
              <th class="w-1/8">
                <div class="flex justify-center items-center">
                  {{ $t('home.minerRanks.tableHeadersByPower.miningEfficiency') }}
                  <Tip class="ml-1" :content="$t('home.minerRanks.tipsByPower.miningEfficiency')" />
                </div>
              </th>
              <th class="w-1/8">
                <div class="flex justify-center items-center">
                  {{ $t('home.minerRanks.tableHeadersByPower.powerIncrease') }}
                  <Tip class="ml-1" :content="$t('home.minerRanks.tipsByPower.powerIncrease')" />
                </div>
              </th>
            </tr>
            <tr v-if="type === 1">
              <th class="w-1/10">
                {{ $t('home.minerRanks.tableHeadersByBlock.rank') }}
              </th>
              <th class="w-1/10">
                {{ $t('home.minerRanks.tableHeadersByBlock.miner') }}
              </th>
              <th class="w-1/10">
                {{ $t('home.minerRanks.tableHeadersByBlock.tag') }}
              </th>
              <th class="w-7/25">
                {{ $t('home.minerRanks.tableHeadersByBlock.blockNums') }}
              </th>
              <th class="w-7/50">
                <div class="flex justify-center items-center">
                  {{ $t('home.minerRanks.tableHeadersByBlock.luckyValue') }}
                  <Tip class="ml-1" :content="$t('home.minerRanks.tipsByBlock.luckyValue')" />
                </div>
              </th>
              <th class="w-7/50">
                {{ $t('home.minerRanks.tableHeadersByBlock.totalRewards') }}
              </th>
              <th class="w-7/50">
                <div class="flex justify-center items-center">
                  {{ $t('home.minerRanks.tableHeadersByBlock.rewardsRatio') }}
                  <Tip class="ml-1" :content="$t('home.minerRanks.tipsByBlock.rewardsRatio')" />
                </div>
              </th>
            </tr>
            <tr v-if="type === 2">
              <th class="w-1/10">
                {{ $t('home.minerRanks.tableHeadersByPowerDelta.rank') }}
              </th>
              <th class="w-1/10">
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
              <th class="w-7/50">
                <div class="flex justify-center items-center">
                  {{ $t('home.minerRanks.tableHeadersByPowerDelta.equivalentMiners') }}
                  <Tip class="ml-1" :content="$t('home.minerRanks.tipsByPowerDelta.equivalentMiners')" />
                </div>
              </th>
              <th class="w-7/50">
                <div class="flex justify-center items-center">
                  {{ $t('home.minerRanks.tableHeadersByPowerDelta.powerDelta') }}
                  <Tip class="ml-1" :content="$t('home.minerRanks.tipsByPowerDelta.powerDelta')" />
                </div>
              </th>
              <th class="w-7/50">
                {{ $t('home.minerRanks.tableHeadersByPowerDelta.validPower') }}
              </th>
            </tr>
          </thead>
          <tbody v-if="type===0" class="text-sm text-center">
            <tr
              v-for="(miner, index) in topMinersByPower.miners"
              :key="index"
              class="border-b border-background h-10"
            >
              <td>
                <RankIndex :index="page * pageSize + index + 1" />
              </td>
              <td>
                <AddressLink :id="miner.address" :format="10" />
              </td>
              <td>
                <MinerTag :tag="miner.tag" />
              </td>
              <td>
                <div class="flex items-center">
                  <el-progress v-if="page === 0" :percentage="miner.qualityAdjPower/topMinersByPower.miners[0].qualityAdjPower * 100" :show-text="false" class="flex w-1/2 ml-8 mr-3" />
                  <div class="flex" :class="{'mx-auto': page > 0}">
                    {{ miner.qualityAdjPower | size_metric(2) }}
                  </div>
                </div>
              </td>
              <td>{{ (miner.qualityAdjPower/topMinersByPower.totalQualityAdjPower * 100).toFixed(2) + '%' }}</td>
              <td>{{ miner.totalRewards | filecoin(2) }}</td>
              <td>{{ miner.rewardPerByte * 2 ** 40 * 3456 | filecoinOnAvg(2) }}</td>
              <td>{{ miner.qualityAdjPowerDelta | size_metric(2) }}</td>
            </tr>
          </tbody>
          <tbody v-if="type===1" class="text-sm text-center">
            <tr
              v-for="(miner, index) in topMinersByBlocks.miners"
              :key="index"
              class="border-b border-background h-10"
            >
              <td>
                <rankIndex :index="page * pageSize + index+1" />
              </td>
              <td>
                <AddressLink :id="miner.address" :format="10" />
              </td>
              <td>
                <MinerTag :tag="miner.tag" />
              </td>
              <td>
                <div class="flex items-center justify-end">
                  <el-progress
                    v-if="page === 0"
                    :percentage="miner.weightedBlocksMined/topMinersByBlocks.miners[0].weightedBlocksMined * 100"
                    :show-text="false"
                    class="flex w-1/2 ml-8 mr-3"
                  />
                  <div class="flex" :class="{'mx-auto': page > 0, 'w-1/4': page == 0}">
                    {{ miner.weightedBlocksMined }}
                  </div>
                </div>
              </td>
              <td>{{ (miner.luckyValue * 100).toFixed(2) }}%</td>
              <td>{{ miner.totalRewards | filecoin(2) }}</td>
              <td>{{ (miner.totalRewards/topMinersByBlocks.totalRewards * 100) .toFixed(2) }}%</td>
            </tr>
          </tbody>
          <tbody v-if="type===2" class="text-sm text-center">
            <tr
              v-for="(miner, index) in topMinersByPowerDelta.miners"
              :key="index"
              class="border-b border-background h-10"
            >
              <td>
                <rankIndex :index="page * pageSize + index+1" />
              </td>
              <td>
                <AddressLink :id="miner.address" :format="10" />
              </td>
              <td>
                <MinerTag :tag="miner.tag" />
              </td>
              <td>
                <div class="flex items-center">
                  <el-progress
                    v-if="page === 0"
                    :percentage="miner.qualityAdjPowerDelta/topMinersByPowerDelta.miners[0].qualityAdjPowerDelta * 100"
                    :show-text="false"
                    class="flex w-1/2 ml-8 mr-3"
                  />
                  <div class="flex" :class="{'mx-auto': page > 0}">
                    {{ (miner.qualityAdjPowerDelta / convertedDurationByDay / topMinersByPowerDelta.durationPercentage) | size_metric(2) }} / {{ $t('shared.time.day') }}
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
      <div class="flex items-center text-center h-16">
        <el-pagination
          layout="prev, pager, next"
          :page-count="totalPageCount"
          :current-page="page + 1"
          class="mx-auto"
          @current-change="didCurrentPageChanged"
        />
      </div>
    </div>
  </div>
</template>

<script>
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
      type: 0,
      duration: '24h',
      page: 0
    }
  },
  computed: {
    totalPageCount() {
      if (this.type === 0) {
        return this.topMinersByPower == null
          ? 0
          : Math.ceil(this.topMinersByPower.totalCount / this.pageSize)
      } else if (this.type === 1) {
        return this.topMinersByBlocks.miners == null
          ? 0
          : Math.ceil(this.topMinersByBlocks.totalCount / this.pageSize)
      } else {
        return this.topMinersByPowerDelta.miners == null
          ? 0
          : Math.ceil(this.topMinersByPowerDelta.totalCount / this.pageSize)
      }
    },
    convertedDurationByDay() {
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
  methods: {
    didRankTypeSwitched(e, type) {
      this.type = type
      this.page = 0
      switch (type) {
        case 0:
          this.$emit('updateTopMinersByPower', this.pageSize, this.page)
          break
        case 1:
          this.$emit('updateTopMinersByBlocks', this.pageSize, this.page, this.duration)
          break
        case 2:
          this.$emit('updateTopMinersByPowerDelta', this.pageSize, this.page, this.duration)
          break
        default:
          break
      }
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
    didDurationSwitched() {
      this.page = 0
      if (this.type === 1) {
        this.$emit('updateTopMinersByBlocks', this.pageSize, this.page, this.duration)
      } else if (this.type === 2) {
        this.$emit('updateTopMinersByPowerDelta', this.pageSize, this.page, this.duration)
      }
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      switch (this.type) {
        case 0:
          this.$emit('updateTopMinersByPower', this.pageSize, this.page)
          break
        case 1:
          this.$emit('updateTopMinersByBlocks', this.pageSize, this.page, this.duration)
          break
        case 2:
          this.$emit('updateTopMinersByPowerDelta', this.pageSize, this.page, this.duration)
          break
        default:
          break
      }
    }
  }
}
</script>
