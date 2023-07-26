<template>
  <div>
    <MessageDetail :message="message" class="hidden lg:block" />
    <MessageDetailMobile :message="message" class="lg:hidden" />
  </div>
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
        if (err.response.code === 404) {
          error({ code: 404, message: `Message ${id} not found` })
        } else {
          error({ code: err.response.status, message: err.response.statusText })
        }
      } else {
        error({ code: 500, message: 'Server Error'() })
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
  mounted() {
    console.log(this.message)
  },
  head() {
    return {
      title: `${this.$t('meta.titles.message')} ${this.id}`
    }
  }
}
</script>
