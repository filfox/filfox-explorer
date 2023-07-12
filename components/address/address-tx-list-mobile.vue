<template>
  <div>
    <div class="flex items-center justify-between pb-1 mb-2">
      <p class="flex items-center h-8 ml-3 text-xs">
        {{ $t('detail.address.miner.blockList.total') + ' ' + total + ' ' + $t('detail.transfer.transaction') }}
      </p>
      <TransferTypeSelect
        v-model="trans"
        :methods="transferList.types"
        :el-select-options="{ size: 'mini' }"
        class="mr-3"
      />
    </div>

    <div v-for="(transfer, index) in transferList.transfers" :key="index" class="py-2 mx-3 mb-3 bg-white rounded-sm shadow">
      <div class="flex items-center justify-between mx-3">
        <p class="text-xs text-gray-800">
          {{ $t('detail.transfer.tableHeaders.time') }}:
        </p>
        <p class="text-xs text-gray-800">
          {{ transfer.timestamp | timestamp('datetime') }}
        </p>
      </div>
      <div class="flex items-center justify-between mx-3 mt-1">
        <p class="text-xs text-gray-800">
          {{ $t('detail.transfer.tableHeaders.message') }} :
        </p>
        <MessageLink v-if="transfer.message" :id="transfer.message" :format="8" class="text-xs" />
        <span v-else class="text-xs text-gray-800"> N/A </span>
      </div>
      <div class="flex items-center justify-between mx-3 mt-1">
        <p class="text-xs text-gray-800">
          {{ $t('detail.transfer.tableHeaders.from') }}:
        </p>
        <div class="flex flex-row items-center justify-end">
          <AddressLink v-if="transfer.from" :id="transfer.from" :format="4" class="text-xs text-main" />
          <span v-else class="text-xs text-gray-800"> N/A </span>
          <AddressTag :tag="transfer.fromTag" type="mobile" :style="{ maxWidth:'66%' }" />
        </div>
      </div>
      <div class="flex items-center justify-between mx-3 mt-1">
        <p class="text-xs text-gray-800">
          {{ $t('detail.transfer.tableHeaders.to') }}:
        </p>
        <div class="flex flex-row items-center justify-end">
          <AddressLink v-if="transfer.to" :id="transfer.to" :format="4" class="text-xs text-main" />
          <span v-else class="text-xs text-gray-800"> N/A </span>
          <AddressTag :tag="transfer.toTag" type="mobile" :style="{ maxWidth:'66%' }" />
        </div>
      </div>
      <div class="flex items-center justify-between mx-3 mt-1">
        <p class="text-xs text-gray-800">
          {{ $t('detail.transfer.tableHeaders.income') }}:
        </p>
        <p class="text-xs text-gray-800">
          {{ transfer.value | filecoin(4) }}
        </p>
      </div>
      <div class="flex items-center justify-between mx-3 mt-1">
        <p class="text-xs text-gray-800">
          {{ $t('detail.transfer.tableHeaders.type') }}:
        </p>
        <p class="text-xs text-gray-800">
          {{ $t('detail.transfer.types.' + transfer.type ) }}
        </p>
      </div>
    </div>

    <div class="flex items-center text-center h-16">
      <el-pagination
        layout="prev, pager, next"
        class="mx-auto"
        :total="total"
        :pager-count="5"
        :page-size="pageSize"
        :current-page="page + 1"
        @current-change="p => page = p - 1"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      trans: 'All',
      transferList: {
        totalCount: 0,
        transfers: [],
        types: []
      },
      page: 0,
      total: 0,
      pageSize: 20,
      loading: false
    }
  },

  watch: {
    trans() {
      if (this.page === 0) return this.getTransferList()
      this.page = 0
    },

    page() {
      this.getTransferList()
    }
  },

  mounted() {
    this.getTransferList()
  },

  methods: {
    async getTransferList() {
      if (!this.address) return

      const params = { pageSize: this.pageSize, page: this.page }
      if (this.trans !== 'All') params.type = this.trans
      this.loading = true
      this.transferList = await this.$axios.$get(`/address/${this.address}/transfers`, { params })
      this.loading = false
      this.total = this.transferList.totalCount
    }
  }
}
</script>
