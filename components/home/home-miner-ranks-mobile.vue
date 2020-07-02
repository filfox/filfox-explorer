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

    <div class="flex flex-col" v-loading="loading">
      <div class="flex flex-grow flex-row bg-mobileHeader text-xs px-4" v-if="type == 0"> 
        <div class="w-1/6">
          {{ $t('home.minerRanks.tableHeadersByPower.rank') }}
        </div>
        <div class="w-1/2">
          {{ $t('home.minerRanks.tableHeadersByPower.miner') }} 
        </div>
        <div class="w-1/3 flex flex-row-reverse">
          {{ $t('home.minerRanks.tableHeadersByPower.validPower') }} /  {{ $t('home.minerRanks.rate') }}
        </div>
      </div>

      <div class="flex flex-grow flex-row bg-mobileHeader text-xs px-4" v-if="type == 1"> 
        <div class="w-1/6">
          {{ $t('home.minerRanks.tableHeadersByPower.rank') }}
        </div>
        <div class="w-1/2">
          {{ $t('home.minerRanks.tableHeadersByPower.miner') }} 
        </div>
        <div class="w-1/3 flex flex-row-reverse">
          {{ $t('home.minerRanks.tableHeadersByBlock.blockNums') }} /  {{ $t('home.minerRanks.tableHeadersByBlock.blockRate') }}
        </div>
      </div>

      <div class="flex flex-grow flex-row bg-mobileHeader text-xs px-4" v-if="type == 2"> 
        <div class="w-1/6">
          {{ $t('home.minerRanks.tableHeadersByPower.rank') }}
        </div>
        <div class="w-1/2">
          {{ $t('home.minerRanks.tableHeadersByPower.miner') }} 
        </div>
        <div class="w-1/3 flex flex-row-reverse">
          {{ $t('home.minerRanks.tableHeadersByPowerDelta.validPower') }}
        </div>
      </div>
      
      <template v-if="type == 0">
        <div v-for="(miner, index) in topMinersByPower.miners" :key="index" class="flex flex-row flex-grow text-xs px-4 border-b">
            <div class="w-1/6 items-center flex">  
                <RankIndex :index="index+1"/>
            </div>
            <div class="w-1/2 flex flex-row items-center py-2">  
                <AddressLink :id="miner.address" :format="4"/>
                <div class="text-xs bg-background rounded-full px-2 text-gray-500 flex ml-1" v-if="miner.tag"> {{ miner.tag ? miner.tag[$i18n.locale] : '--'}} </div>
            </div>
            <div class="w-1/3 flex flex-row-reverse items-center">  
                {{ miner.qualityAdjPower | size_metric(2) }} / {{ (miner.qualityAdjPower/topMinersByPower.totalQualityAdjPower * 100).toFixed(2) + '%' }}
            </div>
        </div>
      </template>

       <template v-if="type == 1">
        <div v-for="(miner, index) in topMinersByBlocks.miners" :key="index" class="flex flex-row flex-grow text-xs px-4 border-b">
            <div class="w-1/6 items-center flex">  
                <RankIndex :index="index+1"/>
            </div>
            <div class="w-1/2 flex flex-row items-center py-2">  
                <AddressLink :id="miner.address" :format="4"/>
                <div class="text-xs bg-background rounded-full px-2 text-gray-500 flex ml-1" v-if="miner.tag"> {{ miner.tag ? miner.tag[$i18n.locale] : '--'}} </div>
            </div>
            <div class="w-1/3 flex flex-row-reverse items-center">  
                {{ miner.blocksMined }} / {{ (miner.blocksMined/topMinersByBlocks.tipsetCount * 100).toFixed(2) + '%'}}
            </div>
        </div>
      </template>

       <template v-if="type == 2">
        <div v-for="(miner, index) in topMinersByPowerDelta.miners" :key="index" class="flex flex-row flex-grow text-xs px-4 border-b">
            <div class="w-1/6 items-center flex">  
                <RankIndex :index="index+1"/>
            </div>
            <div class="w-1/2 flex flex-row items-center py-2">  
                <AddressLink :id="miner.address" :format="4"/>
                <div class="text-xs bg-background rounded-full px-2 text-gray-500 flex ml-1" v-if="miner.tag"> {{ miner.tag ? miner.tag[$i18n.locale] : '--'}} </div>
            </div>
            <div class="w-1/3 flex flex-row-reverse items-center">  
                {{ (miner.qualityAdjPowerDelta / convertedDurationByDay()) | size_metric(2)}} / {{ $t('shared.time.day') }} 
            </div>
        </div>
      </template>
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