<template>
  <span>
    <span v-if="!$slots.default">
      <span v-if="plain || !id" class="plain">
        {{ formatString }}
        <a :href="`${FNS}/domain/` + name" target="_blank" class="cursor-pointer text-main hover:opacity-75">{{ nameExist }}</a>
      </span>
      <span v-else>
        <nuxt-link :class="colorClass" :to="to">
          {{ formatString }}
        </nuxt-link>
        <a :href="`${FNS}/domain/` + name" target="_blank" class="cursor-pointer text-main hover:opacity-75">{{ nameExist }}</a>
      </span>
    </span>
    <slot v-else></slot>
  </span>
</template>
<script>
import { transAddress } from '../../utils/fns/utils'
import { fnsServer, FNS } from '../../filecoin/filecoin.config'
export default {
  props: {
    id: { type: null, required: true },
    plain: { type: Boolean, default: false },
    // eslint-disable-next-line vue/require-default-prop
    format: {
      validator(value) {
        return value == null || Number.isInteger(value)
          || (Array.isArray(value) && value.length === 2 && value.every(Number.isInteger))
      }
    },
    colorClass: { type: String, default: 'text-filecoin' }
  },
  data() {
    return {
      name: '',
      FNS
    }
  },
  computed: {
    to() {
      const id = this.id || ''
      return this.localePath(`/address/${id}`)
    },
    formatString() {
      const id = this.id || ''
      let head
      let tail
      if (Number.isInteger(this.format)) {
        head = tail = this.format
        if (head + tail + 1 >= id.length) {
          return id
        } else {
          return `${id.slice(0, head)}...${id.slice(-tail)}`
        }
      } else {
        return id
      }
    },
    nameExist() {
      return this.name ? `(${this.name})` : ''
    }
  },
  async mounted() {
    try {
      const id = this.id || ''
      if (id.startsWith('f4')) {
        let name = localStorage.getItem(`fns:${id}`)
        if (name) {
          name = JSON.parse(name)
          if (Number(new Date()) - name.time > 60 * 10 * 1000) {
            localStorage.removeItem(`fns:${id}`)
            name = ''
          } else {
            this.name = name.name
            return
          }
        }

        const result = (await this.$axios.$get(`${fnsServer}/name/find`, { params: { address: transAddress(id) } })).data
        if (result.name) {
          localStorage.setItem(`fns:${id}`, JSON.stringify({ time: Number(new Date()), name: result.name }))
          this.name = result.name
        }
      }
    } catch {}
  }
}
</script>
