<template>
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
            <OverviewCell :name="$t('home.overview.titles.timestamp')" :value="overview.timestamp" type="FromNow">  </OverviewCell>
            <OverviewCell :name="$t('home.overview.titles.qualityAdjPower')" :value="overview.qualityAdjPower.toString() | size_metric(2)">  </OverviewCell>
            <OverviewCell :name="$t('home.overview.titles.activeMiners')" :value="overview.activeMiners.toString()">  </OverviewCell>
            <OverviewCell :name="$t('home.overview.titles.price')" :value="'$ ' + overview.price.toFixed(2).toString()">  </OverviewCell>
            <OverviewCell :name="$t('home.overview.titles.blockReward')" :value="overview.blockReward.toString() | filecoin(4)">  </OverviewCell>
            <OverviewCell :name="$t('home.overview.titles.averageRewardPerByte')" :value="overview.averageRewardPerByte * 2 ** 40 * 3456 | filecoinOnAvg(2)">  </OverviewCell>
            <OverviewCell :name="$t('home.overview.titles.output24h')" :value="overview.dailyCoinsMined | filecoin(0)">  </OverviewCell>
            <OverviewCell :name="$t('home.overview.titles.circulatingSupply')" :value="overview.circulatingSupply.toString() | filecoin(0)"></OverviewCell>
            <OverviewCell :name="$t('home.overview.titles.totalPledgeCollateral')" :value="overview.totalPledgeCollateral.toString() | filecoin(0)">  </OverviewCell>  
            
            <template v-if="overviewExpanded">
              <OverviewCell :name="$t('home.overview.titles.accounts')" :value="overview.accounts.toString()">  </OverviewCell>
              <OverviewCell :name="$t('home.overview.titles.averageTipsetInterval')" :value="overview.averageTipsetInterval.toFixed(2).toString() + ' ' + $t('shared.time.sec')">  </OverviewCell>
              <OverviewCell :name="$t('home.overview.titles.dailyMessages')" :value="overview.dailyMessages">  </OverviewCell>
              <OverviewCell :name="$t('home.overview.titles.averageTipsetBlocks')" :value="overview.averageTipsetBlocks.toFixed(2).toString()">  </OverviewCell> 
              <OverviewCell :name="$t('home.overview.titles.rawBytePower')" :value="overview.rawBytePower.toString() | size_metric(2)">  </OverviewCell>
              <OverviewCell :name="$t('home.overview.titles.averageGasPrice')" :value="overview.averageGasPrice.toFixed(2).toString() + ' AttoFIL'">  </OverviewCell>
              <OverviewCell :name="$t('home.overview.titles.burntSupply')" :value="overview.burntSupply.toString() | filecoin(4)">  </OverviewCell>
              <OverviewCell :name="$t('home.overview.titles.totalMaxSupply')" :value="overview.totalMaxSupply.toString() | filecoin(0)">  </OverviewCell>  
              <OverviewCell :name="$t('home.overview.titles.totalMarketBalance')" :value="overview.totalMarketBalance.toString() | filecoin(0)">  </OverviewCell> 
              <OverviewCell :name="$t('home.overview.titles.circulatingSupplyRate')" :value="(overview.circulatingSupply/overview.totalMaxSupply * 100).toFixed(2) + '%'">  </OverviewCell>  
            </template>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props: {
        overview: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            overviewExpanded: false,
        }
    },
}
</script>