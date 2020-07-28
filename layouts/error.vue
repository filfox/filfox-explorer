<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex flex-col text-center mx-auto">
      <img v-if="error.code == 404" src="~/assets/img/shared/404.svg" alt="menu" class="h-40 mx-auto">
      <img v-else src="~/assets/img/shared/error.svg" alt="menu" class="h-56 mx-auto">
      <p class="text-sm">
        {{ error.message }}
      </p>
      <div class="mt-10">
        <a href="/" class="inline-block px-4 py-2 rounded-full bg-button hover:bg-main text-white text-sm">
          {{ $t('shared.backToHome') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: { type: Object, required: true }
  },
  mounted() {
    console.log(this.$route)
  },
  head() {
    return {
      title: 'Error'
    }
  }
}
</script>

<style lang="postcss" scoped>
  .fixed-center {
    @apply fixed top-0 left-0;
    transform: translate(50vw, 50vh) translate(-50%, -50%);
  }
</style>
