<template>
  <div class="container mx-auto flex-grow">
    <div class="bg-white rounded my-4 flex justify-between p-3 flex-col lg:flex-row">
      <span class="font-bold mb-2 lg:mb-0">FEVM Dapp Stats</span>
      <div class="flex flex-col lg:flex-row gap-x-5 gap-y-2">
        <FilterSelect 
          :value="categoryValue"
          :label="$t('home.dappRanks.titleHeader.category')" 
          :options="categoryOptions" 
          @selected="selectCategory"
        />
        <FilterSelect 
          :value="sortValue"
          :label="$t('home.dappRanks.titleHeader.sortBy')" 
          :options="sortOptions" 
          @selected="selectSort"
        />
        <FilterSelect 
          :value="timeValue"
          :label="$t('home.dappRanks.titleHeader.time')" 
          :options="timeOptions" 
          @selected="selectTime"
        />
      </div>
    </div>
    <div v-if="dappListLoading" v-loading="dappListLoading" class="flex h-24"></div>
    <div :class="`flex flex-wrap gap-4 mt-5 ${dappListLoading ? 'hidden' : 'block'}`">
      <div v-for="item, index in dappList.dappList" :key="item.contractId" class="relative">
        <DappBlock :id="item.contractId" :name="item.name" :category="item.category" :data="item.balance.data | filecoin(2)" :icon="item.logoPath" :rank="(page-1)*pageNum+index+1"/>
        <img class="w-9 h-9 absolute top-0 right-0" :src="getMedalSrc((page-1)*pageNum+index+1)" :class="`${(page-1)*pageNum+index+1 <= 3 ? 'visible' : 'invisible'}`" />
      </div>
    </div>
    <div class="flex justify-between items-center">
      <span>Found something interesting? <a class="text-customBlue-300" href="https://docs.google.com/forms/d/e/1FAIpQLSciXwagRx-D8zeTCIEa9y2pwkoaDqNw2nPSk9bLYdQRsFm3Sw/viewform">Submit it here</a></span>
      <el-pagination 
        small 
        layout="prev, pager, next" 
        class="mt-5 mb-5" 
        :total="dappList.totalCount"
        :page-size="pageNum"
        @prev-click="prevPage"
        @next-click="nextPage"
      />
    </div>
  </div>
</template>

<script>
import { getMedalSrc, formatNum } from'@/utils/dapp';

export default {
  mounted() {
    this.getDappList();
    this.getCategoryOptions();
  },
  data() {
    return {
      dappList: {},
      pageNum: 16,
      page: 1,
      dappListLoading: false,
      categoryValue: "",
      categoryOptions: [],
      sortValue: "",
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
      ],
      timeValue: "",
      timeOptions: [
        {
          value: '1',
          label: this.$t('home.dappRanks.tableFilterOptions.time.day')
        },
        {
          value: '7',
          label: this.$t('home.dappRanks.tableFilterOptions.time.week')
        },
        {
          value: '30',
          label: this.$t('home.dappRanks.tableFilterOptions.time.month')
        },
        {
          value: '365',
          label: this.$t('home.dappRanks.tableFilterOptions.time.year')
        }
      ]
    }
  },
  methods: {
    getMedalSrc,
    formatNum,
    selectCategory(value) {
      this.categoryValue = value;
      this.getDappList();
    },
    selectSort(value) {
      this.sortValue = value;
      this.getDappList();
    },
    selectTime(value) {
      this.timeValue = value;
      this.getDappList();
    },
    async getDappList() {
      this.dappListLoading = true;
      let params = {
        limit: this.pageNum, 
        offset: (this.page-1)*this.pageNum
      };

      if(this.sortValue) {
        params = {...params, sortBy: this.sortValue}
      }

      if(this.categoryValue && this.categoryValue !== 'all') {
        params = {...params, category: this.categoryValue}
      }

      if(this.timeValue) {
        params = {...params, days: this.timeValue}
      }
      this.dappList = await this.$axios.$get('http://36.189.234.235:61000/stats/dapp/list', { params });
      this.dappListLoading = false
    },
    async getCategoryOptions() {
      const options = await this.$axios.$get('http://36.189.234.235:61000/dapp/category/list');
      let categoryOptions = [];
      if(options) {
        categoryOptions = options.map(item => {
          return {
            value: item.category,
            label: item.displayName
          }
        });
        categoryOptions.unshift({
          value: 'all',
          label: this.$t('home.dappRanks.tableFilterOptions.category.all')
        });
      }
      this.categoryOptions = categoryOptions;
    },
    nextPage() {
      this.page++;
      this.getDappList();
    },
    prevPage() {
      this.page--;
      this.getDappList();
    }
  }
}
</script>

<style lang="postcss">
.el-pager li {
  background: transparent;
}
</style>
