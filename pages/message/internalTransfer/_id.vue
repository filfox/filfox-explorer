<template>
  <div v-loading="loading" class="p-8">
    <vue-json-pretty :data="subcalls" />
  </div>
</template>

<script>
export default {
  layout: 'json',
  asyncData({ params }) {
    return { cid: params.id }
  },
  data() {
    return {
      cid: '',
      subcalls: [],
      loading: false
    }
  },
  mounted() { this.getSubcalls() },
  methods: {
    async getSubcalls() {
      this.loading = true
      const { subcalls } = await this.$axios.$get(`/message/${this.cid}`)
      this.subcalls = subcalls
      this.loading = false
    }
  },
  head() {
    return {
      title: this.$t('meta.titles.messages')
    }
  }
}
</script>
