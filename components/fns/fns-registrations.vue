<template>
  <div class="container bg-white mx-auto my-8 rounded-md">
    <div class="w-full">
      <div class="flex items-center justify-between border-b border-background p-4 font-bold">
        {{ $t('fns.registrations.title') }}
      </div>
      <table v-if="!loading" class="w-full table-fixed mt-2">
        <thead class="text-gray-600 border-b border-background">
          <tr class="h-8">
            <th class="table-header w-2/5 pb-2">
              {{ $t('fns.registrations.address') }}
            </th>
            <th class="table-header w-1/5 pb-2">
              {{ $t('fns.registrations.name') }}
            </th>
            <th class="table-header w-1/5 pb-2">
              {{ $t('fns.registrations.expiration') }}
            </th>
            <th class="table-header w-1/5 pb-2">
              {{ $t('fns.registrations.handle') }}
            </th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(item, index) in registrationList.list" :key="index" class="border-b border-background h-16">
            <td class="text-main">
              <AddressLink :id="item.owner" :format="10" class="text-main" />
            </td>
            <td>
              <a :href="'http://app.filns.domains/domain/' + item.name" target="_blank" class="text-main cursor-pointer">{{ item.name }}</a>
            </td>
            <td>
              {{ item.expires | timestamp }}
            </td>
            <td>
              <a :href="'http://app.filns.domains/domain/' + item.name" target="_blank" class="bg-gray-100 text-main p-2 font-bold rounded-md hover:opacity-75">
                {{ $t('fns.registrations.moreDetails') }}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="loading" v-loading="loading" class="flex h-24"></div>
      <div class="flex items-center text-center h-16">
        <el-pagination
          layout="prev, pager, next"
          :page-count="totalPageCount"
          :current-page="page + 1"
          class="mx-auto"
          @current-change="didCurrentPageChanged"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 0,
      pageSize: 10,
      loading: false,
      registrationList: {
        total: 0,
        list: []
      }
    }
  },
  computed: {
    totalPageCount() {
      return Math.ceil(this.registrationList.total / this.pageSize)
    }
  },
  mounted() {
    this.getRegistrationList()
  },
  methods: {
    async getRegistrationList() {
      this.loading = true
      const result = await this.$axios.$get('http://localhost:7001/fns/registration/list', { params: { pageSize: this.pageSize, page: this.page } })
      this.registrationList = result.data
      this.loading = false
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      this.getRegistrationList()
    }
  }
}
</script>
