<template>
  <el-carousel indicator-position="none" class="mt-2 lg:mt-4" :height="bannerHeight+'px'" :direction="bannerHeight < 50 ? 'vertical' : 'horizontal'">
    <el-carousel-item v-for="item in banners" :key="item.url">
      <a :href="item.url" target="_black">
        <img ref="bannerHeight" :src="item.img" alt="home-page-banner">
      </a>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import { enBanners, zhBanners } from '@/filecoin/banner.config.js'
export default {
  data() {
    const locale = this.$i18n.locale
    return {
      bannerHeight: 0,
      locale: locale === 'zh' ? 'zh' : 'en',
      banners: locale === 'zh' ? zhBanners : enBanners
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
        setTimeout(() => {
          this.bannerHeight = this.$refs.bannerHeight[0].height
        }, 500)
      })
    }
  }
}
</script>
