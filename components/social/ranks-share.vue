<template>
  <div>
    <div
      class="fixed top-0 left-0 w-screen h-screen lg:hidden flex flex-col z-10"
      :class="{'bg-tableHeaderColor': !loading}"
      @click="e => didDismissAreaClicked(e)"
    >
      <div v-if="!loading" class="bg-yellow-500 text-center text-white text-xs py-2">
        长按图片，保存到手机相册
      </div>
      <div v-if="!loading" class="mx-auto w-3/4">
        <img :src="url" class="mx-auto mobile-image">
      </div>
    </div>
    <div
      class="fixed top-0 left-0 w-screen h-screen hidden lg:flex flex-col z-10"
      :class="{'bg-tableHeaderColor': !loading}"
      @click="e => didDismissAreaClicked(e)"
    >
      <div v-if="!loading" class="mx-auto w-1/4 xl:w-1/5">
        <img :src="url" class="mx-auto">
      </div>
      <div v-if="!loading" class="text-white text-center text-sm mt-5">
        右键复制/保存图片以分享
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, required: true },
    url: { type: String, required: true }
  },
  methods: {
    didDismissAreaClicked(e) {
      if (e.target.tagName?.toLowerCase() !== 'img') {
        this.$emit('didDismissAreaClicked')
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
  img {
    max-height: 90vh;
  }
</style>
