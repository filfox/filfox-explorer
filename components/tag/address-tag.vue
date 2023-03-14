<template>
  <div class="flex justify-center items-center" :title="tag && tag.name">
    <template v-if="tag == null">
      {{ type === '' ? '--' : '' }}
    </template>
    <template v-else-if="type === ''">
      <nuxt-link v-if="canClick" :to="localePath(`/merchant/${tag.merchant}`)" class="hover:text-main truncate">
        {{ tag.name }}111
      </nuxt-link>
      <div v-else class="truncate">
        {{ tag.name }}
      </div>
      <Signed v-if="tag.signed" />
    </template>
    <template v-else-if="type === 'pc'">
      <nuxt-link
        v-if="canClick"
        :to="localePath(`/merchant/${tag.merchant}`)"
        class="hover:text-main hover:border-main hidden lg:flex ml-2 text-xs rounded-full px-2 border border-gray-400 items-center overflow-hidden"
      >
        <p class="truncate">
          {{ tag.name }}
        </p>
        <Signed v-if="tag.signed" />
      </nuxt-link>
      <div
        v-else
        class="hidden lg:flex ml-2 text-xs rounded-full px-2 border border-gray-400 items-center overflow-hidden"
      >
        <p class="truncate">
          {{ tag.name }}
        </p>
        <Signed v-if="tag.signed" />
      </div>
    </template>
    <div v-else-if="type === 'mobile'" class="mobile text-xs bg-background text-gray-500">
      <p class="truncate">
        {{ tag.name }}
      </p>
      <Signed v-if="tag.signed" />
    </div>
    <div v-else-if="type === 'share-rank'" class="mobile text-xs bg-socialTagBg text-black">
      <p class="truncate">
        {{ tag.name }}
      </p>
      <Signed v-if="tag.signed" />
    </div>
    <div v-else-if="type === 'share-miner'" class="mobile text-sm bg-socialTagTransparentBg text-white">
      <p class="truncate">
        {{ tag.name }}
      </p>
      <Signed v-if="tag.signed" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tag: { type: null, required: true },
    type: { type: String, default: '' }
  },
  computed: {
    canClick() {
      return this.tag.merchant != null
    }
  }
}
</script>

<style lang="postcss" scoped>
  .mobile {
    @apply flex ml-1 px-2 rounded-full items-center overflow-hidden;
    @screen lg {
      @apply hidden;
    }
  }
</style>
