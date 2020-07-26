<template>
    <div class="bg-white w-full flex flex-col mb-2">
        <div class="flex flex-row items-center justify-between border-b border-background">
          <HomeTitle type="recentTipsets" class="flex flex-grow"/>
        </div>
        <div class="flex flex-col">
          <div v-for="(tipset, tipsetIndex) in recentTipsets.slice(0,4)" :key="tipsetIndex" class="mt-2 mx-2 px-2 shadow rounded-sm">
              <div class="flex flex-row border-b border-background py-1">  
                  <div class="flex w-1/2 text-xs flex-row items-center"> {{$t('home.recentTipsets.tableHeaders.height')}} <TipsetLink :id="tipset.height" class="text-main text-xs ml-2" /></div>
                  <div class="flex flex-row-reverse w-1/2"> <FromNow :timestamp="tipset.timestamp" format="seconds" class="text-xs"/> </div>
              </div>
              <div class="flex flex-row">  
                  <div class="flex w-1/2 flex-col">
                    <div v-for="(block, blockIndex) in tipset.blocks" :key="blockIndex" class="flex items-center py-1">
                        <AddressLink :id="block.miner" class="text-xs"/>
                        <MinerTag :tag="block.minerTag" :type="2" v-if="block.minerTag"/>
                    </div>
                  </div>
                  <div class="flex w-1/2 flex-col">
                    <div v-for="(block, blockIndex) in tipset.blocks" :key="blockIndex" class="flex flex-row-reverse items-center py-1">
                        <div class="text-xs"> {{$t('home.recentTipsets.tableHeaders.award')}} : {{ block.reward | filecoin(2) }}</div>
                    </div>
                  </div>
              </div>
          </div>
          <div class="flex h-24" v-if="recentTipsetsLoading" v-loading="recentTipsetsLoading"></div>
        </div>
        <div class="flex flex-grow items-center text-center h-12">
            <nuxt-link :to="localePath('/tipset')" class="flex m-auto">
                <el-button class="focus:outline-none outline-none" size="mini" type="text"> {{ $t('home.minerRanks.moreBtn') }} </el-button> 
            </nuxt-link>
        </div>
    </div>
</template>

<style>
.el-button--text {
    color: #606266
  }
.el-button--text:focus, .el-button--text:hover {
  color: #606266;
}
</style>

<script>
export default {
    props: {
        recentTipsets: {
            type: Array,
            default: []
        },
        recentTipsetsLoading: {
            type: Boolean,
            default: false
        }
    }
}
</script>
