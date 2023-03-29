<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :show-close="false"
    class="fns"
    custom-class="w-11/12 lg:w-1/3"
  >
    <template slot="title">
      <div class="bg-main py-3 lg:py-4 text-sm lg:text-lg text-center text-white font-semibold">
        GOOD NEWS
      </div>
      <p class="text-center text-sm lg:text-lg font-semibold text-black w-2/3 mt-4 mx-auto">
        Filfox has been supported fvm in Filecoin mainnet
      </p>
    </template>
    <img src="../../assets/img/home/fns-dialog.png" alt="FNS" class="w-full">
    <div slot="footer" class="flex justify-center">
      <a target="_blank" href="https://app.fns.space" class="btn active text-sm lg:text-base" @click="skipToFns">Try It Now</a>
      <div class="btn text-sm lg:text-base ml-4" @click="dialogVisible = false">
        Hold On
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return { dialogVisible: false }
  },
  mounted() {
    this.dialogVisible = !localStorage.getItem('FNS_NEWS')
  },
  methods: {
    skipToFns() {
      this.dialogVisible = false
      localStorage.setItem('FNS_NEWS', true)
    }
  }
}
</script>

<style lang="postcss">
.fns {
  & .el-dialog {
    @apply overflow-hidden rounded-lg !important;
    & .el-dialog__header {
      padding: 0;
    }

    & .btn {
        @apply px-6 py-2 rounded-sm font-semibold bg-gray-200 text-gray-400 cursor-pointer;
        &.active {
        @apply bg-main text-white;
      }
    }
  }
}
</style>
