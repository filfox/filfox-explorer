<template>
  <div>
    <ve-line :data="chartData" :settings="chartSettings" :loading="loading" :dataEmpty="dataEmpty" :extend="chartExtend" class="hidden lg:block"></ve-line>
    <ve-line :data="chartData" :settings="mobileChartSettings" :loading="loading" :dataEmpty="dataEmpty" :extend="mobileChartExtend" :grid="{top:75,bottom:20}" class="lg:hidden" width="100%" height="380px"></ve-line>
  </div>
</template>
<script>
import moment from "moment";
import "v-charts/lib/style.css";

export default {
  props: {
    maxCount: {
      type: Number,
      default: 5
    }
  },
  data() {
    this.chartSettings = {
      legendName:{}
    };
    this.mobileChartSettings = {
      offsetY: 0,
      legendName:{}
    };
    this.chartExtend = {
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} TiB"
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
              " TiB";
          }
          return relVal;
        },
      }
    };
    this.mobileChartExtend = {
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} TiB"
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
              " TiB";
          }
          return relVal;
        },
        position: ['20%','50%']
      }
    };
    return {
      chartData: {
        columns: [],
        rows: []
      },
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
        .get("/stats/miner/power-delta", {
          params: { count: this.maxCount, duration: "24h" }
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
      var columns = [];
      var rows = [];
      columns.push("time");
      for (let info of data) {
        var row = { time: this.getTime(info.timestamp) };
        for (let miner of info.miners) {
          // max is 5
          var res = miner.address
          let tag = miner.tag;
          if (tag == null) {
            this.chartSettings.legendName[res] = res
            this.mobileChartSettings.legendName[res] = res
          } else {
            res = miner.address + "(" + miner.tag[this.$i18n.locale] + ")"
            this.chartSettings.legendName[res] = miner.address
            this.mobileChartSettings.legendName[res] = miner.address
          }
          if (columns.length <= this.maxCount && columns.length <= data.length) {
            columns.push(res)
          }
          row[res] = this.getPower(miner.powerDelta).toFixed(2);
        }
        rows.push(row);
      }
      this.chartData.columns = columns;
      this.chartData.rows = rows;
      this.loading = false;
    },
    getTime(time) {
      return moment(time * 1000).format("HH:mm");
    },
    getDateTime(time) {
      return moment(time * 1000).format("YYYY-MM-DD HH:mm");
    },
    getPower(number) {
      var res = number;
      for (var i = 0; i < 4; i++) {
        res /= 2 ** 10;
      }
      return res;
    }
  }
};
</script>