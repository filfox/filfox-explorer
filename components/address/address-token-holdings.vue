<template>
  <div>
    <div class="p-2.5 md:p-3 border-b">
      <div class="token-search flex items-center rounded md:rounded-md px-2 md:px-3 py-2 bg-customGray-280 border border-transparent transition duration-200">
        <input v-model="tokenName" :placeholder="$t('detail.address.holdings.searchTokenName')" class="outline-none bg-transparent flex-1 text-xs md:text-sm" @keydown.enter="getTokenHoldings">
        <img slot="suffix" src="@/assets/img/shared/search.svg" class="ml-2 cursor-pointer w-3 md:w-4.5" @click="getTokenHoldings" />
      </div>
    </div>

    <div v-if="!erc20.tokenCount && !nft.tokenCount" v-loading="loading" class="h-24 text-xs md:text-sm md:h-32 flex items-center justify-center text-customGray-350">
      {{ $t('detail.address.holdings.noTokens') }}
    </div>
    <template v-else>
      <div v-if="erc20.tokenCount" class="pt-2.5 md:pt-4 text-xs md:text-sm">
        <h1 class="text-black font-medium px-3 md:px-4">
          ERC-20 Tokens <span v-if="erc20.tokenCount > 1">({{ erc20.tokenCount }})</span>
        </h1>
        <ul class="mt-2">
          <li
            v-for="item in erc20.tokenList"
            :key="item.tokenAddress"
            class="token-item flex px-3 md:px-4 py-2 md:py-2.5 transition duration-300 hover:bg-customBlue-250 border-b border-customBlue-250 cursor-pointer"
            @click="skipTokenDetail(item)"
          >
            <div class="flex-1">
              <div class="flex items-center">
                <TokenIcon :token-id="item.tokenAddress" class="mr-2" />
                <span class="text-black">{{ item.name }} ({{ item.symbol }})</span>
              </div>
              <p class="text-gray-500 font-light leading-6 ml-6">
                {{ item.balance | parseToken(item.decimals) }} ({{ item.symbol }})
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div v-if="nft.tokenCount" class="pt-2.5 md:pt-4 text-xs md:text-sm">
        <h1 class="text-black font-medium px-3 md:px-4">
          NFTs <span v-if="nft.tokenCount > 1">({{ nft.tokenCount }})</span>
        </h1>
        <ul class="mt-2">
          <li
            v-for="(item, index) in nft.tokenList"
            :key="item.tokenAddress"
            :class="{ 'border-b': index < nft.tokenList.length - 1 }"
            class="token-item flex px-3 md:px-4 py-2 md:py-2.5 transition duration-300 hover:bg-customBlue-250 border-customBlue-250 cursor-pointer"
            @click="skipTokenDetail(item)"
          >
            <div class="flex-1">
              <div class="flex items-center">
                <img src="@/assets/img/token/nft.png" :alt="item.name" class="w-4 h-4 mr-2">
                <span class="text-black">{{ item.name }}</span>
              </div>
              <p class="text-gray-500 font-light leading-6 ml-6">
                {{ item.symbol }}
              </p>
            </div>
            <div class="self-center">
              <span v-if="item.balance > 1" class="token-lable mr-2">X{{ item.balance }}</span>
              <span class="token-lable">ERC 721</span>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    plain: { type: Boolean, default: false },
    address: { type: String, default: '' }
  },

  data() {
    return {
      tokenName: '',
      erc20: {
        tokenCount: 0,
        tokenList: []
      },
      nft: {
        tokenCount: 0,
        tokenList: []
      },
      loading: false
    }
  },

  watch: {
    address() {
      this.getTokenHoldings()
    }
  },

  mounted() {
    this.getTokenHoldings()
  },

  methods: {
    async getTokenHoldings() {
      this.loading = true
      const { data } = await this.$axios.get(`/address/${this.address}/token-holdings?tokenName=${this.tokenName}`)
      this.loading = false

      this.erc20 = data.ercTwentyList
      this.nft = data.nftList
    },

    skipTokenDetail(item) {
      this.$router.push(this.localePath(`/token/${item.tokenAddress}?h=${this.address}`))
    }
  }
}
</script>

<style scoped lang="postcss">
.token-search:has(input:focus) {
  @apply border-blue-500 !important;
}

.token-item {
  .token-lable {
    @apply text-xs font-light text-customGray-400 px-2 py-0.5 rounded-full bg-customBlue-250 border border-transparent transition duration-200;
  }
  &:hover {
    .token-lable {
      @apply border-blue-200;
    }
  }
}
</style>
