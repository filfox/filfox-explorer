<template>
  <div class="pb-4">
    <div class="bg-white pb-3">
      <p class="pl-4 py-3 border-b border-background text-xs font-medium">
        {{ $t('detail.message.modules.overview') }}
      </p>
      <div v-if="network.networks[network.currentNetwork].name === 'Wallaby'" class="message-item bg-gray-100 mx-8 px-4 text-red-500 py-2 text-xs">
        {{ $t('detail.message.testNetOnly') }}
      </div>
      <div v-if="message.replaced" class="message-item bg-gray-100 mx-8 text-gray-500 p-2 text-xs flex items-center break-all">
        <pre class="whitespace-pre-wrap">{{ $t('detail.message.replaced', { oldCid: message.oldCid, cid: message.cid}) }}</pre>
      </div>
      <div class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.cid') }}
        </p>
        <MessageLink :id="message.cid" class="message-value" />
      </div>
      <div class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.height') }}
        </p>
        <TipsetLink v-if="message.height" :id="message.height" class="message-value text-main" />
        <p v-else class="message-value">
          N/A
        </p>
      </div>
      <div v-if="message.timestamp" class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.time') }}
        </p>
        <p class="message-value">
          {{ message.timestamp | timestamp }}
        </p>
      </div>
      <div v-if="message.createTimestamp" class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.createTime') }}
        </p>
        <p class="message-value">
          {{ message.createTimestamp | timestamp }}
        </p>
      </div>
      <div v-if="message.blocks && message.blocks.length > 0" class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.inBlocks') }}
        </p>
        <div class="message-value">
          <p v-for="block in message.blocks" :key="block" class="flex items-center mt-2 text-main">
            <BlockLink :id="block" />
          </p>
        </div>
      </div>
      <div class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.from') }}
        </p>
        <AddressLink :id="message.from" class="message-value text-main" />
      </div>
      <div class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.to') }}
        </p>
        <AddressLink :id="message.to" class="message-value text-main" />
      </div>
      <div class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.method') }}
        </p>
        <p class="message-value">
          {{ message.method || 'N/A' }}
        </p>
      </div>
      <div class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.value') }}
        </p>
        <p class="message-value">
          {{ message.value | filecoin }}
        </p>
      </div>
      <div v-if="message.receipt" class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.exitCode') }}
        </p>
        <p class="message-value">
          {{ message.receipt.exitCode | exit-code }}
        </p>
      </div>
      <div v-if="message.details && message.details.length" class="message-item">
        <p class="message-key">
          Details
        </p>
        <p class="message-value">
          <MessageDescription :detail="message.details[0]" />
        </p>
      </div>
    </div>
    <div v-if="message.eventLogs.length" class="mt-2 py-px bg-white text-xs">
      <p class="pl-4 py-3 border-b border-background font-medium">
        {{ $t('detail.message.modules.logs') }}
      </p>
      <div
        v-for="item in message.eventLogs"
        :key="item.data"
        class="mx-3 my-3 py-2 rounded-sm shadow bg-white text-gray-800"
      >
        <div class="flex items-center justify-between px-3 mt-1">
          <p>
            {{ $t('detail.message.headers.address') }}:
          </p>
          <div class="flex items-center">
            <AddressLink :id="item.address" :format="4" class="text-main" />
          </div>
        </div>
        <div class="flex items-center justify-between px-3 mt-1">
          <p>
            {{ $t('detail.message.headers.topics') }}:
          </p>
          <div class="flex items-center flex-col">
            <div v-for="(topic,index) in item.topics" :key="topic" class="flex items-center mb-2">
              <div class="w-5 h-5 mx-1 flex items-center justify-center bg-gray-100 rounded-md text-gray-500">
                {{ index }}
              </div>
              <span>{{ topic.substr(0,4) + '...' + topic.substr(-4) }}</span>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between px-3 pr-0 mt-1">
          <p>
            {{ $t('detail.message.headers.data') }}:
          </p>
          <p class="message-value flex-1 pl-4 break-all text-xs flex items-center">
            <!-- _Value: -->
            <pre class="flex-1 whitespace-pre-wrap text-right pl-2">{{ item.data }}</pre>
          </p>
        </div>
      </div>
    </div>

    <div v-if="message.subcalls && message.subcalls.length > 0" class="mt-2 py-px bg-white text-xs">
      <p class="pl-4 py-3 border-b border-background font-medium">
        {{ $t('detail.message.modules.internaltransfer') }}
      </p>
      <div class="mt-2 bg-gray-100 mx-3 text-gray-500 p-2">
        {{ $t('detail.message.internaltransfer.contractFrom') }}
        <AddressLink v-if="message.from" :id="message.from" :format="8" class="text-main" />
        {{ $t('detail.message.internaltransfer.contractTo') }}
        <AddressLink v-if="message.to" :id="message.to" :format="8" class="text-main" />
        {{ $t('detail.message.internaltransfer.produced', { amount:message.subcalls.length }) }}
      </div>
      <div
        v-for="(transfer, index) in message.subcalls"
        :key="index"
        class="mx-3 my-3 py-2 rounded-sm shadow bg-white text-gray-800"
      >
        <div class="flex items-center justify-between px-3 mt-1">
          <p>
            {{ $t('detail.message.internaltransfer.method') }}:
          </p>
          <p>
            {{ transfer.method }}
          </p>
        </div>
        <div class="flex items-center justify-between px-3 mt-1">
          <p>
            {{ $t('detail.message.internaltransfer.from') }}:
          </p>
          <div class="flex items-center">
            <AddressLink v-if="transfer.from" :id="transfer.from" :format="4" class="text-main" />
            <span v-else>N/A</span>
            <AddressTag :tag="transfer.fromTag" type="mobile" />
          </div>
        </div>
        <div class="flex items-center justify-between px-3 mt-1">
          <p>
            {{ $t('detail.message.internaltransfer.to') }}:
          </p>
          <div class="flex items-center">
            <AddressLink v-if="transfer.to" :id="transfer.to" :format="4" class="text-main" />
            <span v-else>N/A</span>
            <AddressTag :tag="transfer.toTag" type="mobile" />
          </div>
        </div>
        <div class="flex items-center justify-between px-3 mt-1">
          <p>
            {{ $t('detail.message.internaltransfer.value') }}:
          </p>
          <p>
            {{ transfer.value | filecoin(2) }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="message.transfers && message.transfers.length > 0" class="mt-2 py-px bg-white text-xs">
      <p class="pl-4 py-3 border-b border-background font-medium">
        {{ $t('detail.message.modules.transfer') }}
      </p>
      <div
        v-for="(transfer, index) in message.transfers"
        :key="index"
        class="mx-3 my-3 py-2 rounded-sm shadow bg-white text-gray-800"
      >
        <div class="flex items-center justify-between px-3 mt-1">
          <p>
            {{ $t('detail.message.transfer.from') }}:
          </p>
          <div class="flex items-center">
            <AddressLink v-if="transfer.from" :id="transfer.from" :format="4" class="text-main" />
            <span v-else>N/A</span>
            <AddressTag :tag="transfer.fromTag" type="mobile" />
          </div>
        </div>
        <div class="flex items-center justify-between px-3 mt-1">
          <p>
            {{ $t('detail.message.transfer.to') }}:
          </p>
          <div class="flex items-center">
            <AddressLink v-if="transfer.to" :id="transfer.to" :format="4" class="text-main" />
            <span v-else>N/A</span>
            <AddressTag :tag="transfer.toTag" type="mobile" />
          </div>
        </div>
        <div class="flex items-center justify-between px-3 mt-1">
          <p>
            {{ $t('detail.message.transfer.value') }}:
          </p>
          <p>
            {{ transfer.value | filecoin(2) }}
          </p>
        </div>
        <div class="flex items-center justify-between px-3 mt-1">
          <p>
            {{ $t('detail.message.transfer.type') }}:
          </p>
          <p>
            {{ $t(`detail.transfer.types.${transfer.type}` ) }}
          </p>
        </div>
      </div>
    </div>

    <div class="bg-white mt-2 pb-3">
      <p class="pl-4 py-3 border-b border-background text-xs font-medium">
        {{ $t('detail.message.modules.others') }}
      </p>
      <div class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.version') }}
        </p>
        <p class="message-value">
          {{ message.version }}
        </p>
      </div>
      <div class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.nonce') }}
        </p>
        <p class="message-value">
          {{ message.nonce }}
        </p>
      </div>
      <div class="message-item">
        <div class="message-key">
          Gas Fee Cap
          <Tip class="mx-1" :content="$t('detail.message.tips.gasFeeCap')" />
          :
        </div>
        <p class="message-value">
          {{ message.gasFeeCap | filecoin }}
        </p>
      </div>
      <div class="message-item">
        <div class="message-key">
          Gas Premium
          <Tip class="mx-1" :content="$t('detail.message.tips.gasPremium')" />
          :
        </div>
        <p class="message-value">
          {{ message.gasPremium | filecoin }}
        </p>
      </div>
      <div class="message-item">
        <div class="message-key">
          Gas Limit
          <Tip class="mx-1" :content="$t('detail.message.tips.gasLimit')" />
          :
        </div>
        <p class="message-value">
          {{ message.gasLimit | locale }}
        </p>
      </div>
      <div v-if="message.receipt" class="message-item">
        <div class="message-key">
          {{ $t('detail.message.headers.gasUsed') }}
          <Tip class="mx-1" :content="$t('detail.message.tips.gasUsed')" />
          :
        </div>
        <p class="message-value">
          {{ message.receipt.gasUsed | locale }}
        </p>
      </div>
      <div v-if="message.baseFee" class="message-item">
        <div class="message-key">
          Base Fee
          <Tip class="mx-1" :content="$t('detail.message.tips.baseFee')" />
          :
        </div>
        <p class="message-value">
          {{ message.baseFee | filecoin }}
        </p>
      </div>
      <div v-if="message.baseFeeBurn" class="message-item">
        <div class="message-key">
          Base Fee Burn
          <Tip class="mx-1" :content="$t('detail.message.tips.baseFeeBurn')" />
          :
        </div>
        <p class="message-value">
          {{ message.baseFeeBurn | filecoin }}
        </p>
      </div>
      <div v-if="message.overEstimationBurn" class="message-item">
        <div class="message-key">
          Over Estimation Burn<Tip class="mx-1" :content="$t('detail.message.tips.overEstimationBurn')" />
          :
        </div>
        <p class="message-value">
          {{ message.overEstimationBurn | filecoin }}
        </p>
      </div>
      <div v-if="message.minerTip" class="message-item">
        <div class="message-key">
          Miner Tip
          <Tip class="mx-1" :content="$t('detail.message.tips.minerTip')" />
          :
        </div>
        <p class="message-value">
          {{ message.minerTip | filecoin }}
        </p>
      </div>
      <div v-if="message.minerPenalty" class="message-item">
        <div class="message-key">
          Miner Penalty
          <Tip class="mx-1" :content="$t('detail.message.tips.minerPenalty')" />
          :
        </div>
        <p class="message-value">
          {{ message.minerPenalty | filecoin }}
        </p>
      </div>
      <div v-if="message.error" class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.error') }}
        </p>
        <p class="message-value">
          {{ message.error }}
        </p>
      </div>
      <div class="message-item message-item-start">
        <p class="message-key">
          {{ $t('detail.message.headers.params') }}
        </p>
        <p v-if="message.decodedParams" class="message-value flex-1 text-xs break-all">
          <pre class="whitespace-pre-wrap text-left">{{ message.decodedParams }}</pre>
        </p>
        <p v-else class="message-value flex-1 break-all">
          {{ message.params || $t('detail.message.null') }}
        </p>
      </div>
      <div v-if="message.receipt && message.receipt.exitCode === 0" class="message-item message-item-start">
        <p class="message-key">
          {{ $t('detail.message.headers.return') }}
        </p>
        <p v-if="message.decodedReturnValue" class="message-value flex-1 text-xs break-all">
          <pre class="whitespace-pre-wrap text-left">{{ message.decodedReturnValue }}</pre>
        </p>
        <p v-else class="message-value flex-1 break-all">
          {{ message.receipt.return || $t('detail.message.null') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { network } from '~/filecoin/filecoin.config'
export default {
  props: {
    message: { type: Object, required: true }
  },
  data() {
    return {
      network
    }
  }
}
</script>

<style lang="postcss" scoped>
  .message-item {
    @apply flex justify-between items-center text-xs mx-4 mt-2;
    &.message-item-start {
      @apply items-start;
    }
  }
  .message-key {
    @apply w-3/8 flex items-center justify-start;
  }
  .message-value {
    @apply w-5/8 text-right mr-2;
  }
</style>
