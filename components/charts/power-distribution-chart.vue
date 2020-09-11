<template>
  <div>
    <VePie
      :data="chartData"
      :settings="chartSettings"
      :loading="loading"
      :data-empty="dataEmpty"
      :extend="chartExtend"
      class="hidden lg:block"
    />
    <VePie
      :data="chartData"
      :settings="mobileSettings"
      :loading="loading"
      :data-empty="dataEmpty"
      :extend="mobileChartExtend"
      class="lg:hidden"
      width="100%"
      height="380px"
    />
  </div>
</template>

<script>
export default {
  components: {
    VePie: () => import('v-charts/lib/pie').then(x => x.default)
  },
  data() {
    this.chartSettings = {
      legendName: {},
      offsetY: 220
    }
    this.mobileSettings = {
      legendName: {},
      offsetY: window.innerWidth <= 640 ? 225 : 210,
      radius: window.innerWidth <= 640 ? 80 : 100
    }
    this.chartExtend = {
      tooltip: {
        trigger: 'item',
        formatter: params => `${params.marker + params.name}: ${params.value.toFixed(2)}TiB (${params.percent}%)`
      }
    }
    this.mobileChartExtend = {
      tooltip: {
        trigger: 'item',
        formatter: params => `${params.marker + params.name}: ${params.value.toFixed(2)}TiB (${params.percent}%)`,
        position: ['15%', '50%']
      }
    }
    return {
      chartData: {
        columns: [],
        rows: []
      },
      loading: false,
      dataEmpty: false
    }
  },
  mounted() {
    this.getPieChartData()
  },
  methods: {
    async getPieChartData() {
      this.loading = true
      const data = await this.$axios.$get('/miner/top-miners/power/brief')
      if (data == null) {
        this.dataEmpty = true
        this.loading = false
        return
      }
      this.chartData.rows = data.miners.map(miner => {
        const row = {}
        const tag = miner.tag
        if (tag == null) {
          row.miner = miner.address
          this.chartSettings.legendName[miner.address] = miner.address
          this.mobileSettings.legendName[miner.address] = miner.address
        } else {
          row.miner = `${miner.address}(${miner.tag.name})`
          this.chartSettings.legendName[row.miner] = miner.address
          this.mobileSettings.legendName[row.miner] = miner.address
        }
        row.power = miner.qualityAdjPower / 2 ** 40
        return row
      })
      this.chartData.rows.push({ miner: 'others', power: data.otherQualityAdjPower / 2 ** 40 })
      this.chartData.columns = ['miner', 'power']
      this.loading = false
    }

  }
}
</script>
