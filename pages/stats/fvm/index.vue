<template>
  <div class="container mx-auto">
    <StatsFvmOverview />
    <StatsFvmTopContracts more />
  </div>
</template>
<script>

export default {
  head() {
    return {
      title: this.$t('meta.titles.fvm')
    }
  }
}
</script>
