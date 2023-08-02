<template>
  <div v-loading="loading" class="px-4 md:px-8 py-2 md:py-4">
    <div class="hidden md:block">
      <table class="w-full table-fixed">
        <thead class="m-2 text-gray-600">
          <tr class="h-8">
            <th class="sticky top-0 z-10 bg-white font-normal w-1/8">
              {{ $t('detail.token.data.tx.time') }}
            </th>
            <th class="sticky top-0 z-10 bg-white font-normal  w-1/4">
              {{ $t('detail.token.data.tx.id') }}
            </th>
            <th class="sticky top-0 z-10 bg-white font-normal w-1/5">
              {{ $t('detail.token.data.tx.sender') }}
            </th>
            <th class="sticky top-0 z-10 bg-white font-normal w-1/16"></th>
            <th class="sticky top-0 z-10 bg-white font-normal w-1/5">
              {{ $t('detail.token.data.tx.receiver') }}
            </th>
            <th class="sticky top-0 z-10 bg-white font-normal">
              {{ /erc20/i.test(list.tokenType) ? $t('shared.value') : $t('shared.item') }}
            </th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr
            v-for="(transfer, index) in list.transfers"
            :key="index"
            class="h-12 text-sm border-b border-background"
          >
            <td>
              {{ transfer.timestamp | timestamp('datetime') }}
            </td>
            <td>
              <MessageLink v-if="transfer.message" :id="transfer.message" :format="14" />
              <span v-else>N/A</span>
            </td>
            <td>
              <div class="flex flex-row items-center justify-center">
                <AddressLink v-if="transfer.from" :id="transfer.from" :format="12" />
                <span v-else>N/A</span>
                <AddressTag :tag="transfer.fromTag" type="pc" :style="{ maxWidth: '66%' }" />
              </div>
            </td>
            <td>
              <div class="flex justify-center">
                <img src="~/assets/img/shared/to.svg" alt="3" class="w-4">
              </div>
            </td>
            <td>
              <div class="flex flex-row items-center justify-center">
                <AddressLink v-if="transfer.to" :id="transfer.to" :format="12" />
                <span v-else>N/A</span>
                <AddressTag :tag="transfer.toTag" type="pc" :style="{ maxWidth:'66%' }" />
              </div>
            </td>
            <td>
              <span v-if="/erc20/i.test(list.tokenType)">{{ transfer.value | parseToken(list.decimals) }}</span>
              <span v-else class="flex items-center justify-center">
                <img src="@/assets/img/token/nft.png" class="w-4 h-4 mr-1" />
                {{ transfer.value }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ul class="md:hidden">
      <li v-for="(transfer, index) in list.transfers" :key="index" class="py-2 border-b leading-loose">
        <div class="flex justify-between">
          <span class="text-gray-600">{{ $t('detail.token.data.tx.time') }}</span>
          <span>
            {{ transfer.timestamp | timestamp('datetime') }}
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">{{ $t('detail.token.data.tx.id') }}</span>
          <span>
            <MessageLink v-if="transfer.message" :id="transfer.message" :format="14" />
            <span v-else>N/A</span>
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">{{ $t('detail.token.data.tx.sender') }}</span>
          <span>
            <AddressLink v-if="transfer.from" :id="transfer.from" :format="12" />
            <span v-else>N/A</span>
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">{{ $t('detail.token.data.tx.receiver') }}</span>
          <span>
            <AddressLink v-if="transfer.from" :id="transfer.to" :format="12" />
            <span v-else>N/A</span>
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">{{ /erc20/i.test(list.tokenType) ? $t('shared.value') : $t('shared.item') }}</span>
          <span v-if="/erc20/i.test(list.tokenType)">{{ transfer.value | parseToken(list.decimals) }}</span>
          <span v-else class="flex items-center justify-center">
            <img src="@/assets/img/token/nft.png" class="w-4 h-4 mr-1" />
            {{ transfer.value }}
          </span>
        </div>
      </li>
    </ul>

    <div class="flex items-center text-center h-16">
      <el-pagination
        layout="prev, pager, next, jumper"
        class="mx-auto hidden md:block"
        :total="list.totalCount"
        :page-size="pageSize"
        :current-page="page + 1"
        @current-change="p => page = p - 1"
      />
      <el-pagination
        layout="prev, pager, next"
        class="mx-auto md:hidden"
        :total="list.totalCount"
        :pager-count="5"
        :page-size="pageSize"
        :current-page="page + 1"
        @current-change="p => page = p - 1"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {
        symbol: '',
        tokenType: '',
        totalCount: 0,
        transfers: []
      },

      page: 0,
      pageSize: 10,
      loading: false
    }
  },

  computed: {
    address() {
      return this.$route.params.id
    }
  },

  watch: {
    page() {
      this.getList()
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    async getList() {
      if (!this.address) return

      const params = { limit: this.pageSize, offset: this.page * this.pageSize }
      this.loading = true
      const res = await this.$axios.$get(`/token/${this.address}/token-transfers`, { params })
      this.loading = false
      this.list = res
      this.$emit('setTotalCount', this.list.totalCount || 0)
    }
  }
}
</script>
