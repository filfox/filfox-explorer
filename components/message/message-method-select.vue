<template>
  <el-select v-model="method" v-bind="elSelectOptions">
    <el-option
      v-for="item in methodOptions"
      :key="item"
      :label="item == 'All' ? $t('blockchain.message.methods.all') : item"
      :value="item"
    />
  </el-select>
</template>

<script>
export default {
  props: {
    methods: { type: Array, required: true },
    elSelectOptions: { type: Object, default: () => ({}) },
    value: { type: String, required: true }
  },
  data() {
    return {
      method: this.value
    }
  },
  computed: {
    methodOptions() {
      return ['All', ...this.methods]
    }
  },
  watch: {
    value() {
      this.method = this.value
    },
    method() {
      this.$emit('input', this.method)
    }
  }
}
</script>
