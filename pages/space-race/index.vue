<template>
  <div class="bg-spaceRace flex-grow flex-col hidden lg:flex">
    <div class="container mx-auto px-10 mt-2">
      <img v-if="$i18n.locale === 'zh'" src="~/assets/img/space-race/header-zh.png" alt="header" class="w-full mx-auto">
      <img v-else src="~/assets/img/space-race/header-en.png" alt="header" class="w-full mx-auto">
    </div>

    <CountDown :timestamp="overview.deadline" />

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
      <p class="py-4 pl-4 font-medium">
        {{ $t('spaceRace.ranks.title') }}
      </p>
      <div class="flex flex-row items-center pb-4 px-4 border-b border-background">
        <div v-for="item in continents" :key="item.code" class="rounded-full px-3 text-sm mr-3 border cursor-pointer hover:text-spaceRace hover:border-spaceRace" :class="{'text-spaceRace border-spaceRace':currentRankRegion === item.code}" @click="didRankRegionSwitched(item.code)">
          {{ item[$i18n.locale] }}
        </div>
      </div>
      <div class="px-4 text-sm my-2">
        <table v-loading="loading" class="w-full table-auto">
          <thead class="text-gray-600">
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
              <th>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(entity,index) in ranks.entities">
              <tr :key="index" class="text-center border-b border-background h-10">
                <td>
                  {{ currentRankRegion === 'All' ? (entity.globalRank || '--') : (entity.regionRank || '--') }}
                </td>
                <td>
                  {{ entity.name }}
                </td>
                <td>
                  {{ getContinentNameByCode(entity.region) }}
                </td>
                <td>
                  {{ entity.addresses.length }}
                </td>
                <td>
                  {{ entity.power | size_metric(2) }}
                </td>
                <td>
                  {{ entity.globalReward ? entity.globalReward.toFixed(2) : 'N/A' }} FIL
                </td>
                <td>
                  {{ entity.regionReward ? entity.regionReward.toFixed(2) : 'N/A' }} FIL
                </td>
                <td>
                  {{ entity.blockReward ? entity.blockReward.toFixed(2): 'N/A' }} FIL
                </td>
                <td>
                  <div>
                    <img src="~/assets/img/space-race/expand.svg" alt="expand" class="w-4">
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <div class="container mx-auto rounded-md bg-white overflow-hidden my-4">
      <p class="py-2 border-b border-background pl-4 font-medium">
        {{ $t('spaceRace.distribution.title') }}
      </p>
      <SrMap map-width="100%" map-height="600px" />
      <div class="grid grid-cols-3 gap-6 px-4 my-6 mx-4">
        <div v-for="(r,index) in overview.regions" :key="index" class="border border-background rounded-sm hover:shadow text-sm px-4">
          <p class=" font-medium py-2">
            {{ getContinentNameByCode(r.id) }}
          </p>
          <div class="flex justify-between">
            <span class="text-gray-600"> {{ $t('spaceRace.distribution.headers.unlockRewards') }}: </span>
            <span> {{ getRewardsByPower(r.totalPower) }} </span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-gray-600"> {{ $t('spaceRace.distribution.headers.rawBytePower') }}: </span>
            <span> {{ r.totalPower | size_metric(2) }} </span>
          </div>
          <div class="flex justify-between pb-2">
            <span class="text-gray-600"> {{ $t('spaceRace.distribution.headers.activeMiners') }}: </span>
            <span> {{ r.activeMiners }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
      region: 'All', // for overview
      continents,
      currentRankRegion: 'All', // for ranks
      ranks: {},
      page: 0,
      pageSize: 20,
      loading: false
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
    this.getRanks()
  },
  methods: {
    async getRanks() {
      this.loading = true
      const params = this.currentRankRegion === 'All' ? { pageSize: this.pageSize, page: this.page } : { pageSize: this.pageSize, page: this.page, region: this.currentRankRegion }
      this.ranks = await this.$axios.$get(`/space-race/entities`, { params })
      this.loading = false
    },
    didRankRegionSwitched(code) {
      this.currentRankRegion = code
      this.getRanks()
    },
    getRewardsByPower(power) {
      const tib = 1099511627776
      const pib = 1125899906842624
      if (power - 10 * tib < 0) {
        return '0 FIL'
      } else if (power - 100 * tib < 0) {
        return '25k FIL'
      } else if (power - pib < 0) {
        return '50k FIL'
      } else if (power - 5 * pib < 0) {
        return '100k FIL'
      } else if (power - 10 * pib < 0) {
        return '250k FIL'
      } else {
        return '500k FIL'
      }
    },
    getContinentNameByCode(code) {
      for (const continent of this.continents) {
        if (code === continent.code) {
          return continent[this.$i18n.locale]
        }
      }
      return 'N/A'
    }
  },
  head() {
    return {
      title: this.$t('spaceRace.title')
    }
  }
}
</script>>
