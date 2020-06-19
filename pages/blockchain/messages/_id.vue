<template>
  <div class="container mx-auto flex flex-col">
    <div class="flex flex-grow-0 mt-6 font-medium"> {{ $t('blockchain.message.title') }} </div>
    <div class="flex flex-col rounded-md my-4 bg-white">
      <div class="flex h-12 pl-4 items-center border-b border-background text-sm"> {{ $t('blockchain.message.info.total') + ' ' + total + ' ' +$t('blockchain.message.info.messages')}} </div>
      <div>
       <table class="w-full table-auto" v-if="!loading">
        <thead class="text-gray-600 text-sm m-2">
          <tr class="h-8">
            <th class="sticky top-0 bg-white z-10">{{$t('blockchain.message.tableHeaders.id')}}</th>
            <th class="sticky top-0 bg-white z-10">{{$t('blockchain.message.tableHeaders.height')}}</th>
            <th class="sticky top-0 bg-white z-10">{{$t('blockchain.message.tableHeaders.time')}}</th>
            <th class="sticky top-0 bg-white z-10">{{$t('blockchain.message.tableHeaders.from')}}</th>
            <th class="sticky top-0 bg-white z-10">{{$t('blockchain.message.tableHeaders.to')}}</th>
            <th class="sticky top-0 bg-white z-10">{{$t('blockchain.message.tableHeaders.method')}}</th>
            <th class="sticky top-0 bg-white z-10">{{$t('blockchain.message.tableHeaders.value')}}</th>
            <th class="sticky top-0 bg-white z-10">{{$t('blockchain.message.tableHeaders.exitCode')}}</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <template v-for="(tipset, tipsetIndex) in tipsetsList.tipsets">
            <tr v-for="(block, blockIndex) in tipset.blocks"
              :key="block.hash"
              :class="{'bg-gray-200': tipsetIndex % 2, 'smb:hidden': tipsetIndex >= 5}"
            >
              <td v-if="blockIndex === 0" :rowspan="tipset.blocks.length" :class="{'h-10': tipset.blocks.length == 1 }">
                <div class="flex flex-col">
                  <TipsetLink :id="tipset.height" class="text-main text-base" />
                </div>
              </td>
              <td v-if="blockIndex === 0" :rowspan="tipset.blocks.length">
                <div class="flex flex-col">
                  <FromNow :timestamp="tipset.timestamp" format="seconds" class="text-sm" />
                </div>
              </td>

              <td v-if="blockIndex === 0" :rowspan="tipset.blocks.length">
                <div class="flex flex-col">
                    {{ tipset.blockSize  }}
                </div>
              </td>

              <td>
                <BlockLink :id="block.cid" :format="5" class="md:hidden text-sm" />
                <BlockLink :id="block.cid" :format="8" class="mdb:hidden text-sm" />
              </td>

              <td>
                <AddressLink :id="block.miner" class="text-sm" />
              </td>

              <td class="smb:hidden text-sm">{{ block.messageCount }}</td>
              <td class="text-sm">{{ block.reward | filecoin(2) }}</td>
            </tr>
          </template>
        </tbody>
       </table>
      </div>
      <div class="flex h-24" v-if="loading" v-loading="loading"></div>
      <div class="flex flex-grow items-center text-center h-16">
        <el-pagination
          layout="prev, pager, next"
          :page-count="totalPageCount"
          @current-change="didCurrentPageChanged"
          :current-page="page+1"
          class="mx-auto"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<style>
 svg {
   display: inline-block
 }
</style>

<script>
export default {
  data() {
    return {
      tipsetsList:{},
      page:0,
      pageSize:20,
      totalPageCount:0,
      loading: false,
      total: 0,
    }
  },
  mounted() {
    this.getTipsetsList()
  },
  methods: {
    getTipsetsList() {
        this.loading = true
        this.$axios
        .get("/tipset/list", { params: {pageSize: this.pageSize,page: this.page} })
        .then(res => {
          this.tipsetsList = res.data;
          this.loading = false
          this.total = this.tipsetsList.totalCount
          this.getTotalPageCount()
        });
    },
    getTotalPageCount() {
        this.totalPageCount = Math.ceil(this.total / this.pageSize)
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1;
      this.getTipsetsList()
    }
  }
}
</script>>