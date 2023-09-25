<template>
  <div class="inline filterSelect text-xs">
    <span class="mr-2.5">{{ label }}</span>
    <el-select ref="select" :value="value" :placeholder="this.$t('shared.select')" @change="val => sortBy = val">
      <el-option
        v-for="(val, key) in options"
        :key="key"
        :label="val"
        :value="key"
      />
    </el-select>
  </div>
</template>

<script>
import { getTextWith } from '@/utils/dapp'

export default {
  props: {
    value: { type: String, required: true },
    label: { type: String, required: true },
    options: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      sortBy: this.value
    }
  },
  watch: {
    value() {
      this.sortBy = this.value
    },
    sortBy() {
      this.$emit('input', this.sortBy)
    }
  },
  mounted() {
    this.updateSelectInputWidth()
  },
  updated() {
    this.updateSelectInputWidth()
  },
  methods: {
    updateSelectInputWidth() {
      const option = this.options[this.sortBy]
      if (option) {
        this.$refs.select.$children[0].$el.children[0].style.width = `${getTextWith(option, '12px') + 80}px`
      }
    }
  }
}
</script>

<style lang="postcss">
.filterSelect .el-select input {
  border-radius: 76px;
  height: 28px;
}

.filterSelect .el-input {
  font-size: 12px;
}

.filterSelect .el-input__inner {
  padding: 12px;
  font-size: 12px;
}

.filterSelect .el-input__icon {
  line-height: 28px;
}

 .filterSelect .el-select .el-input .el-select__caret::before {
  content: "";
  background: url(../../assets/img/home/arrow-down.svg) no-repeat;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 10%;
  left: 20%;
  transform: translate(-50%, -50%) rotateZ(180deg);
}

.filterSelect .el-select .el-input .el-select__caret.is-reverse {
  transform: rotateZ(0deg);
}
</style>
