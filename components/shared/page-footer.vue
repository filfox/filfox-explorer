<template>
  <div class="bg-footer px-4 xl:px-0 text-xs">
    <div class="container mx-auto">
      <template v-if="$i18n.locale != 'zh'">
        <div class="mt-6">
          <nuxt-link :to="localePath('/')">
            <img src="@/assets/img/home/logo.svg" alt="filFox.info" class="h-6">
          </nuxt-link>
        </div>
        <div class="lg:flex lg:justify-between py-4">
          <p class="text-footerText lg:flex-grow lg:w-4/5">
            {{ $t('footer.intro') }}
          </p>
          <p class="text-footerText mt-4 lg:mt-0 lg:flex-grow-0 lg:flex-shrink-0 lg:ml-20 lg:w-1/5 lg:text-right">
            {{ $t('footer.contact') }}
          </p>
        </div>
      </template>
      <template v-else>
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
          <div class="flex flex-row flex-grow-0 mt-4 lg:mt-0">
            <div class="p-1 bg-white rounded mr-4">
              <img src="~/assets/img/wechat/group.png" class="h-20 mx-auto">
              <p class="text-xs text-center">
                扫码进交流群
              </p>
            </div>
            <div class="p-1 bg-white rounded">
              <img src="~/assets/img/wechat/staff.png" class="h-20 mx-auto">
              <p class="text-xs text-center">
                Filfox小助手
              </p>
            </div>
          </div>
        </div>
      </template>
      <footer class="text-gray-300 text-opacity-25 mx-auto border-t border-gray-300 border-opacity-25 py-3 px-6 text-center">
        © 2020 FilFox Project. All Rights Reserved.
        <br>
        <a href="https://beian.miit.gov.cn/" target="_blank">沪ICP备19028217号-3</a>
      </footer>
    </div>
  </div>
</template>
