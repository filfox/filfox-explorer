<template>
  <div class="container mx-auto flex flex-col">
      <div class="flex flex-grow-0 mt-6 font-medium"> {{ $t('blockchain.richList.title') }} </div>
      <div class="flex flex-col w-full bg-white rounded-md mt-4 mb-4">
        <div class="flex flex-row items-center justify-between border-b border-background">
          <p class="flex ml-4 h-12 items-center text-sm"> {{ $t('blockchain.richList.info.total') + ' ' + total + ' ' + $t('blockchain.richList.info.accounts')}} </p>
          <el-select v-model="type" placeholder="" size="mini" class="mr-4" @change="didSelectChanged"> 
             <el-option v-for="item in options" :key="item.type" :label="item.label" :value="item.type">
             </el-option>
          </el-select>
        </div>
        <table class="w-full table-fixed mt-2" v-if="!loading">
            <thead class="text-gray-600 text-sm">
              <tr class="h-8">
                <th class="sticky top-0 bg-white z-30 w-1/12"> {{$t('blockchain.richList.tableHeaders.order')}} </th>
                <th class="sticky top-0 bg-white z-30 w-1/6"> {{$t('blockchain.richList.tableHeaders.address')}} </th>
                <th class="sticky top-0 bg-white z-30 w-1/12"> {{$t('blockchain.richList.tableHeaders.tag')}} </th>
                <th class="sticky top-0 bg-white z-30 w-1/6"> {{$t('blockchain.richList.tableHeaders.balance')}} </th>
                <th class="sticky top-0 bg-white z-30 w-1/12"> {{$t('blockchain.richList.tableHeaders.balanceRate')}} </th>
                <th class="sticky top-0 bg-white z-30 w-1/12"> {{$t('blockchain.richList.tableHeaders.type')}} </th>
                <th class="sticky top-0 bg-white z-30 w-1/6"> {{$t('blockchain.richList.tableHeaders.createTime')}} </th>
                <th class="sticky top-0 bg-white z-30 w-1/6"> {{$t('blockchain.richList.tableHeaders.lastSeenTime')}} </th>
              </tr>
            </thead>
            <tbody class="text-center text-sm">
              <tr v-for="(rich, index) in richList.list" :key="index" class="border-b border-background h-10">
                  <td> 
                    <RankIndex :index="index+1 + page * pageSize"/>  
                  </td>
                  <td>
                    <AddressLink :id="rich.address" :format="8"/>
                  </td>
                  <td class="text-sm"> 
                    <MinerTag :tag="rich.tag" />  
                  </td>
                  <td> {{rich.balance | filecoin(4)}} </td>
                  <td> {{ (rich.balance/richList.totalSupply * 100).toFixed(2) }}% </td>
                  <td> {{ $t('actor.' + rich.actor) }} </td>
                  <td> {{ rich.createTimestamp | timestamp('datetime') }} </td>
                  <td> {{ rich.lastSeenTimestamp | timestamp('datetime') }} </td>
              </tr>
            </tbody>
        </table>
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
      page:0,
      pageSize:20,
      totalPageCount:0,
      loading: false,
      richList:{},
      total:0,
      type: 0,
      options:[{
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
      }
      ]
    }
  },
  mounted() {
    this.getRichList()
  },
  methods: {
    getRichList() {
        this.loading = true
        this.$axios
        .get("/rich-list", { params: {pageSize: this.pageSize,page: this.page} })
        .then(res => {
          this.richList = res.data;
          this.total = this.richList.totalCount
          this.loading = false
          this.getTotalPageCount()
        });
    },
    getMinersRichList() {
        this.loading = true
        this.$axios
        .get("/rich-list", { params: {pageSize: this.pageSize,page: this.page, actor: 'fil/1/storageminer'} })
        .then(res => {
          this.richList = res.data;
          this.total = this.richList.totalCount
          this.loading = false
          this.getTotalPageCount()
        });
    },
    getNormalAccountsRichList() {
        this.loading = true
        this.$axios
        .get("/rich-list", { params: {pageSize: this.pageSize,page: this.page, actor: 'fil/1/account'} })
        .then(res => {
          this.richList = res.data;
          this.total = this.richList.totalCount
          this.loading = false
          this.getTotalPageCount()
        });
    },
    getTotalPageCount() {
        this.totalPageCount = Math.ceil(this.total / this.pageSize)
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1;
      switch (this.type) {
        case 0:
          this.getRichList();
          break;
        case 1:
          this.getMinersRichList();
          break;
        case 2:
          this.getNormalAccountsRichList();
          break;
        default:
          break;
      }
    },
    didSelectChanged(currentType) {
      this.type = currentType
      this.page = 0
      this.totalPageCount = 1
      this.total = 0
      switch (this.type) {
        case 0:
          this.getRichList();
          break;
        case 1:
          this.getMinersRichList();
          break;
        case 2:
          this.getNormalAccountsRichList();
          break;
        default:
          break;
      }
    }
  }
}
</script>
