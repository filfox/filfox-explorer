<template>
  <div class="container mx-auto bg-white rounded-md my-5 font-light">
    <div class="pt-6 pb-4 border-b-2 border-customGray-100 text-center ">
      <p class="text-lg font-bold">Verify & Publish Contract Source Code</p>
      <p class="text-sm text-customGray-600 mt-2">COMPILER TYPE AND VERSION SELECTION</p>
    </div>

    <div class="flex flex-col items-center p-6">
      <p class="text-sm text-customGray-500 text-center leading-relaxed w-10/12">Source code verification provides transparency for users interacting with smart contracts. By uploading the source code, Filfox will match the compiled code with that on the blockchain. Just like contracts, a "smart contract" should provide end users with more information on what they are "digitally signing" for and give users an opportunity to audit the code to independently verify that it actually does what it is supposed to do.<br><br>Please be informed that advanced settings (e.g. bytecodeHash: "none" or viaIR: "true") can be accessed via Solidity (Standard-Json-Input) verification method. More information can be found under Solidity's "Compiler Input and Output JSON Description" documentation section.</p>

      <p class="mt-12">Please enter the Contract Address you would like to verify</p>
      <input class="bg-customGray-200 rounded px-8 py-3 mt-4 text-sm font-light w-6/12 border border-customGray-300 outline-none focus:border-main transition duration-200 placeholder-customGray-600" placeholder="Please center address"/>

      <p class="mt-8">Please select Compiler Type</p>
      <input class="bg-customGray-200 rounded px-8 py-3 mt-4 text-sm font-light w-6/12 border border-customGray-300 outline-none focus:border-main transition duration-200 placeholder-black" placeholder="Please Select"/>

      <p class="mt-8">Please select Open Source License Type</p>
      <input class="bg-customGray-200 rounded px-8 py-3 mt-4 text-sm font-light w-6/12 border border-customGray-300 outline-none focus:border-main transition duration-200 placeholder-black" placeholder="Please Select"/>

      <el-checkbox v-model="checked" class="mt-6 mb-8">
        <p class="text-gray-500 text-xs">I Agree to the terms of service</p>
      </el-checkbox>

      <div class="flex items-center mb-16">
        <button class="rounded w-26 py-2.5 bg-main text-white hover:opacity-75 mr-4 font-medium transition duration-200">Continue</button>
        <button class="rounded w-26 py-2.5 bg-customGray-200 text-customGray-400 hover:opacity-75 font-medium transition duration-200">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getDomaisByAddress, getAddressByDomain } from '@/utils/fns/utils'
import { fnsServer } from '../../filecoin/filecoin.config'

export default {
  data() {
    return {
      checked: true
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    async search(val) {},
    detail(address) {}
  },
  head() {
    return {
      title: `${this.$t('fns.search.title')}`
    }
  }
}
</script>
