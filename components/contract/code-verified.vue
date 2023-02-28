<template>
  <div class="font-light">
    <div class="hidden rounded-md bg-customGray-200 text-customGray-600 flex items-center p-2">
      <img src="@/assets/img/contract/warn.svg" alt="warn" class="w-4.5 h-4.5 mr-2">
      <span class="text-sm">This contract may be a proxy contract</span>
    </div>
    <div class="text-customGray-600 flex items-center p-2 mt-4">
      <img src="@/assets/img/contract/ok.svg" alt="warn" class="w-4 h-4 mr-2">
      <span class="font-semibold text-sm">Contract Source Code Verified</span>
    </div>
    <div class="bg-customGray-200 px-3 text-sm rounded-md">
      <div class="border-b border-customGray-300 flex justify-between p-4">
        <div class="flex">
          <div class="w-48 text-customGray-450">
            Contract Name:
          </div>
          <span>{{ contract.contractName }}</span>
        </div>
        <div class="flex w-1/2">
          <div class="w-48 text-customGray-450">
            Optimization Enabled:
          </div>
          <span>{{ contract.optimizeRuns }}</span>
        </div>
      </div>
      <div class="flex justify-between p-4">
        <div class="flex items-cenetr">
          <div class="w-48 text-customGray-450">
            Compiler Version:
          </div>
          <span>{{ contract.compiler }}</span>
        </div>
        <div class="flex items-cenetr w-1/2">
          <div class="w-48 text-customGray-450">
            Other Settings:
          </div>
          <span>Default evmVersion, {{ contract.license || 'None license' }}</span>
        </div>
      </div>
    </div>

    <div class="rounded-md mt-5 bg-white">
      <div class="flex items-center justify-between px-1">
        <span class="text-sm">Contract Source Code <span class="text-customGray-400">( {{ contract.language }} )</span></span>
        <span class="flex items-center">
          <div
            class="w-6 h-6 flex bg-customGray-200 rounded cursor-pointer border border-customGray-200 transition duration-200 hover:border-main"
            @click="copyTxt(contract.sourceFiles[0].content)"
          >
            <img src="@/assets/img/contract/copy.svg" class="w-4 h-4 m-auto">
          </div>
          <div class="w-6 h-6 flex bg-customGray-200 rounded cursor-pointer ml-2">
            <img src="@/assets/img/contract/link.svg" class="w-4 h-4 m-auto">
          </div>
        </span>
      </div>
      <div class="rounded-lg bg-customGray-200 border h-68 mt-2 p-4 overflow-auto break-all text-sm whitespace-pre">
        {{ sourceCodes }}
      </div>
    </div>
    <div class="rounded-md mt-5 bg-white">
      <div class="flex items-center justify-between px-1">
        <span class="text-sm">Contract ABI</span>
        <span class="flex items-center">
          <div class="px-2 flex bg-customGray-200 rounded cursor-pointer border border-customGray-200 transition duration-200 hover:border-main">
            <el-dropdown>
              <span class="el-dropdown-link text-main text-xs">
                Export ABI<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="name in abis"
                  :key="name"
                  icon="el-icon-circle-plus-outline"
                  @click="exportAbi(name)"
                >{{ name }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div
            class="w-6 h-6 flex bg-customGray-200 rounded cursor-pointer border border-customGray-200 transition duration-200 hover:border-main ml-2"
            @click="copyTxt(contract.abi)"
          >
            <img src="@/assets/img/contract/copy.svg" class="w-4 h-4 m-auto">
          </div>
        </span>
      </div>
      <div class="rounded-lg bg-customGray-200 border h-64 mt-2 p-4 overflow-auto break-all text-sm">
        {{ contract.abi }}
      </div>
    </div>
    <div class="rounded-md mt-5 bg-white">
      <span class="text-sm">Contract Creation Code</span>
      <div class="rounded-lg bg-customGray-200 border h-64 mt-2 p-4 overflow-auto break-all text-sm">
        {{ contract.initCode }}
      </div>
    </div>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard'

export default {
  props: {
    contract: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      value: ''
    }
  },
  computed: {
    abis() {
      const ABI = JSON.parse(this.contract?.abi)
      return ABI.map(item => item.name ?? 'unknow')
    },
    sourceCodes() {
      const codes = this.contract.sourceFiles.map(({ content }) => content)
      return codes.reduce((p, n) => `${p}\n${n}`)
    }
  },
  watch: {
  },
  methods: {
    copyTxt(content) {
      copy(JSON.stringify(content))
      this.$message.success(this.$t('shared.copySuccess'))
    },

    exportAbi(name) {
      this.$message.success(name)
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
</style>
