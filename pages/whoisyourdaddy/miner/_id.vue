<template>
  <div class="container mx-auto social">
    <div class="bg-socialBg flex flex-col relative h-48 items-start">
      <img src="~/assets/img/social/miner-header.png" class="absolute w-full top-0">
      <img src="~/assets/img/home/logo.svg" class="h-6 mt-8 ml-4">
      <div class="flex mt-6 ml-4">
        <p class="text-white text-2xl font-medium">
          矿工 {{ addressData.address }}
        </p>
        <MinerTag v-if="addressData.tag" :tag="addressData.tag" :type="4" />
      </div>
      <span class="text-socialUpdateTimeText text-xs ml-4 mt-2">
        Filfox.info 更新于 {{ addressData.timestamp | timestamp('datetime') }} ({{ currentNetwork.name }})
      </span>
    </div>
    <div class="pb-1 bg-white">
      <div class="p-4 rounded-md mx-2 my-5 shadow flex justify-between text-sm text-socialMinerTitle">
        <div class="flex flex-col items-start">
          <p> 有效算力 </p>
          <div class="flex items-center">
            <p class="text-2xl font-medium text-socialBg">
              {{ addressData.miner.qualityAdjPower | size_metric(2) }}
            </p>
            <p class="ml-5 font-medium">
              占比: {{ addressData.miner.qualityAdjPower / addressData.miner.totalQualityAdjPower | percentage }}
            </p>
          </div>
          <p class="mt-5">
            累计出块数：{{ addressData.miner.weightedBlocksMined }}
          </p>
        </div>
        <div class="flex flex-col items-end">
          <p> 排名 </p>
          <div>
            <p class="text-2xl text-socialBg">
              {{ addressData.miner.qualityAdjPowerRank || 'N/A' }}
            </p>
          </div>
          <p class="mt-5">
            累计出块奖励：{{ addressData.miner.totalRewards | filecoin(2) }}
          </p>
        </div>
      </div>

      <div class="bg-white mx-2 shadow flex flex-col rounded-md px-3 mb-5">
        <p class="flex py-2 text-sm border-b border-background font-medium">
          {{ $t('detail.address.miner.powerChange.title') }}
        </p>
        <div>
          <MinerPowerDetailChart :address-data="addressData" class="mt-4 w-full" />
        </div>
      </div>

      <div class="p-4 rounded-md mx-2 mb-5 shadow grid grid-cols-2 text-sm text-socialMinerTitle">
        <div class="flex flex-col items-start border-r border-dashed border-socialMinerBorder">
          <p> 24小时算力增速 </p>
          <p class="text-2xl font-medium text-black">
            {{ addressData.miner.miningStats.qualityAdjPowerDelta | size_metric(2) }}
            /
            {{ $t('shared.time.day') }}
          </p>
          <p class="mt-4">
            24小时矿机当量
          </p>
          <p class="text-2xl font-medium text-black">
            {{ addressData.miner.miningStats.equivalentMiners.toFixed(2) }}
          </p>
        </div>
        <div class="flex flex-col items-end">
          <p> 24小时挖矿效率 </p>
          <p class="text-2xl font-medium text-black">
            {{ addressData.miner.miningStats.rewardPerByte * 2 ** 40 * epochsInDay | filecoin(2) }}/TiB
          </p>
          <p class="mt-4">
            24小时幸运值
          </p>
          <p class="text-2xl font-medium text-black">
            {{ addressData.miner.miningStats.luckyValue | percentage }}
          </p>
        </div>
      </div>

      <div class="p-4 rounded-md mx-2 mb-5 shadow flex flex-col text-sm text-socialMinerTitle">
        <div class="items-start">
          <p> 账户余额 </p>
          <p class="text-2xl font-medium text-socialBg">
            {{ addressData.balance | filecoin(2) }}
          </p>
        </div>
        <div class="flex justify-between mt-4">
          <div>
            <p> 可用余额：{{ addressData.miner.availableBalance | filecoin(2) }} </p>
          </div>
          <div>
            <p> 质押金额： {{ addressData.miner.pledgeBalance | filecoin(2) }} </p>
          </div>
        </div>
      </div>

      <div class="bg-white mx-2 shadow flex flex-col rounded-md px-3 mb-5">
        <p class="flex py-2 text-sm border-b border-background font-medium">
          账户变化
        </p>
        <div>
          <MinerBalanceDetailChart :address-data="addressData" class="mt-4 w-full" />
        </div>
      </div>

      <div class="flex flex-row justify-between p-4 border-t border-socialMinerBorder border-dashed">
        <div>
          <img src="~/assets/img/home/logo-social.svg" class="h-6 mt-3">
          <div class="text-xl font-bold mt-4">
            更多矿工实时数据
          </div>
          <div class="text-xs mt-1 text-socialMinerTitle">
            尽在飞狐浏览器（Filfox.info），立即扫码查看
          </div>
        </div>
        <canvas ref="canvas" class="my-auto rounded-md border border-socialMinerBorder"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { epochsInDay } from '@/filecoin/filecoin.config'
import QrCodeWithLogo from 'qr-code-with-logo'
import { network } from '~/filecoin/filecoin.config'

export default {
  async asyncData({ $axios, params, query, error }) {
    const id = params.id
    try {
      const addressData = await $axios.$get(`/address/${id}`, { params: query })
      return { addressData }
    } catch (err) {
      if (err?.response) {
        if (err.response.code === 404) {
          error({ code: 404, message: `Address ${id} not found` })
        } else {
          error({
            code: err.response.status,
            message: err.response.statusText
          })
        }
      } else {
        error({ code: 500, message: err.toString() })
      }
    }
  },
  data() {
    return {
      addressData: {},
      listType: 0,
      blockList: {},
      transferList: {},
      page: 0,
      pageSize: 3,
      loading: false,
      total: 0,
      method: 'All',
      duration: '24h',
      epochsInDay,
      currentNetwork: network.networks[network.currentNetwork]
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    totalPageCount() {
      return Math.ceil(this.total / this.pageSize)
    },
    miningStats() {
      return this.addressData.miner.miningStats
    }
  },
  mounted() {
    QrCodeWithLogo.toCanvas({
      canvas: this.$refs.canvas,
      content: `${this.currentNetwork.url}/address/${this.addressData.address}?utm_source=picshare&utm_campaign=miner`,
      width: 110,
      logo: {
        src: `${this.currentNetwork.url}/favicon.ico?v=1`,
        radius: 5
      }
    })
  },
  head() {
    return {
      title: `${this.$t('meta.titles.address')} ${this.id}`
    }
  },
  layout(context) {
    return 'social'
  }
}
</script>
