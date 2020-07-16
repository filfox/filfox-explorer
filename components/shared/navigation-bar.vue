<template>
 <div class="container px-4 h-12 flex-row items-center mx-auto lg:px-0">
   <nuxt-link :to="localePath('/')">
      <div class="ml-2 mr-5 text-background text-sm cursor-pointer outline-none focus:outline-none">
        {{$t('nav.home.title')}}
      </div>
   </nuxt-link>
   
   <el-dropdown class="m-5 outline-none focus:outline-none">
      <span class="el-dropdown-link text-background text-sm">
           {{$t('nav.blocks.title')}} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <nuxt-link :to="localePath('/recent-tipsets')">
           <el-dropdown-item > {{ $t('nav.blocks.subMenus.0') }} </el-dropdown-item>
        </nuxt-link>
        <nuxt-link :to="localePath('/messages')">
          <el-dropdown-item > {{ $t('nav.blocks.subMenus.1') }} </el-dropdown-item>
        </nuxt-link>
        <nuxt-link :to="localePath('/rich')">
          <el-dropdown-item > {{ $t('nav.blocks.subMenus.2') }} </el-dropdown-item>
        </nuxt-link>
      </el-dropdown-menu>
   </el-dropdown>

   <nuxt-link :to="localePath('/ranks')">
      <div class="m-5 text-background text-sm cursor-pointer outline-none focus:outline-none">
        {{$t('nav.ranks.title')}}
      </div>
   </nuxt-link>

   <el-dropdown class="m-5 outline-none focus:outline-none" @command="handleChartsCommand">
      <span class="el-dropdown-link text-background text-sm">
           {{$t('nav.charts.title')}} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
         <el-dropdown-item v-for="(title,i) in chartsSubMenus" :key="i" :command="i"> {{ title }} </el-dropdown-item>
      </el-dropdown-menu>
   </el-dropdown>

   <el-dropdown class="m-5 outline-none focus:outline-none" @command="handleResourcesCommand">
      <span class="el-dropdown-link text-background text-sm">
           {{$t('nav.resources.title')}} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
         <el-dropdown-item v-for="(title,i) in resourcesSubMenus" :key="i" :command='i'> {{ title }} </el-dropdown-item>
      </el-dropdown-menu>
   </el-dropdown>

  <div class="flex flex-grow" v-loading.fullscreen.lock="loading"></div>
  <el-input size="small" suffix-icon="el-icon-search" :placeholder="$t('nav.searchPlaceHolder')" v-model="searchText" class="flex w-1/2" @keyup.enter.native="search"></el-input>
 </div>
</template>

<script>

export default {
  name: 'navBar',
  data() {
    return {
      searchText:'',
      loading: false
    }
  },
  computed: {
    chartsSubMenus() {
      return this.$t('nav.charts.subMenus')
    },
    resourcesSubMenus() {
      return this.$t('nav.resources.subMenus')
    }
  },
  created() {},
  methods: {
    handleChartsCommand(index) {
      if (index == 0) {
        this.$router.push(this.localePath('/charts/miner'))
      }
      else if (index == 1) {
        this.$message(this.$t('shared.notAvailable'))
        //this.$router.push(this.localePath('/charts/fil'))
      }
    },
    handleResourcesCommand(index) {
      if (index == 0) {
        this.$message(this.$t('shared.notAvailable'))
        //this.$router.push(this.localePath('/resources/tools'))
      }
      else if (index == 1) {
        this.$message(this.$t('shared.notAvailable'))
        //this.$router.push(this.localePath('/resources/wiki'))
      }
    },
    async search() {
      const id = this.searchText.trim()
      if (!id) {
        return
      }
      this.loading = true
      const result = await this.$axios.$get('/search', {params: {id}})
      switch (result?.type) {
      case 'tipset':
        this.searchString = ''
        this.$router.push(this.localePath('/tipset/' + result.height))
        break
      case 'block':
        this.searchString = ''
        this.$router.push(this.localePath('/block/' + result.cid))
        break
      case 'message':
        this.searchString = ''
        this.$router.push(this.localePath('/message/' + result.cid))
        break
      case 'address':
        this.searchString = ''
        this.$router.push(this.localePath('/address/' + result.address))
        break
      case 'peer':
        this.searchString = ''
        this.$router.push(this.localePath('/peer/' + result.id))
        break
      default:
        this.$message.error(this.$t('shared.noSearchResult'));
      }
      this.loading = false
    }
  }
}
</script>
