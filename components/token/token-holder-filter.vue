<template>
  <div v-loading="loading" class="bg-white md:rounded-md p-4 md:px-8 md:py-5.5 flex flex-col lg:flex-row items-stretch">
    <div>
      <h1 class="text-sm md:text-base font-semibold flex items-center">
        <img
          src="@/assets/img/token/holder.svg"
          class="w-3 h-3 md:w-4 md:h-4 mr-1.5"
        />
        {{ $t('detail.token.holder.filteredByTokenHolder') }}
      </h1>
      <div class="flex items-center mt-0.5 md:mt-2">
        <AddressLink :id="holder" class="text-main font-medium" />
        <img
          src="@/assets/img/token/copy.svg"
          class="w-4 h-4 ml-1 cursor-pointer"
          @click="copyHolderAddr"
        />
      </div>
    </div>
    <div class="hidden lg:block border border-background mx-24"></div>
    <div class="mt-4 lg:mt-0">
      <h1 class="text-sm md:text-base font-semibold flex items-center">
        <img
          src="@/assets/img/token/balance.svg"
          class="w-3 h-3 md:w-4 md:h-4 mr-1.5"
        />
        {{ $t(`detail.token.holder.${/erc20/i.test(token.tokenType) ? 'balance' : 'nfts' }`) }}
      </h1>
      <div class="mt-0.5 md:mt-2">
        <span v-if="/erc20/i.test(token.tokenType)">{{ token.userBalance | parseToken(token.decimals) }}</span>
        <span v-else>{{ token.userBalance }}</span>
        {{ token.name }} ({{ token.symbol }})
      </div>
    </div>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard'

export default {
  data() {
    return {
      loading: false,
      token: {}
    }
  },

  computed: {
    address() {
      return this.$route.params.id
    },

    holder() {
      return this.$route.query.h ?? null
    }
  },

  watch: {
    holder() {
      this.getHolderBalance()
    }
  },

  mounted() {
    this.getHolderBalance()
  },

  methods: {
    copyHolderAddr() {
      copy(this.holder)
      this.$message.success(this.$t('shared.copySuccess'))
    },

    async getHolderBalance() {
      this.loading = true
      const params = { userAddress: this.holder }
      this.token = await this.$axios.$get(`/token/${this.address}/token-transfers`, { params })
      this.loading = false
    }
  }
}
</script>
