<template>
  <div class="flex bg-white w-68 p-5 rounded hover:shadow-card">
    <div class="w-24.5 h-24.5 rounded-full bg-iconShadow flex items-center justify-center">
      <img class="w-24 h-24 rounded-full" :src="icon" />
    </div>
    <div class="flex flex-col gap-1.5 ml-5 justify-center">
      <nuxt-link :to="localePath(`/dapp/${id}`)">
        <a @click="clickName" class="text-customBlue-300 text-xl font-bold">{{ name }}</a>
      </nuxt-link>
      <div class="text-customGray-650 text-sm">{{ $t('dapp.category') }} : {{ category }}</div>
      <el-tooltip :content="getDataLabel(category)+data" placement="top">
        <div class="w-32 text-sm rounded truncate" @mouseenter="visibilityChange($event)">
          <!-- <span class="text-customGray-650 mr-2">{{ getDataLabel(category) }}</span>
          <span class="text-customBlue-300">{{ data }}</span> -->
          <slot></slot>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    data: { type: String, required: true },
    icon: { type: String, required: true },
    rank: { type: Number }
  },
  data() {
    return {
      isShowToolTip: false
    }
  },
  methods: {
    clickName() {
      this.$store.commit('dapp/setRank', this.rank);
    },
    getDataLabel(type) {
      switch(type) {
        case 'DEFI':
        case 'LSD':
          return this.$t('dapp.activeUniqueAddress')+":"
        case 'MarketPlace':
          return this.$t('dapp.transactionBalance')+":"
        case 'NFT': 
          return '';
        default:
          return this.$t('dapp.activeUniqueAddress')+":"
      }
    },
    visibilityChange(event) {
      const ev = event.target;
      if (ev.scrollWidth > ev.clientWidth) {
        this.isShowTooltip = true;
      } else {
        this.isShowTooltip = false;
      }
    }
  }
}
</script>
