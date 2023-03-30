<template>
  <div v-loading="loading" class="container mx-auto my-5">
    <div class="pt-6 pb-5 bg-white rounded-none md:rounded-md flex flex-col items-center">
      <p class="text-lg font-bold">
        {{ $t('contract.verify.title.0') }}
      </p>
      <p class="text-sm text-customGray-600 mt-2 uppercase">
        {{ $t('contract.verify.title.1') }}
      </p>
    </div>
    <div class="p-4 bg-white rounded-none md:rounded-md mt-5">
      <el-radio-group v-model="activeTab">
        <el-radio-button v-for="{ name, label } in tabs" :key="label" :label="label">
          {{ name }}
        </el-radio-button>
      </el-radio-group>
      <p class="text-sm font-light text-customGray-500 bg-customGray-250 p-3 mt-4 rounded-md leading-loose">
        1. {{ $t('contract.verify.tips.0') }}<br>
        2. {{ $t('contract.verify.tips.1') }}<br>
        3. {{ $t('contract.verify.tips.2') }}
      </p>
      <template v-if="activeTab == 2 && hasOutput">
        <div class="text-sm font-light text-customGray-500 bg-customGray-250 p-3 mt-4 rounded-md leading-loose">
          <p class="font-medium">
            {{ $t('contract.verify.debugLog') }}:
          </p>
          <div
            class="w-full whitespace-pre break-all leading-relaxed text-red-600 overflow-auto"
            :class="[ verifiedResult.success ? 'text-green-600 el-icon-circle-check' : 'text-red-600 el-icon-circle-close' ]"
          >
            {{ verifiedResult.success ? 'Success' : 'Error' }} : {{ verifiedTip }}
          </div>
        </div>
        <div
          v-if="verifiedResult.initCode"
          class="border bg-customGray-200 rounded-md h-64 mt-4 p-4 font-light overflow-auto break-all text-sm"
        >
          <p class="text-customGray-500">
            - {{ $t('contract.verify.whatWeLookingFor') }}
          </p>
          {{ verifiedResult.initCode }}
        </div>
      </template>
    </div>

    <template v-if="activeTab == 1">
      <div class="rounded-none md:rounded-md p-4 mt-5 bg-white flex flex-col md:flex-row">
        <div class="w-full md:w-1/4 pr-0 md:pr-2">
          <p class="text-base md:text-lg">
            {{ $t('contract.verify.contractAddress') }}
          </p>
          <input
            v-model="contractAddress"
            readonly
            class="w-full bg-customGray-200 rounded px-4 md:px-8 py-3 mt-3 text-sm font-light border border-customGray-300 outline-none focus:border-main transition duration-200 placeholder-black"
            :placeholder="$t('contract.guide.pleaseCenterAddress')"
          >
        </div>
        <div class="w-full md:w-1/4 px-0 md:px-2 mt-4 md:mt-0">
          <p class="text-base md:text-lg">
            {{ $t('contract.verify.complier') }}
          </p>
          <input
            v-model="compilerVersion"
            readonly
            class="w-full bg-customGray-200 rounded px-4 md:px-8 py-3 mt-3 text-sm font-light border border-customGray-300 outline-none focus:border-main transition duration-200"
          >
        </div>
        <div class="w-full md:w-1/4 pl-0 md:px-2 mt-4 md:mt-0">
          <p class="text-base md:text-lg">
            {{ $t('contract.verify.optimizations') }}
          </p>
          <el-select
            v-model="optimize"
            :placeholder="$t('contract.guide.pleaseSelect')"
            class="optimize-select w-full mt-3"
            @change="val => optimizeRuns = val ? 200 : '--'"
          >
            <el-option
              v-for="{ label, value } in optimizations"
              :key="label"
              :label="label"
              :value="value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="w-full md:w-1/4 px-0 md:pl-2 mt-4 md:mt-0">
          <p class="text-base md:text-lg">
            {{ $t('contract.verify.runs') }}
          </p>
          <input
            v-model="optimizeRuns"
            :readonly="!optimize"
            :class="{ 'cursor-not-allowed': !optimize }"
            class="w-full bg-customGray-200 rounded px-4 md:px-8 py-3 mt-3 text-sm font-light border border-customGray-300 outline-none focus:border-main transition duration-200"
          >
        </div>
      </div>

      <div class="rounded-none md:rounded-md p-4 mt-5 bg-white flex flex-col font-light">
        <div class="flex flex-col md:flex-row justify-between text-sm" :class="{ 'border-b border-dashed pb-3': hasFiles}">
          <el-upload
            ref="upload"
            multiple
            accept="text"
            :show-file-list="true"
            :auto-upload="false"
            :on-change="onAddFile"
            :on-remove="onRemoveFile"
            action="/api/upload"
          >
            <button slot="trigger" class="rounded px-4 py-2 bg-main text-white hover:opacity-75 font-medium transition duration-200">
              {{ $t('contract.verify.selectFiles') }}
            </button>
            <span class="ml-2 text-customGray-500">{{ $t('contract.verify.selectFilesDes') }}</span>
          </el-upload>

          <button
            v-if="hasFiles"
            class="el-icon-delete rounded px-4 py-2 bg-red-400 text-white hover:opacity-75 font-medium transition duration-200 self-start mt-4 md:mt-0"
            @click="clearFiles"
          >
            {{ $t('contract.verify.clearFiles') }}
          </button>
        </div>
        <div v-for="(_, fileName ) in sourceFiles" :key="fileName" class="mt-4">
          <p class="text-sm el-icon-document px-1">
            {{ fileName }}
          </p>
          <editor
            :key="fileName"
            v-model="sourceFiles[fileName].content"
            class="bg-customGray-200 mt-2 rounded-md border"
            height="350"
            theme="chrome"
            :options="{ readOnly: true, mode: 'ace/mode/solidity' }"
            @init="editorInit"
          ></editor>
        </div>
      </div>

      <div class="rounded-none md:rounded-md p-4 mt-5 bg-white">
        <span class="font-light">{{ $t('contract.verify.constructorArg') }}</span>
        <textarea
          v-model.trim="parameters"
          class="text-sm block w-full rounded-lg bg-customGray-200 border h-64 mt-2 p-4 overflow-auto font-light outline-none focus:border-main transition duration-200"
        ></textarea>
        <p class="text-xs text-customGray-400 pl-1 mt-3">
          {{ $t('contract.verify.argTip') }}
        </p>
        <div class="bg-white text-center p-4 my-4">
          <button
            :disabled="loading || !allowPublish"
            :class="{ 'cursor-not-allowed bg-customGray-400': loading || !allowPublish }"
            class="rounded px-4 py-2 md:py-2.5 bg-main text-white hover:opacity-75 font-medium transition duration-200"
            @click="doVerify"
          >
            {{ $t('contract.publish') }}
          </button>
          <button
            class="rounded px-4 py-2 md:py-2.5 bg-customGray-200 text-customGray-400 hover:opacity-75 font-medium transition duration-200 mx-4"
            @click="reset"
          >
            {{ $t('contract.reset') }}
          </button>
          <button
            class="rounded px-4 py-2 md:py-2.5 bg-customGray-200 text-customGray-400 hover:opacity-75 font-medium transition duration-200"
            @click="returnToMain"
          >
            {{ $t('contract.return') }}
          </button>
        </div>
      </div>
    </template>

    <template v-if="activeTab == 2 && hasOutput">
      <ul class="rounded-none md:rounded-md p-4 mt-5 bg-white text-sm font-light">
        <li class="mb-2 flex items-center">
          <label class="w-48 text-customGray-500">{{ $t('contract.verify.complierVersion') }}:</label>
          {{ compilerVersion }}
        </li>
        <li class="my-3 flex items-center">
          <label class="w-48 text-customGray-500">{{ $t('contract.verify.optimizationEnabled') }}:</label>
          {{ optimize ? 'Yes' : 'No' }}
        </li>
        <li class="mt-2 flex items-center">
          <label class="w-48 text-customGray-500">Runs:</label>
          {{ optimize ? optimizeRuns : '--' }}
        </li>
      </ul>

      <div class="rounded-none md:rounded-md p-4 mt-5 bg-white font-light">
        <template v-if="parameters">
          <div class="px-1">
            {{ $t('contract.verify.argsUsed') }}
          </div>
          <div class="bg-customGray-200 text-customGray-500 text-sm p-3 mt-3 rounded-md overflow-auto">
            {{ parameters }}
          </div>
        </template>
        <template v-if="verifiedResult.contractName">
          <div class="px-1 mt-6">
            {{ $t('contract.verify.contractName') }}
          </div>
          <div class="bg-customGray-200 text-customGray-500 text-sm p-3 mt-3 rounded-md overflow-auto">
            {{ verifiedResult.contractName }}
          </div>
        </template>
        <template v-if="verifiedResult.byteCode">
          <div class="px-1 mt-6 mb-3">
            {{ $t('contract.verify.contractBytecode') }}
          </div>
          <div class="h-64 rounded-md bg-customGray-200 border p-4 overflow-auto text-sm break-all">
            <p class="text-customGray-500">
              - {{ $t('contract.verify.whatWeGot') }}
            </p>
            {{ verifiedResult.byteCode }}
          </div>
        </template>
        <template v-if="verifiedResult.abi">
          <div class="px-1 mt-6 mb-3">
            {{ $t('contract.verify.contractAbi') }}
          </div>
          <div class="h-64 rounded-md bg-customGray-200 border p-4 overflow-auto text-sm">
            {{ verifiedResult.abi }}
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  components: {
    editor: require('vue2-ace-editor')
  },
  data() {
    return {
      loading: false,
      tabs: [
        { name: this.$t('contract.verify.source'), label: 1 },
        { name: this.$t('contract.verify.output'), label: 2 }
      ],
      activeTab: 1,
      parameters: '',
      sourceFiles: {},
      optimize: true,
      optimizeRuns: 200,
      optimizations: [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
      ],
      verifiedResult: {}
    }
  },
  computed: {
    compilerType() {
      return this.$route.query.compilerType
    },
    compilerVersion() {
      return this.$route.query.compilerVersion
    },
    contractAddress() {
      return this.$route.query.contractAddress
    },
    licenseType() {
      return this.$route.query.licenseType
    },
    verifiedTip() {
      if (this.verifiedResult?.success) {
        return this.$t('contract.verify.verifySuccess')
      } else {
        return this.$t('contract.verify.error')[this.verifiedResult.errorCode]
          || this.verifiedResult.errorMsg
          || 'Unknow Error'
      }
    },
    allowPublish() {
      return this.hasFiles
        && this.contractAddress
        && this.compilerVersion
    },
    hasOutput() {
      return JSON.stringify(this.verifiedResult) !== '{}'
    },
    hasFiles() {
      return Object.keys(this.sourceFiles).length
    }
  },
  methods: {
    async doVerify() {
      this.loading = true
      const res = await this.$axios.$post('/tools/verifyContract', {
        address: this.contractAddress,
        language: 'Solidity',
        compiler: this.compilerVersion,
        optimize: this.optimize,
        optimizeRuns: Number(this.optimizeRuns),
        sourceFiles: this.sourceFiles,
        parameters: this.parameters,
        license: this.licenseType
      })
      this.loading = false
      this.verifiedResult = res
      this.activeTab = 2
      if (res?.success) {
        this.$message.success(this.$t('contract.verify.verifySuccess'))
      }
    },

    clearFiles() {
      this.$refs.upload.clearFiles()
      this.sourceFiles = {}
    },

    reset() {
      this.clearFiles()
      this.parameters = ''
      this.verifiedResult = {}
    },

    returnToMain() {
      this.$router.back()
    },

    onAddFile(_, files) {
      const oldFiles = Object.keys(this.sourceFiles)
      const addFiles = files.filter(({ name }) => !oldFiles.includes(name))
      this.readFiles(addFiles)
    },

    onRemoveFile(file) {
      this.$delete(this.sourceFiles, file.name)
    },

    readFiles(files) {
      if (!files.length) return

      const readTasks = Array.from(files).map(({ raw }) => {
        const file = raw
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.onerror = () => reject(reader.error)
          reader.readAsText(file, 'utf8')
        })
      })

      Promise.all(readTasks)
        .then(fileContents => {
          files.forEach(({ name }, index) => {
            this.$set(this.sourceFiles, name, { content: fileContents[index] ?? '' })
          })
        })
        .catch(error => console.error(error))
    },

    editorInit() {
      require('brace/ext/language_tools')
      require('ace-mode-solidity')
      require('brace/theme/chrome')
    }
  },
  head() {
    return {
      title: this.$t('contract.guide.title.0')
    }
  }
}
</script>

<style lang="postcss">
.el-radio-group .el-radio-button__inner {
  font-weight: 400;
}

.el-radio-group .is-active .el-radio-button__inner {
  font-weight: 500;
  background: #2452C2;
  border-color: #2452C2;
  box-shadow: none;
}

.optimize-select.el-select .el-input__inner {
  @apply bg-customGray-200 border-customGray-300 px-8 font-light;
  height: 47px;
  &::placeholder {
    color: black;
  }
}

.optimize-select .is-focus .el-input__inner {
  @apply border-main !important;
}
</style>
