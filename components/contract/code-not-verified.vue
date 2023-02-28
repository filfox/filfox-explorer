<template>
  <div class="text-sm font-light">
    <div class="rounded-md bg-customGray-200 text-customGray-600 flex items-center p-2">
      <img src="@/assets/img/contract/warn.svg" alt="warn" class="w-4.5 h-4.5 mr-2">
      <span>Are you the contract creator? <nuxt-link :to="localePath('/contract')" class="text-main hover:underline">Verify and Publish</nuxt-link> your contract source code today!</span>
    </div>
    <div class="rounded-lg bg-customGray-200 border h-64 mt-4 p-4 break-all overflow-auto">
      {{ contract.initCode }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contract: {
      type: Object,
      default: () => ({ initCode: '' })
    }
  }
}
</script>
