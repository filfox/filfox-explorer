<template>
  <div>
    <VePie
      :data="chartData"
      :settings="chartSettings"
      :loading="loading"
      :data-empty="dataEmpty"
      class="hidden lg:block"
    />
    <VePie
      :data="chartData"
      :settings="mobileSettings"
      :loading="loading"
      :data-empty="dataEmpty"
      class="lg:hidden"
      width="100%"
      height="380px"
    />
  </div>
</template>

<script>
export default {
  components: {
    VePie: () => import('v-charts/lib/pie').then(x => x.default)
  },
  data() {
    this.chartSettings = {
      legendName: {},
      offsetY: 220
    }
    this.mobileSettings = {
      legendName: {},
      offsetY: window.innerWidth <= 640 ? 240 : 220,
      radius: window.innerWidth <= 640 ? 80 : 100
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
  mounted() {
    this.getPieChartData()
  },
  methods: {
    async getPieChartData() {
      this.loading = true
      const data = await this.$axios.$get('/stats/node-version')
      if (data == null) {
        this.dataEmpty = true
        this.loading = false
        return
      }
      this.chartData.rows = data.map(lotus => {
        const row = {}
        row.version = lotus.version
        row.count = lotus.count
        return row
      })
      this.chartData.columns = ['version', 'count']
      this.loading = false
    }

  }
}
</script>
