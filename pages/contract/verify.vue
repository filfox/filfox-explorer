<template>
  <div v-loading="loading" class="container mx-auto my-5">
    <div class="pt-6 pb-5 bg-white rounded-none md:rounded-md flex flex-col items-center">
      <p class="text-lg font-semibold">
        {{ $t('contract.verify.title.0') }}
      </p>
      <p class="text-sm text-customGray-380 mt-2 uppercase font-light">
        {{ $t('contract.verify.title.1') }}
      </p>
    </div>
    <div class="p-4 bg-white rounded-none md:rounded-md mt-5">
      <div class="">
        <button
          v-for="{ name, label } in tabs"
          :key="label"
          class="px-4 py-1 border text-sm font-light rounded-full mr-3 transition duration-200"
          :class="activeTab == label ? 'border-customBlue-275 text-customBlue-295 bg-customBlue-225' : 'border-customGray-340 text-customGray-375'"
          @click="activeTab = label"
        >
          {{ name }}
        </button>
      </div>
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
            <p v-if="verifiedResult.errorMsg" class="whitespace-pre">
              {{ verifiedResult.errorMsg }}
            </p>
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
      <div class="rounded-none md:rounded-md p-4 mt-5 bg-white">
        <div class="flex flex-col md:flex-row">
          <div class="w-full text-sm md:w-1/4 pr-0 md:pr-2">
            <p>
              {{ $t('contract.verify.contractAddress') }}
            </p>
            <input
              v-model="contractAddress"
              readonly
              class="w-full bg-customGray-200 rounded px-4 py-2 mt-2 border font-light placeholder-customGray-350 text-customGray-380 border-customGray-300 outline-none focus:border-customBlue-295 transition duration-200 placeholder-black"
              :placeholder="$t('contract.guide.pleaseCenterAddress')"
            >
          </div>
          <div class="w-full text-sm md:w-1/4 px-0 md:px-2 mt-4 md:mt-0">
            <p>
              {{ $t('contract.verify.complier') }}
            </p>
            <input
              v-model="compilerVersion"
              readonly
              class="w-full bg-customGray-200 rounded px-4 py-2 mt-2 text-sm font-light border placeholder-customGray-350 text-customGray-380 border-customGray-300 outline-none focus:border-customBlue-295 transition duration-200"
            >
          </div>
          <div class="w-full text-sm md:w-1/4 pl-0 md:px-2 mt-4 md:mt-0">
            <p>
              {{ $t('contract.verify.evmVersion') }}
            </p>
            <el-select
              v-model="evmVersion"
              class="optimize-select w-full mt-2"
            >
              <el-option
                v-for="{ label, value } in evmVersions"
                :key="label"
                :label="label"
                :value="value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="w-full text-sm md:w-1/4 pl-0 md:pl-2 mt-4 md:mt-0">
            <p>
              {{ $t('contract.verify.viaIR') }}
            </p>
            <el-select
              v-model="viaIR"
              class="optimize-select w-full mt-2"
            >
              <el-option
                v-for="{ label, value } in viaIROptions"
                :key="label"
                :label="label"
                :value="value"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="flex flex-col md:flex-row lg:mt-5">
          <div class="w-full text-sm md:w-1/4 pl-0 md:pr-2 mt-4 md:mt-0">
            <p>
              {{ $t('contract.verify.optimizations') }}
            </p>
            <el-select
              v-model="optimize"
              :placeholder="$t('contract.guide.pleaseSelect')"
              class="optimize-select w-full mt-2"
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
          <div class="w-full text-sm md:w-1/4 px-0 md:px-2 mt-4 md:mt-0">
            <p>
              {{ $t('contract.verify.runs') }}
            </p>
            <input
              v-model="optimizeRuns"
              class="w-full bg-customGray-200 rounded px-4 py-2 mt-2 text-sm font-light border placeholder-customGray-350 text-customGray-380 border-customGray-300 outline-none focus:border-customBlue-295 transition duration-200"
            >
          </div>

          <div class="w-full text-sm md:w-1/2 px-0 md:pl-2 mt-4 md:mt-0">
            <p>
              {{ $t('contract.verify.optimizerDetails') }}
              <span class="ml-2 text-customGray-500 font-light">{{ $t('contract.verify.uploadMetadataFileTo') }}</span>
            </p>
            <el-upload
              ref="metadataUpload"
              class="metadata-upload mt-2 lg:flex items-center font-light text-sm"
              :limit="1"
              :multiple="false"
              accept=".json"
              :show-file-list="true"
              :auto-upload="false"
              :on-change="onMetadataFileAdded"
              :on-remove="clearMetadata"
              :on-exceed="onMetadataFileExceed"
              action="/api/upload"
            >
              <button
                slot="trigger"
                class="w-full flex items-center rounded px-4 py-2 bg-customGray-200 font-light text-customBlue-295 border border-customGray-300 hover:border-current transition duration-200"
              >
                <img src="@/assets/img/contract/upload.svg" class="w-4 h-4 mr-1.5">
                {{ $t('contract.verify.uploadMetadataFile') }}
              </button>
            </el-upload>
          </div>
        </div>
      </div>

      <div class="rounded-none md:rounded-md p-4 mt-5 bg-white flex flex-col font-light relative overflow-hidden shadow-picture">
        <p class="text-base font-normal mb-3">
          {{ $t('contract.verify.pleaseSelectSolidityFiles') }}
        </p>
        <div class="flex flex-col md:flex-row justify-between text-sm" :class="{ 'border-b border-dashed pb-3': hasFiles}">
          <el-upload
            ref="upload"
            multiple
            accept=".sol"
            :show-file-list="true"
            :auto-upload="false"
            :on-change="onAddFile"
            :on-remove="onRemoveFile"
            action="/api/upload"
          >
            <div class="flex items-center">
              <button slot="trigger" class="flex items-center rounded px-4 py-2 text-customBlue-295 bg-customBlue-225 border border-transparent hover:border-current font-light transition duration-200">
                <img src="@/assets/img/contract/upload.svg" class="w-4 h-4 mr-1.5">
                {{ $t('contract.verify.selectFiles') }}
              </button>
              <span class="ml-2 text-customGray-500 text-xs">{{ $t('contract.verify.selectFilesDes') }}</span>
            </div>
          </el-upload>

          <button
            v-if="hasFiles"
            class="el-icon-delete rounded px-4 py-2 bg-red-400 text-white hover:opacity-75 font-medium transition duration-200 self-start mt-4 md:mt-0"
            @click="clearFiles"
          >
            {{ $t('contract.verify.clearFiles') }}
          </button>
        </div>
        <div v-show="showSourceFilesBody">
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
        <template v-if="hasFiles">
          <div
            class="absolute bottom-0 left-0 right-0 bg-customGray-250 p-1 flex cursor-pointer text-customGray-380 hover:text-customBlue-295 transition duration-200"
            @click="showSourceFilesBody = !showSourceFilesBody"
          >
            <i
              class="el-icon-d-arrow-right transition duration-200 transform mx-auto"
              :class="showSourceFilesBody ? '-rotate-90': 'rotate-90'"
            ></i>
          </div>
          <div class="h-6"></div>
        </template>
      </div>

      <div class="rounded-none md:rounded-md p-4 mt-5 bg-white relative overflow-hidden shadow-picture">
        <p>
          <span class="font-normal mr-1">{{ $t('contract.verify.contractLibraryAddress') }}</span>
          <span class="text-customGray-375 text-xs">({{ $t('contract.verify.supportsUpToTenLibraries') }})</span>
        </p>
        <p class="italic text-customGray-375 text-sm font-light mt-2">
          {{ $t('contract.verify.libraryNote') }}
        </p>

        <div v-show="showLibraryBody" class="transition-all duration-500 overflow-hidden mt-6">
          <div class="flex items-center text-sm">
            <span class="w-7/25 lg:w-1/4">{{ $t('contract.verify.sourceCodeFileName') }}</span>
            <span class="w-7/25 lg:w-1/4 ml-2 lg:ml-4">{{ $t('contract.verify.libraryName') }}: </span>
            <span class="w-7/25 lg:w-1/4 ml-2 lg:ml-4">{{ $t('contract.verify.libraryContractAddress') }}: </span>
          </div>
          <div v-for="(item, index) in libraryAddrs" :key="item.contractAddress" class="flex items-center mt-2 lg:mt-3.5">
            <el-select
              v-model="item.located"
              class="optimize-select w-7/25 lg:w-1/4"
            >
              <el-option
                v-for="(_, fileName ) in sourceFiles"
                :key="fileName"
                :label="fileName"
                :value="fileName"
              >
              </el-option>
            </el-select>
            <input
              v-model="item.name"
              class="ml-2 lg:ml-4 w-7/25 lg:w-1/4 bg-customGray-200 rounded px-4 py-2 text-sm font-light border placeholder-customGray-350 text-customGray-380 border-customGray-300 outline-none focus:border-customBlue-295 transition duration-200"
            >
            <input
              v-model="item.address"
              class="mx-2 lg:mx-4 w-7/25 lg:w-1/4 bg-customGray-200 rounded px-4 py-2 text-sm font-light border placeholder-customGray-350 text-customGray-380 border-customGray-300 outline-none focus:border-customBlue-295 transition duration-200"
            >
            <div
              class="cursor-pointer border rounded w-9.5 h-9.5 flex text-customGray-380 bg-customGray-200 border-customGray-300 hover:text-customBlue-290 hover:border-customBlue-275 hover:bg-background transition duration-200"
              @click.stop="removeLibrary(index)"
            >
              <i class="el-icon-delete m-auto"></i>
            </div>
          </div>

          <div>
            <button
              class="px-3 py-1.75 text-customBlue-295 bg-customBlue-225 text-sm font-light rounded mt-4 transition duration-200 border border-transparent hover:border-current"
              @click="addLibrary"
            >
              <i class="el-icon-plus mr-1"></i>{{ $t('contract.verify.add') }}
            </button>
            <button
              class="ml-4 px-3 py-1.75 bg-customGray-270 text-customGray-375 text-sm font-light rounded mt-4 transition duration-200 border border-transparent hover:border-current"
              @click="resetLibrary"
            >
              <i class="el-icon-refresh-right mr-1"></i>{{ $t('contract.reset') }}
            </button>
          </div>
        </div>

        <div
          class="absolute bottom-0 left-0 right-0 bg-customGray-250 p-1 flex cursor-pointer text-customGray-380 hover:text-customBlue-295 transition duration-200"
          @click="showLibraryBody = !showLibraryBody"
        >
          <i
            class="el-icon-d-arrow-right transition duration-200 transform mx-auto"
            :class="showLibraryBody ? '-rotate-90': 'rotate-90'"
          ></i>
        </div>
        <div class="h-6"></div>
      </div>

      <div class="rounded-none md:rounded-md p-4 mt-5 bg-white relative overflow-hidden shadow-picture">
        <p>{{ $t('contract.verify.metadataSettings') }} <span class="text-customGray-375">({{ $t('contract.verify.optional') }})</span></p>
        <textarea
          v-show="showMetadataBody"
          v-model="metadata"
          placeholder="{ &quot;bytecodeHash&quot; : &quot;none&quot; }"
          rows="4"
          class="w-full mt-4 outline-none rounded-md bg-customGray-200 border p-3 overflow-auto text-sm transition duration-200 focus:border-customBlue-290"
        />
        <div
          class="absolute bottom-0 left-0 right-0 bg-customGray-250 p-1 flex cursor-pointer text-customGray-380 hover:text-customBlue-295 transition duration-200"
          @click="showMetadataBody = !showMetadataBody"
        >
          <i
            class="el-icon-d-arrow-right transition duration-200 transform mx-auto"
            :class="showMetadataBody ? '-rotate-90': 'rotate-90'"
          ></i>
        </div>
        <div class="h-6"></div>
      </div>

      <div class="rounded-none md:rounded-md p-4 mt-5 bg-white">
        <div class="bg-white text-center p-4 my-4">
          <button
            :disabled="loading || !allowPublish"
            :class="{ 'cursor-not-allowed bg-customGray-400': loading || !allowPublish }"
            class="rounded px-4 py-2 bg-main text-white hover:opacity-75 font-medium transition duration-200"
            @click="doVerify"
          >
            {{ $t('contract.publish') }}
          </button>
          <button
            class="rounded px-4 py-2 bg-customGray-200 text-customGray-400 hover:opacity-75 font-medium transition duration-200 mx-4"
            @click="reset"
          >
            {{ $t('contract.reset') }}
          </button>
          <button
            class="rounded px-4 py-2 bg-customGray-200 text-customGray-400 hover:opacity-75 font-medium transition duration-200"
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
      verifiedResult: {},
      viaIR: false,
      optimizerDetails: '',
      metadataFileList: [],
      viaIROptions: [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
      ],
      evmVersion: 'default',
      evmVersions: [
        { label: 'Default', value: 'default' },
        { label: 'Homestead', value: 'homestead' },
        { label: 'TangerineWhistle', value: 'tangerineWhistle' },
        { label: 'SpuriousDragon', value: 'spuriousDragon' },
        { label: 'Byzantium', value: 'byzantium' },
        { label: 'Constantinople', value: 'constantinople' },
        { label: 'Petersburg', value: 'petersburg' },
        { label: 'Istanbul', value: 'istanbul' },
        { label: 'Berlin', value: 'berlin' },
        { label: 'London', value: 'london' },
        { label: 'Paris', value: 'paris' },
        { label: 'Shanghai', value: 'shanghai' }
      ],
      libraryAddrs: [
        { located: '', name: '', address: '' }
      ],
      metadata: '',
      showSourceFilesBody: false,
      showMetadataBody: false,
      showLibraryBody: false
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
        return this.$t('contract.verify.error')[this.verifiedResult.errorCode] || 'Unknow Error'
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
        license: this.licenseType,
        optimizerDetails: this.optimizerDetails,
        libraries: this.getLibraries(),
        metadata: this.metadata
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
      this.resetLibrary()
      this.metadata = ''
      this.showSourceFilesBody = false
      this.showMetadataBody = false
      this.showLibraryBody = false
    },

    returnToMain() {
      this.$router.back()
    },

    onAddFile(_, files) {
      const oldFiles = Object.keys(this.sourceFiles)
      const addFiles = files.filter(({ name }) => !oldFiles.includes(name))
      this.readFiles(addFiles)
    },

    readMetadataFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = event => resolve(event.target.result)
        reader.onerror = error => reject(error)
        reader.readAsText(file, 'utf-8')
      })
    },

    async readConfigFromMetadataFile(file) {
      const result = await this.readMetadataFile(file)
      const config = JSON.parse(result)

      const { details } = config.settings.optimizer
      this.optimizerDetails = JSON.stringify(details)
    },

    async onMetadataFileAdded({ raw }) {
      try {
        await this.readConfigFromMetadataFile(raw)
      } catch {
        this.$message.error(this.$t('contract.verify.uploadMetadataFileError'))
        this.clearMetadata()
      }
    },

    onMetadataFileExceed() {
      this.$message.error(this.$t('contract.verify.onlyAllowOneMetadataFile'))
    },

    clearMetadata() {
      this.$refs.metadataUpload.clearFiles()
      this.optimizerDetails = ''
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
    },

    addLibrary() {
      this.libraryAddrs.push({ located: '', name: '', address: '' })
    },

    removeLibrary(index) {
      this.libraryAddrs = this.libraryAddrs.filter((_, i) => index != i)
    },

    resetLibrary() {
      this.libraryAddrs = [{ located: '', name: '', address: '' }]
    },

    getLibraries() {
      const libs = this.libraryAddrs.filter(({ located, name, address }) => located && name && address)
      if (!libs.length) return ''

      const libraries = {}
      libs.forEach(({ located, name, address }) => (libraries[located] = { [name]: address }))
      return JSON.stringify(libraries)
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
  @apply bg-customGray-200 border-customGray-300 font-light;
  color: #7D7E7E;
  height: 39px;
  &::placeholder {
    color: #B6BDC7;
  }
}

.optimize-select .is-focus .el-input__inner {
  border-color: #44A0FF !important;
}

.metadata-upload {
  & .el-upload {
    width: calc(50% - 0.75rem);
  }
  & .el-upload-list {
    margin-left: auto;
    .el-upload-list__item {
      margin-top: 0;
    }
  }
}

@media (max-width: 768px) {
  .metadata-upload {
    & .el-upload {
      width: 100%;
    }
    & .el-upload-list {
      margin-left: 0;
      .el-upload-list__item {
        margin-top: 15px;
      }
    }
  }
}
</style>
