<template>
  <div class="container flex h-12 px-0 mx-auto">
    <nuxt-link :to="localePath('/')" class="flex items-center px-2 mr-2 xl:mr-3">
      <div class="text-sm text-background">
        {{ $t('nav.home.title') }}
      </div>
    </nuxt-link>

    <el-dropdown class="flex items-center mx-2 xl:mx-3">
      <span class="px-2 text-sm el-dropdown-link text-background">
        {{ $t('nav.blocks.title') }} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <nuxt-link :to="localePath('/tipset')">
          <el-dropdown-item>{{ $t('nav.blocks.subMenus.0') }}</el-dropdown-item>
        </nuxt-link>
        <nuxt-link :to="localePath('/message')">
          <el-dropdown-item>{{ $t('nav.blocks.subMenus.1') }}</el-dropdown-item>
        </nuxt-link>
        <nuxt-link :to="localePath('/rich-list')">
          <el-dropdown-item>{{ $t('nav.blocks.subMenus.2') }}</el-dropdown-item>
        </nuxt-link>
        <nuxt-link :to="localePath('/deal')">
          <el-dropdown-item>{{ $t('nav.blocks.subMenus.3') }}</el-dropdown-item>
        </nuxt-link>
        <nuxt-link :to="localePath('/mempool')">
          <el-dropdown-item>{{ $t('nav.blocks.subMenus.4') }}</el-dropdown-item>
        </nuxt-link>
        <nuxt-link :to="localePath('/contract')">
          <el-dropdown-item>{{ $t('nav.blocks.subMenus.6') }}</el-dropdown-item>
        </nuxt-link>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown class="flex items-center mx-2 xl:mx-3">
      <span class="px-2 text-sm el-dropdown-link text-background">
        FEVM <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <nuxt-link :to="localePath('/stats/fevm')">
          <el-dropdown-item>{{ $t('nav.charts.subMenus.2') }}</el-dropdown-item>
        </nuxt-link>
        <nuxt-link :to="localePath('/stats/verified-contracts')">
          <el-dropdown-item>{{ $t('nav.charts.subMenus.3') }}</el-dropdown-item>
        </nuxt-link>
        <nuxt-link :to="localePath('/fns')">
          <el-dropdown-item>{{ $t('nav.blocks.subMenus.5') }}</el-dropdown-item>
        </nuxt-link>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown class="flex items-center mx-2 xl:mx-3">
      <span class="px-2 text-sm el-dropdown-link text-background">
        {{ $t('nav.charts.title') }} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <nuxt-link :to="localePath('/stats/miner')">
          <el-dropdown-item>{{ $t('nav.charts.subMenus.0') }}</el-dropdown-item>
        </nuxt-link>
        <nuxt-link :to="localePath('/stats/gas')">
          <el-dropdown-item>{{ $t('nav.charts.subMenus.1') }}</el-dropdown-item>
        </nuxt-link>

        <nuxt-link :to="localePath('/ranks')">
          <el-dropdown-item>{{ $t('nav.ranks.title') }}</el-dropdown-item>
        </nuxt-link>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown class="flex items-center mx-2 xl:mx-3">
      <span class="px-2 text-sm el-dropdown-link text-background">
        {{ $t('nav.resources.title') }} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <nuxt-link :to="localePath('/tools')">
          <el-dropdown-item>{{ $t('nav.resources.subMenus.0') }}</el-dropdown-item>
        </nuxt-link>
        <nuxt-link :to="localePath('/wiki/0')">
          <el-dropdown-item>{{ $t('nav.resources.subMenus.1') }}</el-dropdown-item>
        </nuxt-link>
        <a href="https://wallet.filfox.info" target="_blank">
          <el-dropdown-item>{{ $t('nav.resources.subMenus.2') }}</el-dropdown-item>
        </a>
        <nuxt-link :to="localePath('/fns')">
          <el-dropdown-item>{{ $t('nav.resources.subMenus.3') }}</el-dropdown-item>
        </nuxt-link>
      </el-dropdown-menu>
    </el-dropdown>

    <!-- <a class="flex items-center px-2 mx-2 xl:mx-3" href="https://wallet.filfox.info" target="_blank">
      <div class="flex items-center text-sm text-background">
        {{ $t('wallet.title') }}
        <img src="~/assets/img/space-race/hot.svg" alt="hot" class="h-4 mt-1 ml-2">
      </div>
    </a> -->

    <el-popover
      placement="bottom"
      trigger="hover"
      popper-class="p-0"
      width="220"
    >
      <div slot="reference" class="flex items-center justify-center h-12 text-sm cursor-pointer text-background">
        {{ $t('nav.app.title') }}
        <img src="~/assets/img/shared/fire.svg" alt="hot" class="h-4 ml-1">
      </div>
      <div class="p-2">
        <div class="flex flex-row items-center">
          <img v-if="$i18n.locale === 'zh'" src="~/assets/img/download/fox-wallet-web-zh.jpg" alt="foxwallet download" class="w-24 border border-gray-500 border-dashed" draggable="false">
          <img v-else src="~/assets/img/download/fox-wallet-web-en.jpg" alt="foxwallet" class="w-24 border border-gray-500 border-dashed" draggable="false">
          <div class="flex flex-col items-center justify-between flex-1 ml-2">
            <a
              class="block w-24 py-1 text-xs text-center text-white rounded-md cursor-pointer primary-button hover:opacity-75"
              :href="$i18n.locale === 'zh'? 'https://foxwallet.com/download/zh?invite=evkZv8g5TG' : 'https://foxwallet.com/download/en?invite=evkZv8g5TG'"
              target="_blank"
            >
              <i class="mr-1 el-icon-download"></i>
              {{ $t("nav.app.download") }}
            </a>
            <a
              class="block w-24 py-1 mt-4 text-xs text-center text-white rounded-md cursor-pointer primary-button hover:opacity-75"
              :href="$i18n.locale === 'zh'? 'https://foxwallet.com/zh?invite=evkZv8g5TG' : 'https://foxwallet.com/en?invite=evkZv8g5TG'"
              target="_blank"
            >
              <i class="mr-1 el-icon-monitor"></i>
              {{ $t("nav.app.website") }}
            </a>
          </div>
        </div>
      </div>
    </el-popover>

    <div class="flex-grow"></div>
    <el-input
      v-model="searchText"
      size="small"
      suffix-icon="el-icon-search"
      :placeholder="$t('nav.searchPlaceHolder')"
      class="flex items-center xl:w-2/5"
      :class="{'lg:w-1/3' :$i18n.locale === 'en','lg:w-3/8':$i18n.locale !== 'en'}"
      clearable
      @keyup.enter.native="search"
    />
  </div>
</template>

<script>

export default {
  name: 'NavBar',
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    pageNotAvailable() {
      this.$message(this.$t('shared.notAvailable'))
    },
    search() {
      this.$emit('search', this.searchText.trim())
    }
  }
}
</script>
<style scoped>
.primary-button {
    background: #1a4fc9;
}
</style>
