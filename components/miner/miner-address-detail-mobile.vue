<template>
  <div>
    <div
      v-if="sharing"
      v-loading="sharingLoading"
      element-loading-text="生成图片中..."
      element-loading-background="rgba(0, 0, 0, 0.71)"
      class="lg:hidden"
      style="height:70vh"
    >
      <RanksShare v-if="sharing" :loading="sharingLoading" :url="sharingImageURL" @didDismissAreaClicked="didDismissAreaClicked" />
    </div>
    <div v-else>
      <div class="pt-4 pb-1 bg-white">
        <p class="text-sm ml-3 font-medium">
          {{ $t('detail.address.miner.minerOverview.title') }}
        </p>
        <div class="flex justify-between border-b border-background items-center">
          <div class="flex items-center py-2 ">
            <div class="text-xs ml-3">
              {{ $t('detail.address.normal.title') }} {{ addressData.address }}
            </div>
            <AddressTag :tag="addressData.tag" type="mobile" />
          </div>
          <button
            v-if="$i18n.locale == 'zh' && false"
            class="flex items-center border border-socialTagBg rounded-full px-2 mr-3 text-xs cursor-pointer hover:border-button"
            @click="didSharedBtnClicked"
          >
            <img src="~/assets/img/social/share.svg" class="h-2 mr-1">
            <span>分享</span>
          </button>
        </div>
        <div class="rounded-sm m-3 mb-0 shadow flex justify-between">
          <div class="w-1/2 h-full m-auto">
            <MinerBalanceChart :address-data="addressData" />
          </div>
          <div class="py-4 text-right w-1/2 mr-5 mt-8">
            <p class="text-xs text-gray-800">
              {{ $t('detail.address.miner.minerOverview.headers.balance') }}
            </p>
            <p class="font-medium text-xl">
              {{ addressData.balance | filecoin(2) }}
            </p>
            <p class="text-xs mt-3 text-gray-800">
              {{ $t('detail.address.miner.minerOverview.headers.availableBalance') }}:
              {{ addressData.miner.availableBalance[0] === '-' ? '0' : addressData.miner.availableBalance | filecoin(2) }}
            </p>
            <p class="text-xs mt-1 text-gray-800">
              {{ $t('detail.address.miner.minerOverview.headers.sectorPledge') }}:
              {{ addressData.miner.sectorPledgeBalance | filecoin(2) }}
            </p>
            <p class="text-xs mt-1 text-gray-800">
              {{ $t('detail.address.miner.minerOverview.headers.lockedRewards') }}:
              {{ addressData.miner.vestingFunds | filecoin(2) }}
            </p>
            <p v-if="addressData.miner.availableBalance[0] === '-'" class="text-xs mt-1 text-red-700">
              {{ $t('detail.address.miner.minerOverview.headers.feeDebt') }}:
              {{ addressData.miner.availableBalance.slice(1) | filecoin(2) }}
            </p>
          </div>
        </div>

        <div class="pt-4 pb-2 rounded-sm m-3 shadow justify-between">
          <p class="text-xs ml-3 text-gray-800">
            {{ $t('detail.address.miner.minerOverview.headers.qualityAdjPower') }}
          </p>
          <div class="flex items-center justify-between mx-3 pb-1 border-b border-dashed border-background">
            <p class=" font-medium text-xl">
              {{ addressData.miner.qualityAdjPower | size_metric(2) }}
            </p>
            <p class="text-xs pt-1 text-gray-800">
              {{ $t('detail.address.miner.minerOverview.headers.rate') }}:
              {{ addressData.miner.qualityAdjPower / addressData.miner.networkQualityAdjPower | percentage }}
            </p>
            <p class="text-xs pt-1 text-gray-800">
              {{ $t('detail.address.miner.minerOverview.headers.rank') }}:
              {{ addressData.miner.qualityAdjPowerRank || 'N/A' }}
            </p>
          </div>

          <div class="flex items-center justify-between mx-3 mt-2">
            <p class="text-xs text-gray-800">
              {{ $t('detail.address.miner.minerOverview.headers.rawBytePower') }}:
            </p>
            <p class="text-xs text-gray-800">
              {{ addressData.miner.rawBytePower | size_metric(2) }}
            </p>
          </div>
          <div class="flex items-center justify-between mx-3 mt-1">
            <div class="text-xs text-gray-800 flex justify-start items-center">
              {{ $t('detail.address.miner.minerOverview.headers.WinCount') }}
              <Tip class="mx-1" :content="$t('home.minerRanks.tipsByBlock.winCount')" />
              :
            </div>
            <p class="text-xs text-gray-800">
              {{ addressData.miner.weightedBlocksMined }}
            </p>
          </div>
          <div class="flex items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('detail.address.miner.minerOverview.headers.blocksReward') }}:
            </p>
            <p class="text-xs text-gray-800">
              {{ addressData.miner.totalRewards | filecoin(2) }}
            </p>
          </div>
          <div class="flex items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('detail.address.miner.minerOverview.headers.sectorSize') }}:
            </p>
            <p class="text-xs text-gray-800">
              {{ addressData.miner.sectorSize | size_metric }}
            </p>
          </div>
          <div class="flex items-start justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('detail.address.miner.minerOverview.headers.sectors') }}:
            </p>
            <div class="text-xs text-gray-800 text-right w-3/4">
              <span>
                {{ addressData.miner.sectors.live | locale }} {{ $t('detail.address.miner.sectors.total') }},
              </span>
              <span class=" text-green-600">
                {{ addressData.miner.sectors.active | locale }} {{ $t('detail.address.miner.sectors.active') }},
              </span>
              <span class=" text-red-700">
                {{ addressData.miner.sectors.faulty | locale }} {{ $t('detail.address.miner.sectors.faults') }},
              </span>
              <span class=" text-yellow-500">
                {{ addressData.miner.sectors.recovering | locale }} {{ $t('detail.address.miner.sectors.recoveries') }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <MinerMiningOverview :address-data="addressData" portable class="mt-2" />

      <div class="bg-white w-full mt-2">
        <p class="pl-3 flex py-2 text-sm border-b border-background font-medium">
          {{ $t('detail.address.miner.accountChange.title') }}
        </p>
        <MinerBalanceDetailChart :address-data="addressData" class="mt-4 mx-3" />
      </div>

      <div class="bg-white w-full mt-2">
        <p class="pl-3 flex py-2 text-sm border-b border-background font-medium">
          {{ $t('detail.address.miner.powerChange.title') }}
        </p>
        <MinerPowerDetailChart :address-data="addressData" class="mt-4 mx-3" />
      </div>

      <div class="bg-white mt-2 py-px">
        <p class="pl-3 flex py-2 text-sm border-b border-background font-medium">
          {{ $t('detail.address.miner.accountOverview.title') }}
        </p>
        <div class="flex items-center justify-between mx-3 mt-3">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.accountOverview.headers.address') }}:
          </p>
          <p class="text-xs text-gray-800 text-right w-4/5 break-all">
            {{ addressData.robust || 'N/A' }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.accountOverview.headers.messageCount') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ addressData.messageCount }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.accountOverview.headers.actor') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ $t('actor.' + addressData.actor) }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-1 pb-1 border-b border-dashed border-background">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.accountOverview.headers.createTime') }}:
          </p>
          <p class="text-xs text-gray-800 text-right">
            {{ addressData.createTimestamp | timestamp('datetime') }}
          </p>
        </div>

        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.accountOverview.headers.peerID') }}:
          </p>
          <PeerLink :id="addressData.miner.peerId" :format="12" class="text-xs text-main" />
        </div>
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.accountOverview.headers.owner') }}:
          </p>
          <AddressLink :id="addressData.miner.owner.address" :format="10" class="text-xs text-main" />
        </div>
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.accountOverview.headers.worker') }}:
          </p>
          <AddressLink :id="addressData.miner.worker.address" :format="10" class="text-xs text-main" />
        </div>
      </div>

      <div v-loading="loading" class="mt-2 pt-3 bg-white">
        <div class="flex h-10 items-center mb-3 justify-center">
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
        <AddressMessageListMobile v-if="listType === 0" :address="addressData.address" />
        <div v-if="listType === 1">
          <div class="flex items-center justify-between pb-1 mb-2">
            <p class="flex ml-3 h-8 items-center text-xs">
              {{ $t('detail.address.miner.blockList.total') + ' ' + total + ' ' + $t('detail.address.miner.blockList.tipsets') }}
            </p>
            <TransferTypeSelect
              v-model="trans"
              :methods="transferList.types"
              :el-select-options="{size: 'mini'}"
              class="mr-3"
            />
          </div>

          <div v-for="(block, index) in blockList.blocks" :key="index" class="rounded-sm mx-3 mb-3 shadow bg-white py-2">
            <div class="flex items-center justify-between mx-3">
              <p class="text-xs text-gray-800">
                {{ $t('detail.address.miner.blockList.height') }}:
              </p>
              <TipsetLink :id="block.height" class="text-main text-xs" />
            </div>
            <div class="flex items-center justify-between mx-3 mt-1">
              <p class="text-xs text-gray-800">
                {{ $t('detail.address.miner.blockList.hash') }} :
              </p>
              <BlockLink :id="block.cid" :format="10" class="text-xs text-gray-800" />
            </div>
            <div class="flex items-center justify-between mx-3 mt-1">
              <p class="text-xs text-gray-800">
                {{ $t('detail.address.miner.blockList.reward') }}:
              </p>
              <p v-if="block.reward" class="text-xs text-gray-800">
                {{ block.reward | filecoin(2) }}
              </p>
              <p v-else class="text-xs text-gray-800">
                N/A
              </p>
            </div>
            <div class="flex items-center justify-between mx-3 mt-1">
              <p class="text-xs text-gray-800">
                {{ $t('detail.address.miner.blockList.time') }}:
              </p>
              <p class="text-xs text-gray-800">
                {{ block.timestamp | timestamp('datetime') }}
              </p>
            </div>
            <div class="flex items-center justify-between mx-3 mt-1">
              <p class="text-xs text-gray-800">
                {{ $t('detail.address.miner.blockList.messages') }}:
              </p>
              <p class="text-xs text-gray-800">
                {{ block.messageCount }} Bytes
              </p>
            </div>
            <div class="flex items-center justify-between mx-3 mt-1">
              <p class="text-xs text-gray-800">
                {{ $t('detail.address.miner.blockList.blockSize') }}:
              </p>
              <p class="text-xs text-gray-800">
                {{ block.size }} Bytes
              </p>
            </div>
          </div>
        </div>
        <div v-if="listType === 2">
          <div class="flex items-center justify-between pb-1 mb-2">
            <p class="flex ml-3 h-8 items-center text-xs">
              {{ $t('detail.address.miner.blockList.total') + ' ' + total + ' ' + $t('detail.transfer.transaction') }}
            </p>
            <TransferTypeSelect
              v-model="trans"
              :methods="transferList.types"
              :el-select-options="{size: 'mini'}"
              class="mr-3"
            />
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
                <AddressTag :tag="transfer.fromTag" type="mobile" />
              </div>
            </div>
            <div class="flex items-center justify-between mx-3 mt-1">
              <p class="text-xs text-gray-800">
                {{ $t('detail.transfer.tableHeaders.to') }}:
              </p>
              <div class="flex items-center flex-row justify-end">
                <AddressLink v-if="transfer.to" :id="transfer.to" :format="4" class="text-xs text-main" />
                <span v-else class="text-xs text-gray-800"> N/A </span>
                <AddressTag :tag="transfer.toTag" type="mobile" />
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
  </div>
</template>

<script>
import { epochsInDay } from '@/filecoin/filecoin.config'
export default {
  props: {
    addressData: { type: Object, required: true }
  },
  data() {
    return {
      listType: 0,
      blockList: {},
      trans: 'All',
      transferList: {
        totalCount: 0,
        transfers: [],
        types: []
      },
      page: 0,
      pageSize: 3,
      loading: false,
      total: 0,
      method: 'All',
      duration: '24h',
      epochsInDay,
      sharing: false,
      sharingImageURL: '',
      sharingLoading: false
    }
  },
  computed: {
    totalPageCount: {
      get() { return Math.ceil(this.total / this.pageSize) },
      set(val) { }
    }
  },
  watch: {
    trans() {
      this.page = 0
      this.getTransferList()
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
        this.getBlockList()
      } else if (this.listType === 2) {
        this.getTransferList()
      }
    },
    didListTypeChanged() {
      this.page = 0
      this.totalPageCount = 1
      this.total = 0
      if (this.listType === 1) {
        this.getBlockList()
      } else if (this.listType === 2) {
        this.getTransferList()
      }
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
