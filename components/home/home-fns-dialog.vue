<template>
  <el-dialog
    :visible.sync="dialogVisible"
    class="fns-news"
    custom-class="w-11/12 lg:w-1/3"
  >
    <template slot="title">
      <div class="bg-main py-3 lg:py-4 text-sm lg:text-lg text-center text-white font-semibold">
        GOOD NEWS
      </div>
      <div class="text-center text-sm lg:text-lg font-semibold text-black w-4/5 mt-4 mx-auto">
        FNS Beta Version is now live at fns.space!<br>
        <div class="font-light text-customGray-375 text-base mt-2">
          FNS is devoted to creating a decentralized personal portal and DID system for Web3 users based on FVM, welcome to join us!
        </div>
      </div>
    </template>
    <img src="../../assets/img/home/fns-dialog.png" alt="FNS" class="w-full">
    <div slot="footer" class="flex justify-center">
      <a target="_blank" href="https://app.fns.space" class="btn active text-sm lg:text-base" @click="dialogVisible = false">Go</a>
      <div class="btn text-sm lg:text-base ml-4" @click="dialogVisible = false">
        Skip
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return { dialogVisible: false }
  },
  watch: {
    dialogVisible(val) {
      if (!val) localStorage.setItem('FNS_NEWS', true)
    }
  },
  mounted() {
    // this.dialogVisible = !localStorage.getItem('FNS_NEWS')
  }

}
</script>

<style lang="postcss">
.fns-news {
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
