<template>
  <div class="container mx-auto my-4">
    <HomeFevmNavigation sort />
  </div>
</template>
<script>

export default {
  head() {
    return {
      title: this.$t('home.fevmNavigation.title')
    }
  }
}
</script>
