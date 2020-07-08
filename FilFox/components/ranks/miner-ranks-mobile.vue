<template>
  <div class="flex flex-grow flex-col bg-white">
    <div class="flex flex-col">
      <HomeTitle type="minerRanks" />
      <div class="justify-between flex flex-row">
        <div class="flex flex-grow h-10 ml-4 items-center relative">
          <el-tabs v-model="type" @tab-click="didRankTypeSwitched" class="w-full mr-4">
             <el-tab-pane :label="$t('home.minerRanks.filters.qualityAdjPower')" name="0" class="text-sm"> </el-tab-pane>
             <el-tab-pane :label="$t('home.minerRanks.filters.blocks')" name="1"></el-tab-pane>
             <el-tab-pane :label="$t('home.minerRanks.filters.powerDelta')" name="2"></el-tab-pane>
         </el-tabs>
         <el-dropdown @command="didDurationSwitched" trigger="click" :hide-on-click="true" class="border border-background px-2 rounded-sm mr-4 absolute right-0 bottom-0 mb-4" v-if="type != '0'">
            <span class="el-dropdown-link text-sm">
                {{ durationName }} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="24h"> {{ '24' + $t('shared.time.hour') }} </el-dropdown-item>
                <el-dropdown-item command="7d"> {{'7' + $t('shared.time.day')}} </el-dropdown-item>
                <el-dropdown-item command="30d"> {{'30' + $t('shared.time.day')}} </el-dropdown-item>
                <el-dropdown-item command="1y"> {{'1' + $t('shared.time.year')}} </el-dropdown-item>
            </el-dropdown-menu>
         </el-dropdown>
        </div>
      </div>
    </div>
    
    <div class="bg-white h-16" v-loading="loading" v-if="loading">

    </div>

    <template v-if="type == '0' && !loading">
        <div v-for="(miner, index) in topMinersByPower.miners" :key="index" class="rounded-sm mx-3 mb-3 shadow bg-white">
            <div class="flex flex-row items-center text-xs my-2 ml-1">
                <RankIndex :index="page * pageSize + index+1" :class="{'mb-1':page * pageSize + index < 3}"/>
                <AddressLink :id="miner.address" :format="4" class="ml-3"/>
                <div class="text-xs bg-background rounded-full px-2 text-gray-500 flex ml-1" v-if="miner.tag"> {{ miner.tag ? miner.tag[$i18n.locale] : '--'}} </div>
            </div>
            <div class="flex flex-row justify-between my-1 mx-2 text-xs">
                <p> {{ $t('home.minerRanks.tableHeadersByPower.validPower')}}: {{ miner.qualityAdjPower | size_metric(2) }} </p>
                <p> {{ $t('home.minerRanks.tableHeadersByPower.validPowerRate')}}: {{ (miner.qualityAdjPower/topMinersByPower.totalQualityAdjPower * 100).toFixed(2) + '%' }} </p>
            </div>
            <div class="flex flex-row justify-between my-1 mx-2 text-xs">
                <p> {{ $t('home.minerRanks.tableHeadersByPower.reward')}}: {{ miner.totalRewards | filecoin(2) }} </p>
                <p> {{ $t('home.minerRanks.tableHeadersByPower.powerIncrease')}}: {{ miner.qualityAdjPowerDelta | size_metric(2)}} </p>
            </div>
            <div class="flex flex-row justify-between my-1 mx-2 text-xs">
                <p> {{ $t('home.minerRanks.tableHeadersByPower.miningEfficiency')}}: {{ miner.rewardPerByte * 2 ** 40 * 3456 | filecoinOnAvg(2)}} </p>
            </div>
        </div>
    </template>

    <template v-if="type == '1' && !loading">
        <div v-for="(miner, index) in topMinersByBlocks.miners" :key="index" class="rounded-sm mx-3 mb-3 shadow bg-white">
            <div class="flex flex-row items-center text-xs my-2 ml-1">
                <RankIndex :index="page * pageSize + index+1" :class="{'mb-1':page * pageSize + index < 3}"/>
                <AddressLink :id="miner.address" :format="4" class="ml-3"/>
                <div class="text-xs bg-background rounded-full px-2 text-gray-500 flex ml-1" v-if="miner.tag"> {{ miner.tag ? miner.tag[$i18n.locale] : '--'}} </div>
            </div>
            <div class="flex flex-row justify-between my-1 mx-2 text-xs">
                <p> {{ $t('home.minerRanks.tableHeadersByBlock.blockNums')}}: {{ miner.weightedBlocksMined }} </p>
                <p> {{ $t('home.minerRanks.tableHeadersByBlock.luckyValue')}}: {{ miner.luckyValue.toFixed(2) }} </p>
            </div>
            <div class="flex flex-row justify-between my-1 mx-2 text-xs">
                <p> {{ $t('home.minerRanks.tableHeadersByBlock.totalRewards')}}: {{ miner.totalRewards | filecoin(2) }} </p>
                <p> {{ $t('home.minerRanks.tableHeadersByBlock.rewardsRatio')}}: {{ (miner.totalRewards/topMinersByBlocks.totalRewards * 100) .toFixed(2) }}% </p>
            </div>
        </div>
    </template>

    <template v-if="type == '2' && !loading">
        <div v-for="(miner, index) in topMinersByPowerDelta.miners" :key="index" class="rounded-sm mx-3 mb-3 shadow bg-white">
            <div class="flex flex-row items-center text-xs my-2 ml-1">
                <RankIndex :index="page * pageSize + index+1" :class="{'mb-1':page * pageSize + index < 3}"/>
                <AddressLink :id="miner.address" :format="4" class="ml-3"/>
                <div class="text-xs bg-background rounded-full px-2 text-gray-500 flex ml-1" v-if="miner.tag"> {{ miner.tag ? miner.tag[$i18n.locale] : '--'}} </div>
            </div>
            <div class="flex flex-row justify-between my-1 mx-2 text-xs">
                <p> {{ $t('home.minerRanks.tableHeadersByPowerDelta.powerIncreaseSpeed')}}: {{ (miner.qualityAdjPowerDelta / convertedDurationByDay()) | size_metric(2)}} / {{ $t('shared.time.day') }} </p>
                <p> {{ $t('home.minerRanks.tableHeadersByPowerDelta.equivalentMiners')}}: {{ miner.equivalentMiners.toFixed(2) }} </p>
            </div>
            <div class="flex flex-row justify-between my-1 mx-2 text-xs">
                <p> {{ $t('home.minerRanks.tableHeadersByPowerDelta.powerDelta')}}: {{ miner.qualityAdjPowerDelta | size_metric(2) }} </p>
                <p> {{ $t('home.minerRanks.tableHeadersByPowerDelta.validPower')}}: {{ miner.qualityAdjPower | size_metric(2)}} </p>
            </div>
        </div>
    </template>

    <div class="flex flex-grow items-center text-center h-16">
        <el-pagination
          layout="prev, pager, next"
          :page-count="totalPageCount"
          :pager-count="5"
          @current-change="didCurrentPageChanged"
          :current-page="page + 1"
          class="mx-auto"
        ></el-pagination>
    </div>

  </div>
