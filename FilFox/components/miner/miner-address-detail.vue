<template>
  <div class="flex flex-col">
    <div
      class="flex flex-grow-0 mt-6 font-medium"
    >{{ $t('detail.address.normal.title') + ' ' + addressData.address }}</div>
    <div class="flex flex-col rounded-md my-4 bg-white pb-2">

    </div>

    <div class="flex flex-col rounded-md my-4 bg-white">
      <div class="flex ml-8 mt-4 font-medium">{{ $t('blockchain.message.title') }}</div>
      <div class="flex flex-row items-center justify-between border-b border-background">
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
      <div class="flex mx-4 mt-2">
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
      methodOptions: ["All"],
      page: 0,
      pageSize: 20,
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