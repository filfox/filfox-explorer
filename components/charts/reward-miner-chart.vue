<template>
  <div class="lg:rounded-md bg-white">
    <div class="flex justify-between items-center h-12 border-b border-background">
      <div class="pl-4 lg:pl-6 text-xs lg:text-base">
        {{ $t('chart.miner.headers.rewardLine') }} (FIL/T)
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
import { epochsInDay } from '@/filecoin/filecoin.config'

export default {
  components: {
    VeLine: () => import('v-charts/lib/line').then(x => x.default)
  },
  data() {
    this.chartSettings = {
      offsetY: 0,
      legendName: {},
      labelMap: {
        fil: this.$t('chart.miner.headers.rewardLine')
      }
    }
    this.chartExtend = {
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} FIL/TiB'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: params => [
          this.getDateTime(this.rawData[params[0].dataIndex].timestamp),
          ...params.map(param => `${param.marker}${param.seriesName}: ${param.value[1]} FIL/TiB`)
        ].join('<br>')
      }
    }
    return {
      chartData: {
        columns: [],
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
      this.rawData = await this.$axios.$get('stats/miner/reward-per-byte', { params: { duration: this.duration } })
      if (this.rawData == null) {
        this.dataEmpty = true
        this.loading = false
        return
      }
      this.chartData.rows = this.rawData.map(info => ({
        time: this.getTime(info.timestamp),
        fil: this.getFilecoin(info.rewardPerByte * 2 ** 40 * epochsInDay, 4)
      }))
      this.chartData.columns = ['time', 'fil']
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
    },
    getFilecoin(value, precision) {
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
