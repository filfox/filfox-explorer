<template>
  <div v-loading="loading" class="p-4 bg-white min-h-60">
    <div class="flex flex-wrap">
      <div v-for="dapp in nondefi.dappList" :key="dapp.dappId" class="w-full md:w-1/2 lg:w-1/4 py-1.5 lg:p-2">
        <DappCard :dapp="dapp" />
      </div>
    </div>

    <div v-if="limit > 12" class="flex px-4 mt-4">
      <el-pagination
        small
        layout="prev, pager, next"
        class="ml-auto"
        :total="nondefi.totalCount"
        :page-size="limit"
        :current-page="page + 1"
        @current-change="p => page = p - 1"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    limit: { type: Number, default: 12 },
    category: { type: String, default: '' }
  },

  data() {
    return {
      nondefi: {},
      page: 0,
      loading: false
    }
  },

  computed: {
    params() {
      return {
        limit: this.limit,
        offset: this.page * this.limit,
        category: this.category
      }
    }
  },

  watch: {
    params() {
      this.getList()
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    async getList() {
      try {
        this.loading = true
        this.nondefi = await this.$axios.$get('/dapp/info/list', { params: this.params })
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
