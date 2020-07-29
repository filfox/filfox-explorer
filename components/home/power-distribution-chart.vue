<template>
  <div>
    <ve-pie
      :data="chartData"
      :settings="chartSettings"
      :loading="loading"
      :data-empty="dataEmpty"
      :extend="chartExtend"
      class="hidden lg:block"
    />
    <ve-pie
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
import 'v-charts/lib/style.css'

export default {
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
    getPieChartData() {
      this.loading = true
      this.$axios.get('/miner/top-miners/power').then(res => {
        this.convertData(res.data)
      })
    },
    convertData(data) {
      if (data == null) {
        this.dataEmpty = true
        this.loading = false
        return
      }
      const columns = ['miner', 'power']
      const rows = []
      const others = data.otherQualityAdjPower / 2 ** 40
      for (const miner of data.miners) {
        const row = {}
        const tag = miner.tag
        if (tag == null) {
          row.miner = miner.address
          this.chartSettings.legendName[miner.address] = miner.address
          this.mobileSettings.legendName[miner.address] = miner.address
        } else {
          row.miner = `${miner.address}(${miner.tag[this.$i18n.locale]})`
          this.chartSettings.legendName[row.miner] = miner.address
          this.mobileSettings.legendName[row.miner] = miner.address
        }
        row.power = miner.qualityAdjPower / 2 ** 40
        rows.push(row)
      }
      rows.push({ miner: 'others', power: others })
      this.chartData.columns = columns
      this.chartData.rows = rows
      this.loading = false
    }

  }
}
</script>
