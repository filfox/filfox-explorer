<template>
  <div class="bg-white">
    <div class="flex py-3 pl-4 text-sm font-medium border-b border-background">
      {{ $t('detail.address.normal.headers.overview') }}
    </div>

    <div class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.address') }}
      </p>
      <AddressLink :id="addressData.address" plain class="flex w-3/4" />
      <AddressTag v-if="addressData.address[1] === '0'" :tag="addressData.tag" type="mobile" :style="{maxWidth:'66%'}" />
    </div>

    <div v-if="addressData.address[1] !== '0'" class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        ID
      </p>
      <div v-if="addressData.id" class="flex w-3/4">
        <AddressLink :id="addressData.id" plain />
        <AddressTag :tag="addressData.tag" type="mobile" :style="{maxWidth:'66%'}" />
      </div>
      <div v-else class="flex w-3/4">
        --
      </div>
    </div>

    <div class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.actor') }}
      </p>
      <p v-if="addressData.actor" class="flex w-3/4">
        {{ $t(`actor.${addressData.actor}`) }}
      </p>
      <p v-else-if="addressData.ethAddress" class="flex w-3/4">
        {{ $t(`actor.created`) }}
      </p>
      <p v-else class="flex w-3/4">
        {{ $t(`actor.account`) }}
      </p>
    </div>

    <div class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.balance') }}
      </p>
      <p class="flex w-3/4">
        {{ (addressData.balance || 0) | filecoin }}
      </p>
    </div>

    <div class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.messages') }}
      </p>
      <p class="flex w-3/4">
        {{ addressData.messageCount || 0 }}
      </p>
    </div>

    <div class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.createTime') }}
      </p>
      <p v-if="addressData.createTimestamp" class="flex w-3/4">
        {{ addressData.createTimestamp | timestamp('datetime') }}
      </p>
      <p v-else class="flex w-3/4">
        --
      </p>
    </div>

    <div v-if="addressData.deleteTimestamp" class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        Delete Time
      </p>
      <p class="flex w-3/4">
        {{ addressData.deleteTimestamp | timestamp('datetime') }}
      </p>
    </div>

    <div class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.lastSeenTime') }}
      </p>
      <p v-if="addressData.lastSeenTimestamp" class="flex w-3/4">
        {{ addressData.lastSeenTimestamp | timestamp('datetime') }}
      </p>
      <p v-else class="flex w-3/4">
        --
      </p>
    </div>

    <div v-if="addressData.ownedMiners && addressData.ownedMiners.length > 0" class="flex justify-between mx-4 mt-2 text-xs">
      <p class="w-1/4">
        {{ $t('detail.address.normal.headers.ownedMiners') }}
      </p>
      <div class="w-3/4">
        <div v-for="ownedMiner in addressData.ownedMiners" :key="ownedMiner" class="flex pb-1 text-main">
          <AddressLink :id="ownedMiner" />
        </div>
      </div>
    </div>

    <div v-if="addressData.workerMiners && addressData.workerMiners.length > 0" class="flex justify-between mx-4 mt-2 text-xs">
      <p class="w-1/4">
        {{ $t('detail.address.normal.headers.workers') }}
      </p>
      <div class="w-3/4">
        <div v-for="worker in addressData.workerMiners" :key="worker" class="flex pb-1 text-main">
          <AddressLink :id="worker" />
        </div>
      </div>
    </div>

    <div v-if="addressData.benefitedMiners && addressData.benefitedMiners.length > 0" class="flex justify-between mx-4 mt-2 text-xs">
      <p class="w-1/4">
        {{ $t('detail.address.normal.headers.benefitedMiners') }}
      </p>
      <div class="w-3/4">
        <div v-for="worker in addressData.benefitedMiners" :key="worker" class="flex pb-1 text-main">
          <AddressLink :id="worker" />
        </div>
      </div>
    </div>

    <AddressBalanceDetailChart v-if="addressData.id" :address-data="addressData" />

    <div v-loading="loading" class="pt-3 mt-2 bg-white border-t border-background">
      <div class="flex items-center justify-center h-10 mb-3">
        <el-radio-group v-model="listType" size="mini" fill="#1a4fc9" @change="didListTypeChanged">
          <el-radio-button :label="0">
            {{ $t('blockchain.message.title') }}
          </el-radio-button>
          <el-radio-button :label="1">
            {{ $t('detail.transfer.title') }}
          </el-radio-button>
          <el-radio-button v-if="addressData.actor == 'evm'" :label="2">
            {{ $t('detail.contract.title') }}
          </el-radio-button>
        </el-radio-group>
      </div>
      <AddressMessageListMobile v-if="listType === 0" :address="addressData.address" />
      <div v-if="listType === 1">
        <div class="flex items-center justify-between pb-1 mb-2">
          <p class="flex items-center h-8 ml-3 text-xs">
            {{ $t('detail.address.miner.blockList.total') + ' ' + total + ' ' + $t('detail.transfer.transaction') }}
          </p>
          <TransferTypeSelect
            v-model="trans"
            :methods="transferList.types"
            :el-select-options="{size: 'mini'}"
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
              <AddressTag :tag="transfer.fromTag" type="mobile" :style="{maxWidth:'66%'}" />
            </div>
          </div>
          <div class="flex items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('detail.transfer.tableHeaders.to') }}:
            </p>
            <div class="flex flex-row items-center justify-end">
              <AddressLink v-if="transfer.to" :id="transfer.to" :format="4" class="text-xs text-main" />
              <span v-else class="text-xs text-gray-800"> N/A </span>
              <AddressTag :tag="transfer.toTag" type="mobile" :style="{maxWidth:'66%'}" />
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
      </div>
      <div v-if="listType != 0 && listType != 2" class="flex items-center h-16 text-center bg-white">
        <el-pagination
          layout="prev, pager, next"
          :page-count="totalPageCount"
          :pager-count="5"
          :current-page="page + 1"
          class="mx-auto"
          @current-change="didCurrentPageChanged"
        />
      </div>
      <ContractCode v-if="listType === 2" :address="addressData.address" />
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
      trans: 'All',
      transferList: {
        totalCount: 0,
        transfers: [],
        types: []
      },
      page: 0,
      pageSize: 3,
      loading: false,
      total: 0
    }
  },
  computed: {
    totalPageCount() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  watch: {
    trans() {
      this.page = 0
      this.getTransferList()
    }
  },
  methods: {
    async getTransferList() {
      if (this.addressData.id == null || this.addressData.id === undefined) {
        return
      }
      this.loading = true
      const params = { pageSize: this.pageSize, page: this.page }
      if (this.trans !== 'All') {
        params.type = this.trans
      }
      this.transferList = await this.$axios.$get(`/address/${this.addressData.address}/transfers`, { params })
      this.loading = false
      this.total = this.transferList.totalCount
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      if (this.listType === 1) {
        this.getTransferList()
      }
    },
    didListTypeChanged() {
      this.page = 0
      this.total = 0
      if (this.listType === 1) {
        this.getTransferList()
      }
    }
  }
}
</script>
