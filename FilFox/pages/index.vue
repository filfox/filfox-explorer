<template>
  <div class="container mx-auto">

    <HomeOverview :overview="overview" />

    <div class="grid grid-flow-col grid-rows-1 grid-cols-2 mb-4">
      <div class="flex flex-col bg-white rounded-md mr-2">
        <HomeTitle type="powerDistribution" class="border-b border-background h-12 mr-4" />
        <client-only>
            <PowerDistributionChart class="mx-4 mt-12"/>
        </client-only>
      </div>
      
      <div class="flex flex-col bg-white ml-2 rounded-md">
        <HomeTitle type="powerDelta" class="border-b border-background h-12 mr-4" />
        <client-only>
            <PowerDeltaChart class="mx-4 mt-12"/>
        </client-only>
      </div>
    </div>

    <HomeMinerRanks/>

    <div class="flex flex-row mb-4">
      <HomeRecentTipsets :recentTipsets="recentTipsets" :recentTipsetsLoading="recentTipsetsLoading" />
      <HomeRichList :richList="richList" :richListLoading="richListLoading" />
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