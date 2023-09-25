<template>
  <div v-loading="loading" class="p-4">
    <div v-for="(item, index) in fnsRanks" :key="item.ethAddr" class="rounded mb-3 flex flex-col lg:flex-row relative" :class="[index ? 'bg-card' : 'bg-background']">
      <div class="w-20 flex items-start justify-center">
        <img :src="require(`@/assets/img/fns/ranking${index+1}.svg`)" class="w-9" alt="ranking">
      </div>
      <div class="flex-1 w-full p-3">
        <p class="font-semibold text-main text-base lg:text-lg flex items-center">
          <img :src="item.texts.avatar" alt="logo" class="w-7 h-7 rounded-full bg-white mr-2" @error="handleImgError">
          {{ item.texts.projectname || '...' }}
        </p>
        <p class="text-xs lg:text-sm font-light leading-loose mt-1">
          <span class="text-customGray-400 inline-block w-26">{{ $t('fns.registrations.filecoinName') }} :</span>{{ item.name || '...' }}
        </p>
        <p class="text-xs lg:text-sm font-light flex">
          <span class="text-customGray-400 inline-block w-26">{{ $t('fns.registrations.description') }} :</span>
          <span class="flex-1">
            <el-popover
              popper-class="p-3 text-xs text-customGray-400 font-light rounded-md border-none"
              placement="bottom"
              width="400"
              trigger="hover"
              :disabled="item.texts.description.length < 100"
              :content="item.texts.description"
            >
              <span slot="reference">{{ truncateString(item.texts.description, 100) || '...' }}</span>
            </el-popover>
          </span>
        </p>
      </div>
      <div class="flex items-end justify-center lg:ml-auto">
        <div class="flex mb-5 lg:mb-3 lg:mr-4">
          <a v-for="(key, linkIndex) in fnsLinks" :key="key" target="_blank" :href="item.texts[key]">
            <el-tooltip effect="dark" :content="item.texts[key]" :disabled="!item.texts[key]" placement="top">
              <img
                :src="require(`@/assets/img/fns/${key}.png`)"
                class="h-5.5 cursor-pointer hover:opacity-75 transition duration-200"
                :class="{ 'ml-3': linkIndex !== 0 }"
                :alt="key"
              >
            </el-tooltip>
          </a>
        </div>
        <img src="@/assets/img/fns/ace.png" class="h-24 self-end " :class="{ 'hidden': index !== 0 }">
      </div>
    </div>
  </div>
</template>

<script>
import { FNS_SERVER } from '@/filecoin/filecoin.config'
import FNS from '@filfox/fnsjs'
const fns = new FNS('calibration')

export default {
  data() {
    return {
      fnsLinks: ['url', 'com.twitter', 'com.discord', 'com.telegram', 'com.github'],
      fnsRanks: [],
      loading: false
    }
  },

  mounted() {
    this.getRanking()
  },

  methods: {
    handleImgError({ target }) {
      target.onerror = null
      target.src = require('@/assets/img/fns/logo.png')
    },

    truncateString(str, n) {
      if (str.length <= n) return str
      return `${str.slice(0, n)}...`
    },

    async getRanking() {
      this.loading = true
      const data = await this.$axios.$get(`${FNS_SERVER}/fns/inviteRanking`, { params: { pageSize: 3 } })
      const addrs = data.data.records.map(({ ethAddr }) => ethAddr)
      const primaryNames = await Promise.all(addrs.map(addr => fns.address(addr).getPrimaryName()))
      const texts = await Promise.all(primaryNames.map(name => fns.name(name).getTexts()))
      this.fnsRanks = primaryNames.map((name, index) => ({ name, texts: texts[index] }))
      this.loading = false
    }
  }
}
</script>
