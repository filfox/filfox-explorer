<template>
  <div>
    <client-only>
      <VeLine
        :data="chartData"
        :loading="loading"
        :data-empty="dataEmpty"
        :extend="chartExtend"
        class="hidden lg:block"
      />
      <VeLine
        :data="chartData"
        :loading="loading"
        :data-empty="dataEmpty"
        :extend="mobileChartExtend"
        class="lg:hidden"
        width="100%"
        height="280px"
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
  props: {
    addressData: { type: Object, required: true }
  },
  data() {
    this.chartExtend = {
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} FIL'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter(params) {
          let relVal = params[0].name
          for (let i = 0, l = params.length; i < l; i++) {
            relVal += `<br/>${params[i].marker}${params[i].seriesName}: ${params[i].value[1]} FIL`
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
          formatter: '{value} FIL'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter(params) {
          let relVal = params[0].name
          for (let i = 0, l = params.length; i < l; i++) {
            relVal += `<br/>${params[i].marker}${params[i].seriesName}: ${params[i].value[1]} FIL`
          }
          return relVal
        },
        position: ['20%', '40%']
      }
    }
    return {
      chartData: {
        columns: ['time', this.$t('detail.address.miner.accountChange.charts.balance'), this.$t('detail.address.miner.accountChange.charts.availableBalance'), this.$t('detail.address.miner.accountChange.charts.pledgeBalance')],
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
    getlineChartData() {
      this.loading = true
      this.$axios.get(`/address/${this.addressData.address}/balance-stats`).then(res => {
        this.convertData(res.data)
      })
    },
    convertData(data) {
      if (data == null) {
        this.dataEmpty = true
        this.loading = false
        return
      }
      const rows = []
      for (const info of data) {
        const row = {}
        row.time = this.getTime(info.timestamp)
        row[this.$t('detail.address.miner.accountChange.charts.balance')] = this.getFilecoin(info.balance, 2)
        row[this.$t('detail.address.miner.accountChange.charts.availableBalance')] = this.getFilecoin(info.availableBalance, 2)
        row[this.$t('detail.address.miner.accountChange.charts.pledgeBalance')] = this.getFilecoin(info.pledgeBalance, 2)
        rows.push(row)
      }
      this.chartData.rows = rows
      this.loading = false
    },
    getTime(time) {
      return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
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
