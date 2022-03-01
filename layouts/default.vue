<template>
  <div class="flex flex-col min-h-screen bg-background">
    <page-header />
    <nuxt class="flex-grow" />
    <page-footer />
    <DownloadAppButton />
    <el-button
      v-if="showShareIcon"
      type="primary"
      plain
      circle
      icon="el-icon-share"
      class="fixed bottom-0 right-0 mb-12 mr-8 lg:mr-12"
      @click="share"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showShareIcon: false
    }
  },
  mounted() {
    if (navigator.share) {
      this.showShareIcon = false
    }
  },
  methods: {
    async share(e) {
      try {
        await navigator.share({
          title: document.title,
          url: location.href
        })
      } catch (err) {}
    }
  }
}
</script>

<style scoped>
  @media (display-mode: browser) {
    .share-icon {
      display: none;
    }
  }
</style>
