<template>
  <div class="relative">
    <span>{{ data }}</span>
    <span v-if="changeRate > 0" class="text-xs absolute top-1px text-increaseNum whitespace-pre">  +{{ (Number(changeRate) * 100).toFixed(2) }}%</span>
    <span v-if="changeRate < 0" class="text-xs absolute top-1px text-decreaseNum whitespace-pre">  {{ (Number(changeRate) * 100).toFixed(2) }}%</span>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: String, required: true },
    changeRate: { type: Number, required: true }
  }
}
</script>
