<template>
    <div class="my-2 lg:my-4">
      <div class="bg-white flex justify-between h-10 lg:h-12 border-b border-background lg:rounded-t-md ">
        <HomeTitle type="overview" />
        <div class="flex items-center mr-4"> 
          <el-button
          class="focus:outline-none outline-none hidden lg:flex"
          v-on:click="overviewExpanded = !overviewExpanded"
         round size="mini"> {{ overviewExpanded ? $t('home.overview.foldBtn'): $t('home.overview.unfoldBtn') }}</el-button>
        </div>
      </div>
      <div class="bg-white px-4 pt-4 lg:p-4 lg:rounded-b-md">
        <div class="grid grid-flow-row grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-4">
          <OverviewCell :name="$t('home.overview.titles.height')" :value="overview.height.toString()" />
          <OverviewCell :name="$t('home.overview.titles.timestamp')" :value="overview.timestamp" type="FromNow" />
          <OverviewCell :name="$t('home.overview.titles.qualityAdjPower')" :value="overview.qualityAdjPower.toString() | size_metric(2)" :tipContent="$t('home.overview.tips.qualityAdjPower')" />
          <OverviewCell :name="$t('home.overview.titles.activeMiners')" :value="overview.activeMiners.toString()" :tipContent="$t('home.overview.tips.activeMiners')" />
          <OverviewCell :name="$t('home.overview.titles.price')" :value="'$ ' + overview.price.toFixed(2).toString()" :tipContent="$t('home.overview.tips.price')" />
          <OverviewCell :name="$t('home.overview.titles.blockReward')" :value="overview.blockReward.toString() | filecoin(4)" :tipContent="$t('home.overview.tips.blockReward')" />
          <OverviewCell :name="$t('home.overview.titles.averageRewardPerByte')" :value="overview.averageRewardPerByte * 2 ** 40 * 3456 | filecoinOnAvg(2)" :tipContent="$t('home.overview.tips.averageRewardPerByte')" />
          <OverviewCell :name="$t('home.overview.titles.output24h')" :value="overview.dailyCoinsMined | filecoin(0)" :tipContent="$t('home.overview.tips.output24h')" />
          <OverviewCell :name="$t('home.overview.titles.sectorInitialPledge')" :value="(overview.estimatedInitialPledgeCollateral * 32 * Math.pow(2, 30) / 1e18).toFixed(2).toString() + ' FIL/32GiB'" />
          <OverviewCell :name="$t('home.overview.titles.totalPledgeCollateral')" :value="overview.totalPledgeCollateral.toString() | filecoin(0)" :tipContent="$t('home.overview.tips.totalPledgeCollateral')" />
          
          <template v-if="overviewExpanded">
            <OverviewCell :name="$t('home.overview.titles.circulatingSupply')" :value="overview.circulatingSupply.toString() | filecoin(0)" :tipContent="$t('home.overview.tips.circulatingSupply')" />
            <OverviewCell :name="$t('home.overview.titles.accounts')" :value="overview.accounts.toString()" />
            <OverviewCell :name="$t('home.overview.titles.averageTipsetInterval')" :value="overview.averageTipsetInterval.toFixed(2).toString() + ' ' + $t('shared.time.sec')" :tipContent="$t('home.overview.tips.averageTipsetInterval')" />
            <OverviewCell :name="$t('home.overview.titles.dailyMessages')" :value="overview.dailyMessages" />
            <OverviewCell :name="$t('home.overview.titles.averageTipsetBlocks')" :value="overview.averageTipsetBlocks.toFixed(2).toString()" :tipContent="$t('home.overview.tips.averageTipsetBlocks')" />
            <OverviewCell :name="$t('home.overview.titles.rawBytePower')" :value="overview.rawBytePower.toString() | size_metric(2)" :tipContent="$t('home.overview.tips.rawBytePower')" />
            <OverviewCell :name="$t('home.overview.titles.averageGasPrice')" :value="overview.averageGasPrice.toFixed(2).toString() + ' AttoFIL'" :tipContent="$t('home.overview.tips.averageGasPrice')" />
            <OverviewCell :name="$t('home.overview.titles.burntSupply')" :value="overview.burntSupply.toString() | filecoin(0)" />
            <OverviewCell :name="$t('home.overview.titles.totalMaxSupply')" :value="overview.totalMaxSupply.toString() | filecoin(0)" />  
            <OverviewCell :name="$t('home.overview.titles.totalMarketBalance')" :value="overview.totalMarketBalance.toString() | filecoin(0)" :tipContent="$t('home.overview.tips.totalMarketBalance')" />
            <OverviewCell :name="$t('home.overview.titles.circulatingSupplyRate')" :value="(overview.circulatingSupply/overview.totalMaxSupply * 100).toFixed(2) + '%'" :tipContent="$t('home.overview.tips.circulatingSupplyRate')" />
          </template>
        </div>
        <div class="flex mx-auto h-10 items-center lg:hidden"> 
          <el-button type="text" class="mx-auto outline-none focus:outline-none" size="small" @click="overviewExpanded = !overviewExpanded"> {{ overviewExpanded ? $t('home.overview.foldBtn'): $t('home.overview.unfoldBtn') }} </el-button>
        </div>
      </div>
    </div>
</template>

<style>
.el-button--text {
    color: #606266
  }
.el-button--text:focus, .el-button--text:hover {
  color: #606266;
}
</style>

<script>
export default {
    props: {
        overview: {type: Object, required: true}
    },
    data() {
        return {
            overviewExpanded: false,
        }
    },
}
</script>
