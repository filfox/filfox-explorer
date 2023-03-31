<template>
  <div class="pt-6">
    <div class="flex items-center text-base">
      <span class="mr-2 font-medium">{{ $t('detail.address.normal.title') }}</span>
      <AddressLink :id="addressData.address" />
      <AddressTag :tag="addressData.tag" type="pc" :style="{maxWidth:'66%'}" />
      <MinerAppGuide />
    </div>

    <div class="flex pb-2 my-4">
      <div class="flex-1 mr-4 text-sm bg-white rounded-md">
        <div class="flex py-4 pl-8 font-medium border-b border-background">
          {{ $t('detail.address.normal.headers.overview') }}
        </div>

        <dl class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.address') }}
          </dt>
          <dd class="mr-4">
            <AddressLink :id="addressData.address" plain />
          </dd>
        </dl>

        <dl v-if="addressData.address[1] !== '0'" class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            ID
          </dt>
          <dd v-if="addressData.id" class="mr-4">
            <AddressLink :id="addressData.id" plain />
          </dd>
          <dd v-else class="mr-4">
            --
          </dd>
        </dl>

        <dl v-if="addressData.ethAddress" class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.ethAddress') }}
          </dt>
          <dd class="mr-4">
            <AddressLink :id="addressData.ethAddress" plain />
          </dd>
        </dl>

        <dl v-if="addressData.robustAddress" class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.robustAddress') }}
          </dt>
          <dd class="mr-4">
            <AddressLink :id="addressData.robustAddress" plain />
          </dd>
        </dl>

        <dl class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.actor') }}
          </dt>
          <dd v-if="addressData.actor" class="mr-4">
            {{ $t(`actor.${addressData.actor}`) }}
          </dd>
          <dd v-else-if="addressData.ethAddress" class="mr-4">
            {{ $t(`actor.created`) }}
          </dd>
          <dd v-else class="mr-4">
            {{ $t(`actor.account`) }}
          </dd>
        </dl>

        <dl class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.balance') }}
          </dt>
          <dd class="mr-4">
            {{ (addressData.balance || 0) | filecoin }}
          </dd>
        </dl>

        <dl class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.messages') }}
          </dt>
          <dd class="mr-4">
            {{ addressData.messageCount || 0 }}
          </dd>
        </dl>

        <dl class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.createTime') }}
          </dt>
          <dd v-if="addressData.createTimestamp" class="mr-4">
            {{ addressData.createTimestamp | timestamp('datetime') }}
          </dd>
          <dd v-else class="mr-4">
            --
          </dd>
        </dl>

        <dl v-if="addressData.deleteTimestamp" class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.createTime') }}
          </dt>
          <dd class="mr-4">
            {{ addressData.deleteTimestamp | timestamp('datetime') }}
          </dd>
        </dl>

        <dl class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.lastSeenTime') }}
          </dt>
          <dd v-if="addressData.lastSeenTimestamp" class="mr-4">
            {{ addressData.lastSeenTimestamp | timestamp('datetime') }}
          </dd>
          <dd v-else class="mr-4">
            --
          </dd>
        </dl>

        <dl v-if="addressData.ownedMiners && addressData.ownedMiners.length > 0" class="flex items-center my-2">
          <dt class="items-center w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.ownedMiners') }}
          </dt>
          <dd class="flex flex-wrap flex-1 text-main">
            <p v-for="ownedMiner in addressData.ownedMiners" :key="ownedMiner" class="mr-4">
              <AddressLink :id="ownedMiner" />
            </p>
          </dd>
        </dl>

        <dl v-if="addressData.workerMiners && addressData.workerMiners.length > 0" class="flex items-center my-2">
          <dt class="items-center w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.workers') }}
          </dt>
          <dd class="flex flex-wrap flex-1 text-main">
            <p v-for="worker in addressData.workerMiners" :key="worker" class="mr-4">
              <AddressLink :id="worker" />
            </p>
          </dd>
        </dl>

        <dl v-if="addressData.benefitedMiners && addressData.benefitedMiners.length > 0" class="flex items-center my-2">
          <dt class="items-center w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.benefitedMiners') }}
          </dt>
          <dd class="flex flex-wrap flex-1 text-main">
            <p v-for="worker in addressData.benefitedMiners" :key="worker" class="mr-4">
              <AddressLink :id="worker" />
            </p>
          </dd>
        </dl>
      </div>
      <a target="_blank" :href="$i18n.locale === 'zh'? 'https://foxwallet.com/zh?invite=evkZv8g5TG' : 'https://foxwallet.com/en?invite=evkZv8g5TG'" class="inline-block h-68">
        <img src="@/assets/img/foxwallet/address-portal.png" draggable="false" class="block h-full border border-gray-500 border-dashed">
      </a>
    </div>

    <AddressBalanceDetailChart v-if="addressData.id" :address-data="addressData" />

    <div class="pt-4 my-4 bg-white rounded-md">
      <div class="flex items-center h-12 ml-8">
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
          <el-radio-button v-if="addressData.actor == 'evm'" :label="3">
            {{ $t('detail.eventLogs.title') }}
          </el-radio-button>
        </el-radio-group>
      </div>
      <AddressMessageList v-if="listType === 0" :address="addressData.address" />
      <div v-if="listType === 1" class="mx-8">
        <div class="flex items-center justify-between border-b border-background">
          <p class="flex items-center h-12 text-sm">
            {{ $t('detail.transfer.total') }}
            {{ total }}
            {{ $t('detail.transfer.transaction') }}
          </p>
          <TransferTypeSelect
            v-model="trans"
            :methods="transferList.types"
            :el-select-options="{size: 'mini'}"
          />
        </div>
        <table v-if="!loading" class="w-full table-fixed">
          <thead class="m-2 text-sm text-gray-600">
            <tr class="h-8">
              <th class="sticky top-0 z-10 bg-white w-1/8">
                {{ $t('detail.transfer.tableHeaders.time') }}
              </th>
              <th class="sticky top-0 z-10 w-1/4 bg-white">
                {{ $t('detail.transfer.tableHeaders.message') }}
              </th>
              <th class="sticky top-0 z-10 bg-white w-5/32">
                {{ $t('detail.transfer.tableHeaders.from') }}
              </th>
              <th class="sticky top-0 z-10 bg-white w-1/16">
              </th>
              <th class="sticky top-0 z-10 bg-white w-5/32">
                {{ $t('detail.transfer.tableHeaders.to') }}
              </th>
              <th class="sticky top-0 z-10 bg-white w-1/8">
                {{ $t('detail.transfer.tableHeaders.income') }}
              </th>
              <th class="sticky top-0 z-10 bg-white w-1/8">
                {{ $t('detail.transfer.tableHeaders.type') }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr
              v-for="(transfer, index) in transferList.transfers"
              :key="index"
              class="h-12 text-sm border-b border-background"
            >
              <td>
                {{ transfer.timestamp | timestamp('datetime') }}
              </td>
              <td>
                <MessageLink v-if="transfer.message" :id="transfer.message" :format="12" />
                <span v-else>N/A</span>
              </td>
              <td>
                <div class="flex flex-row items-center justify-center">
                  <AddressLink v-if="transfer.from" :id="transfer.from" :format="4" />
                  <span v-else>N/A</span>
                  <AddressTag :tag="transfer.fromTag" type="pc" :style="{maxWidth:'66%'}" />
                </div>
              </td>
              <td>
                <div class="flex justify-center">
                  <img src="~/assets/img/shared/to.svg" alt="3" class="w-4">
                </div>
              </td>
              <td>
                <div class="flex flex-row items-center justify-center">
                  <AddressLink v-if="transfer.to" :id="transfer.to" :format="4" />
                  <span v-else>N/A</span>
                  <AddressTag :tag="transfer.toTag" type="pc" :style="{maxWidth:'66%'}" />
                </div>
              </td>
              <td>
                {{ transfer.value | filecoin(4) }}
              </td>
              <td>
                {{ $t('detail.transfer.types.' + transfer.type ) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ContractCode v-if="listType === 2" :address="addressData.address" />
      <AddressEventLogs v-if="listType === 3" :address="addressData.address" />
      <div v-if="loading" v-loading="loading" class="flex h-24"></div>
      <div v-if="listType != 0 && listType != 2 && listType != 3" class="flex items-center h-16 text-center">
        <el-pagination
          layout="prev, pager, next, jumper"
          :page-count="totalPageCount"
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
      trans: 'All',
      transferList: {
        totalCount: 0,
        transfers: [],
        types: []
      },
      listType: 0,
      page: 0,
      pageSize: 20,
      loading: false,
      total: 0,
      eventLogs: {}
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
