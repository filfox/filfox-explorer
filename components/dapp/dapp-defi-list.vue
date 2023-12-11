<template>
  <div v-loading="loading" class="bg-white">
    <table class="hidden lg:table w-full table-fixed border-background mt-3" :class="{ 'border-b': limit > 5 }">
      <thead class="text-gray-600 text-sm">
        <tr>
          <th
            v-for="(colName, index) in $t('home.fevmNavigation.defiListColumns')"
            :key="colName"
            class="font-normal text-left"
            :class="{ 'text-center': index == 0 }"
            :style="{ 'width': ['12%', '18%', 'auto', 'auto', 'auto', '15%'][index] }"
          >
            {{ colName }}
          </th>
        </tr>
      </thead>
      <tbody class="text-center text-sm">
        <tr
          v-for="(item, index) in defi.defiList"
          :key="item.name"
          :class="{ 'border-t': index != 0 }"
          class="border-background h-14 transition duration-200 hover:bg-customBlue-200"
        >
          <td>#{{ item.rank + 1 }}</td>
          <td>
            <span
              class="flex justify items-center cursor-pointer hover:text-customBlue-290"
              @click="$router.push(localePath(`/dapp/defi_${item.defi}`))"
            >
              <img
                :src="item.logoPath || require('@/assets/img/fns/logo.png')"
                class="w-4 h-4 rounded-full shadow-picture mr-1"
              >
              {{ item.name }}
            </span>
          </td>
          <td class="text-left">
            <ChangeRate :data="item.invokeCount.data" :change-rate="item.invokeCount.changeRate" />
          </td>
          <td class="text-left">
            <ChangeRate :data="formatNum(item.userCount.data)" :change-rate="item.userCount.changeRate" />
          </td>
          <td class="text-left">
            <ChangeRate :data="formatNum(item.tokens.data)" :change-rate="item.tokens.changeRate" data-format="% FIL" />
          </td>
          <td class="text-left">
            <ChangeRate :data="formatNum(item.tvl.data)" :change-rate="item.tvl.changeRate" data-format="% USD" />
            <el-progress
              :percentage="+Number(100 * item.tvl.data / defi.totalTvl).toFixed(2)"
              :stroke-width="4"
              text-color="#68A4F7"
              define-back-color="#F0F6F9"
              class="w-2/3 tvl-percentage"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <ul class="block lg:hidden bg-white p-3 text-xs border-t border-customGray-100">
      <li
        v-for="(item) in defi.defiList"
        :key="item.name"
        class="border-b border-customGray-100 py-1.5"
      >
        <div class="flex justify-between items-center my-1.5">
          <span class="text-customGray-400">{{ $t('home.fevmNavigation.defiListColumns.0') }}</span>
          <span>{{ item.rank + 1 }}</span>
        </div>
        <div class="flex justify-between items-center my-1.5">
          <span class="text-customGray-400">{{ $t('home.fevmNavigation.defiListColumns.1') }}</span>
          <span
            class="flex items-center justify-end cursor-pointer hover:text-customBlue-290"
            @click="$router.push(localePath(`/dapp/defi_${item.defi}`))"
          >
            <img
              :src="item.logoPath || require('@/assets/img/fns/logo.png')"
              class="w-4 h-4 rounded-full shadow-picture mr-1"
            >
            {{ item.name }}</span>
        </div>
        <div class="flex justify-between items-center my-1.5">
          <span class="text-customGray-400">{{ $t('home.fevmNavigation.defiListColumns.2') }}</span>
          <ChangeRate :data="item.invokeCount.data" :change-rate="item.invokeCount.changeRate" />
        </div>
        <div class="flex justify-between items-center my-1.5">
          <span class="text-customGray-400">{{ $t('home.fevmNavigation.defiListColumns.3') }}</span>
          <ChangeRate :data="formatNum(item.userCount.data)" :change-rate="item.userCount.changeRate" />
        </div>
        <div class="flex justify-between items-center my-1.5">
          <span class="text-customGray-400">{{ $t('home.fevmNavigation.defiListColumns.4') }}</span>
          <ChangeRate :data="formatNum(item.tokens.data)" :change-rate="item.tokens.changeRate" data-format="% FIL" />
        </div>
        <div class="flex justify-between items-center my-1.5">
          <span class="text-customGray-400">{{ $t('home.fevmNavigation.defiListColumns.5') }}</span>
          <ChangeRate :data="formatNum(item.tvl.data)" :change-rate="item.tvl.changeRate" data-format="% USD" />
        </div>
        <div class="flex justify-between items-center my-1.5">
          <span class="text-customGray-400">{{ $t('shared.proportion') }}</span>
          <el-progress
            :percentage="+Number(100 * item.tvl.data / defi.totalTvl).toFixed(2)"
            :stroke-width="4"
            text-color="#68A4F7"
            define-back-color="#F0F6F9"
            class="w-1/3 text-right tvl-percentage"
          />
        </div>
      </li>
      <!-- mobile more button -->
      <li
        v-if="limit <= 5"
        class="text-center text-gray-700 pt-2.5"
        @click="$router.push(localePath('/fevm/navigation'))"
      >
        {{ $t('shared.more') }}
      </li>
    </ul>

    <div v-if="limit > 5" class="flex flex-col lg:flex-row justify-between items-center my-5 px-8">
      <span class="text-sm">Found something interesting? <a
        class="text-customBlue-300"
        target="_blank"
        href="https://docs.google.com/forms/d/e/1FAIpQLSciXwagRx-D8zeTCIEa9y2pwkoaDqNw2nPSk9bLYdQRsFm3Sw/viewform"
      >Submit it here</a></span>
      <el-pagination
        v-if="defi.totalCount > limit"
        class="mt-3 lg:mt-0"
        small
        layout="prev, pager, next"
        :total="defi.totalCount"
        :page-size="limit"
        :current-page="page + 1"
        @current-change="p => page = p - 1"
      />
    </div>
  </div>
</template>

<script>
import { formatNum } from '@/utils/dapp'

export default {
  props: {
    days: { type: Number, default: 1 },
    limit: { type: Number, default: 5 },
    sortBy: { type: String, default: 'tvl' }
  },

  data() {
    return {
      defi: {},
      page: 0,
      loading: false
    }
  },

  computed: {
    params() {
      return {
        days: this.days,
        limit: this.limit,
        offset: this.page * this.limit,
        sortBy: this.sortBy
      }
    }
  },

  watch: {
    params() {
      this.getList()
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    formatNum,

    async getList() {
      try {
        this.loading = true
        this.defi = await this.$axios.$get('/stats/defi/list', { params: this.params })
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="postcss">
.tvl-percentage {
  & .el-progress__text {
    @apply text-xs font-light text-customGray-450 !important;
  }
}
</style>
