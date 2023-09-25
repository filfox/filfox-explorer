<template>
  <div class="pb-4 bg-white lg:rounded-md">
    <div class="px-4 lg:px-8 py-3 border-b border-background">
      {{ $t('detail.message.modules.overview') }}
    </div>
    <div
      v-if="NETWORK_NAME === 'Calibration'"
      class="bg-gray-100 mx-4 lg:mx-8 px-4 mt-4 text-red-500 py-2 text-xs"
    >
      {{ $t('detail.message.testNetOnly') }}
    </div>
    <div
      v-if="message.replaced"
      class="message-item bg-gray-100 mx-4 text-gray-500 p-2 text-xs flex items-center"
    >
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
    <dl class="message-item">
      <dt class="message-key">
        {{ $t('detail.message.headers.height') }}
      </dt>
      <dd class="message-value">
        <template v-if="message.height">
          <TipsetLink :id="message.height" class="text-main" />
          <el-tag class="ml-2" size="mini" type="info">
            {{ message.confirmations }} Block Confirmations
          </el-tag>
        </template>

        <p v-else>
          Pending
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
    <dl class="message-item border-t border-background pt-2.5">
      <dt class="message-key">
        {{ $t('detail.message.headers.from') }}
      </dt>
      <dd class="message-value">
        <AddressLink :id="message.from" class="text-main" />
        <AddressTag :tag="message.fromTag" type="pc" />
      </dd>
    </dl>
    <dl class="message-item border-b border-background pb-2.5">
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
    <dl class="message-item">
      <dt class="message-key">
        {{ $t('detail.message.headers.exitCode') }}
      </dt>
      <dd
        v-if="message.receipt"
        class="message-value"
        :class="[ message.receipt.exitCode ? 'text-red-500' : 'text-green-600' ]"
      >
        <img v-if="message.receipt.exitCode == 0" src="@/assets/img/shared/success.svg" class="w-3 h-3 lg:w-4 lg:h-4">
        <template v-else>
          {{ message.receipt.exitCode | exit-code }}
        </template>
      </dd>
      <dd
        v-else
        class="message-value"
      >
        Pending
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
</template>

<script>
import { NETWORK_NAME } from '~/filecoin/filecoin.config'

export default {
  props: {
    message: { type: Object, default: () => ({}) }
  },

  data() {
    return { NETWORK_NAME }
  }
}
</script>

<style lang="postcss" scoped>
  .message-item {
    @apply flex items-center my-2;
    & .message-key {
      @apply w-56 flex-shrink-0 pl-8 pr-2 text-gray-600;
    }
    & .message-value {
      @apply mr-8 flex flex-row items-center;
    }
  }

  @media (max-width: 500px) {
    .message-item {
      @apply text-xs;
      & .message-key {
        @apply pl-4 w-28 break-all;
      }
      & .message-value {
        @apply mr-4 break-all;
      }
    }
  }
</style>
