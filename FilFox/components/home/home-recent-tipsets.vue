<template>
    <div class="bg-white mr-2 rounded-md w-1/2 flex flex-col overflow-hidden">
        <div class="flex flex-row items-center justify-between border-b border-background">
          <HomeTitle type="recentTipsets" class="flex flex-grow"/>
          <el-button round size="mini" class="mr-4 focus:outline-none outline-none" v-on:click="didRecentTipsetsMoreBtnClicked"> {{ $t('shared.more') }} </el-button>
        </div>
        <div class="mt-2 overflow-y-scroll flex-grow relative">
          <table class="w-full table-auto absolute" v-if="!recentTipsetsLoading">
             <thead class="text-gray-600 text-sm m-2">
               <tr>
                   <th class="sticky top-0 bg-white z-10"> {{$t('home.recentTipsets.tableHeaders.height')}} </th>
                   <th class="sticky top-0 bg-white z-10"> {{$t('home.recentTipsets.tableHeaders.blockId')}} </th>
                   <th class="sticky top-0 bg-white z-10"> {{$t('home.recentTipsets.tableHeaders.miner')}} </th>
                   <th class="sticky top-0 bg-white z-10"> {{$t('home.recentTipsets.tableHeaders.tag')}} </th>
                   <th class="sticky top-0 bg-white z-10"> {{$t('home.recentTipsets.tableHeaders.message')}} </th>
                   <th class="sticky top-0 bg-white z-10"> {{$t('home.recentTipsets.tableHeaders.award')}} </th>
               </tr>
            </thead>
            <tbody class="text-center">
               <template v-for="(tipset) in recentTipsets">
                <tr v-for="(block, blockIndex) in tipset.blocks" :key="block.hash"
                     :class="{'border-b border-background': blockIndex == tipset.blocks.length - 1}">
                  <td v-if="blockIndex === 0" :rowspan="tipset.blocks.length" class="border-b border-background">
                      <div class="flex flex-col">
                        <TipsetLink :id="tipset.height" class="text-main text-base" />
                        <FromNow :timestamp="tipset.timestamp" format="seconds" class="text-sm"/>
                     </div>
                  </td>
                  <td :class="{'pt-2':blockIndex == 0,'pb-2': blockIndex == tipset.blocks.length - 1}">
                      <BlockLink :id="block.cid" :format="5" class="md:hidden text-sm"/>
                      <BlockLink :id="block.cid" :format="4" class="mdb:hidden text-sm" />
                  </td>
                  <td :class="{'pt-2':blockIndex == 0,'pb-2': blockIndex == tipset.blocks.length - 1}">
                    <AddressLink :id="block.miner" class="text-sm"/>
                  </td>
                  <td class="text-sm" :class="{'pt-2':blockIndex == 0,'pb-2': blockIndex == tipset.blocks.length - 1}">
                    <MinerTag :tag="block.minerTag" />
                  </td>
                  <td class="smb:hidden text-sm" :class="{'pt-2':blockIndex == 0,'pb-2': blockIndex == tipset.blocks.length - 1}">{{ block.messageCount }}</td>
                  <td class="text-sm" :class="{'pt-2':blockIndex == 0,'pb-2': blockIndex == tipset.blocks.length - 1}"> {{ block.reward | filecoin(2) }} </td>
                </tr>
                </template>
            </tbody>
          </table>
          <div class="flex h-24" v-if="recentTipsetsLoading" v-loading="recentTipsetsLoading"></div>
        </div>
      </div>
</template>

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
    },
    methods: {
        didRecentTipsetsMoreBtnClicked() {
            this.$router.push(this.localePath('/recent-tipsets'))
        },
    }
}
</script>