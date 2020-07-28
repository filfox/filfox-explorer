<template>
  <div class="container px-4 h-12 flex-row items-center mx-auto lg:px-0">
    <nuxt-link :to="localePath('/')">
      <div class="ml-2 mr-5 text-background text-sm cursor-pointer outline-none focus:outline-none">
        {{ $t('nav.home.title') }}
      </div>
    </nuxt-link>

    <el-dropdown class="m-5 outline-none focus:outline-none">
      <span class="el-dropdown-link text-background text-sm">
        {{ $t('nav.blocks.title') }} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <nuxt-link :to="localePath('/tipset')">
          <el-dropdown-item>{{ $t('nav.blocks.subMenus.0') }}</el-dropdown-item>
        </nuxt-link>
        <nuxt-link :to="localePath('/message')">
          <el-dropdown-item>{{ $t('nav.blocks.subMenus.1') }}</el-dropdown-item>
        </nuxt-link>
        <nuxt-link :to="localePath('/rich')">
          <el-dropdown-item>{{ $t('nav.blocks.subMenus.2') }}</el-dropdown-item>
        </nuxt-link>
      </el-dropdown-menu>
    </el-dropdown>

    <nuxt-link :to="localePath('/ranks')">
      <div class="m-5 text-background text-sm cursor-pointer outline-none focus:outline-none">
        {{ $t('nav.ranks.title') }}
      </div>
    </nuxt-link>

    <el-dropdown class="m-5 outline-none focus:outline-none">
      <span class="el-dropdown-link text-background text-sm">
        {{ $t('nav.charts.title') }} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <nuxt-link :to="localePath('/charts/miner')">
          <el-dropdown-item>{{ $t('nav.charts.subMenus.0') }}</el-dropdown-item>
        </nuxt-link>
        <el-dropdown-item @click.native="pageNotAvailable">
          {{ $t('nav.charts.subMenus.1') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown class="m-5 outline-none focus:outline-none">
      <span class="el-dropdown-link text-background text-sm">
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

    <div v-loading.fullscreen.lock="loading" class="flex flex-grow"></div>
    <el-input
      v-model="searchText"
      size="small"
      suffix-icon="el-icon-search"
      :placeholder="$t('nav.searchPlaceHolder')"
      class="flex w-1/2"
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
          this.searchString = ''
          this.$router.push(this.localePath(`/tipset/${result.height}`))
          break
        case 'block':
          this.searchString = ''
          this.$router.push(this.localePath(`/block/${result.cid}`))
          break
        case 'message':
          this.searchString = ''
          this.$router.push(this.localePath(`/message/${result.cid}`))
          break
        case 'address':
          this.searchString = ''
          this.$router.push(this.localePath(`/address/${result.address}`))
          break
        case 'peer':
          this.searchString = ''
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
