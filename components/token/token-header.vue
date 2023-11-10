<template>
  <div class="my-4 px-4 lg:px-1">
    <div v-if="token.address" class="flex flex-wrap items-center">
      <TokenIcon class="lg:w-6 lg:h-6 mr-1.5" :token-id="token.address" :token-type="token.type" />
      <span class="font-semibold mr-1.5">{{ $t('detail.token.title') }}</span> {{ token.name }} ({{ token.symbol }})
      <ContractCodeStatus :contract="token" is-token class="ml-auto lg:ml-4" />
    </div>
    <p class="text-xs text-customGray-450 italic ml-5.5 lg:ml-7.5 mt-2 lg:mt-0.5">{{ $t('home.nftList.disclaimer') }}</p>
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
