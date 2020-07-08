<template>
  <div class="container mx-auto">

    <div class="flex flex-col flex-grow lg:hidden bg-white mb-2">
        <HomeTitle type="recentTipsets" class="flex flex-grow border-b border-background"/>
        <div v-if="loading" v-loading="loading" class="h-16"></div>
        <div v-if="!loading">
          <div v-for="(tipset, tipsetIndex) in tipsetsList.tipsets" :key="tipsetIndex" class="rounded-sm mx-3 mt-2 shadow bg-white p-3">
              <div class="flex flex-row border-b border-background py-1">  
                    <div class="flex w-1/2 text-xs"> {{$t('home.recentTipsets.tableHeaders.height')}} <TipsetLink :id="tipset.height" class="text-main text-xs ml-2" /></div>
                    <div class="flex flex-row-reverse w-1/2"> <FromNow :timestamp="tipset.timestamp" format="seconds" class="text-xs"/> </div>
                </div>
                <div class="flex flex-row">  
                    <div class="flex w-1/2 flex-col">
                      <div v-for="(block, blockIndex) in tipset.blocks" :key="blockIndex" class="flex items-center pt-3">
                          <AddressLink :id="block.miner" class="text-xs"/>
                          <div class="text-xs bg-background rounded-full px-2 text-gray-500 flex ml-1" v-if="block.minerTag"> {{ block.minerTag ? block.minerTag[$i18n.locale] : '--' }} </div>
                      </div>
                    </div>
                    <div class="flex w-1/2 flex-col">
                      <div v-for="(block, blockIndex) in tipset.blocks" :key="blockIndex" class="flex flex-row-reverse items-center pt-3">
                          <div class="text-xs"> {{$t('home.recentTipsets.tableHeaders.award')}} : {{ block.reward | filecoin(2) }}</div>
                      </div>
                    </div>
                </div>
          </div>
        </div>

        <div class="flex flex-grow items-center text-center h-16">
          <el-pagination
            layout="prev, pager, next"
            :page-count="totalPageCount"
            :pager-count="5"
            @current-change="didCurrentPageChanged"
            :current-page="page+1"
            class="mx-auto"
          ></el-pagination>
      </div>

    </div>

    <div class="flex-col rounded-md my-4 bg-white hidden lg:flex">
      <div class="flex h-12 pl-4 items-center border-b border-background"> {{ $t('blockchain.block.title') }} </div>
      <div>
       <table class="w-full table-auto" v-if="!loading">
        <thead class="text-gray-600 text-sm m-2">
          <tr class="h-8">
            <th class="sticky top-0 bg-white z-10">{{$t('blockchain.block.tableHeaders.height')}}</th>
            <th class="sticky top-0 bg-white z-10">{{$t('blockchain.block.tableHeaders.time')}}</th>
            <th class="sticky top-0 bg-white z-10">{{$t('blockchain.block.tableHeaders.size')}}</th>
            <th class="sticky top-0 bg-white z-10">{{$t('blockchain.block.tableHeaders.hash')}}</th>
            <th class="sticky top-0 bg-white z-10">{{$t('blockchain.block.tableHeaders.miner')}}</th>
            <th class="sticky top-0 bg-white z-10">{{$t('blockchain.block.tableHeaders.tag')}}</th>
            <th class="sticky top-0 bg-white z-10">{{$t('blockchain.block.tableHeaders.message')}}</th>
            <th class="sticky top-0 bg-white z-10">{{$t('blockchain.block.tableHeaders.award')}}</th>
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
                    {{ tipset.blockSize  }} Bytes
                </div>
              </td>

              <td>
                <BlockLink :id="block.cid" :format="5" class="md:hidden text-sm" />
                <BlockLink :id="block.cid" :format="8" class="mdb:hidden text-sm" />
              </td>

              <td>
                <AddressLink :id="block.miner" class="text-sm" />
              </td>

              <td class="text-sm">
                {{ block.minerTag ? block.minerTag[$i18n.locale] : '--' }}
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