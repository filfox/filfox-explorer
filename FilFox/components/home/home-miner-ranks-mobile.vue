<template>
  <div class="flex flex-grow flex-col mb-2 bg-white">
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

    <div class="flex mt-3">
      <table class="w-full table-auto mx-4" v-loading="loading">
        <thead class="text-gray-600 text-xs m-2">
          <tr v-if="type == 0">
            <th> {{ $t('home.minerRanks.tableHeadersByPower.rank') }} </th>
            <th> {{ $t('home.minerRanks.tableHeadersByPower.miner') }} </th>
            <th> {{ $t('home.minerRanks.tableHeadersByPower.tag') }} </th>
            <th> {{ $t('home.minerRanks.tableHeadersByPower.validPower') }} /  {{ $t('home.minerRanks.rate') }}</th>
          </tr>
          <tr v-if="type == 1">
            <th> {{ $t('home.minerRanks.tableHeadersByBlock.rank') }} </th>
            <th> {{ $t('home.minerRanks.tableHeadersByBlock.miner') }} </th>
            <th> {{ $t('home.minerRanks.tableHeadersByBlock.tag') }} </th>
            <th> {{ $t('home.minerRanks.tableHeadersByBlock.blockNums') }} /  {{ $t('home.minerRanks.tableHeadersByBlock.blockRate') }}</th>
          </tr>
          <tr v-if="type == 2">
             <th> {{ $t('home.minerRanks.tableHeadersByPower.rank') }} </th>
             <th> {{ $t('home.minerRanks.tableHeadersByPower.miner') }} </th>
             <th> {{ $t('home.minerRanks.tableHeadersByPower.tag') }} </th>
             <th> {{ $t('home.minerRanks.tableHeadersByPowerDelta.validPower') }}</th>
          </tr>
        </thead>
        <tbody class="text-xs text-center" v-if="type=='0'">
          <tr v-for="(miner, index) in topMinersByPower.miners" :key="index" class="border-b border-background h-10">
            <td>
              <RankIndex :index="index+1"/>
            </td>
            <td>
              <AddressLink :id="miner.address" :format="4"/>
            </td>
            <td>
              {{ miner.tag ? miner.tag[$i18n.locale] : '--'}}
            </td>
            <td>
              {{ miner.qualityAdjPower | size_metric(2) }} / {{ (miner.qualityAdjPower/topMinersByPower.totalQualityAdjPower * 100).toFixed(2) + '%' }}
            </td>
          </tr>
        </tbody>
        <tbody class="text-xs text-center" v-if="type=='1'">
          <tr v-for="(miner, index) in topMinersByBlocks.miners" :key="index" class="border-b border-background h-10">
            <td>
              <RankIndex :index="index+1"/>
            </td>
            <td>
              <AddressLink :id="miner.address" :format="10"/>
            </td>
            <td>
              {{ miner.tag ? miner.tag[$i18n.locale] : '--'}}
            </td>
            <td> {{ miner.blocksMined }} / {{ (miner.blocksMined/topMinersByBlocks.tipsetCount * 100).toFixed(2) + '%'}}</td>
          </tr>
        </tbody>
        <tbody class="text-xs text-center" v-if="type=='2'">
          <tr v-for="(miner, index) in topMinersByPowerDelta.miners" :key="index" class="border-b border-background h-10">
            <td>
              <RankIndex :index="index+1"/>
            </td>
            <td>
              <AddressLink :id="miner.address" :format="10"/>
            </td>
            <td>
              {{ miner.tag ? miner.tag[$i18n.locale] : '--'}}
            </td>
            <td>
              {{ (miner.qualityAdjPowerDelta / convertedDurationByDay()) | size_metric(2)}} / {{ $t('shared.time.day') }} 
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-grow items-center text-center h-12">
        <el-button class="flex m-auto focus:outline-none outline-none" size="mini" round v-on:click="didMoreBtnClicked"> {{ $t('home.minerRanks.moreBtn') }} </el-button> 
    </div>

  </div>
</template>

<style>
  svg {
    display: inline-block
  }
  .el-tabs__item {
      padding: 0 10px;
      font-size: 12px;
  }
</style>

<script>

export default {
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
    didRankTypeSwitched() {
        switch(this.type) {
            case '0':
            this.getTopMinersByPowers()
            break;
            case '1':
            this.getTopMinersByBlocks()
            break;
            case '2':
            this.getTopMinersByPowerDelta()
            break;
            default:
            break;
        }
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

        if (this.type === '1') {
            this.getTopMinersByBlocks()
        }
        else if (this.type === '2') {
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