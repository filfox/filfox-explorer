<template>
  <div class="bg-spaceRace flex-grow flex-col hidden lg:flex">
    <div class="container mx-auto px-10 mt-2">
      <img v-if="$i18n.locale === 'zh'" src="~/assets/img/space-race/header-zh.png" alt="header" class="w-full mx-auto">
      <img v-else src="~/assets/img/space-race/header-en.png" alt="header" class="w-full mx-auto">
    </div>

    <div class="flex flex-row justify-center items-center mb-2">
      <div class="mx-2 text-center text-white">
        <div class="countDown">
          12
        </div>
        <p class="mt-1">
          {{ $t('shared.time.day') }}
        </p>
      </div>
      <div class="mx-2 text-center text-white">
        <div class="countDown">
          01
        </div>
        <p class="mt-1">
          {{ $t('shared.time.hour') }}
        </p>
      </div>
      <div class="mx-2 text-center text-white">
        <div class="countDown">
          22
        </div>
        <p class="mt-1">
          {{ $t('shared.time.min') }}
        </p>
      </div>
      <div class="mx-2 text-center text-white">
        <div class="countDown">
          30
        </div>
        <p class="mt-1">
          {{ $t('shared.time.sec') }}
        </p>
      </div>
    </div>

    <div class="bg-white container mx-auto rounded-md overflow-hidden">
      <div class="px-4 py-3 border-b border-background flex flex-row justify-between items-center">
        <p class=" font-medium">
          {{ $t('spaceRace.overview.title') }}
        </p>
        <el-select v-model="region" placeholder="" size="mini">
          <el-option v-for="item in continents" :key="item.code" :label="item[$i18n.locale]" :value="item.code" />
        </el-select>
      </div>

      <div class="my-2 mx-10">
        <SrSteps :type="region === 'All' ? 'global' :'continent'" :current-power="Number(rawBytePower)" />
      </div>

      <div class="grid grid-cols-4 gap-4 px-4 mt-16 mb-4">
        <div class="shadow-md rounded py-6 border-t border-background">
          <p class="text-xs text-center pt-4 pb-2">
            {{ $t('spaceRace.overview.headers.rawBytePower') }}
          </p>
          <div class="text-base text-center text-main font-bold">
            {{ rawBytePower | size_metric(2) }}
          </div>
          <p v-if="region !== 'All'" class="text-xs text-center pt-2">
            {{ $t('spaceRace.ratio') }}: {{ (rawBytePower / overview.totalPower) | percentage }}
          </p>
        </div>
        <div class="shadow-md rounded py-6 border-background border-t">
          <p class="text-xs text-center pt-4 pb-2">
            {{ $t('spaceRace.overview.headers.activeMiner') }}
          </p>
          <div class="text-base text-center text-main font-bold">
            {{ activeMiners }}
          </div>
          <p v-if="region !== 'All'" class="text-xs text-center pt-2">
            {{ $t('spaceRace.ratio') }}: {{ (activeMiners / overview.activeMiners) | percentage }}
          </p>
        </div>
        <div class="shadow-md rounded py-6 border-background border-t">
          <p class="text-xs text-center pt-4 pb-2">
            {{ $t('spaceRace.overview.headers.qualifiedMiners') }}
          </p>
          <div class="text-base text-center text-main font-bold">
            {{ eligibleMiners }}
          </div>
          <p v-if="region !== 'All'" class="text-xs text-center pt-2">
            {{ $t('spaceRace.ratio') }}: {{ (eligibleMiners / overview.eligibleMiners) | percentage }}
          </p>
        </div>
        <div class="shadow-md rounded py-6 border-background border-t">
          <p class="text-xs text-center pt-4 pb-2">
            {{ $t('spaceRace.overview.headers.entity') }}
          </p>
          <div class="text-base text-center text-main font-bold">
            {{ entityCount }}
          </div>
          <p v-if="region !== 'All'" class="text-xs text-center pt-2">
            {{ $t('spaceRace.ratio') }}: {{ (entityCount / overview.entityCount) | percentage }}
          </p>
        </div>
      </div>
    </div>

    <div class="bg-white container mx-auto rounded-md overflow-hidden mt-4">
      <p class="py-2 border-b border-background pl-4 font-medium">
        {{ $t('spaceRace.ranks.title') }}
      </p>
      <div class="flex flex-row items-center pt-3 pb-6 px-4 border-b border-background">
        <div v-for="item in continents" :key="item.code" class="rounded-full px-3 text-sm mr-3 border cursor-pointer hover:text-spaceRace hover:border-spaceRace" :class="{'text-spaceRace border-spaceRace':currentRankRegion === item.code}" @click="didRankRegionSwitched(item.code)">
          {{ item[$i18n.locale] }}
        </div>
      </div>
      <div class="px-4 text-sm my-2">
        <table class="w-full">
          <tr>
            <th>
              {{ $t('spaceRace.ranks.headers.rank') }}
            </th>
            <th>
              {{ $t('spaceRace.ranks.headers.entity') }}
            </th>
            <th>
              {{ $t('spaceRace.ranks.headers.area') }}
            </th>
            <th>
              {{ $t('spaceRace.ranks.headers.minerCount') }}
            </th>
            <th>
              {{ $t('spaceRace.ranks.headers.rawBytePower') }}
            </th>
            <th>
              {{ $t('spaceRace.ranks.headers.estimatedTotalReward') }}
            </th>
            <th>
              {{ $t('spaceRace.ranks.headers.estimatedRegionRewards') }}
            </th>
            <th>
              {{ $t('spaceRace.ranks.headers.estimatedBlockRewards') }}
            </th>
          </tr>
          <tbody>
            <td>
            </td>
          </tbody>
        </table>
      </div>
    </div>

    <div class="container mx-auto rounded-md bg-white overflow-hidden my-4">
      <p class="py-2 border-b border-background pl-4 font-medium">
        {{ $t('spaceRace.distribution.title') }}
      </p>
      <SrMap map-width="100%" map-height="600px" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.countDown {
  @apply rounded w-10 h-10 text-xl font-bold justify-center flex items-center shadow;
  background-image: linear-gradient(#0638AC,#012F9C)
}
</style>

<script>
import { continents } from '@/filecoin/continent'
export default {
  async asyncData({ $axios, error }) {
    try {
      const overview = await $axios.$get('/space-race/overview')
      return { overview }
    } catch (err) {
      if (err?.response) {
        error({ code: err.response.status, message: err.response.statusText })
      } else {
        error({ code: 500, message: 'Server Error'() })
      }
    }
  },
  data() {
    return {
      overview: {},
      region: 'All',
      continents,
      currentRankRegion: 'All'
    }
  },
  computed: {
    rawBytePower() {
      if (this.region === 'All') {
        return this.overview.totalPower
      } else {
        for (const region of this.overview.regions) {
          if (region.id === this.region) {
            return region.totalPower
          }
        }
        return null
      }
    },
    activeMiners() {
      if (this.region === 'All') {
        return this.overview.activeMiners
      } else {
        for (const region of this.overview.regions) {
          if (region.id === this.region) {
            return region.activeMiners
          }
        }
        return null
      }
    },
    eligibleMiners() {
      if (this.region === 'All') {
        return this.overview.eligibleMiners
      } else {
        for (const region of this.overview.regions) {
          if (region.id === this.region) {
            return region.eligibleMiners
          }
        }
        return null
      }
    },
    entityCount() {
      if (this.region === 'All') {
        return this.overview.entityCount
      } else {
        for (const region of this.overview.regions) {
          if (region.id === this.region) {
            return region.entityCount
          }
        }
        return null
      }
    }
  },
  mounted() {

  },
  methods: {
    didRankRegionSwitched(code) {
      this.currentRankRegion = code
    }
  },
  head() {
    return {
      title: this.$t('spaceRace.title')
    }
  }
}
</script>>
