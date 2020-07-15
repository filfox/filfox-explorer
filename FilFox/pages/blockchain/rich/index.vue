<template>
  <div class="flex">
    <RichList class="hidden lg:flex"/>
    <RichListMobile class="lg:hidden"/>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `${this.$t('meta.titles.rich')}`
    }
  }
}
</script>