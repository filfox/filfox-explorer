<template>
  <div class="flex items-center h-10 lg:h-12 pl-4">
    <img v-if="type == 'overview'" src="~/assets/img/home/overview.svg" alt="icon" class="image">
    <img v-else-if="type == 'entireQualityAdjPower'" src="~/assets/img/home/line-chart.svg" alt="icon" class="image">
    <img v-else-if="type == 'powerDistribution'" src="~/assets/img/home/power-distribution.svg" alt="icon" class="image">
    <img v-else-if="type == 'powerDelta'" src="~/assets/img/home/power-delta.svg" alt="icon" class="image">
    <img v-else-if="type == 'baseFee'" src="~/assets/img/home/line-chart.svg" alt="icon" class="image">
    <img v-else-if="type == 'minerRanks'" src="~/assets/img/home/miner-ranks.svg" alt="icon" class="image">
    <img v-else-if="type == 'recentTipsets'" src="~/assets/img/home/blocks.svg" alt="icon" class="image">
    <img v-else-if="type == 'richManRanks'" src="~/assets/img/home/rich.svg" alt="icon" class="image">
    <img v-else-if="type == 'fvmOverview'" src="~/assets/img/home/fvmOverview.svg" alt="icon" class="image">
    <img v-else-if="type == 'fvmTopContracts'" src="~/assets/img/home/fvmTopContracts.svg" alt="icon" class="image">
    <img v-else-if="type == 'verifiedContracts'" src="~/assets/img/home/verifiedContracts.svg" alt="icon" class="image">
    <div class="ml-2 text-sm lg:text-base">
      {{ $t(`home.${type}.title`) }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, required: true }
  }
}
</script>

<style lang="postcss" scoped>
  .image {
    @apply w-4;
  }
  @screen lg {
    .image {
      @apply w-5;
    }
  }
</style>
