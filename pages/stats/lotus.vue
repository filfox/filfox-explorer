<template>
  <div class="container mx-auto">
    <div class="lg:rounded-md my-2 lg:my-4 bg-white">
      <div class="border-b border-background h-10 lg:h-12 flex items-center pl-4 lg:pl-6 text-xs lg:text-base">
        {{ $t('chart.lotus.pie') }}
      </div>
      <client-only>
        <LotusChart class="mx-4 mt-4 lg:mt-12" />
      </client-only>
    </div>
  </div>
</template>

<script>

export default {
  head() {
    return {
      title: `${this.$t('nav.charts.subMenus.2')}`
    }
  }
}

</script>
