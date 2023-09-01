<template>
  <div>
    <el-button
      v-for="r in radios"
      :key="r.key"
      round
      size="mini"
      v-bind="active == r.key ? { type: 'primary', plain: true, class: ['pointer-events-none'] } : {}"
      @click="e => didRadioSwitched(e, r.key)"
    >
      <span class="flex items-center font-normal" :class="{ 'text-sm': large }">
        {{ r.name }}
        <img v-if="r.verified" src="@/assets/img/contract/ok.svg" class="w-3 ml-1">
      </span>
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'CapsuleRadioGroup',
  props: {
    large: {
      type: Boolean,
      default: false
    },

    value: {
      type: [String, Number],
      require: true,
      default: ''
    },

    radios: {
      type: Array,
      require: true,
      default: () => []
    }
  },

  computed: {
    active: {
      get() { return this.value },
      set(v) { this.$emit('change', v) }
    }
  },

  methods: {
    didRadioSwitched(e, key) {
      this.active = key
      let node = e.target
      while (true) {
        if (node?.tagName?.toLowerCase() === 'button') {
          node.blur()
          break
        } else {
          node = node.parentElement
        }
      }
    }
  }
}
</script>
