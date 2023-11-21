<template>
  <el-tooltip
    :content="tooltipContent || methodText"
    placement="top"
    :disabled="!(tooltipContent || isMethodTextEllipsis)"
  >
    <div
      ref="method"
      :style="styleObj"
      class="inline-block align-bottom m-auto max-w-48 lg:max-w-36 truncate rounded-sm lg:rounded px-1.5 lg:py-0.25 text-customBlue-290 bg-customBlue-225 text-xs"
    >
      {{ methodText }}
    </div>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    method: { type: String, default: null },
    evmMethod: { type: String, default: null },
    styleObj: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      isMethodTextEllipsis: false
    }
  },

  computed: {
    methodText() {
      return this.evmMethod || this.method || 'N/A'
    },

    tooltipContent() {
      if (/CreateExternal/i.test(this.method)) {
        return `${this.method} ( Contract created )`
      }

      if (/InvokeContract/i.test(this.method) && this.evmMethod) {
        return `${this.evmMethod} type of this message is 'InvokeContract'`
      }

      return ''
    }
  },

  mounted() {
    this.$nextTick(() => {
      const { scrollWidth, clientWidth } = this.$refs.method
      this.isMethodTextEllipsis = scrollWidth > clientWidth
    })
  }
}
</script>
