<template>
  <div class="bg-white">
    <div class="flex font-medium text-sm pl-4 py-3 border-b border-background">
      {{ $t('detail.address.normal.headers.overview') }}
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.address') }}
      </p>
      <div class="flex w-3/4">
        <AddressLink :id="addressData.address" />
        <AddressTag :tag="addressData.tag" type="mobile" :style="{maxWidth:'66%'}" />
      </div>
    </div>

    <div v-if="addressData.robust" class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        Robust Address
      </p>
      <p class="flex w-3/4">
        <AddressLink :id="addressData.robust" plain />
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.actor') }}
      </p>
      <p class="flex w-3/4">
        {{ $t(`actor.multisig`) }}
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.balance') }}
      </p>
      <p class="flex w-3/4">
        {{ addressData.balance | filecoin }}
      </p>
    </div>

    <template v-if="addressData.multisig.unlockDuration">
      <div class="flex justify-between items-center text-xs mx-4 mt-2">
        <p class="flex w-1/4">
          Available Balance
        </p>
        <p class="flex w-3/4">
          {{ addressData.multisig.availableBalance | filecoin }}
        </p>
      </div>
      <div class="flex justify-between items-center text-xs mx-4 mt-2">
        <p class="flex w-1/4">
          Initial Balance
        </p>
        <p class="flex w-3/4">
          {{ addressData.multisig.initialBalance | filecoin }}
        </p>
      </div>
      <div class="flex justify-between items-center text-xs mx-4 mt-2">
        <p class="flex w-1/4">
          Unlock Period
        </p>
        <p class="flex w-3/4">
          {{ addressData.multisig.unlockStartTimestamp | timestamp }}
          to
          {{ addressData.multisig.unlockEndTimestamp | timestamp }}
        </p>
      </div>
      <div class="flex justify-between items-center text-xs mx-4 mt-2">
        <p class="flex w-1/4">
          Locking Balance
        </p>
        <p class="flex w-3/4">
          {{ addressData.multisig.lockingBalance | filecoin }}
          ({{ 1 - addressData.multisig.lockingBalance / addressData.multisig.initialBalance | percentage }})
        </p>
      </div>
    </template>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        Signers
      </p>
      <p class="flex flex-wrap w-3/4">
        <span v-for="address in addressData.multisig.signers" :key="address" class="block w-full">
          <AddressLink :id="address" :format="8" />
        </span>
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        Approval Threshold
      </p>
      <p class="flex w-3/4">
        {{ addressData.multisig.approvalsThreshold }}
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.messages') }}
      </p>
      <p class="flex w-3/4">
        {{ addressData.messageCount }}
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.createTime') }}
      </p>
      <p class="flex w-3/4">
        {{ addressData.createTimestamp | timestamp('datetime') }}
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.lastSeenTime') }}
      </p>
      <p class="flex w-3/4">
        {{ addressData.lastSeenTimestamp | timestamp('datetime') }}
      </p>
    </div>

    <div v-if="addressData.ownedMiners.length > 0" class="flex justify-between text-xs mx-4 mt-2">
      <p class="w-1/4">
        {{ $t('detail.address.normal.headers.ownedMiners') }}
      </p>
      <div class="w-3/4">
        <p v-for="ownedMiner in addressData.ownedMiners" :key="ownedMiner" class="flex text-main pb-1">
          <AddressLink :id="ownedMiner" />
        </p>
      </div>
    </div>

    <div v-if="addressData.workerMiners.length > 0" class="flex justify-between text-xs mx-4 mt-2">
      <p class="w-1/4">
        {{ $t('detail.address.normal.headers.workers') }}
      </p>
      <div class="w-3/4">
        <p v-for="worker in addressData.workerMiners" :key="worker" class="pb-1 flex text-main">
          <AddressLink :id="worker" />
        </p>
      </div>
    </div>

    <div v-if="addressData.benefitedMiners.length > 0" class="flex justify-between text-xs mx-4 mt-2">
      <p class="w-1/4">
        {{ $t('detail.address.normal.headers.benefitedMiners') }}
      </p>
      <div class="w-3/4">
        <p v-for="worker in addressData.benefitedMiners" :key="worker" class="pb-1 flex text-main">
          <AddressLink :id="worker" />
        </p>
      </div>
    </div>

    <div v-if="addressData.tokens" class="flex justify-between mx-4 mt-2 text-xs">
      <p class="w-1/4">
        {{ $t('detail.address.normal.headers.tokenHoldings') }}
      </p>
      <div class="w-3/4">
        <el-popover
          width="360"
          placement="bottom"
          trigger="click"
          popper-class="rounded md:rounded-lg border-none shadow-popover p-0"
        >
          <button slot="reference" class="flex items-center px-3 py-0.5 border rounded-full transition duration-200 hover:bg-customBlue-250">
            {{ addressData.tokens }} Tokens<i class="el-icon-arrow-down ml-3"></i>
          </button>
          <AddressTokenHoldings :address="addressData.ethAddress || addressData.id" />
        </el-popover>
      </div>
    </div>

    <AddressBalanceDetailChart :address-data="addressData" />

    <div v-loading="loading" class="mt-2 pt-3 bg-white border-t border-background">
      <div class="flex h-10 items-center mb-3 justify-center">
        <el-radio-group v-model="listType" size="mini" fill="#1a4fc9" @change="didListTypeChanged">
          <el-radio-button :label="0">
            {{ $t('blockchain.message.title') }}
          </el-radio-button>
          <el-radio-button :label="1">
            {{ $t('detail.transfer.title') }}
          </el-radio-button>
          <el-radio-button :label="2">
            {{ $t('detail.tokenTransfer.title') }}
          </el-radio-button>
        </el-radio-group>
      </div>
      <AddressMessageListMobile v-if="listType === 0" :address="addressData.address" />
      <AddressTxListMobile v-if="listType === 1" :address="addressData.address" />
      <AddressTxTokenList v-if="listType === 2" :address="addressData.address" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    addressData: { type: Object, required: true }
  },

  data() {
    return {
      listType: Number(this.$route.query?.t) || 0,
      loading: false
    }
  }
}
</script>
