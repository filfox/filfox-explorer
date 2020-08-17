<template>
  <div class="bg-white lg:bg-transparent lg:container lg:mx-auto">
    <div class="lg:hidden">
      <HomeTitle type="minerRanks" />
      <div class="flex justify-between">
        <div class="flex w-full h-10 px-4 items-center relative">
          <el-tabs class="w-full">
            <el-tab-pane :label="$t('home.minerRanks.filters.qualityAdjPower')" class="text-sm">
              <nuxt-link :to="localePath('/ranks/power')" class="block" />
            </el-tab-pane>
            <el-tab-pane :label="$t('home.minerRanks.filters.blocks')" class="text-sm">
              <nuxt-link :to="localePath('/ranks/blocks')" class="block" />
            </el-tab-pane>
            <el-tab-pane :label="$t('home.minerRanks.filters.powerDelta')" class="text-sm">
              <nuxt-link :to="localePath('/ranks/power-growth')" class="block" />
            </el-tab-pane>
          </el-tabs>
          <DurationSelect v-if="category !== 'power'" v-model="duration" portable class="absolute right-0 bottom-0 mb-4 mr-4" />
        </div>
      </div>
    </div>
    <div class="mt-4 bg-white rounded-md hidden lg:block">
      <div class="border-b border-background">
        <HomeTitle type="minerRanks" />
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
</template>

<script>
export default {
  data() {
    return {
      duration: '24h'
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
  head() {
    return {
      title: `${this.$t('meta.titles.ranks')}`
    }
  }
}
</script>
