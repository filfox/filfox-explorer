<template>
  <div class="relative">
    <div class="hidden lg:block">
      <span>{{ formatData }}</span>
      <span
        class="text-xs absolute ml-1 top-1px whitespace-pre"
        :class="[ changeRate > 0 ? 'text-increaseNum' : 'text-decreaseNum' ]"
      >  {{ formatChangeRate }}</span>
    </div>

    <div class="lg:hidden">
      <span
        class="text-xs whitespace-pre"
        :class="[ changeRate > 0 ? 'text-increaseNum' : 'text-decreaseNum' ]"
      >  {{ formatChangeRate }}</span>
      <span class="ml-2">{{ formatData }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'changeRate', 'dataFormat'],

  computed: {
    formatData() {
      return this.dataFormat
        ? this.dataFormat.replace(/%/, this.data)
        : this.data
    },

    formatChangeRate() {
      const rate = this.changeRate
      if (rate > 0) return `+${(Number(rate) * 100).toFixed(2)}%`
      if (rate < 0) return `${(Number(rate) * 100).toFixed(2)}%`
      return ''
    }
  }
}
</script>
