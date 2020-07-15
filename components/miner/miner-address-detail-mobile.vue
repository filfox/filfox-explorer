<template>
  <div class="flex flex-col">
    <div class="bg-white flex flex-col">
        <p class="flex flex-grow mt-4 text-sm ml-3 font-medium"> {{ $t('detail.address.miner.minerOverview.title') }} </p>  
        <div class="flex flex-row items-center py-2 border-b border-background">
            <div class="flex flex-grow-0 text-xs ml-3">{{ $t('detail.address.normal.title') + ' ' + addressData.address }} </div>
            <MinerTag :tag="addressData.tag" :type="2" v-if="addressData.tag"/>
        </div>

        <div class="rounded-sm m-3 mb-0 shadow flex flex-row justify-between">
            <div class="flex w-1/2 h-full">
                <MinerBalanceChart :addressData="addressData"/>
            </div>
            <div class="flex flex-col py-4 text-right w-1/2 mr-5 mt-8">
                <p class="text-xs text-gray-800"> {{ $t('detail.address.miner.minerOverview.headers.balance')}} </p>
                <p class=" font-medium text-xl"> {{ addressData.balance | filecoin(2) }}</p>
                <p class="text-xs mt-3 text-gray-800"> {{ $t('detail.address.miner.minerOverview.headers.availableBalance')}}: {{ addressData.miner.availableBalance | filecoin(2) }}</p>
                <p class="text-xs mt-1 text-gray-800"> {{ $t('detail.address.miner.minerOverview.headers.pledgeBalance')}}: {{ addressData.miner.pledgeBalance | filecoin(2) }} </p>
            </div>
        </div>

        <div class="rounded-sm m-3 shadow flex flex-col justify-between">
            <p class="text-xs mt-4 ml-3 text-gray-800"> {{ $t('detail.address.miner.minerOverview.headers.qualityAdjPower')}} </p>
            <div class="flex flex-row flex-grow items-center justify-between mx-3 pb-1 border-b border-dashed border-background">
                <p class=" font-medium text-xl"> {{ addressData.miner.qualityAdjPower | size_metric(2) }}</p>
                <p class="text-xs pt-1 text-gray-800"> {{$t('detail.address.miner.minerOverview.headers.rate')}}: {{ (addressData.miner.qualityAdjPower/addressData.miner.totalQualityAdjPower * 100).toFixed(2) }}% </p>
                <p class="text-xs pt-1 text-gray-800"> {{$t('detail.address.miner.minerOverview.headers.rank')}}: {{ addressData.miner.qualityAdjPowerRank }} </p>
            </div>

            <div class="flex flex-row items-center justify-between mx-3 mt-1">
               <p class="text-xs text-gray-800"> {{ $t('detail.address.miner.minerOverview.headers.rawBytePower')}}: </p>
               <p class="text-xs text-gray-800"> {{ addressData.miner.rawBytePower | size_metric(2) }} </p>
            </div>
            <div class="flex flex-row items-center justify-between mx-3 mt-1">
               <p class="text-xs text-gray-800"> {{ $t('detail.address.miner.minerOverview.headers.sectorSize')}}: </p>
               <p class="text-xs text-gray-800"> {{ addressData.miner.sectorSize | size_metric(2) }} </p>
            </div>
            <div class="flex flex-row items-center justify-between mx-3 mt-1">
               <p class="text-xs text-gray-800"> {{ $t('detail.address.miner.minerOverview.headers.blockNums')}}: </p>
               <p class="text-xs text-gray-800"> {{ addressData.miner.blocksMined }} </p>
            </div>
            <div class="flex flex-row items-center justify-between mx-3 mt-1">
               <p class="text-xs text-gray-800"> {{ $t('detail.address.miner.minerOverview.headers.qualityAdjPowerDelta24h')}}:  </p>
               <p class="text-xs text-gray-800"> {{ addressData.miner.qualityAdjPowerDelta24h | size_metric(2) }} </p>
            </div>
            <div class="flex flex-row items-center justify-between mx-3 mt-1">
               <p class="text-xs text-gray-800"> {{ $t('detail.address.miner.minerOverview.headers.blocksReward')}}: </p>
               <p class="text-xs text-gray-800"> {{ addressData.miner.miningRewards | filecoin(2) }} </p>
            </div>
            <div class="flex flex-row items-center justify-between mx-3 mt-1 mb-3">
               <p class="text-xs text-gray-800"> {{ $t('detail.address.miner.minerOverview.headers.qualityAdjPowerDeltaSpeed24h')}}: </p>
               <p class="text-xs text-gray-800"> {{ addressData.miner.qualityAdjPowerDelta24h/24 | size_metric(2) }} / {{ $t('shared.time.hour') }} </p>
            </div>
        </div>
    </div>

    <div class="bg-white flex-grow flex-col flex w-full mt-2">
        <p class="pl-3 flex py-2 text-sm border-b border-background font-medium"> {{ $t('detail.address.miner.accountChange.title') }} </p>
        <MinerBalanceDetailChart :addressData="addressData" class="mt-4 mx-3"/>
    </div>

    <div class="bg-white flex-grow flex-col flex w-full mt-2">
        <p class="pl-3 flex py-2 text-sm border-b border-background font-medium"> {{ $t('detail.address.miner.powerChange.title') }} </p>
        <MinerPowerDetailChart :addressData="addressData" class="mt-4 mx-3"/>
    </div>

    <div class="flex flex-col flex-grow bg-white mt-2">
        <p class="pl-3 flex py-2 text-sm border-b border-background font-medium"> {{ $t('detail.address.miner.accountOverview.title') }} </p>
        <div class="flex flex-row items-center justify-between mx-3 mt-3">
            <p class="text-xs text-gray-800"> {{ $t('detail.address.miner.accountOverview.headers.address')}}: </p>
            <p class="text-xs text-gray-800 text-right"> {{ addressData.alias }} </p>
        </div>
        <div class="flex flex-row items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800"> {{ $t('detail.address.miner.accountOverview.headers.messageCount')}}: </p>
            <p class="text-xs text-gray-800"> {{ addressData.messageCount }} </p>
        </div>
        <div class="flex flex-row items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800"> {{ $t('detail.address.miner.accountOverview.headers.actor')}}: </p>
            <p class="text-xs text-gray-800"> {{ $t('actor.' + addressData.actor) }} </p>
        </div>
        <div class="flex flex-row items-center justify-between mx-3 mt-1 pb-1 border-b border-dashed border-background">
            <p class="text-xs text-gray-800"> {{ $t('detail.address.miner.accountOverview.headers.createTime')}}: </p>
            <p class="text-xs text-gray-800 text-right"> {{ addressData.createTimestamp | timestamp('datetime') }} </p>
        </div>

        <div class="flex flex-row items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800"> {{ $t('detail.address.miner.accountOverview.headers.peerID')}}: </p>
            <PeerLink :id="addressData.miner.peerId" :format='12' class="text-xs text-main"/>
        </div>
        <div class="flex flex-row items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800"> {{ $t('detail.address.miner.accountOverview.headers.sectors')}}: </p>
            <p class="text-xs text-gray-800 text-right"> {{ addressData.miner.sectors | locale }} total, {{ addressData.miner.provingSectors | locale }} proving, {{ addressData.miner.faults | locale }} faults, {{ addressData.miner.recoveries | locale }} recoveries </p>
        </div>
        <div class="flex flex-row items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800"> {{ $t('detail.address.miner.accountOverview.headers.owner')}}: </p>
            <AddressLink :id="addressData.miner.owner" class="text-xs text-main"/>
        </div>
        <div class="flex flex-row items-center justify-between mx-3 mt-1 mb-3">
            <p class="text-xs text-gray-800"> {{ $t('detail.address.miner.accountOverview.headers.worker')}}: </p>
            <AddressLink :id="addressData.miner.worker" class="text-xs text-main"/>
        </div>
    </div>

    <div class="flex flex-col flex-grow mt-2 bg-white" v-loading="loading">
        <p class="pl-3 flex py-2 text-sm font-medium"> {{ $t('blockchain.message.title') }} </p>

        <div class="flex flex-row items-center justify-between pb-1 mb-2">
              <p class="flex ml-3 h-8 items-center text-xs"> {{ $t('blockchain.message.info.total') + ' ' + total + ' ' + $t('blockchain.message.info.messages')}} </p>
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
    addressData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      messagesList: {},
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
      this.$axios
        .get(`/address/${this.addressData.address}/messages`, {
          params: params
        })
        .then(res => {
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
};
</script>