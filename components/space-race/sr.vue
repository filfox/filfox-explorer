<template>
  <div class="bg-spaceRace flex-grow flex-col">
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
        <el-select v-model="region" placeholder="" size="mini" @change="didRankRegionSwitched">
          <el-option v-for="item in continents" :key="item.code" :label="item[$i18n.locale]" :value="item.code" />
        </el-select>
      </div>

      <div class="my-2 mx-10">
        <SrSteps :type="region === 'All' ? 'global' :'continent'" :current-power="Number(rawBytePower)" />
      </div>

      <div class="grid grid-cols-4 gap-4 px-4 mt-16 mb-4">
        <div class="shadow-md rounded py-6 border-t border-background">
          <p class="text-xs text-center pb-2">
            {{ $t('spaceRace.overview.headers.rawBytePower') }}
          </p>
          <div class="text-xl text-center text-main font-bold">
            {{ rawBytePower | size_metric(2) }}
          </div>
          <p v-if="region !== 'All'" class="text-xs text-center pt-2">
            {{ $t('spaceRace.ratio') }}: {{ (rawBytePower / overview.totalPower) | percentage }}
          </p>
        </div>
        <div class="shadow-md rounded py-6 border-background border-t">
          <div class="flex items-center justify-center text-xs text-center pb-2">
            <span>{{ $t('spaceRace.overview.headers.activeMiner') }}</span>
            <Tip class="mx-1" :content="$t('spaceRace.ranks.tips.activeMiners')" />
          </div>
          <div class="text-xl text-center text-main font-bold">
            {{ activeMiners }}
          </div>
          <p v-if="region !== 'All'" class="text-xs text-center pt-2">
            {{ $t('spaceRace.ratio') }}: {{ (activeMiners / overview.activeMiners) | percentage }}
          </p>
        </div>
        <div class="shadow-md rounded py-6 border-background border-t">
          <div class="flex items-center justify-center text-xs text-center pb-2">
            <span>{{ $t('spaceRace.overview.headers.qualifiedMiners') }}</span>
            <Tip class="mx-1" :content="$t('spaceRace.ranks.tips.qualifiedMiners')" />
          </div>
          <div class="text-xl text-center text-main font-bold">
            {{ eligibleMiners }}
          </div>
          <p v-if="region !== 'All'" class="text-xs text-center pt-2">
            {{ $t('spaceRace.ratio') }}: {{ (eligibleMiners / overview.eligibleMiners) | percentage }}
          </p>
        </div>
        <div class="shadow-md rounded py-6 border-background border-t">
          <div class="flex items-center justify-center text-xs text-center pb-2">
            <span>{{ $t('spaceRace.overview.headers.entity') }}</span>
            <Tip class="mx-1" :content="$t('spaceRace.ranks.tips.registeredEntities')" />
          </div>
          <div class="text-xl text-center text-main font-bold">
            {{ entityCount }}
          </div>
          <p v-if="region !== 'All'" class="text-xs text-center pt-2">
            {{ $t('spaceRace.ratio') }}: {{ (entityCount / overview.entityCount) | percentage }}
          </p>
        </div>
      </div>
    </div>

    <div class="bg-white container mx-auto rounded-md mt-4">
      <p class="py-4 pl-4 font-medium">
        {{ $t('spaceRace.ranks.title') }}
      </p>
      <div class="flex flex-row items-center pb-4 px-4 border-b border-background">
        <div v-for="item in continents" :key="item.code" class="rounded-full px-3 text-sm mr-3 border cursor-pointer hover:text-spaceRace hover:border-spaceRace" :class="{'text-spaceRace border-spaceRace':region === item.code}" @click="didRankRegionSwitched(item.code)">
          {{ item[$i18n.locale] }}
        </div>
      </div>
      <div class="px-4 text-sm my-2">
        <table v-loading="loading" class="w-full table-auto">
          <thead class="text-gray-600">
            <tr class="h-10 ">
              <th class="sticky z-10 top-0 bg-white">
                {{ $t('spaceRace.ranks.headers.rank') }}
              </th>
              <th class="sticky z-10 top-0 bg-white">
                {{ $t('spaceRace.ranks.headers.entity') }}
              </th>
              <th class="sticky z-10 top-0 bg-white">
                {{ $t('spaceRace.ranks.headers.minerCount') }}
              </th>
              <th class="sticky z-10 top-0 bg-white">
                {{ $t('spaceRace.ranks.headers.rawBytePower') }}
              </th>
              <th class="sticky z-10 top-0 bg-white">
                <div class="flex items-center justify-center">
                  <span>{{ $t('spaceRace.ranks.headers.estimatedGlobalReward') }}</span>
                  <Tip class="mx-1" :content="$t('spaceRace.ranks.tips.estimatedGlobalReward')" />
                </div>
              </th>
              <th class="sticky z-10 top-0 bg-white">
                <div class="flex items-center justify-center">
                  <span>{{ $t('spaceRace.ranks.headers.estimatedRegionRewards') }}</span>
                  <Tip class="mx-1" :content="$t('spaceRace.ranks.tips.estimatedRegionRewards')" />
                </div>
              </th>
              <th class="sticky z-10 top-0 bg-white">
                <div class="flex items-center justify-center">
                  <span>{{ $t('spaceRace.ranks.headers.estimatedBlockRewards') }}</span>
                  <Tip class="mx-1" :content="$t('spaceRace.ranks.tips.estimatedBlockRewards')" />
                </div>
              </th>
              <th class="sticky z-10 top-0 bg-white">
                <div class="flex items-center justify-center">
                  <span>{{ $t('spaceRace.ranks.headers.totalReward') }}</span>
                  <Tip class="mx-1" :content="$t('spaceRace.ranks.tips.totalReward')" />
                </div>
              </th>
              <th class="sticky z-10 top-0 bg-white">
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(entity,index) in ranks.entities">
              <tr
                :key="index + 1"
                class="text-center border-b border-background h-10 cursor-pointer  hover:bg-background"
                @click="didRowClicked(index+1)"
              >
                <td>
                  <div class="flex justify-center">
                    <img v-if="(region === 'All' ? (entity.globalRank || '--') : (entity.regionRank || '--')) === 1" src="~/assets/img/home/first.png" alt="1" class="w-6">
                    <img v-else-if="(region === 'All' ? (entity.globalRank || '--') : (entity.regionRank || '--')) === 2" src="~/assets/img/home/second.png" alt="2" class="w-6">
                    <img v-else-if="(region === 'All' ? (entity.globalRank || '--') : (entity.regionRank || '--')) === 3" src="~/assets/img/home/third.png" alt="3" class="w-6">
                    <span v-else>  {{ region === 'All' ? (entity.globalRank || '--') : (entity.regionRank || '--') }} </span>
                  </div>
                </td>
                <td>
                  {{ entity.name ? entity.name : entity.addresses[0].address }}
                </td>
                <td>
                  {{ entity.addresses.length }}
                </td>
                <td>
                  {{ entity.power | size_metric(2) }} / {{ entity.power === 0 ? '0%' : (region === 'All' ? (entity.power * 100 / overview.totalPower).toFixed(2) : (entity.power * 100 / rawBytePower).toFixed(2)) }}%
                </td>
                <td>
                  {{ entity.globalReward ? entity.globalReward.toFixed(2) : '0' }} FIL
                </td>
                <td>
                  {{ entity.regionReward ? entity.regionReward.toFixed(2) : '0' }} FIL
                </td>
                <td>
                  {{ entity.blockReward ? entity.blockReward.toFixed(2) : '0' }} FIL
                </td>
                <td>
                  {{ ((entity.globalReward ? entity.globalReward : 0) + (entity.regionReward ? entity.regionReward : 0) + (entity.blockReward ? entity.blockReward : 0) + (entity.smallMinerReward ? entity.smallMinerReward : 0)).toFixed(2) }} FIL
                </td>
                <td>
                  <img
                    src="~assets/img/space-race/expand.svg"
                    alt="expand"
                    class="w-4"
                    :class="{'is-rotate': expandedRow && expandedRow === index + 1}"
                  >
                </td>
              </tr>
              <tr v-if="expandedRow && expandedRow === index + 1" :key="-(index + 1)" class="border-b border-background">
                <td colspan="9">
                  <div>
                    <div class=" border border-background rounded-sm my-1">
                      <div class="flex justify-between mx-4">
                        <div class="w-1/2 mr-2">
                          <div class="grid grid-cols-4 gap-4 bg-background my-2 p-2 rounded">
                            <div class="p-1">
                              <p class="text-xs font-medium text-gray-600">
                                {{ $t('spaceRace.ranks.headers.dailyPowerDelta') }}
                              </p>
                              <p class="text-base">
                                {{ entity.powerGrowth | size_metric(2) }} / {{ $t('shared.time.day') }}
                              </p>
                            </div>
                            <div class="p-1">
                              <p class="text-xs font-medium text-gray-600">
                                {{ $t('spaceRace.ranks.headers.totalBlockNums') }}
                              </p>
                              <p class="text-base">
                                {{ entity.blocksMined }}
                              </p>
                            </div>
                            <div class="p-1">
                              <p class="text-xs font-medium text-gray-600">
                                {{ $t('spaceRace.ranks.headers.area') }}
                              </p>
                              <p class="text-base">
                                {{ getContinentNameByCode(entity.region) }}
                              </p>
                            </div>
                            <div class="p-1">
                              <p class="text-xs font-medium text-gray-600">
                                {{ $t('spaceRace.ranks.headers.equivalentMiners') }}
                              </p>
                              <p class="text-base">
                                {{ Number(entity.equivalentMiners).toFixed(2) }}
                              </p>
                            </div>
                            <div class="p-1">
                              <p class="text-xs font-medium text-gray-600">
                                {{ $t('spaceRace.ranks.headers.dealSuccessRate') }}
                              </p>
                              <p class="text-base" :class="{'text-red-600' : entity.dealSuccessRate.store < 0.8}">
                                {{ entity.dealSuccessRate.store | percentage }}
                              </p>
                            </div>
                            <div class="p-1">
                              <p class="text-xs font-medium text-gray-600">
                                {{ $t('spaceRace.ranks.headers.retrievalDealSuccessRate') }}
                              </p>
                              <p class="text-base" :class="{'text-red-600' : entity.dealSuccessRate.retrieve < 0.8}">
                                {{ entity.dealSuccessRate.retrieve | percentage }}
                              </p>
                            </div>
                            <div class="p-1">
                              <p class="text-xs font-medium text-gray-600">
                                {{ $t('spaceRace.ranks.headers.sectorLifeCycle') }}
                              </p>
                              <p class="text-base" :class="{'text-red-600' : !entity.storageLifecycle}">
                                {{ entity.storageLifecycle ? $t('spaceRace.ranks.headers.done') : 'N/A' }}
                              </p>
                            </div>
                            <div class="p-1">
                              <div class="flex items-center justify-start text-xs font-medium text-gray-600">
                                <span>{{ $t('spaceRace.ranks.headers.smallMinerReward') }}</span>
                                <Tip class="mx-1" :content="$t('spaceRace.ranks.tips.smallMinerReward')" />
                              </div>
                              <p class="text-base">
                                {{ entity.smallMinerReward ? entity.smallMinerReward : 0 }} FIL
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="bg-background w-1/2 my-2 rounded ml-2 pt-1 pb-2">
                          <table class="w-full">
                            <thead>
                              <tr class="h-8 text-xs text-gray-600">
                                <th>
                                  {{ $t('spaceRace.ranks.headers.miner') }}
                                </th>
                                <th>
                                  {{ $t('spaceRace.ranks.headers.rawBytePower') }}
                                </th>
                                <th>
                                  {{ $t('spaceRace.ranks.headers.blockNums') }}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(address,i) in entity.addresses" :key="i" class="text-center">
                                <td class="py-1">
                                  <AddressLink :id="address.address" />
                                </td>
                                <td class="py-1">
                                  {{ address.power | size_metric(2) }} / {{ (address.power / entity.power) | percentage }}
                                </td>
                                <td class="py-1">
                                  {{ address.blocksMined }} / {{ address.blocksMined === 0 ? 0 : (address.blocksMined / entity.blocksMined) | percentage }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div class="flex items-center text-center h-16">
          <el-pagination
            layout="prev, pager, next"
            :page-count="totalPageCount"
            :current-page="page + 1"
            class="mx-auto"
            @current-change="didCurrentPageChanged"
          />
        </div>
      </div>
    </div>

    <div class="container mx-auto rounded-md bg-white overflow-hidden my-4">
      <p class="py-2 border-b border-background pl-4 font-medium">
        {{ $t('spaceRace.distribution.title') }}
      </p>
      <SrMap map-width="100%" map-height="600px" :popups="mapPopups" />
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

<style scoped>

.is-rotate {
  animation: rotation 0.5s ease-in-out alternate forwards;
}

@keyframes rotation {
  0% {
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  transform: rotate(0deg);
  }
  100% {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
  }
}

</style>

<script>
import { continents } from '@/filecoin/continent'
export default {
  props: {
    overview: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      region: 'All', // for overview
      continents,
      ranks: {},
      page: 0,
      pageSize: 20,
      total: 0,
      loading: false,
      expandedRow: null
    }
  },
  computed: {
    mapPopups() {
      const popups = {}
      for (const region of this.overview.regions) {
        popups[region.id] = `${this.$t('spaceRace.overview.headers.unlockRewards')}: ${this.getRewardsByPower(region.totalPower)}<br/>
        ${this.$t('spaceRace.distribution.headers.activeMiners')}: ${region.activeMiners}<br/>
        ${this.$t('spaceRace.overview.headers.qualifiedMiners')}: ${region.eligibleMiners}<br/>
        ${this.$t('spaceRace.overview.headers.entity')}: ${region.entityCount}`
      }
      return popups
    },
    totalPageCount() {
      return Math.ceil(this.total / this.pageSize)
    },
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
      const params = this.region === 'All' ? { pageSize: this.pageSize, page: this.page } : { pageSize: this.pageSize, page: this.page, region: this.region }
      this.ranks = await this.$axios.$get(`/space-race/entities`, { params })
      this.expandedRow = null
      this.total = this.ranks.totalCount
      this.loading = false
    },
    didRankRegionSwitched(code) {
      this.page = 0
      this.total = 0
      this.region = code
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
    },
    didRowClicked(index) {
      if (this.expandedRow === index) {
        this.expandedRow = null
        return
      }
      this.expandedRow = index
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      this.getRanks()
    }
  }
}
</script>>
