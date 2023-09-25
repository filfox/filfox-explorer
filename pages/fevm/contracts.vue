<template>
  <div class="container mx-auto">
    <StatsFevmTopContracts :page-size="15" pagination time-range />
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
