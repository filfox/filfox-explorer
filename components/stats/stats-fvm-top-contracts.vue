<template>
  <div class="bg-white lg:rounded-md my-4">
    <div class="flex flex-col lg:flex-row lg:items-center justify-between py-1">
      <HomeTitle type="fvmTopContracts" />
      <div class="ml-4 lg:ml-auto mb-2.5 lg:mb-0 mr-3 lg:mr-4 flex items-center">
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
        <NuxtLink v-if="more" :to="localePath('/stats/fvm/contracts')" class="ml-auto lg:ml-4">
          <el-button round size="mini">
            {{ $t('shared.more') }}
          </el-button>
        </NuxtLink>
      </div>
    </div>
    <div class="p-4 pt-0 border-t border-background">
      <StatsFvmContracts :sort-by="sortBy" :page-size="pageSize" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    more: {
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
