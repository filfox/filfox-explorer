<template>
  <div class="flex flex-col bg-white overflow-hidden pb-1 border-b border-background">
    <div class="w-full flex">
      <el-input
        v-model="searchText"
        size="mini"
        suffix-icon="el-icon-search"
        :clearable="true"
        :placeholder="$t('nav.searchPlaceHolder')"
        class="mx-3 mt-3"
        @keyup.enter.native="search"
      />
    </div>

    <div class="ml-4 mr-1 mt-1">
      <el-collapse class="w-full">
        <el-collapse-item :title="$t('nav.blocks.title')">
          <nuxt-link :to="localePath('/tipset')" class="link" @click.native="hideIfNeeded">
            {{ $t('nav.blocks.subMenus.0') }}
          </nuxt-link>
          <nuxt-link :to="localePath('/message')" class="link" @click.native="hideIfNeeded">
            {{ $t('nav.blocks.subMenus.1') }}
          </nuxt-link>
          <nuxt-link :to="localePath('/rich-list')" class="link" @click.native="hideIfNeeded">
            {{ $t('nav.blocks.subMenus.2') }}
          </nuxt-link>
          <nuxt-link :to="localePath('/deal')" class="link" @click.native="hideIfNeeded">
            {{ $t('nav.blocks.subMenus.3') }}
          </nuxt-link>
        </el-collapse-item>
      </el-collapse>

      <nuxt-link :to="localePath('/ranks')" class="block ranks text-sm py-2 cursor-pointer" @click.native="hideIfNeeded">
        {{ $t('nav.ranks.title') }}
      </nuxt-link>

      <el-collapse class="w-full">
        <el-collapse-item :title="$t('nav.charts.title')">
          <nuxt-link :to="localePath('/charts/miner')" class="link" @click.native="hideIfNeeded">
            {{ $t('nav.charts.subMenus.0') }}
          </nuxt-link>
          <div class="link" @click="pageNotAvailable">
            {{ $t('nav.charts.subMenus.1') }}
          </div>
        </el-collapse-item>
      </el-collapse>

      <el-collapse class="w-full">
        <el-collapse-item :title="$t('nav.resources.title')">
          <nuxt-link :to="localePath('/tools')" class="link" @click.native="hideIfNeeded">
            {{ $t('nav.resources.subMenus.0') }}
          </nuxt-link>
          <nuxt-link :to="localePath('/wiki/0')" class="link" @click.native="hideIfNeeded">
            {{ $t('nav.resources.subMenus.1') }}
          </nuxt-link>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div v-loading.fullscreen.lock="loading" class="flex flex-grow"></div>
  </div>
</template>

<style lang="postcss">
.ranks {
    font-size: 13px;
    color: #303133;
    font-weight: 500;
}
.link {
    @apply block text-xs text-gray-500 mb-1;
}
.el-collapse {
    border: none;
}
.el-collapse-item__content {
    padding-bottom: 0px;
}

.el-collapse-item__header {
    height: 40px;
    line-height: 40px;
    border: none;
}

.el-collapse-item__wrap {
    border: none;
}
</style>

<script>
export default {
  props: {
    mobileNavHidden: {
      type: Boolean,
      default: true
    }
  },
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
    hideIfNeeded() {
      this.$emit('hideIfNeeded')
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
      this.hideIfNeeded()
    }
  }
}
</script>
