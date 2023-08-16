<template>
  <div class="container mx-auto">
    <div class="p-4 bg-white mt-8 rounded-none lg:rounded-md">
      <h1 class="font-semibold">
        {{ $t('fns.search.title') }}
      </h1>
      <div class="my-3 w-full md:w-1/2">
        <el-input
          v-model.trim="searchvalue"
          size="medium"
          :clearable="true"
          :placeholder="$t('fns.search.placeholder')"
          @keyup.enter.native="search"
        >
          <el-button slot="append" icon="el-icon-search" type="primary" :loading="loading" @click="search" />
        </el-input>
        <div v-if="result" class="text-success text-xs pt-2 font-semibold">
          {{ $t('fns.search.resultFor') }} {{ result }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      showing: '',
      searchvalue: ''
    }
  },
  computed: {
    searchtype() {
      if (this.searchvalue.endsWith('.fil')) return 'name'
      return 'address'
    },
    result() {
      return this.searchvalue
    },
    path() {
      if (!this.searchvalue) return this.localePath(`/fns`)
      return this.localePath(`/fns/${this.searchtype}/${this.searchvalue}`)
    }
  },
  watch: {
    '$route'() {
      this.fillInput()
    }
  },
  mounted() {
    this.fillInput()
  },
  methods: {
    search() {
      this.$router.push(this.path)
    },
    fillInput() {
      const path = this.$route.path
      const suffix = path.substr(path.lastIndexOf('/') + 1)
      this.searchvalue = suffix === 'fns' ? '' : suffix
    }
  }
}
</script>

