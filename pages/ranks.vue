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
      <RanksShare :loading="sharingLoading" :sharing="sharing" :url="sharingImageURL" @didDismissAreaClicked="didDismissAreaClicked" />
    </div>
    <div
      v-if="sharing"
      v-loading="sharingLoading"
      element-loading-text="生成图片中..."
      element-loading-background="rgba(0, 0, 0, 0)"
      class="hidden lg:block my-4 bg-transparent"
      style="height:70vh"
    >
      <RanksShare :loading="sharingLoading" :sharing="sharing" :url="sharingImageURL" @didDismissAreaClicked="didDismissAreaClicked" />
    </div>
    <div v-if="!sharing">
      <div class="lg:hidden">
        <div class="flex justify-between items-center">
          <HomeTitle type="minerRanks" />
          <div v-if="$i18n.locale == 'zh'" class="flex items-center border border-socialTagBg rounded-full px-2 mr-3 text-xs cursor-pointer hover:border-button" @click="didSharedBtnClicked">
            <img src="~/assets/img/social/share.svg" class="h-2 mr-1">
            <span> 分享 </span>
          </div>
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

      <div class="mt-4 bg-white rounded-md hidden lg:block">
        <div class="border-b border-background">
          <div class="flex justify-between items-center">
            <HomeTitle type="minerRanks" />
            <div v-if="$i18n.locale == 'zh'" class="flex items-center border border-socialTagBg rounded-full px-3 py-1 mr-4 text-xs cursor-pointer hover:border-button" @click="didSharedBtnClicked">
              <img src="~/assets/img/social/share.svg" class="h-3 mr-1">
              <span> 分享 </span>
            </div>
          </div>
          <div class="flex justify-between mb-2">
            <div class="flex h-12 ml-4 items-center">
              <el-row>
                <el-button
                  size="mini"
                  round
                  v-bind="category === 'power' ? {type: 'primary', plain: true, class: 'pointer-events-none'} : {}"
                >
                  <nuxt-link :to="localePath('/ranks/power')">
                    {{ $t('home.minerRanks.filters.qualityAdjPower') }}
                  </nuxt-link>
                </el-button>
                <el-button
                  size="mini"
                  round
                  v-bind="category === 'blocks' ? {type: 'primary', plain: true, class: 'pointer-events-none'} : {}"
                >
                  <nuxt-link :to="localePath('/ranks/blocks')">
                    {{ $t('home.minerRanks.filters.blocks') }}
                  </nuxt-link>
                </el-button>
                <el-button
                  size="mini"
                  round
                  v-bind="category === 'power-growth' ? {type: 'primary', plain: true, class: 'pointer-events-none'} : {}"
                >
                  <nuxt-link :to="localePath('/ranks/power-growth')">
                    {{ $t('home.minerRanks.filters.powerDelta') }}
                  </nuxt-link>
                </el-button>
              </el-row>
            </div>
            <DurationSelect v-if="category !== 'power'" v-model="duration" class="flex items-center mr-4" />
          </div>
        </div>
      </div>
      <nuxt-child :duration="duration" />
    </div>
  </div>
</template>

<script>
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
      sharingLoading: false
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
      const result = await this.$axios.$post('/request-share/ranks')
      this.sharingImageURL = result
      this.sharingLoading = false
    }
  },
  head() {
    return {
      title: `${this.$t('meta.titles.ranks')}`
    }
  }
}
</script>
