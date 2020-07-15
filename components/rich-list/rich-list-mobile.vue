<template>
    <div class="flex flex-grow flex-col bg-white overflow-hidden">
        <div class="flex flex-col border-b border-background pb-2 mt-1">
            <HomeTitle type="richManRanks" />
            <div class="flex flex-row justify-between items-center">
                <p class="flex ml-4 text-xs"> {{ $t('blockchain.richList.info.total') + ' ' + total + ' ' + $t('blockchain.richList.info.accounts')}} </p>
                <el-select v-model="type" placeholder="" size="mini" class="mr-4" @change="didSelectChanged"> 
                    <el-option v-for="item in options" :key="item.type" :label="item.label" :value="item.type">
                    </el-option>
                </el-select>
          </div>
        </div>  

        <div class="flex flex-col mt-2 text-xs" v-if="!loading">
            <div v-for="(rich, index) in richList.list" :key="index" class="rounded-sm mx-3 mb-3 shadow bg-white px-1">
                <div class="flex flex-row pt-2">
                    <RankIndex :index="index+1 + page * pageSize"/> 
                     <AddressLink :id="rich.address" :format="4" class="mx-2"/>
                     <MinerTag :tag="rich.tag" :type="2" v-if="rich.tag"/>
                </div>

                <div class="flex flex-row justify-between pt-2 mx-1">
                    <p class="flex  text-gray-500">
                    {{$t('home.richManRanks.tableHeaders.balance')}} /  {{ $t('home.minerRanks.rate') }}
                    </p>
                    <p class="flex ">
                     {{rich.balance | filecoin(0)}} / {{ (rich.balance/richList.totalSupply * 100).toFixed(2) }}%
                    </p>
                </div>

                <div class="flex flex-row justify-between pt-2 mx-1">
                    <p class="flex  text-gray-500">
                    {{$t('blockchain.richList.tableHeaders.type')}}
                    </p>
                    <p class="flex ">
                     {{ $t('actor.' + rich.actor) }}
                    </p>
                </div>

                <div class="flex flex-row justify-between pt-2 mx-1">
                    <p class="flex  text-gray-500">
                    {{$t('blockchain.richList.tableHeaders.createTime')}}
                    </p>
                    <p class="flex ">
                     {{ rich.createTimestamp | timestamp('datetime') }}
                    </p>
                </div>

                <div class="flex flex-row justify-between pt-2 pb-2 mx-1">
                    <p class="flex  text-gray-500">
                    {{$t('blockchain.richList.tableHeaders.lastSeenTime')}}
                    </p>
                    <p class="flex ">
                    {{ rich.lastSeenTimestamp | timestamp('datetime') }}
                    </p>
                </div>
            </div>
        </div>
        <div class="flex flex-grow " v-if="loading" v-loading="loading"/>

        <div class="flex items-center text-center h-16">
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
      pageSize:10,
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
</script>>