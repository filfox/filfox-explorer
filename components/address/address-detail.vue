<template>
  <div class="pt-6">
    <div class="flex items-center text-base">
      <span class="mr-2 font-medium">{{ $t('detail.address.normal.title') }}</span>
      <AddressLink :id="addressData.address" />
      <AddressTag :tag="addressData.tag" type="pc" :style="{ maxWidth: '66%' }" />
      <MinerAppGuide />
    </div>

    <div class="flex my-4">
      <div class="flex-1 pb-2 mr-4 text-sm bg-white rounded-md">
        <div class="flex py-4 pl-8 font-medium border-b border-background">
          <span class="mr-6">{{ $t('detail.address.normal.headers.overview') }}</span>
          <ContractCodeStatus v-if="addressData.actor == 'evm' && contract.address" :contract="contract" />
        </div>

        <dl class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.address') }}
          </dt>
          <dd class="mr-4">
            <AddressLink :id="addressData.address" plain />
          </dd>
        </dl>

        <dl v-if="addressData.address[1] !== '0'" class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            ID
          </dt>
          <dd v-if="addressData.id" class="mr-4">
            <AddressLink :id="addressData.id" plain />
          </dd>
          <dd v-else class="mr-4">
            --
          </dd>
        </dl>

        <dl v-if="addressData.ethAddress" class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.ethAddress') }}
          </dt>
          <dd class="mr-4">
            <AddressLink :id="addressData.ethAddress" plain />
          </dd>
        </dl>

        <dl v-if="addressData.robustAddress" class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.robustAddress') }}
          </dt>
          <dd class="mr-4">
            <AddressLink :id="addressData.robustAddress" plain />
          </dd>
        </dl>

        <dl class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.actor') }}
          </dt>
          <dd v-if="addressData.actor" class="mr-4">
            {{ $t(`actor.${addressData.actor}`) }}
          </dd>
          <dd v-else-if="addressData.ethAddress" class="mr-4">
            {{ $t(`actor.created`) }}
          </dd>
          <dd v-else class="mr-4">
            {{ $t(`actor.account`) }}
          </dd>
        </dl>

        <dl class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.balance') }}
          </dt>
          <dd class="mr-4">
            {{ (addressData.balance || 0) | filecoin }}
          </dd>
        </dl>

        <dl class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.messages') }}
          </dt>
          <dd class="mr-4">
            {{ addressData.messageCount || 0 }}
          </dd>
        </dl>

        <dl class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.createTime') }}
          </dt>
          <dd v-if="addressData.createTimestamp" class="mr-4">
            {{ addressData.createTimestamp | timestamp('datetime') }}
          </dd>
          <dd v-else class="mr-4">
            --
          </dd>
        </dl>

        <dl v-if="addressData.deleteTimestamp" class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.createTime') }}
          </dt>
          <dd class="mr-4">
            {{ addressData.deleteTimestamp | timestamp('datetime') }}
          </dd>
        </dl>

        <dl class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.lastSeenTime') }}
          </dt>
          <dd v-if="addressData.lastSeenTimestamp" class="mr-4">
            {{ addressData.lastSeenTimestamp | timestamp('datetime') }}
          </dd>
          <dd v-else class="mr-4">
            --
          </dd>
        </dl>

        <dl v-if="addressData.ownedMiners && addressData.ownedMiners.length > 0" class="flex items-center my-2">
          <dt class="items-center w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.ownedMiners') }}
          </dt>
          <dd class="flex flex-wrap flex-1 text-main">
            <p v-for="ownedMiner in addressData.ownedMiners" :key="ownedMiner" class="mr-4">
              <AddressLink :id="ownedMiner" />
            </p>
          </dd>
        </dl>

        <dl v-if="addressData.workerMiners && addressData.workerMiners.length > 0" class="flex items-center my-2">
          <dt class="items-center w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.workers') }}
          </dt>
          <dd class="flex flex-wrap flex-1 text-main">
            <p v-for="worker in addressData.workerMiners" :key="worker" class="mr-4">
              <AddressLink :id="worker" />
            </p>
          </dd>
        </dl>

        <dl v-if="addressData.benefitedMiners && addressData.benefitedMiners.length > 0" class="flex items-center my-2">
          <dt class="items-center w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.benefitedMiners') }}
          </dt>
          <dd class="flex flex-wrap flex-1 text-main">
            <p v-for="worker in addressData.benefitedMiners" :key="worker" class="mr-4">
              <AddressLink :id="worker" />
            </p>
          </dd>
        </dl>

        <dl v-if="addressData.tokenInfo" class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.tokenInfo') }}
          </dt>
          <dd class="mr-4 flex items-center">
            <NuxtLink :to="localePath(`/token/${addressData.address}`)" class="flex items-center hover:underline hover:text-main">
              <TokenIcon v-if="/erc20/i.test(addressData.tokenInfo.type)" class="mr-1.5" :token-id="addressData.address" />
              <img v-else src="@/assets/img/token/nft.png" :alt="addressData.tokenInfo.symbol" class="w-4 h-4 mr-1.5">
              {{ addressData.tokenInfo.name }} ({{ addressData.tokenInfo.symbol }})
            </NuxtLink>
          </dd>
        </dl>

        <dl v-if="addressData.tokens" class="flex items-center my-2">
          <dt class="w-1/5 px-2 pl-8 text-gray-600">
            {{ $t('detail.address.normal.headers.tokenHoldings') }}
          </dt>
          <dd class="mr-4 flex items-center">
            <el-popover
              placement="bottom-start"
              width="500"
              trigger="click"
              popper-class="rounded-lg border-none shadow-popover p-0"
            >
              <button slot="reference" class="flex items-center px-3 py-0.5 border rounded-full transition duration-200 hover:bg-customBlue-250">
                {{ addressData.tokens }} Tokens<i class="el-icon-arrow-down ml-3"></i>
              </button>
              <AddressTokenHoldings :address="addressData.ethAddress || addressData.id" />
            </el-popover>
          </dd>
        </dl>
      </div>
      <a target="_blank" :href="$i18n.locale === 'zh' ? 'https://foxwallet.com/zh?invite=evkZv8g5TG' : 'https://foxwallet.com/en?invite=evkZv8g5TG'" class="inline-block h-68">
        <img src="@/assets/img/foxwallet/address-portal.png" draggable="false" class="block h-full border border-gray-500 border-dashed">
      </a>
    </div>

    <AddressBalanceDetailChart v-if="addressData.id" :address-data="addressData" />

    <client-only>
      <div class="pt-4 my-4 bg-white rounded-md">
        <div class="flex items-center h-12 ml-8">
          <CapsuleRadioGroup large :radios="radios" :value="listType" @change="v => listType = v" />
        </div>
        <AddressMessageList v-if="listType === 0" :address="addressData.address" />
        <AddressTxList v-if="listType === 1" :address="addressData.address" />
        <AddressTxTokenList v-if="listType === 2" :address="addressData.address" />
        <div v-if="listType === 3" class="border-t py-4 mt-2">
          <Contract :contract="contract" />
        </div>
        <AddressEventLogs v-if="listType === 4" :address="addressData.address" />
        <div v-if="loading" v-loading="loading" class="flex h-24"></div>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    addressData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      listType: Number(this.$route.query?.t) || 0,
      eventLogs: {},
      contract: {}
    }
  },

  computed: {
    radios() {
      return [
        { key: 0, name: this.$t('blockchain.message.title') },
        { key: 1, name: this.$t('detail.transfer.title') },
        { key: 2, name: this.$t('detail.tokenTransfer.title') },
        { key: 3, name: this.$t('detail.contract.title'), verified: this.contract?.verified },
        { key: 4, name: this.$t('detail.eventLogs.title') }
      ].filter(({ key }) => {
        if (key === 2) return Boolean(this.addressData.ethAddress)
        if (key > 2) return this.addressData.actor === 'evm'
        return true
      })
    }
  },

  mounted() {
    this.getContractAddrData()
  },

  methods: {
    async getContractAddrData() {
      if (this.addressData.actor !== 'evm') return
      const { address, ethAddress } = this.addressData

      this.loading = true
      const contractSelf = await this.$axios.$get(`/address/${address}/contract`)
      let contractImpl = null
      if (contractSelf?.proxyImpl) {
        contractImpl = await this.$axios.$get(`/address/${contractSelf.proxyImpl}/contract`)
        contractImpl.address = contractSelf.proxyImpl
        contractImpl.ethAddress = ethAddress
        contractImpl.implAddress = contractSelf.proxyImpl
      }
      this.loading = false
      this.contract = { ...contractSelf, address, ethAddress, contractImpl }
    }
  }
}
</script>
