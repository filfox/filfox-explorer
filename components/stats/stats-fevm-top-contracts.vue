<template>
  <div class="bg-white lg:rounded-md my-4">
    <div class="flex flex-col lg:flex-row lg:items-center justify-between py-1">
      <div class="flex items-center">
        <HomeTitle type="fvmTopContracts" />
        <span v-if="more" class="ml-1">( {{ $t('home.fvmTopContracts.latest24') }} )</span>
      </div>

      <DurationSelect
        v-if="timeRange && (sortBy !== 'balance')"
        v-model="duration"
        class="ml-4 mr-2 mb-2.5 lg:ml-auto lg:mb-0"
      />

      <div class="ml-4 mb-2.5 lg:mb-0 mr-3 lg:mr-4 flex items-center">
        <span class="text-xs">{{ $t('home.fvmTopContracts.orderBy') }}</span>
        <el-select v-model="sortBy" size="mini" class="ml-2 auto-width">
          <template slot="prefix">{{ sortBy }}</template>
          <el-option
            v-for="{ label, value } in sorts"
            :key="value"
            :label="label"
            :value="value"
            class="capitalize"
          />
        </el-select>
        <NuxtLink v-if="more" :to="localePath('/fevm/contracts')" class="ml-auto lg:ml-4">
          <el-button round size="mini">
            {{ $t('shared.more') }}
          </el-button>
        </NuxtLink>
      </div>
    </div>
    <div class="p-4 pt-0 border-t border-background">
      <StatsFevmContracts :sort-by="sortBy" :page-size="pageSize" :pagination="pagination" :days="days" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    timeRange: {
      type: Boolean,
      default: false
    },
    more: {
      type: Boolean,
      default: false
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
      duration: '24h',
      sortBy: 'transaction',
      sorts: [
        { label: 'Transaction', value: 'transaction' },
        { label: 'User', value: 'users' },
        { label: 'Balance', value: 'balance' },
        { label: 'Fee', value: 'fee' }
      ]
    }
  },

  computed: {
    days() {
      return {
        '24h': 1,
        '7d': 7,
        '30d': 30,
        '1y': 365
      }[this.duration]
    }
  }
}
</script>
