<template>
  <div class="container mx-auto bg-white rounded-md my-5 font-light">
    <div class="pt-6 pb-4 border-b-2 border-customGray-100 text-center ">
      <p class="text-lg font-bold">
        Verify & Publish Contract Source Code
      </p>
      <p class="text-sm text-customGray-600 mt-2">
        COMPILER TYPE AND VERSION SELECTION
      </p>
    </div>

    <div class="flex flex-col items-center p-6">
      <p class="text-sm text-customGray-500 text-center leading-relaxed w-10/12">
        Source code verification provides transparency for users interacting with smart contracts. By uploading the source code, Filfox will match the compiled code with that on the blockchain. Just like contracts, a "smart contract" should provide end users with more information on what they are "digitally signing" for and give users an opportunity to audit the code to independently verify that it actually does what it is supposed to do.<br><br>Please be informed that advanced settings (e.g. bytecodeHash: "none" or viaIR: "true") can be accessed via Solidity (Standard-Json-Input) verification method. More information can be found under Solidity's "Compiler Input and Output JSON Description" documentation section.
      </p>

      <p class="mt-12">
        Please enter the Contract Address you would like to verify
      </p>
      <input
        v-model="contractAddress"
        :class="{ 'text-red-500': !isFilAddress(contractAddress) }"
        class="bg-customGray-200 rounded h-11 px-8 mt-4 text-sm font-light w-6/12 border border-customGray-300 outline-none focus:border-main transition duration-200 placeholder-customGray-600" placeholder="Please center address">

      <p class="mt-8">
        Please select Compiler Type
      </p>
      <el-select v-model="compilerType" placeholder="Please Select" class="w-1/2 mt-4 bg-customGray-200 compiler-select">
        <el-option
          v-for="{ label, value } in compilerTypes"
          :key="value"
          :label="label"
          :value="value"
        >
        </el-option>
      </el-select>

      <p class="mt-8">
        {{ 'Please select Open Source License Type' }}
      </p>
      <el-select v-model="licenseType" placeholder="Please Select" class="w-1/2 mt-4 bg-customGray-200 compiler-select">
        <el-option
          v-for="{ label, value } in licenseTypes"
          :key="value"
          :label="label"
          :value="value"
        >
        </el-option>
      </el-select>

      <el-checkbox v-model="agreeService" class="mt-6 mb-8">
        <p class="text-customGray-400 text-xs">
          {{ 'I Agree to the terms of service' }}
        </p>
      </el-checkbox>

      <div class="flex items-center mb-16">
        <button class="rounded w-26 py-2.5 bg-main text-white hover:opacity-75 mr-4 font-medium transition duration-200">
          Continue
        </button>
        <button
          class="rounded w-26 py-2.5 bg-customGray-200 text-customGray-400 hover:opacity-75 font-medium transition duration-200"
          @click="resetForm"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { isFilAddress } from '@/utils/fns/utils'
import { fnsServer } from '../../filecoin/filecoin.config'

export default {
  data() {
    return {
      agreeService: true,
      contractAddress: '',
      compilerType: '',
      compilerTypes: [
        { label: 'Solidity - Single file', value: 1 },
        { label: 'Solidity - Multi-Part file', value: 2 }
      ],
      licenseType: '',
      licenseTypes: [
        { label: 'No License (None)', value: 1 },
        { label: 'The Unlicense (Unlicense)', value: 2 },
        { label: 'MIT License (MIT)', value: 3 },
        { label: 'GNU General Public License v2.0 (GNU GPLv2)', value: 4 },
        { label: 'GNU General Public License v3.0 (GNU GPLv3)', value: 5 },
        { label: 'GNU Lesser General Public License v2.1 (GNU LGPLv2.1)', value: 6 },
        { label: 'GNU Lesser General Public License v3.0 (GNU LGPLv3)', value: 7 },
        { label: 'BSD 2-clause "Simplified" license (BSD-2-Clause)', value: 8 },
        { label: 'BSD 3-clause "New" Or "Revised" license (BSD-3-Clause)', value: 9 },
        { label: 'Mozilla Public License 2.0 (MPL-2.0)', value: 10 },
        { label: 'Open Software License 3.0 (OSL-3.0)', value: 11 },
        { label: 'Apache 2.0 (Apache-2.0)', value: 12 },
        { label: 'GNU Affero General Public License (GNU AGPLv3)', value: 14 },
        { label: 'Business Source License (BSL 1.1)', value: 14 }
      ]
    }
  },

  computed: {
  },

  watch: {
  },

  methods: {
    isFilAddress,
    resetForm() {
      this.agreeService = false
      this.contractAddress = ''
      this.compilerType = ''
      this.licenseType = ''
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
  .compiler-select.el-select .el-input__inner {
    @apply bg-customGray-200 border-customGray-300 h-11 pl-8 font-light;
    &::placeholder {
      color: black;
    }
  }

  .compiler-select .is-focus .el-input__inner {
    @apply border-main !important;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner {
    @apply bg-main border-main;
  }
</style>
