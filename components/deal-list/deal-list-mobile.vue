<template>
  <div class="bg-white overflow-hidden">
    <div class="border-b border-background pb-2 mt-1">
      <p class="text-sm ml-4 font-medium mt-4 mb-2">
        {{ $t('blockchain.dealList.title') }}
      </p>
      <div class="flex justify-between items-center">
        <p class="ml-4 text-xs">
          {{ $t('blockchain.dealList.info.total') }}
          {{ total }}
          {{ $t('blockchain.dealList.info.deals') }}
        </p>
      </div>
    </div>

    <div v-if="!loading" class="mt-2 text-xs">
      <div v-for="(deal, index) in dealList.deals" :key="index" class="rounded-sm mx-3 mb-3 shadow bg-white px-1">
        <div class="flex justify-between pt-2 mx-1 items-center">
          <p class="text-gray-500">
            {{ $t('blockchain.dealList.tableHeaders.id') }}
          </p>
          <div class="flex justify-end items-center">
            <DealLink :id="deal.id" class="text-main" />
            <DealVerifiedIcon v-if="deal.verifiedDeal" :content="$t('blockchain.dealList.verifiedTips')" class="ml-1" />
          </div>
        </div>

        <div class="flex justify-between pt-2 mx-1 items-center">
          <p class="text-gray-500">
            {{ $t('blockchain.dealList.tableHeaders.createdTime') }}
          </p>
          <p>
            {{ deal.timestamp | timestamp('datetime') }}
          </p>
        </div>

        <div class="flex flex-row justify-between pt-2 mx-1 items-center">
          <p class="text-gray-500">
            {{ $t('blockchain.dealList.tableHeaders.client') }}
          </p>
          <div class="flex items-center">
            <AddressLink :id="deal.client" :format="6" class="text-main" />
            <AddressTag :tag="deal.clientTag" type="mobile" class="ml-1" />
          </div>
        </div>

        <div class="flex justify-between pt-2 mx-1 items-center">
          <p class="text-gray-500">
            {{ $t('blockchain.dealList.tableHeaders.provider') }}
          </p>
          <div class="flex items-center">
            <AddressLink :id="deal.provider" class="text-main" />
            <AddressTag :tag="deal.providerTag" type="mobile" class="ml-1" />
          </div>
        </div>

        <div class="flex justify-between pt-2 mx-1 items-center">
          <p class="text-gray-500">
            {{ $t('blockchain.dealList.tableHeaders.size') }}
          </p>
          <p>
            {{ deal.pieceSize | size_metric(2) }}
          </p>
        </div>

        <div class="flex justify-between pt-2 mx-1 items-center">
          <p class="text-gray-500">
            {{ $t('blockchain.dealList.tableHeaders.verifiedDeal') }}
          </p>
          <p>
            {{ deal.verifiedDeal }}
          </p>
        </div>

        <div class="flex justify-between pt-2 mx-1 items-center">
          <p class="text-gray-500">
            {{ $t('blockchain.dealList.tableHeaders.storagePrice') }}
          </p>
          <p>
            {{ deal.storagePrice | filecoin(8) }}
          </p>
        </div>

        <div class="flex justify-between pt-2 pb-2 mx-1 items-center">
          <p class="text-gray-500">
            {{ $t('blockchain.dealList.tableHeaders.status') }}
          </p>
          <p>
            {{ deal.status || 'N/A' }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="loading" v-loading="loading" class="h-16"></div>

    <div class="flex items-center text-center h-16">
      <el-pagination
        layout="prev, pager, next"
        :page-count="totalPageCount"
        :pager-count="5"
        :current-page="page+1"
        class="mx-auto"
        @current-change="didCurrentPageChanged"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 0,
      pageSize: 5,
      loading: false,
      dealList: {},
      total: 0
    }
  },
  computed: {
    totalPageCount() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  mounted() {
    this.getDealList()
  },
  methods: {
    getDealList() {
      this.loading = true
      this.$axios
        .get('/deal/list', { params: { pageSize: this.pageSize, page: this.page } })
        .then(res => {
          this.dealList = res.data
          this.total = this.dealList.totalCount
          this.loading = false
        })
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      this.getDealList()
    }
  }
}
</script>
