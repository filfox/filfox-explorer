<template>
  <div class="flex items-center justify-center flex-row">
    <template v-if="type === 0" class="hidden lg:flex lg:flex-row">
      <nuxt-link v-if="canClick" :to="localePath(`/merchant/${tag.merchant}`)" class="hover:text-main truncate">
        {{ tag[$i18n.locale] || '--' }}
      </nuxt-link>
      <div v-else class="truncate">
        {{ tag[$i18n.locale] || '--' }}
      </div>
      <Signed v-if="tag.signed && type === 0" :content="$t('tag.signed')" />
    </template>
    <template v-if="type === 1">
      <nuxt-link
        v-if="canClick"
        :to="localePath(`/merchant/${tag.merchant}`)"
        class="hover:text-main hover:border-main hidden lg:flex ml-2 text-xs rounded-full px-2 border border-gray-400 items-center truncate"
      >
        {{ tag[$i18n.locale] || '--' }}
        <Signed v-if="tag.signed && type === 1" :content="$t('tag.signed')" />
      </nuxt-link>
      <div
        v-else
        class="hidden lg:flex ml-2 text-xs rounded-full px-2 border border-gray-400 items-center truncate"
      >
        {{ tag[$i18n.locale] || '--' }}
        <Signed v-if="tag.signed && type === 1" :content="$t('tag.signed')" />
      </div>
    </template>
    <div v-if="type == 2" class="lg:hidden text-xs bg-background rounded-full px-2 text-gray-500 flex ml-1 items-center truncate">
      {{ tag[$i18n.locale] || '--' }}
      <Signed v-if="tag.signed && type== 2" :content="$t('tag.signed')" />
    </div>
    <div v-if="type == 3" class="lg:hidden text-xs bg-socialTagBg rounded-full px-2 text-black flex ml-1 items-center truncate">
      {{ tag[$i18n.locale] || '--' }}
      <Signed v-if="tag.signed && type== 3" :content="$t('tag.signed')" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tag: { type: Object, default: () => ({}) },
    // 0 is normal, 1 is rounded for pc, 2 is for mobile
    type: { type: Number, default: 0 }
  },
  computed: {
    canClick() {
      return this.tag.merchant != null
    }
  }
}
</script>
