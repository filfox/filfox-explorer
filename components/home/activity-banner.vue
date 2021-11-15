<template>
  <el-carousel indicator-position="none" class="mt-2 lg:mt-4" :height="bannerHeight+'px'">
    <el-carousel-item v-for="item in banners" :key="item">
      <a :href="'https://foxwallet.com/'+locale" target="_black">
        <img ref="bannerHeight" :src="item" alt="home-page-banner">
      </a>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import { enBanners, zhBanners } from '@/filecoin/banner.config.js'
export default {
  data() {
    return {
      bannerHeight: 0,
      locale: this.$i18n.locale === 'zh' ? 'zh' : 'en',
      banners: this.$i18n.locale === 'zh' ? zhBanners : enBanners
    }
  },
  mounted() {
    this.imgLoad()
    window.addEventListener('resize', () => {
      this.bannerHeight = this.$refs.bannerHeight[0].height
      this.imgLoad()
    }, false)
  },
  methods: {
    imgLoad() {
      this.$nextTick(() => {
        this.bannerHeight = this.$refs.bannerHeight[0].height
      })
    }
  }
}
</script>
