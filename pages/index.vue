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
      <div class="flex flex-grow flex-col bg-white mr-2 rounded-md">
        <div class="flex h-12 items-center ml-5">{{$t('home.lastBlocks.title')}}</div>
        <el-table :data="minerRanks" class="m-5 w-auto" :empty-text="$t('shared.tableEmptyText')">
         <el-table-column v-for="(value,key) in lastBlocksHeaders" :key="key" :label="value" ></el-table-column>
        </el-table>
      </div>

      <!-- 富豪榜 -->
      <div class="flex flex-grow flex-col bg-white mr-2 rounded-md">
        <div class="flex h-12 items-center ml-5">{{$t('home.richManRanks.title')}}</div>
        <el-table :data="minerRanks" class="m-5 w-auto" :empty-text="$t('shared.tableEmptyText')">
         <el-table-column v-for="(value,key) in richManRanksHeaders" :key="key" :label="value" ></el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>

<script>
import overviewCell from "~/components/home/overview-cell";

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
    overviewCell
  },
  data() {
    return {
      overviewExpanded: false,
      overviewTitles: this.$t("home.overview.titles"),
      overview: {},
      rankTableHeaders: this.$t("home.minerRanks.tableHeaders"),
      lastBlocksHeaders: this.$t("home.lastBlocks.tableHeaders"),
      richManRanksHeaders:this.$t("home.richManRanks.tableHeaders"),
      minerRanks: [],
      lastBlocks: [],
      richManRanks: [],
    };
  },
  mounted() {

  },
  methods: {
  }

};
</script>