<template>
  <div class="container mx-auto text-sm">
    <div class="mt-6 font-medium text-base">
      {{ $t('detail.message.title') }}
    </div>
    <div class="rounded-md my-4 py-4 bg-white">
      <p class="pl-8 pb-3 border-b border-background">
        {{ $t('detail.message.modules.overview') }}
      </p>
      <dl class="message-item pt-2">
        <dt class="message-key">
          {{ $t('detail.message.headers.cid') }}
        </dt>
        <dd class="message-value">
          <MessageLink :id="message.cid" plain />
        </dd>
      </dl>
      <dl class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.height') }}
        </dt>
        <dd class="message-value">
          <TipsetLink :id="message.height" class="text-main" />
        </dd>
      </dl>
      <dl class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.time') }}
        </dt>
        <dd class="message-value">
          {{ message.timestamp | timestamp }}
        </dd>
      </dl>
      <dl class="message-item">
        <dt class="message-key items-center">
          {{ $t('detail.message.headers.inBlocks') }}
        </dt>
        <dd class="mr-4">
          <p v-for="block in message.blocks" :key="block" class="items-center flex text-main">
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
          <MinerTag v-if="message.fromTag" :tag="message.fromTag" :type="1" />
        </dd>
      </dl>
      <dl class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.to') }}
        </dt>
        <dd class="message-value">
          <AddressLink :id="message.to" class="text-main" />
          <MinerTag v-if="message.toTag" :tag="message.toTag" :type="1" />
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
    </div>
    <div v-if="message.transfers && message.transfers.length > 0" class="rounded-md my-4 py-4 bg-white mt-4">
      <p class="pl-8 pb-3 border-b border-background">
        {{ $t('detail.message.modules.transfer') }}
      </p>
      <div class="px-8">
        <table class="w-full table-fixed">
          <thead class="text-gray-600 text-sm m-2">
            <tr class="h-8">
              <th class="sticky top-0 bg-white z-10 w-1/4">
                {{ $t('detail.message.transfer.from') }}
              </th>
              <th class="sticky top-0 bg-white z-10 w-1/8">
              </th>
              <th class="sticky top-0 bg-white z-10 w-1/4">
                {{ $t('detail.message.transfer.to') }}
              </th>
              <th class="sticky top-0 bg-white z-10 w-1/4">
                {{ $t('detail.message.transfer.value') }}
              </th>
              <th class="sticky top-0 bg-white z-10 w-1/8">
                {{ $t('detail.message.transfer.type') }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr
              v-for="(transfer, index) in message.transfers"
              :key="index"
              class="h-12 border-b border-background text-sm"
            >
              <td>
                <div class="flex items-center flex-row justify-center">
                  <AddressLink v-if="transfer.from" :id="transfer.from" :format="4" />
                  <span v-else>N/A</span>
                  <MinerTag v-if="transfer.fromTag" :tag="transfer.fromTag" :type="1" />
                </div>
              </td>
              <td>
                <div class="flex justify-center">
                  <img src="~/assets/img/shared/to.svg" alt="3" class="w-4">
                </div>
              </td>
              <td>
                <div class="flex items-center flex-row justify-center">
                  <AddressLink v-if="transfer.to" :id="transfer.to" :format="4" />
                  <span v-else>N/A</span>
                  <MinerTag v-if="transfer.toTag" :tag="transfer.toTag" :type="1" />
                </div>
              </td>
              <td>
                {{ transfer.value | filecoin }}
              </td>
              <td>
                {{ $t('detail.transfer.types.' + transfer.type ) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="rounded-md my-4 pb-4 bg-white">
      <p class="pl-8 py-3 border-b border-background">
        {{ $t('detail.message.modules.others') }}
      </p>
      <dl class="message-item">
        <dt class="message-key pt-2">
          {{ $t('detail.message.headers.version') }}
          <a
            :href="`${network.networks[network.currentNetwork].url}/api/v0/message/${message.cid}`"
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
          Gas Fee Cap
        </dt>
        <dd class="message-value">
          {{ message.gasFeeCap | filecoin }}
        </dd>
      </dl>
      <dl class="message-item">
        <dt class="message-key">
          Gas Premium
        </dt>
        <dd class="message-value">
          {{ message.gasPremium | filecoin }}
        </dd>
      </dl>
      <dl class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.gasLimit') }}
        </dt>
        <dd class="message-value">
          {{ message.gasLimit | locale }}
        </dd>
      </dl>
      <dl v-if="message.receipt" class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.gasUsed') }}
        </dt>
        <dd class="message-value">
          {{ message.receipt.gasUsed | locale }}
        </dd>
      </dl>
      <dl v-if="message.baseFeeBurn" class="message-item">
        <dt class="message-key">
          Base Fee Burn
        </dt>
        <dd class="message-value">
          {{ message.baseFeeBurn | filecoin }}
        </dd>
      </dl>
      <dl v-if="message.overEstimationBurn" class="message-item">
        <dt class="message-key">
          Over Estimation Burn
        </dt>
        <dd class="message-value">
          {{ message.overEstimationBurn | filecoin }}
        </dd>
      </dl>
      <dl v-if="message.minerTip" class="message-item">
        <dt class="message-key">
          Miner Tip
        </dt>
        <dd class="message-value">
          {{ message.minerTip | filecoin }}
        </dd>
      </dl>
      <dl v-if="message.receipt && message.receipt.exitCode === 0" class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.return') }}
        </dt>
        <dd class="message-value">
          {{ message.receipt.return || $t('detail.message.null') }}
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
        <dd class="message-value flex-1 break-all">
          {{ message.params || $t('detail.message.null') }}
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
    @apply w-48 pl-8 pr-2 text-gray-600;
  }
  .message-value {
    @apply mr-8 flex flex-row items-center;
  }
</style>
