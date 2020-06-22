<template>
  <div class="container mx-auto">
    <div class="flex flex-grow-0 mt-6 font-medium"> {{ $t('detail.block.title') }} #{{ height }} </div>
    <div class="flex flex-col flex-grow rounded-md my-4 bg-white">
    </div>
  </div>
</template>

<script>

export default {
  async asyncData({$axios, error, params}) {
    try {
      const [tipset] = await Promise.all([
        $axios.$get(`/tipset/${params.id}`),
      ])
      return {tipset}
    } catch (err) {
      if (err?.response) {
        if (err.response.code === 404) {
          error({code: 404, message: `Tipset ${params.id} not found`})
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
      tipset: {},
      adjacentTipsets: []
    }
  },
  computed: {
    height() {
      return Number(this.$route.params.id)
    }
  },
  head() {
    return {
      title: `Tipset ${this.height}`
    }
  }
}
</script>