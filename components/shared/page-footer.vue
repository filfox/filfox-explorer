<template>
  <div class="bg-footer px-4 xl:px-0 text-xs">
    <div class="container mx-auto">
      <div class="lg:flex lg:justify-between py-4">
        <div class="flex flex-col justify-between">
          <div class="mt-2">
            <nuxt-link :to="localePath('/')">
              <img src="@/assets/img/home/logo.svg" alt="filFox.info" class="h-6">
            </nuxt-link>
          </div>
          <div class="text-footerText mt-4 lg:mt-0">
            <p>
              {{ $t('footer.intro') }}
            </p>
            <p class="mt-4">
              {{ $t('footer.contact') }}
            </p>
          </div>
        </div>
        <div class="md:flex lg:block xl:flex">
          <div class="flex flex-row flex-grow-0 mt-4 lg:mt-0">
            <div v-if="$i18n.locale==='zh'" class="p-1 rounded mr-4">
              <p class="text-xs text-center text-white mb-2">
                扫码进交流群
              </p>
              <img src="~/assets/img/wechat/group.png" class="h-20 mx-auto bg-white p-1">
            </div>
            <div class="p-1 rounded mr-4">
              <a class="block text-xs text-center text-white mb-2 hover:text-main" :href="$i18n.locale === 'zh'? 'https://foxwallet.com/zh?invite=JVvUytv69E' : 'https://foxwallet.com/en?invite=JVvUytv69E'" target="_blank">
                {{ $t("nav.app.download") }}
              </a>
              <img v-if="$i18n.locale === 'zh'" src="~/assets/img/download/fox-wallet-web-zh.jpg" alt="foxwallet download" class="h-20 mx-auto bg-white p-1" draggable="false">
              <img v-else src="~/assets/img/download/fox-wallet-web-en.jpg" alt="foxwallet" class="h-20 mx-auto bg-white p-1" draggable="false">
            </div>
          </div>
          <div class="items-center flex mt-4 xl:mt-0 -ml-4 xl:ml-0">
            <span class="text-white text-xs text-center flex items-center flex-col w-16 hover:opacity-75 cursor-pointer" @click="download('ios')">
              <img src="@/assets/img/download/ios.svg" class="h-5">
              iOS
            </span>
            <span class="text-white text-xs text-center flex items-center flex-col w-20 hover:opacity-75 cursor-pointer" @click="download('android')">
              <img src="@/assets/img/download/android.svg" class="h-5">
              Android
            </span>
            <span class="text-white text-xs text-center flex items-center flex-col w-20 hover:opacity-75 cursor-pointer" @click="download('googlePlay')">
              <img src="@/assets/img/download/googleplay.svg" class="h-5">
              Google Play
            </span>
          </div>
        </div>
      </div>
      <footer class="text-gray-300 text-opacity-25 mx-auto border-t border-gray-300 border-opacity-25 py-3 px-6 text-center">
        © 2020 FilFox Project. All Rights Reserved.
        <br>
        <a href="https://beian.miit.gov.cn/" target="_blank">沪ICP备19028217号-3</a>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
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
