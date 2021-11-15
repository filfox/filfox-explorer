<template>
  <el-carousel indicator-position="none" class="mt-2 lg:mt-4" :height="bannerHeight+'px'">
    <el-carousel-item v-for="item in banners" :key="item">
      <a :href="url" target="_black">
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
      banners: this.$i18n.locale === 'zh' ? zhBanners : enBanners,
      url: this.$i18n.locale === 'zh' ? 'http://ab8p3tzb49ia4urb.mikecrm.com/mrTNcl2' : 'https://docs.google.com/forms/d/e/1FAIpQLSdWhNaQguufS88mHABbCEM78XF4OXzcYh-ycm6TV3QpTydyqQ/viewform?usp=send_form'
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
