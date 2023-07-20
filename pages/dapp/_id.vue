<template>
  <div class="container mx-auto flex-grow dappIdDialog">
    <div class="bg-white px-10 pb-8 rounded relative my-4">
      <div class="font-bold h-13 leading-13">Dapp Details</div>
      <div class="border-customBackground border-solid border-b absolute left-1 right-1 w-auto"></div>
      <div class="rounded shadow-panel flex p-5 lg:flex-row flex-col mt-8 relative">
        <img class="w-9 h-9 absolute top-0 right-0" :src="getMedalSrc(rank)" :class="`${rank > 0 && rank < 4 ? 'visible' : 'invisible'}`" />
        <div class="w-28 h-29 rounded-full bg-iconShadow flex items-center justify-center lg:mr-12 mr-0 flex-shrink-0">
          <img class="w-24 rounded-full" :src="dapp.logoPath" />
        </div>
        <div class="flex gap-1 flex-col">
          <div class="text-customBlue-300 text-xl font-bold">{{ dapp.name }}</div>
          <div class="text-customGray-650 text-sm">{{ this.$t('dapp.category') }}:<span class="ml-2">{{ dapp.category }}</span></div>
          <div class="text-customGray-650 text-sm">{{ this.$t('dapp.description') }}:<span class="ml-2">{{ dapp.description }}</span></div>
          <div class="text-customGray-650 text-sm mt-2 flex">{{ this.$t('dapp.social') }}:
            <div class="flex mb-5 lg:mb-3 lg:mr-4 ml-2">
              <a v-for="(link, linkIndex) in socialLinks" :key="link.key" target="_blank" :href="link.link">
                <img
                  :src="require(`@/assets/img/fns/com.${link.key}.png`)"
                  class="h-5.5 cursor-pointer hover:opacity-75 transition duration-200"
                  :class="{ 'ml-3': linkIndex !== 0 }"
                  :alt="link.key"
                >
              </a>
            </div>
          </div>
        </div>
        <div class="static lg:absolute right-2 bottom-2">
          <el-button v-if="dapp.officialWebSite" @click="accessDapp" type="primary" class="bg-customBlue-300 text-white border-transparent mr-2">{{ this.$t('dapp.accessDapp') }}</el-button>
          <el-button type="primary" @click="openShare" class="bg-customBlue-300 text-white border-transparent">{{ this.$t('dapp.share') }}</el-button>
        </div>
      </div>
    </div>
    <div class="bg-white rounded mt-5 mb-5">
      <div class="flex items-center justify-between border-b border-background px-8 py-3">
        <span class="font-bold text-lg">Data</span>
        <div class="text-sm">
          <FilterSelect
            class="mr-2.5" 
            :value="timeValue"
            :label="$t('home.dappRanks.titleHeader.time')" 
            :options="timeOptions" 
            @selected="selectTime"
          />
        </div>
      </div>
      <table class="w-full table-fixed mt-2 lg:table hidden">
        <thead class="text-gray-600 text-sm">
          <tr>
            <th>{{ $t('home.dappRanks.tableHeaders.contractBalance') }}</th>
            <th>{{ $t('home.dappRanks.tableHeaders.uniqueAdders') }}</th>
            <th>{{ $t('home.dappRanks.tableHeaders.transactionAmount') }}</th>
            <th>{{ $t('home.dappRanks.tableHeaders.transactionBalance') }}</th>
          </tr>
        </thead>
        <tbody class="text-center text-sm">
          <tr class="border-b border-background h-10">
            <td>
              <ChangeRate :data="dapp.balance.data | filecoin(2)" :changeRate="dapp.balance.changeRate" />
            </td>
            <td>
              <ChangeRate :data="formatNum(dapp.userCount.data)" :changeRate="dapp.userCount.changeRate" />
            </td>
            <td>
              <ChangeRate :data="formatNum(dapp.invokeCount.data)" :changeRate="dapp.invokeCount.changeRate" />
            </td>
            <td>
              <ChangeRate :data="dapp.totalFee.data | filecoin(2)" :changeRate="dapp.totalFee.changeRate" />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="w-full pb-2 mt-2 lg:hidden">
        <div class="border-background text-gray-600 text-sm px-4 grid grid-cols-2 gap-2">
          <span>{{ $t('home.dappRanks.tableHeaders.contractBalance') }}</span>
          <ChangeRate class="text-right text-black" :data="formatNum(dapp.balance.data)" :changeRate="dapp.balance.changeRate" />
          <span>{{ $t('home.dappRanks.tableHeaders.uniqueAdders') }}</span>
          <ChangeRate class="text-right text-black" :data="dapp.userCount.data" :changeRate="dapp.userCount.changeRate" />
          <span>{{ $t('home.dappRanks.tableHeaders.transactionAmount') }}</span>
          <ChangeRate class="text-right text-black" :data="dapp.invokeCount.data" :changeRate="dapp.invokeCount.changeRate" />
          <span>{{ $t('home.dappRanks.tableHeaders.transactionBalance') }}</span>
          <ChangeRate class="text-right text-black" :data="dapp.totalFee.data" :changeRate="dapp.totalFee.changeRate" />
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="shareVisible"
      :title="this.$t('dapp.share')"
      center
    >
      <div class="flex px-24 flex-col items-center">
        <img src="@/assets/img/dapp/shareBg.svg" />
        <div class="flex flex-col gap-4 relative -top-6">
          <div class="flex mb-5 lg:mb-3 lg:mr-4 ml-2 justify-center gap-5">
            <a v-for="plat in sharePlatform" :key="plat.key" :href="plat.link" target="_blank">
              <img
                :src="require(`@/assets/img/fns/com.${plat.key}.png`)"
                class="h-7 cursor-pointer hover:opacity-75 transition duration-200"
                :alt="plat.key"
              >
            </a>
          </div>
          <div class="bg-customGray-270 text-black px-10 py-3 rounded-sm">{{ currentUrl }}</div>
          <el-button class="self-center bg-customBlue-300 text-white border-transparent" type="primary" @click="copy">{{ this.$t('dapp.copyLink') }}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import copy from '@/utils/copy';
