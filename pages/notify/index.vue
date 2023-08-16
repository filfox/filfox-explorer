<template>
  <div class="container mx-auto my-4 bg-white md:rounded-md">
    <div class="p-4 flex flex-col md:flex-row items-center">
      <el-radio-group v-model="category" size="medium" fill="#1a4fc9">
        <el-radio-button v-for="c in categories" :key="c.code" :label="c.categoryCode">
          <span class="font-light">{{ $t(`notify.${c.categoryName}`) }}</span>
        </el-radio-button>
      </el-radio-group>
      <div class="md:ml-auto mt-4 md:mt-0">
        <button
          :class="[ hideReaded ? 'el-icon-success' : 'el-icon-circle-check' ]"
          class="px-4 py-2 text-main bg-blue-100 rounded text-sm border border-transparent hover:border-main transition duration-200"
          @click="hideReaded=!hideReaded"
        >
          {{ hideReaded ? $t('notify.cancelHideReaded') : $t('notify.hideReaded') }}
        </button>
        <button
          :class="[ setReadedLoading ? 'el-icon-loading' : 'el-icon-finished']"
          class="px-4 py-2 text-main bg-blue-100 rounded text-sm ml-2 border border-transparent hover:border-main transition duration-200"
          @click="setAllReaded"
        >
          {{ $t('notify.markAllRead') }}
        </button>
      </div>
    </div>

    <div v-loading="loading" class="border-t-2 border-customGray-100 p-4 flex flex-col">
      <template v-for="{ publishTime, title, _id, cover, readed } in notifications">
        <a
          v-if="hideReaded ? !readed : true"
          :key="_id"
          :href="localePath(`/notify/detail/${_id}`)"
          target="_blank"
          class="mb-4 flex transition duration-150 transform hover:-translate-x-2.5"
          @click="setReaded(_id)"
        >
          <div class="w-2 h-2 rounded-full bg-red-600 mr-2 mt-5" :class="[ readed ? 'invisible' : 'visible' ]"></div>
          <div
            class="bg-customGray-200 flex-1 rounded font-light hover:bg-customGray-300 transition duration-200 cursor-pointer flex flex-col md:flex-row overflow-hidden"
          >
            <img v-if="cover" :src="cover" alt="cover" class="w-full md:w-40 object-cover">
            <div class="px-4 py-3">
              <p class="font-medium">
                {{ title }}
              </p>
              <p class="text-sm text-customGray-400 mt-1">
                {{ title }}...
              </p>
              <p class="text-xs mt-4 text-customGray-600 el-icon-time">
                {{ publishTime / 1000 | timestamp }}
              </p>
            </div>
          </div>
        </a>
      </template>

      <el-pagination
        class="self-end"
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="turnPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import store from 'store'
import { adminServer } from '../../filecoin/filecoin.config'

export default {
  async asyncData({ $axios }) {
    const { result } = await $axios.$get(`${adminServer}/api/blog/category/list`)
    return { categories: result }
  },

  data() {
    return {
      category: 'NEWS',
      categories: [],
      blogs: [],
      totalCount: 0,
      page: 1,
      hideReaded: false,
      idsReaded: store.get('notify_ids_readed') || [],
      loading: false,
      setReadedLoading: false
    }
  },

  computed: {
    params() {
      return {
        offset: (this.page - 1) * 5,
        limit: 5,
        status: 1,
        sort: { publishTime: -1 },
        category: this.category
      }
    },

    notifications() {
      return this.blogs.map(item => {
        const readed = this.idsReaded.includes(item._id)
        return {
          ...item,
          readed
        }
      })
    }
  },

  watch: {
    category() {
      this.page = 1
      this.getNotifyList()
    },

    page() {
      this.getNotifyList()
    },

    idsReaded(ids) {
      this.storeIds(ids)
    }
  },

  mounted() {
    if (!this.categories.length) return
    this.category = this.categories[0].categoryCode
    this.getNotifyList()
  },

  methods: {
    async getNotifyList() {
      this.loading = true
      const data = await this.$axios.$get(`${adminServer}/api/blog/list`, { params: this.params })
      this.loading = false

      const { result: { blogs, totalCount } } = data
      this.totalCount = totalCount
      this.blogs = blogs
    },

    async getAllIds() {
      const { result: { blogs } } = await this.$axios.$get(`${adminServer}/api/blog/list`, { params: { limit: 100000 } })
      return blogs.map(({ _id }) => _id)
    },

    turnPage(page) {
      this.page = page
    },

    setReaded(id) {
      this.idsReaded.push(id)
    },

    async setAllReaded() {
      this.idsReaded = await this.getAllIds()
      window.resetUnread()
    },

    storeIds(ids) {
      store.set('notify_ids_readed', ids)
    }
  },

  head() {
    return {
      title: this.$t('meta.titles.notify')
    }
  }
}
</script>
