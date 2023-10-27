<template>
  <div>
    <div class="flex items-center justify-between border-b border-background">
      <p class="flex ml-8 h-12 items-center text-sm">
        {{ $t('blockchain.message.info.total') }} {{ messageList.totalCount }} {{ $t('blockchain.message.info.messages') }}
      </p>
      <MessageMethodSelect
        v-model="method"
        :methods="messageList.methods"
        :el-select-options="{size: 'mini'}"
        class="mr-4"
      />
    </div>
    <div class="flex mx-4 mt-2">
      <table v-if="!loading" class="w-full table-auto">
        <thead class="text-gray-600 text-sm m-2">
          <tr class="h-8">
            <th class="table-header">
              {{ $t('blockchain.message.tableHeaders.id') }}
            </th>
            <th class="table-header">
              {{ $t('blockchain.message.tableHeaders.height') }}
            </th>
            <th class="table-header">
              {{ $t('blockchain.message.tableHeaders.time') }}
            </th>
            <th class="table-header">
              {{ $t('blockchain.message.tableHeaders.from') }}
            </th>
            <th class="table-header">
              {{ $t('blockchain.message.tableHeaders.to') }}
            </th>
            <th class="table-header">
              {{ $t('blockchain.message.tableHeaders.method') }}
            </th>
            <th class="table-header">
              {{ $t('blockchain.message.tableHeaders.value') }}
            </th>
            <th class="table-header">
              {{ $t('blockchain.message.tableHeaders.exitCode') }}
            </th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr
            v-for="(message, index) in messageList.messages"
            :key="index"
            class="h-12 border-b border-background text-sm"
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
            <td>
              <el-tooltip
                :content="`${message.method} ( Contract created )`"
                placement="top"
                :disabled="!/CreateExternal/i.test(message.method)"
              >
                <span>{{ message.method || 'N/A' }}</span>
              </el-tooltip>
            </td>
            <td>{{ message.value | filecoin(4) }}</td>
            <td v-if="message.receipt">
              {{ message.receipt.exitCode | exit-code }}
            </td>
            <td v-else>
              N/A
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="loading" v-loading="loading" class="mx-auto h-24"></div>
    <div class="flex items-center text-center h-16">
      <el-pagination
        layout="prev, pager, next, jumper"
        :page-count="totalPageCount"
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
    pageSize: { type: Number, default: 20 }
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

<style lang="postcss" scoped>
  .table-header {
    @apply sticky top-0 bg-white z-10;
  }
</style>
