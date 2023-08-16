<template>
  <div class="container mx-auto">
    <StatsFevmOverview />
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
