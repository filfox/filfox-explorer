<template>
  <div class="my-4 px-4 md:px-1 flex items-center">
    <span class="font-semibold mr-4">{{ $t('detail.token.title') }}</span>
    <template v-if="/erc20/i.test(token.type)">
      <TokenIcon class="mr-1.5" :token-id="token.address" /> {{ token.symbol }}
    </template>
    <template v-else>
      <img src="@/assets/img/token/nft.png" class="w-4 h-4 md:w-5 md:h-5 ml-2 mr-1" />{{ token.symbol }} {{ token.name }}
    </template>
    <TokenApprovedTag class="ml-auto md:ml-4" />
  </div>
</template>

<script>
export default {
  props: {
    token: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
