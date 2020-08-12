<template>
  <div class="lg:rounded-md bg-white">
    <div class="flex justify-between items-center h-12 border-b border-background">
      <div class="items-center pl-4 lg:pl-6 text-xs lg:text-base">
        {{ $t('chart.gas.baseFeeChart.title') }}
      </div>
      <DurationSelect v-model="duration" class="items-center mr-4 hidden lg:flex" />
      <DurationSelect v-model="duration" portable class="lg:hidden mr-4" />
    </div>
    <client-only>
      <VeLine
        :data="chartData"
        :settings="chartSettings"
        :loading="loading"
        :data-empty="dataEmpty"
        :extend="chartExtend"
        :legend-visible="false"
        class="hidden lg:block mx-4"
      />
      <VeLine
        :data="chartData"
        :settings="chartSettings"
        :loading="loading"
        :data-empty="dataEmpty"
        :extend="chartExtend"
        :legend-visible="false"
        :grid="{top: 20, bottom: 20}"
        height="280px"
        class="lg:hidden mx-4"
      />
    </client-only>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  components: {
    VeLine: () => import('v-charts/lib/line.common').then(x => x.default)
  },
  data() {
    this.chartSettings = {
      offsetY: 0,
      legendName: {},
      labelMap: {
        baseFee: 'Base Fee'
      }
    }
    this.chartExtend = {
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} nanoFIL'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: params => [
          this.getDateTime(this.rawData[params[0].dataIndex].timestamp),
          ...params.map(param => `${param.marker}${param.seriesName}: ${param.value[1]} nanoFIL`)
        ].join('<br>')
      }
    }
    return {
      chartData: {
        columns: ['time', 'baseFee'],
        rows: []
      },
      duration: '24h',
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
      this.chartData.rows = this.rawData.map(info => ({
        time: this.getTime(info.timestamp),
        baseFee: info.baseFee / 1e9
      }))
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
