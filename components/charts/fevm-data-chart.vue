<template>
  <div class="min-h-64">
    <div v-if="small" class="pl-6 pr-4 h-6 lg:h-8.5 flex justify-between items-center">
      <el-dropdown @command="index => chartMetric = index">
        <span class="flex items-center text-xs">
          {{ $t(`home.fevmChart.${chartMetric}`) }}
          <img src="@/assets/img/shared/filter.svg" alt="filter" class="w-4 ml-1">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="index in metrics" :key="index" class="text-xs" :command="index">
            {{ $t(`home.fevmChart.${index}`) }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown @command="i => durationIndex = i">
        <span class="flex items-center text-xs">
          {{ $t(`home.fevmChart.durations.${durationIndex}`) }}
          <i class="el-icon-arrow-down text-customGray-650 ml-1"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(d, i) in $t(`home.fevmChart.durations`)" :key="d" class="text-xs" :command="i">
            {{ d }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <template v-else>
      <div class="lg:hidden pt-3 pb-2 px-4 flex justify-between items-center">
        <el-dropdown trigger="click" @command="index => chartMetric = index">
          <span class="flex items-center text-xs">
            {{ $t(`home.fevmChart.${chartMetric}`) }}
            <img src="@/assets/img/shared/filter.svg" alt="filter" class="w-4 ml-1">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="index in metrics" :key="index" class="text-xs" :command="index">
              {{ $t(`home.fevmChart.${index}`) }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click" @command="i => durationIndex = i">
          <span class="flex items-center text-xs">
            {{ $t(`home.fevmChart.durations.${durationIndex}`) }}
            <i class="el-icon-arrow-down text-customGray-650 ml-1"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(d, i) in $t(`home.fevmChart.durations`)" :key="d" class="text-xs" :command="i">
              {{ d }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="p-4 items-center hidden lg:flex">
        <button
          v-for="m in metrics"
          :key="m"
          :class="{ 'active': chartMetric == m }"
          class="chart-metric-btn"
          @click.self="chartMetric = m"
        >
          {{ $t(`home.fevmChart.${m}`) }}
        </button>
        <el-select
          v-model="durationIndex"
          size="mini"
          class="ml-auto auto-width"
        >
          <template slot="prefix">
            {{ $t(`home.fevmChart.durations.${durationIndex}`) }}
          </template>
          <el-option
            v-for="(d, index) in $t('home.fevmChart.durations')"
            :key="d"
            class="text-xs"
            :label="d"
            :value="index"
          />
        </el-select>
      </div>
    </template>


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
      />
    </client-only>
  </div>
</template>
<script>

import moment from 'moment'
import { parseFIL, addAmountDelimiters } from '~/plugins/filters'
import('v-charts/lib/line')

export default {
  components: {
    VeLine: () => import('v-charts/lib/histogram').then(x => x.default)
  },

  props: {
    maxCount: {
      type: Number,
      default: 5
    },
    small: {
      type: Boolean,
      default: false
    },
    barMaxWidth: {
      type: Number,
      default: 8
    }
  },

  data() {
    const metrics = ['createContractCount', 'invokeCount', 'gasFee']
    return {
      chartData: { columns: [], rows: [] },
      loading: false,
      dataEmpty: false,
      rawData: [],

      metrics,
      chartMetric: metrics[0],
      durationIndex: 1
    }
  },

  computed: {
    params() {
      return {
        ...this.getDateRange([7, 30, 180][this.durationIndex]),
        metric: this.chartMetric
      }
    },

    chartAccumulateMetric() {
      return `accumulate${this.chartMetric.replace(/^\w/, match => match.toUpperCase())}`
    },

    chartSettings() {
      return {
        legendName: {},
        axisSite: {
          left: [this.$t(`home.fevmChart.${this.chartAccumulateMetric}`)],
          right: [this.$t(`home.fevmChart.${this.chartMetric}`)]
        },
        showLine: [this.$t(`home.fevmChart.${this.chartAccumulateMetric}`)],
        itemStyle: {
          barBorderRadius: [50, 50, 0, 0]
        }
      }
    },

    chartExtend() {
      return {
        series: {
          barMaxWidth: this.barMaxWidth
        },
        tooltip: {
          trigger: 'axis',
          formatter: params => [
            this.getDateTime(this.rawData[params[0].dataIndex].date),
            ...params.map(param => `${param.marker}${param.seriesName}: ${addAmountDelimiters(param.value)}${this.chartMetric == 'gasFee' ? ' FIL' : ''}`)
          ].join('<br>')
        }
      }
    },

    yAxis() {
      return [
        {
          type: 'value',
          position: 'left',
          axisLabel: { formatter: this.chartAxisLabelFormatter },
          interval: 0,
          min: 0,
          max: 0,
          axisTick: { show: false },
          alignTicks: true,
          nameGap: 15
        },
        {
          type: 'value',
          position: 'right',
          axisLabel: { formatter: this.chartAxisLabelFormatter },
          min: 0,
          interval: 0,
          max: 0,
          axisTick: { show: false },
          alignTicks: true,
          nameGap: 15
        }
      ]
    }
  },

  watch: {
    params: {
      immediate: true,
      handler() {
        this.updateChart()
      }
    }
  },

  methods: {
    chartAxisLabelFormatter(value) {
      const unit = this.chartMetric == 'gasFee' ? 'FIL' : ''
      return `${addAmountDelimiters(Number(value).toFixed(0))} ${unit}`
    },

    getDateRange(days) {
      const endDate = moment()
      const startDate = moment().subtract(days - 1, 'days')
      return {
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD')
      }
    },

    async updateChart() {
      this.loading = true
      const points = await this.$axios.$get('/stats/fevm/daily-statistics', { params: this.params })
      const data = points.map(p => ({ ...p, gasFee: parseFIL(p.gasFee), accumulateGasFee: parseFIL(p.accumulateGasFee) }))

      if (!data) {
        this.dataEmpty = true
        this.loading = false
        return
      }

      this.rawData = data
      const rows = []
      const _metric = this.$t(`home.fevmChart.${this.chartMetric}`)
      const _accumulateMetric = this.$t(`home.fevmChart.${this.chartAccumulateMetric}`)

      data.forEach(item => {
        rows.push({
          time: this.getTime(item.date),
          [_accumulateMetric]: item[this.chartAccumulateMetric] || 0,
          [_metric]: item[this.chartMetric] || 0
        })
      })

      // 解决双坐标轴线不对齐
      this.yAxis[0].max = (Math.ceil(Math.max(...rows.map(item => item[_accumulateMetric]))) / 10) * 10
      this.yAxis[0].interval = this.yAxis[0].max / 7
      this.yAxis[1].min = Math.floor(Math.floor(Math.min(...rows.map(item => item[_metric]))) / 10) * 10
      this.yAxis[1].min = this.yAxis[1].min < 0 ? this.yAxis[1].min : 0
      this.yAxis[1].max = Math.ceil(Math.ceil(Math.max(...rows.map(item => item[_metric]))) / 10) * 10
      this.yAxis[1].max = this.yAxis[1].max > 0 ? this.yAxis[1].max : 0
      this.yAxis[1].interval = (this.yAxis[1].max - this.yAxis[1].min) / 7

      this.chartSettings.legendName = {
        [_accumulateMetric]: _accumulateMetric,
        [_metric]: _metric
      }
      const columns = [
        'time',
        _accumulateMetric,
        _metric
      ]
      this.chartData.columns = columns
      this.chartData.rows = rows
      this.loading = false
    },

    getTime(time) {
      return moment(time).format('MM-DD')
    },

    getDateTime(time) {
      return moment(time).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="postcss" scoped>
.chart-metric-btn {
  @apply mr-3 px-3 py-1 text-xs border rounded-full text-customGray-650 border-customGray-340;
  &.active {
    @apply border-customBlue-275 text-customBlue-290 bg-customBlue-225;
  }
}
</style>
