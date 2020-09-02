<template>
  <div>
    <div class="my-2 relative h-10">
      <div
        class="mt-2 mx-auto whitespace-no-wrap flex justify-center items-center"
      >
        <span
          class="
        font-medium
        text-sm
        mr-2"
        >
          {{ $t('spaceRace.overview.headers.unlockRewards') }}:
        </span>
        <span class="text-2xl font-medium text-spaceRace">
          {{ currentRewards }}
        </span>
      </div>
    </div>
    <div class=" h-2 bg-spaceRaceProgressBg w-full relative">
      <div class=" bg-spaceRace h-full" :style="{width: percentage}">
      </div>
      <div class="dot bg-spaceRace" :style="{left:'0px'}">
      </div>
      <template v-if="type === 'continent'">
        <div class="indicator" :style="{left: percentage}">
          <img src="~/assets/img/space-race/indicator.svg" alt="indicator" class="mb-1">
        </div>
        <div class="dot" :style="{left:'20%'}" :class="{'bg-spaceRace': currentPower - 10 * tib >= 0, 'bg-spaceRaceProgressBg':currentPower - 10 * tib < 0}">
          <div class="label">
            <span> 10 TiB </span>
            <span> 25k FIL </span>
          </div>
        </div>
        <div class="dot" :style="{left:'40%'}" :class="{'bg-spaceRace': currentPower - 100 * tib >= 0, 'bg-spaceRaceProgressBg':currentPower - 100 * tib < 0}">
          <div class="label">
            <span> 100 TiB </span>
            <span> 50k FIL </span>
          </div>
        </div>
        <div class="dot" :style="{left:'60%'}" :class="{'bg-spaceRace': currentPower - pib >= 0, 'bg-spaceRaceProgressBg':currentPower - pib < 0}">
          <div class="label">
            <span> 1 PiB </span>
            <span> 100k FIL </span>
          </div>
        </div>
        <div class="dot" :style="{left:'80%'}" :class="{'bg-spaceRace': currentPower - 5 * pib >= 0, 'bg-spaceRaceProgressBg':currentPower - 5 * pib < 0}">
          <div class="label">
            <span> 5 PiB </span>
            <span> 250k FIL </span>
          </div>
        </div>
        <div class="dot" :style="{left:'100%'}" :class="{'bg-spaceRace': currentPower - 10 * pib >= 0, 'bg-spaceRaceProgressBg':currentPower - 10 * pib < 0}">
          <div class="label">
            <span> 10 PiB </span>
            <span> 500k FIL </span>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="indicator" :style="{left: percentage}">
          <img src="~/assets/img/space-race/indicator.svg" alt="indicator" class="mb-1">
        </div>
        <div class="dot" :style="{left:'20%'}" :class="{'bg-spaceRace': currentPower - 5 * pib >= 0, 'bg-spaceRaceProgressBg':currentPower - 5 * pib < 0}">
          <div class="label">
            <span> 5 PiB </span>
            <span> 100k FIL </span>
          </div>
        </div>
        <div class="dot" :style="{left:'40%'}" :class="{'bg-spaceRace': currentPower - 10 * pib >= 0, 'bg-spaceRaceProgressBg':currentPower - 10 * pib < 0}">
          <div class="label">
            <span> 10 PiB </span>
            <span> 200k FIL </span>
          </div>
        </div>
        <div class="dot" :style="{left:'60%'}" :class="{'bg-spaceRace': currentPower - 25 * pib >= 0, 'bg-spaceRaceProgressBg':currentPower - 25 * pib < 0}">
          <div class="label">
            <span> 25 PiB </span>
            <span> 300k FIL </span>
          </div>
        </div>
        <div class="dot" :style="{left:'80%'}" :class="{'bg-spaceRace': currentPower - 50 * pib >= 0, 'bg-spaceRaceProgressBg':currentPower - 50 * pib < 0}">
          <div class="label">
            <span> 50 PiB </span>
            <span> 500k FIL </span>
          </div>
        </div>
        <div class="dot" :style="{left:'100%'}" :class="{'bg-spaceRace': currentPower - 100 * pib >= 0, 'bg-spaceRaceProgressBg':currentPower - 100 * pib < 0}">
          <div class="label">
            <span> 100 PiB </span>
            <span> 1M FIL </span>
          </div>
        </div>
        <div v-if="!unlockTotalReward" class="lock" :style="{left:'100%'}">
          <img src="~/assets/img/space-race/lock.svg" alt="lock">
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'global,'
    },
    currentPower: {
      type: Number,
      required: true
    },
    unlockTotalReward: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tib: 1099511627776,
      pib: 1125899906842624
    }
  },
  computed: {
    // non-linear computation for percentage if not global one
    percentage() {
      if (this.type === 'global') {
        let percentage = this.currentPower / this.pib
        percentage = percentage >= 100 ? 100 : percentage
        return `${percentage}%`
      } else if (this.currentPower - 10 * this.tib < 0) {
        return `${this.currentPower / (10 * this.tib) * 20}%`
      } else if (this.currentPower - 100 * this.tib < 0) {
        return `${20 + (this.currentPower - 10 * this.tib) / (90 * this.tib) * 20}%`
      } else if (this.currentPower - this.pib < 0) {
        return `${40 + (this.currentPower - 100 * this.tib) / (900 * this.tib) * 40}%`
      } else if (this.currentPower - 5 * this.pib < 0) {
        return `${60 + (this.currentPower - this.pib) / (4 * this.pib) * 60}%`
      } else if (this.currentPower - 10 * this.pib < 0) {
        return `${80 + (this.currentPower - 5 * this.pib) / (9 * this.pib) * 80}%`
      } else {
        return '100%'
      }
    },
    currentRewards() {
      if (this.type === 'global') {
        if (this.currentPower - 5 * this.pib < 0) {
          return '0 FIL'
        } else if (this.currentPower - 10 * this.pib < 0) {
          return '100k FIL'
        } else if (this.currentPower - 25 * this.pib < 0) {
          return '200k FIL'
        } else if (this.currentPower - 50 * this.pib < 0) {
          return '300k FIL'
        } else if (this.currentPower - 100 * this.pib < 0) {
          return '500k FIL'
        } else {
          return '1.0M FIL'
        }
      } else if (this.currentPower - 10 * this.tib < 0) {
        return '0 FIL'
      } else if (this.currentPower - 100 * this.tib < 0) {
        return '25k FIL'
      } else if (this.currentPower - this.pib < 0) {
        return '50k FIL'
      } else if (this.currentPower - 5 * this.pib < 0) {
        return '100k FIL'
      } else if (this.currentPower - 10 * this.pib < 0) {
        return '250k FIL'
      } else {
        return '500k FIL'
      }
    }
  }
}
</script>>

<style lang="postcss" scoped>
.indicator {
    z-index: 20;
    width: 14px;
    position: absolute;
    top:50%;
    transform: translate3d(-50%,-50%,0);
}
.dot {
    @apply rounded-full z-10;
    width: 12px;
    height: 12px;
    position: absolute;
    top:50%;
    transform: translate3d(-50%,-50%,0);
}
.lock {
    @apply rounded-full z-10;
    width: 15px;
    height: 15px;
    position: absolute;
    top:50%;
    transform: translate3d(-50%,-50%,0);
}
.label {
    @apply text-xs flex flex-col absolute whitespace-no-wrap text-center;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
}
</style>>
