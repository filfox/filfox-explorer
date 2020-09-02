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

    <nuxt-link class="flex items-center mx-2 xl:mx-3 px-2" :to="localePath('/space-race')">
      <div class="text-background text-sm flex items-center">
        {{ $t('spaceRace.title') }}
        <img src="~/assets/img/space-race/hot.svg" alt="hot" class="ml-2 h-4 mt-1">
      </div>
    </nuxt-link>

    <div class="flex-grow"></div>
    <el-input
      v-model="searchText"
      size="small"
      suffix-icon="el-icon-search"
      :placeholder="$t('nav.searchPlaceHolder')"
      class="flex items-center w-1/2"
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
      searchText: '',
      loading: false
    }
  },
  methods: {
    pageNotAvailable() {
      this.$message(this.$t('shared.notAvailable'))
    },
    async search() {
      const id = this.searchText.trim()
      if (!id) {
        return
      }
      this.loading = true
      const result = await this.$axios.$get('/search', { params: { id } })
      switch (result?.type) {
        case 'tipset':
          this.$router.push(this.localePath(`/tipset/${result.height}`))
          break
        case 'block':
          this.$router.push(this.localePath(`/block/${result.cid}`))
          break
        case 'message':
          this.$router.push(this.localePath(`/message/${result.cid}`))
          break
        case 'address':
          this.$router.push(this.localePath(`/address/${result.address}`))
          break
        case 'peer':
          this.$router.push(this.localePath(`/peer/${result.id}`))
          break
        default:
          this.$message.error(this.$t('shared.noSearchResult'))
      }
      this.loading = false
    }
  }
}
</script>
