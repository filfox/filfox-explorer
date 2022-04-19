<template>
  <div>
    <el-carousel indicator-position="none" class="hidden md:block mt-2 lg:mt-4" :height="bannerHeight+'px'" :direction="bannerHeight < 50 ? 'vertical' : 'horizontal'">
      <el-carousel-item v-for="item in banners" :key="item.url">
        <a :href="item.url" target="_black">
          <img ref="bannerHeight" :src="item.img" alt="home-page-banner">
        </a>
      </el-carousel-item>
    </el-carousel>
    <el-carousel indicator-position="none" class="md:hidden mt-2 lg:mt-4" :height="mobileBannerHeight+'px'" :direction="mobileBannerHeight < 50 ? 'vertical' : 'horizontal'">
      <el-carousel-item v-for="item in banners" :key="item.url">
        <a :href="item.url" target="_black">
          <img ref="mobileBannerHeight" :src="item.mobileImg" alt="home-page-banner">
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { enBanners, zhBanners } from '@/filecoin/banner.config.js'
export default {
  data() {
    const locale = this.$i18n.locale
    return {
      bannerHeight: 0,
      mobileBannerHeight: 0,
      locale: locale === 'zh' ? 'zh' : 'en',
      banners: locale === 'zh' ? zhBanners : enBanners
    }
  },
  mounted() {
    this.imgLoad()
    window.addEventListener('resize', () => {
      this.bannerHeight = this.$refs.bannerHeight[0].height
      this.mobileBannerHeight = this.$refs.mobileBannerHeight[0].height
      this.imgLoad()
    }, false)
  },
  methods: {
    imgLoad() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.bannerHeight = this.$refs.bannerHeight[0].height
          this.mobileBannerHeight = this.$refs.mobileBannerHeight[0].height
        }, 500)
      })
    }
  }
}
</script>
