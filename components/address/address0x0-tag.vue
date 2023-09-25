<template>
  <span class="text-main text-xs px-2 h-4 inline-flex items-center border border-customBlue-275 bg-background rounded-full">
    Null:{{ address | trim(4) }}
  </span>
</template>

<script>
export default {
  props: {
    address: {
      type: String,
      default: '0x0000000000000000000000000000000000000000'
    }
  }
}
</script>
