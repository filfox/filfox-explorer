<template>
  <div class="pt-6">
    <div class="flex items-center text-base">
      <span class="mr-2 font-medium">{{ $t('detail.address.normal.title') }}</span>
      <AddressLink :id="addressData.address" />
      <AddressTag :tag="addressData.tag" type="pc" :style="{ maxWidth: '66%' }" />
      <MinerAppGuide />
    </div>

    <div class="flex pb-2 my-4">
      <div class="flex-1 mr-4 text-sm bg-white rounded-md">
        <div class="flex py-4 pl-8 font-medium border-b border-background">
          <span class="mr-6">{{ $t('detail.address.normal.headers.overview') }}</span>
          <template v-if="addressData.actor == 'evm' && contract.address">
            <span v-if="contract.verified" class="flex items-center font-light">
              <img src="@/assets/img/contract/ok.svg" alt="warn" class="w-4 h-4 mr-1.5">
              <span class="text-sm">{{ $t('detail.contract.codeVerified') }}</span>
            </span>
            <div v-else class="font-light rounded-md text-customGray-600 flex items-center">
              <img src="@/assets/img/contract/warn.svg" alt="warn" class="w-4.5 h-4.5 mr-1.5">
              <span>{{ $t('detail.contract.verifyTip.0') }}?
                <nuxt-link :to="localePath(`/contract?address=${contract.address}`)" class="text-main hover:underline">
                  {{ $t('detail.contract.verifyTip.1') }}
                </nuxt-link>
                {{ $t('detail.contract.verifyTip.2') }}!
              </span>
            </div>
          </template>
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
      </div>
      <a target="_blank" :href="$i18n.locale === 'zh'? 'https://foxwallet.com/zh?invite=evkZv8g5TG' : 'https://foxwallet.com/en?invite=evkZv8g5TG'" class="inline-block h-68">
        <img src="@/assets/img/foxwallet/address-portal.png" draggable="false" class="block h-full border border-gray-500 border-dashed">
      </a>
    </div>

    <AddressBalanceDetailChart v-if="addressData.id" :address-data="addressData" />

    <div class="pt-4 my-4 bg-white rounded-md">
      <div class="flex items-center h-12 ml-8">
        <el-radio-group v-model="listType" size="mini" fill="#1a4fc9">
          <el-radio-button :label="0">
            {{ $t('blockchain.message.title') }}
          </el-radio-button>
          <el-radio-button :label="1">
            {{ $t('detail.transfer.title') }}
          </el-radio-button>
          <el-radio-button v-if="addressData.ethAddress" :label="4">
            {{ $t('detail.tokenTransfer.title') }}
          </el-radio-button>
          <el-radio-button v-if="addressData.actor == 'evm'" :label="2">
            {{ $t('detail.contract.title') }}
            <img v-if="contract.verified" src="@/assets/img/contract/ok.svg" alt="warn" class="w-4 h-4 absolute -top-2 -right-1 z-10">
          </el-radio-button>
          <el-radio-button v-if="addressData.actor == 'evm'" :label="3">
            {{ $t('detail.eventLogs.title') }}
          </el-radio-button>
        </el-radio-group>
      </div>
      <AddressMessageList v-if="listType === 0" :address="addressData.address" />
      <AddressTxList v-if="listType === 1" :address="addressData.address" />
      <ContractCode v-if="listType === 2" :contract="contract" />
      <AddressEventLogs v-if="listType === 3" :address="addressData.address" />
      <AddressTxTokenList v-if="listType === 4" :address="addressData.address" />
      <div v-if="loading" v-loading="loading" class="flex h-24"></div>
    </div>
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
      listType: 0,
      eventLogs: {},
      contract: {}
    }
  },

  mounted() {
    this.getContractAddrData()
  },

  methods: {
    async getContractAddrData() {
      const { actor, address } = this.addressData
      if (actor !== 'evm') return

      this.loading = true
      const data = await this.$axios.$get(`/address/${address}/contract`)
      this.loading = false
      this.contract = { ...data, address }
    }
  }
}
</script>
