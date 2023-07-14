<template>
  <div class="inline filterSelect">
    <span class="mr-2.5">{{ label }}</span>
    <el-select :value="value" @change="onSelect" :placeholder="this.$t('shared.select')">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, required: true },
    label: { type: String, required: true },
    options: { type: Array, required: true }
  },
  methods: {
    onSelect(value) {
      this.$emit('selected', value);
    }
  }
}
</script>

<style lang="postcss">
.filterSelect .el-select input {
  border-radius: 76px;
  width: 140px;
  height: 28px;
}

.filterSelect .el-input__inner {
  padding: 12px;
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
