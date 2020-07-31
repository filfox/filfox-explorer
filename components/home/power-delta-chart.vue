<template>
  <div>
    <VeLine
      :data="chartData"
      :settings="chartSettings"
      :loading="loading"
      :data-empty="dataEmpty"
      :extend="chartExtend"
      class="hidden lg:block"
    />
    <VeLine
      :data="chartData"
      :settings="mobileChartSettings"
      :loading="loading"
      :data-empty="dataEmpty"
      :extend="mobileChartExtend"
      :grid="{top: 75, bottom: 20}"
      class="lg:hidden"
      width="100%"
      height="380px"
    />
  </div>
</template>
<script>
import moment from 'moment'

export default {
  components: {
    VeLine: () => import('v-charts/lib/line.common').then(x => x.default)
  },
  props: {
    maxCount: {
      type: Number,
      default: 5
    }
  },
  data() {
    this.chartSettings = {
      legendName: {}
    }
    this.mobileChartSettings = {
      offsetY: 0,
      legendName: {}
    }
    this.chartExtend = {
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} TiB'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: params => [
          this.getDateTime(this.rawData[params[0].dataIndex].timestamp),
          ...params.map(param => `${param.marker}${param.seriesName}: ${param.value[1]} TiB`)
        ].join('<br>')
      }
    }
    this.mobileChartExtend = {
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} TiB'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: params => [
          this.getDateTime(this.rawData[params[0].dataIndex].timestamp),
          ...params.map(param => `${param.marker}${param.seriesName}: ${param.value[1]} TiB`)
        ].join('<br>'),
        position: ['20%', '50%']
      }
    }
    return {
      chartData: {
        columns: [],
        rows: []
      },
      loading: false,
      dataEmpty: false,
      rawData: []
    }
  },
  mounted() {
    this.getlineChartData()
  },
  methods: {
    async getlineChartData() {
      this.loading = true
      this.rawData = await this.$axios.$get('/stats/miner/power-delta', {
        params: { count: this.maxCount, duration: '7d', samples: '7' }
      })
      if (!this.rawData) {
        this.dataEmpty = true
        this.loading = false
        return
      }
      const columns = []
      const rows = []
      columns.push('time')
      for (const info of this.rawData) {
        const row = { time: this.getTime(info.timestamp) }
        for (const miner of info.miners) {
          // max is 5
          let res = miner.address
          const tag = miner.tag
          if (tag == null) {
            this.chartSettings.legendName[res] = res
            this.mobileChartSettings.legendName[res] = res
          } else {
            res = `${miner.address}(${miner.tag[this.$i18n.locale]})`
            this.chartSettings.legendName[res] = miner.address
            this.mobileChartSettings.legendName[res] = miner.address
          }
          if (columns.length <= this.maxCount && columns.length <= this.rawData.length) {
            columns.push(res)
          }
          row[res] = (miner.powerDelta / 2 ** 40).toFixed(2)
        }
        rows.push(row)
      }
      this.chartData.columns = columns
      this.chartData.rows = rows
      this.loading = false
    },
    getTime(time) {
      return moment(time * 1000).format('MM-DD')
    },
    getDateTime(time) {
      return moment(time * 1000).format('YYYY-MM-DD HH:mm')
    }
  }
}
</script>
