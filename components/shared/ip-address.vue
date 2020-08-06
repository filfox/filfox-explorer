<template>
  <div class="flex items-center" :class="{'justify-center': type === 1}">
    <img v-if="location" :src="location.flag" class="border border-background rounded-sm w-5 mr-1">
    <template v-if="location">
      <p v-if="type === 0" class="text-sm">
        {{ location[`${$i18n.locale}ContinentName`] }}-{{ location[`${$i18n.locale}CountryName`] }}-{{ location[`${$i18n.locale}RegionName`] }}-{{ location[`${$i18n.locale}City`] }}
        ({{ splitedIP(location.ip) }})
      </p>
      <p v-if="type === 1" class="text-sm">
        {{ location[`${$i18n.locale}CountryName`] }}-{{ location[`${$i18n.locale}City`] }}
      </p>
      <p v-if="type === 2" class="text-xs text-gray-800 text-right">
        {{ location[`${$i18n.locale}ContinentName`] }}-{{ location[`${$i18n.locale}CountryName`] }}-{{ location[`${$i18n.locale}RegionName`] }}-{{ location[`${$i18n.locale}City`] }}
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
