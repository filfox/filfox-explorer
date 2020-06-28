<template>
  <div class="flex flex-grow flex-col mb-4 bg-white rounded-md">
    <div class="flex flex-col border-b border-background">
      <homeTitle type="minerRanks" />
      <div class="justify-between flex flex-row">
        <div class="flex h-12 ml-4 items-center">
          <el-row>
            <el-button size="mini" round class="focus:outline-none outline-none" v-on:click="didRankTypeSwitched(0)" :autofocus='true'> {{ $t('home.minerRanks.filters.qualityAdjPower') }} </el-button>
            <el-button size="mini" round class="focus:outline-none outline-none" v-on:click="didRankTypeSwitched(1)">{{ $t('home.minerRanks.filters.blocks') }}</el-button>
            <el-button size="mini" round class="focus:outline-none outline-none" v-on:click="didRankTypeSwitched(2)">{{ $t('home.minerRanks.filters.powerDelta') }}</el-button>
          </el-row>
        </div>
        <div class="flex h-12 items-center mr-4" v-if="type != 0">
          <el-radio-group v-model="duration" size="mini" @change="didDurationSwitched" fill="#1a4fc9">
            <el-radio-button class="focus:outline-none outline-none" label="24h">{{ '24' + $t('shared.time.hour') }}</el-radio-button>
            <el-radio-button class="focus:outline-none outline-none" label="7d">{{'7' + $t('shared.time.day')}}</el-radio-button>
            <el-radio-button class="focus:outline-none outline-none" label="30d">{{'30' + $t('shared.time.day')}}</el-radio-button>
            <el-radio-button class="focus:outline-none outline-none" label="1y">{{'1' + $t('shared.time.year')}}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="flex h-2"></div>
    </div>

    <div class="flex mt-3">
      <table class="w-full table-auto mx-4" v-loading="loading">
        <thead class="text-gray-600 text-sm m-2">
          <tr v-if="type === 0">
            <th v-for="(title, index) in rankTableHeadersByPowers" :key="index">{{title}}</th>
          </tr>
          <tr v-if="type === 1">
            <th v-for="(title, index) in rankTableHeadersByBlocks" :key="index">{{title}}</th>
          </tr>
          <tr v-if="type === 2">
            <th v-for="(title, index) in rankTableHeadersByPowerDelta" :key="index">{{title}}</th>
          </tr>
        </thead>
        <tbody class="text-sm text-center" v-if="type===0">
          <tr v-for="(miner, index) in topMinersByPower.miners" :key="index" class="border-b border-background h-10">
            <td>
              <rankIndex :index="index+1"/>
            </td>
            <td>
              <AddressLink :id="miner.address" :format="10"/>
            </td>
            <td>
              {{ miner.tag ? miner.tag[$i18n.locale] : '--'}}
            </td>
            <td>
              <div class="flex flex-row items-center">
                <el-progress :percentage="miner.qualityAdjPower/topMinersByPower.miners[0].qualityAdjPower * 100" :show-text="false" class="flex w-1/2 mx-2"></el-progress>
                <div class="flex">
                 {{ miner.qualityAdjPower | size_metric(2) }}
                </div>
              </div>
            </td>
            <td>{{ (miner.qualityAdjPower/topMinersByPower.totalQualityAdjPower * 100).toFixed(2) + '%' }}</td>
            <td>{{ miner.blocksMined }}</td>
            <td>{{ miner.qualityAdjPowerDelta | size_metric(2)}}</td>
          </tr>
        </tbody>
        <tbody class="text-sm text-center" v-if="type===1">
          <tr v-for="(miner, index) in topMinersByBlocks.miners" :key="index" class="border-b border-background h-10">
            <td>
              <rankIndex :index="index+1"/>
            </td>
            <td>
              <AddressLink :id="miner.address" :format="10"/>
            </td>
            <td>
              {{ miner.tag ? miner.tag[$i18n.locale] : '--'}}
            </td>
            <td>{{ miner.blocksMined }}</td>
            <td>{{ (miner.blocksMined/topMinersByBlocks.tipsetCount * 100).toFixed(2) + '%'}}</td>
            <td>{{ miner.totalRewards | filecoin(2) }}</td>
            <td>{{ miner.luckyValue.toFixed(2) }}</td>
          </tr>
        </tbody>
        <tbody class="text-sm text-center" v-if="type===2">
          <tr v-for="(miner, index) in topMinersByPowerDelta.miners" :key="index" class="border-b border-background h-10">
            <td>
              <rankIndex :index="index+1"/>
            </td>
            <td>
              <AddressLink :id="miner.address" :format="10"/>
            </td>
            <td>
              {{ miner.tag ? miner.tag[$i18n.locale] : '--'}}
            </td>
            <td>{{ (miner.qualityAdjPowerDelta / convertedDurationByDay()) | size_metric(2)}} / {{ $t('shared.time.day') }} </td>
            <td> {{ miner.equivalentMiners.toFixed(2) }} </td>
            <td>{{ miner.qualityAdjPowerDelta | size_metric(2) }}</td>
            <td>{{ miner.qualityAdjPower | size_metric(2)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-grow items-center text-center h-16">
        <el-button class="flex m-auto focus:outline-none outline-none" size="mini" round v-on:click="didMoreBtnClicked"> {{ $t('home.minerRanks.moreBtn') }} </el-button> 
    </div>

  </div>
</template>

<style>
  svg {
    display: inline-block
  }
</style>

<script>
import homeTitle from "~/components/home/home-title";
import rankIndex from "~/components/home/rank-index"
import rankLocation from "~/components/home/rank-location"

export default {
  components: {
    homeTitle,
    rankIndex,
    rankLocation
  },
  data() {
    return {
      topMinersByPower: {},
      topMinersByBlocks: {},
      topMinersByPowerDelta: {},
      duration: "24h",
      type: 0,
      rankTableHeadersByPowers: this.$t("home.minerRanks.tableHeadersByPower"),
      rankTableHeadersByBlocks: this.$t("home.minerRanks.tableHeadersByBlock"),
      rankTableHeadersByPowerDelta: this.$t(
        "home.minerRanks.tableHeadersByPowerDelta"
      ),
      loading: false
    };
  },
  mounted() {
    this.getTopMinersByPowers();
  },
  methods: {
    getTopMinersByPowers() {
        this.loading = true
        this.$axios
        .get("/miner/top-miners/power", { params: { count: 10 } })
        .then(res => {
          this.topMinersByPower = res.data;
          this.loading = false
        });
    },
    getTopMinersByBlocks() {
        this.loading = true
        this.$axios
        .get("/miner/top-miners/blocks", { params: { count: 10, duration:this.duration } })
        .then(res => {
          this.topMinersByBlocks = res.data;
          this.loading = false
        });
    },
    getTopMinersByPowerDelta() {
        this.loading = true
        this.$axios
        .get("/miner/top-miners/power-delta", { params: { count: 10, duration:this.duration } })
        .then(res => {
          this.topMinersByPowerDelta = res.data;
          this.loading = false
        });
    },
    didRankTypeSwitched(type) {
        this.type = type
        switch(type) {
            case 0:
            this.getTopMinersByPowers()
            break;
            case 1:
            this.getTopMinersByBlocks()
            break;
            case 2:
            this.getTopMinersByPowerDelta()
            break;
            default:
            break;
        }
    },
    didDurationSwitched() {
        if (this.type === 1) {
            this.getTopMinersByBlocks()
        }
        else if (this.type === 2) {
            this.getTopMinersByPowerDelta()
        }
    },
    didMoreBtnClicked() {
       this.$router.push(this.localePath('/ranks'))
    },
    convertedDurationByDay() {
      if (this.duration === '24h') {
        return 1
      }
      else if (this.duration === '7d') {
        return 7
      }
      else if (this.duration === '30d') {
        return 30
      }
      else {
        return 365
      }
    }
  }
};
</script>>