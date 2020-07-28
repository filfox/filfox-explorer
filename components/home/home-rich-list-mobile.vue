<template>
  <div class="bg-white mb-2">
    <div class="flex flex-row items-center justify-between border-b border-background">
      <HomeTitle type="richManRanks" class="flex flex-grow" />
    </div>

    <div v-loading="richListLoading" class="flex flex-col">
      <div class="flex flex-grow flex-row bg-mobileHeader text-xs px-4">
        <div class="w-1/6">
          {{ $t('home.richManRanks.tableHeaders.order') }}
        </div>
        <div class="w-1/3">
          {{ $t('home.richManRanks.tableHeaders.address') }}
        </div>
        <div class="w-1/2 flex flex-row-reverse">
          {{ $t('home.richManRanks.tableHeaders.balance') }} / {{ $t('home.minerRanks.rate') }}
        </div>
      </div>
    </div>

    <div v-for="(rich, index) in richList.list" :key="index" class="flex flex-row flex-grow text-xs px-3 border-b">
      <div class="w-1/12 items-center flex">
        <RankIndex :index="index + 1" />
      </div>
      <div class="w-5/12 flex flex-row items-center py-2 pl-1">
        <AddressLink :id="rich.address" :format="3" />
        <MinerTag v-if="rich.tag" :tag="rich.tag" :type="2" />
      </div>
      <div class="w-6/12 flex flex-row-reverse items-center">
        {{ rich.balance | filecoin(0) }} / {{ rich.balance / richList.totalSupply | percentage }}
      </div>
    </div>

    <div class="flex flex-grow items-center text-center h-12">
      <nuxt-link :to="localePath('/rich')" class="flex m-auto">
        <el-button class="focus:outline-none outline-none" size="mini" type="text">
          {{ $t('home.minerRanks.moreBtn') }}
        </el-button>
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
    richList: { type: Object, required: true },
    richListLoading: { type: Boolean, default: false }
  }
}
</script>
