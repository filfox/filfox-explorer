<template>
  <div>
    <div class="bg-white lg:rounded-md pb-2 mb-4">
      <div class="flex justify-between items-center px-4 py-2 lg:py-4">
        <span class="text-sm lg:text-base flex items-center">
          <img src="../../assets/img/home/icon-fns.svg" alt="FNS" class="h-5 mr-2">
          {{ $t('fns.registrations.title') }}
        </span>
      </div>

      <div class="flex justify-between mb-2 px-4">
        <div class="flex h-12 items-center">
          <el-row>
            <el-button
              size="mini"
              round
              v-bind="type === 0 ? { type: 'primary', plain: true, class: ['pointer-events-none'] } : {}"
              @click="e => switchTab(e, 0)"
            >
              {{ $t('fns.registrations.fnsRecordShow') }}
            </el-button>
            <el-button
              size="mini"
              round
              v-bind="type === 1 ? { type: 'primary', plain: true, class: ['pointer-events-none'] } : {}"
              @click="e => switchTab(e, 1)"
            >
              {{ $t('fns.registrations.seeMore') }}
            </el-button>
          </el-row>
        </div>
        <div class="flex items-center">
          <nuxt-link :to="localePath('/fns')" class="ml-auto">
            <el-button size="mini" round>
              {{ $t('shared.more') }}
            </el-button>
          </nuxt-link>
        </div>
      </div>

      <div v-loading="loading" class="text-sm border-t border-customGray-100 min-h-64">
        <div v-if="type == 0" class="p-4 ">
          <div v-for="(item, index) in fnsRanks" :key="item.ethAddr" class="rounded mb-3 flex flex-col lg:flex-row relative" :class="[index ? 'bg-card' : 'bg-background']">
            <div class="w-20 flex items-start justify-center">
              <img :src="require(`@/assets/img/fns/ranking${index+1}.svg`)" class="w-12" alt="ranking">
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
                      :style="{ filter: item.texts[key] ? 'grayscale(0%)' : 'grayscale(100%)' }"
                    >
                  </el-tooltip>
                </a>
              </div>
              <img src="@/assets/img/fns/ace.png" class="h-24 self-end " :class="{ 'hidden': index !== 0 }">
            </div>
          </div>
        </div>
        <template v-if="type == 1">
          <div class="hidden lg:block">
            <table class="w-full">
              <tr>
                <th
                  v-for="({ key, label }, index) in columns"
                  :key="key"
                  :class="[index ? 'w-auto' : 'w-1/3']"
                  class="text-customGray-400 text-sm pt-4 pb-1"
                >
                  {{ label }}
                </th>
              </tr>
              <tr v-for="{ owner, name, expires } in names" :key="name" class="text-center">
                <td>
                  <AddressLink :id="owner" :format="18" class="text-main" />
                </td>
                <td>{{ name }}</td>
                <td>{{ expires | timestamp('datetime') }}</td>
                <td>
                  <NuxtLink
                    :to="localePath(`/fns/name/${name}`)"
                    class="px-4 py-1 rounded text-xs font-semibold text-main bg-customBlue-200 border border-transparent hover:border-main transition duration-200"
                  >
                    {{ $t('shared.more') }}
                  </NuxtLink>
                </td>
              </tr>
            </table>
          </div>
          <ul class="block lg:hidden bg-white p-3 text-xs border-t border-customGray-100">
            <li
              v-for="item in names"
              :key="item.name"
              class="border-b border-customGray-100 py-2"
            >
              <div v-for="{ key, label } in columnsMobile" :key="key" class="flex justify-between items-center my-2">
                <span class="text-customGray-400">{{ label }}</span>
                <AddressLink v-if="key == 'owner'" :id="item[key]" :format="12" class="text-main" />
                <span v-else class="w-2/3 break-all text-right">{{ item[key] | lookfortime('datetime') }}</span>
              </div>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { fnsServer } from '@/filecoin/filecoin.config'
import FNS from '@filfox/fnsjs'
const fns = new FNS('hyperspace')

export default {
  data() {
    return {
      columns: [
        { key: 'owner', label: this.$t('fns.registrations.address') },
        { key: 'name', label: this.$t('fns.registrations.name') },
        { key: 'expires', label: this.$t('fns.registrations.expiration') },
        { key: 'handle', label: this.$t('fns.registrations.handle') }
      ],
      names: [],
      type: 0,
      fnsLinks: ['url', 'com.twitter', 'com.discord', 'com.telegram', 'com.github'],
      fnsRanks: [],
      loading: false
    }
  },
  computed: {
    columnsMobile() {
      return this.columns.filter(({ key }) => key !== 'handle')
    }
  },
  watch: {
    type() {
      this.getList()
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    switchTab(e, type) {
      this.type = type
      let node = e.target
      while (true) {
        if (node?.tagName?.toLowerCase() === 'button') {
          node.blur()
          break
        } else {
          node = node.parentElement
        }
      }
    },

    handleImgError({ target }) {
      target.onerror = null
      target.src = require('@/assets/img/fns/logo.png')
    },

    truncateString(str, n) {
      if (str.length <= n) {
        return str
      }
      return `${str.slice(0, n)}...`
    },

    async getRegistrations() {
      const data = await this.$axios.$get(`${fnsServer}/registration/list`, {
        params: { pageSize: 5, page: 0 }
      })
      this.names = data.data.list
    },

    async getRanking() {
      const data = await this.$axios.$get(`https://testapp.fns.space/api/fns/inviteRanking`, {
        params: { pageSize: 3 }
      })
      const addrs = data.data.records.map(({ ethAddr }) => ethAddr)
      const primaryNames = await Promise.all(addrs.map(addr => fns.address(addr).getPrimaryName()))
      const texts = await Promise.all(primaryNames.map(name => fns.name(name).getTexts()))
      this.fnsRanks = primaryNames.map((name, index) => ({ name, texts: texts[index] }))
    },

    async getList() {
      if (this.type === 0) {
        this.fnsRanks.length || (this.loading = true)
        await this.getRanking()
        this.loading = false
      }

      if (this.type === 1) {
        this.loading = true
        await this.getRegistrations()
        this.loading = false
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
table {
  table-layout: auto;
  & td {
    @apply py-3 border-b border-customGray-100;
  }
  & tr:last-child td {
    @apply border-none;
  }
}
</style>
