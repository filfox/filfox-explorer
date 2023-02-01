<template>
  <div class="container mx-auto">
    <div class="p-4 bg-white mt-8 rounded-md">
      <h1 class="font-bold">
        {{ $t('fns.search.title') }}
      </h1>
      <div class="my-3 w-full md:w-1/2 lg:w-1/3">
        <el-input
          v-model="searchVal"
          size="small"
          :clearable="true"
          :placeholder="$t('fns.search.placeholder')"
          @keyup.enter.native="search(searchVal)"
        >
          <el-button slot="append" icon="el-icon-search" type="primary" :loading="loading" @click="search(searchVal)" />
        </el-input>
        <div v-if="result" class="text-success text-xs pt-2 font-bold">
          {{ $t('fns.search.resultFor') }}
          {{ result }}
        </div>
      </div>
    </div>
    <FnsRegistrations v-if="!showing" class="hidden md:block" />
    <FnsRegistrationsMobile v-if="!showing" class="md:hidden" />
    <FnsAddressDetail v-if="showing === 'address'" :detail="addressDetail" />
    <FnsNameDetail v-if="showing === 'name'" :detail="nameDetail" />
  </div>
</template>
<script>
import { getDomaisByAddress, getAddressByDomain } from '@/utils/fns/utils'
import { fnsServer } from '../../filecoin/filecoin.config'
export default {
  data() {
    return {
      searchVal: '',
      loading: false,
      showing: '',
      addressDetail: {
        address: '',
        reverseRecord: '',
        names: [],
        transactions: []
      },
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
    result() {
      if (this.showing === 'address') {
        return this.addressDetail.address
      } else if (this.showing === 'name') {
        return this.nameDetail.name
      } else {
        return ''
      }
    }
  },
  watch: {
    searchVal(val) {
      if (!val) {
        this.showing = ''
      }
    }
  },
  methods: {
    async search(val) {
      const addr = val.trim()
      this.loading = true
      this.showing = '-'
      try {
        if (addr.endsWith('.fil')) {
          this.nameDetail = await getAddressByDomain(addr)
          this.showing = 'name'
        } else {
          this.addressDetail = {
            names: [],
            reverseRecord: '',
            address: '',
            transactions: []
          }
          const { names, reverseRecord, address } = await getDomaisByAddress(addr)
          this.addressDetail.names = names
          this.addressDetail.reverseRecord = reverseRecord
          this.addressDetail.address = address
          this.showing = 'address'
          const transactions = await this.$axios.$get(`${fnsServer}/address/transactions`, { params: { address } })
          this.addressDetail.transactions = transactions.data
        }
        this.loading = false
      } catch (e) {
        this.$message.error(this.$t('fns.search.failWords'))
        this.showing = ''
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

