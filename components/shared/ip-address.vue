<template>
  <div class="flex" :class="type === 'mobile' ? 'items-start' : 'items-center'">
    <img v-if="location" :src="location.flag" class="border border-background rounded-sm w-5 mr-1">
    <template v-if="location">
      <p v-if="type === ''" class="text-sm">
        {{ fullLocation }} ({{ splittedIP }})
      </p>
      <p v-else-if="type === 'mobile'" class="text-xs text-gray-800 text-right">
        {{ fullLocation }} ({{ splittedIP }})
      </p>
    </template>
    <p v-else-if="type === 'mobile'" class="text-xs text-gray-800 text-right">
      {{ $t('shared.unknown') }}
    </p>
    <p v-else class="text-sm">
      {{ $t('shared.unknown') }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    location: { type: null, required: true },
    type: { type: String, default: '' }
  },
  computed: {
    fullLocation() {
      return [
        this.location[`${this.$i18n.locale}ContinentName`],
        this.location[`${this.$i18n.locale}CountryName`],
        this.location[`${this.$i18n.locale}RegionName`],
        this.location[`${this.$i18n.locale}City`]
      ].filter(Boolean).join('-')
    },
    splittedIP() {
      const ips = this.location.ip.split('.')
      if (ips.length === 4) {
        return `${ips[0]}. ** . ** .${ips[3]}`
      } else {
        return this.location.ip
      }
    }
  }
}
</script>
