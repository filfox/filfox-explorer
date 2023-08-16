<template>
  <div class="px-4 pt-4 w-full">
    <client-only>
      <VeHistogram
        :data="chartData"
        :settings="chartSettings"
        :data-empty="dataEmpty"
        :extend="chartExtend"
        class="hidden lg:block"
        width="100%"
        height="320px"
        :grid="{top: 50, bottom: 20}"
      />
      <VeHistogram
        :data="chartData"
        :settings="chartSettings"
        :loading="loading"
        :data-empty="dataEmpty"
        :extend="mobileChartExtend"
        class="lg:hidden"
        width="100%"
        height="250px"
      />
    </client-only>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  components: {
    VeHistogram: () => import('v-charts/lib/histogram').then(x => x.default)
  },
  props: {
    merchant: { type: String, required: true }
  },
  data() {
    this.chartSettings = {
      showLine: [this.$t('detail.address.miner.powerChange.charts.qualityAdjPower')]
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
          params[0].name,
          ...params.map(param => `${param.marker}${param.seriesName}: ${param.value.toFixed(4)} TiB`)
        ].join('<br>')
      }
    }
    this.mobileChartExtend = {
      grid: {
        bottom: 25
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} TiB'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: params => [
          params[0].name,
          ...params.map(param => `${param.marker}${param.seriesName}: ${param.value.toFixed(4)} TiB`)
        ].join('<br>'),
        position: ['20%', '40%']
      }
    }
    return {
      chartData: {
        columns: [
          'time',
          this.$t('detail.address.miner.powerChange.charts.qualityAdjPower'),
          this.$t('detail.address.miner.powerChange.charts.qualityAdjPowerDelta')
        ],
        rows: []
      },
      loading: false,
      dataEmpty: false
    }
  },
  watch: {
    merchant: {
      handler(newVal) {
        this.getlineChartData()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async getlineChartData() {
      this.loading = true
      const data = await this.$axios.$get(`/merchant/${this.merchant}/power-stats`, { params: { duration: '30d' } })
      if (data == null) {
        this.dataEmpty = true
        this.loading = false
        return
      }
      this.chartData.rows = data.map(info => ({
        time: this.getTime(info.timestamp),
        [this.$t('detail.address.miner.powerChange.charts.qualityAdjPower')]: info.qualityAdjPower / 2 ** 40,
        [this.$t('detail.address.miner.powerChange.charts.qualityAdjPowerDelta')]: info.qualityAdjPowerDelta / 2 ** 40
      }))
      this.loading = false
    },
    getTime(time) {
      return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
