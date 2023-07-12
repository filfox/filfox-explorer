<template>
  <div class="flex bg-white w-70 h-34 p-5 rounded hover:shadow-card">
    <div class="w-26 h-25 rounded-full bg-iconShadow flex items-center justify-center">
      <img class="w-24 h-24 rounded-full" :src="icon" />
    </div>
    <div class="flex flex-col gap-3 ml-5">
      <nuxt-link :to="localePath(`/dapp/${id}`)">
        <a @click="clickName" class="text-customBlue-300 text-xl font-bold">{{ name }}</a>
      </nuxt-link>
      <div class="text-customGray-650 text-sm">{{ $t('dapp.category') }} : {{ category }}</div>
      <div class="bg-iconShadow w-32 h-9 text-sm p-2 rounded">
        <span class="text-customGray-650 mr-2">{{ $t('dapp.data') }}:</span>
        <span class="text-customBlue-300">{{ data }}</span>
      </div>
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
  methods: {
    clickName() {
      console.log("rank", this.rank)
      this.$store.commit('dapp/setRank', this.rank);
    }
  }
}
</script>
