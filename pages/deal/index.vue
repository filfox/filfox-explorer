<template>
  <div>
    <DealList class="hidden lg:block" />
    <DealListMobile class="lg:hidden" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `${this.$t('meta.titles.dealList')}`
    }
  }
}
</script>
