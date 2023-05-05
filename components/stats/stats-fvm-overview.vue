<template>
  <div v-loading="loading" class="bg-white rounded-md mt-4">
    <HomeTitle type="fvmOverview" />
    <div class="flex flex-wrap p-2 border-t border-customBackground">
      <div v-for="{ k, v } in overview" :key="k" class="w-1/2 lg:w-1/4 h-24 lg:h-32 p-1 lg:p-2">
        <div class="h-full bg-customBackground flex flex-col items-center justify-center rounded-sm">
          <span class="text-xs text-gray-500">
            {{ $t(`home.fvmOverview.${k}`) }}
          </span>
          <span class="text-lg lg:text-2xl">
            <template v-if="typeof v === 'number'">{{ v | locale }}</template>
            <template v-if="typeof v === 'string'">{{ v | filecoin(2) }}</template>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      overview: [
        { k: 'totalAddressCount', v: 0 },
        { k: 'evmCount', v: 0 },
        { k: 'ethaccountCount', v: 0 },
        { k: 'placeholderCount', v: 0 },
        { k: 'totalBalance', v: '0' },
        { k: 'evmBalance', v: '0' },
        { k: 'ethaccountBalance', v: '0' },
        { k: 'placeholderBalance', v: '0' }
      ],
      loading: false
    }
  },

  async mounted() {
    try {
      this.loading = true
      const res = await this.$axios.get('/stats/fevm/address')
      this.overview = this.transformData(res.data)
    } catch (error) {} finally {
      this.loading = false
    }
  },

  methods: {
    transformData(data) {
      return [
        { k: 'totalAddressCount', v: data.totalAddressCount },
        { k: 'evmCount', v: data.addressStat[0].count },
        { k: 'ethaccountCount', v: data.addressStat[1].count },
        { k: 'placeholderCount', v: data.addressStat[2].count },
        { k: 'totalBalance', v: data.totalBalance },
        { k: 'evmBalance', v: data.addressStat[0].balance },
        { k: 'ethaccountBalance', v: data.addressStat[1].balance },
        { k: 'placeholderBalance', v: data.addressStat[2].balance }
      ]
    }
  }
}
</script>

