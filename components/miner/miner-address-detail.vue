<template>
  <div class="flex flex-col">
    <div class="flex flex-row items-center mt-6">
      <div class="flex flex-grow-0 font-medium">{{ $t('detail.address.normal.title') + ' ' + addressData.address }} </div>
      <MinerTag :tag="addressData.tag" :type="1" v-if="addressData.tag"/> 
      <div v-else class="text-main text-xs ml-2 mt-1 cursor-pointer" @click="showDialog"> {{ $t('tag.apply') }}> </div>
      <div v-if="addressData.tag && !addressData.tag.signed" class="text-main text-xs ml-2 cursor-pointer" @click="showDialog"> {{ $t('tag.sign') }}> </div>
    </div>

    <MinerVerifyApply :addressInfo="addressData.address" :tag="addressData.tag ? addressData.tag : {}" ref="verifyApplication"/>

    <div class="flex flex-col rounded-md mt-4 bg-white pb-2">
        <p class="mx-8 flex flex-grow mt-4"> {{ $t('detail.address.miner.minerOverview.title') }} </p>
        <div class="grid grid-rows-1 grid-cols-2 gap-4 my-4 mx-8">
          <div class="border border-background rounded-sm">
            <MinerBalance :addressData="addressData"/>
          </div>
          <div class="border border-background rounded-sm">
            <MinerPower :addressData="addressData"/>
          </div>
        </div>
    </div>

    <div class="flex flex-row mt-4 justify-between">
      <div class="rounded-md bg-white flex-grow flex-col flex mr-2 w-1/2">
        <p class="px-8 flex py-4 border-b border-background"> {{ $t('detail.address.miner.accountChange.title') }} </p>
        <MinerBalanceDetailChart :addressData="addressData" class="mt-4 mx-4"/>
      </div>
      <div class="rounded-md bg-white flex-col flex ml-2 w-1/2">
        <p class="px-8 flex py-4 border-b border-background"> {{ $t('detail.address.miner.powerChange.title') }} </p>
        <MinerPowerDetailChart :addressData="addressData" class="mt-4 mx-4"/>
      </div>
    </div>

    <div class="flex flex-col rounded-md mt-4 bg-white pb-2">
        <p class="px-8 flex flex-grow mt-4 border-b border-background pb-4"> {{ $t('detail.address.miner.accountOverview.title') }} </p>
        <div class="grid grid-rows-1 grid-cols-2 gap-4 mx-8 my-4">
            <div class="flex flex-col mr-2">
              <div class="flex flex-row justify-between">
                <p class="text-sm mt-2"> {{ $t('detail.address.miner.accountOverview.headers.address')}}: </p>
                <p class="text-sm mt-2"> {{ addressData.alias }} </p>
              </div>
              <div class="flex flex-row justify-between">
                <p class="text-sm mt-2"> {{ $t('detail.address.miner.accountOverview.headers.messageCount')}}: </p>
                <p class="text-sm mt-2"> {{ addressData.messageCount }} </p>
              </div>
              <div class="flex flex-row justify-between">
                <p class="text-sm mt-2"> {{ $t('detail.address.miner.accountOverview.headers.actor')}}: </p>
                <p class="text-sm mt-2"> {{ $t('actor.' + addressData.actor) }} </p>
              </div>
              <div class="flex flex-row justify-between">
                <p class="text-sm mt-2"> {{ $t('detail.address.miner.accountOverview.headers.createTime')}}: </p>
                <p class="text-sm mt-2"> {{ addressData.createTimestamp | timestamp('datetime') }} </p>
              </div>
            </div>
            <div class="flex flex-col ml-2">
              <div class="flex flex-row justify-between">
                <p class="text-sm mt-2"> {{ $t('detail.address.miner.accountOverview.headers.peerID')}}: </p>
                <PeerLink :id="addressData.miner.peerId" class="text-sm mt-2"/>
              </div>
              <div class="flex flex-row justify-between">
                <p class="text-sm mt-2"> {{ $t('detail.address.miner.accountOverview.headers.sectors')}}: </p>
                <p class="text-sm mt-2"> {{ addressData.miner.sectors | locale }} total, {{ addressData.miner.activeSectors | locale }} active, {{ addressData.miner.faults | locale }} faults, {{ addressData.miner.recoveries | locale }} recoveries</p>
              </div>
              <div class="flex flex-row justify-between">
                <p class="text-sm mt-2"> {{ $t('detail.address.miner.accountOverview.headers.owner')}}: </p>
                <AddressLink :id="addressData.miner.owner" class="text-sm mt-2 text-main"/>
              </div>
              <div class="flex flex-row justify-between">
                <p class="text-sm mt-2"> {{ $t('detail.address.miner.accountOverview.headers.worker')}}: </p>
                <AddressLink :id="addressData.miner.worker" class="text-sm mt-2 text-main"/>
              </div>
            </div>
        </div>
    </div>



    <div class="flex flex-col rounded-md my-4 bg-white">
      <div class="flex h-12 items-center mt-4 ml-8" >
          <el-radio-group v-model="listType" size="mini" @change="didListTypeChanged" fill="#1a4fc9">
            <el-radio-button class="focus:outline-none outline-none" :label="0">{{ $t('blockchain.message.title') }}</el-radio-button>
            <el-radio-button class="focus:outline-none outline-none" :label="1">{{ $t('blockchain.block.title') }}</el-radio-button>
          </el-radio-group>
      </div>
      <div class="flex flex-row items-center justify-between border-b border-background" v-if="listType == 0">
        <p
          class="flex ml-8 h-12 items-center text-sm"
        >{{ $t('blockchain.message.info.total') + ' ' + total + ' ' + $t('blockchain.message.info.messages')}}</p>
        <el-select v-model="method" placeholder size="mini" class="mr-4" @change="didSelectChanged">
          <el-option
            v-for="item in methodOptions"
            :key="item"
            :label="item == 'All' ? $t('blockchain.message.methods.all') : item"
            :value="item"
          ></el-option>
        </el-select>
      </div>
      <div class="flex mx-4 mt-2" v-if="listType == 0">
        <table class="w-full table-auto" v-if="!loading">
          <thead class="text-gray-600 text-sm m-2">
            <tr class="h-8">
              <th class="sticky top-0 bg-white z-10">{{$t('blockchain.message.tableHeaders.id')}}</th>
              <th
                class="sticky top-0 bg-white z-10"
              >{{$t('blockchain.message.tableHeaders.height')}}</th>
              <th class="sticky top-0 bg-white z-10">{{$t('blockchain.message.tableHeaders.time')}}</th>
              <th class="sticky top-0 bg-white z-10">{{$t('blockchain.message.tableHeaders.from')}}</th>
              <th class="sticky top-0 bg-white z-10">{{$t('blockchain.message.tableHeaders.to')}}</th>
              <th
                class="sticky top-0 bg-white z-10"
              >{{$t('blockchain.message.tableHeaders.method')}}</th>
              <th class="sticky top-0 bg-white z-10">{{$t('blockchain.message.tableHeaders.value')}}</th>
              <th
                class="sticky top-0 bg-white z-10"
              >{{$t('blockchain.message.tableHeaders.exitCode')}}</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr
              v-for="(message, index) in messagesList.messages"
              :key="index"
              class="h-12 border-b border-background"
            >
              <td>
                <MessageLink :id="message.cid" :format="8" />
              </td>
              <td>
                <TipsetLink :id="message.height" class="text-main" />
              </td>
              <td>{{ message.timestamp | timestamp('datetime') }}</td>
              <td>
                <AddressLink :id="message.from" :format="8" />
              </td>
              <td>
                <AddressLink :id="message.to" :format="8" />
              </td>
              <td>{{ message.method }}</td>
              <td>{{ message.value | filecoin() }}</td>
              <td v-if="message.receipt">{{ message.receipt.exitCode | exit-code }}</td>
              <td v-else>N/A</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex mx-8 mt-2 border-t border-background" v-else>
        <table class="w-full table-auto" v-if="!loading">
          <thead class="text-gray-600 text-sm m-2">
            <tr class="h-8">
              <th class="sticky top-0 bg-white z-10"> {{ $t('detail.address.miner.blockList.height') }} </th>
              <th class="sticky top-0 bg-white z-10"> {{ $t('detail.address.miner.blockList.hash') }} </th>
              <th class="sticky top-0 bg-white z-10">{{ $t('detail.address.miner.blockList.reward') }}</th>
              <th class="sticky top-0 bg-white z-10">{{ $t('detail.address.miner.blockList.time') }}</th>
              <th class="sticky top-0 bg-white z-10">{{ $t('detail.address.miner.blockList.messages') }}</th>
              <th class="sticky top-0 bg-white z-10">{{ $t('detail.address.miner.blockList.blockSize') }}</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr
              v-for="(block, index) in blockList.blocks"
              :key="index"
              class="h-12 border-b border-background"
            >
              <td>
                <TipsetLink :id="block.height" class="text-main" />
              </td>
              <td>
                <BlockLink :id="block.cid" :format="12"/>
              </td>
              <td v-if="block.reward">
                {{ block.reward | filecoin(2) }}
              </td>
              <td v-else> N/A </td>
              <td>
                {{ block.timestamp | timestamp('datetime') }}
              </td>
              <td>
                {{ block.messageCount }}
              </td>
              <td>
                {{ block.size }} Bytes
              </td>
            </tr>
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
      blockList: {},
      listType: 0,
      methodOptions: ["All"],
      page: 0,
      pageSize: 20,
      totalPageCount: 0,
      loading: false,
      total: 0,
      method: "All",
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
    getBlockList() {
      this.loading = true;
      var params = { pageSize: this.pageSize, page: this.page };
      this.$axios
        .get(`/address/${this.addressData.address}/blocks`, {
          params: params
        })
        .then(res => {
          this.blockList = res.data;
          this.loading = false;
          this.total = this.blockList.totalCount;
          this.getTotalPageCount();
        });
    },
    getTotalPageCount() {
      this.totalPageCount = Math.ceil(this.total / this.pageSize);
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1;
      if (this.listType == 0) {
        this.getMessagesList();
      }
      else {
        this.getBlockList();
      }
    },
    didSelectChanged(selectedMethod) {
      this.method = selectedMethod;
      this.page = 0;
      this.totalPageCount = 1;
      this.total = 0;
      this.getMessagesList();
    },
    didListTypeChanged() {
      this.page = 0;
      this.totalPageCount = 1;
      this.total = 0;
      if (this.listType == 0) {
        this.getMessagesList()
      }
      else {
        this.getBlockList()
      }
    },
    showDialog() {
      this.$refs.verifyApplication.showDialog()
    }
  }
};
</script>