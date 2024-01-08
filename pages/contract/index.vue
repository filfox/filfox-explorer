<template>
  <div class="container mx-auto bg-white rounded-md my-5 font-light">
    <div class="pt-6 pb-4 border-b-2 border-customGray-100 text-center">
      <p class="text-lg font-bold">
        {{ $t('contract.guide.title.0') }}
      </p>
      <p class="text-sm text-customGray-600 mt-2">
        {{ $t('contract.guide.title.1') }}
      </p>
    </div>

    <div class="flex flex-col items-center p-6">
      <p class="text-sm text-customGray-500 text-center leading-relaxed w-11/12 md:w-10/12">
        {{ $t('contract.guide.tips.0') }}
      </p>

      <p class="mt-12">
        {{ $t('contract.guide.enterContractAddress') }}
      </p>
      <input
        v-model.trim="contractAddress"
        :class="{ 'text-red-500': !isRightAddress(contractAddress) }"
        class="bg-customGray-200 rounded h-10 px-8 mt-4 text-sm font-light w-11/12 md:w-1/2 border border-customGray-300 outline-none focus:border-main transition duration-200 placeholder-customGray-600"
        :placeholder="$t('contract.guide.pleaseCenterAddress')"
      >

      <p class="mt-8">
        {{ $t('contract.guide.selectCompiler') }}
      </p>
      <el-select v-model="compilerVersion" :placeholder="$t('contract.guide.pleaseSelect')" class="w-11/12 md:w-1/2 mt-4 bg-customGray-200 compiler-select">
        <el-option
          v-for="value in compilerVersions"
          :key="value"
          :label="value"
          :value="value"
        >
        </el-option>
      </el-select>

      <p class="mt-8">
        {{ $t('contract.guide.selectLicense') }}
      </p>
      <el-select v-model="licenseType" :placeholder="$t('contract.guide.pleaseSelect')" class="w-11/12 md:w-1/2 mt-4 bg-customGray-200 compiler-select">
        <el-option
          v-for="{ label, value } in licenseTypes"
          :key="value"
          :label="label"
          :value="label"
        >
        </el-option>
      </el-select>

      <el-checkbox v-model="agreeService" class="mt-6 mb-8">
        <p class="text-customGray-400 text-xs">
          {{ $t('contract.guide.agreeService') }}
        </p>
      </el-checkbox>

      <div class="flex items-center mb-8">
        <button
          class="rounded w-26 py-2 bg-main text-white hover:opacity-75 mr-4 font-medium transition duration-200"
          :class="{ 'cursor-not-allowed bg-customGray-400': !allowNextStep }"
          :disabled="!allowNextStep"
          @click="nextStep"
        >
          {{ $t('contract.continue') }}
        </button>
        <button
          class="rounded w-26 py-2 bg-customGray-200 text-customGray-400 hover:opacity-75 font-medium transition duration-200"
          @click="resetForm"
        >
          {{ $t('contract.reset') }}
        </button>
      </div>

      <NuxtLink :to="localePath('/fevm/verified-contracts')" class="hover:underline text-main text-sm font-normal">
        {{ $t('contract.verifiedContractList') }}
      </NuxtLink>
      <a
        href="https://filfox.notion.site/Filfox-Contract-Verification-API-Documents-c48d361c949348acb0bf806871ddd2c2"
        class="mb-8 md:mb-16 hover:underline text-main text-sm font-normal"
        target="_blank"
      >{{ $t('contract.apiDocuments') }}</a>
    </div>
  </div>
</template>

<script>
import { isFilAddress } from '@/utils/fns/utils'
import { utils } from 'ethers'

export default {
  data() {
    return {
      agreeService: true,
      contractAddress: this.$route.query.address || '',
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
        { label: 'GNU Affero General Public License (GNU AGPLv3)', value: 13 },
        { label: 'Business Source License (BSL 1.1)', value: 14 }
      ],
      compilerVersion: '',
      compilerVersions: {}
    }
  },

  computed: {
    allowNextStep() {
      return this.compilerVersion && this.agreeService
    }
  },

  async mounted() {
    try {
      const res = await this.$axios.$get('http://binaries.soliditylang.org/bin/list.json')
      this.compilerVersions = this.processVersions(res.releases)
    } catch (error) {}
  },

  methods: {
    isRightAddress(address) {
      return utils.isAddress(address) || isFilAddress(address)
    },
    resetForm() {
      this.agreeService = false
      this.contractAddress = ''
      this.compilerVersion = ''
      this.licenseType = ''
    },
    nextStep() {
      this.$router.push({
        path: this.localePath(`/contract/verify`),
        query: {
          contractAddress: this.contractAddress,
          compilerVersion: this.compilerVersion,
          licenseType: this.licenseType
        }
      })
    },
    processVersions(versions) {
      const processedVersions = {}
      for (const key in versions) {
        // eslint-disable-next-line no-prototype-builtins
        if (versions.hasOwnProperty(key)) {
          const value = versions[key]
          processedVersions[key] = value.replace(/^soljson-(.+)\.js$/, '$1')
        }
      }
      return processedVersions
    }
  },

  head() {
    return {
      title: `${this.$t('contract.guide.title.0')}`
    }
  }
}
</script>

<style lang="postcss">
  .compiler-select.el-select .el-input__inner {
    @apply bg-customGray-200 border-customGray-300 h-10 pl-8 font-light;
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
