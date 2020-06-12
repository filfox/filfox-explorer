<template>
  <div class="flex flex-grow flex-col mb-5 bg-white rounded-md">
    <div class="justify-between flex flex-row">
      <div class="flex h-12 items-center ml-5">{{$t('home.minerRanks.title')}}</div>
      <div class="flex h-12 items-end mr-5">
        <el-radio-group
          v-model="duration"
          size="mini"
          @change="onUpdateCurrentDuration"
          fill="#1a4fc9"
        >
          <el-radio-button label="24h">{{ '24' + $t('shared.time.hour') }}</el-radio-button>
          <el-radio-button label="7d">{{'7' + $t('shared.time.day')}}</el-radio-button>
          <el-radio-button label="30d">{{'30' + $t('shared.time.day')}}</el-radio-button>
          <el-radio-button label="1y">{{'1' + $t('shared.time.year')}}</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="h-8"></div>

    <table class="w-full table-auto">
      <thead class="text-gray-600 text-sm m-2">
        <tr v-if="type === 0">
          <th v-for="(title, index) in rankTableHeadersByPowers" :key="index">{{title}}</th>
        </tr>
        <tr v-if="type === 1">
          <th v-for="(title, index) in rankTableHeadersByPowers" :key="index">{{title}}</th>
        </tr>
        <tr v-if="type === 2">
          <th v-for="(title, index) in rankTableHeadersByPowers" :key="index">{{title}}</th>
        </tr>
      </thead>
      <tbody class="text-sm text-center">
        <tr
          v-for="(miner, index) in topMinersByPower.miners"
          :key="index"
          class="border-b border-background h-10"
        >
          <td>{{index}}</td>
          <td>{{ miner.address }}</td>
          <td>未知</td>
          <td>{{ miner.qualityAdjPower | size_metric(2) }}</td>
          <td>{{ (miner.qualityAdjPower/topMinersByPower.totalQualityAdjPower).toFixed(2) }}</td>
          <td>{{ miner.blocksMined }}</td>
          <td>{{ miner.qualityAdjPowerDelta | size_metric(2)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>>

<script>
export default { 
  data() {
    return {
      topMinersByPower:{},
      topMinersByBlocks: {},
      topMinersByPowerDelta: {},
      duration: "24h",
      type: 0,
      rankTableHeadersByPowers: this.$t("home.minerRanks.tableHeadersByPower"),
      rankTableHeadersByBlocks: this.$t("home.minerRanks.tableHeadersByPower"),
      rankTableHeadersByPowerDelta: this.$t("home.minerRanks.tableHeadersByPower")
    };
  },
  mounted() {
    this.getTopMinersByPowers();
  },
  methods: {
    getTopMinersByPowers() {
      this.$axios
        .get("/miner/top-miners/power", { params: { count: 10 } })
        .then(res => {
          this.topMinersByPower = res.data;
        });
    },
    onUpdateCurrentDuration() {

    }
  }
};
</script>>