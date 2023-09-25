<template>
  <div
    class="flex items-center p-2 lg:p-3 border border-customGray-280 hover:border-background rounded-md transition duration-200 hover:bg-background cursor-pointer"
    @click="$router.push(localePath(`/dapp/${dapp.category}_${dapp.key}`))"
  >
    <img :src="dapp.logoPath" :alt="dapp.name" class="w-8 h-8 lg:w-11 lg:h-11 rounded-full shadow-picture mr-2">
    <div class="flex-1 text-xs lg:text-sm">
      <h4 class="truncate w-64 lg:w-32 xl:w-48 text-main">
        {{ dapp.name }}
      </h4>
      <p class="truncate w-64 lg:w-32 xl:w-48 text-customGray-625">
        {{ dapp.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: { dapp: { type: Object, default: () => ({}) } }
}
</script>
