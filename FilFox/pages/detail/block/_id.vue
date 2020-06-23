<template>
  <div class="container mx-auto flex flex-col">
    <div class="flex flex-grow-0 mt-6 font-medium"> {{ $t('detail.block.title') }} #{{ height }} </div>
    <div class="flex flex-col flex-grow rounded-md my-4 bg-white">
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({$axios, params, query, redirect, error}) {
    const id = params.id
    const method = query.method
    try {
      if (query.page && !/^[1-9]\d*$/.test(query.page)) {
        // TO DO this.localePath()
        redirect(`/block/${params.id}`, {method})
        return
      }
      const block = await $axios.$get(`/block/${id}`)
      const page = Number(query.page || 1)
      if (page > 1 && block.messageCount <= (page - 1) * 10) {
        // TO DO
        redirect(`/block/${params.id}`, {page: Math.ceil(block.messageCount / 10), method})
        return
      }
      const {totalCount, messages, methods} = await $axios.$get(
        `/block/${id}/messages`,
        {params: {pageSize: 10, page: page - 1, method}}
      )
      return {block, messages, totalCount, methods, selectedMethod: method ?? ''}
    } catch (err) {
      if (err?.response) {
        if (err.response.code === 404) {
          error({code: 404, message: `Block ${id} not found`})
        } else {
          error({code: err.response.status, message: err.response.statusText})
        }
      } else {
        error({code: 500, message: err.toString()})
      }
    }
  },
  data() {
    return {
      block: {},
      messages: [],
      totalCount: 0,
      methods: [],
      selectedMethod: ''
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    currentPage() {
      return Number(this.$route.query.page ?? 1) - 1
    },
    totalPages() {
      return Math.ceil(this.totalCount / 10)
    },
    currentMethod() {
      return this.$route.query.method ?? ''
    }
  },
  watch: {
    selectedMethod() {
      if (this.selectedMethod) {
        this.$router.push({path: `/block/${this.id}`, query: {method: this.selectedMethod}})
      } else {
        this.$router.push({path: `/block/${this.id}`})
      }
    }
  },
  head() {
    return {
      title: `Block ${this.id}`
    }
  },
  async beforeRouteUpdate(to, from, next) {
    if (to.params.id !== from.params.id) {
      next()
      return
    }
    const page = Number(to.query.page || 1)
    const method = to.query.method
    if (page > this.pages && this.pages > 1) {
      this.$router.push({
        name: 'block-id',
        params: {id: this.id},
        query: {page: this.totalPages, method}
      })
      return
    }
    const {totalCount, messages, methods} = await this.$axios.$get(
      `/block/${this.id}/messages`,
      {params: {pageSize: 10, page: page - 1, method}}
    )
    this.messages = messages
    this.totalCount = totalCount
    this.methods = methods
    next()
  }
}
</script>