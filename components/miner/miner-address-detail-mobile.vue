<template>
  <div>
    <div class="pt-4 pb-1 bg-white">
      <p class="text-sm ml-3 font-medium">
        {{ $t('detail.address.miner.minerOverview.title') }}
      </p>
      <div class="flex items-center py-2 border-b border-background">
        <div class="text-xs ml-3">
          {{ $t('detail.address.normal.title') }} {{ addressData.address }}
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
            {{ $t('detail.address.miner.minerOverview.headers.availableBalance') }}:
            {{ addressData.miner.availableBalance | filecoin(2) }}
          </p>
          <p class="text-xs mt-1 text-gray-800">
            {{ $t('detail.address.miner.minerOverview.headers.pledgeBalance') }}:
            {{ addressData.miner.pledgeBalance | filecoin(2) }}
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
            {{ addressData.miner.qualityAdjPower / addressData.miner.totalQualityAdjPower | percentage }}
          </p>
          <p class="text-xs pt-1 text-gray-800">
            {{ $t('detail.address.miner.minerOverview.headers.rank') }}:
            {{ addressData.miner.qualityAdjPowerRank ? addressData.miner.qualityAdjPowerRank : 'N/A' }}
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
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.minerOverview.headers.sectorSize') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ addressData.miner.sectorSize | size_metric(2) }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.minerOverview.headers.sectors') }}:
          </p>
          <p class="text-xs text-gray-800 text-right w-3/4">
            {{ addressData.miner.sectors | locale }} {{ $t('detail.address.miner.sectors.total') }},
            {{ addressData.miner.activeSectors | locale }} {{ $t('detail.address.miner.sectors.active') }},
            {{ addressData.miner.faults | locale }} {{ $t('detail.address.miner.sectors.faults') }},
            {{ addressData.miner.recoveries | locale }} {{ $t('detail.address.miner.sectors.recoveries') }}
          </p>
        </div>
      </div>
    </div>

    <div class="bg-white w-full mt-2 pb-3">
      <div class="flex justify-between flex-row border-b border-background">
        <p class="pl-3 flex py-2 text-sm font-medium">
          {{ $t('detail.address.miner.miningOverview.title') }}
        </p>
        <el-dropdown
          trigger="click"
          :hide-on-click="true"
          class="border border-background px-2 rounded-sm my-2 mr-3"
          @command="didDurationSwitched"
        >
          <span class="el-dropdown-link text-sm">
            {{ durationName }} <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="24h">
              {{ '24' + $t('shared.time.hour') }}
            </el-dropdown-item>
            <el-dropdown-item command="7d">
              {{ '7' + $t('shared.time.day') }}
            </el-dropdown-item>
            <el-dropdown-item command="30d">
              {{ '30' + $t('shared.time.day') }}
            </el-dropdown-item>
            <el-dropdown-item command="1y">
              {{ '1' + $t('shared.time.year') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="pt-2 pb-2 rounded-sm mx-3 mt-3 shadow justify-between">
        <div class="flex items-center justify-between mx-3">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.miningOverview.headers.qualityAdjPowerDelta') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ addressData.miner.miningStats.qualityAdjPowerDelta | size_metric(2) }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-2">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.miningOverview.headers.qualityAdjPowerDeltaSpeed') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ miningStats.qualityAdjPowerDelta / durationDay / miningStats.durationPercentage | size_metric(2) }} / {{ $t('shared.time.day') }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-2">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.miningOverview.headers.minerEquivalent') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ miningStats.equivalentMiners.toFixed(2) }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-2">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.miningOverview.headers.blockNums') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ miningStats.blocksMined }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-2">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.miningOverview.headers.blocksReward') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ miningStats.totalRewards | filecoin(4) }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-2">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.miningOverview.headers.blocksRewardRate') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ (miningStats.totalRewards/ miningStats.networkTotalRewards) | percentage }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-2">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.miningOverview.headers.miningEfficiency') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ miningStats.rewardPerByte * 2 ** 40 * epochsInDay | filecoin(2, '/TiB') }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-2">
          <p class="text-xs text-gray-800">
            {{ $t('detail.address.miner.miningOverview.headers.luckyValue') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ miningStats.luckyValue | percentage }}
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
        <p class="text-xs text-gray-800 text-right w-3/4 break-all">
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
          {{ $t('detail.address.miner.accountOverview.headers.owner') }}:
        </p>
        <AddressLink :id="addressData.miner.owner" class="text-xs text-main" />
      </div>
      <div class="flex items-center justify-between mx-3 mt-1">
        <p class="text-xs text-gray-800">
          {{ $t('detail.address.miner.accountOverview.headers.worker') }}:
        </p>
        <AddressLink :id="addressData.miner.worker" class="text-xs text-main" />
      </div>
      <div class="flex items-center justify-between mx-3 mt-1 mb-3">
        <p class="text-xs text-gray-800">
          {{ $t('detail.address.miner.accountOverview.headers.ip') }}:
        </p>
        <p v-if="addressData.miner.location" class="text-xs text-gray-800 text-right">
          {{ addressData.miner.location.flagEmoji }}
          {{ addressData.miner.location[`${$i18n.locale}ContinentName`] }}-{{ addressData.miner.location[`${$i18n.locale}CountryName`] }}-{{ addressData.miner.location[`${$i18n.locale}RegionName`] }}-{{ addressData.miner.location[`${$i18n.locale}City`] }}
          ({{ splitedIP(addressData.miner.location.ip) }})
        </p>
        <p v-else class="text-xs text-gray-800 text-right">
          {{ $t('shared.unknown') }}
        </p>
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
import { epochsInDay } from '@/filecoin/filecoin.config'
export default {
  props: {
    addressData: { type: Object, required: true }
  },
  data() {
    return {
      listType: 0,
      blockList: {},
      transferList: {},
      page: 0,
      pageSize: 3,
      totalPageCount: 0,
      loading: false,
      total: 0,
      method: 'All',
      duration: '24h',
      miningStats: this.addressData.miner.miningStats,
      epochsInDay
    }
  },
  computed: {
    durationName() {
      return {
        '24h': `24${this.$t('shared.time.hour')}`,
        '7d': `7${this.$t('shared.time.day')}`,
        '30d': `30${this.$t('shared.time.day')}`,
        '1y': `1${this.$t('shared.time.year')}`
      }[this.duration]
    },
    durationDay() {
      if (this.duration === '24h') {
        return 1
      } else if (this.duration === '7d') {
        return 7
      } else if (this.duration === '30d') {
        return 30
      } else {
        return 365
      }
    }
  },
  watch: {
    duration() {
      this.getMinigStats()
    }
  },
  methods: {
    didDurationSwitched(command) {
      this.duration = command
      this.getMinigStats()
    },
    async getMinigStats() {
      this.loading = true
      const params = { duration: this.duration }
      this.miningStats = await this.$axios.$get(`/miner/${this.addressData.address}/mining-stats`, { params })
      this.loading = false
    },
    async getBlockList() {
      this.loading = true
      const params = { pageSize: this.pageSize, page: this.page }
      this.blockList = await this.$axios.$get(`/address/${this.addressData.address}/blocks`, { params })
      this.loading = false
      this.total = this.blockList.totalCount
      this.getTotalPageCount()
    },
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
    splitedIP(ip) {
      const ips = ip.split('.')
      if (ips.length === 4) {
        return `${ips[0]}. ** . ** .${ips[3]}`
      } else {
        return ip
      }
    }
  }
}
</script>
