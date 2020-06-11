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

  <div class="flex flex-grow"></div>
  <el-input size="small" suffix-icon="el-icon-search" :placeholder="$t('nav.searchPlaceHolder')" v-model="searchText" class="flex w-1/2"></el-input>
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
      searchText:''
    }
  },
  created() {},
  methods: {
    handleHomeSelect() {
      this.$message('首页')
    },
    handleRanksSelect() {
      this.$message('排行榜')
    },
    handleBlocksCommand(index) {
      this.$message('区块链:' + index)
    },
    handleChartsCommand(index) {
      this.$message('图表:' + index)
    },
    handleResourcesCommand(index) {
      this.$message('资源:' + index)
    }
  }
}
</script>
