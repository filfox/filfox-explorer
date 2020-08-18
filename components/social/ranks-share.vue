<template>
  <div>
    <div v-if="sharing" class="fixed top-0 left-0 h-screen w-screen lg:hidden" :class="{'bg-tableHeaderColor':!loading}" @click="e => didDismissAreaClicked(e)">
      <div v-if="!loading" class="bg-yellow-500 text-center text-white text-xs py-2">
        长按图片，保存到手机相册
      </div>
      <div v-if="!loading" id="image" class="mx-auto w-3/4 mt-0">
        <img id="image" :src="url" class="w-full">
      </div>
    </div>
    <div v-if="sharing" class="hidden top-0 left-0 fixed w-screen h-screen lg:flex lg:flex-col lg:justify-center" :class="{'bg-tableHeaderColor':!loading}" @click="e => didDismissAreaClicked(e)">
      <div v-if="!loading" id="image" class="mx-auto  lg:w-1/4 xl:w-1/5">
        <img id="image" :src="url" class="w-full">
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
    sharing: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    url: { type: String, default: '' }
  },
  methods: {
    didDismissAreaClicked(e) {
      if (e.target.id === 'image') {
        return
      }
      this.$emit('didDismissAreaClicked')
    }
  }
}
</script>
