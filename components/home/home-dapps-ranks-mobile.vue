<template>
  <div class="mb-4 pb-2 bg-white rounded-md">
    <div class="flex border-b border-background flex-col gap-2">
      <HomeTitle type="dappRanks" />
      <div class="text-sm ml-4 mb-4 flex justify-between">
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
    <div v-if="!dappListLoading" class="w-full mt-2">
      <div v-for="(dapp, index) in dappList.dappList" :key="index" class="border-background text-gray-600 text-sm px-4 grid grid-cols-2 gap-2">
        <span>{{ $t('home.dappRanks.tableHeaders.name') }}</span>
        <span class="text-right text-black">{{ dapp.name }}</span>
        <span>{{ $t('home.dappRanks.tableHeaders.category') }}</span>
        <span class="text-right text-black">{{ dapp.category }}</span>
        <span>{{ $t('home.dappRanks.tableHeaders.contractBalance') }}</span>
        <ChangeRate class="text-right text-black" :data="dapp.balance.data | filecoin(2)" :changeRate="dapp.balance.changeRate" />
        <span>{{ $t('home.dappRanks.tableHeaders.uniqueAdders') }}</span>
        <ChangeRate class="text-right text-black" :data="formatNum(dapp.userCount.data)" :changeRate="dapp.userCount.changeRate" />
        <span>{{ $t('home.dappRanks.tableHeaders.transactionAmount') }}</span>
        <ChangeRate class="text-right text-black" :data="formatNum(dapp.invokeCount.data)" :changeRate="dapp.invokeCount.changeRate" />
        <span>{{ $t('home.dappRanks.tableHeaders.transactionBalance') }}</span>
        <ChangeRate class="text-right text-black" :data="dapp.totalFee.data | filecoin(2)" :changeRate="dapp.totalFee.changeRate" />
        <div v-if="index < dappList.dappList.length-1" class="border-b col-span-2 mb-2"></div>
      </div>
    </div>
    <div v-if="dappListLoading" v-loading="dappListLoading" class="flex h-24"></div>
  </div>
</template>

<script>
import {formatNum} from '@/utils/dapp';

export default {
  mounted() {
    this.getDappList();
  },
  data() {
    return {
      sortValue: "",
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
          value: 'transactions',
          label: this.$t('home.dappRanks.tableFilterOptions.sort.transactionBalance')
        }
      ]
    }
  },
  methods: {
    formatNum,
    onSelect(value) {
      this.sortValue = value;
      this.getDappList({sort: value});
    },
    async getDappList(params={}) {
      this.dappListLoading = true
      this.dappList = await this.$axios.$get('https://filfox.info/api/xj/stats/dapp/list', { params: { ...params, limit: 10 }});
      this.dappListLoading = false
    }
  }
}
</script>
