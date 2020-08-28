<template>
  <div class="bg-spaceRace flex-grow flex-col hidden lg:flex">
    <div class="container mx-auto px-10 mt-2">
      <img v-if="$i18n.locale === 'zh'" src="~/assets/img/space-race/header-zh.png" alt="header" class="w-full mx-auto">
      <img v-else src="~/assets/img/space-race/header-en.png" alt="header" class="w-full mx-auto">
    </div>

    <div class="flex flex-row justify-center items-center mb-2">
      <div class="mx-2 text-center text-white">
        <div class="countDown">
          12
        </div>
        <p class="mt-1">
          {{ $t('shared.time.day') }}
        </p>
      </div>
      <div class="mx-2 text-center text-white">
        <div class="countDown">
          01
        </div>
        <p class="mt-1">
          {{ $t('shared.time.hour') }}
        </p>
      </div>
      <div class="mx-2 text-center text-white">
        <div class="countDown">
          22
        </div>
        <p class="mt-1">
          {{ $t('shared.time.min') }}
        </p>
      </div>
      <div class="mx-2 text-center text-white">
        <div class="countDown">
          30
        </div>
        <p class="mt-1">
          {{ $t('shared.time.sec') }}
        </p>
      </div>
    </div>

    <div class="bg-white container mx-auto rounded-md overflow-hidden">
      <p class="py-2 border-b border-background ml-4 font-medium">
        {{ $t('spaceRace.overview.title') }}
      </p>
      <div class="grid grid-cols-4 gap-4 px-4">
        <div>
          <p class="text-xs text-center pt-4 pb-2">
            {{ $t('spaceRace.overview.headers.unlockRewards') }}
          </p>
          <div class="text-base text-center pb-1 text-main font-bold">
            1,000,000 FIL
          </div>
          <div class="flex justify-center pb-4">
            <el-progress
              :percentage="77"
              :show-text="false"
              class="flex w-1/2"
            />
          </div>
        </div>
        <div>
          <p class="text-xs text-center pt-4 pb-2">
            {{ $t('spaceRace.overview.headers.counting') }}
          </p>
          <div class="text-base text-center pb-4 text-main font-bold">
            1,000,000 FIL
          </div>
        </div>
        <div>
          <p class="text-xs text-center pt-4 pb-2">
            {{ $t('spaceRace.overview.headers.rawBytePower') }}
          </p>
          <div class="text-base text-center pb-4 text-main font-bold">
            1,000,000 FIL
          </div>
        </div>
        <div>
          <p class="text-xs text-center pt-4 pb-2">
            {{ $t('spaceRace.overview.headers.activeMiner') }}
          </p>
          <div class="text-base text-center pb-4 text-main font-bold">
            1,000,000 FIL
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white container mx-auto rounded-md overflow-hidden mt-4">
      <p class="py-2 border-b border-background ml-4 font-medium">
        {{ $t('spaceRace.ranks.title') }}
      </p>
    </div>

    <div class="container mx-auto rounded-md bg-white overflow-hidden my-4">
      <p class="py-2 border-b border-background pl-4 font-medium">
        {{ $t('spaceRace.distribution.title') }}
      </p>
      <SrMap map-width="100%" map-height="600px" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.countDown {
  @apply rounded w-10 h-10 text-xl font-bold justify-center flex items-center;
  background-image: linear-gradient()
}
</style>>

<script>
export default {
  head() {
    return {
      title: this.$t('spaceRace.title')
    }
  }
}
</script>>
