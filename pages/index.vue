<template>
  <div class="container mx-auto relative">
    <div v-if="!sharing">
      <ActivityBanner />
      <HomeOverview :overview="overview" />

      <div class="lg:hidden grid-flow-col grid-rows-1 grid-cols-2 mb-2">
        <div class="bg-white mb-2">
          <HomeTitle type="fevmChart" class="border-b border-background h-10 pr-4" />
          <FevmDataChart small class="mt-2" />
        </div>

        <div class="bg-white mb-2">
          <HomeTitle type="baseFee" class="border-b border-background h-10 pr-4" />
          <BaseFeeChart class="mt-2" />
        </div>

        <div class="mb-2 bg-white">
          <HomeTitle type="entireQualityAdjPower" class="border-b border-background h-10 pr-4" />
          <EntirePowerChart class="mt-2" />
        </div>
      </div>

      <div class="hidden lg:flex mb-4">
        <div class="w-1/3 rounded-md bg-white">
          <div class="flex items-center justify-between border-b border-background h-12">
            <HomeTitle type="fevmChart" />
            <nuxt-link :to="localePath('/fevm/stats')" class="mr-4">
              <i class="el-icon-arrow-right text-customGray-650 hover:text-customBlue-295"></i>
            </nuxt-link>
          </div>
          <FevmDataChart small :bar-max-width="3" />
        </div>
        <div class="w-4"></div>
        <div class="w-1/3 rounded-md bg-white">
          <div class="flex items-center justify-between border-b border-background h-12">
            <HomeTitle type="entireQualityAdjPower" />
            <nuxt-link :to="localePath('/stats/miner')" class="mr-4">
              <i class="el-icon-arrow-right text-customGray-650 hover:text-customBlue-295"></i>
            </nuxt-link>
          </div>
          <EntirePowerChart />
        </div>
        <div class="w-4"></div>
        <div class="w-1/3 rounded-md bg-white">
          <div class="flex items-center justify-between border-b border-background h-12">
            <div class="flex items-center">
              <HomeTitle type="baseFee" />
              <Tip class="ml-1" :content="$t('chart.gas.baseFeeChart.tips')" />
            </div>
            <nuxt-link :to="localePath('/stats/gas')" class="mr-4">
              <i class="el-icon-arrow-right text-customGray-650 hover:text-customBlue-295"></i>
            </nuxt-link>
          </div>
          <BaseFeeChart />
        </div>
      </div>

      <HomeFevmNavigation more class="my-4" />

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

      <Partner v-if="false" />
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
    <HomeFnsDialog />
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
        error({ code: 500, message: 'Server Error' })
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
      richList: { totalCount: 0, richList: [], totalSupply: '0' },
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
    this.$subscribe('account', `account/rich-list/${this.$i18n.locale}`, this.$onUpdateRichList)
    this.$onUpdateRecentTipsets = this.onUpdateRecentTipsets.bind(this)
    this.$subscribe('tipset', `tipset/recent/${this.$i18n.locale}`, this.$onUpdateRecentTipsets)
  },
  beforeDestroy() {
    this.$unsubscribe('blockchain', 'blockchain/overview', this.$onUpdateOverview)
    this.$unsubscribe('account', `account/rich-list/${this.$i18n.locale}`, this.$onUpdateRichList)
    this.$unsubscribe('tipset', `tipset/recent/${this.$i18n.locale}`, this.$onUpdateRecentTipsets)
  },
  methods: {
    async getTopMinersByPower(continent) {
      this.topMinersType = 'power'
      this.topMinersLoading = true
      this.topMinersByPower = await this.$axios.$get('/miner/top-miners/power', { params: continent ? { count: 10, continent } : { count: 10 } })
      this.topMinersLoading = false
    },
    async getTopMinersByBlocks(duration, continent) {
      this.topMinersType = 'blocks'
      this.topMinersLoading = true
      this.topMinersByBlocks = await this.$axios.$get('/miner/top-miners/blocks', { params: continent ? { count: 10, duration, continent } : { count: 10, duration } })
      this.topMinersLoading = false
    },
    async getTopMinersByPowerDelta(duration, continent) {
      this.topMinersType = 'power-growth'
      this.topMinersLoading = true
      this.topMinersByPowerDelta = await this.$axios.$get('/miner/top-miners/power-growth', { params: continent ? { count: 10, duration, continent } : { count: 10, duration } })
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
