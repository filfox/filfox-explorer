<template>
  <div class="mb-2 lg:mb-4 bg-white lg:rounded-md flex flex-col">
    <div class="ml-4 mt-4 text-sm lg:text-base">
      {{ $t('home.partner') }}
    </div>
    <div class="lg:flex items-center justify-center overflow-x-scroll pt-6 pb-10 hidden">
      <div v-for="(partner,index) in partners" :key="index" class="mx-8 cursor-pointer">
        <a :href="partner.url[$i18n.locale]" target="_blank">
          <img :src="partner.img" :alt="partner.name" class="h-8">
        </a>
      </div>
    </div>
    <div class="lg:hidden grid grid-cols-3 my-4 px-3">
      <div v-for="(partner,index) in partners" :key="index" class="cursor-pointer mx-1 border rounded-sm mb-4">
        <a :href="partner.url[$i18n.locale]" target="_blank">
          <img :src="partner.img" :alt="partner.name" class="h-5 mx-auto my-2">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { partners } from '@/filecoin/partner.config'
export default {
  data() {
    return {
      partners
    }
  }
}
</script>>
