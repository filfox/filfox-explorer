<template>
  <div>
    <div class="bg-white lg:hidden">
      <div v-if="loading" v-loading="loading"></div>
      <div v-if="!loading" class="mt-2">
        <p class="pl-4 flex pt-2 text-sm font-medium">
          {{ $t('blockchain.message.title') }}
        </p>

        <div class="flex flex-row items-center justify-between pb-1 mb-2 border-b border-background mt-1">
          <p class="flex ml-4 h-8 items-center text-xs">
            {{ $t('blockchain.message.info.total') + ' ' + total + ' ' + $t('blockchain.message.info.messages') }}
          </p>
          <el-select v-model="method" placeholder="" size="mini" class="mr-3" @change="didSelectChanged">
            <el-option v-for="item in methodOptions" :key="item" :label="item == 'All' ? $t('blockchain.message.methods.all') : item" :value="item" />
          </el-select>
        </div>

        <div v-for="(message, index) in messagesList.messages" :key="index" class="rounded-sm mx-3 mb-3 shadow bg-white">
          <div class="flex flex-row items-center justify-between mx-3 mt-3">
            <p class="text-xs text-gray-800">
              {{ $t('blockchain.message.tableHeaders.id') }}:
            </p>
            <MessageLink :id="message.cid" :format="10" class="text-gray-800 text-xs" />
          </div>
          <div class="flex flex-row items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('blockchain.message.tableHeaders.height') }}:
            </p>
            <TipsetLink :id="message.height" class="text-main text-xs" />
          </div>
          <div class="flex flex-row items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('blockchain.message.tableHeaders.time') }}:
            </p>
            <p class="text-xs text-gray-800">
              {{ message.timestamp | timestamp('datetime') }}
            </p>
          </div>
          <div class="flex flex-row items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('blockchain.message.tableHeaders.from') }}:
            </p>
            <AddressLink :id="message.from" :format="12" class="text-main text-xs" />
          </div>
          <div class="flex flex-row items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('blockchain.message.tableHeaders.to') }}:
            </p>
            <AddressLink :id="message.to" :format="12" class="text-main text-xs" />
          </div>
          <div class="flex flex-row items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('blockchain.message.tableHeaders.method') }}:
            </p>
            <p class="text-xs text-gray-800">
              {{ message.method }}
            </p>
          </div>
          <div class="flex flex-row items-center justify-between mx-3 mt-1">
            <p class="text-xs text-gray-800">
              {{ $t('blockchain.message.tableHeaders.value') }}:
            </p>
            <p class="text-xs text-gray-800">
              {{ message.value | filecoin(4) }}
            </p>
          </div>
          <div class="flex flex-row items-center justify-between mx-3 mt-1 mb-3">
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
        <div class="flex flex-grow items-center text-center h-16 bg-white">
          <el-pagination
            layout="prev, pager, next"
            :page-count="totalPageCount"
            :pager-count="5"
            :current-page="page+1"
            class="mx-auto"
            @current-change="didCurrentPageChanged"
          />
        </div>
      </div>
    </div>

    <div class="hidden container mx-auto lg:block">
      <div class="mt-6 font-medium">
        {{ $t('blockchain.message.title') }}
      </div>
      <div class="rounded-md my-4 bg-white">
        <div class="flex flex-row items-center justify-between border-b border-background">
          <p class="flex ml-4 h-12 items-center text-sm">
            {{ $t('blockchain.message.info.total') + ' ' + total + ' ' + $t('blockchain.message.info.messages') }}
          </p>
          <el-select v-model="method" size="mini" class="mr-4" @change="didSelectChanged">
            <el-option v-for="item in methodOptions" :key="item" :label="item == 'All' ? $t('blockchain.message.methods.all') : item" :value="item" />
          </el-select>
        </div>
        <div class="flex mx-4">
          <table v-if="!loading" class="w-full table-auto">
            <thead class="text-gray-600 text-sm m-2">
              <tr class="h-8">
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('blockchain.message.tableHeaders.id') }}
                </th>
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('blockchain.message.tableHeaders.height') }}
                </th>
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('blockchain.message.tableHeaders.time') }}
                </th>
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('blockchain.message.tableHeaders.from') }}
                </th>
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('blockchain.message.tableHeaders.to') }}
                </th>
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('blockchain.message.tableHeaders.method') }}
                </th>
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('blockchain.message.tableHeaders.value') }}
                </th>
                <th class="sticky top-0 bg-white z-10">
                  {{ $t('blockchain.message.tableHeaders.exitCode') }}
                </th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="(message, index) in messagesList.messages" :key="index" class="h-12 border-b border-background">
                <td>
                  <MessageLink :id="message.cid" :format="8" />
                </td>
                <td>
                  <TipsetLink :id="message.height" class="text-main" />
                </td>
                <td>
                  {{ message.timestamp | timestamp('datetime') }}
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
        <div v-if="loading" v-loading="loading" class="flex h-24"></div>
        <div class="flex flex-grow items-center text-center h-16">
          <el-pagination
            layout="prev, pager, next"
            :page-count="totalPageCount"
            :current-page="page+1"
            class="mx-auto"
            @current-change="didCurrentPageChanged"
          />
        </div>
      </div>
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
      messagesList: {},
      methodOptions: ['All'],
      page: 0,
      pageSize: 20,
      totalPageCount: 0,
      loading: false,
      total: 0,
      method: 'All'
    }
  },
  mounted() {
    this.getMessagesList()
  },
  methods: {
    getMessagesList() {
      this.loading = true
      const params = { pageSize: this.pageSize, page: this.page }
      if (this.method !== 'All') {
        params.method = this.method
      }
      this.$axios
        .get('/message/list', { params })
        .then(res => {
          this.messagesList = res.data
          this.methodOptions = ['All']
          this.methodOptions = this.methodOptions.concat(res.data.methods)
          this.loading = false
          this.total = this.messagesList.totalCount
          this.getTotalPageCount()
        })
    },
    getTotalPageCount() {
      this.totalPageCount = Math.ceil(this.total / this.pageSize)
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      this.getMessagesList()
    },
    didSelectChanged(selectedMethod) {
      this.method = selectedMethod
      this.page = 0
      this.totalPageCount = 1
      this.total = 0
      this.getMessagesList()
    }
  },
  head() {
    return {
      title: `${this.$t('meta.titles.messages')}`
    }
  }
}
</script>
