<template>
  <div class="container mx-auto">

    <HomeOverview :overview="overview" />

    <div class="hidden flex-col lg:grid lg:grid-flow-col lg:grid-rows-1 lg:grid-cols-2 mb-2 lg:mb-4">
      <div class="flex flex-col bg-white lg:rounded-md lg:mr-2 mb-2 lg:mb-0">
        <HomeTitle type="powerDistribution" class="border-b border-background h-10 lg:h-12 lg:pr-4" />
        <client-only>
            <PowerDistributionChart class="mt-2 mx-1 lg:mx-4 lg:mt-12"/>
        </client-only>
      </div>
      
      <div class="flex flex-col bg-white lg:ml-2 lg:rounded-md">
        <HomeTitle type="powerDelta" class="border-b border-background h-10 lg:h-12 lg:pr-4" />
        <client-only>
            <PowerDeltaChart class="mt-2 mx-1 lg:mx-4 lg:mt-12"/>
        </client-only>
      </div>
    </div>

    <HomeMinerRanksMobile class="lg:hidden"/>
    <HomeMinerRanks class="hidden lg:flex"/>

    <div class="mb-4 hidden lg:flex lg:flex-row">
      <HomeRecentTipsets :recentTipsets="recentTipsets" :recentTipsetsLoading="recentTipsetsLoading" />
      <HomeRichList :richList="richList" :richListLoading="richListLoading" />
    </div>

    <HomeRecentTipsetsMobile :recentTipsets="recentTipsets" :recentTipsetsLoading="recentTipsetsLoading" class="flex flex-grow lg:hidden"/>
    <HomeRichListMobile :richList="richList" :richListLoading="richListLoading" class="flex flex-grow lg:hidden"/>

    <div class="flex flex-col lg:hidden lg:grid-flow-col lg:grid-rows-1 lg:grid-cols-2 mb-2 lg:mb-4">
      <div class="flex flex-col bg-white lg:rounded-md lg:mr-2 mb-2 lg:mb-0">
        <HomeTitle type="powerDistribution" class="border-b border-background h-10 lg:h-12 lg:pr-4" />
        <client-only>
            <PowerDistributionChart class="mt-2 mx-1 lg:mx-4 lg:mt-12"/>
        </client-only>
      </div>
      
      <div class="flex flex-col bg-white lg:ml-2 lg:rounded-md">
        <HomeTitle type="powerDelta" class="border-b border-background h-10 lg:h-12 lg:pr-4" />
        <client-only>
            <PowerDeltaChart class="mt-2 mx-1 lg:mx-4 lg:mt-12"/>
        </client-only>
      </div>
    </div>

  </div>
</template>

<style>
 svg {
   display: inline-block
 }
</style>

<script>
import FromNow from '@/components/shared/from-now'

export default {
  async asyncData({$axios, error}) {
    try {
      const [
        overview,
      ] = await Promise.all([
        $axios.$get('/overview'),
      ])
      return {
        overview,
      }
    } catch (err) {
      if (err?.response) {
        error({code: err.response.status, message: err.response.statusText})
      } else {
        error({code: 500, message: err.toString()})
      }
    }
  },
  components: {
    FromNow,
  },
  data() {
    return {
      overview: {},
      recentTipsets:[],
      recentTipsetsLoading: false,
      richList: {},
      richListLoading: false,
    };
  },
  mounted() {
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
    getRecentTipsets() {
        this.recentTipsetsLoading = true
        this.$axios
        .get("/tipset/recent", { params: { count: 10 } })
        .then(res => {
          this.recentTipsets = res.data;
          this.recentTipsetsLoading = false
        });
    },
    getRichList() {
        this.richListLoading = true
        this.$axios
        .get("/rich-list", { params: {pageSize: 10,page: 0} })
        .then(res => {
          this.richList = res.data;
          this.richListLoading = false
        });
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
  }

};
</script>