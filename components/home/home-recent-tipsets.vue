<template>
  <div class="flex flex-col bg-white mr-2 rounded-md overflow-hidden">
    <div class="flex items-center justify-between border-b border-background">
      <HomeTitle type="recentTipsets" />
      <nuxt-link :to="localePath('/tipset')" class="mr-4">
        <el-button round size="mini">
          {{ $t('shared.more') }}
        </el-button>
      </nuxt-link>
    </div>
    <div class="flex-grow mt-2 overflow-y-scroll relative">
      <table v-if="!recentTipsetsLoading" class="w-full table-auto absolute text-sm">
        <thead class="text-gray-600 m-2">
          <tr>
            <th class="table-header">
              {{ $t('home.recentTipsets.tableHeaders.height') }}
            </th>
            <th class="table-header">
              {{ $t('home.recentTipsets.tableHeaders.blockId') }}
            </th>
            <th class="table-header">
              {{ $t('home.recentTipsets.tableHeaders.miner') }}
            </th>
            <th class="table-header">
              {{ $t('home.recentTipsets.tableHeaders.tag') }}
            </th>
            <th class="table-header">
              {{ $t('home.recentTipsets.tableHeaders.message') }}
            </th>
            <th class="table-header">
              {{ $t('home.recentTipsets.tableHeaders.award') }}
            </th>
          </tr>
        </thead>
        <tbody class="text-center">
          <template v-for="(tipset) in recentTipsets">
            <tr
              v-for="(block, blockIndex) in tipset.blocks"
              :key="block.hash"
              :class="{'border-b border-background': blockIndex == tipset.blocks.length - 1}"
            >
              <td v-if="blockIndex === 0" :rowspan="tipset.blocks.length" class="border-b border-background">
                <div :class="{'py-2': tipset.blocks.length == 1}">
                  <TipsetLink :id="tipset.height" class="block text-main text-base" />
                  <FromNow :timestamp="tipset.timestamp" format="seconds" class="block" />
                </div>
              </td>
              <td :class="{'pt-2': blockIndex == 0, 'pb-2': blockIndex == tipset.blocks.length - 1}">
                <BlockLink :id="block.cid" :format="4" />
              </td>
              <td :class="{'pt-2': blockIndex == 0, 'pb-2': blockIndex == tipset.blocks.length - 1}">
                <AddressLink :id="block.miner" />
              </td>
              <td :class="{'pt-2': blockIndex == 0, 'pb-2': blockIndex == tipset.blocks.length - 1}">
                <AddressTag :tag="block.minerTag" class="max-w-full" />
              </td>
              <td :class="{'pt-2': blockIndex == 0, 'pb-2': blockIndex == tipset.blocks.length - 1}">
                {{ block.messageCount }}
              </td>
              <td :class="{'pt-2': blockIndex == 0, 'pb-2': blockIndex == tipset.blocks.length - 1}">
                {{ block.reward | filecoin(2) }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div v-if="recentTipsetsLoading" v-loading="recentTipsetsLoading" class="flex h-24"></div>
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

<style lang="postcss" scoped>
  .table-header {
    @apply sticky top-0 bg-white z-10;
  }
</style>
