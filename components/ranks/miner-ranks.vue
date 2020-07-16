<template>
  <div class="container mx-auto">
    <div class="flex flex-grow flex-col my-4 bg-white rounded-md">
      <div class="flex flex-col border-b border-background">
        <homeTitle type="minerRanks" />
        <div class="justify-between flex flex-row">
          <div class="flex h-12 ml-4 items-center">
            <el-row>
              <el-button
                size="mini"
                round
                class="focus:outline-none outline-none"
                v-on:click="didRankTypeSwitched(0)"
                :autofocus="true"
              >{{ $t('home.minerRanks.filters.qualityAdjPower') }}</el-button>
              <el-button
                size="mini"
                round
                class="focus:outline-none outline-none"
                v-on:click="didRankTypeSwitched(1)"
              >{{ $t('home.minerRanks.filters.blocks') }}</el-button>
              <el-button
                size="mini"
                round
                class="focus:outline-none outline-none"
                v-on:click="didRankTypeSwitched(2)"
              >{{ $t('home.minerRanks.filters.powerDelta') }}</el-button>
            </el-row>
          </div>
          <div class="flex h-12 items-center mr-4" v-if="type != 0">
            <el-radio-group
              v-model="duration"
              size="mini"
              @change="didDurationSwitched"
              fill="#1a4fc9"
            >
              <el-radio-button
                class="focus:outline-none outline-none"
                label="24h"
              >{{ '24' + $t('shared.time.hour') }}</el-radio-button>
              <el-radio-button
                class="focus:outline-none outline-none"
                label="7d"
              >{{'7' + $t('shared.time.day')}}</el-radio-button>
              <el-radio-button
                class="focus:outline-none outline-none"
                label="30d"
              >{{'30' + $t('shared.time.day')}}</el-radio-button>
              <el-radio-button
                class="focus:outline-none outline-none"
                label="1y"
              >{{'1' + $t('shared.time.year')}}</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="flex h-2"></div>
      </div>

      <div class="flex mt-3">
        <table class="w-full" v-loading="loading" :class="{'table-fixed':page == 0, 'table-auto ml-4':page > 0}">
          <thead class="text-gray-600 text-sm">
            <tr v-if="type === 0">
              <th class="w-1/10"> {{ $t('home.minerRanks.tableHeadersByPower.rank') }} </th>
              <th class="w-1/10"> {{ $t('home.minerRanks.tableHeadersByPower.miner') }} </th>
              <th class="w-1/10"> {{ $t('home.minerRanks.tableHeadersByPower.tag') }} </th>
              <th class="w-1/5"> {{ $t('home.minerRanks.tableHeadersByPower.validPower') }} </th>
              <th class="w-1/8"> {{ $t('home.minerRanks.tableHeadersByPower.validPowerRate') }} </th>
              <th class="w-1/8"> {{ $t('home.minerRanks.tableHeadersByPower.reward') }}  </th>
              <th class="w-1/8"> 
                <div class="flex flex-row justify-center items-center">
                  {{ $t('home.minerRanks.tableHeadersByPower.miningEfficiency') }}
                  <Tip class="ml-1" :content="$t('home.minerRanks.tipsByPower.miningEfficiency')"/>
                </div>
              </th>
              <th class="w-1/8"> 
                <div class="flex flex-row justify-center items-center">
                  {{ $t('home.minerRanks.tableHeadersByPower.powerIncrease') }} 
                  <Tip class="ml-1" :content="$t('home.minerRanks.tipsByPower.powerIncrease')"/>
                </div>
              </th>
            </tr>
            <tr v-if="type === 1">
              <th class="w-1/10"> {{ $t('home.minerRanks.tableHeadersByBlock.rank') }} </th>
              <th class="w-1/10"> {{ $t('home.minerRanks.tableHeadersByBlock.miner') }} </th>
              <th class="w-1/10"> {{ $t('home.minerRanks.tableHeadersByBlock.tag') }} </th>
              <th class="w-7/25"> {{ $t('home.minerRanks.tableHeadersByBlock.blockNums') }} </th>
              <th class="w-7/50"> 
                <div class="flex flex-row justify-center items-center">
                  {{ $t('home.minerRanks.tableHeadersByBlock.luckyValue') }}
                  <Tip class="ml-1" :content="$t('home.minerRanks.tipsByBlock.luckyValue')"/>
                </div>
              </th>
              <th class="w-7/50"> {{ $t('home.minerRanks.tableHeadersByBlock.totalRewards') }} </th>
              <th class="w-7/50"> 
                <div class="flex flex-row justify-center items-center">
                  {{ $t('home.minerRanks.tableHeadersByBlock.rewardsRatio') }}
                  <Tip class="ml-1" :content="$t('home.minerRanks.tipsByBlock.rewardsRatio')"/>
                </div>
              </th>
            </tr>
            <tr v-if="type === 2">
              <th class="w-1/10"> {{ $t('home.minerRanks.tableHeadersByPowerDelta.rank') }} </th>
              <th class="w-1/10"> {{ $t('home.minerRanks.tableHeadersByPowerDelta.miner') }} </th>
              <th class="w-1/10"> {{ $t('home.minerRanks.tableHeadersByPowerDelta.tag') }} </th>
              <th class="w-7/25"> 
                <div class="flex flex-row justify-center items-center">
                  {{ $t('home.minerRanks.tableHeadersByPowerDelta.powerIncreaseSpeed') }}
                  <Tip class="ml-1" :content="$t('home.minerRanks.tipsByPowerDelta.powerIncreaseSpeed')"/>
                </div>
              </th>
              <th class="w-7/50"> 
                <div class="flex flex-row justify-center items-center">
                  {{ $t('home.minerRanks.tableHeadersByPowerDelta.equivalentMiners') }}
                  <Tip class="ml-1" :content="$t('home.minerRanks.tipsByPowerDelta.equivalentMiners')"/>
                </div>
              </th>
              <th class="w-7/50"> 
                <div class="flex flex-row justify-center items-center">
                  {{ $t('home.minerRanks.tableHeadersByPowerDelta.powerDelta') }}
                  <Tip class="ml-1" :content="$t('home.minerRanks.tipsByPowerDelta.powerDelta')"/>
                </div>
              </th>
              <th class="w-7/50"> {{ $t('home.minerRanks.tableHeadersByPowerDelta.validPower') }} </th>
            </tr>
          </thead>
          <tbody class="text-sm text-center" v-if="type===0">
            <tr
              v-for="(miner, index) in topMinersByPower.miners"
              :key="index"
              class="border-b border-background h-10"
            >
              <td>
                <rankIndex :index="page * pageSize + index+1" />
              </td>
              <td>
                <AddressLink :id="miner.address" :format="10" />
              </td>
              <td>
                <MinerTag :tag="miner.tag" />
              </td>
              <td>
                <div class="flex flex-row items-center">
                  <el-progress :percentage="miner.qualityAdjPower/topMinersByPower.miners[0].qualityAdjPower * 100" :show-text="false" class="flex w-1/2 ml-8 mr-3" v-if="page === 0"></el-progress>
                  <div class="flex" :class="{'mx-auto': page > 0}">
                    {{ miner.qualityAdjPower | size_metric(2) }}
                  </div>
                </div>
              </td>
              <td>{{ (miner.qualityAdjPower/topMinersByPower.totalQualityAdjPower * 100).toFixed(2) + '%' }}</td>
              <td>{{ miner.totalRewards | filecoin(2) }}</td>
              <td> {{ miner.rewardPerByte * 2 ** 40 * 3456 | filecoinOnAvg(2)}} </td>
              <td>{{ miner.qualityAdjPowerDelta | size_metric(2)}}</td>
            </tr>
          </tbody>
          <tbody class="text-sm text-center" v-if="type===1">
            <tr
              v-for="(miner, index) in topMinersByBlocks.miners"
              :key="index"
              class="border-b border-background h-10"
            >
              <td>
                <rankIndex :index="page * pageSize + index+1" />
              </td>
              <td>
                <AddressLink :id="miner.address" :format="10" />
              </td>
              <td>
                <MinerTag :tag="miner.tag" />
              </td>
              <td>
                <div class="flex flex-row items-center justify-end">
                  <el-progress :percentage="miner.weightedBlocksMined/topMinersByBlocks.miners[0].weightedBlocksMined * 100" :show-text="false" class="flex w-1/2 ml-8 mr-3" v-if="page === 0"></el-progress>
                  <div class="flex" :class="{'mx-auto': page > 0, 'w-1/4': page == 0}">
                    {{ miner.weightedBlocksMined }}
                  </div>
                </div>
              </td>
              <td>{{ (miner.luckyValue * 100).toFixed(2) }}%</td>
              <td>{{ miner.totalRewards | filecoin(2) }}</td>
              <td>{{ (miner.totalRewards/topMinersByBlocks.totalRewards * 100) .toFixed(2) }}%</td>
            </tr>
          </tbody>
          <tbody class="text-sm text-center" v-if="type===2">
            <tr
              v-for="(miner, index) in topMinersByPowerDelta.miners"
              :key="index"
              class="border-b border-background h-10"
            >
              <td>
                <rankIndex :index="page * pageSize + index+1" />
              </td>
              <td>
                <AddressLink :id="miner.address" :format="10" />
              </td>
              <td>
                <MinerTag :tag="miner.tag" />
              </td>
              <td>
                <div class="flex flex-row items-center">
                  <el-progress :percentage="miner.qualityAdjPowerDelta/topMinersByPowerDelta.miners[0].qualityAdjPowerDelta * 100" :show-text="false" class="flex w-1/2 ml-8 mr-3" v-if="page === 0"></el-progress>
                  <div class="flex" :class="{'mx-auto': page > 0}">
                    {{ (miner.qualityAdjPowerDelta / convertedDurationByDay()) | size_metric(2)}} / {{ $t('shared.time.day') }}
                  </div>
                </div>
              </td>
              <td>{{ miner.equivalentMiners.toFixed(2) }}</td>
              <td>{{ miner.qualityAdjPowerDelta | size_metric(2) }}</td>
              <td>{{ miner.qualityAdjPower | size_metric(2)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex flex-grow items-center text-center h-16">
        <el-pagination
          layout="prev, pager, next"
          :page-count="totalPageCount"
          @current-change="didCurrentPageChanged"
          :current-page="page + 1"
          class="mx-auto"
        ></el-pagination>
      </div>
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
      type: 0,
      rankTableHeadersByPowers: this.$t("home.minerRanks.tableHeadersByPower"),
      rankTableHeadersByBlocks: this.$t("home.minerRanks.tableHeadersByBlock"),
      rankTableHeadersByPowerDelta: this.$t(
        "home.minerRanks.tableHeadersByPowerDelta"
      ),
      totalPageCount: 0,
      pageSize: 20,
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
    didRankTypeSwitched(type) {
      this.type = type;
      this.page = 0;
      this.totalPageCount = 1;
      switch (type) {
        case 0:
          this.getTopMinersByPowers();
          break;
        case 1:
          this.getTopMinersByBlocks();
          break;
        case 2:
          this.getTopMinersByPowerDelta();
          break;
        default:
          break;
      }
      this.getTotalPageCount();
    },
    didDurationSwitched() {
      this.page = 0;
      this.totalPageCount = 1;
      if (this.type === 1) {
        this.getTopMinersByBlocks();
      } else if (this.type === 2) {
        this.getTopMinersByPowerDelta();
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
      if (this.type === 0) {
        this.totalPageCount =
          this.topMinersByPower == null
            ? 0
            : Math.ceil(this.topMinersByPower.totalCount / this.pageSize);
      } else if (this.type == 1) {
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
        case 0:
          this.getTopMinersByPowers();
          break;
        case 1:
          this.getTopMinersByBlocks();
          break;
        case 2:
          this.getTopMinersByPowerDelta();
          break;
        default:
          break;
      }
    }
  }
};
</script>