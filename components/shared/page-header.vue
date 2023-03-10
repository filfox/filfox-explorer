<template>
  <nav class="mx-auto bg-main h-28 w-full">
    <div class="flex h-16 container mx-auto items-center lg:pt-2 justify-between">
      <nuxt-link :to="localePath('/')" class="flex items-center lg:-ml-4 px-1 lg:px-4" @click.native="hideIfNeeded">
        <img src="~/assets/img/home/logo.svg" alt="filfox" class="h-6 lg:h-8">
      </nuxt-link>
      <el-input
        v-model="searchText"
        size="mini"
        suffix-icon="el-icon-search"
        :clearable="true"
        :placeholder="$t('nav.searchPlaceHolder')"
        class="lg:hidden mx-3 md:mx-8 flex-1"
        @keyup.enter.native="search(searchText)"
      />
      <div class="flex items-center">
        <a target="_blank" href="https://t.me/Filfoxofficial" class="hidden lg:block">
          <img src="~/assets/img/home/telegram.svg" alt="telegram" class="w-6 lg:mr-6 mr-2">
        </a>
        <div v-if="network.multipleNetworks" class="hidden lg:flex items-center mr-6">
          <img v-if="network.networks.length > 1" src="~/assets/img/home/switchNet.svg" alt="net" class="w-5 mr-2">
          <p class="text-white text-sm mr-1">
            {{ $t('shared.currentNetwork') }}
          </p>
          <el-dropdown v-if="network.networks.length > 1" class="flex items-center mr-0" trigger="click" hide-on-click>
            <span class="el-dropdown-link text-background text-sm">
              {{ network.networks[network.currentNetwork].name }} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <template v-for="(dic, i) in network.networks">
                <a v-if="network.currentNetwork != i" :key="i" :href="dic.url" target="_blank">
                  <el-dropdown-item :key="i" :command="i">
                    {{ dic.name }}
                  </el-dropdown-item>
                </a>
                <el-dropdown-item v-else :key="i" :command="i">
                  {{ dic.name }}
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
          <span v-else class="text-background text-sm">{{ network.networks[network.currentNetwork].name }}</span>
        </div>

        <div class="flex items-center">
          <img src="~/assets/img/home/language.svg" alt="china" class="mr-2 hidden lg:block">
          <el-dropdown class="mr-3 lg:mr-0 flex items-center hidden lg:block" trigger="click" hide-on-click @command="didLanguageSwitched">
            <span class="el-dropdown-link text-background text-sm">
              {{ selectedLanguage }} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(title,i) in languages" :key="i" :command="i">
                {{ title }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <button class="flex lg:hidden mr-4 sm:mr-0 items-center h-10" @click="didMobileMenuClicked">
            <img src="~/assets/img/home/menu.svg" alt="menu" class="cursor-pointer h-3">
          </button>
        </div>
        <!-- <HomeHeadNotifyBell /> -->
      </div>
    </div>
    <NavigationBar class="hidden lg:flex" @search="search" />
    <NavigationBarMobile class="lg:hidden" :languages="languages" :class="{'hidden': mobileNavHidden}" @changeLanguage="didLanguageSwitched" @hideIfNeeded="hideIfNeeded" />
    <div v-loading.fullscreen.lock="loading" class="flex flex-grow"></div>
    <DownloadAffix />
  </nav>
</template>

<script>
import navigationBar from '~/components/shared/navigation-bar'
import { network } from '~/filecoin/filecoin.config'

export default {
  components: {
    navigationBar
  },
  data() {
    return {
      mobileNavHidden: true,
      languages: ['中文', 'English', '한국어'],
      localeMap: {
        zh: '中文',
        en: 'English',
        ko: '한국어'
      },
      searchText: '',
      network,
      loading: false
    }
  },
  computed: {
    selectedLanguage() {
      return this.localeMap[this.$i18n.locale]
    }
  },
  methods: {
    didMobileMenuClicked() {
      this.mobileNavHidden = !this.mobileNavHidden
    },
    hideIfNeeded() {
      this.mobileNavHidden = true
    },
    didLanguageSwitched(command) {
      if (command === 0) {
        if (this.$i18n.locale === 'zh') {
          return
        }
        this.$i18n.locale = 'zh'
      } else if (command === 1) {
        if (this.$i18n.locale === 'en') {
          return
        }
        this.$i18n.locale = 'en'
      } else {
        if (this.$i18n.locale === 'ko') {
          return
        }
        this.$i18n.locale = 'ko'
      }
      if (this.$route.path.length === 3) {
        this.$router.push(this.localePath('/'))
      } else {
        this.$router.push(this.localePath(this.$route.path.slice(3)))
      }
    },
    async search(searchText) {
      const id = searchText.trim()
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
