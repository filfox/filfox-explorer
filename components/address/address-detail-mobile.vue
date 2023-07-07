<template>
  <div class="bg-white">
    <div class="flex py-3 pl-4 text-sm font-medium border-b border-background">
      <span class="mr-4">{{ $t('detail.address.normal.headers.overview') }}</span>
      <template v-if="addressData.actor == 'evm'">
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

    <div class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.address') }}
      </p>
      <AddressLink :id="addressData.address" plain class="flex w-3/4" />
      <AddressTag v-if="addressData.address[1] === '0'" :tag="addressData.tag" type="mobile" :style="{maxWidth:'66%'}" />
    </div>

    <div v-if="addressData.address[1] !== '0'" class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        ID
      </p>
      <div v-if="addressData.id" class="flex w-3/4">
        <AddressLink :id="addressData.id" plain />
        <AddressTag :tag="addressData.tag" type="mobile" :style="{maxWidth:'66%'}" />
      </div>
      <div v-else class="flex w-3/4">
        --
      </div>
    </div>

    <div v-if="addressData.ethAddress" class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.ethAddress') }}
      </p>
      <div class="w-3/4">
        <AddressLink :id="addressData.ethAddress" plain />
      </div>
    </div>

    <div v-if="addressData.robustAddress" class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.robustAddress') }}
      </p>
      <div class="w-3/4">
        <AddressLink :id="addressData.robustAddress" plain />
      </div>
    </div>

    <div class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.actor') }}
      </p>
      <p v-if="addressData.actor" class="flex w-3/4">
        {{ $t(`actor.${addressData.actor}`) }}
      </p>
      <p v-else-if="addressData.ethAddress" class="flex w-3/4">
        {{ $t(`actor.created`) }}
      </p>
      <p v-else class="flex w-3/4">
        {{ $t(`actor.account`) }}
      </p>
    </div>

    <div class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.balance') }}
      </p>
      <p class="flex w-3/4">
        {{ (addressData.balance || 0) | filecoin }}
      </p>
    </div>

    <div class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.messages') }}
      </p>
      <p class="flex w-3/4">
        {{ addressData.messageCount || 0 }}
      </p>
    </div>

    <div class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.createTime') }}
      </p>
      <p v-if="addressData.createTimestamp" class="flex w-3/4">
        {{ addressData.createTimestamp | timestamp('datetime') }}
      </p>
      <p v-else class="flex w-3/4">
        --
      </p>
    </div>

    <div v-if="addressData.deleteTimestamp" class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        Delete Time
      </p>
      <p class="flex w-3/4">
        {{ addressData.deleteTimestamp | timestamp('datetime') }}
      </p>
    </div>

    <div class="flex items-center justify-between mx-4 mt-2 text-xs">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.lastSeenTime') }}
      </p>
      <p v-if="addressData.lastSeenTimestamp" class="flex w-3/4">
        {{ addressData.lastSeenTimestamp | timestamp('datetime') }}
      </p>
      <p v-else class="flex w-3/4">
        --
      </p>
    </div>

    <div v-if="addressData.ownedMiners && addressData.ownedMiners.length > 0" class="flex justify-between mx-4 mt-2 text-xs">
      <p class="w-1/4">
        {{ $t('detail.address.normal.headers.ownedMiners') }}
      </p>
      <div class="w-3/4">
        <div v-for="ownedMiner in addressData.ownedMiners" :key="ownedMiner" class="flex pb-1 text-main">
          <AddressLink :id="ownedMiner" />
        </div>
      </div>
    </div>

    <div v-if="addressData.workerMiners && addressData.workerMiners.length > 0" class="flex justify-between mx-4 mt-2 text-xs">
      <p class="w-1/4">
        {{ $t('detail.address.normal.headers.workers') }}
      </p>
      <div class="w-3/4">
        <div v-for="worker in addressData.workerMiners" :key="worker" class="flex pb-1 text-main">
          <AddressLink :id="worker" />
        </div>
      </div>
    </div>

    <div v-if="addressData.benefitedMiners && addressData.benefitedMiners.length > 0" class="flex justify-between mx-4 mt-2 text-xs">
      <p class="w-1/4">
        {{ $t('detail.address.normal.headers.benefitedMiners') }}
      </p>
      <div class="w-3/4">
        <div v-for="worker in addressData.benefitedMiners" :key="worker" class="flex pb-1 text-main">
          <AddressLink :id="worker" />
        </div>
      </div>
    </div>

    <AddressBalanceDetailChart v-if="addressData.id" :address-data="addressData" />

    <div v-loading="loading" class="pt-3 mt-2 bg-white border-t border-background">
      <div class="flex items-center justify-center h-10 mb-3">
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
      <AddressMessageListMobile v-if="listType === 0" :address="addressData.address" />
      <AddressTxListMobile v-if="listType === 1" :address="addressData.address" />
      <ContractCode v-if="listType === 2" :address="addressData.address" />
      <AddressEventLogs v-if="listType === 3" :address="addressData.address" />
      <AddressTxTokenList v-if="listType === 4" :address="addressData.address" />
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
