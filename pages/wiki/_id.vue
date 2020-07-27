<template>
  <div class="container mx-auto flex flex-row">
      <div class="flex flex-col flex-grow bg-white my-4 mr-2 w-1/4 lg:w-1/8 rounded">
        <p class="mx-4 py-2 font-medium border-b border-background"> 文章列表 </p>
        <div class="flex flex-col pl-4 mt-2">
          <nuxt-link v-for="(title,index) in mds" :key="index" class="hover:text-main mb-2 text-sm cursor-pointer" :to="localePath(`/wiki/${index}`)"> {{ mds[index].name }} </nuxt-link>
        </div>
      </div>
      <div class="flex flex-col overflow-scroll bg-white my-4 w-3/4 lg:w-7/8 rounded">
          <Markdown :detail="detail" class="p-4" style="">  </Markdown>
      </div>
  </div>
</template>

<script>
import nconfig from "~/filecoin/filecoin.config"

export default {
  async asyncData({ $axios, app, params, error }) {
    const id = params.id;
    const filesMD = require.context('~/static/wiki', true, /\.md$/);
    const filesMDNames = filesMD.keys();
    const mds = [];
    filesMDNames.map((item) => {
        const listObj = {};
        const listItemS = item.split('/');
        if (listItemS.length > 0) {
            listObj.name = listItemS[1].replace('.md', '');
            listObj.path = item;
        }
        return mds.push(listObj);
    });
    if(id && id < mds.length) {
      return  { mds }
    }
    else {
      error({ code: 404, message: `Wiki ${id} not found` });
    }
  },
  data() {
    return {
      mds: [],
      detail: ""
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  mounted() {
    this.getArticleDetail()
  },
  methods: {
    getArticleDetail() {
      var url = this.mds[this.id].path;
      url = url.substr(1)
      url = nconfig.wiki.url + url
  　　this.$axios.get(url).then((response) => {
    　　this.detail = response.data
  　　});
    }
  },
  head() {
    return {
      title: this.$t('meta.titles.wiki')
    }
  }
}

</script>