<template>
  <div>
    <div class="bg-white lg:hidden">
      <div class="mt-2">
        <p class="pl-4 flex pt-2 text-sm font-medium">
          {{ $t('blockchain.mempool.title') }}
        </p>

        <div class="flex items-center justify-between pb-1 mb-2 border-b border-background mt-1">
          <p class="flex ml-4 h-8 items-center text-xs">
            {{ $t('blockchain.message.info.total') }}
            {{ messageList.totalCount }}
            {{ $t('blockchain.message.info.messages') }}
          </p>
          <MessageMethodSelect
            v-model="method"
            :methods="messageList.methods"
            :el-select-options="{size: 'mini'}"
            class="mr-3"
          />
        </div>

        <div
          v-for="(message, index) in messageList.messages"
          :key="index"
          class="rounded-sm mx-3 mb-3 py-2 shadow bg-white text-xs text-gray-800"
        >
          <div class="message-item">
            <p>
              ID
            </p>
            <MessageLink :id="message.cid" :format="12" class="text-main" />
          </div>
          <div class="message-item">
            <p>
              {{ $t('detail.message.headers.createTime') }}:
            </p>
            <FromNow :timestamp="message.createTimestamp" />
          </div>
          <div class="message-item">
            <p>
              {{ $t('blockchain.message.tableHeaders.from') }}:
            </p>
            <AddressLink :id="message.from" :format="12" class="text-main" />
          </div>
          <div class="message-item">
            <p>
              {{ $t('blockchain.message.tableHeaders.to') }}:
            </p>
            <AddressLink :id="message.to" :format="12" class="text-main" />
          </div>
          <div class="message-item">
            <p>
              {{ $t('blockchain.message.tableHeaders.method') }}:
            </p>
            <p>
              {{ message.method || 'N/A' }}
            </p>
          </div>
          <div class="message-item">
            <p>
              {{ $t('blockchain.message.tableHeaders.value') }}:
            </p>
            <p>
              {{ message.value | filecoin(4) }}
            </p>
          </div>
          <div class="message-item">
            <p>
              {{ $t('blockchain.message.tableHeaders.gasLimit') }}:
            </p>
            <p>
              {{ message.gasLimit | locale }}
            </p>
          </div>
          <div class="message-item">
            <p>
              Gas Premium:
            </p>
            <p>
              {{ message.gasPremium | filecoin }}
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
    </div>

    <div class="hidden container mx-auto lg:block">
      <div class="mt-6 font-medium">
        {{ $t('blockchain.mempool.title') }}
      </div>
      <div class="rounded-md my-4 bg-white">
        <div class="flex items-center justify-between border-b border-background">
          <p class="flex ml-4 h-12 items-center text-sm">
            {{ $t('blockchain.message.info.total') }}
            {{ messageList.totalCount }}
            {{ $t('blockchain.message.info.messages') }}
          </p>
          <el-select v-model="method" size="mini" class="mr-4">
            <el-option
              v-for="item in methodOptions"
              :key="item"
              :label="item == 'All' ? $t('blockchain.message.methods.all') : item"
              :value="item"
            />
          </el-select>
        </div>
        <div class="flex mx-4">
          <table class="w-full table-auto">
            <thead class="text-gray-600 text-sm m-2">
              <tr class="h-8">
                <th class="table-header">
                  ID
                </th>
                <th class="table-header">
                  {{ $t('detail.message.headers.createTime') }}
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
                  {{ $t('blockchain.message.tableHeaders.gasLimit') }}
                </th>
                <th class="table-header">
                  Gas Premium
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
                  <FromNow :timestamp="message.createTimestamp" />
                </td>
                <td>
                  <AddressLink :id="message.from" :format="8" />
                </td>
                <td>
                  <AddressLink :id="message.to" :format="8" />
                </td>
                <td>
                  {{ message.method }}
                </td>
                <td>
                  {{ message.value | filecoin(4) }}
                </td>
                <td>
                  {{ message.gasLimit | locale }}
                </td>
                <td>
                  {{ message.gasPremium | filecoin }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex items-center text-center h-16">
          <el-pagination
            layout="prev, pager, next"
            :page-count="totalPageCount"
            :current-page="page + 1"
            class="mx-auto"
            @current-change="didCurrentPageChanged"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, error }) {
    try {
      const messageList = await $axios.$get('/mempool/list', { params: { pageSize: 20, page: 0 } })
      return { messageList }
    } catch (err) {
      if (err?.response) {
        error({ code: err.response.status, message: err.response.statusText })
      } else {
        error({ code: 500, message: err.toString() })
      }
    }
  },
  data() {
    return {
      messageList: {
        totalCount: 0,
        messages: [],
        methods: []
      },
      page: 0,
      pageSize: 20,
      method: 'All',
      loading: false
    }
  },
  computed: {
    methodOptions() {
      return ['All', ...this.messageList.methods]
    },
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
  methods: {
    async getMessageList() {
      this.loading = true
      const params = { pageSize: this.pageSize, page: this.page }
      if (this.method !== 'All') {
        params.method = this.method
      }
      this.messageList = await this.$axios.$get('/mempool/list', { params })
      this.loading = false
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      this.getMessageList()
    }
  },
  head() {
    return {
      title: this.$t('meta.titles.mempool')
    }
  }
}
</script>

<style lang="postcss" scoped>
  .message-item {
    @apply flex items-center justify-between mx-3 mt-1;
  }
  .table-header {
    @apply sticky top-0 bg-white z-10;
  }
</style>
