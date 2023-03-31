<template>
  <div class="container mx-auto">
    <FnsRegistrations class="hidden md:block" />
    <FnsRegistrationsMobile class="md:hidden" />
  </div>
</template>

<script>
export default {
  layout: 'fns',
  data() {
    return {
      searchvalue: '',
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
    },

    searchtype() {
      if (this.searchvalue.endsWith('.fil')) return 'name'
      return 'address'
    }
  },
  methods: {
    search() {
      const path = this.localePath(`/fns/${this.searchtype}/${this.searchvalue}`)
      this.$router.push(path)
    }
  },
  head() {
    return {
      title: `${this.$t('fns.search.title')}`
    }
  }
}
</script>
