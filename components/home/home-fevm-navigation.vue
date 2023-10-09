<template>
  <div class="bg-white lg:rounded-md pb-2 mb-4">
    <div class="flex items-center">
      <HomeTitle type="fevmNavigation" :icon="more" />
      <nuxt-link v-if="more" :to="localePath('/fevm/navigation')" class="ml-auto mr-4">
        <el-button size="mini" round>
          {{ $t('shared.more') }}
        </el-button>
      </nuxt-link>
    </div>

    <div :class="`flex flex-wrap items-center mb-5 -mt-1 ${more ? 'px-4' : 'px-6'}`">
      <div id="typeBar" class="flex items-center overflow-auto lg:overflow-hidden bg-customGray-250 px-2 py-1.25 rounded-full mt-3">
        <template v-for="{ category, displayName, count } in dappTypes">
          <div
            v-if="count > 0 || category == 'fns'"
            :key="category"
            class="px-2 py-0.5 text-xs whitespace-nowrap cursor-pointer transition duration-200 select-none hover:text-main"
            :class="category == type ? 'text-main' : 'text-customGray-375'"
            @click="type = category"
          >
            {{ displayName }}<span v-if="category != 'fns'">({{ count || 0 }})</span>
          </div>
        </template>
      </div>

      <div v-if="isTypeDefi" class="ml-auto mr-auto lg:mr-0 flex flex-col lg:flex-row items-center mt-3">
        <FilterSelect
          v-if="sort"
          v-model="sortBy"
          :label="$t('dapp.defi.sortBy')"
          :options="$t('dapp.defi.sortOptions')"
          class="mr-4 mb-2 lg:mb-0"
        />
        <DurationSelect v-model="duration" />
      </div>
    </div>

    <div class="border-t border-background">
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
    }
  },

  mounted() {
    this.getDappTypes()
  },

  methods: {
    async getDappTypes() {
      let types = await this.$axios.$get('/dapp/category/list')
      types = this.sortDappTypes(types)
      if (this.more) types.splice(1, 0, { category: 'fns', displayName: 'FNS' })
      this.dappTypes = types
      this.type = types[0].category
      this.setTypeBarDraggable()
    },

    sortDappTypes(types) {
      types.sort((a, b) => {
        if (/defi/i.test(a.category)) return -1
        if (/defi/i.test(b.category)) return 1
        return a.category.localeCompare(b.category)
      })
      return types
    },

    setTypeBarDraggable() {
      const container = document.querySelector('#typeBar')
      let isDragging = false
      let startPosition = 0
      let startScrollLeft = 0

      if (container.scrollWidth < container.clientWidth) return
      container.addEventListener('mousedown', event => {
        isDragging = true
        startPosition = event.clientX
        startScrollLeft = container.scrollLeft
      })
      container.addEventListener('mousemove', event => {
        if (isDragging) {
          const deltaX = event.clientX - startPosition
          container.scrollLeft = startScrollLeft - deltaX
        }
      })
      container.addEventListener('mouseup', () => (isDragging = false))
      container.addEventListener('mouseleave', () => (isDragging = false))
    }
  }
}
</script>
