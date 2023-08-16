<template>
  <div class="container mx-auto bg-white my-0 md:my-5 p-0 md:p-5">
    <Markdown :detail="content" />
  </div>
</template>

<script>
import { adminServer } from '../../../filecoin/filecoin.config'
export default {
  async asyncData({ $axios, params }) {
    const res = await $axios.$get(`${adminServer}/api/blog/${params.id}`)
    return { content: res.result.content }
  },

  head() {
    return {
      title: this.$t('meta.titles.notify')
    }
  }
}
</script>
