<template>
  <div class="my-2 lg:my-4">
    <div class="bg-white flex justify-between items-center h-10 lg:h-12 border-b border-background lg:rounded-t-md">
      <HomeTitle type="overview" />
      <el-button class="hidden lg:block mr-4" round size="mini" @click="overviewExpanded = !overviewExpanded">
        {{ overviewExpanded ? $t('home.overview.foldBtn'): $t('home.overview.unfoldBtn') }}
      </el-button>
    </div>
    <div class="bg-white px-4 pt-4 lg:p-4 lg:rounded-b-md">
      <div class="grid grid-flow-row grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-4 overview-list" :class="{'overview-expanded': overviewExpanded}">
        <OverviewCell :name="$t('home.overview.titles.height')">
          {{ overview.height | locale }}
        </OverviewCell>
        <OverviewCell
          type="FromNow"
          :name="$t('home.overview.titles.timestamp')"
          :timestamp="overview.timestamp"
        />
        <OverviewCell
          :name="$t('home.overview.titles.qualityAdjPower')"
          :tip-content="$t('home.overview.tips.qualityAdjPower')"
        >
          {{ overview.totalQualityAdjPower | size_metric(3) }}
        </OverviewCell>
        <OverviewCell
          :name="$t('home.overview.titles.activeMiners')"
          :tip-content="$t('home.overview.tips.activeMiners')"
        >
          {{ overview.activeMiners }}
        </OverviewCell>
        <OverviewCell
          :name="$t('home.overview.titles.blockReward')"
          :tip-content="$t('home.overview.tips.blockReward')"
        >
          {{ overview.blockReward | filecoin(4) }}
        </OverviewCell>
        <OverviewCell
          :name="$t('home.overview.titles.averageRewardPerByte')"
          :tip-content="$t('home.overview.tips.averageRewardPerByte')"
        >
          {{ overview.averageRewardPerByte * 2 ** 40 * epochsInDay | filecoin(4) }}/TiB
        </OverviewCell>
        <OverviewCell
          :name="$t('home.overview.titles.output24h')"
          :tip-content="$t('home.overview.tips.output24h')"
        >
          {{ overview.dailyCoinsMined | filecoin(0) }}
        </OverviewCell>
        <OverviewCell :name="$t('home.overview.titles.sectorInitialPledge')">
          {{ overview.estimatedInitialPledgeCollateral * 32 * 2 ** 30 | filecoin(4) }}/32GiB
        </OverviewCell>
        <OverviewCell
          :name="$t('home.overview.titles.totalPledgeCollateral')"
          :tip-content="$t('home.overview.tips.totalPledgeCollateral')"
        >
          {{ overview.totalPledgeCollateral | filecoin(0) }}
        </OverviewCell>
        <OverviewCell :name="$t('home.overview.titles.dailyMessages')">
          {{ overview.dailyMessages | locale }}
        </OverviewCell>


        <!-- Hidden cells -->
        <OverviewCell
          :name="$t('home.overview.titles.circulatingSupply')"
          :tip-content="$t('home.overview.tips.circulatingSupply')"
        >
          {{ overview.circulatingSupply | filecoin(0) }}
        </OverviewCell>
        <OverviewCell :name="$t('home.overview.titles.accounts')">
          {{ overview.accounts }}
        </OverviewCell>
        <OverviewCell
          :name="$t('home.overview.titles.averageTipsetInterval')"
          :tip-content="$t('home.overview.tips.averageTipsetInterval')"
        >
          {{ overview.averageTipsetInterval.toFixed(2) }} {{ $t('shared.time.sec') }}
        </OverviewCell>
        <OverviewCell
          :name="$t('home.overview.titles.averageTipsetBlocks')"
          :tip-content="$t('home.overview.tips.averageTipsetBlocks')"
        >
          {{ overview.averageTipsetBlocks.toFixed(2) }}
        </OverviewCell>
        <OverviewCell
          :name="$t('home.overview.titles.sealCost')"
          :tip-content="$t('home.overview.tips.sealCost')"
        >
          {{ overview.sealCost * 32 | filecoin(2) }}/TiB
        </OverviewCell>
        <OverviewCell :name="$t('home.overview.titles.currentBaseFee')">
          {{ overview.baseFee | filecoin(2) }}
        </OverviewCell>
        <OverviewCell :name="$t('home.overview.titles.burntSupply')">
          {{ overview.burntSupply | filecoin(0) }}
        </OverviewCell>
        <OverviewCell :name="$t('home.overview.titles.totalMaxSupply')">
          {{ overview.totalMaxSupply | filecoin(0) }}
        </OverviewCell>
        <OverviewCell
          :name="$t('home.overview.titles.circulatingSupplyRate')"
          :tip-content="$t('home.overview.tips.circulatingSupplyRate')"
        >
          {{ overview.circulatingSupply / overview.totalMaxSupply | percentage }}
        </OverviewCell>
        <OverviewCell
          :name="$t('home.overview.titles.price')"
          :tip-content="$t('home.overview.tips.price')"
        >
          $ {{ overview.price | locale(2) }}
        </OverviewCell>
      </div>
      <div class="flex mx-auto h-10 items-center lg:hidden">
        <el-button type="text" class="mx-auto" size="small" @click="overviewExpanded = !overviewExpanded">
          {{ overviewExpanded ? $t('home.overview.foldBtn'): $t('home.overview.unfoldBtn') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { epochsInDay } from '@/filecoin/filecoin.config'

export default {
  props: {
    overview: { type: Object, required: true }
  },
  data() {
    return {
      overviewExpanded: false,
      epochsInDay
    }
  }
}
</script>

<style scoped>
  .overview-list:not(.overview-expanded) > :nth-child(n + 11) {
    display: none;
  }
</style>
