<template>
  <div class="bg-white lg:rounded-md">
    <div class="px-4 lg:px-10 py-3 font-semibold text-sm lg:text-base border-b border-background">
      {{ $t('dapp.defi.dataAnalysis') }} {{ screenWidth }}
    </div>
    <client-only>
      <VePie
        :data="chartData"
        :loading="loading"
        :extend="chartExtend"
        :legend-visible="false"
        :data-empty="dataEmpty"
        :settings="chartSettings"
      />
    </client-only>
  </div>
</template>

<script>
import { formatNum } from '@/utils/dapp'

export default {
  components: {
    VePie: () => import('v-charts/lib/pie').then(x => x.default)
  },

  data() {
    return {
      loading: false,
      dataEmpty: false,
      chartData: {
        columns: ['name', 'value'],
        rows: []
      },
      chartSettings: {
        label: {
          formatter: '{b} ({d}%)'
        }
      },
      chartExtend: {
        tooltip: {
          formatter: p => `${p.marker}${p.name}: $${formatNum(p.value)} (${p.percent}%)`
        },
        series: {
          radius: ['35%', '65%'],
          itemStyle: {
            borderColor: 'white',
            borderWidth: 2
          }
        }
      }
    }
  },

  mounted() {
    this.getChartData()
    this.setPieRadius()
    window.addEventListener('resize', this.setPieRadius)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.setPieRadius)
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
    },

    setPieRadius() {
      const screenWidth = window.innerWidth
      this.chartExtend.series.radius = screenWidth > 500 ? ['35%', '65%'] : ['25%', '40%']
    }
  }
}
</script>
