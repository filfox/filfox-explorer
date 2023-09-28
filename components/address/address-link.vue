<template>
  <span>
    <span v-if="!$slots.default">
      <el-tooltip
        :content="id | address0x0"
        placement="top"
        :disabled="!show0x0Tooltip"
      >
        <span v-if="plain || !id" class="plain break-all">
          {{ formatString }}
        </span>
        <span v-else>
          <nuxt-link :class="colorClass" :to="to">
            {{ formatString }}
          </nuxt-link>
        </span>
      </el-tooltip>

      <a
        :href="`${FNS}/domain/` + name"
        target="_blank"
        class="cursor-pointer text-main hover:opacity-75"
      >{{ nameExist }}</a>
    </span>
    <slot v-else></slot>
  </span>
</template>

<script>
import { FNS_SERVER, FNS } from '@/filecoin/filecoin.config'
import { transAddress } from '@/utils/fns/utils'
import { is0x0Address, isFil0x0Address, ADDRESS_0X0 } from '@/utils'

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

    isFormat() {
      return Number.isInteger(this.format)
    },

    formatString() {
      let id = this.id || ''
      const isNeed0x0 = this.isFormat && is0x0Address(id)
      if (isNeed0x0) id = ADDRESS_0X0

      if (this.isFormat && (2 * this.format + 1 < id.length)) {
        id = `${id.slice(0, this.format)}...${id.slice(-this.format)}`
        if (isNeed0x0) id = `Null:${id}`
      }

      return id
    },

    show0x0Tooltip() {
      return this.isFormat ? is0x0Address(this.id) : (isFil0x0Address(this.id))
    },

    nameExist() {
      return this.name ? `(${this.name})` : ''
    }
  },

  async mounted() {
    try {
      const id = this.id || ''
      if (id.startsWith('f4') || id.startsWith('t4')) {
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

        const result = (await this.$axios.$get(`${FNS_SERVER}/name/find`, { params: { address: transAddress(id) } })).data
        if (result.name) {
          localStorage.setItem(`fns:${id}`, JSON.stringify({ time: Number(new Date()), name: result.name }))
          this.name = result.name
        }
      }
    } catch {}
  },

  methods: {
    is0x0Address
  }
}
</script>
