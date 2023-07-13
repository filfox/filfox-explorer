<template>
  <div>
    <span :class="`text-sm ${ changeRate > 0 || changeRate < 0? 'mr-2.5' : 'mr-0' }`">{{ data }}</span>
    <span v-if="changeRate > 0" class="text-xs text-increaseNum">+{{ Number(changeRate).toFixed(2) }}%</span>
    <span v-if="changeRate < 0" class="text-xs text-decreaseNum">{{  Number(changeRate).toFixed(2) }}%</span>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Number, required: true },
    changeRate: { type: Number || undefined, required: true }
  }
}
</script>
