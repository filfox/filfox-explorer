<template>
  <div class="pb-4">
    <div class="bg-white pb-3">
      <p class="pl-4 py-3 border-b border-background text-xs font-medium">
        {{ $t('detail.message.modules.overview') }}
      </p>
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
        <TipsetLink :id="message.height" class="message-value text-main" />
      </div>
      <div class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.time') }}
        </p>
        <p class="message-value">
          {{ message.timestamp | timestamp }}
        </p>
      </div>
      <div class="message-item">
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
            <MinerTag v-if="transfer.fromTag" :tag="transfer.fromTag" :type="2" />
          </div>
        </div>
        <div class="flex items-center justify-between px-3 mt-1">
          <p>
            {{ $t('detail.message.transfer.to') }}:
          </p>
          <div class="flex items-center">
            <AddressLink v-if="transfer.to" :id="transfer.to" :format="4" class="text-main" />
            <span v-else>N/A</span>
            <MinerTag v-if="transfer.toTag" :tag="transfer.toTag" :type="2" />
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
        <p class="message-key">
          Gas Fee Cap
        </p>
        <p class="message-value">
          {{ message.gasFeeCap | filecoin }}
        </p>
      </div>
      <div class="message-item">
        <p class="message-key">
          Gas Premium
        </p>
        <p class="message-value">
          {{ message.gasPremium | filecoin }}
        </p>
      </div>
      <div class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.gasLimit') }}
        </p>
        <p class="message-value">
          {{ message.gasLimit | locale }}
        </p>
      </div>
      <div v-if="message.receipt" class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.gasUsed') }}
        </p>
        <p class="message-value">
          {{ message.receipt.gasUsed | locale }}
        </p>
      </div>
      <div v-if="message.baseFeeBurn" class="message-item">
        <p class="message-key">
          Base Fee Burn
        </p>
        <p class="message-value">
          {{ message.baseFeeBurn | filecoin }}
        </p>
      </div>
      <div v-if="message.overEstimationBurn" class="message-item">
        <p class="message-key">
          Over Estimation Burn
        </p>
        <p class="message-value">
          {{ message.overEstimationBurn | filecoin }}
        </p>
      </div>
      <div v-if="message.minerTip" class="message-item">
        <p class="message-key">
          Miner Tip
        </p>
        <p class="message-value">
          {{ message.minerTip | filecoin }}
        </p>
      </div>
      <div v-if="message.receipt && message.receipt.exitCode === 0" class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.return') }}
        </p>
        <p class="message-value break-all">
          {{ message.receipt.return || $t('detail.message.null') }}
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
      <div class="message-item">
        <p class="message-key">
          {{ $t('detail.message.headers.params') }}
        </p>
        <p class="message-value break-all">
          {{ message.params || $t('detail.message.null') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: { type: Object, required: true }
  }
}
</script>

<style lang="postcss" scoped>
  .message-item {
    @apply flex justify-between items-center text-xs mx-4 mt-2;
  }
  .message-key {
    @apply w-1/4;
  }
  .message-value {
    @apply w-3/4 ml-2;
  }
</style>
