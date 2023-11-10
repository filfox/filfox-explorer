<template>
  <div>
    <div class="h-8.5 hidden lg:block"></div>
    <client-only>
      <VeLine
        :data="chartData"
        :y-axis="yAxis"
        :settings="chartSettings"
        :loading="loading"
        :data-empty="dataEmpty"
        :extend="chartExtend"
        :legend-visible="false"
        :grid="{ left: '4%', right: '4%', bottom: '10%' }"
        class="hidden lg:block"
      />
      <VeLine
        :data="chartData"
        :y-axis="yAxis"
        :settings="chartSettings"
        :loading="loading"
        :data-empty="dataEmpty"
        :extend="chartExtend"
        :legend-visible="false"
        :grid="{ top: 20, bottom: 20 }"
        height="280px"
        class="lg:hidden"
      />
    </client-only>
  </div>
</template>

<script>
import moment from 'moment'

function toLocaleString(n) {
  return n.toLocaleString() ?? n.toString()
}

function formatValue(value) {
  if (value < 1e6) {
    return `${toLocaleString(value)} attoFIL`
  } else if (value < 1e15) {
    return `${toLocaleString(value / 1e9)} nanoFIL`
  } else if (value < 1e24) {
    return `${toLocaleString(value / 1e18)} FIL`
  } else if (value < 1e33) {
    return `${toLocaleString(value / 1e27)} Billion FIL`
  } else {
    return `${toLocaleString(value / 1e36)} Quintillion FIL`
  }
}

export default {
  components: {
    VeLine: () => import('v-charts/lib/line').then(x => x.default)
  },

  props: {
    duration: { type: String, default: '24h' }
  },

  data() {
    this.chartSettings = {
      offsetY: 0,
      legendName: {},
      labelMap: {
        baseFee: 'Base Fee'
      }
    }

    this.yAxis = {
      type: 'value',
      axisLabel: { formatter: formatValue },
      axisTick: { show: false },
      alignTicks: true
    }

    this.chartExtend = {
      tooltip: {
        trigger: 'axis',
        formatter: params => [
          this.getDateTime(this.rawData[params[0].dataIndex].timestamp),
          ...params.map(param => `${param.marker}${param.seriesName}: ${formatValue(param.value[1])}`)
        ].join('<br>')
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

  watch: {
    duration() {
      this.getLineChartData()
    }
  },

  mounted() {
    this.getLineChartData()
  },

  methods: {
    async getLineChartData() {
      this.loading = true

      this.rawData = await this.$axios.$get('stats/base-fee', { params: { duration: this.duration, samples: 48 } })
      if (this.rawData == null) {
        this.dataEmpty = true
        this.loading = false
        return
      }

      const rows = this.rawData.map(info => ({
        time: this.getTime(info.timestamp),
        baseFee: info.baseFee
      }))

      // 解决坐标轴线分段问题
      const max = Math.max(...rows.map(i => i.baseFee))
      this.yAxis.max = max
      this.yAxis.interval = max / 7

      this.chartData.rows = rows
      this.chartData.columns = ['time', 'baseFee']
      this.loading = false
    },

    getTime(time) {
      if (this.duration === '24h') {
        return moment(time * 1000).format('HH:mm')
      } else {
        return moment(time * 1000).format('MM-DD HH:mm')
      }
    },

    getDateTime(time) {
      return moment(time * 1000).format('YYYY-MM-DD HH:mm')
    }
  }
}
</script>
