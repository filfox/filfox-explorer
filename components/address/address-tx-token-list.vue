<template>
  <div v-loading="loading">
    <div class="mx-8 hidden lg:block">
      <div class="flex items-center justify-between border-b border-background">
        <p class="flex items-center h-12 text-sm">
          {{ $t('detail.transfer.total') }}
          {{ total }}
          {{ $t('detail.transfer.transaction') }}
        </p>
      <!-- <TransferTypeSelect
        v-model="trans"
        :methods="transferList.types"
        :el-select-options="{ size: 'mini' }"
      /> -->
      </div>
      <table class="w-full table-fixed">
        <thead class="m-2 text-sm text-gray-600">
          <tr class="h-8">
            <th class="sticky top-0 z-10 bg-white" style="width: 15%">
              {{ $t('detail.transfer.tableHeaders.time') }}
            </th>
            <th class="sticky top-0 z-10 bg-white" style="width: 25%">
              {{ $t('detail.transfer.tableHeaders.message') }}
            </th>
            <th class="sticky top-0 z-10 bg-white" style="width: 10%">
              {{ $t('detail.transfer.tableHeaders.from') }}
            </th>
            <th class="sticky top-0 z-10 bg-white" style="width: 10%">
            </th>
            <th class="sticky top-0 z-10 bg-white " style="width: 10%">
              {{ $t('detail.transfer.tableHeaders.to') }}
            </th>
            <th class="sticky top-0 z-10 bg-white" style="width: 13%">
              {{ $t('detail.transfer.tableHeaders.type') }}
            </th>
            <th class="sticky top-0 z-10 bg-white">
              {{ 'Token' }}
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
                <AddressTag :tag="transfer.fromTag" type="pc" :style="{ maxWidth:'66%' }" />
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
                <AddressTag :tag="transfer.toTag" type="pc" :style="{ maxWidth:'66%' }" />
              </div>
            </td>
            <td>
              <el-tag size="mini" type="info">
                {{ transfer.type }}
              </el-tag>
            </td>
            <td>
              <div v-if="/erc20/i.test(transfer.type)" class="flex justify-center items-center">
                <img :src="transfer.tokenIcon" alt="warn" class="w-4 h-4 mr-1.5">
                {{ transfer.value | parseToken(transfer.decimals, 6) }}
                <NuxtLink :to="localePath(`/token/${transfer.token}`)" class="hover:underline hover:text-main ml-1 text-xs font-mono">
                  {{ transfer.symbol }}
                </NuxtLink>
              </div>
              <span v-else class="text-xs flex justify-center items-center">
                <img src="@/assets/img/token/nft.png" alt="warn" class="w-4 h-4 mr-1.5">
                <div>
                  <NuxtLink :to="localePath(`/token/${transfer.token}`)" class="font-semibold hover:underline hover:text-main">
                    {{ transfer.symbol }}
                  </NuxtLink>
                  <div class="font-light">{{ transfer.name }}</div>
                </div>
              </span>
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

    <div class="block lg:hidden">
      <div class="flex items-center justify-between pb-1 mb-2">
        <p class="flex items-center h-8 ml-3 text-xs">
          {{ $t('detail.address.miner.blockList.total') + ' ' + total + ' ' + $t('detail.transfer.transaction') }}
        </p>
        <!-- <TransferTypeSelect
          v-model="trans"
          :methods="transferList.types"
          :el-select-options="{ size: 'mini' }"
          class="mr-3"
        /> -->
      </div>

      <div v-for="(transfer, index) in transferList.transfers" :key="index" class="py-2 mx-3 mb-3 bg-white rounded-sm shadow">
        <div class="flex items-center justify-between mx-3">
          <p class="text-xs text-gray-800">
            {{ $t('detail.transfer.tableHeaders.time') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ transfer.timestamp | timestamp('datetime') }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.transfer.tableHeaders.message') }} :
          </p>
          <MessageLink v-if="transfer.message" :id="transfer.message" :format="8" class="text-xs" />
          <span v-else class="text-xs text-gray-800"> N/A </span>
        </div>
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.transfer.tableHeaders.from') }}:
          </p>
          <div class="flex flex-row items-center justify-end">
            <AddressLink v-if="transfer.from" :id="transfer.from" :format="4" class="text-xs text-main" />
            <span v-else class="text-xs text-gray-800"> N/A </span>
            <AddressTag :tag="transfer.fromTag" type="mobile" :style="{ maxWidth:'66%' }" />
          </div>
        </div>
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.transfer.tableHeaders.to') }}:
          </p>
          <div class="flex flex-row items-center justify-end">
            <AddressLink v-if="transfer.to" :id="transfer.to" :format="4" class="text-xs text-main" />
            <span v-else class="text-xs text-gray-800"> N/A </span>
            <AddressTag :tag="transfer.toTag" type="mobile" :style="{ maxWidth:'66%' }" />
          </div>
        </div>
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.transfer.tableHeaders.type') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ transfer.type }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            Token
          </p>
          <p class="text-xs text-gray-800 flex items-center">
            <template v-if="/erc20/i.test(transfer.type)">
              <img :src="transfer.tokenIcon" alt="warn" class="w-4 h-4 mr-1.5">
              {{ transfer.value | parseToken(transfer.decimals, 6) }}
              <NuxtLink :to="localePath(`/token/${transfer.token}`)" class="hover:underline hover:text-main">
                {{ transfer.symbol }}
              </NuxtLink>
            </template>
            <template v-else>
              <img src="@/assets/img/token/nft.png" alt="warn" class="w-4 h-4 mr-1.5">
              <NuxtLink :to="localePath(`/token/${transfer.token}`)" class="hover:underline hover:text-main">
                {{ transfer.symbol }}
              </NuxtLink> / {{ transfer.name }}
            </template>
          </p>
        </div>
      </div>

      <div class="flex items-center text-center h-16">
        <el-pagination
          layout="prev, pager, next"
          class="mx-auto"
          :total="total"
          :pager-count="5"
          :page-size="pageSize"
          :current-page="page + 1"
          @current-change="p => page = p - 1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { TOKEN_ICONS } from '@/filecoin/filecoin.config'

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
      total: 0,
      page: 0,
      pageSize: 20,
      loading: false
    }
  },

  watch: {
    trans() {
      if (this.page === 0) return this.getTokenTxList()
      this.page = 0
    },

    page() {
      this.getTokenTxList()
    }
  },

  mounted() {
    this.getTokenTxList()
  },

  methods: {
    async getTokenTxList() {
      if (!this.address) return

      const params = { pageSize: this.pageSize, page: this.page }
      if (this.trans !== 'All') params.type = this.trans

      this.loading = true
      const res = await this.$axios.$get(`/address/${this.address}/token-transfers`, { params })
      res.transfers = res.transfers.map(t => ({ ...t, tokenIcon: TOKEN_ICONS[t.token] || TOKEN_ICONS.DEFAULT }))
      this.transferList = res
      this.loading = false
      this.total = this.transferList.totalCount
    }
  }
}
</script>
