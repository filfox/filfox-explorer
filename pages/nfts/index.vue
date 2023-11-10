<template>
  <div class="container mx-auto">
    <div class="px-4 lg:px-1 mt-4">
      <p class="text-sm lg:text-base font-semibold">{{ $t('home.nftList.title') }}</p>
      <p class="text-xs text-customGray-450 italic mt-0.75">{{ $t('home.nftList.disclaimer') }}</p>
    </div>

    <div class="my-4 lg:rounded-md bg-white text-xs md:text-sm">
      <div class="flex items-center px-4 lg:px-10 h-14 text-customGray-450 text-xs">
        <IconPie class="mr-1.5" />{{ $t('home.nftList.totalNfts', { count: totalCount }) }}
      </div>
      <table v-loading="loading" class="hidden lg:table w-full table-fixed">
        <thead>
          <tr class="font-normal text-customGray-450">
            <th class="text-left pl-11" style="width: 8%">#</th>
            <th
              v-for="(col, index) in $t('home.nftList.tableColumns')"
              :key="col"
              :style="{ width: index == 0 ? '30%' : 'auto' }"
              class="text-left font-normal text-customGray-450 pl-11"
            >
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(token, index) in list" :key="index" class="h-14 border-b border-background">
            <td class="pl-11">
              {{ index + 1 }}
            </td>
            <td class="pl-11">
              <span class="flex items-center">
                <TokenIcon :token-id="token.address" token-type="ERC721" class="w-5 h-5" />
                <span
                  class="ml-2 mr-1 cursor-pointer hover:text-customBlue-290"
                  @click="$router.push(localePath(`/token/${token.address}`))"
                >{{ token.name }}</span>
                <span class="text-customGray-450">({{ token.symbol }})</span>
              </span>
            </td>
            <td class="pl-11">{{ token.totalValue }}</td>
            <td class="pl-11">
              {{ token.transferCount }}
            </td>
            <td class="pl-11">
              {{ token.holderCount }}
            </td>
          </tr>
        </tbody>
      </table>

      <!-- mobile -->
      <ul v-loading="loading" class="lg:hidden px-4">
        <li
          v-for="(token, index) in list"
          :key="index"
          class="py-2 text-xs leading-loose border-b"
        >
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('home.nftList.tableColumns.0') }}</span>
            <span class="flex items-center" @click="$router.push(localePath(`/token/${token.address}`))">
              <TokenIcon :token-id="token.address" token-type="ERC721" />
              <span class="mx-1">{{ token.name }}</span>
              <span class="text-customGray-450">({{ token.symbol }})</span>
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('home.nftList.tableColumns.1') }}</span>
            <span>{{ token.totalValue }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('home.nftList.tableColumns.2') }}</span>
            <span>{{ token.transferCount }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('home.nftList.tableColumns.3') }}</span>
            <span>{{ token.holderCount }}</span>
          </div>
        </li>
      </ul>

      <!-- pagination -->
      <div class="flex px-4 lg:px-10 py-6">
        <el-pagination
          class="mx-auto lg:mr-0 mt-3 lg:mt-0"
          small
          layout="prev, pager, next"
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
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 10,
      totalCount: 0,
      loading: false
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
      const { tokens, totalCount } = await this.$axios.$get('/token/nft-list', {
        params: { offset: this.pageSize * (this.page - 1), limit: this.pageSize }
      })
      this.loading = false

      this.list = tokens
      this.totalCount = totalCount
    }
  },

  head() {
    return {
      title: this.$t('meta.titles.nfts')
    }
  }
}
</script>
