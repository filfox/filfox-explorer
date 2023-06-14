<template>
  <div class="font-light px-4 md:px-8 pb-6 md:pb-8 pt-3">
    <CodeVerified v-if="verified" :contract="contract" />
    <CodeNotVerified v-else :contract="contract" />
  </div>
</template>

<script>
export default {
  props: {
    contract: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    verified() {
      return this.contract?.verified || false
    }
  }
}
</script>

<style>
.el-radio-group .el-radio-button__inner {
  font-weight: 400;
}

.el-radio-group .is-active .el-radio-button__inner {
  font-weight: 500;
  background: #2452C2;
  border-color: #2452C2;
  box-shadow: none;
}
</style>
