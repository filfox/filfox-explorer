<template>
  <div class="flex flex-col w-full bg-white mb-2">
    <div class="flex flex-row items-center justify-between border-b border-background">
      <HomeTitle type="richManRanks" class="flex flex-grow" />
    </div>

    <div class="flex flex-col" v-loading="richListLoading">
      <div class="flex flex-grow flex-row bg-mobileHeader text-xs px-4"> 
        <div class="w-1/6">
          {{$t('home.richManRanks.tableHeaders.order')}}
        </div>
        <div class="w-1/2">
          {{$t('home.richManRanks.tableHeaders.address')}}
        </div>
        <div class="w-1/3 flex flex-row-reverse">
          {{$t('home.richManRanks.tableHeaders.balance')}} /  {{ $t('home.minerRanks.rate') }}
        </div>
      </div>
    </div>

    <div v-for="(rich, index) in richList.list" :key="index" class="flex flex-row flex-grow text-xs px-4 border-b">
        <div class="w-2/12 items-center flex">  
            <RankIndex :index="index+1"/>
        </div>
        <div class="w-5/12 flex flex-row items-center py-2">  
            <AddressLink :id="rich.address" :format="3" />
            <div class="text-xs bg-background rounded-full px-2 text-gray-500 flex ml-1" v-if="rich.tag"> {{ rich.tag ? rich.tag[$i18n.locale] : '--' }} </div>
        </div>
        <div class="w-5/12 flex flex-row-reverse items-center">  
            {{rich.balance | filecoin(0)}} / {{ (rich.balance/richList.totalSupply * 100).toFixed(2) }}%
        </div>
    </div>

    <div class="flex flex-grow items-center text-center h-12">
        <el-button class="flex m-auto focus:outline-none outline-none" size="mini" type="text" v-on:click="didRichManListMoreBtnClicked"> {{ $t('home.minerRanks.moreBtn') }} </el-button> 
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
        richList: {
            type: Object,
            default: {}
        },
        richListLoading: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        didRichManListMoreBtnClicked() {
         this.$router.push(this.localePath('/blockchain/rich'))
        }
    }
}
</script>>