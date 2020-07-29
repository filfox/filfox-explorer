<template>
  <div class="container mx-auto flex">
    <div class="hidden lg:inline-block bg-white my-4 lg:mr-2 w-1/4 lg:w-1/8 lg:rounded">
      <p class="mx-4 py-2 font-medium border-b border-background">
        文章列表
      </p>
      <div class="pl-4 mt-2">
        <p v-for="(title,index) in mds" :key="index">
          <nuxt-link class="hover:text-main mb-2 text-sm cursor-pointer" :to="localePath(`/wiki/${index}`)">
            {{ mds[index].name }}
          </nuxt-link>
        </p>
      </div>
    </div>
    <div class="overflow-scroll bg-white my-2 lg:my-4 w-full lg:w-7/8 lg:rounded">
      <Markdown :detail="detail" class="p-4" />
    </div>
  </div>
</template>

<script>
import config from '~/filecoin/filecoin.config'

export default {
  asyncData({ params, error }) {
    const id = params.id
    const filesMD = require.context('~/static/wiki', true, /\.md$/)
    const filesMDNames = filesMD.keys()
    const mds = filesMDNames.map(item => {
      const listItemS = item.split('/')
      if (listItemS.length > 0) {
        return {
          name: listItemS[1].replace('.md', ''),
          path: item
        }
      } else {
        return {}
      }
    })
    if (id && id < mds.length) {
      return { mds }
    } else {
      error({ code: 404, message: `Wiki ${id} not found` })
    }
  },
  data() {
    return {
      mds: [],
      detail: ''
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.getArticleDetail()
  },
  methods: {
    getArticleDetail() {
      let url = this.mds[this.id].path
      url = url.substr(1)
      url = config.wiki.url + url
      this.$axios.get(url).then(response => {
        this.detail = response.data
      })
    }
  },
  head() {
    return {
      title: this.$t('meta.titles.wiki')
    }
  }
}
</script>
