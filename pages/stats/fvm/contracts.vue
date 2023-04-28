<template>
  <div class="container mx-auto">
    <StatsFvmTopContracts :page-size="15" pagination />
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
