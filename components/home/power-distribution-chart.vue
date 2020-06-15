<template>
  <ve-pie :data="chartData" :settings="chartSettings" :loading="loading" :dataEmpty="dataEmpty" :extend="chartExtend"></ve-pie>
</template>

<script>

import moment from 'moment'
import 'v-charts/lib/style.css'

export default {
  data() {
    this.chartSettings = {
    }
    this.chartExtend = {
      tooltip: {
        trigger: 'item',
        formatter: function(params)
        {
          return params.marker + params.name + ": " + params.value.toFixed(2) + "TiB" + " (" + params.percent + "%)"
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
      this.getPieChartData()
  },
  methods: {
    getPieChartData() {
      this.loading = true
      this.$axios.get("/miner/top-miners/power" ).then(res => {
        this.convertData(res.data)
      });
    },
    convertData(data) {
        if (data == null) {
            this.dataEmpty = true
            this.loading = false
            return
        }
        var columns = ['miner','power']
        var rows = []
        let others = this.getPower(data.otherQualityAdjPower)
        for (let miner of data.miners) {
            var row = {}
            row['miner'] = miner.address
            row['power'] = this.getPower(miner.qualityAdjPower)
            rows.push(row)
        }
        rows.push({'miner':'others','power':others})
        this.chartData.columns = columns
        this.chartData.rows = rows
        this.loading = false
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