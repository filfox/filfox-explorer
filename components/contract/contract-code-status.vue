<template>
  <div>
    <span v-if="contract.verified" class="flex items-center font-light">
      <img src="@/assets/img/contract/ok.svg" alt="warn" class="w-4 h-4 mr-1">
      <span class="text-sm">{{ $t('detail.contract.codeVerified') }}</span>
    </span>
    <div v-else class="font-light rounded-md text-customGray-600 flex items-center">
      <img src="@/assets/img/contract/warn.svg" alt="warn" class="w-4.5 h-4.5 mr-1">
      <span>{{ $t('detail.contract.verifyTip.0') }}
        <nuxt-link :to="localePath(`/contract?address=${contract.address}`)" class="text-main hover:underline">
          {{ $t('detail.contract.verifyTip.1') }}
        </nuxt-link>
        {{ $t('detail.contract.verifyTip.2') }}!
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contract: {
      type: Object,
      default: () => ({ verified: false })
    }
  }
}
</script>
