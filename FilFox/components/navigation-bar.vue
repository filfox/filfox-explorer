<template>
 <div id="navBar">
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
   <el-menu-item index="1" @click="$router.push({name: 'index'})">首页</el-menu-item>
   <el-menu-item index="3" @click="$router.push({name: 'ranks'})">排行榜</el-menu-item>
   <el-menu-item index="4" @click="$router.push({name: 'charts'})">图表</el-menu-item>
  </el-menu>
 </div>
</template>

<script>
export default {
  name: 'navBar',
  data() {
    return {}
  },
  created() {},
  methods() {}
}
</script>
