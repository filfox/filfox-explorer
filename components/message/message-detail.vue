<template>
  <div v-if="message" class="container mx-auto text-sm">
    <div class="mt-6 font-medium text-base">
      {{ $t('detail.message.title') }}
    </div>
    <div class="rounded-md my-4 py-4 bg-white">
      <p class="pl-8 pb-3 border-b border-background">
        {{ $t('detail.message.modules.overview') }}
      </p>
      <div v-if="network.networks[network.currentNetwork].name === 'Calibration'" class="message-item bg-gray-100 mx-8 px-4 text-red-500 py-2 text-xs">
        {{ $t('detail.message.testNetOnly') }}
      </div>
      <div v-if="message.replaced" class="message-item bg-gray-100 mx-8 text-gray-500 p-2 text-xs flex items-center">
        <i class="el-icon-info text-orange-400 text-lg px-2 hidden lg:block"></i>
        {{ $t('detail.message.replaced', { oldCid: message.oldCid || '', cid: message.cid}) }}
      </div>
      <dl class="message-item pt-2">
        <dt class="message-key">
          {{ $t('detail.message.headers.cid') }}
        </dt>
        <dd class="message-value">
          <MessageLink :id="message.cid" plain />
        </dd>
      </dl>
      <dl v-if="message.ethTransactionHash" class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.ethTransactionHash') }}
        </dt>
        <dd class="message-value">
          {{ message.ethTransactionHash }}
        </dd>
      </dl>
      <dl v-if="message.height" class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.height') }}
        </dt>
        <dd class="message-value">
          <TipsetLink v-if="message.height" :id="message.height" class="text-main" />
          <p v-else>
            N/A
          </p>
        </dd>
      </dl>
      <dl v-if="message.timestamp" class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.time') }}
        </dt>
        <dd class="message-value">
          {{ message.timestamp | timestamp }}
        </dd>
      </dl>
      <dl v-if="message.createTimestamp" class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.createTime') }}
        </dt>
        <dd class="message-value">
          {{ message.createTimestamp | timestamp }}
        </dd>
      </dl>
      <dl v-if="message.blocks && message.blocks.length > 0" class="message-item">
        <dt class="message-key items-center">
          {{ $t('detail.message.headers.inBlocks') }}
        </dt>
        <dd class="mr-4">
          <p v-for="block, index in message.blocks" :key="index" class="items-center flex text-main">
            <BlockLink :id="block" />
          </p>
        </dd>
      </dl>
      <dl class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.from') }}
        </dt>
        <dd class="message-value">
          <AddressLink :id="message.from" class="text-main" />
          <AddressTag :tag="message.fromTag" type="pc" />
        </dd>
      </dl>
      <dl class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.to') }}
        </dt>
        <dd class="message-value">
          <AddressLink :id="message.to" class="text-main" />
          <AddressTag :tag="message.toTag" type="pc" />
        </dd>
      </dl>
      <dl class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.method') }}
        </dt>
        <dd class="message-value">
          {{ message.method || 'N/A' }}
        </dd>
      </dl>
      <dl class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.value') }}
        </dt>
        <dd class="message-value">
          {{ message.value | filecoin }}
        </dd>
      </dl>
      <dl v-if="message.receipt" class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.exitCode') }}
        </dt>
        <dd class="message-value">
          {{ message.receipt.exitCode | exit-code }}
        </dd>
      </dl>
      <dl v-if="message.details && message.details.length" class="message-item">
        <dt class="message-key">
          Details
        </dt>
        <dd class="message-value">
          <MessageDescription :detail="message.details[0]" />
        </dd>
      </dl>
    </div>
    <MessageLogs v-if="message.eventLogs && message.eventLogs.length" :message="message" />
    <div v-if="message.subcalls && message.subcalls.length" class="rounded-md my-4 py-4 bg-white">
      <p class="pl-8 pb-3 border-b border-background">
        {{ $t('detail.message.modules.internaltransfer') }}
      </p>
      <div class="message-item bg-gray-100 mx-8 text-gray-500 p-2 flex items-center">
        {{ $t('detail.message.internaltransfer.contractFrom') }}
        <AddressLink v-if="message.from" :id="message.from" :format="8" class="text-main px-2" />
        {{ $t('detail.message.internaltransfer.contractTo') }}
        <AddressLink v-if="message.to" :id="message.to" :format="8" class="text-main px-2" />
        {{ $t('detail.message.internaltransfer.produced', { amount:message.subcalls.length }) }}
      </div>
      <div class="px-8">
        <table class="w-full table-fixed">
          <thead class="text-gray-600 text-sm m-2">
            <tr class="h-8">
              <th class="sticky top-0 bg-white z-10 w-1/4">
                {{ $t('detail.message.internaltransfer.method') }}
              </th>
              <th class="sticky top-0 bg-white z-10 w-1/4">
                {{ $t('detail.message.internaltransfer.from') }}
              </th>
              <th class="sticky top-0 bg-white z-10 w-1/8">
              </th>
              <th class="sticky top-0 bg-white z-10 w-1/4">
                {{ $t('detail.message.internaltransfer.to') }}
              </th>
              <th class="sticky top-0 bg-white z-10 w-1/8">
                {{ $t('detail.message.internaltransfer.value') }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr
              v-for="(transfer, index) in message.subcalls"
              :key="index"
              class="h-12 border-b border-background text-sm"
            >
              <td>
                <div class="flex items-center flex-row justify-center">
                  {{ transfer.method }}
                </div>
              </td>
              <td>
                <div class="flex items-center flex-row justify-center">
                  <AddressLink v-if="transfer.from" :id="transfer.from" :format="8" />
                </div>
              </td>
              <td>
                <div class="flex justify-center">
                  <img src="~/assets/img/shared/to.svg" alt="3" class="w-4">
                </div>
              </td>
              <td>
                <div class="flex items-center flex-row justify-center">
                  <AddressLink v-if="transfer.to" :id="transfer.to" :format="8" />
                  <span v-else>N/A</span>
                  <AddressTag :tag="transfer.toTag" type="pc" :style="{maxWidth:'66%'}" />
                </div>
              </td>
              <td>
                {{ transfer.value | filecoin }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <MessageTransfers v-if="message.transfers && message.transfers.length" :message="message" />

    <div class="rounded-md my-4 pb-4 bg-white">
      <p class="pl-8 py-3 border-b border-background">
        {{ $t('detail.message.modules.others') }}
      </p>
      <dl class="message-item">
        <dt class="message-key pt-2">
          {{ $t('detail.message.headers.version') }}
          <a
            :href="`${network.networks[network.currentNetwork].url}/api/v1/message/${message.cid}`"
            target="_blank"
            class="text-main"
          >
            (API)
          </a>
        </dt>
        <dd class="message-value">
          {{ message.version }}
        </dd>
      </dl>
      <dl class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.nonce') }}
        </dt>
        <dd class="message-value">
          {{ message.nonce }}
        </dd>
      </dl>
      <dl class="message-item">
        <dt class="message-key">
          <div class="flex items-center justify-start">
            Gas Fee Cap
            <Tip class="mx-1" :content="$t('detail.message.tips.gasFeeCap')" />
            :
          </div>
        </dt>
        <dd class="message-value">
          {{ message.gasFeeCap | filecoin }}
        </dd>
      </dl>
      <dl class="message-item">
        <dt class="message-key">
          <div class="flex items-center justify-start">
            Gas Premium
            <Tip class="mx-1" :content="$t('detail.message.tips.gasPremium')" />
            :
          </div>
        </dt>
        <dd class="message-value">
          {{ message.gasPremium | filecoin }}
        </dd>
      </dl>
      <dl class="message-item">
        <dt class="message-key">
          <div class="flex items-center justify-start">
            {{ $t('detail.message.headers.gasLimit') }}
            <Tip class="mx-1" :content="$t('detail.message.tips.gasLimit')" />
            :
          </div>
        </dt>
        <dd class="message-value">
          {{ message.gasLimit | locale }}
        </dd>
      </dl>
      <dl v-if="message.receipt" class="message-item">
        <dt class="message-key">
          <div class="flex items-center justify-start">
            {{ $t('detail.message.headers.gasUsed') }}
            <Tip class="mx-1" :content="$t('detail.message.tips.gasUsed')" />
            :
          </div>
        </dt>
        <dd class="message-value">
          {{ message.receipt.gasUsed | locale }}
        </dd>
      </dl>
      <dl v-if="message.baseFee" class="message-item">
        <dt class="message-key">
          <div class="flex items-center justify-start">
            Base Fee
            <Tip class="mx-1" :content="$t('detail.message.tips.baseFee')" />
            :
          </div>
        </dt>
        <dd class="message-value">
          {{ message.baseFee | filecoin }}
        </dd>
      </dl>
      <dl v-if="message.baseFeeBurn" class="message-item">
        <dt class="message-key">
          <div class="flex items-center justify-start">
            Base Fee Burn
            <Tip class="mx-1" :content="$t('detail.message.tips.baseFeeBurn')" />
            :
          </div>
        </dt>
        <dd class="message-value">
          {{ message.baseFeeBurn | filecoin }}
        </dd>
      </dl>
      <dl v-if="message.overEstimationBurn" class="message-item">
        <dt class="message-key">
          <div class="flex items-center justify-start">
            Over Estimation Burn
            <Tip class="mx-1" :content="$t('detail.message.tips.overEstimationBurn')" />
            :
          </div>
        </dt>
        <dd class="message-value">
          {{ message.overEstimationBurn | filecoin }}
        </dd>
      </dl>
      <dl v-if="message.minerTip" class="message-item">
        <dt class="message-key">
          <div class="flex items-center justify-start">
            Miner Tip
            <Tip class="mx-1" :content="$t('detail.message.tips.minerTip')" />
            :
          </div>
        </dt>
        <dd class="message-value">
          {{ message.minerTip | filecoin }}
        </dd>
      </dl>
      <dl v-if="message.penalty" class="message-item">
        <dt class="message-key">
          <div class="flex items-center justify-start">
            Miner Penalty
            <Tip class="mx-1" :content="$t('detail.message.tips.minerPenalty')" />
            :
          </div>
        </dt>
        <dd class="message-value">
          {{ message.penalty | filecoin }}
        </dd>
      </dl>
      <dl v-if="message.error" class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.error') }}
        </dt>
        <dd class="message-value">
          {{ message.error }}
        </dd>
      </dl>
      <dl class="flex items-start">
        <dt class="message-key">
          {{ $t('detail.message.headers.params') }}
        </dt>
        <dd v-if="message.decodedParams" class="message-value flex-1 text-xs break-all">
          <pre class="whitespace-pre-wrap">{{ JSON.stringify(message.decodedParams, null, 2) }}</pre>
        </dd>
        <dd v-else class="message-value flex-1 break-all">
          {{ message.params || $t('detail.message.null') }}
        </dd>
      </dl>
      <dl v-if="message.receipt && message.receipt.exitCode === 0" class="flex items-start">
        <dt class="message-key">
          {{ $t('detail.message.headers.return') }}
        </dt>
        <dd v-if="message.decodedReturnValue" class="message-value flex-1 text-xs break-all">
          <pre class="whitespace-pre-wrap">{{ JSON.stringify(message.decodedReturnValue, null, 2) }}</pre>
        </dd>
        <dd v-else class="message-value flex-1 break-all">
          {{ message.receipt.return || $t('detail.message.null') }}
        </dd>
      </dl>
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
    @apply flex items-center my-2;
  }
  .message-key {
    @apply w-56 flex-shrink-0 pl-8 pr-2 text-gray-600;
  }
  .message-value {
    @apply mr-8 flex flex-row items-center;
  }
</style>
