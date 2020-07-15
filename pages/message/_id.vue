<template>
  <div class="flex">
    <MessageDetail :message="message" :id="id" class="hidden lg:flex"/>
    <MessageDetailMobile :message="message" :id="id" class="lg:hidden"/>
  </div>
</template>

<script>
export default {
  async asyncData({$axios, params, query, error}) {
    const id = params.id
    try {
      const message = await $axios.$get(`/message/${id}`, {params: query})
      return {message}
    } catch (err) {
      if (err?.response) {
        if (err.response.code === 404) {
          error({code: 404, message: `Message ${id} not found`})
        } else {
          error({code: err.response.status, message: err.response.statusText})
        }
      } else {
        error({code: 500, message: err.toString()})
      }
    }
  },
  data() {
    return {
      message: {}
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  head() {
    return {
      title: `${this.$t('meta.titles.message')} ${this.id}`
    }
  }
}
</script>