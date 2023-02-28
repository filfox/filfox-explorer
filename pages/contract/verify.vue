<template>
  <div v-loading="loading" class="container mx-auto my-5">
    <div class="pt-6 pb-5 bg-white rounded-md flex flex-col items-center">
      <p class="text-lg font-bold">
        Verify & Publish Contract Source Code
      </p>
      <div v-if="compilerType == 2" class="bg-main rounded-full text-white px-10 py-2 mt-3 text-sm">
        Complier Type: SOLIDITY MULTHPART VERIFILER (IMPORTS)
      </div>
      <div v-else class="bg-success rounded-full text-white px-10 py-2 mt-3 text-sm">
        Complier Type: SINGLE FILE/ CONC ATENANTED NETHOD
      </div>
    </div>
    <div class="p-4 bg-white rounded-md mt-5">
      <el-radio-group v-model="activeTab">
        <el-radio-button v-for="{ name, label } in tabs" :key="label" :label="label">
          {{ name }}
        </el-radio-button>
      </el-radio-group>
      <p class="text-sm font-light text-customGray-500 bg-customGray-250 p-3 mt-4 rounded-md leading-loose">
        1. If the contract compiles correctly at <span class="text-main">REMIX</span>, it should also compile correctly here. <br>
        2. We have limited support for verifying contracts created by another contract and there is a timeout of up to 45 seconds for each contract compiled. <br>
        3. For programatic contract verification, check out the <span class="text-main">Contract API Endpoint</span>.
      </p>
      <template v-if="activeTab == 2 && hasOutput">
        <div class="text-sm font-light text-customGray-500 bg-customGray-250 p-3 mt-4 rounded-md leading-loose">
          <span class="font-medium">Compiler debug log:</span><br>
          <div v-if="verifiedResult.success" class="flex items-center text-green-600">
            <i class="el-icon-circle-check mr-1 text-base"></i>
            Success : {{ verifiedTip }}
          </div>
          <div v-else class="flex items-center text-red-600">
            <i class="el-icon-circle-close mr-1 text-base"></i>
            <span>Error : {{ verifiedTip }}</span>
          </div>
        </div>
        <div
          v-if="verifiedResult.initCode"
          class="border bg-customGray-200 rounded-md h-64 mt-4 p-4 font-light overflow-auto break-all text-sm"
        >
          {{ verifiedResult.initCode }}
        </div>
      </template>
    </div>

    <template v-if="activeTab == 1">
      <div class="rounded-md p-4 mt-5 bg-white flex text-lg">
        <div class="w-1/3 pr-2.5">
          <p>Contract Address</p>
          <input
            v-model="contractAddress"
            readonly
            class="w-full bg-customGray-200 rounded px-8 py-3 mt-3 text-sm font-light border border-customGray-300 outline-none focus:border-main transition duration-200 placeholder-black"
            placeholder="Please center address">
        </div>
        <div class="w-1/3 px-2.5">
          <p>Complier</p>
          <input
            v-model="compilerVersion"
            readonly
            class="w-full bg-customGray-200 rounded px-8 py-3 mt-3 text-sm font-light border border-customGray-300 outline-none focus:border-main transition duration-200"
          >
        </div>
        <div class="w-1/3 pl-2.5">
          <p>Optimizations</p>
          <el-select
            v-model="optimize"
            placeholder="Please Select"
            class="optimize-select w-full mt-3"
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
      </div>

      <div class="rounded-md p-4 mt-5 bg-white flex flex-col font-light">
        <div class="flex items-center">
          <el-upload
            ref="upload"
            multiple
            accept="*.sol"
            :auto-upload="false"
            :on-change="onChange"
            :on-remove="onChange"
            action="/api/upload"
          >
            <button slot="trigger" class="text-sm rounded px-4 py-2 bg-main text-white hover:opacity-75 font-medium transition duration-200">
              Select *.sol files
            </button>
          </el-upload>
        </div>
        <span class="mt-2">Enter the Solidity Contract Code below or Select the Solidity (*.sol) files</span>
        <textarea
          v-model.trim="contractCode"
          readonly
          class="rounded-lg bg-customGray-200 border h-64 mt-2 p-4 overflow-auto text-sm outline-none focus:border-main transition duration-200"
        ></textarea>
      </div>

      <div class="rounded-md p-4 mt-5 bg-white">
        <span class="font-light">Constructor Argument</span>
        <textarea
          v-model.trim="parameters"
          class="text-sm block w-full rounded-lg bg-customGray-200 border h-64 mt-2 p-4 overflow-auto font-light outline-none focus:border-main transition duration-200"
        ></textarea>
        <p class="text-xs text-customGray-400 pl-1 mt-3">
          For additition information on Constructor Arguments <span class="text-main">See Our KB Entry</span>
        </p>
        <div class="bg-white text-center p-4 my-4">
          <button
            :disabled="loading"
            :class="{ 'cursor-not-allowed bg-customGray-400': loading }"
            class="rounded px-4 py-2.5 bg-main text-white hover:opacity-75 font-medium transition duration-200"
            @click="doVerify"
          >
            Verify and Publish
          </button>
          <button
            class="rounded px-4 py-2.5 bg-customGray-200 text-customGray-400 hover:opacity-75 font-medium transition duration-200 mx-4"
            @click="reset"
          >
            Reset
          </button>
          <button
            class="rounded px-4 py-2.5 bg-customGray-200 text-customGray-400 hover:opacity-75 font-medium transition duration-200"
            @click="returnToMain"
          >
            Return to Main
          </button>
        </div>
      </div>
    </template>

    <template v-if="activeTab == 2 && hasOutput">
      <ul class="rounded-md p-4 mt-5 bg-white text-sm font-light">
        <li class="mb-2 flex items-center">
          <label class="w-48 text-customGray-500">Complier Version:</label>
          {{ compilerVersion }}
        </li>
        <li class="my-3 flex items-center">
          <label class="w-48 text-customGray-500">Optimization Enabled:</label>
          {{ optimize }}
        </li>
        <li class="mt-2 flex items-center">
          <label class="w-48 text-customGray-500">Runs:</label>
          {{ '200' }}
        </li>
      </ul>

      <div class="rounded-md p-4 mt-5 bg-white font-light">
        <template v-if="parameters">
          <div class="px-1">
            Consturctor Arguments Used
          </div>
          <div class="bg-customGray-200 text-customGray-500 text-sm p-3 mt-3 rounded-md">
            {{ parameters }}
          </div>
        </template>
        <template v-if="verifiedResult.contractName">
          <div class="px-1 mt-6">
            Contract Name
          </div>
          <div class="bg-customGray-200 text-customGray-500 text-sm p-3 mt-3 rounded-md">
            {{ verifiedResult.contractName }}
          </div>
        </template>
        <template v-if="verifiedResult.byteCode">
          <div class="px-1 mt-6 mb-3">
            Contract Bytecode
          </div>
          <div class="h-64 rounded-md bg-customGray-200 border p-4 overflow-auto text-sm break-all">
            {{ verifiedResult.byteCode }}
          </div>
        </template>
        <template v-if="verifiedResult.abi">
          <div class="px-1 mt-6 mb-3">
            Contract ABI
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
  data() {
    return {
      loading: false,
      tabs: [
        { name: 'Contract Source Code', label: 1 },
        { name: 'Compiler Output', label: 2 }
      ],
      activeTab: 1,
      contractCode: '',
      parameters: '',
      fileList: [],
      optimize: false,
      optimizations: [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
      ],
      verifiedResult: {},
      verifyErrorMap: {
        1: '未找到源代码',
        2: '未找到合约 bytecode',
        3: '加载编译器失败',
        4: '验证失败',
        5: '不支持该语言',
        6: '合约已经被验证过'
      }
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
    sourceFiles() {
      if (!this.fileList.length) return {}

      const [codes, sourceFiles] = [this.contractCode, {}]
      codes.forEach((code, index) => (sourceFiles[this.fileList[index].name] = { content: code }))
      return sourceFiles
    },
    verifiedTip() {
      if (this.verifiedResult?.success) {
        return '验证成功'
      } else {
        return this.verifyErrorMap[this.verifiedResult.errorCode]
          || this.verifiedResult.errorMsg
          || 'Unknow Error'
      }
    },

    hasOutput() {
      return JSON.stringify(this.verifiedResult) !== '{}'
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
        optimizeRuns: 200,
        sourceFiles: this.sourceFiles,
        parameters: this.parameters,
        license: this.licenseType
      })
      this.loading = false
      this.verifiedResult = res
      this.activeTab = 2
      if (res?.success) {
        this.$message.success('Successfully verified')
      }
    },

    reset() {
      this.parameters = ''
      this.contractCode = ''
      this.fileList = []
      this.$refs.upload?.clearFiles()
      this.verifiedResult = {}
    },

    returnToMain() {
      this.$router.back()
    },

    readFiles(files) {
      if (!files.length) {
        this.contractCode = ''
        return
      }

      const promises = Array.from(files).map(({ raw }) => {
        const file = raw
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.onerror = () => reject(reader.error)
          reader.readAsText(file, 'utf8')
        })
      })

      Promise.all(promises)
        .then(fileContents => (this.contractCode = fileContents))
        .catch(error => console.error(error))
    },

    onChange(_, files) {
      this.fileList = files
      this.readFiles(files)
    }
  },
  head() {
    return {
      title: `${this.$t('fns.search.title')}`
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
