<template>
  <div class="flex" :class="{'justify-center': type === 1, 'items-center': type !=2, 'items-start': type === 2}">
    <img v-if="location" :src="location.flag" class="border border-background rounded-sm w-5 mr-1">
    <template v-if="location">
      <p v-if="type === 0" class="text-sm">
        {{ fullLocation }}
        ({{ splitedIP(location.ip) }})
      </p>
      <p v-if="type === 1" class="text-sm">
        {{ location[`${$i18n.locale}CountryName`] }}-{{ location[`${$i18n.locale}City`] }}
      </p>
      <p v-if="type === 2" class="text-xs text-gray-800 text-right">
        {{ fullLocation }}
        ({{ splitedIP(location.ip) }})
      </p>
    </template>
    <template v-else>
      <p v-if="type != 2" class="text-sm">
        {{ $t('shared.unknown') }}
      </p>
      <p v-else class="text-xs text-gray-800 text-right">
        {{ $t('shared.unknown') }}
      </p>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    location: { type: null, required: true },
    type: { type: Number, default: 0 }
  },
  computed: {
    fullLocation() {
      const locations = []
      if (this.location[`${this.$i18n.locale}ContinentName`]) {
        locations.push(this.location[`${this.$i18n.locale}ContinentName`])
      }
      if (this.location[`${this.$i18n.locale}CountryName`]) {
        locations.push(this.location[`${this.$i18n.locale}CountryName`])
      }
      if (this.location[`${this.$i18n.locale}RegionName`]) {
        locations.push(this.location[`${this.$i18n.locale}RegionName`])
      }
      if (this.location[`${this.$i18n.locale}City`]) {
        locations.push(this.location[`${this.$i18n.locale}City`])
      }
      return locations.join('-')
    }
  },
  methods: {
    splitedIP(ip) {
      const ips = ip.split('.')
      if (ips.length === 4) {
        return `${ips[0]}. ** . ** .${ips[3]}`
      } else {
        return ip
      }
    }
  }
}
</script>
