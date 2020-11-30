<template>
  <div class="bg-white lg:bg-transparent lg:container lg:mx-auto">
    <div
      v-if="sharing"
      v-loading="sharingLoading"
      element-loading-text="生成图片中..."
      element-loading-background="rgba(0, 0, 0, 0.71)"
      class="lg:hidden"
      style="height:70vh"
    >
      <RanksShare v-if="sharing" :loading="sharingLoading" :url="sharingImageURL" @didDismissAreaClicked="didDismissAreaClicked" />
    </div>
    <div
      v-if="sharing"
      v-loading="sharingLoading"
      element-loading-text="生成图片中..."
      element-loading-background="rgba(0, 0, 0, 0)"
      class="hidden lg:block my-4 bg-transparent"
      style="height:70vh"
    >
      <RanksShare v-if="sharing" :loading="sharingLoading" :url="sharingImageURL" @didDismissAreaClicked="didDismissAreaClicked" />
    </div>
    <div v-if="!sharing">
      <div class="lg:hidden">
        <div class="flex justify-between items-center">
          <HomeTitle type="minerRanks" />
          <button
            v-if="$i18n.locale == 'zh' && false"
            class="flex items-center border border-socialTagBg rounded-full px-2 mr-3 text-xs cursor-pointer hover:border-button"
            @click="didSharedBtnClicked"
          >
            <img src="~/assets/img/social/share.svg" class="h-2 mr-1">
            <span>分享</span>
          </button>
        </div>
        <div class="flex justify-between">
          <div class="flex w-full h-10 px-4 items-center relative">
            <el-tabs v-model="type" class="w-full text-sm">
              <el-tab-pane :label="$t('home.minerRanks.filters.qualityAdjPower')" name="power" />
              <el-tab-pane :label="$t('home.minerRanks.filters.blocks')" name="blocks" />
              <el-tab-pane :label="$t('home.minerRanks.filters.powerDelta')" name="power-growth" />
            </el-tabs>
            <DurationSelect v-if="category !== 'power'" v-model="duration" portable class="absolute right-0 bottom-0 mb-4 mr-4" />
          </div>
        </div>
      </div>

      <div class="mt-4 bg-white rounded-t-md hidden lg:block">
        <div class="border-b border-background">
          <div class="flex justify-between items-center">
            <HomeTitle type="minerRanks" />
            <button
              v-if="$i18n.locale == 'zh' && false"
              class="flex items-center border border-socialTagBg rounded-full px-3 py-1 mr-4 text-xs cursor-pointer hover:border-button"
              @click="didSharedBtnClicked"
            >
              <img src="~/assets/img/social/share.svg" class="h-3 mr-1">
              <span>分享</span>
            </button>
          </div>
          <div class="flex justify-between mb-2">
            <div class="flex h-12 ml-4 items-center">
              <el-row>
                <el-button
                  size="mini"
                  round
                  v-bind="category === 'power' ? {type: 'primary', plain: true, class: 'pointer-events-none'} : {}"
                  @click="e => didRanksTypeSwitched(e,'power')"
                >
                  {{ $t('home.minerRanks.filters.qualityAdjPower') }}
                </el-button>
                <el-button
                  size="mini"
                  round
                  v-bind="category === 'blocks' ? {type: 'primary', plain: true, class: 'pointer-events-none'} : {}"
                  @click="e => didRanksTypeSwitched(e,'blocks')"
                >
                  {{ $t('home.minerRanks.filters.blocks') }}
                </el-button>
                <el-button
                  size="mini"
                  round
                  v-bind="category === 'power-growth' ? {type: 'primary', plain: true, class: 'pointer-events-none'} : {}"
                  @click="e => didRanksTypeSwitched(e,'power-growth')"
                >
                  {{ $t('home.minerRanks.filters.powerDelta') }}
                </el-button>
              </el-row>
            </div>
            <div class="flex items-center">
              <el-select v-model="currentContinent" placeholder="" size="mini" class="mr-4">
                <el-option v-for="item in continents" :key="item.code" :label="item[$i18n.locale]" :value="item.code" />
              </el-select>
              <DurationSelect v-if="category !== 'power'" v-model="duration" class="flex items-center mr-4" />
            </div>
          </div>
        </div>
      </div>
      <div class=" bg-white lg:mb-4 lg:px-2 lg:rounded-b-md">
        <nuxt-child :duration="duration" :continent="currentContinent" />
      </div>
    </div>
  </div>
</template>

<script>
import { continents } from '@/filecoin/continent'
export default {
  data() {
    let type = null
    for (const route of this.$route.matched) {
      const matchResult = route.name?.match(/^ranks-(power-growth|power|blocks)/)
      if (matchResult) {
        type = matchResult[1]
        break
      }
    }
    return {
      duration: '24h',
      type,
      sharing: false,
      sharingImageURL: '',
      sharingLoading: false,
      continents,
      currentContinent: continents[0].code
    }
  },
  computed: {
    category() {
      for (const route of this.$route.matched) {
        const matchResult = route.name?.match(/^ranks-(power-growth|power|blocks)/)
        if (matchResult) {
          return matchResult[1]
        }
      }
      return null
    }
  },
  watch: {
    type() {
      this.$router.push(this.localePath(`/ranks/${this.type}`))
    }
  },
  methods: {
    didDismissAreaClicked() {
      this.sharing = false
    },
    didSharedBtnClicked() {
      this.sharing = true
      this.getRanksImage()
    },
    async getRanksImage() {
      this.sharingLoading = true
      const result = await this.$axios.$post(`/request-share/ranks/${this.category}`)
      this.sharingImageURL = result
      this.sharingLoading = false
    },
    didRanksTypeSwitched(e, category) {
      this.currentContinent = this.continents[0].code
      let node = e.target
      while (true) {
        if (node?.tagName?.toLowerCase() === 'button') {
          node.blur()
          break
        } else {
          node = node.parentElement
        }
      }
      this.$router.push(this.localePath(`/ranks/${category}`))
    }
  },
  head() {
    return {
      title: `${this.$t('meta.titles.ranks')}`
    }
  }
}
</script>
