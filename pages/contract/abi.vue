<template>
  <div v-loading="loading" class="p-8">
    <el-button type="success" size="small" icon="el-icon-copy-document" class="mb-5" @click="copyAbi">
      Copy
    </el-button>
    <vue-json-pretty :data="abi" />
  </div>
</template>

<script>
import copy from 'copy-to-clipboard'

export default {
  layout: 'json',
  data() {
    return { abi: [], abiText: '', loading: false }
  },
  computed: {
    format() {
      return this.$route.query.format
    }
  },
  async mounted() {
    const address = this.$route.query.address
    const format = this.$route.query.format

    if (!address) return
    this.loading = true
    const contract = await this.$axios.$get(`/address/${address}/contract`)
    this.abiText = contract?.abi
    this.loading = false

    if (format === 'text') {
      this.abi = this.abiText
    } else {
      this.abi = JSON.parse(this.abiText)
    }
  },

  methods: {
    copyAbi() {
      if (this.format === 'text') {
        copy(this.abiText)
      } else {
        copy(`\n${JSON.stringify(JSON.parse(this.abiText), null, 2)}\n`)
      }

      this.$message.success(this.$t('shared.copySuccess'))
    }
  },
  head() {
    return {
      title: this.$t('contract.guide.title.0')
    }
  }
}
</script>
