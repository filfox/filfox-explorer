<template>
  <div class="mx-4 md:mx-8 my-2 md:my-3 font-light">
    <template v-if="contract.verified">
      <div v-if="!Object.keys(functions).length" class="flex items-center rounded-md bg-orange-100 p-3 md:p-4 mt-6">
        <img src="@/assets/img/contract/warn.svg" class="w-5 mr-1.5">
        {{ write ? $t('detail.contract.noPublicWriteFunctions') : $t('detail.contract.noPublicReadFunctions') }}
      </div>

      <template v-else>
        <div v-if="contract.implAddress" class="flex flex-col lg:flex-row lg:items-center font-medium mt-5">
          <span class="flex items-center">
            <img src="@/assets/img/contract/inherit.svg" class="w-4 md:w-5 mr-1">
            {{ $t('detail.contract.abiImplementationAt') }}
          </span>
          <AddressLink :id="contract.implAddress" class="text-main ml-1 hover:underline" />
        </div>

        <div class="flex px-1 mt-5">
          <img :src="require(`@/assets/img/contract/${write ? 'write' : 'read'}.svg`)" class="mr-1">
          {{ write ? $t('detail.contract.writeContractInformation') : $t('detail.contract.readContractInformation') }}
          <span class="ml-auto underline text-main cursor-pointer hover:opacity-70" @click="reset">{{ $t('contract.reset') }}</span>
        </div>

        <div
          v-for="(f, functionName, No) in functions"
          :id="functionName"
          :key="functionName"
          class="transition duration-300 border border-customGray-300 rounded-md overflow-hidden mt-4 md:mt-6"
        >
          <div
            class="flex items-center px-3 md:px-4 py-2 bg-customGray-200 cursor-pointer transition duration-200 hover:bg-customGray-280"
            @click.stop="expand(functionName, No)"
          >
            {{ No + 1 }}. {{ functionName }}
            <i class="ml-auto el-icon-copy-document text-lg cursor-pointer hover:text-main" @click.stop="copyFunc(functionName)"></i>
            <i class="el-icon-right ml-4 text-lg cursor-pointer transform transition duration-300 hover:text-main" :class="{ 'rotate-90': isExpand(No) }"></i>
          </div>
          <div v-if="isExpand(No)" class="p-3 md:p-4 pb-5 border-t">
            <div v-for="(_, paramName, index) in f" :key="paramName" :class="{ 'mt-2 md:mt-3' : index > 0 }">
              <p>{{ paramName }}</p>
              <textarea :id="`${functionName}_${paramName}`" v-model.trim="f[paramName]" :rows="/\[\]/.test(paramName) ? 5 : 1" class="w-full overflow-auto whitespace-pre-line font-mono outline-none border rounded px-3 py-1 mt-1.5 transition duration-200 focus:border-main" />
            </div>

            <div class="flex items-center" :class="{ 'mt-4': Object.keys(f).length }">
              <el-tooltip :content="$t('detail.contract.connectWalletFirst')" placement="top" :disabled="isDisableTooltip">
                <button
                  :class="[isAllowRequest(No) ? 'bg-main' : 'bg-customGray-375 cursor-not-allowed']"
                  class="flex items-center px-5 py-1.5 text-white font-medium  rounded-md transition duration-200 hover:opacity-75"
                  @click="inquire(functionName, No)"
                >
                  <IconLoading v-if="loadingArr[No]" class="mr-1" />{{ write ? $t('detail.contract.toWrite') : $t('detail.contract.inquire') }}
                </button>
              </el-tooltip>

              <a
                v-if="write && requestResultArr[No]"
                :href="`${HOST}/tx/${requestResultArr[No].hash}`"
                target="_blank"
                class="ml-3 px-5 py-1.5 text-white font-medium rounded-md transition duration-200 hover:opacity-75 bg-main cursor-pointer"
              >
                {{ $t('detail.contract.viewYourTransaction') }}
              </a>
            </div>

            <div v-if="requestErrorArr[No]" class="text-red-600 mt-3 px-1">
              {{ requestErrorArr[No] }}
            </div>

            <div v-if="requestResultArr[No]" class="font-medium mt-3 px-1">
              <template v-if="write">
                Transaction Hash :
                <span class="text-main break-all font-mono">{{ requestResultArr[No].hash }}</span>
                <i
                  class="ml-1.5 el-icon-copy-document cursor-pointer text-base text-main"
                  @click.stop="copyTxHash($event, requestResultArr[No].hash)"
                ></i>
              </template>
              <template v-else>
                <p class="mb-1">
                  {{ $t('detail.contract.response') }} :
                </p>
                <vue-json-pretty
                  :data="requestResultArr[No]"
                  :show-double-quotes="false"
                />
              </template>
            </div>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <CodeNotVerified v-if="active > 2" :contract="contract" proxy class="mt-5" />
    </template>
  </div>
