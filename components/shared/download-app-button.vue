<template>
  <el-button class="app-download-button sm:hidden fixed bottom-0 mb-4 w-48 left-1/2 -ml-24 text-xs" round type="primary" @click.native="handleOpen">
    {{ $t("shared.openApp") }}
  </el-button>
</template>
<script>
let CallApp = null

export default {
  data() {
    return {
      downloadWebsite: this.$i18n.locale === 'zh' ? 'https://foxwallet.com/download/zh?invite=evkZv8g5TG' : 'https://foxwallet.com/download/en?invite=evkZv8g5TG'
    }
  },
  mounted() {
    import('callapp-lib').then(module => {
      CallApp = module.default
    })
  },
  methods: {
    handleOpen() {
      const callLib = new CallApp({
        scheme: {
          protocol: 'foxwallet'
        },
        fallback: location.href,
        timeout: 5 * 1000,
        appstore: 'https://apps.apple.com/app/foxwallet-crypto-web3/id1590983231'
      })
      callLib.open({
        path: 'data',
        callback: () => {
          window.location.href = this.downloadWebsite
        }
      })
    }
  }
}
</script>
<style scoped>
.app-download-button {
  left: 50%;
  background: #1a4fc9;
}
</style>
