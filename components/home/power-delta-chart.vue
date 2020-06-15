<template>
  <ve-line :data="chartData" :settings="chartSettings" :loading="loading" :dataEmpty="dataEmpty" :extend="chartExtend"></ve-line>
</template>

<script>

import moment from 'moment'
import 'v-charts/lib/style.css'

export default {
  data() {
    this.chartSettings = {
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
              relVal += '<br/>' + params[i].marker + params[i].seriesName + ': ' + params[i].value[1] + ' TiB'
          }
          return relVal
        }
      }
    }
    return {
      chartData: {
        columns:[],
        rows:[]
      },
      loading: false,
      dataEmpty: false
    };
  },
  mounted() {
      this.getlineChartData()
  },
  methods: {
    getlineChartData() {
      this.loading = true
      this.$axios.get("/stats/miner/power-delta", { params: { count: 5, duration: '24h' } } ).then(res => {
        this.convertData(res.data)
      });
    },
    convertData(data) {
        if (data == null) {
            this.dataEmpty = true
            this.loading = false
            return
        }
        var columns = []
        var rows = []
        columns.push("time")
        for (let info of data) {
            var row = { time: this.getTime(info.timestamp) } 
            for (let miner of info.miners) {
              if (columns.length < 6) {
                 columns.push(miner.address)
              }
              row[miner.address] = this.getPower(miner.powerDelta)
            }
            rows.push(row)
        }
        this.chartData.columns = columns
        this.chartData.rows = rows
        this.loading = false
    },
    getTime(time) {
      return moment(time * 1000).format('HH:mm:ss')
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