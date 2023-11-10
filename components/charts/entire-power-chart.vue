<template>
  <div>
    <div class="h-8.5 hidden lg:block"></div>
    <client-only>
      <VeLine
        :y-axis="yAxis"
        :data="chartData"
        :settings="chartSettings"
        :loading="loading"
        :data-empty="dataEmpty"
        :tooltip-visible="false"
        :extend="chartExtend"
        :grid="{ left: '4%', right: '4%', bottom: '10%' }"
        class="hidden lg:block"
      />
      <VeLine
        :y-axis="yAxis"
        :data="chartData"
        :settings="mobileChartSettings"
        :loading="loading"
        :data-empty="dataEmpty"
        :extend="mobileChartExtend"
        :grid="{ top: 75, bottom: 20 }"
        class="lg:hidden"
        width="100%"
        height="380px"
      />
    </client-only>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  components: {
    VeLine: () => import('v-charts/lib/line').then(x => x.default)
  },
  props: {
    maxCount: {
      type: Number,
      default: 5
    }
  },
  data() {
    this.yAxis = [
      {
        type: 'value',
        position: 'left',
        axisLabel: {
          formatter(value) {
            return `${Number(value).toFixed(0)} Eib`
          }
        },
        interval: 0,
        min: 0,
        max: 0,
        axisTick: {
          show: false
        },
        alignTicks: true
      },
      {
        type: 'value',
        position: 'right',
        axisLabel: {
          formatter(value) {
            return `${Number(value).toFixed(0)} Pib`
          }
        },
        min: 0,
        interval: 0,
        max: 0,
        axisTick: {
          show: false
        },
        alignTicks: true
      }
    ]

    this.chartSettings = {
      legendName: {},
      axisSite: {
        left: [this.$t('home.entireQualityAdjPower.qualityAdjPower')],
        right: [this.$t('home.entireQualityAdjPower.qualityAdjPowerDelta')]
      }
    }

    this.mobileChartSettings = {
      offsetY: 0,
      legendName: {}
    }

    this.chartExtend = {
      tooltip: {
        trigger: 'axis',
        formatter: params => [
          this.getDateTime(this.rawData[params[0].dataIndex].timestamp),
          ...params.map(param => `${param.marker}${param.seriesName}: ${param.value[1]} ${param.seriesName === this.$t('home.entireQualityAdjPower.qualityAdjPower') ? 'Eib' : 'Pib'}`)
        ].join('<br>')
      }
    }

    this.mobileChartExtend = {
      tooltip: {
        trigger: 'axis',
        formatter: params => [
          this.getDateTime(this.rawData[params[0].dataIndex].timestamp),
          ...params.map(param => `${param.marker}${param.seriesName}: ${param.value[1]} ${param.seriesName === this.$t('home.entireQualityAdjPower.qualityAdjPower') ? 'Eib' : 'Pib'}`)
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

      const data = await this.$axios.$get(`/stats/power`, {
        params: { duration: '30d', samples: 30 }
      })
      if (!data) {
        this.dataEmpty = true
        this.loading = false
        return
      }

      this.rawData = data
      const rows = []
      const qualityAdjPower = this.$t('home.entireQualityAdjPower.qualityAdjPower')
      const qualityAdjPowerDelta = this.$t('home.entireQualityAdjPower.qualityAdjPowerDelta')

      data.forEach(item => {
        rows.push({
          time: this.getTime(item.timestamp),
          [qualityAdjPower]: (item.qualityAdjPower / 2 ** 60).toFixed(2),
          [qualityAdjPowerDelta]: (item.qualityAdjPowerDelta / 2 ** 50).toFixed(2)
        })
      })

      // 解决双坐标轴线不对齐
      this.yAxis[0].max = (Math.ceil(Math.max(...rows.map(item => item[qualityAdjPower]))) / 10) * 10
      this.yAxis[0].interval = this.yAxis[0].max / 7
      this.yAxis[1].min = Math.floor(Math.floor(Math.min(...rows.map(item => item[qualityAdjPowerDelta]))) / 10) * 10
      this.yAxis[1].min = this.yAxis[1].min < 0 ? this.yAxis[1].min : 0
      this.yAxis[1].max = Math.ceil(Math.ceil(Math.max(...rows.map(item => item[qualityAdjPowerDelta]))) / 10) * 10
      this.yAxis[1].max = this.yAxis[1].max > 0 ? this.yAxis[1].max : 0
      this.yAxis[1].interval = (this.yAxis[1].max - this.yAxis[1].min) / 7

      this.chartSettings.legendName = {
        [qualityAdjPower]: qualityAdjPower,
        [qualityAdjPowerDelta]: qualityAdjPowerDelta
      }
      this.mobileChartSettings.legendName = {
        [qualityAdjPower]: qualityAdjPower,
        [qualityAdjPowerDelta]: qualityAdjPowerDelta
      }
      const columns = [
        'time',
        qualityAdjPower,
        qualityAdjPowerDelta
      ]
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
