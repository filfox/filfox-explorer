<template>
  <div class="flex items-center rounded-sm bg-background">
    <div class="flex flex-col mt-2 lg:mt-8 mb-2 lg:mb-6 lg:mx-auto px-2">
      <div class="flex flex-row text-left lg:text-center text-xs text-gray-500 items-center lg:mx-auto">
        <p>  {{name}} </p>
        <Tip class="ml-1" v-if="hasTip" :content="tipContent"/>
      </div>
      <div v-if="type === 'normal'" class="flex text-left lg:text-center text-sm lg:text-2xl items-start lg:mx-auto">{{value}}</div>
      <FromNow v-if="type === 'FromNow'" :timestamp="value" format="seconds" class="flex text-left lg:text-center text-sm lg:text-2xl items-start lg:mx-auto"/>
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
      default() {
        return "0";
      }
    },
    type: {
      type: String,
      default() {
        return "normal"
      }
    },
    hasTip: {
      type: Boolean,
      return: false
    },
    tipContent: {
      type: String,
      return: ""
    }
  }
}
</script>