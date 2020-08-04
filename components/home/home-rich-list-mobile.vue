<template>
  <div class="bg-white mb-2">
    <div class="flex items-center justify-between border-b border-background">
      <HomeTitle type="richManRanks" />
    </div>

    <div v-if="!richListLoading">
      <div class="flex bg-mobileHeader text-xs px-4">
        <div class="w-1/12">
          {{ $t('home.richManRanks.tableHeaders.order') }}
        </div>
        <div class="w-5/12 pl-2">
          {{ $t('home.richManRanks.tableHeaders.address') }}
        </div>
        <div class="w-1/2 text-right">
          {{ $t('home.richManRanks.tableHeaders.balance') }} / {{ $t('home.minerRanks.rate') }}
        </div>
      </div>
    </div>
    <div v-else v-loading="richListLoading">
    </div>

    <div v-for="(rich, index) in richList.list" :key="index" class="flex items-center text-xs px-3 border-b">
      <div class="w-1/12 pl-2">
        <RankIndex :index="index + 1" />
      </div>
      <div class="w-1/2 flex items-center py-2 pl-2">
        <AddressLink :id="rich.address" :format="3" />
        <MinerTag v-if="rich.tag" :tag="rich.tag" :type="2" />
      </div>
      <div class="w-5/12 text-right break-words">
        {{ rich.balance | filecoin(0) }} / {{ rich.balance / richList.totalSupply | percentage }}
      </div>
    </div>

    <div class="flex items-center text-center h-12">
      <nuxt-link :to="localePath('/rich-list')" class="flex m-auto">
        <el-button size="mini" type="text">
          {{ $t('home.minerRanks.moreBtn') }}
        </el-button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    richList: { type: Object, required: true },
    richListLoading: { type: Boolean, default: false }
  }
}
</script>