</template>

<style>
svg {
  display: inline-block;
}
</style>

<script>
import homeTitle from "~/components/home/home-title";
import rankIndex from "~/components/home/rank-index";
import rankLocation from "~/components/home/rank-location";

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
      durationName: '24' + this.$t('shared.time.hour'),
      type: '0',
      rankTableHeadersByPowers: this.$t("home.minerRanks.tableHeadersByPower"),
      rankTableHeadersByBlocks: this.$t("home.minerRanks.tableHeadersByBlock"),
      rankTableHeadersByPowerDelta: this.$t(
        "home.minerRanks.tableHeadersByPowerDelta"
      ),
      totalPageCount: 0,
      pageSize: 10,
      page: 0,
      loading: false
    };
  },
  mounted() {
    this.getTopMinersByPowers();
  },
  methods: {
    getTopMinersByPowers() {
      this.loading = true;
      this.$axios
        .get("/miner/list/power", {
          params: { pageSize: this.pageSize, page: this.page }
        })
        .then(res => {
          this.topMinersByPower = res.data;
          this.getTotalPageCount();
          this.loading = false;
        });
    },
    getTopMinersByBlocks() {
      this.loading = true;
      this.$axios
        .get("/miner/list/blocks", {
          params: {
            pageSize: this.pageSize,
            page: this.page,
            duration: this.duration
          }
        })
        .then(res => {
          this.topMinersByBlocks = res.data;
          this.getTotalPageCount();
          this.loading = false;
        });
    },
    getTopMinersByPowerDelta() {
      this.loading = true;
      this.$axios
        .get("/miner/list/power-delta", {
          params: {
            pageSize: this.pageSize,
            page: this.page,
            duration: this.duration
          }
        })
        .then(res => {
          this.topMinersByPowerDelta = res.data;
          this.getTotalPageCount();
          this.loading = false;
        });
    },
    didRankTypeSwitched() {
      this.page = 0;
      this.totalPageCount = 1;
      switch (this.type) {
        case '0':
          this.getTopMinersByPowers();
          break;
        case '1':
          this.getTopMinersByBlocks();
          break;
        case '2':
          this.getTopMinersByPowerDelta();
          break;
        default:
          break;
      }
      this.getTotalPageCount();
    },
    didDurationSwitched(command) {
        this.duration = command
        switch(command) {
            case '24h':
            this.durationName =  '24' + this.$t('shared.time.hour')
            break;
            case '7d':
            this.durationName =  '7' + this.$t('shared.time.day')   
            break;
            case '30d':
            this.durationName =  '30' + this.$t('shared.time.day')
            break;
            case '1y':
            this.durationName =  '1' + this.$t('shared.time.year')
            break;
            default:
            break;
        }
        this.page = 0;
        this.totalPageCount = 1;
        if (this.type === '1') {
            this.getTopMinersByBlocks()
        }
        else if (this.type === '2') {
            this.getTopMinersByPowerDelta()
        }
    },
    didMoreBtnClicked() {
      this.$router.push(this.localePath("/ranks"));
    },
    convertedDurationByDay() {
      if (this.duration === "24h") {
        return 1;
      } else if (this.duration === "7d") {
        return 7;
      } else if (this.duration === "30d") {
        return 30;
      } else {
        return 365;
      }
    },
    getTotalPageCount() {
      if (this.type === '0') {
        this.totalPageCount =
          this.topMinersByPower == null
            ? 0
            : Math.ceil(this.topMinersByPower.totalCount / this.pageSize);
      } else if (this.type == '1') {
        this.totalPageCount =
          this.topMinersByBlocks.miners == null
            ? 0
            : Math.ceil(this.topMinersByBlocks.totalCount / this.pageSize);
      } else {
        this.totalPageCount =
          this.topMinersByPowerDelta.miners == null
            ? 0
            : Math.ceil(this.topMinersByPowerDelta.totalCount / this.pageSize);
      }
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1;
      switch (this.type) {
        case '0':
          this.getTopMinersByPowers();
          break;
        case '1':
          this.getTopMinersByBlocks();
          break;
        case '2':
          this.getTopMinersByPowerDelta();
          break;
        default:
          break;
      }
    }
  }
};
</script>