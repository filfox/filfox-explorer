<template>
  <div class="flex items-center rounded-sm bg-background">
    <div class="flex flex-col mt-8 mb-6 mx-auto">
      <div class="flex text-center text-xs text-gray-500 items-end mx-auto">{{name}}</div>
      <div v-if="type === 'normal'" class="flex text-center text-2xl items-start mx-auto">{{value}}</div>
      <FromNow v-if="type === 'FromNow'" :timestamp="value" format="seconds" class="flex text-center text-2xl items-start mx-auto"/>
    </div>
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
    },
    type: {
      type: String,
      default() {
        return "normal"
      }
    }
  }
}
</script>