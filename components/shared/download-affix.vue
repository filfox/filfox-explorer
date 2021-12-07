<template>
  <Affix :use-capture="true" :offset-top="0" :offset-bottom="-1" class="hidden md:block">
    <span class="z-40 hidden md:inline-block mt-2 lg:mt-4 mr-2 absolute right-0 w-20 bg-white rounded-md text-center text-xs border border-1 border-gray-300">
      <i class="el-icon-error absolute right-0 -mt-2 -mr-2 text-lg text-gray-800 hover:opacity-75 cursor-pointer" @click="show=false"></i>
      <img v-if="$i18n.locale === 'zh'" src="~/assets/img/download/code-fox-wallet-download-zh.jpg" alt="filfox" class="p-1 pb-0">
      <img v-else src="~/assets/img/download/code-fox-wallet-download-en.jpg" alt="filfox" class="p-1 pb-0">
      Fox Wallet
    </span>
  </Affix>
</template>
