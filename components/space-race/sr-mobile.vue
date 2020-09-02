<template>
  <div class="bg-spaceRace flex-grow flex-col">
    <div class="container mx-auto px-2 my-2">
      <img v-if="$i18n.locale === 'zh'" src="~/assets/img/space-race/header-zh.png" alt="header" class="w-full mx-auto">
      <img v-else src="~/assets/img/space-race/header-en.png" alt="header" class="w-full mx-auto">
    </div>

    <CountDown :timestamp="overview.deadline" />

    <div class="bg-white rounded-md overflow-hidden mx-2">
      <div class="px-4 py-3 border-b border-background flex flex-row justify-between items-center">
        <p class="text-sm font-medium">
          {{ $t('spaceRace.overview.title') }}
        </p>
        <el-select v-model="region" placeholder="" size="mini" @change="didRankRegionSwitched">
          <el-option v-for="item in continents" :key="item.code" :label="item[$i18n.locale]" :value="item.code" />
        </el-select>
      </div>

      <div class="my-2 mx-6">
        <SrStepsMobile :type="region === 'All' ? 'global' :'continent'" :current-power="Number(rawBytePower)" />
      </div>

      <div class="text-xs mt-16 border-t border-background border-dashed p-2">
        <div class="flex justify-between items-center mb-1">
          <span>{{ $t('spaceRace.overview.headers.rawBytePower') }} </span>
          <span>{{ rawBytePower | size_metric(2) }}
            <span v-if="region !== 'All'">
              / {{ $t('spaceRace.ratio') }}: {{ (rawBytePower / overview.totalPower) | percentage }}
            </span>
          </span>
        </div>
        <div class="flex justify-between items-center mb-1">
          <span>{{ $t('spaceRace.overview.headers.activeMiner') }} </span>
          <span>{{ activeMiners }}
            <span v-if="region !== 'All'">
              / {{ $t('spaceRace.ratio') }}: {{ (activeMiners / overview.activeMiners) | percentage }}
            </span>
          </span>
        </div>
        <div class="flex justify-between items-center mb-1">
          <span>{{ $t('spaceRace.overview.headers.qualifiedMiners') }} </span>
          <span> {{ eligibleMiners }}
            <span v-if="region !== 'All'">
              / {{ $t('spaceRace.ratio') }}: {{ (eligibleMiners / overview.eligibleMiners) | percentage }}
            </span>
          </span>
        </div>
        <div class="flex justify-between items-center ">
          <span>{{ $t('spaceRace.overview.headers.entity') }} </span>
          <span>{{ entityCount }}
            <span v-if="region !== 'All'">
              / {{ $t('spaceRace.ratio') }}: {{ (entityCount / overview.entityCount) | percentage }}
            </span>
          </span>
        </div>
      </div>
    </div>

    <div class="bg-white mx-2 rounded-md mt-4">
      <div class="px-4 py-3 border-b border-background flex flex-row justify-between items-center">
        <p class="text-sm font-medium">
          {{ $t('spaceRace.ranks.title') }}
        </p>
        <el-select v-model="region" placeholder="" size="mini" @change="didRankRegionSwitched">
          <el-option v-for="item in continents" :key="item.code" :label="item[$i18n.locale]" :value="item.code" />
        </el-select>
      </div>
      <div class="px-2 text-sm my-2">
        <table v-loading="loading" class="w-full table-auto text-xs">
          <thead class="text-gray-600">
            <tr class="h-10">
              <th class="sticky z-10 top-0 bg-white">
                {{ $t('spaceRace.ranks.headers.rank') }}
              </th>
              <th class="sticky z-10 top-0 bg-white">
                {{ $t('spaceRace.ranks.headers.entity') }}
              </th>
              <th class="sticky z-10 top-0 bg-white">
                {{ $t('spaceRace.ranks.headers.minerCount') }}
              </th>
              <th class="sticky z-10 top-0 bg-white text-right">
                {{ $t('spaceRace.ranks.headers.rawBytePower') }}
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
                  {{ region === 'All' ? (entity.globalRank || '--') : (entity.regionRank || '--') }}
                </td>
                <td>
                  {{ entity.name }}
                </td>
                <td>
                  {{ entity.addresses.length }}
                </td>
                <td>
                  <div class="flex items-center justify-end">
                    <span>
                      {{ entity.power | size_metric(2) }}
                    </span>
                    <img
                      src="~assets/img/space-race/expand.svg"
                      alt="expand"
                      class="w-4 ml-1"
                      :class="{'is-rotate': expandedRow && expandedRow === index + 1}"
                    >
                  </div>
                </td>
              </tr>
              <tr v-if="expandedRow && expandedRow === index + 1" :key="-(index + 1)" class="border-b border-background">
                <td colspan="9">
                  <div>
                    <div class="flex flex-row justify-between my-2 shadow rounded-sm p-2">
                      <div class="text-left">
                        <p class="font-medium text-gray-600">
                          {{ $t('spaceRace.ranks.headers.totalReward') }}
                        </p>
                        <p> {{ (entity.globalReward && entity.regionReward && entity.blockReward) ? (entity.globalReward + entity.regionReward + entity.blockReward).toFixed(2) : '0' }} FIL </p>
                      </div>
                      <div class="text-center">
                        <p class="font-medium text-gray-600">
                          {{ $t('spaceRace.ranks.headers.dealRetrievalRate') }}
                        </p>
                        <p>  {{ entity.dealSuccessRate.store | percentage }} / {{ entity.dealSuccessRate.retrieve | percentage }} </p>
                      </div>
                      <div class="text-right">
                        <p class="font-medium text-gray-600">
                          {{ $t('spaceRace.ranks.headers.sectorLifeCycle') }}
                        </p>
                        <p>  {{ entity.storageLifecycle ? $t('spaceRace.ranks.headers.done') : 'N/A' }} </p>
                      </div>
                    </div>

                    <div class="my-2 shadow rounded-sm px-2 py-1">
                      <div class="flex flex-row justify-between my-2">
                        <p class="text-left font-medium text-gray-600">
                          {{ $t('spaceRace.ranks.headers.miner') }}
                        </p>
                        <p class="text-right font-medium text-gray-600">
                          {{ $t('spaceRace.ranks.headers.rawBytePower') }}
                        </p>
                      </div>
                      <div v-for="(address,i) in entity.addresses" :key="i" class="flex flex-row justify-between my-1">
                        <div class="text-left">
                          <p>  <AddressLink :id="address.address" /> </p>
                        </div>
                        <div class="text-right">
                          <p>  {{ address.power | size_metric(2) }} / {{ (address.power / entity.power) | percentage }} </p>
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
            :pager-count="5"
            :current-page="page + 1"
            class="mx-auto"
            @current-change="didCurrentPageChanged"
          />
        </div>
      </div>
    </div>

    <div class="mx-2 rounded-md bg-white overflow-hidden my-4">
      <p class="py-2 border-b border-background pl-4 text-sm font-medium">
        {{ $t('spaceRace.distribution.title') }}
      </p>
      <div class="flex flex-col mx-2 mb-2">
        <div v-for="(r,index) in overview.regions" :key="index" class="rounded-sm shadow text-xs px-2 mt-2">
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
