<template>
  <div class="bg-footer px-4 xl:px-0 text-xs">
    <div class="container mx-auto">
      <div class="mt-6 my-2">
        <nuxt-link :to="localePath('/')">
          <img src="@/assets/img/home/logo.svg" alt="filFox.io">
        </nuxt-link>
      </div>
      <div class="lg:flex lg:justify-between py-4">
        <p class="text-footerText lg:flex-grow">
          {{ $t('footer.intro') }}
        </p>
        <p class="text-footerText lg:flex-grow-0 lg:flex-shrink-0 lg:ml-20">
          {{ $t('footer.contact') }}
        </p>
      </div>
      <footer class="text-gray-300 text-opacity-25 mx-auto border-t border-gray-300 border-opacity-25 py-3 px-6 text-center">
        © 2020 FilFox Project. All Rights Reserved.
      </footer>
    </div>
  </div>
</template>
