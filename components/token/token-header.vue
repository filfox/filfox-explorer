<template>
  <div class="my-4 px-4 md:px-1 flex items-center">
    <span class="font-semibold mr-1.5">{{ $t('detail.token.title') }}</span>
    <template v-if="token.address">
      <TokenIcon v-if="/erc20/i.test(token.type)" class="mr-1.5" :token-id="token.address" />
      <img v-else src="@/assets/img/token/nft.png" class="w-4 h-4 ml-2 mr-1" />
      {{ token.name }} ({{ token.symbol }})
      <ContractCodeStatus :contract="token" class="ml-auto md:ml-4" />
    </template>
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
