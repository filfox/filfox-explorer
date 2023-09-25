<template>
  <div class="pt-6">
    <div class="text-base items-center flex">
      <span class="font-medium mr-2">{{ $t('detail.address.normal.title') }}</span>
      <span>{{ addressData.address }}</span>
      <AddressTag :tag="addressData.tag" type="pc" :style="{maxWidth:'66%'}" />
      <!-- <MinerAppGuide /> -->
    </div>
    <div class="rounded-md my-4 bg-white pb-2 text-sm relative">
      <div class="flex pl-8 py-4 font-medium border-b border-background">
        {{ $t('detail.address.normal.headers.overview') }}
      </div>

      <!-- <a target="_blank" :href="$i18n.locale === 'zh'? 'https://foxwallet.com/zh?invite=evkZv8g5TG' : 'https://foxwallet.com/en?invite=evkZv8g5TG'" class="inline-block h-48 absolute right-0">
        <img src="@/assets/img/foxwallet/address-portal.png" draggable="false" class="border border-dashed border-gray-500 block h-full">
      </a> -->

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.address') }}
        </dt>
        <dd class="mr-4">
          <AddressLink :id="addressData.address" plain />
        </dd>
      </dl>

      <dl v-if="addressData.robust" class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          Robust Address
        </dt>
        <dd class="mr-4">
          <AddressLink :id="addressData.robust" plain />
        </dd>
      </dl>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.actor') }}
        </dt>
        <dd class="mr-4">
          {{ $t(`actor.multisig`) }}
        </dd>
      </dl>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.balance') }}
        </dt>
        <dd class="mr-4">
          {{ addressData.balance | filecoin }}
        </dd>
      </dl>

      <template v-if="addressData.multisig.unlockDuration">
        <dl class="flex my-2 items-center">
          <dt class="w-1/8 pl-8 text-gray-600 px-2">
            Available Balance
          </dt>
          <dd class="mr-4">
            {{ addressData.multisig.availableBalance | filecoin }}
          </dd>
        </dl>
        <dl class="flex my-2 items-center">
          <dt class="w-1/8 pl-8 text-gray-600 px-2">
            Initial Balance
          </dt>
          <dd class="mr-4">
            {{ addressData.multisig.initialBalance | filecoin }}
          </dd>
        </dl>
        <dl class="flex my-2 items-center">
          <dt class="w-1/8 pl-8 text-gray-600 px-2">
            Unlock Period
          </dt>
          <dd class="mr-4">
            {{ addressData.multisig.unlockStartTimestamp | timestamp }}
            to
            {{ addressData.multisig.unlockEndTimestamp | timestamp }}
          </dd>
        </dl>
        <dl class="flex my-2 items-center">
          <dt class="w-1/8 pl-8 text-gray-600 px-2">
            Locking Balance
          </dt>
          <dd class="mr-4">
            {{ addressData.multisig.lockingBalance | filecoin }}
            ({{ 1 - addressData.multisig.lockingBalance / addressData.multisig.initialBalance | percentage }})
          </dd>
        </dl>
      </template>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          Signers
        </dt>
        <dd class="mr-4">
          <p v-for="address in addressData.multisig.signers" :key="address">
            <AddressLink :id="address" />
          </p>
        </dd>
      </dl>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          Approval Threshold
        </dt>
        <dd class="mr-4">
          {{ addressData.multisig.approvalsThreshold }}
        </dd>
      </dl>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.messages') }}
        </dt>
        <dd class="mr-4">
          {{ addressData.messageCount }}
        </dd>
      </dl>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.createTime') }}
        </dt>
        <dd class="mr-4">
          {{ addressData.createTimestamp | timestamp('datetime') }}
        </dd>
      </dl>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.lastSeenTime') }}
        </dt>
        <dd class="mr-4">
          {{ addressData.lastSeenTimestamp | timestamp('datetime') }}
        </dd>
      </dl>

      <dl v-if="addressData.ownedMiners.length > 0" class="flex items-center my-2">
        <dt class="w-1/8 pl-8 text-gray-600 px-2 items-center">
          {{ $t('detail.address.normal.headers.ownedMiners') }}
        </dt>
        <dd class="flex flex-wrap flex-1 text-main">
          <p v-for="ownedMiner in addressData.ownedMiners" :key="ownedMiner" class="mr-4">
            <AddressLink :id="ownedMiner" />
          </p>
        </dd>
      </dl>

      <dl v-if="addressData.workerMiners.length > 0" class="flex items-center my-2">
        <dt class="w-1/8 pl-8 text-gray-600 px-2 items-center">
          {{ $t('detail.address.normal.headers.workers') }}
        </dt>
        <dd class="flex flex-wrap flex-1 text-main">
          <p v-for="worker in addressData.workerMiners" :key="worker" class="mr-4">
            <AddressLink :id="worker" />
          </p>
        </dd>
      </dl>

      <dl v-if="addressData.benefitedMiners.length > 0" class="flex items-center my-2">
        <dt class="w-1/8 pl-8 text-gray-600 px-2 items-center">
          {{ $t('detail.address.normal.headers.benefitedMiners') }}
        </dt>
        <dd class="flex flex-wrap flex-1 text-main">
          <p v-for="worker in addressData.benefitedMiners" :key="worker" class="mr-4">
            <AddressLink :id="worker" />
          </p>
        </dd>
      </dl>

      <!-- token holdings -->
      <dl v-if="addressData.tokens" class="flex items-center my-2">
        <dt class="w-1/8 px-2 pl-8 text-gray-600">
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

    <AddressBalanceDetailChart :address-data="addressData" />

    <div class="rounded-md my-4 bg-white pt-5">
      <CapsuleRadioGroup large :radios="radios" :value="listType" class="ml-8" @change="v => listType = v" />
      <AddressMessageList v-if="listType === 0" :address="addressData.address" />
      <AddressTxList v-if="listType === 1" :address="addressData.address" />
      <AddressTxTokenList v-if="listType === 2" :address="addressData.id" />
    </div>
  </div>
</template>

<script>
import { matchTabToUrl } from '@/utils'

export default {
  props: {
    addressData: { type: Object, required: true }
  },

  data() {
    return {
      listType: Number(this.$route.query?.t) || 0,
      loading: false
    }
  },

  computed: {
    radios() {
      return [
        { key: 0, name: this.$t('blockchain.message.title') },
        { key: 1, name: this.$t('detail.transfer.title') },
        { key: 2, name: this.$t('detail.tokenTransfer.title') }
      ].filter(({ key }) => {
        if (key === 1) return this.addressData.transferCount > 0
        if (key === 2) return this.addressData.tokenTransferCount > 0
        return true
      })
    }
  },

  watch: {
    listType(val) {
      matchTabToUrl(val)
    }
  }
}
</script>
