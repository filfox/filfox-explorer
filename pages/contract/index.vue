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
        class="bg-customGray-200 rounded h-11 px-8 mt-4 text-sm font-light w-11/12 md:w-1/2 border border-customGray-300 outline-none focus:border-main transition duration-200 placeholder-customGray-600"
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
          class="rounded w-26 py-2 md:py-2.5 bg-main text-white hover:opacity-75 mr-4 font-medium transition duration-200"
          :class="{ 'cursor-not-allowed bg-customGray-400': !allowNextStep }"
          :disabled="!allowNextStep"
          @click="nextStep"
        >
          {{ $t('contract.continue') }}
        </button>
        <button
          class="rounded w-26 py-2 md:py-2.5 bg-customGray-200 text-customGray-400 hover:opacity-75 font-medium transition duration-200"
          @click="resetForm"
        >
          {{ $t('contract.reset') }}
        </button>
      </div>

      <NuxtLink :to="localePath('/fevm/verified-contracts')" class="mb-8 md:mb-16 underline text-main text-sm font-normal">
        {{ $t('contract.verifiedContractList') }}
      </NuxtLink>
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
      compilerVersions: {
        '0.8.19': 'v0.8.19+commit.7dd6d404',
        '0.8.18': 'v0.8.18+commit.87f61d96',
        '0.8.17': 'v0.8.17+commit.8df45f5f',
        '0.8.16': 'v0.8.16+commit.07a7930e',
        '0.8.15': 'v0.8.15+commit.e14f2714',
        '0.8.14': 'v0.8.14+commit.80d49f37',
        '0.8.13': 'v0.8.13+commit.abaa5c0e',
        '0.8.12': 'v0.8.12+commit.f00d7308',
        '0.8.11': 'v0.8.11+commit.d7f03943',
        '0.8.10': 'v0.8.10+commit.fc410830',
        '0.8.9': 'v0.8.9+commit.e5eed63a',
        '0.8.8': 'v0.8.8+commit.dddeac2f',
        '0.8.7': 'v0.8.7+commit.e28d00a7',
        '0.8.6': 'v0.8.6+commit.11564f7e',
        '0.8.5': 'v0.8.5+commit.a4f2e591',
        '0.8.4': 'v0.8.4+commit.c7e474f2',
        '0.8.3': 'v0.8.3+commit.8d00100c',
        '0.8.2': 'v0.8.2+commit.661d1103',
        '0.8.1': 'v0.8.1+commit.df193b15',
        '0.8.0': 'v0.8.0+commit.c7dfd78e',
        '0.7.6': 'v0.7.6+commit.7338295f',
        '0.7.5': 'v0.7.5+commit.eb77ed08',
        '0.7.4': 'v0.7.4+commit.3f05b770',
        '0.7.3': 'v0.7.3+commit.9bfce1f6',
        '0.7.2': 'v0.7.2+commit.51b20bc0',
        '0.7.1': 'v0.7.1+commit.f4a555be',
        '0.7.0': 'v0.7.0+commit.9e61f92b',
        '0.6.12': 'v0.6.12+commit.27d51765',
        '0.6.11': 'v0.6.11+commit.5ef660b1',
        '0.6.10': 'v0.6.10+commit.00c0fcaf',
        '0.6.9': 'v0.6.9+commit.3e3065ac',
        '0.6.8': 'v0.6.8+commit.0bbfe453',
        '0.6.7': 'v0.6.7+commit.b8d736ae',
        '0.6.6': 'v0.6.6+commit.6c089d02',
        '0.6.5': 'v0.6.5+commit.f956cc89',
        '0.6.4': 'v0.6.4+commit.1dca32f3',
        '0.6.3': 'v0.6.3+commit.8dda9521',
        '0.6.2': 'v0.6.2+commit.bacdbe57',
        '0.6.1': 'v0.6.1+commit.e6f7d5a4',
        '0.6.0': 'v0.6.0+commit.26b70077',
        '0.5.17': 'v0.5.17+commit.d19bba13',
        '0.5.16': 'v0.5.16+commit.9c3226ce',
        '0.5.15': 'v0.5.15+commit.6a57276f',
        '0.5.14': 'v0.5.14+commit.01f1aaa4',
        '0.5.13': 'v0.5.13+commit.5b0b510c',
        '0.5.12': 'v0.5.12+commit.7709ece9',
        '0.5.11': 'v0.5.11+commit.c082d0b4',
        '0.5.10': 'v0.5.10+commit.5a6ea5b1',
        '0.5.9': 'v0.5.9+commit.e560f70d',
        '0.5.8': 'v0.5.8+commit.23d335f2',
        '0.5.7': 'v0.5.7+commit.6da8b019',
        '0.5.6': 'v0.5.6+commit.b259423e',
        '0.5.5': 'v0.5.5+commit.47a71e8f',
        '0.5.4': 'v0.5.4+commit.9549d8ff',
        '0.5.3': 'v0.5.3+commit.10d17f24',
        '0.5.2': 'v0.5.2+commit.1df8f40c',
        '0.5.1': 'v0.5.1+commit.c8a2cb62',
        '0.5.0': 'v0.5.0+commit.1d4f565a',
        '0.4.26': 'v0.4.26+commit.4563c3fc',
        '0.4.25': 'v0.4.25+commit.59dbf8f1',
        '0.4.24': 'v0.4.24+commit.e67f0147',
        '0.4.23': 'v0.4.23+commit.124ca40d',
        '0.4.22': 'v0.4.22+commit.4cb486ee',
        '0.4.21': 'v0.4.21+commit.dfe3193c',
        '0.4.20': 'v0.4.20+commit.3155dd80',
        '0.4.19': 'v0.4.19+commit.c4cbbb05',
        '0.4.18': 'v0.4.18+commit.9cf6e910',
        '0.4.17': 'v0.4.17+commit.bdeb9e52',
        '0.4.16': 'v0.4.16+commit.d7661dd9',
        '0.4.15': 'v0.4.15+commit.bbb8e64f',
        '0.4.14': 'v0.4.14+commit.c2215d46',
        '0.4.13': 'v0.4.13+commit.0fb4cb1a',
        '0.4.12': 'v0.4.12+commit.194ff033',
        '0.4.11': 'v0.4.11+commit.68ef5810',
        '0.4.10': 'v0.4.10+commit.f0d539ae',
        '0.4.9': 'v0.4.9+commit.364da425',
        '0.4.8': 'v0.4.8+commit.60cc1668',
        '0.4.7': 'v0.4.7+commit.822622cf',
        '0.4.6': 'v0.4.6+commit.2dabbdf0',
        '0.4.5': 'v0.4.5+commit.b318366e',
        '0.4.4': 'v0.4.4+commit.4633f3de',
        '0.4.3': 'v0.4.3+commit.2353da71',
        '0.4.2': 'v0.4.2+commit.af6afb04',
        '0.4.1': 'v0.4.1+commit.4fc6fc2c',
        '0.4.0': 'v0.4.0+commit.acd334c9'
      }
    }
  },

  computed: {
    allowNextStep() {
      return this.compilerVersion && this.agreeService
    }
  },

  watch: {
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
