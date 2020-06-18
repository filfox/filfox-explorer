<template>
  <div class="container mx-auto">
    <!-- 全网概览 -->
    <div class="my-4">
      <div class="bg-white flex justify-between h-12 border-b border-background rounded-t-md">
        <HomeTitle type="overview" />
        <div class="flex items-center mr-4"> 
          <el-button
          class="focus:outline-none outline-none"
          v-on:click="overviewExpanded = !overviewExpanded"
         round size="mini"> {{ overviewExpanded ? $t('home.overview.foldBtn'): $t('home.overview.unfoldBtn') }}</el-button>
        </div>
      </div>
      <div class="bg-white p-4 rounded-b-md">
        <div class="grid grid-flow-row grid-cols-5 gap-4 text-center">
            <OverviewCell :name="$t('home.overview.titles.height')" :value="overview.height.toString()">  </OverviewCell>
            <OverviewCell :name="$t('home.overview.titles.timestamp')" :value="overview.timestamp.toString() | timestamp('time')">  </OverviewCell>
            <OverviewCell :name="$t('home.overview.titles.qualityAdjPower')" :value="overview.qualityAdjPower.toString() | size_metric(2)">  </OverviewCell>
            <OverviewCell :name="$t('home.overview.titles.activeMiners')" :value="overview.activeMiners.toString()">  </OverviewCell>
            <OverviewCell :name="$t('home.overview.titles.price')" :value="'$ ' + overview.price.toFixed(2).toString()">  </OverviewCell>
            <OverviewCell :name="$t('home.overview.titles.blockReward')" :value="overview.blockReward.toString() | filecoin(4)">  </OverviewCell>
            <OverviewCell :name="$t('home.overview.titles.accounts')" :value="overview.accounts.toString()">  </OverviewCell>
            <OverviewCell :name="$t('home.overview.titles.averageTipsetInterval')" :value="overview.averageTipsetInterval.toFixed(2).toString()">  </OverviewCell>
            <OverviewCell :name="$t('home.overview.titles.averageBlockSize')" :value="overview.averageBlockSize.toFixed(2).toString()">  </OverviewCell>
            <OverviewCell :name="$t('home.overview.titles.averageTipsetBlocks')" :value="overview.averageTipsetBlocks.toFixed(2).toString()">  </OverviewCell> 
            <template v-if="overviewExpanded">
              <OverviewCell :name="$t('home.overview.titles.rawBytePower')" :value="overview.rawBytePower.toString() | size_metric(2)">  </OverviewCell>
              <OverviewCell :name="$t('home.overview.titles.averageGasPrice')" :value="overview.averageGasPrice.toFixed(2).toString() + ' AttoFIL'">  </OverviewCell>
              <OverviewCell :name="$t('home.overview.titles.circulatingSupply')" :value="overview.circulatingSupply.toString() | filecoin(0)">  </OverviewCell>
              <OverviewCell :name="$t('home.overview.titles.totalPledgeCollateral')" :value="overview.totalPledgeCollateral.toString() | filecoin(0)">  </OverviewCell>
              <OverviewCell :name="$t('home.overview.titles.burntSupply')" :value="overview.burntSupply.toString() | filecoin(4)">  </OverviewCell>
              <OverviewCell :name="$t('home.overview.titles.totalSupply')" :value="overview.totalSupply.toString() | filecoin(0)">  </OverviewCell>  
              <OverviewCell :name="$t('home.overview.titles.totalMarketBalance')" :value="overview.totalMarketBalance.toString() | filecoin(0)">  </OverviewCell>  
            </template>
        </div>
      </div>
    </div>

    <!-- 图表 -->
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

    <!-- 挖矿排行榜 -->
    <MinerRanksTable/>

    <!-- 最新区块 富豪榜  -->
    <div class="flex flex-row mb-4">
      <!-- 最新区块 -->
      <div class="bg-white mr-2 rounded-md w-1/2 flex flex-col overflow-hidden">
        <div class="flex flex-row items-center justify-between border-b border-background">
          <HomeTitle type="recentTipsets" class="ml-4 flex flex-grow"/>
          <el-button round size="mini" class="mr-4 focus:outline-none outline-none" v-on:click="didRecentTipsetsMoreBtnClicked"> {{ $t('shared.more') }} </el-button>
        </div>
        <div class="mt-2 overflow-y-scroll flex-grow relative">
          <table class="w-full table-auto absolute" v-if="!recentTipsetsLoading">
             <thead class="text-gray-600 text-sm m-2">
               <tr>
                   <th class="sticky top-0 bg-white z-10"> {{$t('home.recentTipsets.tableHeaders.height')}} </th>
                   <th class="sticky top-0 bg-white z-10"> {{$t('home.recentTipsets.tableHeaders.blockId')}} </th>
                   <th class="sticky top-0 bg-white z-10"> {{$t('home.recentTipsets.tableHeaders.miner')}} </th>
                   <th class="sticky top-0 bg-white z-10"> {{$t('home.recentTipsets.tableHeaders.message')}} </th>
                   <th class="sticky top-0 bg-white z-10"> {{$t('home.recentTipsets.tableHeaders.award')}} </th>
               </tr>
            </thead>
            <tbody class="text-center">
               <template v-for="(tipset, tipsetIndex) in recentTipsets">
                   <tr v-for="(block, blockIndex) in tipset.blocks" :key="block.hash"
                    :class="{'bg-gray-200': tipsetIndex % 2, 'smb:hidden': tipsetIndex >= 5}">
                   <td v-if="blockIndex === 0" :rowspan="tipset.blocks.length">
                      <div class="flex flex-col">
                        <TipsetLink :id="tipset.height" class="text-main text-base" />
                        <FromNow :timestamp="tipset.timestamp" format="seconds" class="text-sm"/>
                     </div>
                  </td>
                  <td>
                      <BlockLink :id="block.cid" :format="5" class="md:hidden text-sm"/>
                      <BlockLink :id="block.cid" :format="8" class="mdb:hidden text-sm" />
                  </td>
                  <td>
                    <AddressLink :id="block.miner" class="text-sm"/>
                  </td>
                  <td class="smb:hidden text-sm">{{ block.messageCount }}</td>
                  <td class="text-sm"> {{ block.reward | filecoin(2) }} </td>
                  </tr>
                </template>
            </tbody>
          </table>
          <div class="flex h-24" v-if="recentTipsetsLoading" v-loading="recentTipsetsLoading"></div>
        </div>
      </div>

      <!-- 富豪榜 -->
      <div class="flex flex-col w-1/2 bg-white ml-2 rounded-md">
        <div class="flex flex-row items-center justify-between border-b border-background">
          <HomeTitle type="richManRanks" class="ml-4 flex flex-grow"/>
          <el-button round size="mini" class="mr-4 focus:outline-none outline-none" v-on:click="didRichManListMoreBtnClicked"> {{ $t('shared.more') }} </el-button>
        </div>
        <table class="w-full table-fixed mt-2" v-if="!richListLoading">
            <thead class="text-gray-600 text-sm">
              <tr>
                <th> {{$t('home.richManRanks.tableHeaders.order')}} </th>
                <th> {{$t('home.richManRanks.tableHeaders.address')}} </th>
                <th> {{$t('home.richManRanks.tableHeaders.balance')}} </th>
              </tr>
            </thead>
            <tbody class="text-center text-sm">
              <tr v-for="(rich, index) in richList.list" :key="index" class="border-b border-background h-10">
                  <td> 
                    <RankIndex :index="index+1"/>  
                  </td>
                  <td>
                    <AddressLink :id="rich.address" :format="10"/>
                  </td>
                  <td> {{rich.balance | filecoin(0)}} </td>
              </tr>
            </tbody>
        </table>
        <div class="flex h-24" v-if="richListLoading" v-loading="richListLoading"></div>
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
import HomeTitle from "~/components/home/home-title"
import OverviewCell from "~/components/home/overview-cell"
import FromNow from '@/components/shared/from-now'
import MinerRanksTable from '@/components/home/miner-ranks'
import PowerDeltaChart from '@/components/home/power-delta-chart'
import PowerDistributionChart from '@/components/home/power-distribution-chart'
import RankIndex from '@/components/home/rank-index'

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
    HomeTitle,
    OverviewCell,
    FromNow,
    MinerRanksTable,
    PowerDeltaChart,
    PowerDistributionChart,
    RankIndex
  },
  data() {
    return {
      overviewExpanded: false,
      overviewTitles: this.$t("home.overview.titles"),
      overview: {},
      recentTipsets: [],
      richManRanksHeaders:this.$t("home.richManRanks.tableHeaders"),
      richList: {},
      recentTipsetsLoading: false,
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
    didRecentTipsetsMoreBtnClicked() {
      this.$router.push(this.localePath('/blockchain/blocks'))
    },
    didRichManListMoreBtnClicked() {
      this.$router.push(this.localePath('/blockchain/rich'))
    }
  }

};
</script>