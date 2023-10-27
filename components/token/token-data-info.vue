<template>
  <div class="px-4 md:px-8 py-4 pb-5">
    <template v-if="token.address">
      <div class="flex items-center mb-2 md:mb-3">
        <TokenIcon class="mr-1.5" :token-id="token.address" :token-type="token.type" />
        {{ token.name }} ({{ token.symbol }})
      </div>
      <p>{{ profile }}</p>
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
