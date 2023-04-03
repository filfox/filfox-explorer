<template>
  <div class="container mx-auto">
    <FnsNameDetail v-loading="loading" :detail="nameDetail" />
  </div>
</template>
<script>
import { getAddressByDomain } from '@/utils/fns/utils'

export default {
  layout: 'fns',
  data() {
    return {
      loading: false,
      nameDetail: {
        name: '',
        controller: '',
        registrant: '',
        expiration: '',
        resolveAddress: ''
      }
    }
  },
  computed: {
    name() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.getNameInfo()
  },
  methods: {
    async getNameInfo() {
      try {
        this.loading = true
        this.nameDetail = await getAddressByDomain(this.name)
      } catch (e) {
        this.$message.error(this.$t('fns.search.failWords'))
      } finally {
        this.loading = false
      }
    }
  },
  head() {
    return {
      title: `${this.$t('fns.search.title')}`
    }
  }
}
</script>
