<template>
  <div class="lg:flex lg:m-auto pl-1">
    <img v-if="index === 1" src="~/assets/img/home/first.png" alt="1" class="image">
    <img v-else-if="index === 2" src="~/assets/img/home/second.png" alt="2" class="image">
    <img v-else-if="index === 3" src="~/assets/img/home/third.png" alt="3" class="image">
    <p v-if="index > 3" class="flex ml-1 rounded-full px-1 bg-background text-main lg:bg-white lg:text-black lg:text-center lg:m-auto">
      {{ index }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    index: { type: Number, required: true }
  }
}
</script>

<style lang="postcss" scoped>
  .image {
    @apply w-4 h-auto;
  }
  @screen lg {
    .image {
      @apply w-6 m-auto;
    }
  }
</style>
