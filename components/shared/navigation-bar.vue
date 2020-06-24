<template>
 <div class="container mx-auto h-12 flex flex-row items-center">
   <div class="ml-2 mr-5 text-background text-sm cursor-pointer" @click="handleHomeSelect">
     {{$t('nav.home.title')}}
   </div>
   
   <el-dropdown class="m-5" @command="handleBlocksCommand">
      <span class="el-dropdown-link text-background text-sm">
           {{$t('nav.blocks.title')}} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
         <el-dropdown-item v-for="(title,i) in blocksSubMenus" :key="i" :command="i"> {{ title }} </el-dropdown-item>
      </el-dropdown-menu>
   </el-dropdown>

   <div class="m-5 text-background text-sm cursor-pointer" @click="handleRanksSelect">
     {{$t('nav.ranks.title')}}
   </div>

   <el-dropdown class="m-5" @command="handleChartsCommand">
      <span class="el-dropdown-link text-background text-sm">
           {{$t('nav.charts.title')}} <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
         <el-dropdown-item v-for="(title,i) in chartsSubMenus" :key="i" :command="i"> {{ title }} </el-dropdown-item>
      </el-dropdown-menu>
   </el-dropdown>

   <el-dropdown class="m-5" @command="handleResourcesCommand">
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
      activeIndex:'0',
      blocksSubMenus: this.$t('nav.blocks.subMenus'),
      chartsSubMenus: this.$t('nav.charts.subMenus'),
      resourcesSubMenus: this.$t('nav.resources.subMenus'),
      searchText:'',
      loading: false
    }
  },
  created() {},
  methods: {
    handleHomeSelect() {
      this.$router.push(this.localePath('/'))
    },
    handleRanksSelect() {
      this.$router.push(this.localePath('/ranks'))
    },
    handleBlocksCommand(index) {
      if (index == 0) {
        this.$router.push(this.localePath('/blockchain/blocks'))
      }
      else if (index == 1) {
        this.$router.push(this.localePath('/blockchain/messages'))
      }
      else {
        this.$router.push(this.localePath('/blockchain/rich'))
      }
    },
    handleChartsCommand(index) {
      if (index == 0) {
        this.$router.push(this.localePath('/charts/miner'))
      }
      else if (index == 1) {
        this.$router.push(this.localePath('/charts/fil'))
      }
    },
    handleResourcesCommand(index) {
      if (index == 0) {
        this.$router.push(this.localePath('/resources/tools'))
      }
      else if (index == 1) {
        this.$router.push(this.localePath('/resources/wiki'))
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
        this.$router.push(this.localePath('/detail/tipset/' + result.height))
        console.log('1')
        break
      case 'block':
        this.searchString = ''
        this.$router.push(this.localePath('/detail/block/' + result.cid))
        console.log('2')
        break
      case 'message':
        this.searchString = ''
        this.$router.push(this.localePath('/detail/message/' + result.cid))
        console.log('3')
        break
      case 'address':
        this.searchString = ''
        this.$router.push(this.localePath('/detail/address/' + result.address))
        break
      case 'peer':
        this.searchString = ''
        this.$router.push(this.localePath('/detail/peer/' + result.id))
        console.log('5')
        break
      default:
        console.log('6')
        this.$message.error(this.$t('shared.noSearchResult'));
      }
      this.loading = false
    }
  }
}
</script>
