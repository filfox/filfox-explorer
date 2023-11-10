<template>
  <div>
    <div class="bg-white pb-4.5" :class="[more ? 'lg:rounded-t-md' : 'lg:rounded-md']">
      <HomeTitle type="fevmNavigation" :icon="more" />
      <div
        :class="[more ? 'px-4' : 'px-4 lg:px-6']"
        class="flex flex-wrap items-center"
      >
        <div id="typeBar" class="mr-auto flex items-center">
          <template v-for="{ category, displayName, count } in dappTypes.slice(0, 3)">
            <button
              v-if="count > 0 || category == 'fns'"
              :key="category"
              :class="{ 'active': type == category }"
              class="dapp-type-btn"
              @click="type = category"
            >
              {{ displayName }}
            </button>
          </template>

          <el-dropdown v-if="dappTypes.length > 3" @command="c => type = c">
            <span
              class="flex items-center text-xs dapp-type-btn"
              :class="{ 'active': selectedInMoreList != $t('shared.more') }"
            >
              {{ selectedInMoreList }}
              <i class="el-icon-arrow-down text-customGray-650 ml-1"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="{ category, displayName } in dappTypes.slice(3, dappTypes.length)"
                :key="category"
                class="text-xs"
                :command="category"
              >
                {{ displayName }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div v-if="isTypeDefi" class="flex items-center mt-3 lg:mt-0">
          <FilterSelect
            v-if="sort"
            v-model="sortBy"
            :label="$t('dapp.defi.sortBy')"
            :options="$t('dapp.defi.sortOptions')"
            class="mr-4"
          />
          <DurationSelect v-model="duration" portable />
        </div>

        <nuxt-link
          v-if="more"
          :to="localePath(type == 'fns' ? '/fns' : '/fevm/navigation')"
          class="ml-2.5 hidden lg:block"
        >
          <el-button size="mini" round>{{ $t('shared.more') }}</el-button>
        </nuxt-link>
      </div>
    </div>

    <div v-if="!more && /defi/i.test(type)" class="my-4 flex flex-col lg:flex-row items-stretch">
      <div class="w-full lg:w-1/2 bg-white lg:rounded-md">
        <FevmMarketCapChart />
      </div>
      <div class="w-4 h-4"></div>
      <div class="w-full lg:w-1/2 bg-white lg:rounded-md">
        <FevmTvlPieChart />
      </div>
    </div>

    <div
      class="bg-white overflow-hidden"
      :class="[ more ? 'border-t border-background lg:pb-2 lg:rounded-b-md' : 'pt-2 lg:rounded-md mt-4' ]"
    >
      <DappDefiList v-if="isTypeDefi" :days="days" :sort-by="sortBy" :limit="more ? 5 : 15" />
      <DappToolList v-if="!isTypeDefi && !isTypeFns" :category="type" :limit="more ? 12 : 20" />
      <FnsRegistrationsLatest v-if="isTypeFns" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    more: { type: Boolean, default: false },
    sort: { type: Boolean, default: false }
  },

  data() {
    return {
      duration: '24h',
      dappTypes: [],
      type: 'defi',
      sortBy: 'tvl'
    }
  },

  computed: {
    days() {
      return {
        '24h': 1,
        '7d': 7,
        '30d': 30,
        '1y': 365
      }[this.duration]
    },

    isTypeDefi() {
      return /defi/i.test(this.type)
    },

    isTypeFns() {
      return /fns/i.test(this.type)
    },

    selectedInMoreList() {
      return this.dappTypes.slice(3, this.dappTypes.length).find(({ category }) => category == this.type)?.displayName || this.$t('shared.more')
    }
  },

  mounted() {
    this.getDappTypes()
  },

  methods: {
    async getDappTypes() {
      let types = await this.$axios.$get('/dapp/category/list')
      types = types
        .filter(t => t.count > 0)
        .map(item => ({ ...item, displayName: `${item.displayName}(${item.count})` }))
      if (this.more) types.splice(1, 0, { category: 'fns', displayName: 'FNS' })
      this.dappTypes = types
      this.type = types[0].category
    }
  }
}
</script>

<style lang="postcss" scoped>
.dapp-type-btn {
  @apply mr-2.5 px-3 py-1 text-xs border rounded-full text-customGray-650 border-customGray-340;
  &.active {
    @apply border-customBlue-275 text-customBlue-290 bg-customBlue-225;
  }
}
</style>
