<template>
  <div v-if="showInfo" class="infoBox">
    <div class="text-base infoText">
      {{ $t('home.browserCloseTip') }}<span class="ml-2">mainnet:http://8.218.132.229</span><span class="ml-2">calibration:http://47.109.105.51</span>
    </div>
    <div class="w-30 flex items-center justify-center"><i class="el-icon-close infoIcon"  @click="showInfo = !showInfo"></i></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showInfo: true
    };
  },
  computed: {

  }
};
</script>

<style scoped>
.infoBox {
  position: relative;
  padding: 0.8rem 0rem 0.8rem 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 3.8rem;
  margin-top: 1rem;
  background-repeat: no-repeat; /* 背景略平铺1_1 */
  background-size: 100% 100%; /* 背景略平铺1_2 */
  -moz-background-size: 100% 100%;  /* 背景略平铺1_3 */
  background-image: url('@/assets/img/home/infoBg.png');
}
.infoText{
  color: #555555;
}
.infoIcon {
  font-size: 1.1rem;
  font-weight: 600;
  color: #C0BFB1;
  cursor: pointer;
}
</style>
