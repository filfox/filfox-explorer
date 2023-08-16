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
      const result = [
        { k: 'totalAddressCount', v: data.totalAddressCount },
        { k: 'totalBalance', v: data.totalBalance }
      ]

      for (const { actor, count, balance } of data.addressStates) {
        const actorKey = `${actor}Count`
        const balanceKey = `${actor}Balance`

        result.push({ k: actorKey, v: count })
        result.push({ k: balanceKey, v: balance.$numberDecimal })
      }

      const orderMap = new Map(this.overview.map(({ k }, i) => [k, i]))
      result.sort((a, b) => orderMap.get(a.k) - orderMap.get(b.k))

      return result
    }
  }
}
</script>
