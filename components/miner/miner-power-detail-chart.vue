<template>
  <div>
    <client-only>
      <VeHistogram
        :data="chartData"
        :settings="chartSettings"
        :loading="loading"
        :data-empty="dataEmpty"
        :extend="chartExtend"
        class="hidden lg:block"
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
        :animation="null"
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
    addressData: { type: Object, required: true }
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
        formatter(params) {
          let relVal = params[0].name
          for (let i = 0, l = params.length; i < l; i++) {
            relVal += `<br/>${params[i].marker}${params[i].seriesName}: ${params[i].value.toFixed(4)} TiB`
          }
          return relVal
        }
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
        formatter(params) {
          let relVal = params[0].name
          for (let i = 0, l = params.length; i < l; i++) {
            relVal += `<br/>${params[i].marker}${params[i].seriesName}: ${params[i].value.toFixed(4)} TiB`
          }
          return relVal
        },
        position: ['20%', '40%']
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
  watch: {
    addressData: {
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
      const data = await this.$axios.$get(`/miner/${this.addressData.address}/power-stats`)
      if (data == null) {
        this.dataEmpty = true
        this.loading = false
        return
      }
      this.chartData.rows = data.map(info => ({
        time: this.getTime(info.timestamp),
        [this.$t('detail.address.miner.powerChange.charts.qualityAdjPower')]: this.getPower(info.qualityAdjPower),
        [this.$t('detail.address.miner.powerChange.charts.qualityAdjPowerDelta')]: this.getPower(info.qualityAdjPowerDelta)
      }))
      this.chartData.columns = [
        'time',
        this.$t('detail.address.miner.powerChange.charts.qualityAdjPower'),
        this.$t('detail.address.miner.powerChange.charts.qualityAdjPowerDelta')
      ]
      this.loading = false
    },
    getTime(time) {
      return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    getPower(number) {
      let res = number
      for (let i = 0; i < 4; i++) {
        res /= (2 ** 10)
      }
      return res
    }

  }
}
</script>
