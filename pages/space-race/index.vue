<template>
  <div class=" bg-spaceRace">
    <Sr :overview="overview" class="hidden lg:block" />
  </div>
</template>


<script>
export default {
  async asyncData({ $axios, error }) {
    try {
      const overview = await $axios.$get('/space-race/overview')
      return { overview }
    } catch (err) {
      if (err?.response) {
        error({ code: err.response.status, message: err.response.statusText })
      } else {
        error({ code: 500, message: 'Server Error'() })
      }
    }
  },
  data() {
    return {
      overview: {}
    }
  },
  head() {
    return {
      title: this.$t('spaceRace.title')
    }
  }
}
</script>
