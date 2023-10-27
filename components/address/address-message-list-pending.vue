<template>
  <div class="border-2 border-background rounded-xl mb-6 text-sm overflow-hidden">
    <div class="flex items-center font-light text-red-600 px-4 h-9.5 border-b border-background bg-customBlue-50">
      <img src="@/assets/img/message/pending-message.svg" class="w-4 h-4 mr-1" /> {{ $t('blockchain.message.info.pendingMessages', { count: totalCount }) }}
    </div>
    <div v-loading="loading" class="mt-3 px-4 pt-1 pb-2">
      <table class="w-full table-auto">
        <thead class="text-gray-600 text-sm m-2">
          <tr class="h-8">
            <th style="width: 15%">
              {{ $t('blockchain.message.tableHeaders.id') }}
            </th>
            <th style="width: 10%">
              {{ $t('blockchain.message.tableHeaders.height') }}
            </th>
            <th style="width: 12%">
              {{ $t('blockchain.message.tableHeaders.time') }}
            </th>
            <th style="width: 15%">
              {{ $t('blockchain.message.tableHeaders.from') }}
            </th>
            <th style="width: 15%">
              {{ $t('blockchain.message.tableHeaders.to') }}
            </th>
            <th>
              {{ $t('blockchain.message.tableHeaders.method') }}
            </th>
            <th>
              {{ $t('blockchain.message.tableHeaders.value') }}
            </th>
            <th>
              {{ $t('blockchain.message.tableHeaders.exitCode') }}
            </th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr
            v-for="(message, index) in list"
            :key="index"
            :class="{ 'border-t': index }"
            class="h-12 border-background text-sm"
          >
            <td>
              <MessageLink :id="message.cid" :format="8" />
            </td>
            <td>Pending</td>
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
              <el-tooltip
                :content="`${message.method} ( Contract created )`"
                placement="top"
                :disabled="!/CreateExternal/i.test(message.method)"
              >
                <span>{{ message.method || 'N/A' }}</span>
              </el-tooltip>
            </td>
            <td>{{ message.value | filecoin(4) }}</td>
            <td>Pending</td>
          </tr>
        </tbody>
      </table>
      <div v-if="totalCount > pageSize" class="pt-3 pb-2.5 flex border-t border-background">
        <el-pagination
          layout="prev, pager, next, jumper"
          class="ml-auto"
          :total="totalCount"
          :page-size="pageSize"
          :current-page="page"
          @current-change="p => page = p"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    address: { type: String, required: true }
  },

  data() {
    return {
      list: [],
      page: 1,
      pageSize: 5,
      totalCount: 0,
      loading: false
    }
  },

  computed: {
    params() {
      return {
        limit: this.pageSize,
        offset: (this.page - 1) * this.pageSize
      }
    }
  },

  watch: {
    page: {
      immediate: true,
      handler() {
        this.getList()
      }
    }
  },

  methods: {
    async getList() {
      this.loading = true
      const { messages, totalCount } = await this.$axios.$get(`/address/${this.address}/pending-messages`, { params: this.params })
      this.loading = false
      this.list = messages
      this.totalCount = totalCount
    }
  }
}
</script>
