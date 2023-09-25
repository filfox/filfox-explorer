<template>
  <MessageDetail :message="message" />
</template>

<script>
import { TOKEN_ICONS } from '@/filecoin/filecoin.config'

export default {
  async asyncData({ $axios, params, query, error }) {
    const id = params.id
    try {
      const message = await $axios.$get(`/message/${id}`, { params: query })

      if (message?.tokenTransfers?.length) {
        message.tokenTransfers = message.tokenTransfers.map(t => ({ ...t, tokenIcon: TOKEN_ICONS[t.token] || TOKEN_ICONS.DEFAULT }))
      }

      return { message }
    } catch (err) {
      if (err?.response) {
        const code = err.response.status
        const message = code === 404 ? `Message ${id} Not Found` : err.response.statusText
        error({ code, message })
      } else {
        error({ code: 500, message: 'Server Error' })
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
