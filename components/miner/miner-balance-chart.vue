<template>
  <div>
    <client-only>
      <VeRing
        :data="chartData"
        :settings="chartSettings"
        :data-empty="dataEmpty"
        :extend="chartExtend"
        :legend-visible="false"
        height="200px"
        width="100%"
        class="hidden lg:block"
      />
      <VeRing
        :data="chartData"
        :settings="chartSettings"
        :data-empty="dataEmpty"
        :extend="mobileChartExtend"
        :legend-visible="false"
        height="200px"
        width="100%"
        class="lg:hidden"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  components: {
    VeRing: () => import('v-charts/lib/ring').then(x => x.default)
  },
  props: {
    addressData: { type: Object, required: true }
  },
  data() {
    this.chartSettings = {
      offsetX: '50%',
      offsetY: '50%',
      radius: [25, 50],
      label: {
        show: false
      }
    }
    this.chartExtend = {
      tooltip: {
        trigger: 'item',
        formatter(params) {
          return `${params.marker + params.name}: ${params.value} FIL (${params.percent}%)`
        }
      }
    }
    this.mobileChartExtend = {
      tooltip: {
        trigger: 'item',
        formatter(params) {
          return `${params.marker + params.name}: ${params.value} FIL (${params.percent}%)`
        },
        position: ['20%', '40%']
      }
    }
    return {
      chartData: {
        columns: [],
        rows: []
      },
      dataEmpty: false
    }
  },
  watch: {
    addressData: {
      handler(newVal) {
        this.updateChartData()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    updateChartData() {
      const ab = this.convertFilecoin(this.addressData.miner.availableBalance, 4)
      const sb = this.convertFilecoin(this.addressData.miner.sectorPledgeBalance, 4)
      const lr = this.convertFilecoin(this.addressData.miner.vestingFunds, 4)
      this.chartData.rows = [
        { type: this.$t('detail.address.miner.minerOverview.headers.availableBalance'), value: ab },
        { type: this.$t('detail.address.miner.minerOverview.headers.sectorPledge'), value: sb },
        { type: this.$t('detail.address.miner.minerOverview.headers.lockedRewards'), value: lr }
      ]
      this.chartData.columns = ['type', 'value']
    },
    convertFilecoin(value, precision) {
      if (precision == null) {
        const s = value.toString().padStart(19, '0')
        return `${s.slice(0, -18)}.${s.slice(-18)}`.replace(/\.?0*$/g, '')
      } else {
        return (value / 1e18).toFixed(precision)
      }
    }
  }
}
</script>
