<template>
  <img :src="tokenIcon" alt="TOKEN" class="w-4 h-4" :class="{ 'rounded-full': isErc20 }">
</template>

<script>
import { TOKEN_ICONS } from '@/filecoin/filecoin.config'

export default {
  props: {
    tokenId: {
      type: String,
      default: ''
    },
    tokenType: {
      type: String,
      default: 'ERC20'
    }
  },

  computed: {
    isErc20() {
      return /erc20/i.test(this.tokenType)
    },
    tokenIcon() {
      return TOKEN_ICONS[this.tokenId] || (this.isErc20 ? TOKEN_ICONS.DEFAULT : TOKEN_ICONS.NFT_DEFAULT)
    }
  }
}
</script>
