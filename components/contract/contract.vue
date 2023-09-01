<template>
  <div class="text-sm">
    <div class="mx-4 md:mx-8 flex flex-col lg:flex-row lg:items-center">
      <CapsuleRadioGroup :radios="contractItems" :value="active" @change="v => active = v" />
      <ConnectWallet v-if="active > 0" class="mt-4 lg:mt-0 lg:ml-auto self-start" @update-account="val => account = val" />
    </div>
    <div :class="{ 'mt-2': contractItems.length }">
      <ContractCode v-if="active == 0" :contract="contract" />
      <ContractReadWrite v-else :contract-self="contract" :active="active" :account="account" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contract: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      account: '',
      active: Number(this.$route.query?.a) || 0
    }
  },

  computed: {
    contractItems() {
      let items = [{ key: 0, name: this.$t('detail.contract.theCode') }]

      if (this.contract?.verified) {
        items = items.concat([
          { key: 1, name: this.$t('detail.contract.readContract') },
          { key: 2, name: this.$t('detail.contract.writeContract') }
        ])
      }

      if (this.contract?.proxyImpl) {
        const verified = this.contract?.contractImpl?.verified
        items = items.concat([
          { key: 3, name: this.$t('detail.contract.readAsProxy'), verified },
          { key: 4, name: this.$t('detail.contract.writeAsProxy'), verified }
        ])
      }

      return items
    }
  }
}
</script>
