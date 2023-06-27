<template>
  <div class="mx-8">
    <div class="flex items-center justify-between border-b border-background">
      <p class="flex items-center h-12 text-sm">
        {{ $t('detail.transfer.total') }}
        {{ total }}
        {{ $t('detail.transfer.transaction') }}
      </p>
      <TransferTypeSelect
        v-model="trans"
        :methods="transferList.types"
        :el-select-options="{ size: 'mini' }"
      />
    </div>
    <table v-if="!loading" class="w-full table-fixed">
      <thead class="m-2 text-sm text-gray-600">
        <tr class="h-8">
          <th class="sticky top-0 z-10 bg-white w-1/8">
            {{ $t('detail.transfer.tableHeaders.time') }}
          </th>
          <th class="sticky top-0 z-10 w-1/4 bg-white">
            {{ $t('detail.transfer.tableHeaders.message') }}
          </th>
          <th class="sticky top-0 z-10 bg-white w-5/32">
            {{ $t('detail.transfer.tableHeaders.from') }}
          </th>
          <th class="sticky top-0 z-10 bg-white w-1/16">
          </th>
          <th class="sticky top-0 z-10 bg-white w-5/32">
            {{ $t('detail.transfer.tableHeaders.to') }}
          </th>
          <th class="sticky top-0 z-10 bg-white w-1/8">
            {{ $t('detail.transfer.tableHeaders.income') }}
          </th>
          <th class="sticky top-0 z-10 bg-white w-1/8">
            {{ $t('detail.transfer.tableHeaders.type') }}
          </th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr
          v-for="(transfer, index) in transferList.transfers"
          :key="index"
          class="h-12 text-sm border-b border-background"
        >
          <td>
            {{ transfer.timestamp | timestamp('datetime') }}
          </td>
          <td>
            <MessageLink v-if="transfer.message" :id="transfer.message" :format="12" />
            <span v-else>N/A</span>
          </td>
          <td>
            <div class="flex flex-row items-center justify-center">
              <AddressLink v-if="transfer.from" :id="transfer.from" :format="4" />
              <span v-else>N/A</span>
              <AddressTag :tag="transfer.fromTag" type="pc" :style="{maxWidth:'66%'}" />
            </div>
          </td>
          <td>
            <div class="flex justify-center">
              <img src="~/assets/img/shared/to.svg" alt="3" class="w-4">
            </div>
          </td>
          <td>
            <div class="flex flex-row items-center justify-center">
              <AddressLink v-if="transfer.to" :id="transfer.to" :format="4" />
              <span v-else>N/A</span>
              <AddressTag :tag="transfer.toTag" type="pc" :style="{maxWidth:'66%'}" />
            </div>
          </td>
          <td>
            {{ transfer.value | filecoin(4) }}
          </td>
          <td>
            {{ $t('detail.transfer.types.' + transfer.type ) }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex items-center text-center h-16">
      <el-pagination
        layout="prev, pager, next, jumper"
        class="mx-auto"
        :total="total"
        :page-size="pageSize"
        :current-page="page + 1"
        @current-change="p => page = p - 1"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      trans: 'All',
      transferList: {
        totalCount: 0,
        transfers: [],
        types: []
      },
      page: 0,
      total: 0,
      pageSize: 20,
      loading: false
    }
  },

  watch: {
    trans() {
      if (this.page === 0) return this.getTransferList()
      this.page = 0
    },

    page() {
      this.getTransferList()
    }
  },

  mounted() {
    this.getTransferList()
  },

  methods: {
    async getTransferList() {
      if (!this.address) return

      const params = { pageSize: this.pageSize, page: this.page }
      if (this.trans !== 'All') params.type = this.trans
      this.loading = true
      this.transferList = await this.$axios.$get(`/address/${this.address}/transfers`, { params })
      this.loading = false
      this.total = this.transferList.totalCount
    }
  }
}
</script>
