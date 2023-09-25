<template>
  <div class="container mx-auto text-sm">
    <div class="mt-4 px-4 lg:px-0.5 font-medium lg:text-base">
      {{ $t('detail.message.title') }}
    </div>
    <MessageOverview :message="message" class="my-4" />
    <div class="my-4 bg-white lg:rounded-md overflow-hidden">
      <CapsuleRadioGroup
        large
        :radios="tabs"
        :value="tab"
        class="px-4 lg:px-8 py-4 border-b border-background"
        @change="t => tab = t"
      />

      <MessageTransactions v-if="tab == 1" :message="message" />
      <MessageSubcalls v-if="tab == 2" :message="message" />
      <MessageLogs v-if="tab == 3" :message="message" />
      <MessageOthers v-if="tab == 4" :message="message" />
    </div>
  </div>
</template>

<script>
import { matchTabToUrl } from '@/utils'

export default {
  props: {
    message: { type: Object, default: () => ({}) }
  },

  data() {
    return { tab: -1 }
  },

  computed: {
    tabs() {
      return [
        { key: 1, name: this.$t('detail.message.modules.transfer') },
        { key: 2, name: this.$t('detail.message.modules.internaltransfer') },
        { key: 3, name: this.$t('detail.message.modules.logs') },
        { key: 4, name: this.$t('detail.message.modules.others') }
      ].filter(({ key }) => {
        if (key === 1) return this.message.transfers?.length > 0 || this.message.tokenTransfers?.length > 0
        if (key === 2) return this.message.subcallCount > 0
        if (key === 3) return this.message.eventLogCount > 0
        return true
      })
    }
  },

  watch: {
    tab(val) {
      matchTabToUrl(val)
    }
  },

  mounted() {
    this.setDefaultTab()
  },

  methods: {
    setDefaultTab() {
      const t = Number(this.$route.query?.t)
      const keys = this.tabs.map(({ key }) => key)
      this.tab = keys.includes(t) ? t : keys[0]
    }
  }
}
</script>
