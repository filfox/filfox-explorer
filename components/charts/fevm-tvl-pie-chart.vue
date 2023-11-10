<template>
  <client-only>
    <VePie
      :data="chartData"
      :settings="chartSettings"
      :extend="chartExtend"
      :data-empty="dataEmpty"
      :loading="loading"
    />
  </client-only>
</template>

<script>
import 'echarts/lib/component/title'
import { formatNum } from '@/utils/dapp'

export default {
  components: {
    VePie: () => import('v-charts/lib/pie').then(x => x.default)
  },

  data() {
    return {
      loading: false,
      dataEmpty: false,

      chartSettings: {
        legendLimit: 20
      },

      chartData: {
        columns: ['name', 'value'],
        rows: []
      },

      chartExtend: {
        title: {
          show: true,
          text: this.$t('home.fevmNavigation.tvlProportion'),
          left: '4%',
          top: '5%',
          textStyle: {
            fontSize: 14,
            fontWeight: 400
          }
        },
        legend: {
          orient: 'vertical',
          left: '4%',
          top: 'middle',
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 10
        },
        series: {
          center: ['65%', '50%']
        },
        tooltip: {
          formatter: p => `${p.marker}${p.name}: $${formatNum(p.value)} (${p.percent}%)`
        }
      }
    }
  },

  mounted() {
    this.getChartData()
  },

  methods: {
    async getChartData() {
      try {
        this.loading = true
        const data = await this.$axios.$get('/stats/defi/list', { params: { limit: 100 } })
        this.chartData.rows = data.defiList.map(({ name, tvl }) => ({ name, value: tvl.data }))
      } catch (error) {
        this.dataEmpty = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
