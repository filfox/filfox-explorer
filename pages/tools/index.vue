<template>
  <div class="container mx-auto">
    <div
      v-for="(info, index) in tools"
      :key="index"
      class="bg-white lg:rounded-md mt-2 lg:mt-4"
    >
      <p class="text-xs lg:text-sm px-4 border-b py-2 border-background font-medium">
        {{ info.category[$i18n.locale] }}
      </p>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 my-2 px-2 lg:px-0">
        <a
          v-for="(link,indexLink) in info.links"
          :key="indexLink"
          class="text-center text-xs lg:text-sm py-2 hover:text-main my-auto"
          :href="link.url"
          target="_blank"
        >
          {{ link[$i18n.locale] }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  async asyncData({ $axios, error }) {
    try {
      const [
        tools
      ] = await Promise.all([
        $axios.$get('/tools')
      ])
      return {
        tools
      }
    } catch (err) {
      if (err?.response) {
        error({ code: err.response.status, message: err.response.statusText })
      } else {
        error({ code: 500, message: err.toString() })
      }
    }
  },
  data() {
    return {
      tools: []
    }
  },
  head() {
    return {
      title: this.$t('meta.titles.tools')
    }
  }
}

</script>
