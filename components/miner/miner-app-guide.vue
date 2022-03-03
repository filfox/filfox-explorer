<template>
  <el-popover
    placement="bottom"
    trigger="hover"
    popper-class="p-0 hidden lg:block"
    :width="470"
    class="hidden md:block"
  >
    <div slot="reference" class="ml-4 flex flex-row justify-center items-center text-xs border border-gray-400 px-2 rounded-full hover:opacity-75 cursor-pointer hover:text-main hover:border-main">
      <i class="el-icon-message-solid pr-1"></i>
      {{ $t('detail.address.miner.app.label') }}
    </div>
    <div class="px-4">
      <div class="py-4 flex flex-row justify-between items-center">
        <h3 class="text-black font-bold">
          {{ $t('detail.address.miner.app.title') }}
        </h3>
        <a class="text-xs hover:opacity-75 hover:text-main" target="_blank" :href="$i18n.locale == 'zh' ? 'https://foxwallet.com/zh':'https://foxwallet.com/en'">
          {{ $t('detail.address.miner.app.download') }}
        </a>
      </div>
      <div class="flex flex-row pb-4">
        <div class="bg-customBackground w-24 h-24 rounded-md mr-4">
          <div class="flex flex-row items-center justify-between">
            <div class="w-12 h-12 bg-main text-white rounded-tl-md rounded-br-md flex items-center justify-center">
              01
            </div>
            <img src="@/assets/img/download/step1.svg" class="w-8 m-2 border border-gray-600 border-dashed">
          </div>
          <p class="h-12 flex items-center justify-center text-xs text-center">
            {{ $t('detail.address.miner.app.step1') }}
          </p>
        </div>
        <div class="bg-customBackground w-24 h-24 rounded-md mr-4">
          <div class="flex flex-row items-center justify-between">
            <div class="w-12 h-12 bg-main text-white rounded-tl-md rounded-br-md flex items-center justify-center">
              02
            </div>
            <img src="@/assets/img/download/step2.svg" class="w-8 m-2 border border-gray-600 border-dashed">
          </div>
          <p class="h-12 flex items-center justify-center text-xs text-center">
            {{ $t('detail.address.miner.app.step2') }}
          </p>
        </div>
        <div class="bg-customBackground w-24 h-24 rounded-md mr-4">
          <div class="flex flex-row items-center justify-between">
            <div class="w-12 h-12 bg-main text-white rounded-tl-md rounded-br-md flex items-center justify-center">
              03
            </div>
            <img src="@/assets/img/download/step3.svg" class="w-8 m-2 border border-gray-600 border-dashed">
          </div>
          <p class="h-12 flex items-center justify-center text-xs text-center">
            {{ $t('detail.address.miner.app.step3') }}
          </p>
        </div>
        <div class="bg-customBackground w-24 h-24 rounded-md">
          <div class="flex flex-row items-center justify-between">
            <div class="w-12 h-12 bg-main text-white rounded-tl-md rounded-br-md flex items-center justify-center">
              04
            </div>
            <img src="@/assets/img/download/step4.svg" class="w-8 m-2 border border-gray-600 border-dashed">
          </div>
          <p class="h-12 flex items-center justify-center text-xs text-center">
            {{ $t('detail.address.miner.app.step4') }}
          </p>
        </div>
      </div>
    </div>
  </el-popover>
</template>
