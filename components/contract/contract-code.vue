<template>
  <div class="font-light px-8">
    <CodeVerified v-if="verified" :contract="contract" />
    <CodeNotVerified v-else :contract="contract" />
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      contract: {}
    }
  },
  computed: {
    verified() {
      return this.contract?.verified || false
    }
  },
  async mounted() {
    this.contract = await this.$axios.$get(`/address/${this.address}/contract`)
  },
  methods: {}
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
