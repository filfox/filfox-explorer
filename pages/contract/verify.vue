<template>
  <div class="container mx-auto my-5 font-light">
    <div class="rounded-md bg-white">
      <div class="p-4 border-b-2 border-customGray-100">
        <el-radio-group v-model="activeTab">
          <el-radio-button v-for="{ name, label } in tabs" :key="name" :name="name" :label="label">
            {{ label }}
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="p-4">
        <div class="rounded-md bg-customGray-200 text-customGray-550 flex items-center p-2">
          <img src="@/assets/img/contract/warn.svg" alt="warn" class="w-4.5 h-4.5 mr-2">
          <span class="text-sm">This contract may be a proxy contract</span>
        </div>
        <template v-if="true">
          <div class="rounded-md bg-customGray-200 text-customGray-550 flex items-center p-2 mt-4">
            <img src="@/assets/img/contract/warn.svg" alt="warn" class="w-4.5 h-4.5 mr-2">
            <span class="text-sm">Are you the contract creator? <span class="text-main">Verify and Publish</span> your contract source code today!</span>
          </div>
          <div class="rounded-lg bg-customGray-200 border h-64 mt-2"></div>
        </template>
        <div class="text-customGray-550 flex items-center p-2 mt-5">
          <img src="@/assets/img/contract/ok.svg" alt="warn" class="w-4 h-4 mr-2">
          <span class="font-semibold text-sm">Contract Source Code Verified</span>
        </div>
        <div class="bg-customGray-200 px-3 text-sm rounded-md">
          <div class="border-b border-customGray-300 flex justify-between p-4">
            <div class="flex">
              <div class="w-48 text-customGray-450">Contract Name:</div>
              <span>EYECATS</span>
            </div>
            <div class="flex w-1/2">
              <div class="w-48 text-customGray-450">Optimization Enabled:</div>
              <span>Yes with 200 runs</span>
            </div>
          </div>
          <div class="flex justify-between p-4">
            <div class="flex items-cenetr">
              <div class="w-48 text-customGray-450">Compiler Version:</div>
              <span>V0.8.7+commit.e28d00a7</span>
            </div>
            <div class="flex items-cenetr w-1/2">
              <div class="w-48 text-customGray-450">Other Settings:</div>
              <span>Default evmVersion, None license</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rounded-md p-4 mt-5 bg-white">
      <div class="flex items-center justify-between px-1">
        <span class="text-sm">Contract Source Code <span class="text-customGray-400">( Solidity )</span></span>
        <span class="flex items-center">
          <div class="w-6 h-6 flex bg-customGray-200 rounded cursor-pointer border border-customGray-200 transition duration-200 hover:border-main">
            <img src="@/assets/img/contract/copy.svg" class="w-4 h-4 m-auto">
          </div>
          <div class="w-6 h-6 flex bg-customGray-200 rounded cursor-pointer ml-2">
            <img src="@/assets/img/contract/link.svg" class="w-4 h-4 m-auto">
          </div>
        </span>
      </div>
      <div class="rounded-lg bg-customGray-200 border h-64 mt-2"></div>
    </div>
    <div class="rounded-md p-4 mt-5 bg-white">
      <div class="flex items-center justify-between px-1">
        <span class="text-sm">Contract API</span>
        <span class="flex items-center">
          <div class="px-2 flex bg-customGray-200 rounded cursor-pointer border border-customGray-200 transition duration-200 hover:border-main">
            <el-dropdown>
              <span class="el-dropdown-link text-main text-xs">
                Export ABI<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="w-6 h-6 flex bg-customGray-200 rounded cursor-pointer border border-customGray-200 transition duration-200 hover:border-main ml-2">
            <img src="@/assets/img/contract/copy.svg" class="w-4 h-4 m-auto">
          </div>
        </span>
      </div>
      <div class="rounded-lg bg-customGray-200 border h-64 mt-2"></div>
    </div>
    <div class="rounded-md p-4 mt-5 bg-white">
      <span class="text-sm">Contract Creation Code</span>
      <div class="rounded-lg bg-customGray-200 border h-64 mt-2"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { name: 'message', label: 'Message List' },
        { name: 'transition', label: 'Transition List' },
        { name: 'contract', label: 'Contract' }
      ],
      activeTab: 'contract',

      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      
      value: ''
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {},
  head() {
    return {
      title: `${this.$t('fns.search.title')}`
    }
  }
}
</script>

<style>
.el-radio-group .el-radio-button__inner {
  font-weight: 400;
}

.el-radio-group .is-active .el-radio-button__inner {
  font-weight: 500;
  background: #2452C2;
  border-color: #2452C2;
  box-shadow: none;
}

.export-abi-select {

}
</style>
