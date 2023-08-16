<template>
  <div class="bg-white lg:rounded-md my-4">
    <div class="flex flex-col lg:flex-row lg:items-center justify-between py-1">
      <HomeTitle type="verifiedContracts" />
    </div>
    <div v-loading="loading" class="p-4 pt-0 border-t border-background">
      <div>
        <div class="hidden lg:block">
          <table class="w-full">
            <tr>
              <th
                v-for="(key, index) in columns"
                :key="key"
                :class="[index ? 'w-auto' : 'w-1/4']"
                class="text-customGray-400 text-sm pt-4 pb-1"
              >
                {{ $t(`home.verifiedContracts.${key}`) }}
              </th>
            </tr>
            <tr v-for="{ address, contractName, language, compiler, optimization, license } in contracts" :key="address" class="text-center text-sm">
              <td class="text-left pl-4">
                <AddressLink :id="address" :format="18" class="text-main" />
              </td>
              <td>{{ contractName }}</td>
              <td>{{ language }}</td>
              <td>{{ compiler }}</td>
              <td>{{ optimization }}</td>
              <td class="truncate" :title="license">
                {{ license }}
              </td>
            </tr>
          </table>
        </div>

        <ul class="block lg:hidden">
          <li
            v-for="{ address, contractName, language, compiler, optimization, license } in contracts"
            :key="address"
            class="border-b border-background py-2 text-xs"
          >
            <div class="mobile-table-item">
              <span>{{ $t(`home.verifiedContracts.${columns[0]}`) }}</span>
              <AddressLink :id="address" :format="12" class="text-main" />
            </div>
            <div class="mobile-table-item">
              <span>{{ $t(`home.verifiedContracts.${columns[1]}`) }}</span>
              <span>{{ contractName }}</span>
            </div>
            <div class="mobile-table-item">
              <span>{{ $t(`home.verifiedContracts.${columns[2]}`) }}</span>
              <span>{{ language }}</span>
            </div>
            <div class="mobile-table-item">
              <span>{{ $t(`home.verifiedContracts.${columns[3]}`) }}</span>
              <span>{{ compiler }}</span>
            </div>
            <div class="mobile-table-item">
              <span>{{ $t(`home.verifiedContracts.${columns[4]}`) }}</span>
              <span>{{ optimization }}</span>
            </div>
            <div class="mobile-table-item">
              <span>{{ $t(`home.verifiedContracts.${columns[5]}`) }}</span>
              <span>{{ license }}</span>
            </div>
          </li>
        </ul>

        <div class="flex items-center text-center mt-4">
          <el-pagination
            layout="prev, pager, next"
            :total="totalCount"
            :page-size="pageSize"
            :current-page="page"
            class="mx-auto"
            @current-change="p => page = p"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      columns: ['address', 'contractName', 'language', 'compiler', 'optimization', 'license'],
      contracts: [],
      page: 1,
      pageSize: 15,
      totalCount: 0
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
      this.loading = true
      const { totalCount, verifiedContractList } = await this.$axios.$get('/stats/verified-contracts', {
        params: {
          offset: (this.page - 1) * this.pageSize,
          limit: this.pageSize
        }
      })
      this.loading = false

      this.contracts = verifiedContractList.map(item => ({
        ...item,
        optimization: item.optimize ? `Enabled with ${item.optimizeRuns} runs` : 'Disabled'
      }))
      this.totalCount = totalCount
    }
  }
}
</script>

<style lang="postcss" scoped>
table {
  table-layout: auto;
  & td {
    @apply py-3 border-b border-background;
  }
}

.mobile-table-item {
  @apply flex justify-between items-center my-2;
  & > span:first-child {
    @apply text-customGray-400;
  }
  & > span:last-child {
    @apply w-2/3 break-all text-right;
  }
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 125px;
}
</style>
