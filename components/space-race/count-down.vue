<template>
  <div>
    <client-only>
      <VueCountdown :time="time * 1000" class="flex flex-row justify-center items-center mb-2">
        <template slot-scope="props">
          <div class="mx-2 text-center text-white">
            <div class="countDown">
              {{ props.days }}
            </div>
            <p class="mt-1">
              {{ $t('shared.time.day') }}
            </p>
          </div>
          <div class="mx-2 text-center text-white">
            <div class="countDown">
              {{ props.hours }}
            </div>
            <p class="mt-1">
              {{ $t('shared.time.hour') }}
            </p>
          </div>
          <div class="mx-2 text-center text-white">
            <div class="countDown">
              {{ props.minutes }}
            </div>
            <p class="mt-1">
              {{ $t('shared.time.min') }}
            </p>
          </div>
          <div class="mx-2 text-center text-white">
            <div class="countDown">
              {{ props.seconds }}
            </div>
            <p class="mt-1">
              {{ $t('shared.time.sec') }}
            </p>
          </div>
        </template>
      </VueCountdown>
    </client-only>
  </div>
</template>

<style lang="postcss" scoped>
.countDown {
  @apply rounded w-10 h-10 text-xl font-bold justify-center flex items-center shadow;
  background-image: linear-gradient(#0638AC,#012F9C)
}
</style>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown'

export default {
  components: {
    VueCountdown
  },
  props: {
    timestamp: {
      type: Number,
      required: true
    }
  },
  computed: {
    time() {
      const current = (new Date().getTime() / 1000).toFixed(0)
      return this.timestamp - current >= 0 ? this.timestamp - current : 0
    }
  }
}
</script>>
