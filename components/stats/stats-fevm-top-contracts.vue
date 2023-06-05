<template>
  <div class="bg-white lg:rounded-md my-4">
    <div class="flex flex-col lg:flex-row lg:items-center justify-between py-1">
      <div class="flex items-center">
        <HomeTitle type="fvmTopContracts" />
        <span v-if="more" class="ml-1">( {{ $t('home.fvmTopContracts.latest24') }} )</span>
      </div>

      <template v-if="timeRange && (sortBy !== 'balance')">
        <el-radio-group v-model="activeDays" size="mini" fill="#1a4fc9" class="ml-4 mr-2 mb-2.5 lg:ml-auto lg:mb-0">
          <el-radio-button v-for="{ days, label } in timeTabs" :key="days" :label="days">
            {{ label }}
          </el-radio-button>
        </el-radio-group>
      </template>

      <div class="ml-4 mb-2.5 lg:mb-0 mr-3 lg:mr-4 flex items-center">
        <span class="text-sm">{{ $t('home.fvmTopContracts.orderBy') }}</span>
        <el-select v-model="sortBy" size="mini" class="ml-2 order-by">
          <el-option
            v-for="item in sorts"
            :key="item"
            :label="item"
            :value="item"
            class="capitalize"
          />
        </el-select>
        <NuxtLink v-if="more" :to="localePath('/stats/fevm/contracts')" class="ml-auto lg:ml-4">
          <el-button round size="mini">
            {{ $t('shared.more') }}
          </el-button>
        </NuxtLink>
      </div>
    </div>
    <div class="p-4 pt-0 border-t border-background">
      <StatsFevmContracts :sort-by="sortBy" :page-size="pageSize" :pagination="pagination" :days="activeDays" />
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
      activeDays: 1,
      timeTabs: [
        { days: 1, label: `24 ${this.$t('shared.time.hour')}` },
        { days: 7, label: `7 ${this.$t('shared.time.day')}` },
        { days: 30, label: `1 ${this.$t('shared.time.month')}` },
        { days: 365, label: `1 ${this.$t('shared.time.year')}` }
      ],
      sortBy: 'transaction',
      sorts: [
        'transaction',
        'users',
        'balance',
        'fee'
      ]
    }
  }
}
</script>

<style lang="postcss">
.order-by .el-input input {
  @apply rounded-full !important;
}
</style>
