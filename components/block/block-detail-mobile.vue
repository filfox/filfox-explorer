<template>
    <div class="flex flex-grow flex-col bg-white pb-2">
        <div class="flex flex-grow-0 font-medium text-sm pl-4 py-3 border-b border-background"> {{ $t('detail.block.title') }} </div>

        <div class="flex flex-row justify-between items-center text-xs mx-4 mt-2">
          <p class="flex w-1/4">{{ $t('detail.block.headers.cid') }}</p>
          <BlockLink :id="block.cid" class="flex w-3/4" />
        </div>

        <div class="flex flex-row justify-between items-center text-xs mx-4 mt-2">
          <p class="flex w-1/4">{{ $t('detail.block.headers.height') }}</p>
          <TipsetLink :id="block.height" class="flex w-3/4 text-main" />
        </div>

        <div class="flex flex-row justify-between items-center text-xs mx-4 mt-2">
          <p class="flex w-1/4">{{ $t('detail.block.headers.time') }}</p>
          <p class="flex w-3/4"> {{ block.timestamp | timestamp }} </p>
        </div>

         <div class="flex flex-row justify-between items-center text-xs mx-4 mt-2">
          <p class="flex w-1/4">{{ $t('detail.block.headers.size') }}</p>
          <p class="flex w-3/4"> {{ block.size }} Bytes </p>
        </div>

         <div class="flex flex-row justify-between items-center text-xs mx-4 mt-2">
          <p class="flex w-1/4">{{ $t('detail.block.headers.messages') }}</p>
          <p class="flex w-3/4"> {{ block.messageCount | locale }} </p>
        </div>

         <div class="flex flex-row justify-between items-center text-xs mx-4 mt-2">
          <p class="flex w-1/4">{{ $t('detail.block.headers.reward') }}</p>
          <p class="flex w-3/4"> {{ block.reward | filecoin }} </p>
        </div>

         <div class="flex flex-row justify-between items-center text-xs mx-4 mt-2">
          <p class="flex w-1/4">{{ $t('detail.block.headers.parents') }}</p>
          <div class="flex flex-col w-3/4">
            <p v-for="parent in block.parents" :key="parent" class="items-center flex text-main mt-1">
             <BlockLink :id="parent" />
            </p>
          </div>
        </div>

         <div class="flex flex-row justify-between items-center text-xs mx-4 mt-2">
          <p class="flex w-1/4">{{ $t('detail.block.headers.parentWeight') }}</p>
          <p class="flex w-3/4"> {{ block.timestamp | timestamp }} </p>
        </div>

         <div class="flex flex-row justify-between items-center text-xs mx-4 mt-2">
          <p class="flex w-1/4">{{ $t('detail.block.headers.penalty') }}</p>
          <p class="flex w-3/4"> {{ block.penalty | filecoin }} </p>
        </div>

        <div class="flex flex-col flex-grow mt-4" v-loading="loading">
            <p class="pl-3 flex py-2 text-sm font-medium border-t border-background"> {{ $t('blockchain.message.title') }} </p>

            <div class="flex flex-row items-center justify-between pb-1 mb-2">
                <p class="flex ml-4 h-8 items-center text-xs"> {{ $t('blockchain.message.info.total') + ' ' + total + ' ' + $t('blockchain.message.info.messages')}} </p>
                <el-select v-model="method" placeholder="" size="mini" class="mr-3" @change="didSelectChanged"> 
                <el-option v-for="item in methodOptions" :key="item" :label="item == 'All' ? $t('blockchain.message.methods.all') : item" :value="item">
                </el-option>
                </el-select>
            </div>

            <div v-for="(message, index) in messagesList.messages" :key="index" class="rounded-sm mx-3 mb-3 shadow bg-white">
                <div class="flex flex-row items-center justify-between mx-3 mt-3">
                    <p class="text-xs text-gray-800"> {{$t('blockchain.message.tableHeaders.id')}}: </p>
                    <MessageLink :id="message.cid" :format="10" class="text-gray-800 text-xs" />
                </div>
                <div class="flex flex-row items-center justify-between mx-3 mt-1">
                    <p class="text-xs text-gray-800"> {{$t('blockchain.message.tableHeaders.height')}}: </p>
                    <TipsetLink :id="message.height" class="text-main text-xs" />
                </div>
                <div class="flex flex-row items-center justify-between mx-3 mt-1">
                    <p class="text-xs text-gray-800"> {{$t('blockchain.message.tableHeaders.time')}}: </p>
                    <p class="text-xs text-gray-800"> {{ message.timestamp | timestamp('datetime') }} </p>
                </div>
                <div class="flex flex-row items-center justify-between mx-3 mt-1">
                    <p class="text-xs text-gray-800"> {{$t('blockchain.message.tableHeaders.from')}}: </p>
                    <AddressLink :id="message.from" :format="12" class="text-main text-xs"/>
                </div>
                <div class="flex flex-row items-center justify-between mx-3 mt-1">
                    <p class="text-xs text-gray-800"> {{$t('blockchain.message.tableHeaders.to')}}: </p>
                    <AddressLink :id="message.to" :format="12" class="text-main text-xs"/>
                </div>
                <div class="flex flex-row items-center justify-between mx-3 mt-1">
                    <p class="text-xs text-gray-800"> {{$t('blockchain.message.tableHeaders.method')}}: </p>
                    <p class="text-xs text-gray-800"> {{ message.method }} </p>
                </div>
                <div class="flex flex-row items-center justify-between mx-3 mt-1">
                    <p class="text-xs text-gray-800"> {{$t('blockchain.message.tableHeaders.value')}}: </p>
                    <p class="text-xs text-gray-800"> {{ message.value | filecoin(4) }} </p>
                </div>
                <div class="flex flex-row items-center justify-between mx-3 mt-1 mb-3">
                    <p class="text-xs text-gray-800"> {{$t('blockchain.message.tableHeaders.exitCode')}}: </p>
                    <p class="text-xs text-gray-800" v-if="message.receipt"> {{ message.receipt.exitCode | exit-code }} </p>
                    <p class="text-xs text-gray-800" v-else> N/A </p>
                </div>
            </div>
            <div class="flex flex-grow items-center text-center h-16 bg-white">
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
    </div>
</template>

<script>
export default {
    props: {
        block: {
            type: Object,
            default: {}
        }
    },
    data() {
    return {
      messagesList:{},
      methodOptions: ["All"],
      page: 0,
      pageSize: 3,
      totalPageCount: 0,
      loading: false,
      total: 0,
      method: "All"
    };
  },
  mounted() {
    this.getMessagesList();
  },
  methods: {
    getMessagesList() {
      this.loading = true;
      var params = { pageSize: this.pageSize, page: this.page };
      if (this.method != "All") {
        params["method"] = this.method;
      }
      this.$axios.get(`/block/${this.block.cid}/messages`, { params: params }).then(res => {
        this.messagesList = res.data;
        this.methodOptions = ["All"];
        this.methodOptions = this.methodOptions.concat(res.data.methods);
        this.loading = false;
        this.total = this.messagesList.totalCount;
        this.getTotalPageCount();
      });
    },
    getTotalPageCount() {
      this.totalPageCount = Math.ceil(this.total / this.pageSize);
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1;
      this.getMessagesList();
    },
    didSelectChanged(selectedMethod) {
      this.method = selectedMethod;
      this.page = 0;
      this.totalPageCount = 1;
      this.total = 0;
      this.getMessagesList();
    }
  }
}
</script>>