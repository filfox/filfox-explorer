<template>
  <div class="container mx-auto">
    <StatsFvmTopContracts :page-size="15" />
  </div>
</template>
<script>

export default {
  data() {
    return {
      loading: false
    }
  },

  computed: {
  },

  mounted() {
  },

  methods: {

  },

  head() {
    return {
      title: this.$t('meta.titles.fvm')
    }
  }
}
</script>
