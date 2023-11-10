<template>
  <client-only>
    <VeLine
      :data="chartData"
      :y-axis="yAxis"
      :settings="chartSettings"
      :loading="loading"
      :data-empty="dataEmpty"
      :extend="chartExtend"
      :legend-visible="false"
      :data-zoom="dataZoom"
      :grid="{ top: '19%', bottom: '10%', left: '5%', right: '5%' }"
    />
  </client-only>
</template>

<script>
import moment from 'moment'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataZoomInside'
import { formatNum } from '@/utils/dapp'

export default {
  components: {
    VeLine: () => import('v-charts/lib/line').then(x => x.default)
  },

  data() {
    const tvlUSD = this.$t('home.fevmNavigation.tvlUSD')
    const tvlFIL = this.$t('home.fevmNavigation.tvlFIL')

    this.yAxis = [
      {
        type: 'value',
        position: 'left',
        axisLabel: {
          formatter: value => `${formatNum(value)} USD`
        },
        interval: 0,
        min: 0,
        max: 0,
        axisTick: { show: false },
        alignTicks: true
      },
      {
        type: 'value',
        position: 'right',
        axisLabel: {
          formatter: value => `${formatNum(value)} FIL`
        },
        min: 0,
        interval: 0,
        max: 0,
        axisTick: { show: false },
        alignTicks: true
      }
    ]

    this.chartSettings = {
      offsetY: 0,
      legendName: {},
      axisSite: {
        left: [tvlUSD],
        right: [tvlFIL]
      }
    }

    this.chartExtend = {
      title: {
        show: true,
        text: this.$t('home.fevmNavigation.marketCap'),
        left: '3%',
        top: '5%',
        textStyle: {
          fontSize: 14,
          fontWeight: 400
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: params => [
          this.getDate(this.rawData[params[0].dataIndex].timestamp),
          ...params.map(param => `${param.marker}${param.seriesName}: ${formatNum(param.value[1])}`)
        ].join('<br>')
      }
    }

    this.dataZoom = {
      type: 'inside',
      show: true
    }

    return {
      chartData: {
        columns: [],
        rows: []
      },
      loading: false,
      dataEmpty: false,
      rawData: [],
      tvlUSD,
      tvlFIL
    }
  },

  watch: {
    duration() {
      this.getChartData()
    }
  },

  mounted() {
    this.getChartData()
  },

  methods: {
    async getChartData() {
      this.loading = true

      this.rawData = await this.$axios.$get('/stats/defi/overall-statistics')
      if (!this.rawData) {
        this.dataEmpty = true
        this.loading = false
        return
      }

      const rows = this.rawData.map(info => ({
        time: this.getDate(info.timestamp),
        [this.tvlUSD]: info.totalLiquidityUSD,
        [this.tvlFIL]: info.tvlToken
      }))

      this.chartData.columns = ['time', this.tvlUSD, this.tvlFIL]
      this.chartData.rows = rows

      // 解决双坐标轴线不对齐
      this.yAxis[0].max = (Math.ceil(Math.max(...rows.map(item => item[this.tvlUSD]))) / 10) * 10
      this.yAxis[0].interval = this.yAxis[0].max / 5
      this.yAxis[1].min = Math.floor(Math.floor(Math.min(...rows.map(item => item[this.tvlFIL]))) / 10) * 10
      this.yAxis[1].min = this.yAxis[1].min < 0 ? this.yAxis[1].min : 0
      this.yAxis[1].max = Math.ceil(Math.ceil(Math.max(...rows.map(item => item[this.tvlFIL]))) / 10) * 10
      this.yAxis[1].max = this.yAxis[1].max > 0 ? this.yAxis[1].max : 0
      this.yAxis[1].interval = (this.yAxis[1].max - this.yAxis[1].min) / 5

      this.loading = false
    },

    getDate(time) {
      return moment(time).format('MM-DD')
    }
  }
}
</script>
