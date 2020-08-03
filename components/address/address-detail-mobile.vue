<template>
  <div class="bg-white">
    <div class="flex font-medium text-sm pl-4 py-3 border-b border-background">
      {{ $t('detail.address.normal.headers.overview') }}
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.address') }}
      </p>
      <AddressLink :id="addressData.address" class="flex w-3/4" />
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        ID
      </p>
      <p class="flex w-3/4">
        {{ addressData.alias }}
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.actor') }}
      </p>
      <p class="flex w-3/4">
        {{ $t(`actor.${addressData.actor}`) }}
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.balance') }}
      </p>
      <p class="flex w-3/4">
        {{ addressData.balance | filecoin }}
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.messages') }}
      </p>
      <p class="flex w-3/4">
        {{ addressData.messageCount }}
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.createTime') }}
      </p>
      <p class="flex w-3/4">
        {{ addressData.createTimestamp | timestamp('datetime') }}
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.lastSeenTime') }}
      </p>
      <p class="flex w-3/4">
        {{ addressData.lastSeenTimestamp | timestamp('datetime') }}
      </p>
    </div>

    <div v-if="addressData.ownedMiners.length > 0" class="flex justify-between text-xs mx-4 mt-2">
      <p class="w-1/4">
        {{ $t('detail.address.normal.headers.ownedMiners') }}
      </p>
      <div class="w-3/4">
        <p v-for="ownedMiner in addressData.ownedMiners" :key="ownedMiner" class="flex text-main pb-1">
          <AddressLink :id="ownedMiner" />
        </p>
      </div>
    </div>

    <div v-if="addressData.workerMiners.length > 0" class="flex justify-between text-xs mx-4 mt-2">
      <p class="w-1/4">
        {{ $t('detail.address.normal.headers.workers') }}
      </p>
      <div class="w-3/4">
        <p v-for="worker in addressData.workerMiners" :key="worker" class="pb-1 flex text-main">
          <AddressLink :id="worker" />
        </p>
      </div>
    </div>

    <div v-loading="loading" class="mt-2 pt-3 bg-white border-t border-background">
      <div class="flex h-10 items-center mb-3 justify-center">
        <el-radio-group v-model="listType" size="mini" fill="#1a4fc9" @change="didListTypeChanged">
          <el-radio-button :label="0">
            {{ $t('blockchain.message.title') }}
          </el-radio-button>
          <el-radio-button :label="1">
            {{ $t('detail.transfer.title') }}
          </el-radio-button>
        </el-radio-group>
      </div>
      <AddressMessageListMobile v-if="listType === 0" :address="addressData.address" />
      <div v-if="listType === 1">
        <div class="flex items-center justify-between pb-1 mb-2">
          <p class="flex ml-3 h-8 items-center text-xs">
            {{ $t('detail.address.miner.blockList.total') + ' ' + total + ' ' + $t('detail.transfer.transaction') }}
          </p>
        </div>

        <div v-for="(transfer, index) in transferList.transfers" :key="index" class="rounded-sm mx-3 mb-3 shadow bg-white py-2">
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
            <div class="flex items-center flex-row justify-end">
              <AddressLink v-if="transfer.from" :id="transfer.from" :format="4" class="text-xs text-main" />
              <span v-else class="text-xs text-gray-800"> N/A </span>
              <MinerTag v-if="transfer.fromTag" :tag="transfer.fromTag" :type="2" />
            </div>
          </div>
          <div class="flex items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('detail.transfer.tableHeaders.to') }}:
            </p>
            <div class="flex items-center flex-row justify-end">
              <AddressLink v-if="transfer.to" :id="transfer.to" :format="4" class="text-xs text-main" />
              <span v-else class="text-xs text-gray-800"> N/A </span>
              <MinerTag v-if="transfer.toTag" :tag="transfer.toTag" :type="2" />
            </div>
          </div>
          <div class="flex items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('detail.transfer.tableHeaders.income') }}:
            </p>
            <p class="text-xs text-gray-800">
              {{ transfer.value | filecoin(2) }}
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
      </div>
      <div v-if="listType != 0" class="flex items-center text-center h-16 bg-white">
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
  </div>
</template>

<script>
export default {
  props: {
    addressData: { type: Object, required: true }
  },
  data() {
    return {
      listType: 0,
      transferList: {},
      page: 0,
      pageSize: 3,
      totalPageCount: 0,
      loading: false,
      total: 0
    }
  },
  methods: {
    async getTransferList() {
      this.loading = true
      const params = { pageSize: this.pageSize, page: this.page }
      this.transferList = await this.$axios.$get(`/address/${this.addressData.address}/transfers`, { params })
      this.loading = false
      this.total = this.transferList.totalCount
      this.getTotalPageCount()
    },
    getTotalPageCount() {
      this.totalPageCount = Math.ceil(this.total / this.pageSize)
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      if (this.listType === 1) {
        this.getTransferList()
      }
    },
    didListTypeChanged() {
      this.page = 0
      this.totalPageCount = 1
      this.total = 0
      if (this.listType === 1) {
        this.getTransferList()
      }
    }
  }
}
</script>
