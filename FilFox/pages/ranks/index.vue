<template>
    <div>
         <MinerRanks class="hidden lg:flex"/>
         <MinerRanksMobile class="lg:hidden"/>
    </div>
</template>

<script>
export default {
  head() {
    return {
      title: `${this.$t('meta.titles.ranks')}`
    }
  }
}
</script>