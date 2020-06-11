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
      <div class="justify-between flex flex-row">
        <div class="flex h-12 items-center ml-5">{{$t('home.minerRanks.title')}}</div>
        <div class="flex h-12 items-end mr-5">
          <el-radio-group v-model="duration" size="mini" @change="onUpdateSelectedMinerRanksOption" fill="#1a4fc9">
            <el-radio-button label="24h"> {{ '24' + $t('shared.time.hour') }} </el-radio-button>
            <el-radio-button label="7d">  {{'7' + $t('shared.time.day')}} </el-radio-button>
            <el-radio-button label="30d">  {{'30' + $t('shared.time.day')}} </el-radio-button>
            <el-radio-button label="1y"> {{'1' + $t('shared.time.year')}} </el-radio-button>
          </el-radio-group>
        </div>
        </div>
      <div class="h-8"></div>

      <table class="w-full table-auto" >
        <thead class="text-gray-600 text-sm m-2">
          <tr>
            <th v-for="(title, index) in rankTableHeaders" :key="index"> {{title}} </th>
          </tr>
        </thead>
        <tbody class="text-sm text-center">
          <tr v-for="(miner, index) in topMinersByPower.miners" :key="index" class="border-b border-background h-10"> 
            <td> {{index}} </td>
            <td> {{ miner.address }} </td>
            <td> 未知 </td>
            <td> {{ miner.qualityAdjPower | size_metric(2) }} </td>
            <td> {{ (miner.qualityAdjPower/topMinersByPower.totalQualityAdjPower).toFixed(2) }} </td>
            <td> {{ miner.blocksMined }} </td>
            <td> {{ miner.qualityAdjPowerDelta | size_metric(2)}} </td>
          </tr>
        </tbody>
      </table>

    </div>

    <!-- 最新区块 富豪榜  -->
    <div class="flex flex-row mb-5">
      <!-- 最新区块 -->
      <div class="bg-white mr-1 rounded-md w-1/2 flex flex-col overflow-hidden">
        <div class="flex h-12 items-center ml-5 mr-5 border-b border-background">{{$t('home.recentTipsets.title')}}</div>
        <div class="mt-2 overflow-y-scroll flex-grow relative">
          <table class="w-full table-auto absolute">
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
                  <td class="text-sm"> {{ block.reward | filecoin(2)  }} </td>
                  </tr>
                </template>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 富豪榜 -->
      <div class="flex flex-col w-1/2 bg-white ml-1 rounded-md">
        <div class="flex h-12 items-center ml-5 mr-5 border-b border-background">{{$t('home.richManRanks.title')}}</div>
        <table class="w-full table-fixed mt-2">
            <thead class="text-gray-600 text-sm">
              <tr>
                <th> {{$t('home.richManRanks.tableHeaders.order')}} </th>
                <th> {{$t('home.richManRanks.tableHeaders.address')}} </th>
                <th> {{$t('home.richManRanks.tableHeaders.balance')}} </th>
              </tr>
            </thead>
            <tbody class="text-center text-sm">
              <tr v-for="(rich, index) in richList.list" :key="index" class="border-b border-background h-10">
                  <td> {{index + 1}} </td>
                  <td>
                    <AddressLink :id="rich.address" :format="10"/>
                  </td>
                  <td> {{rich.balance | filecoin(0)}} </td>
              </tr>
            </tbody>
        </table>
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
        richList,
      ] = await Promise.all([
        $axios.$get('/overview'),
        $axios.$get('/tipset/recent', {params: {count: 10}}),
        $axios.$get('/rich-list', {params: {pageSize: 10,page: 0}}),
      ])
      return {
        overview,
        recentTipsets,
        richList,
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
      duration:'24h',
      topMinersByPower: {},
      topMinerBlocks: [],
      topMinerPowerDelta: [],
      richManRanksHeaders:this.$t("home.richManRanks.tableHeaders"),
      recentTipsets: [],
      richList: {},
    };
  },
  mounted() {
      this.$onUpdateOverview = this.onUpdateOverview.bind(this)
      this.$subscribe('blockchain', 'blockchain/overview', this.$onUpdateOverview)
      this.$onUpdateRichList = this.onUpdateRichList.bind(this)
      this.$subscribe('account', 'account/rich-list', this.$onUpdateRichList)
      this.getTopMinersByPowers()
  },
  beforeDestroy() {
    this.$unsubscribe('blockchain', 'blockchain/overview', this.$onUpdateOverview)
    this.$unsubscribe('account', 'account/rich-list', this.$onUpdateRichList)
  },
  methods: {
    getTopMinersByPowers() {
      this.$axios.get('/miner/top-miners/power', {params: {count: 10}})
      .then(res => {
          this.topMinersByPower = res.data
      })
    },
    onUpdateSelectedMinerRanksOption(label) {
      // TODO 
      // Switch to request & refresh
    },
    onUpdateOverview(overview) {
      this.overview = overview
    },
    onUpdateRichList(richList) {
      this.richList = richList
    }
  }

};
</script>