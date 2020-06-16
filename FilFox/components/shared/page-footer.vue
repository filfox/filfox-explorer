<template>
  <div class="bg-footer">
    <div class="w-full">
        <div class="flex container mx-auto h-20 items-center">
            <nuxt-link :to="localePath('/')">
              <img src="~/assets/img/home/logo.svg" alt="filFox.io" class="cursor-pointer">
            </nuxt-link>
        </div>
        <div class="container flex mx-auto justify-between h-10">
            <div class="text-xs text-footerText"> {{ $t('footer.intro') }} </div>
            <div class="text-xs text-footerText"> {{ $t('footer.contact')}} </div>
        </div>
    </div>
    <footer class="text-xs text-gray-300 text-opacity-25 container mx-auto border-t border-gray-300 border-opacity-25 py-3 px-6 text-center">© 2020 FilFox Project. All Rights Reserved.</footer>
    <div class="w-full h-2"></div>
  </div>
</template>>