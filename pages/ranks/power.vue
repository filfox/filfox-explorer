<template>
  <div class="bg-white">
    <div class="lg:hidden">
      <div v-if="loading" v-loading="loading" class="bg-white h-16"></div>

      <template v-else>
        <div v-for="(miner, index) in topMiners.miners" :key="index" class="rounded-sm mx-3 mb-3 py-px shadow bg-white">
          <div class="flex items-center text-xs my-2 ml-1">
            <RankIndex :index="page * pageSize + index+1" :class="{'mb-1': page * pageSize + index < 3}" class="ml-1" />
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
              {{ miner.qualityAdjPower / topMiners.totalQualityAdjPower | percentage }}
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
    </div>

    <div class="hidden lg:block pt-3">
      <table v-loading="loading" class="w-full" :class="page === 0 ? 'table-fixed' : 'table-auto ml-4'">
        <thead class="text-gray-600 text-sm">
          <tr>
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
              {{ $t('home.minerRanks.tableHeadersByPower.validPower') }}
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
            <th class="w-1/10">
              {{ $t('home.minerRanks.tableHeadersByPower.location') }}
            </th>
          </tr>
        </thead>
        <tbody class="text-sm text-center">
          <tr
            v-for="(miner, index) in topMiners.miners"
            :key="index"
            class="border-b border-background h-10"
          >
            <td>
              <RankIndex :index="page * pageSize + index+1" />
            </td>
            <td>
              <AddressLink :id="miner.address" :format="10" />
            </td>
            <td>
              <MinerTag :tag="miner.tag" />
            </td>
            <td>
              <div class="flex items-center justify-center">
                <el-progress
                  :percentage="miner.qualityAdjPower / topMiners.miners[0].qualityAdjPower * 100"
                  :show-text="false"
                  class="flex w-1/2 pr-3"
                />
                <div>
                  {{ miner.qualityAdjPower | size_metric(2) }} / {{ miner.qualityAdjPower / topMiners.totalQualityAdjPower | percentage }}
                </div>
              </div>
            </td>
            <td>{{ miner.totalRewards | filecoin(2) }}</td>
            <td>{{ miner.rewardPerByte * 2 ** 40 * epochsInDay | filecoin(2) }}/TiB</td>
            <td>{{ miner.qualityAdjPowerDelta | size_metric(2) }}</td>
            <td>{{ miner.location ? miner.location[`${$i18n.locale}CountryName`] : 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

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
    duration: { type: String, required: true },
    continent: { type: String, default: null }
  },
  async asyncData({ $axios, error }) {
    try {
      const topMiners = await $axios.$get('/miner/list/power', { params: { pageSize: 20, page: 0 } })
      return { topMiners }
    } catch (err) {
      if (err?.response) {
        error({ code: err.response.status, message: err.response.statusText })
      } else {
        error({ code: 500, message: err.toString() })
      }
    }
  },
  data() {
    return {
      topMiners: {
        miners: [],
        totalCount: 0,
        totalQualityAdjPower: '0'
      },
      pageSize: 20,
      page: 0,
      epochsInDay,
      loading: false
    }
  },
  computed: {
    totalPageCount() {
      return Math.ceil(this.topMiners.totalCount / this.pageSize)
    }
  },
  watch: {
    continent() {
      this.page = 0
      this.getMinerList()
    }
  },
  methods: {
    async getMinerList() {
      this.loading = true
      const params = this.continent === 'All' ? { pageSize: this.pageSize, page: this.page } : { pageSize: this.pageSize, page: this.page, continent: this.continent }
      this.topMiners = await this.$axios.$get('/miner/list/power', { params })
      this.loading = false
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      this.getMinerList()
    }
  }
}
</script>
