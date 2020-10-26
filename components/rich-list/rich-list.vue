<template>
  <div class="container mx-auto">
    <div class="mt-6 font-medium">
      {{ $t('blockchain.richList.title') }}
    </div>
    <div class="w-full bg-white rounded-md mt-4 mb-4">
      <div class="flex items-center justify-between border-b border-background">
        <p class="flex ml-4 h-12 items-center text-sm">
          {{ $t('blockchain.richList.info.total') }}
          {{ richList.totalCount }}
          {{ $t('blockchain.richList.info.accounts') }}
        </p>
        <el-select v-model="type" size="mini" class="mr-4" @change="didSelectChanged">
          <el-option v-for="item in options" :key="item.type" :label="item.label" :value="item.type" />
        </el-select>
      </div>
      <table v-if="!loading" class="w-full table-fixed mt-2">
        <thead class="text-gray-600 text-sm">
          <tr class="h-8">
            <th class="table-header w-1/12">
              {{ $t('blockchain.richList.tableHeaders.order') }}
            </th>
            <th class="table-header w-1/6">
              {{ $t('blockchain.richList.tableHeaders.address') }}
            </th>
            <th class="table-header w-1/12">
              {{ $t('blockchain.richList.tableHeaders.tag') }}
            </th>
            <th class="table-header w-1/6">
              {{ $t('blockchain.richList.tableHeaders.balance') }}
            </th>
            <th class="table-header w-1/12">
              {{ $t('blockchain.richList.tableHeaders.balanceRate') }}
            </th>
            <th class="table-header w-1/12">
              {{ $t('blockchain.richList.tableHeaders.type') }}
            </th>
            <th class="table-header w-1/6">
              {{ $t('blockchain.richList.tableHeaders.createTime') }}
            </th>
            <th class="table-header w-1/6">
              {{ $t('blockchain.richList.tableHeaders.lastSeenTime') }}
            </th>
          </tr>
        </thead>
        <tbody class="text-center text-sm">
          <tr v-for="(rich, index) in richList.richList" :key="index" class="border-b border-background h-10">
            <td>
              <RankIndex :index="index + 1 + page * pageSize" />
            </td>
            <td>
              <AddressLink :id="rich.address" :format="8" />
            </td>
            <td class="text-sm">
              <AddressTag :tag="rich.tag" class="max-w-full" />
            </td>
            <td> {{ rich.balance | filecoin(4) }} </td>
            <td> {{ rich.balance / richList.totalSupply | percentage }} </td>
            <td> {{ $t(`actor.${rich.actor}`) }} </td>
            <td> {{ rich.createTimestamp | timestamp('datetime') }} </td>
            <td> {{ rich.lastSeenTimestamp | timestamp('datetime') }} </td>
          </tr>
        </tbody>
      </table>
      <div v-if="loading" v-loading="loading" class="flex h-24"></div>
      <div class="flex items-center text-center h-16">
        <el-pagination
          layout="prev, pager, next, jumper"
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
      pageSize: 20,
      loading: false,
      richList: {
        totalCount: 0,
        totalSupply: '0',
        richList: []
      },
      type: 0,
      options: [{
        type: 0,
        label: this.$t('blockchain.richList.type.all')
      },
      {
        type: 1,
        label: this.$t('blockchain.richList.type.miner')
      },
      {
        type: 2,
        label: this.$t('blockchain.richList.type.normal')
      }]
    }
  },
  computed: {
    totalPageCount() {
      return Math.ceil(this.richList.totalCount / this.pageSize)
    }
  },
  mounted() {
    this.getRichList()
  },
  methods: {
    async getRichList() {
      this.loading = true
      this.richList = await this.$axios.$get('/rich-list', { params: { pageSize: this.pageSize, page: this.page } })
      this.loading = false
    },
    async getMinersRichList() {
      this.loading = true
      this.richList = await this.$axios.$get('/rich-list', { params: { pageSize: this.pageSize, page: this.page, actor: 'storageminer' } })
      this.loading = false
    },
    async getNormalAccountsRichList() {
      this.loading = true
      this.richList = await this.$axios.$get('/rich-list', { params: { pageSize: this.pageSize, page: this.page, actor: 'account' } })
      this.loading = false
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      switch (this.type) {
        case 0:
          this.getRichList()
          break
        case 1:
          this.getMinersRichList()
          break
        case 2:
          this.getNormalAccountsRichList()
          break
        default:
          break
      }
    },
    didSelectChanged(currentType) {
      this.type = currentType
      this.totalPageCount = 1
      switch (this.type) {
        case 0:
          this.getRichList()
          break
        case 1:
          this.getMinersRichList()
          break
        case 2:
          this.getNormalAccountsRichList()
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
  .table-header {
    @apply sticky top-0 bg-white z-30;
  }
</style>
