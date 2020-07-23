<template>
    <div class="container mx-auto flex flex-col">

      <div class="bg-white rounded-md flex flex-col mt-4" v-for="(info,index) in tools" :key="index">
        <p class="text-sm px-4 border-b py-2 border-background font-medium"> {{ info.category[$i18n.locale] }} </p>

        <div class="grid grid-cols-4 gap-2 my-2">
          <a class="text-center text-sm py-2 hover:text-main" v-for="(link,indexLink) in info.links" :key="indexLink" :href="link.url" target="blank">
            {{ link[$i18n.locale] }}
          </a>
        </div>
      </div>
      
    </div>
</template>

<script>

export default {
  async asyncData({$axios, error}) {
    try {
      const [
        tools,
      ] = await Promise.all([
        $axios.$get('/tools'),
      ])
      return {
        tools,
      }
    } catch (err) {
      if (err?.response) {
        error({code: err.response.status, message: err.response.statusText})
      } else {
        error({code: 500, message: err.toString()})
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