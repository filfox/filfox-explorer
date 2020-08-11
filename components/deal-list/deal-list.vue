<template>
  <div class="container mx-auto">
    <div class="mt-6 font-medium text-base">
      {{ $t('blockchain.dealList.title') }}
    </div>
    <div class="w-full bg-white rounded-md mt-4 mb-4">
      <div class="flex flex-row items-center justify-between border-b border-background">
        <p class="flex ml-4 h-12 items-center text-sm">
          {{ $t('blockchain.dealList.info.total') + ' ' + total + ' ' + $t('blockchain.dealList.info.deals') }}
        </p>
        <el-input
          v-model="searchText"
          size="mini"
          suffix-icon="el-icon-search"
          :clearable="true"
          :placeholder="$t('blockchain.dealList.searchPlaceHolder')"
          class="flex mr-4 w-1/3"
          @keyup.enter.native="search"
        />
      </div>
      <table v-if="!loading" class="w-full table-fixed mt-2">
        <thead class="text-gray-600 text-sm">
          <tr class="h-8">
            <th class="table-header w-1/12">
              {{ $t('blockchain.dealList.tableHeaders.id') }}
            </th>
            <th class="table-header w-1/6">
              {{ $t('blockchain.dealList.tableHeaders.createdTime') }}
            </th>
            <th class="table-header w-1/6">
              {{ $t('blockchain.dealList.tableHeaders.client') }}
            </th>
            <th class="table-header w-1/6">
              {{ $t('blockchain.dealList.tableHeaders.provider') }}
            </th>
            <th class="table-header w-1/8">
              {{ $t('blockchain.dealList.tableHeaders.size') }}
            </th>
            <th class="table-header w-1/12">
              {{ $t('blockchain.dealList.tableHeaders.verifiedDeal') }}
            </th>
            <th class="table-header w-1/8">
              {{ $t('blockchain.dealList.tableHeaders.storagePrice') }}
            </th>
            <th class="table-header w-1/12">
              {{ $t('blockchain.dealList.tableHeaders.status') }}
            </th>
          </tr>
        </thead>
        <tbody class="text-center text-sm">
          <tr v-for="(deal, index) in dealList.deals" :key="index" class="border-b border-background h-10">
            <td>
              <div class="flex items-center justify-center">
                <DealLink :id="deal.id" class="text-sm" />
                <DealVerifiedIcon v-if="deal.verifiedDeal" :content="$t('blockchain.dealList.verifiedTips')" class="ml-1" />
              </div>
            </td>
            <td>
              {{ deal.timestamp | timestamp('datetime') }}
            </td>
            <td class="text-sm">
              <div class="flex items-center flex-row justify-center">
                <AddressLink :id="deal.client" :format="6" />
                <MinerTag v-if="deal.clientTag" :tag="deal.clientTag" :type="1" />
              </div>
            </td>
            <td>
              <div class="flex items-center flex-row justify-center">
                <AddressLink :id="deal.provider" />
                <MinerTag v-if="deal.providerTag" :tag="deal.providerTag" :type="1" />
              </div>
            </td>
            <td> {{ deal.pieceSize | size_metric(2) }} </td>
            <td> {{ deal.verifiedDeal }} </td>
            <td> {{ deal.storagePrice | filecoin(8) }} </td>
            <td> {{ deal.status ? deal.status : 'N/A' }} </td>
          </tr>
        </tbody>
      </table>
      <div v-if="loading" v-loading="loading" class="flex h-24"></div>
      <div class="flex items-center text-center h-16">
        <el-pagination
          layout="prev, pager, next"
          :page-count="totalPageCount"
          :current-page="page+1"
          class="mx-auto"
          @current-change="didCurrentPageChanged"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 0,
      pageSize: 20,
      loading: false,
      dealList: {},
      total: 0,
      searchText: '',
      searchedText: ''
    }
  },
  computed: {
    totalPageCount() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  watch: {
    // Just request when user press `enter`. Don't watch searchText then directly request.
    searchText() {
      if (!this.searchText) {
        this.page = 0
        this.searchedText = ''
        this.getDealList()
      }
    }
  },
  mounted() {
    this.getDealList()
  },
  methods: {
    getDealList() {
      this.loading = true
      const params = { pageSize: this.pageSize, page: this.page }
      if (this.searchedText) {
        params.address = this.searchedText
      }
      this.$axios
        .get('/deal/list', { params })
        .then(res => {
          this.dealList = res.data
          this.total = this.dealList.totalCount
          this.loading = false
        })
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      this.getDealList()
    },
    async search() {
      const address = this.searchText.trim()
      if (!address) {
        return
      }
      this.page = 0
      this.loading = true
      const params = { address, pageSize: this.pageSize, page: this.page }
      const result = await this.$axios.$get('/deal/list', { params })
      this.dealList = result
      this.total = this.dealList.totalCount
      this.loading = false
      this.searchedText = this.searchText
    }
  }
}
</script>

<style lang="postcss" scoped>
  .table-header {
    @apply sticky top-0 bg-white z-30;
  }
</style>
