<template>
  <div v-loading="loading" class="mx-auto">
    <div class="flex items-center justify-between pb-1 mb-2">
      <p class="flex ml-4 h-8 items-center text-xs">
        {{ $t('blockchain.message.info.total') }} {{ messageList.totalCount }} {{ $t('blockchain.message.info.messages') }}
      </p>
      <MessageMethodSelect
        v-model="method"
        :methods="messageList.methods"
        :el-select-options="{size: 'mini'}"
        class="mr-3"
      />
    </div>

    <div v-for="(message, index) in messageList.messages" :key="index" class="rounded-sm mx-3 mb-3 pt-2 pb-px shadow bg-white">
      <div class="flex items-center justify-between mx-3 mt-1">
        <p class="text-xs text-gray-800">
          {{ $t('blockchain.message.tableHeaders.id') }}:
        </p>
        <MessageLink :id="message.cid" :format="10" class="text-gray-800 text-xs" />
      </div>
      <div class="flex items-center justify-between mx-3 mt-1">
        <p class="text-xs text-gray-800">
          {{ $t('blockchain.message.tableHeaders.height') }}:
        </p>
        <TipsetLink :id="message.height" class="text-main text-xs" />
      </div>
      <div class="flex items-center justify-between mx-3 mt-1">
        <p class="text-xs text-gray-800">
          {{ $t('blockchain.message.tableHeaders.time') }}:
        </p>
        <p class="text-xs text-gray-800">
          {{ message.timestamp | timestamp('datetime') }}
        </p>
      </div>
      <div class="flex items-center justify-between mx-3 mt-1">
        <p class="text-xs text-gray-800">
          {{ $t('blockchain.message.tableHeaders.from') }}:
        </p>
        <AddressLink :id="message.from" :format="12" class="text-main text-xs" />
      </div>
      <div class="flex items-center justify-between mx-3 mt-1">
        <p class="text-xs text-gray-800">
          {{ $t('blockchain.message.tableHeaders.to') }}:
        </p>
        <AddressLink :id="message.to" :format="12" class="text-main text-xs" />
      </div>
      <div class="flex items-center justify-between mx-3 mt-1">
        <p class="text-xs text-gray-800">
          {{ $t('blockchain.message.tableHeaders.method') }}:
        </p>
        <p class="text-xs text-gray-800">
          {{ message.method }}
        </p>
      </div>
      <div class="flex items-center justify-between mx-3 mt-1">
        <p class="text-xs text-gray-800">
          {{ $t('blockchain.message.tableHeaders.value') }}:
        </p>
        <p class="text-xs text-gray-800">
          {{ message.value | filecoin(4) }}
        </p>
      </div>
      <div class="flex items-center justify-between mx-3 mt-1 mb-3">
        <p class="text-xs text-gray-800">
          {{ $t('blockchain.message.tableHeaders.exitCode') }}:
        </p>
        <p v-if="message.receipt" class="text-xs text-gray-800">
          {{ message.receipt.exitCode | exit-code }}
        </p>
        <p v-else class="text-xs text-gray-800">
          N/A
        </p>
      </div>
    </div>
    <div class="flex items-center text-center h-16 bg-white">
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
  props: {
    address: { type: String, required: true },
    pageSize: { type: Number, default: 3 }
  },
  data() {
    return {
      messageList: {
        totalCount: 0,
        messages: [],
        methods: []
      },
      page: 0,
      loading: false,
      method: 'All'
    }
  },
  computed: {
    totalPageCount() {
      return Math.ceil(this.messageList.totalCount / this.pageSize)
    },
    methodOptions() {
      return ['All', ...this.messageList.methods]
    }
  },
  watch: {
    method() {
      this.page = 0
      this.getMessageList()
    }
  },
  mounted() {
    this.getMessageList()
  },
  methods: {
    async getMessageList() {
      this.loading = true
      const params = { pageSize: this.pageSize, page: this.page }
      if (this.method !== 'All') {
        params.method = this.method
      }
      this.messageList = await this.$axios.$get(`/address/${this.address}/messages`, { params })
      this.loading = false
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      this.getMessageList()
    }
  }
}
</script>
