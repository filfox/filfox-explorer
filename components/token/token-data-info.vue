<template>
  <div class="px-4 md:px-8 py-4 pb-5">
    <div class="flex items-center mb-2 md:mb-3">
      <TokenIcon v-if="/erc20/i.test(token.type)" class="mr-1.5" :token-id="token.address" />
      <img v-else src="@/assets/img/token/nft.png" class="w-4 h-4 md:w-5 md:h-5 ml-2 mr-1" />
      {{ token.name }} ({{ token.symbol }})
    </div>
    <p>
      {{ profile }}
    </p>
  </div>
</template>

<script>
import { TOKEN_PROFILES } from '../../filecoin/filecoin.config'

export default {
  props: {
    token: {
      type: Object,
      required: true
    }
  },

  computed: {
    profile() {
      return TOKEN_PROFILES[this.token.address] || TOKEN_PROFILES.DEFAULT
    }
  }
}
</script>
