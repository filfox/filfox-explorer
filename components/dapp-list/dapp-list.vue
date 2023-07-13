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
    <div role="status" :class="`text-center ${dappListLoading ? 'block' : 'hidden'}`">
      <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="blue" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    </div>
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
