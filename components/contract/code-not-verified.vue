<template>
  <div class="text-sm font-light">
    <div class="rounded-md bg-customGray-200 text-customGray-600 flex items-center p-2">
      <img src="@/assets/img/contract/warn.svg" alt="warn" class="w-4.5 h-4.5 mr-1">
      <span>
        {{ proxy ? $t('detail.contract.verifyTip.3', { address: contract.address }) : $t('detail.contract.verifyTip.0') }}
        <nuxt-link :to="localePath(`/contract?address=${contract.address}`)" class="text-main hover:underline">
          {{ $t('detail.contract.verifyTip.1') }}
        </nuxt-link>
        {{ $t('detail.contract.verifyTip.2') }}!
      </span>
    </div>
    <div class="rounded-lg bg-customGray-200 border h-64 mt-4 p-4 break-all overflow-auto">
      {{ contract.initCode }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    proxy: {
      type: Boolean,
      default: false
    },
    contract: {
      type: Object,
      default: () => ({ initCode: '' })
    }
  }
}
</script>
