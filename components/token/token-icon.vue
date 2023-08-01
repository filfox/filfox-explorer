<template>
  <img :src="tokenIcon" alt="TOKEN" class="w-4 h-4 md:w-5 md:h-5">
</template>

<script>
import { TOKEN_ICONS } from '@/filecoin/filecoin.config'

export default {
  props: {
    tokenId: {
      type: String,
      default: ''
    }
  },

  computed: {
    tokenIcon() {
      return TOKEN_ICONS[this.tokenId] || TOKEN_ICONS.DEFAULT
    }
  }
}
</script>
