<template>
  <div class="flex items-center rounded-sm bg-background">
    <div class="mt-2 lg:mt-8 mb-2 lg:mb-6 lg:mx-auto px-2">
      <div class="text-left lg:text-center text-xs text-gray-500 lg:mx-auto">
        <span class="align-middle">
          {{ name }}
        </span>
        <Tip v-if="tipContent" class="inline-block align-middle" :content="tipContent" />
      </div>
      <FromNow
        v-if="type === 'FromNow'"
        :timestamp="timestamp"
        format="seconds"
        class="text-left lg:text-center text-sm lg:text-2xl items-start lg:mx-auto"
      />
      <div v-else class="text-left lg:text-center text-sm lg:text-2xl items-start lg:mx-auto">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    timestamp: { type: Number, default: null },
    type: { type: String, default: 'normal' },
    tipContent: { type: String, default: '' }
  }
}
</script>
