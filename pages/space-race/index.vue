<template>
  <div class="bg-spaceRace flex-grow flex-col hidden lg:flex">
    <div class="container mx-auto px-10 mt-2">
      <img v-if="$i18n.locale === 'zh'" src="~/assets/img/space-race/header-zh.png" alt="header" class="w-full mx-auto">
      <img v-else src="~/assets/img/space-race/header-en.png" alt="header" class="w-full mx-auto">
    </div>
    <div class="bg-white container mx-auto rounded-md overflow-hidden">
      <p class="py-2 border-b border-background ml-4 font-medium">
        {{ $t('spaceRace.overview.title') }}
      </p>
      <div class="grid grid-cols-4 gap-4 px-4">
        <div>
          <p class="text-xs text-center">
            {{ $t('spaceRace.overview.headers.unlockRewards') }}
          </p>
        </div>
        <div>
          <p class="text-xs text-center">
            {{ $t('spaceRace.overview.headers.counting') }}
          </p>
        </div>
        <div>
          <p class="text-xs text-center">
            {{ $t('spaceRace.overview.headers.rawBytePower') }}
          </p>
        </div>
        <div>
          <p class="text-xs text-center">
            {{ $t('spaceRace.overview.headers.activeMiner') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
