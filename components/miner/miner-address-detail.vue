<template>
  <div>
    <div
      v-if="sharing"
      v-loading="sharingLoading"
      element-loading-text="生成图片中..."
      element-loading-background="rgba(0, 0, 0, 0)"
      class="hidden lg:block my-4 bg-transparent"
      style="height:70vh"
    >
      <RanksShare v-if="sharing" :loading="sharingLoading" :url="sharingImageURL" @didDismissAreaClicked="didDismissAreaClicked" />
    </div>
    <div v-else>
      <div class="flex items-center justify-between">
        <div class="flex items-center mt-6">
          <div class="font-medium">
            {{ $t('detail.address.normal.title') }} {{ addressData.address }}
          </div>
          <AddressTag v-if="addressData.tag" :tag="addressData.tag" type="pc" />
          <div v-else class="text-main text-xs ml-2 mt-1 cursor-pointer" @click="showDialog">
            {{ $t('tag.apply') }}>
          </div>
          <div v-if="addressData.tag && !addressData.tag.signed" class="text-main text-xs ml-2 cursor-pointer" @click="showDialog">
            {{ $t('tag.sign') }}>
          </div>
        </div>
        <button
          v-if="$i18n.locale == 'zh'"
          class="flex items-center border border-socialTagBg rounded-full px-3 py-1 text-xs cursor-pointer hover:border-button mt-6"
          @click="didSharedBtnClicked"
        >
          <img src="~/assets/img/social/share.svg" class="h-2 mr-1">
          <span>分享</span>
        </button>
      </div>
      <MinerVerifyApply ref="verifyApplication" :address-info="addressData.address" :tag="addressData.tag" />

      <div class="rounded-md mt-4 bg-white pt-4 pb-2">
        <div class="flex justify-start items-center">
          <p class="ml-8 flex">
            {{ $t('detail.address.miner.minerOverview.title') }}
          </p>
          <el-popover
            placement="bottom-start"
            width="280"
            trigger="hover"
            :content="$t('detail.address.miner.tips.lotus')"
          >
            <div v-if="addressData.miner.nodeVersion" slot="reference" class="flex items-center text-xs ml-1">
              [
              <a :class="{'text-green-600':addressData.miner.nodeVersion.includes('latest'), 'text-red-600':!addressData.miner.nodeVersion.includes('latest')}" href="https://github.com/filecoin-project/lotus/releases" target="_blank">
                {{ addressData.miner.nodeVersion }}
              </a>
              ]
            </div>
          </el-popover>
        </div>
        <div class="grid grid-rows-1 grid-cols-2 gap-4 my-4 mx-8">
          <div class="border border-background rounded-sm">
            <MinerBalance :address-data="addressData" />
          </div>
          <div class="border border-background rounded-sm">
            <MinerOverviewRight :address-data="addressData" />
          </div>
        </div>
      </div>

      <MinerMiningOverview :address-data="addressData" class="my-4" />

      <div class="flex mt-4 justify-between">
        <div class="rounded-md bg-white mr-2 w-1/2">
          <p class="px-8 flex py-4 border-b border-background">
            {{ $t('detail.address.miner.accountChange.title') }}
          </p>
          <MinerBalanceDetailChart :address-data="addressData" class="mt-4 mx-4" />
        </div>
        <div class="rounded-md bg-white ml-2 w-1/2">
          <p class="px-8 flex py-4 border-b border-background">
            {{ $t('detail.address.miner.powerChange.title') }}
          </p>
          <MinerPowerDetailChart :address-data="addressData" class="mt-4 mx-4" />
        </div>
      </div>

      <div class="rounded-md mt-4 bg-white pt-4 pb-2">
        <p class="px-8 flex border-b border-background pb-4">
          {{ $t('detail.address.miner.accountOverview.title') }}
        </p>
        <div class="grid grid-rows-1 grid-cols-2 gap-4 mx-8 my-4">
          <div class="mr-2">
            <div class="flex justify-between">
              <p class="text-sm mt-2">
                {{ $t('detail.address.miner.accountOverview.headers.address') }}:
              </p>
              <p class="text-sm mt-2">
                {{ addressData.alias || 'N/A' }}
              </p>
            </div>
            <div class="flex justify-between">
              <p class="text-sm mt-2">
                {{ $t('detail.address.miner.accountOverview.headers.messageCount') }}:
              </p>
              <p class="text-sm mt-2">
                {{ addressData.messageCount }}
              </p>
            </div>
            <div class="flex justify-between">
              <p class="text-sm mt-2">
                {{ $t('detail.address.miner.accountOverview.headers.actor') }}:
              </p>
              <p class="text-sm mt-2">
                {{ $t(`actor.${addressData.actor}`) }}
              </p>
            </div>
            <div class="flex justify-between">
              <p class="text-sm mt-2">
                {{ $t('detail.address.miner.accountOverview.headers.createTime') }}:
              </p>
              <p class="text-sm mt-2">
                {{ addressData.createTimestamp | timestamp('datetime') }}
              </p>
            </div>
          </div>
          <div class="ml-2">
            <div class="flex justify-between">
              <p class="text-sm mt-2">
                {{ $t('detail.address.miner.accountOverview.headers.peerID') }}:
              </p>
              <PeerLink :id="addressData.miner.peerId" class="text-sm mt-2" />
            </div>
            <div class="flex justify-between">
              <p class="text-sm mt-2">
                {{ $t('detail.address.miner.accountOverview.headers.owner') }}:
              </p>
              <AddressLink :id="addressData.miner.owner" :format="12" class="text-sm mt-2 text-main text-right" />
            </div>
            <div class="flex justify-between">
              <p class="text-sm mt-2">
                {{ $t('detail.address.miner.accountOverview.headers.worker') }}:
              </p>
              <AddressLink :id="addressData.miner.worker" :format="12" class="text-sm mt-2 text-main text-right" />
            </div>
            <div class="flex justify-between">
              <p class="text-sm mt-2">
                {{ $t('detail.address.miner.accountOverview.headers.ip') }}:
              </p>
              <IpAddress :location="addressData.miner.location" class="mt-2 text-right" />
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-md my-4 bg-white pt-4">
        <div class="flex h-12 items-center ml-8">
          <el-radio-group v-model="listType" size="mini" fill="#1a4fc9" @change="didListTypeChanged">
            <el-radio-button :label="0">
              {{ $t('blockchain.message.title') }}
            </el-radio-button>
            <el-radio-button :label="1">
              {{ $t('blockchain.block.title') }}
            </el-radio-button>
            <el-radio-button :label="2">
              {{ $t('detail.transfer.title') }}
            </el-radio-button>
          </el-radio-group>
        </div>
        <AddressMessageList v-if="listType === 0" :address="addressData.address" />
        <div v-if="listType === 1" class="mx-8">
          <p class="flex h-12 items-center text-sm border-b border-background mb-4">
            {{ $t('blockchain.message.info.total') }}
            {{ total }}
            {{ $t('detail.address.miner.blockList.tipsets') }}
          </p>
          <table v-if="!loading" class="w-full table-auto">
            <thead class="text-gray-600 text-sm m-2">
              <tr class="h-8">
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('detail.address.miner.blockList.height') }}
                </th>
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('detail.address.miner.blockList.hash') }}
                </th>
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('detail.address.miner.blockList.reward') }}
                </th>
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('detail.address.miner.blockList.time') }}
                </th>
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('detail.address.miner.blockList.messages') }}
                </th>
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('detail.address.miner.blockList.blockSize') }}
                </th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr
                v-for="(block, index) in blockList.blocks"
                :key="index"
                class="h-12 border-b border-background text-sm"
              >
                <td>
                  <TipsetLink :id="block.height" class="text-main" />
                </td>
                <td>
                  <BlockLink :id="block.cid" :format="12" />
                </td>
                <td v-if="block.reward">
                  {{ block.reward | filecoin(2) }}
                </td>
                <td v-else>
                  N/A
                </td>
                <td>
                  {{ block.timestamp | timestamp('datetime') }}
                </td>
                <td>
                  {{ block.messageCount }}
                </td>
                <td>
                  {{ block.size }} Bytes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="listType === 2" class="mx-8">
          <p class="flex h-12 items-center text-sm border-b border-background mb-4">
            {{ $t('detail.transfer.total') }}
            {{ total }}
            {{ $t('detail.transfer.transaction') }}
          </p>
          <table v-if="!loading" class="w-full table-auto">
            <thead class="text-gray-600 text-sm m-2">
              <tr class="h-8">
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('detail.transfer.tableHeaders.time') }}
                </th>
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('detail.transfer.tableHeaders.message') }}
                </th>
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('detail.transfer.tableHeaders.from') }}
                </th>
                <th class="sticky top-0 bg-white z-10">
                </th>
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('detail.transfer.tableHeaders.to') }}
                </th>
                <th class="sticky top-0 bg-white z-10 w-1/16">
                  {{ $t('detail.transfer.tableHeaders.income') }}
                </th>
                <th class="sticky top-0 bg-white z-10 w-1/16">
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
                  <MessageLink v-if="transfer.message" :id="transfer.message" :format="8" />
                  <span v-else> N/A </span>
                </td>
                <td>
                  <div class="flex items-center flex-row justify-center">
                    <AddressLink v-if="transfer.from" :id="transfer.from" :format="4" />
                    <span v-else> N/A </span>
                    <AddressTag :tag="transfer.fromTag" type="pc" />
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
                    <span v-else> N/A </span>
                    <AddressTag :tag="transfer.toTag" type="pc" />
                  </div>
                </td>
                <td>
                  {{ transfer.value | filecoin(2) }}
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
            layout="prev, pager, next"
            :page-count="totalPageCount"
            :current-page="page + 1"
            class="mx-auto"
            @current-change="didCurrentPageChanged"
          />
        </div>
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
      blockList: {},
      transferList: {},
      listType: 0,
      page: 0,
      pageSize: 20,
      loading: false,
      total: 0,
      method: 'All',
      sharing: false,
      sharingImageURL: '',
      sharingLoading: false
    }
  },
  computed: {
    totalPageCount() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    async getBlockList() {
      this.loading = true
      const params = { pageSize: this.pageSize, page: this.page }
      this.blockList = await this.$axios.$get(`/address/${this.addressData.address}/blocks`, { params })
      this.loading = false
      this.total = this.blockList.totalCount
    },
    async getTransferList() {
      this.loading = true
      const params = { pageSize: this.pageSize, page: this.page }
      this.transferList = await this.$axios.$get(`/address/${this.addressData.address}/transfers`, { params })
      this.loading = false
      this.total = this.transferList.totalCount
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      if (this.listType === 1) {
        this.getBlockList()
      } else if (this.listType === 2) {
        this.getTransferList()
      }
    },
    didListTypeChanged() {
      this.page = 0
      this.total = 0
      if (this.listType === 1) {
        this.getBlockList()
      } else if (this.listType === 2) {
        this.getTransferList()
      }
    },
    showDialog() {
      this.$refs.verifyApplication.showDialog()
    },
    didDismissAreaClicked() {
      this.sharing = false
    },
    didSharedBtnClicked() {
      this.sharing = true
      this.getMinerImage()
    },
    async getMinerImage() {
      this.sharingLoading = true
      const result = await this.$axios.$post(`/request-share/miner/${this.addressData.address}`)
      this.sharingImageURL = result
      this.sharingLoading = false
    }
  }
}
</script>
