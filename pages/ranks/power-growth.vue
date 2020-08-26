<template>
  <div class="bg-white">
    <div class="lg:hidden">
      <div v-if="loading" v-loading="loading" class="bg-white h-16"></div>

      <template v-else>
        <div v-for="(miner, index) in topMiners.miners" :key="index" class="rounded-sm mx-3 mb-3 py-px shadow bg-white">
          <div class="flex items-center text-xs my-2 ml-1">
            <RankIndex :index="page * pageSize + index+1" :class="{'mb-1':page * pageSize + index < 3}" class="ml-1" />
            <AddressLink :id="miner.address" :format="4" class="ml-2" />
            <MinerTag v-if="miner.tag" :tag="miner.tag" :type="2" />
          </div>
          <div class="flex justify-between my-1 mx-2 text-xs">
            <p>
              {{ $t('home.minerRanks.tableHeadersByPowerDelta.powerIncreaseSpeed') }}:
              {{ (miner.qualityAdjPowerGrowth / durationDays / topMiners.durationPercentage) | size_metric(2) }}
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
              {{ $t('home.minerRanks.tableHeadersByPowerDelta.powerDelta') }}:
              {{ miner.qualityAdjPowerDelta | size_metric(2) }}
            </p>
            <p>
              {{ $t('home.minerRanks.tableHeadersByPowerDelta.validPower') }}:
              {{ miner.qualityAdjPower | size_metric(2) }}
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
            <th class="w-1/10">
              {{ $t('home.minerRanks.tableHeadersByPowerDelta.location') }}
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
              <div class="flex items-center justify-end">
                <el-progress
                  :percentage="miner.qualityAdjPowerGrowth / topMiners.miners[0].qualityAdjPowerGrowth * 100"
                  :show-text="false"
                  class="flex w-1/2 mx-1 mr-3"
                />
                <div class="flex w-1/3">
                  {{ (miner.qualityAdjPowerGrowth / durationDays / topMiners.durationPercentage) | size_metric(2) }}
                  /
                  {{ $t('shared.time.day') }}
                </div>
              </div>
            </td>
            <td>{{ miner.equivalentMiners.toFixed(2) }}</td>
            <td>{{ miner.qualityAdjPowerDelta | size_metric(2) }}</td>
            <td>{{ miner.qualityAdjPower | size_metric(2) }}</td>
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

export default {
  props: {
    duration: { type: String, required: true },
    continent: { type: String, default: null }
  },
  async asyncData({ $axios, error }) {
    try {
      const topMiners = await $axios.$get('/miner/list/power-growth', { params: { pageSize: 20, page: 0, duration: '24h' } })
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
      loading: false
    }
  },
  computed: {
    totalPageCount() {
      return Math.ceil(this.topMiners.totalCount / this.pageSize)
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
      this.getMinerList()
    },
    continent() {
      this.page = 0
      this.getMinerList()
    }
  },
  methods: {
    async getMinerList() {
      this.loading = true
      const params = this.continent === 'All' ? { pageSize: this.pageSize, page: this.page, duration: this.duration } : { pageSize: this.pageSize, page: this.page, duration: this.duration, continent: this.continent }
      this.topMiners = await this.$axios.$get('/miner/list/power-growth', { params })
      this.loading = false
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      this.getMinerList()
    }
  }
}
</script>
