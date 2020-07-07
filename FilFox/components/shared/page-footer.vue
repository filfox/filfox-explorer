<template>
  <div class="bg-footer px-4 xl:px-0">
    <div class="w-full">
        <div class="flex container mx-auto my-6 items-center">
            <nuxt-link :to="localePath('/')">
              <img src="~/assets/img/home/logo.svg" alt="filFox.io" class="cursor-pointer">
            </nuxt-link>
        </div>
        <div class="container flex flex-col pb-4 lg:flex-row mx-auto justify-between">
            <div class="text-xs text-footerText"> {{ $t('footer.intro') }} </div>
            <div class="text-xs text-footerText mt-4 lg:mt-0 flex flex-col text-left lg:text-right "> 
              <a href="http://mini.filfox.io"> {{ $t('shared.oldVersion') }} </a>
              <p>{{ $t('footer.contact')}} </p>
            </div>
        </div>
    </div>
    <footer class="text-xs text-gray-300 text-opacity-25 container mx-auto border-t border-gray-300 border-opacity-25 py-3 px-6 text-center">© 2020 FilFox Project. All Rights Reserved.</footer>
    <div class="w-full h-2"></div>
  </div>
</template>>