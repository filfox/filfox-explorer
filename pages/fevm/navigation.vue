<template>
  <div class="container mx-auto bg-white my-4 rounded-md">
    <HomeFevmNavigation sort />
  </div>
</template>
<script>

export default {
  data() {
    return {}
  },

  computed: {
  },

  mounted() {
  },

  methods: {},

  head() {
    return {
      title: this.$t('home.fevmNavigation.title')
    }
  }
}
</script>
