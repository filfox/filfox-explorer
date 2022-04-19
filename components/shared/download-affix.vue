<template>
  <Affix v-if="show" :use-capture="true" :offset-top="0" :offset-bottom="-1" class="hidden md:block">
    <div class="z-40 absolute right-0 p-4 mr-2 bg-white mt-2 rounded-md shadow-container">
      <div class="text-xs w-4 h-4 flex items-center justify-center absolute right-0 -mt-6 -mr-2 text-black cursor-pointer border border-gray-500 bg-white rounded-full hover:bg-opacity-75" @click="show=false">
        ✕
      </div>
      <div class="text-sm">
        {{ $t('nav.app.downloadApp') }}
      </div>
      <div class="text-xs text-gray-500">
        {{ $t('nav.app.description') }}
      </div>
      <div class="mt-1 flex justify-between">
        <img v-if="$i18n.locale === 'zh'" src="~/assets/img/download/fox-wallet-web-zh.png" alt="foxwallet download" class="w-20 border border-dashed border-gray-500" draggable="false">
        <img v-else src="~/assets/img/download/fox-wallet-web-en.png" alt="foxwallet" class="w-20 border border-dashed border-gray-500" draggable="false">
        <div class="w-40 flex flex-wrap">
          <a class="bg-black text-white py-2 rounded-md ml-2 text-xs flex items-center justify-center w-16 hover:opacity-75 cursor-pointer" @click="download('ios')">
            <img src="@/assets/img/download/ios.svg" class="mr-1">
            iOS
          </a>
          <a class="bg-black text-white py-2 px-2 rounded-md ml-2 text-xs flex items-center justify-center w-20 hover:opacity-75 cursor-pointer" @click="download('android')">
            <img src="@/assets/img/download/android.svg" class="mr-1">
            Android
          </a>
          <a class="bg-black text-white py-2 px-3 rounded-md ml-2 mt-1 text-xs flex items-center justify-center hover:opacity-75 cursor-pointer" @click="download('googlePlay')">
            <img src="@/assets/img/download/googleplay.svg" class="mr-1">
            Google Play
          </a>
        </div>
      </div>
    </div>
  </Affix>
</template>
<script>
export default {
  data() {
    return {
      show: true
    }
  },
  methods: {
    download(platform) {
      if (platform === 'ios') {
        window.open('https://apps.apple.com/app/foxwallet-crypto-web3/id1590983231')
        this.viewRecord('IOS')
      } else if (platform === 'android') {
        window.location.href = 'https://cdn-pkg.foxnb.net/app_image/package/foxwallet_release.apk'
        this.viewRecord('ANDROID')
      } else if (platform === 'googlePlay') {
        window.open('https://play.google.com/store/apps/details?id=com.foxwallet.play')
        this.viewRecord('GOOGLEPLAY')
      }
    },
    async viewRecord(action) {
      await this.$axios.$post('https://wallet.foxnb.net/api/v1/page/view', {
        web_uri: location.href,
        invite: '',
        action
      })
    }
  }
}
</script>
