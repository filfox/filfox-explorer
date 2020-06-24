<template>
    <client-only>
        <ve-histogram :data="chartData" :settings="chartSettings" :loading="loading" :dataEmpty="dataEmpty" :extend="chartExtend"></ve-histogram>
    </client-only>
</template>

<script>

import moment from 'moment'
import 'v-charts/lib/style.css'

export default {
  props: {
    addressData: {
      type: Object,
      default: {}
    }
  },
  data() {
    this.chartSettings = {
        showLine: [this.$t('detail.address.miner.powerChange.charts.qualityAdjPower')]
    }
    this.chartExtend = {
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter:'{value} TiB'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: function(params)
        {
          var relVal = params[0].name
          for (var i = 0, l = params.length; i < l; i++) {
              relVal += '<br/>' + params[i].marker + params[i].seriesName + ': ' + params[i].value.toFixed(4) + ' TiB'
          }
          return relVal
        }
      }
    }
    return {
      chartData: {
        columns:['time',this.$t('detail.address.miner.powerChange.charts.qualityAdjPower'),this.$t('detail.address.miner.powerChange.charts.qualityAdjPowerDelta')],
        rows:[]
      },
      loading: false,
      dataEmpty: false
    };
  },
  watch: {
    addressData: {
      handler(newVal) {
        this.getlineChartData();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getlineChartData() {
      this.loading = true
      this.$axios.get(`/miner/${this.addressData.address}/power-stats`).then(res => {
        this.convertData(res.data)
      });
    },
    convertData(data) {
        if (data == null) {
            this.dataEmpty = true
            this.loading = false
            return
        }
        var rows = []
        for (let info of data) {
            var row = {}
            row['time'] = this.getTime(info.timestamp)
            row[this.$t('detail.address.miner.powerChange.charts.qualityAdjPower')] = this.getPower(info.qualityAdjPower)
            row[this.$t('detail.address.miner.powerChange.charts.qualityAdjPowerDelta')] = this.getPower(info.qualityAdjPowerDelta)
            rows.push(row)
        }
        this.chartData.rows = rows
        this.loading = false
    },
    getTime(time) {
      return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    getPower(number) {
       var res = number
       for (var i = 0 ; i < 4; i ++) {
          res /= (2 ** 10)
       }
       return res
    }

  }
};
</script>