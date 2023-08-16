<template>
  <div>
    <RichList class="hidden lg:block" />
    <RichListMobile class="lg:hidden" />
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
