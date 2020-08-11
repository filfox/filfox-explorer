<template>
  <div class="container mx-auto">
    <div class="lg:hidden bg-white mb-2">
      <HomeTitle type="recentTipsets" class="border-b border-background" />
      <div v-if="loading" v-loading="loading" class="h-16"></div>
      <div v-else>
        <div
          v-for="(tipset, tipsetIndex) in tipsetsList.tipsets"
          :key="tipsetIndex"
          class="rounded-sm mx-3 mt-2 shadow bg-white p-3 pb-2"
        >
          <div class="flex justify-between border-b border-background py-1 mb-1 text-xs">
            <div>
              {{ $t('home.recentTipsets.tableHeaders.height') }}
              <TipsetLink :id="tipset.height" class="text-main text-xs ml-2" />
            </div>
            <div>
              <FromNow :timestamp="tipset.timestamp" format="seconds" class="text-xs" />
            </div>
          </div>
          <div v-for="(block, blockIndex) in tipset.blocks" :key="blockIndex" class="flex justify-between py-1 text-xs">
            <div class="flex">
              <AddressLink :id="block.miner" />
              <MinerTag v-if="block.minerTag" :tag="block.minerTag" :type="2" />
            </div>
            <div>
              {{ $t('home.recentTipsets.tableHeaders.award') }} : {{ block.reward | filecoin(2) }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center text-center h-16">
        <el-pagination
          layout="prev, pager, next"
          :page-count="totalPageCount"
          :pager-count="5"
          :current-page="page+1"
          class="mx-auto"
          @current-change="didCurrentPageChanged"
        />
      </div>
    </div>

    <div class="rounded-md my-4 bg-white hidden lg:block">
      <div class="flex h-12 pl-4 items-center border-b border-background">
        {{ $t('blockchain.block.title') }}
      </div>
      <div>
        <table v-if="!loading" class="w-full table-auto">
          <thead class="text-gray-600 text-sm m-2">
            <tr class="h-8">
              <th class="table-header">
                {{ $t('blockchain.block.tableHeaders.height') }}
              </th>
              <th class="table-header">
                {{ $t('blockchain.block.tableHeaders.time') }}
              </th>
              <th class="table-header">
                {{ $t('blockchain.block.tableHeaders.size') }}
              </th>
              <th class="table-header">
                {{ $t('blockchain.block.tableHeaders.hash') }}
              </th>
              <th class="table-header">
                {{ $t('blockchain.block.tableHeaders.miner') }}
              </th>
              <th class="table-header">
                {{ $t('blockchain.block.tableHeaders.tag') }}
              </th>
              <th class="table-header">
                {{ $t('blockchain.block.tableHeaders.message') }}
              </th>
              <th class="table-header">
                {{ $t('blockchain.block.tableHeaders.award') }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <template v-for="(tipset) in tipsetsList.tipsets">
              <tr
                v-for="(block, blockIndex) in tipset.blocks"
                :key="block.hash"
                :class="{'border-b border-background': blockIndex == tipset.blocks.length - 1}"
              >
                <td v-if="blockIndex === 0" :rowspan="tipset.blocks.length" :class="{'h-10': tipset.blocks.length == 1}" class="border-b border-background">
                  <TipsetLink :id="tipset.height" class="text-main text-sm" />
                </td>
                <td v-if="blockIndex === 0" :rowspan="tipset.blocks.length" class="border-b border-background">
                  <FromNow :timestamp="tipset.timestamp" format="seconds" class="text-sm" />
                </td>

                <td v-if="blockIndex === 0" :rowspan="tipset.blocks.length" class="text-sm border-b border-background">
                  {{ tipset.blockSize }} Bytes
                </td>

                <td :class="{'pt-2': blockIndex == 0, 'pb-2': blockIndex == tipset.blocks.length - 1}">
                  <BlockLink :id="block.cid" :format="5" class="md:hidden text-sm" />
                  <BlockLink :id="block.cid" :format="8" class="mdb:hidden text-sm" />
                </td>

                <td :class="{'pt-2': blockIndex == 0, 'pb-2': blockIndex == tipset.blocks.length - 1}">
                  <AddressLink :id="block.miner" class="text-sm" />
                </td>

                <td class="text-sm" :class="{'pt-2': blockIndex == 0, 'pb-2': blockIndex == tipset.blocks.length - 1}">
                  <MinerTag :tag="block.minerTag" />
                </td>

                <td class="smb:hidden text-sm" :class="{'pt-2': blockIndex == 0, 'pb-2': blockIndex == tipset.blocks.length - 1}">
                  {{ block.messageCount }}
                </td>
                <td class="text-sm" :class="{'pt-2': blockIndex == 0, 'pb-2': blockIndex == tipset.blocks.length - 1}">
                  {{ block.reward | filecoin(2) }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div v-if="loading" v-loading="loading" class="h-24"></div>
      <div class="flex items-center text-center h-16">
        <el-pagination
          layout="prev, pager, next"
          :page-count="totalPageCount"
          :current-page="page+1"
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
      tipsetsList: {},
      page: 0,
      pageSize: 20,
      loading: false,
      total: 0
    }
  },
  computed: {
    totalPageCount() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  mounted() {
    this.getTipsetsList()
  },
  methods: {
    getTipsetsList() {
      this.loading = true
      this.$axios
        .get('/tipset/list', { params: { pageSize: this.pageSize, page: this.page } })
        .then(res => {
          this.tipsetsList = res.data
          this.loading = false
          this.total = this.tipsetsList.totalCount
        })
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      this.getTipsetsList()
    }
  },
  head() {
    return {
      title: `${this.$t('meta.titles.recentTipsets')}`
    }
  }
}
</script>

.<style lang="postcss" scoped>
  .table-header {
    @apply sticky top-0 bg-white z-10
  }
</style>
