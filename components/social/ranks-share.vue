<template>
  <div v-if="sharing" class="absolute w-full" :class="{'bg-tableHeaderColor':!loading}" @click="e => didDismissAreaClicked(e)">
    <div v-if="!loading" class="bg-yellow-500 text-center text-white text-xs py-2">
      长按图片，保存到手机相册
    </div>
    <div v-if="!loading" id="image" class="mx-auto w-3/4 mt-0">
      <img id="image" :src="url" class="w-full">
    </div>
    <div v-if="!loading" class="h-64">
    </div>
    <div v-if="!loading" class="h-64">
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
