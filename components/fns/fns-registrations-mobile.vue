<template>
  <div class="bg-white overflow-hidden my-4">
    <div class="flex items-center justify-between border-b border-background p-4 font-bold">
      {{ $t('fns.registrations.title') }}
    </div>

    <div v-if="!loading" class="mt-2 text-xs">
      <div v-for="(item, index) in registrationList.list" :key="index" class="rounded-sm mx-3 mb-3 shadow bg-white px-1">
        <div class="flex pt-2 items-center">
          <a class="text-main cursor-pointer" @click="$emit('detail', item.name)">{{ item.name }}</a>
        </div>

        <div class="flex justify-between pt-2 mx-1">
          <p class="text-gray-500">
            {{ $t('fns.registrations.address') }}
          </p>
          <p>
            <AddressLink :id="item.owner" :format="10" class="text-main" />
          </p>
        </div>

        <div class="flex justify-between pt-2 mx-1">
          <p class="text-gray-500">
            {{ $t('fns.registrations.expiration') }}
          </p>
          <p>
            {{ item.expires | timestamp }}
          </p>
        </div>

        <div class="flex justify-between pt-2 mx-1">
          <p class="text-gray-500">
            {{ $t('fns.registrations.handle') }}
          </p>
          <p>
            <a class="text-main cursor-pointer" @click="$emit('detail', item.name)">
              {{ $t('fns.registrations.moreDetails') }} >
            </a>
          </p>
        </div>
        <div class="h-2"></div>
      </div>
    </div>
    <div v-if="loading" v-loading="loading" class="h-16"></div>

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
</template>
<script>
import { fnsServer } from '../../filecoin/filecoin.config'
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
      const result = await this.$axios.$get(`${fnsServer}/registration/list`, { params: { pageSize: this.pageSize, page: this.page } })
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
