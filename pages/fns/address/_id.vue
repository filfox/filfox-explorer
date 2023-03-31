<template>
  <div class="container mx-auto">
    <FnsAddressDetail v-loading="loading" :detail="addressInfo" />
  </div>
</template>
<script>
import { getDomaisByAddress } from '@/utils/fns/utils'
import { fnsServer } from '../../../filecoin/filecoin.config'

export default {
  layout: 'fns',
  data() {
    return {
      loading: false,
      addressInfo: {
        address: '',
        reverseRecord: '',
        names: [],
        transactions: []
      }
    }
  },
  computed: {
    address() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.getAddressInfo()
  },
  methods: {
    async getAddressInfo() {
      try {
        this.loading = true
        this.addressInfo = {
          names: [],
          reverseRecord: '',
          address: '',
          transactions: []
        }
        const { names, reverseRecord, address } = await getDomaisByAddress(this.address)
        this.addressInfo.names = names
        this.addressInfo.reverseRecord = reverseRecord
        this.addressInfo.address = address
        const transactions = await this.$axios.$get(`${fnsServer}/address/transactions`, { params: { address } })
        this.addressInfo.transactions = transactions.data
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
