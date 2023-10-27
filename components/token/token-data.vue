<template>
  <div class="bg-white md:rounded-md">
    <section class="flex flex-col md:flex-row md:items-center justify-between p-4 md:px-8 md:py-4 border-b md:border-b-2 border-background">
      <el-row>
        <template
          v-for="item in tabs"
        >
          <el-button
            v-if="item == tabs[1] ? !holder : true"
            :key="item"
            size="mini"
            round
            v-bind="tab == item ? { type: 'primary', plain: true, class: ['pointer-events-none'] } : {}"
            @click="e => didTabSwitched(e, item)"
          >
            <span class="flex">
              {{ $t(`detail.token.data.${item}.title`) }} <img v-if="item == 'contract' && token.verified" src="@/assets/img/contract/ok.svg" class="w-3 h-3 ml-1">
            </span>
          </el-button>
        </template>
      </el-row>

      <div class="address-search w-full lg:w-60 mt-2 lg:mt-0 flex items-center rounded-full px-3 py-1.5 bg-customGray-270 border border-transparent transition duration-200">
        <input v-model="filterAddress" :placeholder="$t('detail.token.holder.filterAddress')" class="outline-none bg-transparent flex-1 text-xs text-customGray-400" @keydown.enter="filterByHolder">
        <el-tooltip v-if="filterAddress" :content="$t('detail.token.holder.backToOverview')" placement="top">
          <i class="ml-2 el-icon-error text-customGray-400 text-base cursor-pointer" @click="clearFilterAddress"></i>
        </el-tooltip>
        <img slot="suffix" src="@/assets/img/shared/search.svg" class="ml-2 el-icon-search text-base cursor-pointer transition duration-200 hover:opacity-50" @click="filterByHolder" />
      </div>
    </section>

    <div v-if="/tx|holder/.test(tab)" class="text-xs text-customBlue-290 flex items-center px-4 md:px-8 mt-3 md:mt-4">
      <img src="@/assets/img/token/pie.svg" class="w-3 h-3 mr-1" />
      {{ $t(`detail.token.data.${tab == 'tx' ? 'totalOfTxs':'totalOfHolders'}`, { amount: totalCount }) }}
    </div>
    <TokenDataTx v-if="tab == tabs[0]" :token-id="token.address" @setTotalCount="val => totalCount = val" />
    <TokenDataHolder v-if="tab == tabs[1]" :token="token" @setTotalCount="val => totalCount = val" />
    <TokenDataInfo v-if="tab == tabs[2]" :token="token" />
    <TokenDataContract v-if="tab == tabs[3]" :token="token" />
  </div>
</template>

<script>
import { matchTabToUrl } from '@/utils'

export default {
  props: {
    token: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      tab: '',
      tabs: ['tx', 'holder', 'info', 'contract'],
      totalCount: 0,
      filterAddress: ''
    }
  },

  computed: {
    holder() {
      return this.$route.query.h
    }
  },

  watch: {
    holder() {
      this.filterAddress = this.holder
    },

    tab(val) {
      matchTabToUrl(val)
    }
  },

  mounted() {
    this.setDefaultTab()
    this.filterAddress = this.holder
  },

  methods: {
    didTabSwitched(e, tab) {
      this.tab = tab
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

    filterByHolder() {
      this.$router.push(`${this.$route.path}?h=${this.filterAddress}`)
    },

    clearFilterAddress() {
      this.filterAddress = ''
      this.$router.push(`${this.$route.path}?h=${this.filterAddress}`)
    },

    setDefaultTab() {
      const t = this.$route.query?.t
      this.tab = this.tabs.includes(t) ? t : this.tabs[0]
    }
  }
}
</script>

<style lang="postcss">
.address-search {
  &:has(input:focus) {
    @apply border-blue-500 !important;
  }
}
</style>
