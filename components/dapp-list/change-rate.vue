<template>
  <div>
    <span :class="`text-sm ${ changeRate > 0 || changeRate < 0? 'mr-2.5' : 'mr-0' }`">{{ data }}</span>
    <span v-if="changeRate > 0" class="text-xs text-increaseNum">+{{ (Number(changeRate)*100).toFixed(2) }}%</span>
    <span v-if="changeRate < 0" class="text-xs text-decreaseNum">{{ (Number(changeRate)*100).toFixed(2) }}%</span>
  </div>
</template>

<script>
export default {
  props: {
    data: { required: true },
    changeRate: { required: true }
  }
}
</script>
