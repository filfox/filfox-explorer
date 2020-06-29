<template>
  <div class="flex flex-col rounded-md bg-white mx-auto w-full">
    
    <div class="flex flex-row justify-between items-center border-b border-background">
      <div class=" h-12 flex items-center pl-6"> {{ $t('chart.miner.headers.rewardLine') }} (FIL/T) </div>
      <div class="flex h-12 items-center mt-1 mr-4">
          <el-radio-group v-model="duration" size="mini" @change="didDurationSwitched" fill="#1a4fc9">
            <el-radio-button class="focus:outline-none outline-none" label="24h">{{ '24' + $t('shared.time.hour') }}</el-radio-button>
            <el-radio-button class="focus:outline-none outline-none" label="7d">{{'7' + $t('shared.time.day')}}</el-radio-button>
            <el-radio-button class="focus:outline-none outline-none" label="30d">{{'30' + $t('shared.time.day')}}</el-radio-button>
            <el-radio-button class="focus:outline-none outline-none" label="1y">{{'1' + $t('shared.time.year')}}</el-radio-button>
          </el-radio-group>
      </div>
    </div>
    <client-only>
      <ve-line :data="chartData" :settings="chartSettings" :loading="loading" :dataEmpty="dataEmpty" :extend="chartExtend" :legendVisible="false" class="mx-4"></ve-line>
    </client-only>
  </div>
</template>

<script>
import moment from "moment";
import "v-charts/lib/style.css";

export default {
  data() {
    this.chartSettings = {
      offsetY: 0,
      legendName:{},
      labelMap: {
        'fil': this.$t('chart.miner.headers.rewardLine')
      }
    };
    this.chartExtend = {
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} FIL/TiB"
        }
      },
      tooltip: {
        trigger: "axis",
        formatter: (params) => {
          var relVal = this.getDateTime(this.rawData[params[0].dataIndex].timestamp);
          for (var i = 0, l = params.length; i < l; i++) {
            relVal +=
              "<br/>" +
              params[i].marker +
              params[i].seriesName +
              ": " +
              params[i].value[1] +
              " FIL/TiB";
          }
          return relVal;
        }
      }
    };
    return {
      chartData: {
        columns: ['time','fil'],
        rows: []
      },
      duration: '24h',
      loading: false,
      dataEmpty: false,
      rawData: []
    };
  },
  mounted() {
    this.getlineChartData();
  },
  methods: {
    getlineChartData() {
      this.loading = true;
      this.$axios
        .get("stats/miner/reward-per-byte", {
          params: { duration: this.duration }
        })
        .then(res => {
          this.rawData = res.data
          this.convertData(res.data);
        });
    },
    convertData(data) {
      if (data == null) {
        this.dataEmpty = true;
        this.loading = false;
        return;
      }
      var rows = [];
      for (let info of data) {
        var row = {}
        row['time'] = this.getTime(info.timestamp)
        row['fil'] = this.getFilecoin(info.rewardPerByte * 2 ** 40 * 3456, 4)
        rows.push(row);
      }
      this.chartData.rows = rows;
      this.loading = false;
    },
    getTime(time) {
      if (this.duration === '24h') {
        return moment(time * 1000).format("HH:mm");
      }
      else {
        return moment(time * 1000).format("MM-DD HH:mm"); 
      }
    },
    getDateTime(time) {
      return moment(time * 1000).format("YYYY-MM-DD HH:mm");
    },
    getFilecoin(value, precision) {
      if (precision == null) {
        const s = value.toString().padStart(19, "0");
        return `${s.slice(0, -18)}.${s.slice(-18)}`.replace(/\.?0*$/g, "")
      } else {
        return (value / 1e18).toFixed(precision)
      }
    },
    didDurationSwitched() {
      this.getlineChartData()
    }
  }
};
</script>