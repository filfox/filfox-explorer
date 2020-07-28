<template>
  <div>
    <div class="pt-4 bg-white">
      <p class="text-sm ml-3 font-medium">
        {{ $t('detail.address.miner.minerOverview.title') }}
      </p>
      <div class="flex items-center py-2 border-b border-background">
        <div class="text-xs ml-3">
          {{ $t('detail.address.normal.title') + ' ' + addressData.address }}
        </div>
        <MinerTag v-if="addressData.tag" :tag="addressData.tag" :type="2" />
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
            {{ $t('detail.address.miner.minerOverview.headers.availableBalance') }}: {{ addressData.miner.availableBalance | filecoin(2) }}
          </p>
          <p class="text-xs mt-1 text-gray-800">
            {{ $t('detail.address.miner.minerOverview.headers.pledgeBalance') }}: {{ addressData.miner.pledgeBalance | filecoin(2) }}
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
            {{ $t('detail.address.miner.minerOverview.headers.rate') }}: {{ (addressData.miner.qualityAdjPower/addressData.miner.totalQualityAdjPower * 100).toFixed(2) }}%
          </p>
          <p class="text-xs pt-1 text-gray-800">
            {{ $t('detail.address.miner.minerOverview.headers.rank') }}: {{ addressData.miner.qualityAdjPowerRank ? addressData.miner.qualityAdjPowerRank : 'N/A' }}
          </p>
        </div>

        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.minerOverview.headers.rawBytePower') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ addressData.miner.rawBytePower | size_metric(2) }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.minerOverview.headers.sectorSize') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ addressData.miner.sectorSize | size_metric(2) }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.minerOverview.headers.blockNums') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ addressData.miner.blocksMined }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.minerOverview.headers.qualityAdjPowerDelta24h') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ addressData.miner.qualityAdjPowerDelta24h | size_metric(2) }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.minerOverview.headers.blocksReward') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ addressData.miner.miningRewards | filecoin(2) }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-1 mb-3">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.minerOverview.headers.qualityAdjPowerDeltaSpeed24h') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ addressData.miner.qualityAdjPowerDelta24h/24 | size_metric(2) }} / {{ $t('shared.time.hour') }}
          </p>
        </div>
      </div>
    </div>

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
        <p class="text-xs text-gray-800 text-right">
          {{ addressData.alias }}
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
          {{ $t('detail.address.miner.accountOverview.headers.sectors') }}:
        </p>
        <p class="text-xs text-gray-800 text-right">
          {{ addressData.miner.sectors | locale }} total, {{ addressData.miner.activeSectors | locale }} active, {{ addressData.miner.faults | locale }} faults, {{ addressData.miner.recoveries | locale }} recoveries
        </p>
      </div>
      <div class="flex items-center justify-between mx-3 mt-1">
        <p class="text-xs text-gray-800">
          {{ $t('detail.address.miner.accountOverview.headers.owner') }}:
        </p>
        <AddressLink :id="addressData.miner.owner" class="text-xs text-main" />
      </div>
      <div class="flex items-center justify-between mx-3 mt-1 mb-3">
        <p class="text-xs text-gray-800">
          {{ $t('detail.address.miner.accountOverview.headers.worker') }}:
        </p>
        <AddressLink :id="addressData.miner.worker" class="text-xs text-main" />
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
        </el-radio-group>
      </div>
      <div v-if="listType == 0">
        <div class="flex items-center justify-between pb-1 mb-2">
          <p class="flex ml-3 h-8 items-center text-xs">
            {{ $t('blockchain.message.info.total') + ' ' + total + ' ' + $t('blockchain.message.info.messages') }}
          </p>
          <el-select v-model="method" size="mini" class="mr-3" @change="didSelectChanged">
            <el-option v-for="item in methodOptions" :key="item" :label="item == 'All' ? $t('blockchain.message.methods.all') : item" :value="item" />
          </el-select>
        </div>

        <div v-for="(message, index) in messagesList.messages" :key="index" class="rounded-sm mx-3 mb-3 py-px shadow bg-white">
          <div class="flex items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('blockchain.message.tableHeaders.id') }}:
            </p>
            <MessageLink :id="message.cid" :route-query="{height: message.height}" :format="10" class="text-gray-800 text-xs" />
          </div>
          <div class="flex items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('blockchain.message.tableHeaders.height') }}:
            </p>
            <TipsetLink :id="message.height" class="text-main text-xs" />
          </div>
          <div class="flex items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('blockchain.message.tableHeaders.time') }}:
            </p>
            <p class="text-xs text-gray-800">
              {{ message.timestamp | timestamp('datetime') }}
            </p>
          </div>
          <div class="flex items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('blockchain.message.tableHeaders.from') }}:
            </p>
            <AddressLink :id="message.from" :format="12" class="text-main text-xs" />
          </div>
          <div class="flex items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('blockchain.message.tableHeaders.to') }}:
            </p>
            <AddressLink :id="message.to" :format="12" class="text-main text-xs" />
          </div>
          <div class="flex items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('blockchain.message.tableHeaders.method') }}:
            </p>
            <p class="text-xs text-gray-800">
              {{ message.method }}
            </p>
          </div>
          <div class="flex items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('blockchain.message.tableHeaders.value') }}:
            </p>
            <p class="text-xs text-gray-800">
              {{ message.value | filecoin(4) }}
            </p>
          </div>
          <div class="flex items-center justify-between mx-3 mt-1 mb-3">
            <p class="text-xs text-gray-800">
              {{ $t('blockchain.message.tableHeaders.exitCode') }}:
            </p>
            <p v-if="message.receipt" class="text-xs text-gray-800">
              {{ message.receipt.exitCode | exit-code }}
            </p>
            <p v-else class="text-xs text-gray-800">
              N/A
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="flex items-center justify-between pb-1 mb-2">
          <p class="flex ml-3 h-8 items-center text-xs">
            {{ $t('detail.address.miner.blockList.total') + ' ' + total + ' ' + $t('detail.address.miner.blockList.tipsets') }}
          </p>
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
      <div class="flex items-center text-center h-16 bg-white">
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
      messagesList: {},
      blockList: {},
      methodOptions: ['All'],
      page: 0,
      pageSize: 3,
      totalPageCount: 0,
      loading: false,
      total: 0,
      method: 'All'
    }
  },
  mounted() {
    this.getMessagesList()
  },
  methods: {
    getMessagesList() {
      this.loading = true
      const params = { pageSize: this.pageSize, page: this.page }
      if (this.method !== 'All') {
        params.method = this.method
      }
      this.$axios
        .get(`/address/${this.addressData.address}/messages`, {
          params
        })
        .then(res => {
          this.messagesList = res.data
          this.methodOptions = ['All']
          this.methodOptions = this.methodOptions.concat(res.data.methods)
          this.loading = false
          this.total = this.messagesList.totalCount
          this.getTotalPageCount()
        })
    },
    getBlockList() {
      this.loading = true
      const params = { pageSize: this.pageSize, page: this.page }
      this.$axios
        .get(`/address/${this.addressData.address}/blocks`, {
          params
        })
        .then(res => {
          this.blockList = res.data
          this.loading = false
          this.total = this.blockList.totalCount
          this.getTotalPageCount()
        })
    },
    getTotalPageCount() {
      this.totalPageCount = Math.ceil(this.total / this.pageSize)
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      if (this.listType === 0) {
        this.getMessagesList()
      } else {
        this.getBlockList()
      }
    },
    didSelectChanged(selectedMethod) {
      this.method = selectedMethod
      this.page = 0
      this.totalPageCount = 1
      this.total = 0
      this.getMessagesList()
    },
    didListTypeChanged() {
      this.page = 0
      this.totalPageCount = 1
      this.total = 0
      if (this.listType === 0) {
        this.getMessagesList()
      } else {
        this.getBlockList()
      }
    }
  }
}
</script>
