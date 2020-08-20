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
        :animation="null"
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
          return [
            params[0].name,
            params.map(({ marker, seriesName, value }) => `${marker}${seriesName}: ${value[1]} FIL`)
          ].join('<br>')
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
          return [
            params[0].name,
            params.map(({ marker, seriesName, value }) => `${marker}${seriesName}: ${value[1]} FIL`)
          ].join('<br>')
        },
        position: ['20%', '40%']
      }
    }
    return {
      chartData: {
        columns: [
          'time',
          this.$t('detail.address.miner.accountChange.charts.balance'),
          this.$t('detail.address.miner.accountChange.charts.availableBalance'),
          this.$t('detail.address.miner.accountChange.charts.pledgeBalance')
        ],
        rows: []
      },
      loading: false,
      dataEmpty: false
    }
  },
  watch: {
    addressData: {
      handler(newVal) {
        this.getLineChartData()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async getLineChartData() {
      this.loading = true
      const data = await this.$axios.$get(`/address/${this.addressData.address}/balance-stats`)
      if (data == null) {
        this.dataEmpty = true
        this.loading = false
        return
      }
      this.chartData.rows = data.map(info => ({
        time: this.getTime(info.timestamp),
        [this.$t('detail.address.miner.accountChange.charts.balance')]: this.getFilecoin(info.balance, 2),
        [this.$t('detail.address.miner.accountChange.charts.availableBalance')]: this.getFilecoin(info.availableBalance, 2),
        [this.$t('detail.address.miner.accountChange.charts.pledgeBalance')]: this.getFilecoin(info.pledgeBalance, 2)
      }))
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
