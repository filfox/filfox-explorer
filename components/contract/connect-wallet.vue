<template>
  <span
    :class="[account ? 'text-customGray-500' : 'text-main']"
    class="inline-flex items-center px-3 py-1 rounded-full bg-customGray-250 text-sm font-light cursor-pointer transition duration-200 hover:bg-customGray-300"
    @click="connectWallet"
  >
    <img src="@/assets/img/contract/wallet.svg" class="mr-1" :style="{ filter: `grayscale(${account ? 100 : 0}%)` }">
    <span v-if="account">{{ account | trim(8) }}</span>
    <span v-else>{{ $t('detail.contract.connectWallet') }}</span>
    <i v-if="loading" class="el-icon-loading ml-0.5"></i>
  </span>
</template>

<script>
import {
  CHAIN_ID,
  CHAIN_NAME,
  HOST,
  NATIVE_CURRENCY,
  RPC,
  METAMASK_PLUGIN_URL
} from '@/filecoin/filecoin.config'

export default {
  props: {
    active: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      account: '',
      loading: false
    }
  },

  watch: {
    account(val) {
      this.$emit('update-account', val)
    }
  },

  methods: {
    async connectWallet() {
      if (this.account) return (this.account = '')
      if (typeof window.ethereum === 'undefined') return window.open(METAMASK_PLUGIN_URL, '_blank')

      try {
        this.loading = true
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })
        if (chainId !== CHAIN_ID) await this.switchNetwork()
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        this.account = accounts[0]
      } catch (error) {
        this.$notify({ title: 'Error', message: error.message, type: 'error' })
      } finally {
        this.loading = false
      }
    },

    async switchNetwork() {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: CHAIN_ID,
            chainName: CHAIN_NAME,
            rpcUrls: [RPC],
            blockExplorerUrls: [HOST],
            nativeCurrency: {
              name: NATIVE_CURRENCY,
              symbol: NATIVE_CURRENCY,
              decimals: 18
            }
          }
        ]
      })

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN_ID }]
      })
    }
  }
}
</script>