import { getMedalSrc, formatNum } from'@/utils/dapp';
import { DOMAIN } from '@/filecoin/filecoin.config';

export default {
  async asyncData({ $axios, error, params }) {
    try {
      const dapp = await $axios.$get(`https://filfox.info/api/xj/stats/dapp/${params.id}`)
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
      shareVisible: false,
      timeValue: 1,
      shareText: encodeURIComponent('Discover Filecoin Dapp on #Filfox'),
      timeOptions: [
        {
          value: 1,
          label: this.$t('home.dappRanks.tableFilterOptions.time.day')
        },
        {
          value: 7,
          label: this.$t('home.dappRanks.tableFilterOptions.time.week')
        },
        {
          value: 30,
          label: this.$t('home.dappRanks.tableFilterOptions.time.month')
        },
        {
          value: 365,
          label: this.$t('home.dappRanks.tableFilterOptions.time.year')
        }
      ]
    }
  },
  methods: {
    getMedalSrc,
    formatNum,
    selectTime(value) {
      this.timeValue = value;
      this.getDappList(value);
    },
    async getDappList(time) {
      this.dapp = await this.$axios.$get(`https://filfox.info/api/xj/stats/dapp/${this.id}`, { params: {days: time} });
    },
    openShare() {
      this.shareVisible = true;
    },
    copy() {
      copy(this.currentUrl);
      this.$notify({
        title: '提示',
        message: '复制成功',
        type: 'success'
      });
    },
    accessDapp() {
      window.open(this.dapp.officialWebSite, "_blank");
    }
  },
  computed: {
    id() {
      return Number(this.$route.params.id)
    },
    rank() {
      return this.$store.state.dapp.rank;
    },
    socialLinks() {
      const links = [];
      if(this.dapp.twitterLink) {
        links.push({
          key: 'twitter',
          link: this.dapp.twitterLink
        });
      }

      if(this.dapp.telegramLink) {
        links.push({
          key: 'telegram',
          link: this.dapp.telegramLink
        });
      }

      if(this.dapp.discordLink) {
        links.push({
          key: 'discord',
          link: this.dapp.discordLink
        });
      }

      if(this.dapp.githubLink) {
        links.push({
          key: 'github',
          link: this.dapp.githubLink
        });
      }

      if(this.dapp.mediumLink) {
        links.push({
          key: 'medium',
          link: this.dapp.mediumLink
        });
      }

      if(this.dapp.youtubeLink) {
        links.push({
          key: 'youtube',
          link: this.dapp.youtubeLink
        });
      }
      return links;
    },
    currentUrl() {
      return `${DOMAIN}/dapp/${this.id}`;
    },
    shareUrl() {
      return encodeURIComponent(this.currentUrl);
    },
    sharePlatform() {
      return [
        {
          key: 'twitter',
          link: `https://twitter.com/intent/tweet?text=${this.shareText}&url=${this.shareUrl}`
        }, {
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
  head() {
    return {
      title: `${this.$t('meta.titles.dapp')} ${this.id}`
    }
  }
}
</script>

<style lang="postcss">
.dappIdDialog .el-dialog__header {
  background: #1950C9;
  border-radius: 10px 10px 0 0;
}

.dappIdDialog .el-dialog {
  border-radius: 10px;
  width: fit-content;
}

.dappIdDialog .el-dialog__title {
  color: white;
  font-size: 24px;
  font-weight: 700;
}

.dappIdDialog .el-dialog__headerbtn .el-dialog__close {
  color: #1950C9;
  background: white;
  border-radius: 10px;
  font-weight: 600;
}

.dappIdDialog .el-dialog--center .el-dialog__body {
  padding: 0px 25px;
}
</style>
