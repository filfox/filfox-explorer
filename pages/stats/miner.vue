<template>
  <div class="container mx-auto">
    <div class="mt-4 lg:mt-6 font-medium text-xs lg:text-base ml-4 lg:ml-0">
      {{ $t('chart.miner.title') }}
    </div>
    <div class="lg:rounded-md mt-2 lg:mt-4 bg-white">
      <div class="border-b border-background h-10 lg:h-12 flex items-center pl-4 lg:pl-6 text-xs lg:text-base">
        {{ $t('chart.miner.headers.qualityAdjPowerPie') }}
      </div>
      <client-only>
        <PowerDistributionChart class="mx-4 mt-4 lg:mt-12" />
      </client-only>
    </div>

    <div class="lg:rounded-md mt-2 lg:mt-4 bg-white">
      <div class="border-b border-background h-10 lg:h-12 flex items-center pl-4 lg:pl-6 text-xs lg:text-base">
        {{ $t('chart.miner.headers.qualityAdjPowerDeltaLine') }}
      </div>
      <client-only>
        <PowerDeltaChart :max-count="5" class="ml-3 lg:ml-0 mt-4 lg:mt-12" />
      </client-only>
    </div>

    <RewardMinerChart class="my-4" />

    <SectorInitialPledgeChart class="my-4" />
  </div>
</template>

<script>

export default {
  head() {
    return {
      title: `${this.$t('meta.titles.minerCharts')}`
    }
  }
}

</script>
