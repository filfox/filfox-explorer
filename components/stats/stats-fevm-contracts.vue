<template>
  <div v-loading="loading">
    <div class="hidden lg:block">
      <table class="w-full">
        <tr>
          <th
            v-for="(key, index) in columns"
            :key="key"
            :class="[index ? 'w-auto' : 'w-1/4']"
            class="text-customGray-400 text-sm pt-4 pb-1"
          >
            {{ $t(`home.fvmTopContracts.${key}`) }}
          </th>
        </tr>
        <tr v-for="{ address, invokeCount, userCount, balance, totalFee } in contracts" :key="address" class="text-center text-sm">
          <td class="text-left pl-4">
            <AddressLink :id="address" :format="18" class="text-main" />
          </td>
          <td>{{ invokeCount }}</td>
          <td>{{ userCount }}</td>
          <td>{{ balance.$numberDecimal | filecoin(2) }}</td>
          <td>{{ totalFee.$numberDecimal | filecoin(2) }}</td>
        </tr>
      </table>
    </div>

    <ul class="block lg:hidden">
      <li
        v-for="{ address, invokeCount, userCount, balance, totalFee } in contracts"
        :key="address"
        class="border-b border-background py-2 text-xs"
      >
        <div class="mobile-table-item">
          <span>{{ $t(`home.fvmTopContracts.${columns[0]}`) }}</span>
          <AddressLink :id="address" :format="12" class="text-main" />
        </div>
        <div class="mobile-table-item">
          <span>{{ $t(`home.fvmTopContracts.${columns[1]}`) }}</span>
          <span>{{ invokeCount }}</span>
        </div>
        <div class="mobile-table-item">
          <span>{{ $t(`home.fvmTopContracts.${columns[2]}`) }}</span>
          <span>{{ userCount }}</span>
        </div>
        <div class="mobile-table-item">
          <span>{{ $t(`home.fvmTopContracts.${columns[3]}`) }}</span>
          <span>{{ balance.$numberDecimal | filecoin(2) }}</span>
        </div>
        <div class="mobile-table-item">
          <span>{{ $t(`home.fvmTopContracts.${columns[4]}`) }}</span>
          <span class="">{{ totalFee.$numberDecimal | filecoin(2) }}</span>
        </div>
      </li>
    </ul>

    <div v-if="pagination" class="flex items-center text-center mt-4">
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :current-page="page"
        class="mx-auto"
        @current-change="p => { page = p; getList() }"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    days: {
      type: Number,
      default: 1
    },
    sortBy: {
      type: String,
      default: 'transaction'
    },
    pagination: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },

  data() {
    return {
      loading: false,
      columns: ['contractAddress', 'transactions', 'uniqueUsers', 'balance', 'gasCost'],
      contracts: [],
      page: 1,
      totalCount: 0
    }
  },

  computed: {
    apiUrl() {
      switch (this.days) {
        case 1:
          return '/stats/fevm/recent-contracts'
        default:
          return '/stats/fevm/contracts'
      }
    }
  },

  watch: {
    sortBy() {
      this.page = 1
      this.getList()
    },
    days() {
      this.page = 1
      this.getList()
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    async getList() {
      this.loading = true
      const { totalCount, contractList } = await this.$axios.$get(this.apiUrl, {
        params: {
          offset: (this.page - 1) * this.pageSize,
          limit: this.pageSize,
          sortBy: this.sortBy,
          days: this.days
        }
      })
      this.loading = false

      this.contracts = contractList
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
</style>
