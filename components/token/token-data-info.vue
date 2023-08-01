<template>
  <div class="px-4 md:px-8 py-4 pb-5">
    <div class="flex items-center mb-2 md:mb-3">
      <TokenIcon :token-id="token.address" class="mr-1.5" />
      {{ token.symbol }}
      <template v-if="!/erc20/i.test(token.type)">
        {{ token.name }}
      </template>
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
