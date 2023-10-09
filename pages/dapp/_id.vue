<template>
  <div class="container mx-auto flex-1 my-4 dapp-detail">
    <div class="bg-white lg:rounded-md">
      <div class="flex items-center px-4 lg:px-10 py-3 text-sm lg:text-base font-semibold border-b border-background">
        <img
          src="@/assets/img/shared/back.svg"
          class="transition duration-200 cursor-pointer hover:opacity-75 mr-1.5"
          @click="$router.back()"
        >{{ $t('dapp.details') }}
      </div>
      <div class="px-4 lg:px-10 py-4 lg:py-6">
        <div class="rounded-1 lg:rounded-md bg-background flex p-5 lg:flex-row flex-col">
          <div
            class="w-28 h-29 bg-customBlue-260 rounded-full flex items-center justify-center lg:mr-6 mr-0 flex-shrink-0"
          >
            <img
              class="rounded-full"
              :class="[ dapp.logoPath ? 'w-24' : 'w-28' ]"
              :src="dapp.logoPath || require('@/assets/img/fns/logo.png')"
            />
          </div>
          <div class="flex flex-col gap-1 w-full mt-3 lg:mt-0">
            <div class="text-customBlue-300 text-xl font-semibold">
              {{ dapp.name }}
            </div>
            <div class="text-customGray-625 text-sm">
              {{ this.$t('dapp.category') }}:<span class="ml-2">{{ dapp.category || 'DeFi' }}</span>
            </div>
            <div class="text-customGray-625 text-sm">
              {{ this.$t('dapp.description') }}:<span class="ml-2 text-black">{{ dapp.description }}</span>
            </div>
            <div class="text-customGray-625 text-sm mt-2 flex flex-col lg:flex-row lg:items-center">
              {{ this.$t('dapp.social') }}:
              <div class="flex items-center mt-3 lg:mt-0 lg:mx-4">
                <a v-for="(link, linkIndex) in socialLinks" :key="link.key" target="_blank" :href="link.link">
                  <img
                    :src="require(`@/assets/img/fns/com.${link.key}.png`)"
                    class="h-5.5 cursor-pointer hover:opacity-75 transition duration-200"
                    :class="{ 'ml-4': linkIndex !== 0 }"
                    :alt="link.key"
                  >
                </a>
              </div>
              <span class="lg:ml-auto mt-4 lg:mt-0">
                <el-button
                  v-if="dapp.officialWebSite"
                  size="medium"
                  type="primary"
                  class="share-btn text-xs lg:text-sm bg-main hover:bg-main border-main hover:border-main hover:opacity-75 transition duration-200 mr-1"
                  @click="accessDapp"
                >
                  {{ this.$t('dapp.accessDapp') }}
                </el-button>
                <el-button
                  type="primary"
                  size="medium"
                  class="share-btn text-xs lg:text-sm bg-main hover:bg-main border-main hover:border-main hover:opacity-75 transition duration-200 mr-1"
                  @click="openShare"
                >
                  {{ this.$t('dapp.share') }}
                </el-button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="dapp.tvl" class="bg-white rounded-md mt-4 pb-4">
      <div class="flex items-center justify-between border-b border-background px-4 lg:px-10 py-3">
        <span class="font-semibold text-sm lg:text-base">{{ $t('dapp.data') }}</span>
        <DurationSelect v-model="duration" />
      </div>
      <table class="w-full table-fixed mt-3 lg:table hidden">
        <thead class="text-gray-600 text-sm">
          <tr>
            <th class="font-normal text-left pl-10" style="width: 30%">
              {{ $t('home.fevmNavigation.defiListColumns.4') }}
            </th>
            <th class="font-normal text-left">
              {{ $t('home.fevmNavigation.defiListColumns.3') }}
            </th>
            <th class="font-normal text-left">
              {{ $t('home.fevmNavigation.defiListColumns.2') }}
            </th>
            <th class="font-normal text-left" style="width: 20%">
              {{ $t('home.fevmNavigation.defiListColumns.5') }}
            </th>
          </tr>
        </thead>
        <tbody class="text-center text-sm">
          <tr class="border-background h-10">
            <td class="text-left pl-10"><ChangeRate :data="formatNum(dapp.tvl.data)" :change-rate="dapp.tvl.changeRate" data-format="$% USD" /></td>
            <td class="text-left"><ChangeRate :data="formatNum(dapp.userCount.data)" :change-rate="dapp.userCount.changeRate" /></td>
            <td class="text-left"><ChangeRate :data="dapp.invokeCount.data" :change-rate="dapp.invokeCount.changeRate" /></td>
            <td class="text-left"><ChangeRate :data="formatNum(dapp.tokens.data)" :change-rate="dapp.tokens.changeRate" data-format="$% FIL" /></td>
          </tr>
        </tbody>
      </table>
      <ul class="block lg:hidden bg-white p-3 text-xs border-t border-customGray-100">
        <li
          v-for="item in [dapp]"
          :key="item.name"
          class="border-customGray-100 py-1.5"
        >
          <div class="flex justify-between items-center my-1.5">
            <span class="text-customGray-400">{{ $t('home.fevmNavigation.defiListColumns.1') }}</span>
            <span>{{ item.name }}</span>
          </div>
          <div class="flex justify-between items-center my-1.5">
            <span class="text-customGray-400">{{ $t('home.fevmNavigation.defiListColumns.2') }}</span>
            <ChangeRate :data="item.invokeCount.data" :change-rate="item.invokeCount.changeRate" />
          </div>
          <div class="flex justify-between items-center my-1.5">
            <span class="text-customGray-400">{{ $t('home.fevmNavigation.defiListColumns.3') }}</span>
            <ChangeRate :data="formatNum(item.userCount.data)" :change-rate="item.userCount.changeRate" />
          </div>
          <div class="flex justify-between items-center my-1.5">
            <span class="text-customGray-400">{{ $t('home.fevmNavigation.defiListColumns.4') }}</span>
            <ChangeRate :data="formatNum(item.tvl.data)" :change-rate="item.tvl.changeRate" data-format="$% USD" />
          </div>
          <div class="flex justify-between items-center my-1.5">
            <span class="text-customGray-400">{{ $t('home.fevmNavigation.defiListColumns.5') }}</span>
            <ChangeRate :data="formatNum(item.tokens.data)" :change-rate="item.tokens.changeRate" data-format="$% FIL" />
          </div>
        </li>
      </ul>
    </div>

    <div v-if="dapp.contractAddressList && dapp.contractAddressList.length" class="bg-white lg:rounded-md mt-4 lg:pb-4">
      <div class="flex items-center justify-between border-b border-background px-4 lg:px-10 py-3 font-semibold text-sm lg:text-base">
        {{ $t('dapp.smartContractList') }}
      </div>
      <table class="w-full table-fixed mt-3 lg:table hidden">
        <thead class="text-gray-600 text-sm">
          <tr>
            <th class="font-normal text-left pl-10">
              {{ $t('dapp.contractAddress') }}
            </th>
            <th class="font-normal">
              {{ $t('dapp.contractLabel') }}
            </th>
          </tr>
        </thead>
        <tbody class="text-center text-sm">
          <tr
            v-for="({ tag, contractAddress }, index) in dapp.contractAddressList"
            :key="contractAddress"
            :class="{ 'border-t': index != 0 }"
            class="border-background h-10"
          >
            <td class="text-left pl-10">
              <AddressLink :id="contractAddress" class="hover:text-main hover:underline" />
            </td>
            <td>{{ tag }}</td>
          </tr>
        </tbody>
      </table>
      <ul class="block lg:hidden bg-white p-3 text-xs border-t border-customGray-100">
        <li
          v-for="({ tag, contractAddress }, index) in dapp.contractAddressList"
          :key="contractAddress"
          :class="{ 'border-t': index != 0 }"
          class="border-customGray-100 py-1.5"
        >
          <div class="flex justify-between items-center my-1.5">
            <span class="text-customGray-400">{{ $t('dapp.contractAddress') }}</span>
            <span>{{ contractAddress }}</span>
          </div>
          <div class="flex justify-between items-center my-1.5">
            <span class="text-customGray-400">{{ $t('dapp.contractLabel') }}</span>
            <span>{{ tag }}</span>
          </div>
        </li>
      </ul>
    </div>

    <el-dialog
      :visible.sync="shareVisible"
      :show-close="false"
      custom-class="rounded-md lg:rounded-xl overflow-hidden w-11/12 lg:w-140"
    >
      <div slot="title" class="h-12 lg:h-13 bg-main text-white flex items-center justify-center">
        <span class="text-base lg:text-lg font-medium">{{ `${$t('dapp.share')} ${dapp.name}` }}</span>
        <i
          class="el-icon-error text-xl transition duration-200 cursor-pointer hover:opacity-75 absolute right-2"
          @click="shareVisible = false"
        ></i>
      </div>
      <div class="flex px-10 flex-col items-center">
        <img src="@/assets/img/dapp/shareBg.svg" />
        <div class="flex mb-5 lg:mb-3 lg:mr-4 ml-2 justify-center gap-5">
          <a v-for="plat in sharePlatform" :key="plat.key" :href="plat.link" target="_blank">
            <img
              :src="require(`@/assets/img/fns/com.${plat.key}.png`)"
              class="h-7 cursor-pointer hover:opacity-75 transition duration-200"
              :alt="plat.key"
            >
          </a>
        </div>
        <div class="bg-customGray-270 text-black px-5 py-2.5 mt-3 rounded">
          {{ currentUrl }}
        </div>
        <el-button
          size="medium"
          class="my-6 self-center text-xs lg:text-sm bg-main hover:bg-main border-main hover:border-main hover:opacity-75 transition duration-200 mr-1"
          type="primary"
          @click="copy"
        >
          {{ this.$t('dapp.copyLink') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import copy from '@/utils/copy'
import { formatNum } from '@/utils/dapp'
import { HOST } from '@/filecoin/filecoin.config'

export default {
  async asyncData({ $axios, error, params }) {
    try {
      const [category, key] = params.id.split('_')
      const apiUrl = category === 'defi'
        ? `/stats/defi/info/${key}`
        : `/dapp/info/${key}`

      const dapp = await $axios.$get(apiUrl)
      return { dapp }
    } catch (err) {
      if (err?.response) {
        if (err.response.code === 404) {
          error({ code: 404, message: `Dapp ${params.id} not found` })
        } else {
          error({ code: err.response.status, message: err.response.statusText })
        }
      } else {
        error({ code: 500, message: 'Server Error'() })
      }
    }
  },

  data() {
    return {
      dapp: {},
      duration: '24h',
      shareVisible: false,
      shareText: encodeURIComponent('Discover Filecoin Dapp on #Filfox')
    }
  },

  computed: {
    days() {
      return {
        '24h': 1,
        '7d': 7,
        '30d': 30,
        '1y': 365
      }[this.duration]
    },

    id() {
      const _id = this.$route.params.id
      return _id?.split('_')?.[1]
    },

    socialLinks() {
      return Object.entries(this.dapp)
        .filter(([k, v]) => /^.+Link$/.test(k) && v)
        .map(([key, val]) => ({ key: key.replace(/Link$/, ''), link: val }))
    },

    currentUrl() {
      return `${HOST}/dapp/${this.id}`
    },

    shareUrl() {
      return encodeURIComponent(this.currentUrl)
    },

    sharePlatform() {
      return [
        {
          key: 'twitter',
          link: `https://twitter.com/intent/tweet?text=${this.shareText}&url=${this.shareUrl}`
        },
        {
          key: 'telegram',
          link: `https://t.me/share?text=${this.shareText}&url=${this.shareUrl}`
        },
        {
          key: 'facebook',
          link: `https://www.facebook.com/sharer/sharer.php?description=${this.shareText}u=${this.shareUrl}`
        },
        {
          key: 'reddit',
          link: `http://www.reddit.com/submit?title=${this.shareText}&url=${this.shareUrl}`
        }
      ]
    }
  },

  watch: {
    days() {
      this.getDefiDapp()
    }
  },

  methods: {
    formatNum,

    async getDefiDapp() {
      this.dapp = await this.$axios.$get(`/stats/defi/info/${this.id}`, { params: { days: this.days } })
    },

    openShare() {
      this.shareVisible = true
    },

    copy() {
      copy(this.currentUrl)
      this.$message.success(this.$t('shared.copySuccess'))
    },

    accessDapp() {
      window.open(this.dapp.officialWebSite, '_blank')
    }
  },

  head() {
    return {
      title: `${this.$t('meta.titles.dapp')} ${this.id}`
    }
  }
}
</script>

<style lang="postcss">
.dapp-detail {
  .el-dialog__header {
    padding: 0;
  },
  & .el-dialog__body {
    padding: 0 !important;
  }
  .share-btn {
    padding: 8px 20px !important;
    font-weight: normal;
  }
}
</style>
