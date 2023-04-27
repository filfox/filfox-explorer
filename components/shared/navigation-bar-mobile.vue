<template>
  <div class="flex flex-col pb-1 overflow-hidden bg-white border-b border-background">
    <div class="mt-1 ml-4 mr-1">
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
          <nuxt-link :to="localePath('/mempool')" class="link" @click.native="hideIfNeeded">
            {{ $t('nav.blocks.subMenus.4') }}
          </nuxt-link>
          <nuxt-link :to="localePath('/fns')" class="link" @click.native="hideIfNeeded">
            {{ $t('nav.blocks.subMenus.5') }}
          </nuxt-link>
          <nuxt-link :to="localePath('/contract')" class="link" @click.native="hideIfNeeded">
            {{ $t('nav.blocks.subMenus.6') }}
          </nuxt-link>
        </el-collapse-item>
      </el-collapse>

      <nuxt-link :to="localePath('/ranks')" class="block py-2 text-sm cursor-pointer ranks" @click.native="hideIfNeeded">
        {{ $t('nav.ranks.title') }}
      </nuxt-link>

      <el-collapse class="w-full">
        <el-collapse-item :title="$t('nav.charts.title')">
          <nuxt-link :to="localePath('/stats/miner')" class="link" @click.native="hideIfNeeded">
            {{ $t('nav.charts.subMenus.0') }}
          </nuxt-link>
          <nuxt-link :to="localePath('/stats/gas')" class="link" @click.native="hideIfNeeded">
            {{ $t('nav.charts.subMenus.1') }}
          </nuxt-link>
          <nuxt-link :to="localePath('/stats/fvm')" class="link" @click.native="hideIfNeeded">
            {{ $t('nav.charts.subMenus.2') }}
          </nuxt-link>
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
          <a href="https://wallet.filfox.info" target="_blank" class="link">
            {{ $t('nav.resources.subMenus.2') }}
          </a>
          <nuxt-link :to="localePath('/fns')" class="link" @click.native="hideIfNeeded">
            {{ $t('nav.resources.subMenus.3') }}
          </nuxt-link>
        </el-collapse-item>
      </el-collapse>

      <div class="block py-2 text-sm cursor-pointer ranks" @click="hideIfNeeded">
        <a href="https://wallet.filfox.info" target="_blank">
          {{ $t('wallet.title') }}
        </a>
      </div>
      <div class="block py-2 text-sm cursor-pointer ranks" @click="hideIfNeeded">
        <a href="https://t.me/Filfoxofficial" target="_blank">
          Telegram
        </a>
      </div>
      <el-collapse class="w-full">
        <el-collapse-item :title="$t('nav.language')">
          <p v-for="(item, index) in languages" :key="item" class="cursor-pointer link" @click="switchLanguage(index)">
            {{ item }}
          </p>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mobileNavHidden: {
      type: Boolean,
      default: true
    },
    languages: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    pageNotAvailable() {
      this.$message(this.$t('shared.notAvailable'))
    },
    hideIfNeeded() {
      this.$emit('hideIfNeeded')
    },
    switchLanguage(index) {
      this.$emit('changeLanguage', index)
      this.$emit('hideIfNeeded')
    }
  }
}
</script>

<style lang="postcss" scoped>
  .ranks {
    font-size: 13px;
    color: #303133;
    font-weight: 500;
  }
  .link {
    @apply block text-xs text-gray-500 mb-1;
  }
  ::v-deep .el-collapse {
    border: none;
  }
  ::v-deep .el-collapse-item__content {
    padding-bottom: 0px;
  }
  ::v-deep .el-collapse-item__header {
    height: 40px;
    line-height: 40px;
    border: none;
  }
  ::v-deep .el-collapse-item__wrap {
    border: none;
  }
</style>
