<template>
  <div class="flex flex-col min-h-screen bg-background">
    <page-header />
    <nuxt class="flex-grow" />
    <page-footer />
    <el-button
      v-if="showShareIcon"
      type="primary"
      circle
      icon="el-icon-share"
      class="fixed lg:fixed bottom-0 right-0 mb-12 mr-8 lg:mr-12"
      @click.native="share"
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
      this.showShareIcon = true
    }
  },
  methods: {
    async share() {
      try {
        await navigator.share({
          title: document.title,
          text: document.title,
          url: location.href
        })
      } catch (err) {}
    }
  }
}
</script>
