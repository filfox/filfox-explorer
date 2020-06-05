<template>
  <div class="flex flex-col rounded-sm bg-background">
    <div class="flex h-12 text-center text-xs text-gray-500 items-end mx-auto">{{name}}</div>
    <div class="flex h-16 text-center text-2xl items-start mx-auto">{{value}}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default() {
        return "";
      }
    },
    value: {
      type: String,
      default() {
        return "0";
      }
    }
  }
}
</script>