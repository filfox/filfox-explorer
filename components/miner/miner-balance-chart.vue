<template>
  <client-only>
    <ve-ring
      :data="chartData"
      :settings="chartSettings"
      :dataEmpty="dataEmpty"
      :extend="chartExtend"
      :legend-visible="false"
      height="200px"
      width="100%"
    ></ve-ring>
  </client-only>
</template>

<script>
import "v-charts/lib/style.css";

export default {
  props: {
    addressData: {
      type: Object,
      default: {}
    }
  },
  data() {
    this.chartSettings = {
      offsetY: 100,
      radius: [25, 50],
      label: {
        show: false
      }
    };
    this.chartExtend = {
        tooltip: {
          trigger: 'item',
          formatter: function(params)
          {
            return params.marker + params.name + ": " + params.value + " FIL" + " (" + params.percent + "%)"
          }
        }
    };
    return {
      chartData: {
        columns: ["type", "value"],
        rows: [
        {
          type: this.$t("detail.address.miner.minerOverview.headers.availableBalance"),
          value: 0
        },
        {
          type: this.$t("detail.address.miner.minerOverview.headers.pledgeBalance"),
          value: 0
        }
        ]
      },
      dataEmpty: false
    };
  },
  watch: {
    addressData: {
      handler(newVal) {
        this.updateChartData();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    updateChartData() {
      var ab = this.addressData.miner.availableBalance;
      var pb = this.addressData.miner.pledgeBalance;
      ab = this.convertFilecoin(ab,4)
      pb = this.convertFilecoin(pb,4)
      this.chartData.rows = [
        {
          type: this.$t(
            "detail.address.miner.minerOverview.headers.availableBalance"
          ),
          value: ab
        },
        {
          type: this.$t(
            "detail.address.miner.minerOverview.headers.pledgeBalance"
          ),
          value: pb
        }
      ];
    },
    convertFilecoin(value, precision) {
      if (precision == null) {
        const s = value.toString().padStart(19, "0");
        return `${s.slice(0, -18)}.${s.slice(-18)}`.replace(/\.?0*$/g, "")
      } else {
        return (value / 1e18).toFixed(precision)
      }
    }
  }
};
</script>