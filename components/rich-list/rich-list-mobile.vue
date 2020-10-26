<template>
  <div class="bg-white overflow-hidden">
    <div class="border-b border-background pb-2 mt-1">
      <HomeTitle type="richManRanks" />
      <div class="flex justify-between items-center">
        <p class="ml-4 text-xs">
          {{ $t('blockchain.richList.info.total') }}
          {{ richList.totalCount }}
          {{ $t('blockchain.richList.info.accounts') }}
        </p>
        <el-select v-model="type" placeholder="" size="mini" class="mr-4" @change="didSelectChanged">
          <el-option v-for="item in options" :key="item.type" :label="item.label" :value="item.type" />
        </el-select>
      </div>
    </div>

    <div v-if="!loading" class="mt-2 text-xs">
      <div v-for="(rich, index) in richList.richList" :key="index" class="rounded-sm mx-3 mb-3 shadow bg-white px-1">
        <div class="flex pt-2 items-center">
          <RankIndex :index="index + 1 + page * pageSize" class="ml-1" />
          <AddressLink :id="rich.address" :format="4" class="ml-2 mr-1" />
          <AddressTag :tag="rich.tag" type="mobile" />
        </div>

        <div class="flex justify-between pt-2 mx-1">
          <p class="text-gray-500">
            {{ $t('home.richManRanks.tableHeaders.balance') }} /  {{ $t('home.minerRanks.rate') }}
          </p>
          <p>
            {{ rich.balance | filecoin(0) }} / {{ rich.balance / richList.totalSupply | percentage }}
          </p>
        </div>

        <div class="flex justify-between pt-2 mx-1">
          <p class="text-gray-500">
            {{ $t('blockchain.richList.tableHeaders.type') }}
          </p>
          <p>
            {{ $t('actor.' + rich.actor) }}
          </p>
        </div>

        <div class="flex justify-between pt-2 mx-1">
          <p class="text-gray-500">
            {{ $t('blockchain.richList.tableHeaders.createTime') }}
          </p>
          <p>
            {{ rich.createTimestamp | timestamp('datetime') }}
          </p>
        </div>

        <div class="flex justify-between pt-2 pb-2 mx-1">
          <p class="text-gray-500">
            {{ $t('blockchain.richList.tableHeaders.lastSeenTime') }}
          </p>
          <p>
            {{ rich.lastSeenTimestamp | timestamp('datetime') }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="loading" v-loading="loading" class="h-16"></div>

    <div class="flex items-center text-center h-16">
      <el-pagination
        layout="prev, pager, next"
        :page-count="totalPageCount"
        :pager-count="5"
        :current-page="page + 1"
        class="mx-auto"
        @current-change="didCurrentPageChanged"
      />
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
      this.page = 0
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
