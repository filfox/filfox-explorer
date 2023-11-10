<template>
  <div class="container mx-auto">
    <StatsFevmOverview />
    <div class="bg-white lg:rounded-md mt-4">
      <HomeTitle type="fevmChart" class="border-b border-background" />
      <FevmDataChart />
    </div>
    <StatsFevmTopContracts more />
  </div>
</template>
<script>

export default {
  head() {
    return {
      title: this.$t('meta.titles.fevm')
    }
  }
}
</script>
