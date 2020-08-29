<template>
  <div class="bg-socialBg social">
    <div class="relative flex items-end h-56">
      <img src="~/assets/img/social/blocks-header.png" class="absolute w-full top-0">
      <span class="text-white text-sm mx-auto text-center mb-2">
        Filfox.info 更新于 {{ topMinersByBlocks.timestamp | timestamp('datetime') }} ({{ currentNetwork.name }})
      </span>
    </div>
    <div class="h-2 bg-socialHeader mx-3 rounded"></div>
    <div class="bg-white rounded-sm mx-4 overflow-hidden">
      <div class="flex text-xs pt-2">
        <div class="pl-2 w-1/8 font-medium">
          {{ $t('home.minerRanks.tableHeadersByPower.rank') }}
        </div>
        <div class="w-3/8 font-medium">
          {{ $t('home.minerRanks.tableHeadersByPower.miner') }}
        </div>
        <div class="w-1/4 text-left font-medium">
          24h{{ $t('home.minerRanks.tableHeadersByBlock.blockNums') }} /  {{ $t('home.minerRanks.rate') }}
        </div>
        <div class="w-1/4 text-right font-medium pr-2">
          {{ $t('home.minerRanks.tableHeadersByBlock.luckyValue') }}
        </div>
      </div>

      <div
        v-for="(miner, index) in topMinersByBlocks.miners"
        :key="index"
        class="flex items-center text-xs overflow-hidden font-normal"
        :class="{'bg-socialTableBg': index % 2 === 0}"
      >
        <div class="pl-3 w-1/8 z-40">
          <RankIndex :index="index + 1" type="pc" :class="{'mb-1': index < 3}" />
        </div>
        <div class="w-3/8 flex items-center py-2 z-40">
          <AddressLink :id="miner.address" />
          <AddressTag :tag="miner.tag" type="share-rank" :style="{maxWidth:'66%'}" />
        </div>
        <div class="w-1/4 flex items-center py-2 relative">
          <div
            :key="index"
            :style="{width: `${miner.weightedBlocksMined/topMinersByBlocks.miners[0].weightedBlocksMined * 100}%`, background: '#d5eaff'}"
            class="absolute left-0 top-1 h-8"
          ></div>
          <p class="z-40 pl-1">
            {{ miner.weightedBlocksMined }}
            /
            {{ miner.weightedBlocksMined / topMinersByBlocks.weightedBlockCount | percentage }}
          </p>
        </div>
        <div class="w-1/4 text-right pr-2 z-40">
          {{ (miner.luckyValue) | percentage }}
        </div>
      </div>
    </div>

    <div class="flex flex-row justify-between text-white p-4">
      <div>
        <img src="~/assets/img/home/logo.svg" class="h-6 mt-3">
        <div class="text-xl font-bold mt-4">
          更多实时挖矿排行榜
        </div>
        <div class="text-xs mt-1">
          尽在飞狐浏览器（Filfox.info），立即扫码查看
        </div>
      </div>
      <canvas ref="canvas" class="my-auto rounded-md"></canvas>
    </div>
  </div>
</template>

<script>
import QrCodeWithLogo from 'qr-code-with-logo'
import { network } from '~/filecoin/filecoin.config'

export default {
  async asyncData({ $axios, error, params }) {
    const topMinersByBlocks = await $axios.$get('/miner/list/blocks', { params: { pageSize: 50, page: 0, duration: '24h' } })
    return { topMinersByBlocks }
  },
  data() {
    return {
      topMinersByBlocks: {},
      loading: false,
      currentNetwork: network.networks[network.currentNetwork]
    }
  },
  mounted() {
    QrCodeWithLogo.toCanvas({
      canvas: this.$refs.canvas,
      content: `${this.currentNetwork.url}/ranks/blocks?utm_source=picshare&utm_campaign=ranks`,
      width: 110,
      logo: {
        src: `${this.currentNetwork.url}/favicon.ico?v=1`,
        radius: 5
      }
    })
  },
  head() {
    return {
      title: this.$t('meta.titles.ranks')
    }
  },
  layout(context) {
    return 'social'
  }
}
</script>
