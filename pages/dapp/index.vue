<template>
  <div class="flex">
    <DappList />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `${this.$t('meta.titles.dapp')}`
    }
  }
}
</script>
