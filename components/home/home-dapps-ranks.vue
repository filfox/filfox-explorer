<template>
  <div class="mb-4 pb-2 bg-white rounded-md">
    <div class="flex items-center justify-between border-b border-background">
      <HomeTitle type="dappRanks" />
      <div class="absolute right-0 text-sm">
        <FilterSelect
          class="mr-2.5"
          :value="sortValue"
          :label="$t('home.dappRanks.titleHeader.sortBy')"
          :options="sortOptions"
          @selected="onSelect"
        />
        <nuxt-link :to="localePath('/dapp')" class="mr-4">
          <el-button round size="mini">
            {{ $t('shared.more') }}
          </el-button>
        </nuxt-link>
      </div>
    </div>
    <table v-if="!dappListLoading" class="w-full table-fixed mt-2">
      <thead class="text-gray-600 text-sm">
        <tr>
          <th>{{ $t('home.dappRanks.tableHeaders.name') }}</th>
          <th>{{ $t('home.dappRanks.tableHeaders.category') }}</th>
          <th>{{ $t('home.dappRanks.tableHeaders.contractBalance') }}</th>
          <th>{{ $t('home.dappRanks.tableHeaders.uniqueAdders') }}</th>
          <th>{{ $t('home.dappRanks.tableHeaders.transactionAmount') }}</th>
          <th>{{ $t('home.dappRanks.tableHeaders.transactionBalance') }}</th>
        </tr>
      </thead>
      <tbody class="text-center text-sm">
        <tr v-for="(dapp, index) in dappList.dappList" :key="index" class="border-b border-background h-10">
          <td>
            <a>{{ dapp.name }}</a>
          </td>
          <td>
            <span>{{ dapp.category }}</span>
          </td>
          <td>
            <ChangeRate :data="dapp.balance.data | filecoin(2)" :change-rate="dapp.balance.changeRate" />
          </td>
          <td>
            <ChangeRate :data="formatNum(dapp.userCount.data)" :change-rate="dapp.userCount.changeRate" />
          </td>
          <td>
            <ChangeRate :data="formatNum(dapp.invokeCount.data)" :change-rate="dapp.invokeCount.changeRate" />
          </td>
          <td>
            <ChangeRate :data="dapp.totalFee.data | filecoin(2)" :change-rate="dapp.totalFee.changeRate" />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="dappListLoading" v-loading="dappListLoading" class="flex h-24"></div>
  </div>
</template>

<script>
import { formatNum } from '@/utils/dapp'
import { HOST } from '../../filecoin/filecoin.config'

export default {
  data() {
    return {
      sortValue: 'transaction',
      dappList: [],
      dappListLoading: false,
      sortOptions: [
        {
          value: 'users',
          label: this.$t('home.dappRanks.tableFilterOptions.sort.uniqueAdders')
        },
        {
          value: 'balance',
          label: this.$t('home.dappRanks.tableFilterOptions.sort.contractBalance')
        },
        {
          value: 'fee',
          label: this.$t('home.dappRanks.tableFilterOptions.sort.transactionBalance')
        },
        {
          value: 'transaction',
          label: this.$t('home.dappRanks.tableFilterOptions.sort.transactionAmount')
        }
      ]
    }
  },
  mounted() {
    this.getDappList()
  },
  methods: {
    formatNum,
    onSelect(value) {
      this.sortValue = value
      this.getDappList({ sortBy: value })
    },
    async getDappList(params = {}) {
      this.dappListLoading = true
      this.dappList = await this.$axios.$get(`${HOST}/api/xj/stats/dapp/list`, { params: { ...params, limit: 10 } })
      this.dappListLoading = false
    }
  }
}
</script>
