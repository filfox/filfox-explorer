<template>
  <div class="px-4 md:px-8 py-4 pb-5">
    <template v-if="token.address">
      <div class="flex items-center mb-2 md:mb-3">
        <TokenIcon v-if="/erc20/i.test(token.type)" class="mr-1.5" :token-id="token.address" />
        <img v-else src="@/assets/img/token/nft.png" class="w-4 h-4 md:w-5 md:h-5 ml-2 mr-1" />
        {{ token.name }} ({{ token.symbol }})
      </div>
      <p>
        {{ profile }}
      </p>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    token: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },

  computed: {
    profile() {
      return this.$t('detail.token.data.info')[this.token.address] || this.$t('detail.token.data.info.noIntroductionYet')
    }
  }
}
</script>
