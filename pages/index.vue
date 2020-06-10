<template>
  <div class="container mx-auto">
    <!-- 全网概览 -->
    <div class="my-5">
      <div class="bg-white flex justify-between h-12 border-b border-background rounded-t-md">
        <div class="flex items-center ml-5">{{ $t('home.overview.title') }}</div>
        <button
          class="mr-5 text-center items-center"
          v-on:click="overviewExpanded = !overviewExpanded"
        >{{ $t('home.overview.foldBtn')}}</button>
      </div>
      <div class="bg-white p-5 rounded-b-md">
        <div class="grid grid-flow-row grid-cols-5 gap-4 text-center">
            <overviewCell :name="$t('home.overview.titles.height')" :value="overview.height.toString()">  </overviewCell>
            <overviewCell :name="$t('home.overview.titles.timestamp')" :value="overview.timestamp.toString() | timestamp('time')">  </overviewCell>
            <overviewCell :name="$t('home.overview.titles.qualityAdjPower')" :value="overview.qualityAdjPower.toString() | size_metric(2)">  </overviewCell>
            <overviewCell :name="$t('home.overview.titles.activeMiners')" :value="overview.activeMiners.toString()">  </overviewCell>
            <overviewCell :name="$t('home.overview.titles.price')" :value="'$ ' + overview.price.toFixed(2).toString()">  </overviewCell>
            <overviewCell :name="$t('home.overview.titles.blockReward')" :value="overview.blockReward.toString() | filecoin(4)">  </overviewCell>
            <overviewCell :name="$t('home.overview.titles.accounts')" :value="overview.accounts.toString()">  </overviewCell>
            <overviewCell :name="$t('home.overview.titles.averageTipsetInterval')" :value="overview.averageTipsetInterval.toFixed(2).toString()">  </overviewCell>
            <overviewCell :name="$t('home.overview.titles.averageBlockSize')" :value="overview.averageBlockSize.toFixed(2).toString()">  </overviewCell>
            <overviewCell :name="$t('home.overview.titles.averageTipsetBlocks')" :value="overview.averageTipsetBlocks.toFixed(2).toString()">  </overviewCell> 
            <template v-if="overviewExpanded">
              <overviewCell :name="$t('home.overview.titles.rawBytePower')" :value="overview.rawBytePower.toString() | size_metric(2)">  </overviewCell>
              <overviewCell :name="$t('home.overview.titles.averageGasPrice')" :value="overview.averageGasPrice.toFixed(2).toString() + ' AttoFIL'">  </overviewCell>
              <overviewCell :name="$t('home.overview.titles.circulatingSupply')" :value="overview.circulatingSupply.toString() | filecoin(0)">  </overviewCell>
              <overviewCell :name="$t('home.overview.titles.totalPledgeCollateral')" :value="overview.totalPledgeCollateral.toString() | filecoin(0)">  </overviewCell>
              <overviewCell :name="$t('home.overview.titles.burntSupply')" :value="overview.burntSupply.toString() | filecoin(4)">  </overviewCell>
              <overviewCell :name="$t('home.overview.titles.totalSupply')" :value="overview.totalSupply.toString() | filecoin(0)">  </overviewCell>  
            </template>
        </div>
      </div>
    </div>

    <!-- 图表 -->
    <div class="flex flex-row mb-5">
      <div class="flex-grow bg-white h-64 mr-2 rounded-md"></div>
      <div class="flex-grow bg-white h-64 ml-2 rounded-md"></div>
    </div>

    <!-- 挖矿排行榜 -->
    <div class="flex flex-grow flex-col mb-5 bg-white rounded-md">
      <div class="flex h-12 items-center ml-5">{{$t('home.minerRanks.title')}}</div>
      <div class="h-8"></div>
      <el-table :data="minerRanks" class="m-5 w-auto" :empty-text="$t('shared.tableEmptyText')">
        <el-table-column v-for="(value,key) in rankTableHeaders" :key="key" :label="value" ></el-table-column>
      </el-table>
    </div>

    <!-- 最新区块 富豪榜  -->
    <div class="flex flex-row mb-5">
      <!-- 最新区块 -->
      <div class="bg-white mr-1 rounded-md w-1/2">
        <div class="flex h-12 items-center ml-5 border-b border-background">{{$t('home.recentTipsets.title')}}</div>
        <table class="w-full table-auto mt-2">
          <thead class="text-gray-600 text-sm m-2">
            <tr>
              <th> {{$t('home.recentTipsets.tableHeaders.height')}} </th>
              <th> {{$t('home.recentTipsets.tableHeaders.blockId')}} </th>
              <th> {{$t('home.recentTipsets.tableHeaders.miner')}} </th>
              <th> {{$t('home.recentTipsets.tableHeaders.message')}} </th>
              <th> {{$t('home.recentTipsets.tableHeaders.award')}} </th>
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
                  <td class="text-sm"> {{ block.size }} </td>
                </tr>
              </template>
          </tbody>
        </table>
      </div>

      <!-- 富豪榜 -->
      <div class="flex flex-col w-1/2 bg-white ml-1 rounded-md">
        <div class="flex h-12 items-center ml-5">{{$t('home.richManRanks.title')}}</div>
        <el-table :data="minerRanks" class="m-5 w-auto" :empty-text="$t('shared.tableEmptyText')">
         <el-table-column v-for="(value,key) in richManRanksHeaders" :key="key" :label="value" ></el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>

<script>
import overviewCell from "~/components/home/overview-cell"
import FromNow from '@/components/from-now'

export default {
    async asyncData({$axios, error}) {
    try {
      const [
        overview,
        recentTipsets,
        {miners: topMinerPowers},
        {miners: topMinerBlocks, tipsetCount: last24hTipsetCount}
      ] = await Promise.all([
        $axios.$get('/overview'),
        $axios.$get('/tipset/recent', {params: {count: 10}}),
        $axios.$get('/miner/top-miners/power', {params: {count: 10}}),
        $axios.$get('/miner/top-miners/blocks', {params: {count: 10, duration: 86400}})
      ])
      return {
        overview,
        recentTipsets,
        topMinerPowers,
        topMinerBlocks,
        last24hTipsetCount
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
    overviewCell,
    FromNow
  },
  data() {
    return {
      overviewExpanded: false,
      overviewTitles: this.$t("home.overview.titles"),
      overview: {},
      rankTableHeaders: this.$t("home.minerRanks.tableHeaders"),
      richManRanksHeaders:this.$t("home.richManRanks.tableHeaders"),
      minerRanks: [],
      recentTipsets: [],
      richManRanks: [],
    };
  },
  mounted() {
      this.$onUpdateOverview = this.onUpdateOverview.bind(this)
      this.$subscribe('blockchain', 'blockchain/overview', this.$onUpdateOverview)
  },
  beforeDestroy() {
    this.$unsubscribe('blockchain', 'blockchain/overview', this.$onUpdateOverview)
  },
  methods: {
    onUpdateOverview(overview) {
      this.overview = overview
    },
  }

};
</script>