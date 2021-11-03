<template>
  <div class="container flex h-12 mx-auto px-0">
    <nuxt-link :to="localePath('/')" class="flex items-center mr-2 xl:mr-3 px-2">
      <div class="text-background text-sm">
        {{ $t('nav.home.title') }}
      </div>
    </nuxt-link>

    <el-dropdown class="flex items-center mx-2 xl:mx-3">
      <span class="el-dropdown-link px-2 text-background text-sm">
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
      </el-dropdown-menu>
    </el-dropdown>

    <nuxt-link class="flex items-center mx-2 xl:mx-3 px-2" :to="localePath('/ranks')">
      <div class="text-background text-sm">
        {{ $t('nav.ranks.title') }}
      </div>
    </nuxt-link>

    <el-dropdown class="flex items-center mx-2 xl:mx-3">
      <span class="el-dropdown-link px-2 text-background text-sm">
        {{ $t('nav.charts.title') }} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <nuxt-link :to="localePath('/stats/miner')">
          <el-dropdown-item>{{ $t('nav.charts.subMenus.0') }}</el-dropdown-item>
        </nuxt-link>
        <nuxt-link :to="localePath('/stats/gas')">
          <el-dropdown-item>{{ $t('nav.charts.subMenus.1') }}</el-dropdown-item>
        </nuxt-link>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown class="flex items-center mx-2 xl:mx-3">
      <span class="el-dropdown-link px-2 text-background text-sm">
        {{ $t('nav.resources.title') }} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <nuxt-link :to="localePath('/tools')">
          <el-dropdown-item>{{ $t('nav.resources.subMenus.0') }}</el-dropdown-item>
        </nuxt-link>
        <nuxt-link :to="localePath('/wiki/0')">
          <el-dropdown-item>{{ $t('nav.resources.subMenus.1') }}</el-dropdown-item>
        </nuxt-link>
      </el-dropdown-menu>
    </el-dropdown>

    <a class="flex items-center mx-2 xl:mx-3 px-2" href="https://wallet.filfox.info" target="_blank">
      <div class="text-background text-sm flex items-center">
        {{ $t('wallet.title') }}
        <img src="~/assets/img/space-race/hot.svg" alt="hot" class="ml-2 h-4 mt-1">
      </div>
    </a>

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
