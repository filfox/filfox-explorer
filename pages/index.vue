<template>
  <div class="container mx-auto relative">
    <div>
      <div v-if="!sharing">
        <HomeOverview :overview="overview" />

        <div class="hidden lg:grid lg:grid-flow-col lg:grid-rows-1 lg:grid-cols-2 mb-2 lg:mb-4">
          <div class="bg-white lg:rounded-md lg:mr-2 mb-2 lg:mb-0">
            <HomeTitle type="powerDistribution" class="border-b border-background h-10 lg:h-12 lg:pr-4" />
            <client-only>
              <PowerDistributionChart class="mt-2 mx-1 lg:mx-4 lg:mt-12" />
            </client-only>
          </div>

          <div class="bg-white lg:ml-2 lg:rounded-md">
            <div class="flex items-center border-b border-background h-10 lg:h-12 lg:pr-4">
              <HomeTitle type="baseFee" />
              <Tip class="ml-1" :content="$t('chart.gas.baseFeeChart.tips')" />
            </div>
            <client-only>
              <BaseFeeChartHome class="mt-2 mx-1 lg:mx-0 lg:my-4" />
            </client-only>
          </div>
        </div>

        <HomeMinerRanksMobile
          class="lg:hidden"
          :top-miners-by-power="topMinersByPower"
          :top-miners-by-blocks="topMinersByBlocks"
          :top-miners-by-power-delta="topMinersByPowerDelta"
          :loading="topMinersLoading"
          @updateTopMinersByPower="getTopMinersByPower"
          @updateTopMinersByBlocks="getTopMinersByBlocks"
          @updateTopMinersByPowerDelta="getTopMinersByPowerDelta"
          @didSharedBtnClicked="didSharedBtnClicked"
        />
        <HomeMinerRanks
          class="hidden lg:block"
          :top-miners-by-power="topMinersByPower"
          :top-miners-by-blocks="topMinersByBlocks"
          :top-miners-by-power-delta="topMinersByPowerDelta"
          :loading="topMinersLoading"
          @updateTopMinersByPower="getTopMinersByPower"
          @updateTopMinersByBlocks="getTopMinersByBlocks"
          @updateTopMinersByPowerDelta="getTopMinersByPowerDelta"
        />

        <div class="mb-4 hidden lg:flex">
          <HomeRecentTipsets :recent-tipsets="recentTipsets" :recent-tipsets-loading="recentTipsetsLoading" class="w-1/2" />
          <HomeRichList :rich-list="richList" :rich-list-loading="richListLoading" class="w-1/2" />
        </div>

        <HomeRecentTipsetsMobile
          class="lg:hidden"
          :recent-tipsets="recentTipsets"
          :recent-tipsets-loading="recentTipsetsLoading"
        />
        <HomeRichListMobile
          class="lg:hidden"
          :rich-list="richList"
          :rich-list-loading="richListLoading"
        />

        <div class="lg:hidden grid-flow-col grid-rows-1 grid-cols-2 mb-2">
          <div class="bg-white  mb-2">
            <HomeTitle type="powerDistribution" class="border-b border-background h-10 pr-4" />
            <client-only>
              <PowerDistributionChart class="mt-2 mx-1" />
            </client-only>
          </div>

          <div class="bg-white lg:hidden">
            <HomeTitle type="baseFee" class="border-b border-background h-10 pr-4" />
            <client-only>
              <BaseFeeChartHome class="mt-2 lg:mx-0 lg:my-4" />
            </client-only>
          </div>
        </div>
      </div>
      <div
        v-if="sharing"
        v-loading="sharingLoading"
        element-loading-text="生成图片中..."
        element-loading-background="rgba(0, 0, 0, 0.71)"
        style="height:70vh"
      >
        <RanksShare v-if="sharing" :loading="sharingLoading" :url="sharingImageURL" @didDismissAreaClicked="didDismissAreaClicked" />
      </div>
    </div>
    <div v-if="$i18n.locale == 'zh'" class="hidden lg:block absolute top-0" style="right:-100px">
      <div class="mt-4 p-1 bg-white rounded">
        <img src="~/assets/img/wechat/staff.png" class="h-20 mx-auto">
        <p class="text-xs text-center">
          扫码进吐槽1群
        </p>
      </div>
      <div class="mt-4 p-1 bg-white rounded">
        <img src="~/assets/img/wechat/group.png" class="h-20 mx-auto">
        <p class="text-xs text-center">
          Filfox小助手
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, error }) {
    try {
      const overview = await $axios.$get('/overview')
      return { overview }
    } catch (err) {
      if (err?.response) {
        error({ code: err.response.status, message: err.response.statusText })
      } else {
        error({ code: 500, message: err.toString() })
      }
    }
  },
  data() {
    return {
      overview: {},
      topMinersByPower: {},
      topMinersByBlocks: {},
      topMinersByPowerDelta: {},
      topMinersType: 'power',
      topMinersLoading: false,
      recentTipsets: [],
      recentTipsetsLoading: false,
      richList: { totalCount: 0, list: [], totalSupply: '0' },
      richListLoading: false,
      sharing: false,
      sharingImageURL: '',
      sharingLoading: false
    }
  },
  mounted() {
    this.getTopMinersByPower()
    this.getRecentTipsets()
    this.getRichList()
    this.$onUpdateOverview = this.onUpdateOverview.bind(this)
    this.$subscribe('blockchain', 'blockchain/overview', this.$onUpdateOverview)
    this.$onUpdateRichList = this.onUpdateRichList.bind(this)
    this.$subscribe('account', 'account/rich-list', this.$onUpdateRichList)
    this.$onUpdateRecentTipsets = this.onUpdateRecentTipsets.bind(this)
    this.$subscribe('tipset', 'tipset/recent', this.$onUpdateRecentTipsets)
  },
  beforeDestroy() {
    this.$unsubscribe('blockchain', 'blockchain/overview', this.$onUpdateOverview)
    this.$unsubscribe('account', 'account/rich-list', this.$onUpdateRichList)
    this.$unsubscribe('tipset', 'tipset/recent', this.$onUpdateRecentTipsets)
  },
  methods: {
    async getTopMinersByPower() {
      this.topMinersType = 'power'
      this.topMinersLoading = true
      this.topMinersByPower = await this.$axios.$get('/miner/top-miners/power', { params: { count: 20 } })
      this.topMinersLoading = false
    },
    async getTopMinersByBlocks(duration) {
      this.topMinersType = 'blocks'
      this.topMinersLoading = true
      this.topMinersByBlocks = await this.$axios.$get('/miner/top-miners/blocks', { params: { count: 20, duration } })
      this.topMinersLoading = false
    },
    async getTopMinersByPowerDelta(duration) {
      this.topMinersType = 'power-growth'
      this.topMinersLoading = true
      this.topMinersByPowerDelta = await this.$axios.$get('/miner/top-miners/power-growth', { params: { count: 20, duration } })
      this.topMinersLoading = false
    },
    async getRecentTipsets() {
      this.recentTipsetsLoading = true
      this.recentTipsets = await this.$axios.$get('/tipset/recent', { params: { count: 10 } })
      this.recentTipsetsLoading = false
    },
    async getRichList() {
      this.richListLoading = true
      this.richList = await this.$axios.$get('/rich-list', { params: { pageSize: 10, page: 0 } })
      this.richListLoading = false
    },
    onUpdateOverview(overview) {
      this.overview = overview
    },
    onUpdateRichList(richList) {
      this.richList = richList
    },
    onUpdateRecentTipsets(tipsets) {
      this.recentTipsets = tipsets
    },
    didDismissAreaClicked() {
      this.sharing = false
    },
    didSharedBtnClicked() {
      this.sharing = true
      this.getRanksImage()
    },
    async getRanksImage() {
      this.sharingLoading = true
      const result = await this.$axios.$post(`/request-share/ranks/${this.topMinersType}`)
      this.sharingImageURL = result
      this.sharingLoading = false
    }
  },
  head() {
    return {
      title: this.$t('meta.titles.indexTitle'),
      titleTemplate: null
    }
  }

}
</script>
