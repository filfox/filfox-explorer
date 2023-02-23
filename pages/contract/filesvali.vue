<template>
  <div class="container mx-auto my-5">
    <div class="pt-6 pb-5 bg-white rounded-md flex flex-col items-center">
      <p class="text-lg font-bold">Verify & Publish Contract Source Code</p>
      <div class="bg-success rounded-full text-white px-10 py-2 mt-3 text-sm">Complier Type: SINGLE FILE/ CONC ATENANTED NETHOD</div>
      <div class="bg-main rounded-full text-white px-10 py-2 mt-3 text-sm">Complier Type: SOLIDITY MULTHPART VERIFILER (IMPORTS)</div>
    </div>
    <div class="p-4 bg-white rounded-md mt-5">
      <el-radio-group v-model="activeTab">
        <el-radio-button v-for="{ name, label } in tabs" :key="name" :name="name" :label="label">
          {{ label }}
        </el-radio-button>
      </el-radio-group>
      <p class="text-sm font-light text-customGray-500 bg-customGray-250 p-3 mt-4 rounded-md leading-loose">
        1. If the contract compiles correctly at <span class="text-main">REMIX</span>, it should also compile correctly here. <br>
        2. We have limited support for verifying contracts created by another contract and there is a timeout of up to 45 seconds for each contract compiled. <br>
        3. For programatic contract verification, check out the <span class="text-main">Contract API Endpoint</span>.
      </p>
      <p class="text-sm font-light text-customGray-500 bg-customGray-250 p-3 mt-4 rounded-md leading-loose">
        <span class="font-medium">Compiler debug log:</span><br>
        <span class="text-red-700">Error! Unable to generate Contract ByteCode and ABI</span><br>
        <span class="">For troubleshooting, you can try compiling your source code with the Remix - Solidity IDE and check for exceptions</span>
      </p>
      <div class="border bg-customGray-200 p-4 rounded-md h-64 mt-4"></div>
    </div>

    <ul class="rounded-md p-4 mt-5 bg-white text-sm font-light">
      <li class="mb-2 flex items-center">
        <label class="w-48 text-customGray-500">Complier Version:</label>
        {{ 'V0.8.7+commit.e28d00a7' }}
      </li>
      <li class="my-3 flex items-center">
        <label class="w-48 text-customGray-500">Optimization Enabled:</label>
        {{ '0' }}
      </li>
      <li class="mt-2 flex items-center">
        <label class="w-48 text-customGray-500">Runs:</label>
        {{ '200' }}
      </li>
    </ul>

    <div class="rounded-md p-4 mt-5 bg-white font-light">
      <div class="px-1">Consturctor Arguments Used</div>
      <div class="bg-customGray-200 text-customGray-500 text-sm p-3 mt-3 rounded-md">0103912849372840000000000000000000000000000</div>
      <div class="px-1 mt-6">Contract Name</div>
      <div class="bg-customGray-200 text-customGray-500 text-sm p-3 mt-3 rounded-md">Storage</div>
      <div class="px-1 mt-6 mb-3">Contract Bytecode</div>
      <div class="h-32 rounded-md bg-customGray-200 border"></div>
      <div class="px-1 mt-6 mb-3">Contract ABI</div>
      <div class="h-32 rounded-md bg-customGray-200 border"></div>
    </div>

    <div class="rounded-md p-4 mt-5 bg-white flex text-lg">
      <div class="w-1/3 pr-2.5">
        <p>Contract Address</p>
        <input class="w-full bg-customGray-200 rounded px-8 py-3 mt-3 text-sm font-light border border-customGray-300 outline-none focus:border-main transition duration-200 placeholder-black" placeholder="Please center address">
      </div>
      <div class="w-1/3 px-2.5">
        <p>Complier</p>
        <input class="w-full bg-customGray-200 rounded px-8 py-3 mt-3 text-sm font-light border border-customGray-300 outline-none focus:border-main transition duration-200 placeholder-black" placeholder="V0.8.7+commit.e28d00a7">
      </div>
      <div class="w-1/3 pl-2.5">
        <p>Optimizations</p>
        <input class="w-full bg-customGray-200 rounded px-8 py-3 mt-3 text-sm font-light border border-customGray-300 outline-none focus:border-main transition duration-200 placeholder-black" placeholder="Please center address">
      </div>
    </div>
    <div class="rounded-md p-4 mt-5 bg-white">
      <span class="font-light">Enter the Solidity Contract Code below</span>
      <div class="rounded-lg bg-customGray-200 border h-64 mt-2"></div>
    </div>
    <div class="rounded-md p-4 mt-5 bg-white text-sm font-light">
      <span class="text-base">Please select the Solidity (*.sol) files for upload</span>
      <div class="mt-4 flex items-center">
        <label class="w-16">Step 1:</label>
        <button class="rounded px-4 py-2 bg-main text-white hover:opacity-75 font-medium transition duration-200">Select the file</button>
        <span class="text-customGray-350 ml-4">No files selected</span>
      </div>
      <div class="mt-4 flex items-center">
        <label class="w-16">Step 2:</label>
        <button class="rounded px-4 py-2 bg-customGray-200 text-customGray-400 hover:opacity-75 font-medium transition duration-200">Click to Upload selected files</button>
      </div>
    </div>
    <div class="rounded-md p-4 mt-5 bg-white">
      <span class="font-light">Constructor Argument</span>
      <div class="rounded-lg bg-customGray-200 border h-64 mt-2"></div>
      <p class="text-xs text-customGray-400 pl-1 mt-3">
        For additition information on Constructor Arguments <span class="text-main">See Our KB Entry</span>
      </p>
      <div class="bg-white text-center p-4 my-4">
        <button class="rounded px-4 py-2.5 bg-main text-white hover:opacity-75 font-medium transition duration-200">Verify and Publish</button>
        <button class="rounded px-4 py-2.5 bg-customGray-200 text-customGray-400 hover:opacity-75 font-medium transition duration-200 mx-4">Reset</button>
        <button class="rounded px-4 py-2.5 bg-customGray-200 text-customGray-400 hover:opacity-75 font-medium transition duration-200">Return to Main</button>
      </div>
    </div>

    <div class="p-4 rounded-md"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { name: 'source', label: 'Contract Source Code' },
        { name: 'output', label: 'Compiler Output' }
      ],
      activeTab: 'source'
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
</style>