</template>

<script>
import Vue from 'vue'
import copy from 'copy-to-clipboard'
import { ethers } from 'ethers'
import { RPC, HOST } from '@/filecoin/filecoin.config'

export default {
  props: {
    contractSelf: {
      type: Object,
      default: () => ({})
    },
    active: {
      type: Number,
      default: 0
    },
    account: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      HOST,
      contractRead: null,
      contractWrite: null,
      functions: {},
      expandArr: [],
      requestResultArr: [],
      requestErrorArr: [],
      loadingArr: []
    }
  },

  computed: {
    contract() {
      return this.active < 3 ? this.contractSelf : (this.contractSelf.contractImpl || {})
    },

    isConnected() {
      return Boolean(this.account)
    },

    fKeys() {
      return Object.keys(this.functions)
    },

    write() {
      return /2|4/.test(this.active)
    },

    contractInstance() {
      if (this.isConnected) {
        return this.contractWrite
      } else {
        return this.contractRead
      }
    },

    isDisableTooltip() {
      if (this.write) {
        return this.isConnected
      } else {
        return true
      }
    }
  },

  watch: {
    write(val) {
      this.resolveFunctions()
      this.reset()
    },

    contract() {
      this.init()
    },

    isConnected(val) {
      val && this.createContractWrite()
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      if (!this.contract?.verified) return

      this.resolveFunctions()
      this.createContractRead()

      const f = this.$route.query?.f
      this.expandArr.push(this.fKeys.indexOf(f))
      this.resetResults()

      setTimeout(() => this.locateFunction(f), 500)
    },

    isExpand(No) {
      return this.expandArr.includes(No)
    },

    isAllowRequest(No) {
      const isLoading = this.loadingArr[No]
      if (this.write) return this.isConnected && !isLoading
      return !isLoading
    },

    locateFunction(f) {
      if (!f) return
      const el = document.getElementById(f)
      el?.scrollIntoView({ behavior: 'smooth' })
    },

    createContractRead() {
      this.contractRead = new ethers.Contract(
        this.contract.ethAddress,
        JSON.parse(this.contract.abi),
        ethers.getDefaultProvider(RPC)
      )
    },

    createContractWrite() {
      if (!this.contract.abi || typeof window.ethereum === 'undefined') return
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      this.contractWrite = new ethers.Contract(
        this.contract.ethAddress,
        JSON.parse(this.contract.abi),
        provider.getSigner()
      )
    },

    resolveCurAbis() {
      if (!this.contract.abi) return []
      const regx = new RegExp(this.write ? 'payable' : 'view')
      const abis = JSON.parse(this.contract.abi).filter(abi => abi.type === 'function' && regx.test(abi.stateMutability))
      return abis
    },

    resolveFunctions() {
      if (!this.contract?.verified) return

      const temp = {}
      const abis = this.resolveCurAbis()
      abis.forEach(abi => {
        const params = {}
        abi.inputs.forEach(({ name, type }) => (params[`${name} [ ${type} ]`] = ''))
        temp[`${abi.name}( ${abi.inputs.map(({ name, type }) => name || type).join(', ')} )`] = params
      })
      this.functions = temp
    },

    getParamType(input) {
      const matches = input.match(/\[\s(.*?)\s\]/)
      if (matches && matches.length > 1) return matches[1]
      return 'string'
    },

    parseJsonToObj(jsonString) {
      if (!jsonString) return ''
      try {
        return JSON.parse(jsonString)
      } catch (error) {
        return null
      }
    },

    async inquire(functionName, No) {
      if (!this.isAllowRequest(No)) return

      let params = []
      const funName = functionName.split('(')[0]
      const funParams = this.functions[functionName]

      try {
        params = Object.entries(funParams).map(([p, v]) => ([p, this.getParamType(p), v]))
          .map(([p, t, v]) => {
            if (/bool/.test(t)) return v === 'true'
            if (/int/.test(t)) return Number(v)
            if (/\[\]/.test(t)) {
              const _v = this.parseJsonToObj(v)
              const paramInput = document.getElementById(`${functionName}_${p}`)

              if (_v === null) {
                const originalColor = paramInput.style.color
                const originalBorderColor = paramInput.style.borderColor

                paramInput.focus()
                paramInput.style.color = 'red'
                paramInput.style.borderColor = 'rgb(254, 215, 215)'
                paramInput.style.backgroundColor = 'rgb(255, 245, 245)'

                paramInput.addEventListener('blur', () => {
                  paramInput.style.color = originalColor
                  paramInput.style.borderColor = originalBorderColor
                  paramInput.style.backgroundColor = 'white'
                }, { once: true })
                throw new Error(`Param (${p}) format error!`)
              }

              if (typeof _v === 'object') {
                funParams[p] = JSON.stringify(_v, null, 2)
              }

              return _v
            }
            return v
          })
      } catch (error) {
        Vue.set(this.requestErrorArr, No, error)
        return
      }

      try {
        Vue.set(this.loadingArr, No, true)
        const res = await this.contractInstance[funName](...params)
        Vue.set(this.requestErrorArr, No, null)
        Vue.set(this.requestResultArr, No, this.transformData(res, No))
      } catch (error) {
        Vue.set(this.requestErrorArr, No, error)
      } finally {
        Vue.set(this.loadingArr, No, false)
      }
    },

    transformData(response, No) {
      let result = {}
      if (this.write) {
        result = { hash: response.hash }
      } else {
        const outputs = this.resolveCurAbis()[No].outputs
        outputs.map(({ name, type }, i) => {
          const pro = name ? `[${name}](${type})` : `(${type})`
          const res = Array.isArray(response) ? response[i] : response

          if (/int\d+$/.test(type)) {
            result[pro] = ethers.BigNumber.from(res).toString()
            return
          }

          result[pro] = res
        })
      }
      return result
    },

    copyFunc(functionName) {
      const url = `${window.location.origin}/${this.$i18n.locale}/address/${this.contract.address}?t=3&a=${this.active}&f=${encodeURI(functionName)}`
      copy(url)
      this.$message.success(this.$t('shared.copySuccess'))
    },

    copyTxHash({ target }, txHash) {
      copy(txHash)
      this.$message.success(this.$t('shared.copySuccess'))
      target.classList.toggle('el-icon-finished')
      setTimeout(() => target.classList.toggle('el-icon-finished'), 3000)
    },

    expand(functionName, No) {
      if (this.isExpand(No)) {
        this.expandArr = this.expandArr.filter(i => i !== No)
      } else {
        this.expandArr.push(No)

        if (!this.write && /^(\w+)\s*\(\s*\)$/.test(functionName)) {
          this.inquire(functionName, No)
        }
      }
    },

    resetResults() {
      if (this.write) {
        this.requestResultArr = this.fKeys.map(() => null)
      } else {
        const abis = this.resolveCurAbis()
        this.requestResultArr = abis.map(({ outputs }) => {
          const result = {}
          outputs.map(({ name, type }, i) => (result[name ? `[${name}](${type})` : `(${type})`] = '...'))
          return result
        })
      }

      this.requestErrorArr = this.fKeys.map(() => null)
      this.loadingArr = this.fKeys.map(() => false)
    },

    reset() {
      this.expandArr = []
      this.resetResults()
      // eslint-disable-next-line guard-for-in
      for (const key in this.functions) {
        const param = this.functions[key]
        // eslint-disable-next-line guard-for-in
        for (const _key in param) param[_key] = ''
      }
    }
  }
}
</script>

<style lang="postcss">
.el-tooltip__popper {
  @apply bg-main !important;
  .popper__arrow {
    border-top-color: #1a4fc9 !important;
  }
  .popper__arrow::after {
    border-top-color: #1a4fc9 !important;
  }
}
</style>
