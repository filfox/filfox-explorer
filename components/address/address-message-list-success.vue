<template>
  <div class="text-sm border-2 border-background rounded-xl overflow-hidden">
    <div class="flex items-center text-customGray-450 font-light px-4 h-9.5 border-b border-background bg-customBlue-50">
      <img src="@/assets/img/message/success-message.svg" class="w-4 h-4 mr-1" /> {{ $t('blockchain.message.info.confirmedMessages', { count: totalCount }) }}
      <el-dropdown class="ml-auto" @command="type => method = type">
        <span class="el-dropdown-link flex items-center">
          {{ method }}
          <img src="@/assets/img/shared/filter.svg" alt="filter" class="w-4.25 ml-1">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="type in ['All', ...methods]" :key="type" :command="type">
            {{ type == 'All' ? $t('blockchain.message.methods.all') : type }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-loading="loading" class="mt-3 p-4 pt-0">
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
            class="h-12 border-b border-background text-sm"
          >
            <td>
              <MessageLink :id="message.cid" :format="8" />
            </td>
            <td>
              <TipsetLink :id="message.height" class="text-customBlue-295" />
            </td>
            <td>{{ message.timestamp | timestamp('datetime') }}</td>
            <td>
              <AddressLink :id="message.from" :format="8" />
            </td>
            <td>
              <AddressLink :id="message.to" :format="8" />
            </td>
            <td>
              <MessageMethod :evm-method="message.evmMethod" :method="message.method" />
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
      <div class="flex mt-3">
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
      method: 'All',
      methods: [],
      list: [],
      page: 1,
      pageSize: 10,
      totalCount: 0,
      loading: false
    }
  },

  watch: {
    method() {
      this.page = 1
      this.getList()
    },

    page() {
      this.getList()
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    async getList() {
      this.loading = true
      const params = { pageSize: this.pageSize, page: this.page - 1 }
      if (this.method !== 'All') params.method = this.method
      const { messages, totalCount, methods } = await this.$axios.$get(`/address/${this.address}/messages`, { params })
      this.loading = false

      this.list = messages
      this.methods = methods
      this.totalCount = totalCount
    }
  }
}
</script>
