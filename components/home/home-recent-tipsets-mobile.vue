<template>
  <div class="bg-white mb-2">
    <div class="flex items-center justify-between border-b border-background">
      <HomeTitle type="recentTipsets" />
    </div>
    <div>
      <div
        v-for="(tipset, tipsetIndex) in recentTipsets.slice(0,4)"
        :key="tipsetIndex"
        class="mt-2 mx-2 px-2 shadow rounded-sm"
      >
        <div class="flex justify-between border-b border-background py-1 text-xs">
          <div class="flex items-center">
            {{ $t('home.recentTipsets.tableHeaders.height') }}
            <TipsetLink :id="tipset.height" class="text-main text-xs ml-2" />
          </div>
          <FromNow :timestamp="tipset.timestamp" format="seconds" class="text-xs" />
        </div>
        <div
          v-for="(block, blockIndex) in tipset.blocks"
          :key="blockIndex"
          class="flex py-1 justify-between"
        >
          <div class="flex">
            <AddressLink :id="block.miner" class="text-xs" />
            <MinerTag v-if="block.minerTag" :tag="block.minerTag" :type="2" :style="{maxWidth:'66%'}" />
          </div>
          <div class="text-xs align-middle">
            {{ $t('home.recentTipsets.tableHeaders.award') }} : {{ block.reward | filecoin(2) }}
          </div>
        </div>
      </div>
      <div v-if="recentTipsetsLoading" v-loading="recentTipsetsLoading" class="flex h-24"></div>
    </div>
    <div class="flex items-center text-center h-12">
      <nuxt-link :to="localePath('/tipset')" class="flex m-auto">
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
    recentTipsets: { type: Array, required: true },
    recentTipsetsLoading: { type: Boolean, default: false }
  }
}
</script>
