<template>
  <div v-loading="loading" class="px-4 md:px-8 py-2 md:py-4">
    <div class="hidden md:block">
      <table class=" w-full table-fixed">
        <thead class="m-2 text-sm text-gray-600">
          <tr class="h-8">
            <th class="sticky top-0 z-10 bg-white font-normal w-1/8">
              {{ $t('detail.token.data.holder.rank') }}
            </th>
            <th class="sticky top-0 z-10 bg-white font-normal w-1/4">
              {{ $t('detail.token.data.holder.address') }}
            </th>
            <th class="sticky top-0 z-10 bg-white font-normal">
              {{ $t('shared.value') }}
            </th>
            <th class="sticky top-0 z-10 bg-white font-normal w-1/8">
              {{ $t('detail.token.data.holder.proportion') }}
            </th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr
            v-for="(holder, index) in list.holders"
            :key="index"
            class="h-12 text-sm border-b border-background"
          >
            <td>
              {{ holder.rank }}
            </td>
            <td>
              <AddressLink :id="holder.address" :format="22" />
            </td>
            <td>
              <template v-if="/erc20/i.test(token.type)">
                {{ holder.balance | parseToken(token.decimals) }}
              </template>
              <template v-else>
                {{ holder.balance | addAmountDelimiters }}
              </template>
            </td>
            <td>{{ holder.percentage | percentage }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <ul class="md:hidden">
      <li v-for="(holder, index) in list.holders" :key="index" class="py-2 border-b leading-loose">
        <div class="flex justify-between">
          <span class="text-gray-600">{{ $t('detail.token.data.holder.rank') }}</span>
          <span>
            {{ holder.rank }}
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">{{ $t('detail.token.data.holder.address') }}</span>
          <AddressLink :id="holder.address" :format="22" />
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">{{ $t('shared.value') }}</span>
          <span v-if="/erc20/i.test(token.type)">{{ holder.balance | parseToken(token.decimals) }}</span>
          <span v-else>{{ holder.balance | addAmountDelimiters }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">{{ $t('detail.token.data.holder.proportion') }}</span>
          <span>{{ holder.percentage | percentage }}</span>
        </div>
      </li>
    </ul>

    <div class="flex items-center h-16">
      <el-pagination
        layout="prev, pager, next, jumper"
        class="ml-auto hidden md:block"
        :total="list.totalCount"
        :page-size="pageSize"
        :current-page="page + 1"
        @current-change="p => page = p - 1"
      />
      <el-pagination
        layout="prev, pager, next"
        class="mx-auto md:hidden"
        :total="list.totalCount"
        :pager-count="5"
        :page-size="pageSize"
        :current-page="page + 1"
        @current-change="p => page = p - 1"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    token: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      list: {
        totalCount: 0,
        holders: []
      },

      page: 0,
      pageSize: 10,
      loading: false
    }
  },

  computed: {
    address() {
      return this.$route.params.id
    }
  },

  watch: {
    trans() {
      if (this.page === 0) return this.getList()
      this.page = 0
    },

    page() {
      this.getList()
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    async getList() {
      if (!this.address) return

      const params = { limit: this.pageSize, offset: this.page * this.pageSize }
      this.loading = true
      const res = await this.$axios.$get(`/token/${this.address}/holders`, { params })
      this.loading = false
      this.list = res
      this.$emit('setTotalCount', this.list.totalCount || 0)
    }
  }
}
</script>
