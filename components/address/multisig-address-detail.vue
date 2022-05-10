<template>
  <div class="pt-6">
    <div class="text-base items-center flex">
      <span class="font-medium mr-2">{{ $t('detail.address.normal.title') }}</span>
      <span>{{ addressData.address }}</span>
      <AddressTag :tag="addressData.tag" type="pc" :style="{maxWidth:'66%'}" />
      <MinerAppGuide />
    </div>
    <div class="rounded-md my-4 bg-white pb-2 text-sm relative">
      <div class="flex pl-8 py-4 font-medium border-b border-background">
        {{ $t('detail.address.normal.headers.overview') }}
      </div>

      <a target="_blank" :href="$i18n.locale === 'zh'? 'https://foxwallet.com/zh?invite=evkZv8g5TG' : 'https://foxwallet.com/en?invite=evkZv8g5TG'" class="inline-block h-48 absolute right-0">
        <img src="@/assets/img/foxwallet/address-portal.png" draggable="false" class="border border-dashed border-gray-500 block h-full">
      </a>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.address') }}
        </dt>
        <dd class="mr-4">
          <AddressLink :id="addressData.address" plain />
        </dd>
      </dl>

      <dl v-if="addressData.robust" class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          Robust Address
        </dt>
        <dd class="mr-4">
          <AddressLink :id="addressData.robust" plain />
        </dd>
      </dl>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.actor') }}
        </dt>
        <dd class="mr-4">
          {{ $t(`actor.multisig`) }}
        </dd>
      </dl>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.balance') }}
        </dt>
        <dd class="mr-4">
          {{ addressData.balance | filecoin }}
        </dd>
      </dl>

      <template v-if="addressData.multisig.unlockDuration">
        <dl class="flex my-2 items-center">
          <dt class="w-1/8 pl-8 text-gray-600 px-2">
            Available Balance
          </dt>
          <dd class="mr-4">
            {{ addressData.multisig.availableBalance | filecoin }}
          </dd>
        </dl>
        <dl class="flex my-2 items-center">
          <dt class="w-1/8 pl-8 text-gray-600 px-2">
            Initial Balance
          </dt>
          <dd class="mr-4">
            {{ addressData.multisig.initialBalance | filecoin }}
          </dd>
        </dl>
        <dl class="flex my-2 items-center">
          <dt class="w-1/8 pl-8 text-gray-600 px-2">
            Unlock Period
          </dt>
          <dd class="mr-4">
            {{ addressData.multisig.unlockStartTimestamp | timestamp }}
            to
            {{ addressData.multisig.unlockEndTimestamp | timestamp }}
          </dd>
        </dl>
        <dl class="flex my-2 items-center">
          <dt class="w-1/8 pl-8 text-gray-600 px-2">
            Locking Balance
          </dt>
          <dd class="mr-4">
            {{ addressData.multisig.lockingBalance | filecoin }}
            ({{ 1 - addressData.multisig.lockingBalance / addressData.multisig.initialBalance | percentage }})
          </dd>
        </dl>
      </template>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          Signers
        </dt>
        <dd class="mr-4">
          <p v-for="address in addressData.multisig.signers" :key="address">
            <AddressLink :id="address" />
          </p>
        </dd>
      </dl>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          Approval Threshold
        </dt>
        <dd class="mr-4">
          {{ addressData.multisig.approvalsThreshold }}
        </dd>
      </dl>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.messages') }}
        </dt>
        <dd class="mr-4">
          {{ addressData.messageCount }}
        </dd>
      </dl>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.createTime') }}
        </dt>
        <dd class="mr-4">
          {{ addressData.createTimestamp | timestamp('datetime') }}
        </dd>
      </dl>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.lastSeenTime') }}
        </dt>
        <dd class="mr-4">
          {{ addressData.lastSeenTimestamp | timestamp('datetime') }}
        </dd>
      </dl>

      <dl v-if="addressData.ownedMiners.length > 0" class="flex items-center my-2">
        <dt class="w-1/8 pl-8 text-gray-600 px-2 items-center">
          {{ $t('detail.address.normal.headers.ownedMiners') }}
        </dt>
        <dd class="flex flex-wrap flex-1 text-main">
          <p v-for="ownedMiner in addressData.ownedMiners" :key="ownedMiner" class="mr-4">
            <AddressLink :id="ownedMiner" />
          </p>
        </dd>
      </dl>

      <dl v-if="addressData.workerMiners.length > 0" class="flex items-center my-2">
        <dt class="w-1/8 pl-8 text-gray-600 px-2 items-center">
          {{ $t('detail.address.normal.headers.workers') }}
        </dt>
        <dd class="flex flex-wrap flex-1 text-main">
          <p v-for="worker in addressData.workerMiners" :key="worker" class="mr-4">
            <AddressLink :id="worker" />
          </p>
        </dd>
      </dl>
    </div>

    <AddressBalanceDetailChart :address-data="addressData" />

    <div class="rounded-md my-4 bg-white pt-4">
      <div class="flex h-12 items-center ml-8">
        <el-radio-group v-model="listType" size="mini" fill="#1a4fc9" @change="didListTypeChanged">
          <el-radio-button :label="0">
            {{ $t('blockchain.message.title') }}
          </el-radio-button>
          <el-radio-button :label="1">
            {{ $t('detail.transfer.title') }}
          </el-radio-button>
        </el-radio-group>
      </div>
      <AddressMessageList v-if="listType === 0" :address="addressData.address" />
      <div v-if="listType === 1" class="mx-8">
        <div class="flex items-center justify-between border-b border-background">
          <p class="flex h-12 items-center text-sm">
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
          <thead class="text-gray-600 text-sm m-2">
            <tr class="h-8">
              <th class="sticky top-0 bg-white z-10 w-1/8">
                {{ $t('detail.transfer.tableHeaders.time') }}
              </th>
              <th class="sticky top-0 bg-white z-10 w-1/4">
                {{ $t('detail.transfer.tableHeaders.message') }}
              </th>
              <th class="sticky top-0 bg-white z-10 w-5/32">
                {{ $t('detail.transfer.tableHeaders.from') }}
              </th>
              <th class="sticky top-0 bg-white z-10 w-1/16">
              </th>
              <th class="sticky top-0 bg-white z-10 w-5/32">
                {{ $t('detail.transfer.tableHeaders.to') }}
              </th>
              <th class="sticky top-0 bg-white z-10 w-1/8">
                {{ $t('detail.transfer.tableHeaders.income') }}
              </th>
              <th class="sticky top-0 bg-white z-10 w-1/8">
                {{ $t('detail.transfer.tableHeaders.type') }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr
              v-for="(transfer, index) in transferList.transfers"
              :key="index"
              class="h-12 border-b border-background text-sm"
            >
              <td>
                {{ transfer.timestamp | timestamp('datetime') }}
              </td>
              <td>
                <MessageLink v-if="transfer.message" :id="transfer.message" :format="12" />
                <span v-else>N/A</span>
              </td>
              <td>
                <div class="flex items-center flex-row justify-center">
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
                <div class="flex items-center flex-row justify-center">
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
      <div v-if="loading" v-loading="loading" class="flex h-24"></div>
      <div v-if="listType != 0" class="flex items-center text-center h-16">
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
