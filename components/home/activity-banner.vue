<template>
  <div>
    <el-carousel indicator-position="none" class="hidden md:block mt-2 lg:mt-4 rounded-md" :height="bannerHeight+'px'" :direction="bannerHeight < 50 ? 'vertical' : 'horizontal'">
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
export default {
  data() {
    const locale = this.$i18n.locale
    return {
      bannerHeight: 0,
      mobileBannerHeight: 0,
      locale: locale === 'zh' ? 'zh' : 'en',
      banners: []
    }
  },

  async mounted() {
    await this.getBanners()
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
    },

    async getBanners() {
      const res = await this.$axios.$get(`https://hyperspace.filfox.info/admin/api/banner/list`)

      if (this.locale === 'zh') {
        this.banners = res.result.map(({ urlZh, imgZh, imgMobileZh }) => ({ url: urlZh, img: imgZh, mobileImg: imgMobileZh }))
      } else {
        this.banners = res.result.map(({ url, img, imgMobile }) => ({ url, img, mobileImg: imgMobile }))
      }
    }
  }
}
</script>
