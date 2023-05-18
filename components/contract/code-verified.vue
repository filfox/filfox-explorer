<template>
  <div class="font-light">
    <div class="hidden rounded-md bg-customGray-200 text-customGray-600 flex items-center p-2">
      <img src="@/assets/img/contract/warn.svg" alt="warn" class="w-4.5 h-4.5 mr-2">
      <span class="text-sm">This contract may be a proxy contract</span>
    </div>
    <div class="text-customGray-600 flex items-center px-1">
      <img src="@/assets/img/contract/ok.svg" alt="warn" class="w-4 h-4 mr-2">
      <span class="font-semibold text-sm">{{ $t('detail.contract.codeVerified') }}</span>
    </div>
    <div class="bg-customGray-200 px-3 text-sm rounded-md mt-2.5">
      <div class="border-b border-customGray-300 flex flex-col md:flex-row justify-between p-4">
        <div class="flex justify-between md:justify-start">
          <div class="w-48 text-customGray-450">
            {{ $t('detail.contract.contractName') }}
          </div>
          <span>{{ contract.contractName }}</span>
        </div>
        <div class="flex justify-between md:w-1/2 md:justify-start mt-2 md:mt-0">
          <div class="w-48 text-customGray-450">
            {{ $t('detail.contract.optimizeEnabled') }}
          </div>
          <span>{{ contract.optimize ? `Yes with ${contract.optimizeRuns} runs` : 'No' }}</span>
        </div>
      </div>
      <div class="flex flex-col md:flex-row md:justify-between p-4">
        <div class="flex justify-between md:justify-start">
          <div class="w-48 text-customGray-450">
            {{ $t('detail.contract.compilerVersion') }}
          </div>
          <span>{{ contract.compiler }}</span>
        </div>
        <div class="flex justify-between md:w-1/2 md:justify-start mt-2 md:mt-0">
          <div class="w-48 text-customGray-450">
            {{ $t('detail.contract.otherSettings') }}
          </div>
          <span class="text-right md:text-left">Default evmVersion, {{ contract.license || 'None license' }}</span>
        </div>
      </div>
    </div>

    <div class="rounded-md mt-5 bg-white">
      <div class="flex items-center justify-between px-1">
        <span class="text-sm">{{ $t('detail.contract.contractSourceCode') }} <span class="text-customGray-400">( {{ contract.language }} )</span></span>
      </div>
      <template v-for="({ name, content }, index) in contract.sourceFiles">
        <div :key="name" class="flex items-end mt-4 px-1">
          <span class="text-sm el-icon-document flex-1"> {{ name }}
            <span class="text-customGray-500 text-xs">
              - {{ index + 1 }}/{{ contract.sourceFiles.length }} Files
            </span>
          </span>
          <div
            class="w-6 h-6 flex bg-customGray-200 rounded cursor-pointer border border-customGray-200 transition duration-200 hover:border-main"
            @click="copyTxt(content)"
          >
            <img src="@/assets/img/contract/copy.svg" class="w-4 h-4 m-auto">
          </div>
          <div
            class="w-6 h-6 flex bg-customGray-200 rounded cursor-pointer border border-customGray-200 transition duration-200 hover:border-main ml-2"
            @click="copyLink"
          >
            <img src="@/assets/img/contract/link.svg" class="w-4 h-4 m-auto">
          </div>
        </div>
        <editor
          :key="name"
          v-model="contract.sourceFiles[index].content"
          class="bg-customGray-200 mt-2 rounded-md border"
          height="350"
          theme="chrome"
          :options="{ readOnly: true, mode: 'ace/mode/solidity' }"
          @init="editorInit"
        ></editor>
      </template>
    </div>
    <div class="rounded-md mt-5 bg-white">
      <div class="flex items-center justify-between px-1">
        <span class="text-sm">{{ $t('detail.contract.contractAbi') }}</span>
        <span class="flex items-center">
          <div class="px-2 flex bg-customGray-200 rounded cursor-pointer border border-customGray-200 transition duration-200 hover:border-main">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link text-main text-xs">
                {{ $t('detail.contract.exportAbi') }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="{ format, label} in abis"
                  :key="format"
                  icon="el-icon-document"
                  class="font-light"
                >
                  <a :href="`/contract/abi?address=${contract.address}&format=${format}`" target="_blank">{{ label }}</a>
                </el-dropdown-item>
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
      <span class="text-sm">{{ $t('detail.contract.contractCreationCode') }}</span>
      <div class="rounded-lg bg-customGray-200 border h-64 mt-2 p-4 overflow-auto break-all text-sm">
        {{ contract.initCode }}
      </div>
    </div>
    <div v-if="contract.parameters" class="rounded-md mt-5 bg-white">
      <span class="text-sm">{{ $t('detail.contract.parameters') }} <span class="text-gray-500">( {{ $t('detail.contract.parametersTip') }} )</span></span>
      <div class="rounded-lg bg-customGray-200 border h-32 mt-2 p-4 overflow-auto break-all text-sm">
        {{ contract.parameters }}
      </div>
    </div>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard'

export default {
  components: {
    editor: require('vue2-ace-editor')
  },
  props: {
    contract: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      value: '',
      abis: [
        { format: 'json', label: 'JSON Format' },
        { format: 'text', label: 'Text Format' }
      ]
    }
  },
  methods: {
    copyTxt(content) {
      copy(typeof content === 'object' ? JSON.stringify(content) : content)
      this.$message.success(this.$t('shared.copySuccess'))
    },

    copyLink() {
      this.copyTxt(window.location.href)
    },

    editorInit() {
      require('brace/ext/language_tools')
      require('ace-mode-solidity')
      require('brace/theme/chrome')
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
