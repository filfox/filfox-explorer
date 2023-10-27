<template>
  <div v-loading="loading" class="pt-1 pb-5 bg-white">
    <dl class="message-item">
      <dt class="message-key pt-2">
        {{ $t('detail.message.headers.version') }}
        <a
          :href="`${HOST}/api/v1/message/${message.cid}`"
          target="_blank"
          class="text-main"
        >
        </a>
      </dt>
      <dd class="message-value">
        {{ others.version }}
      </dd>
    </dl>
    <dl class="message-item">
      <dt class="message-key">
        {{ $t('detail.message.headers.nonce') }}
      </dt>
      <dd class="message-value">
        {{ others.nonce }}
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
        {{ others.gasFeeCap | filecoin }}
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
        {{ others.gasPremium | filecoin }}
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
        {{ (others.gasLimit || 0) | locale }}
      </dd>
    </dl>
    <dl v-if="others.receipt" class="message-item">
      <dt class="message-key">
        <div class="flex items-center justify-start">
          {{ $t('detail.message.headers.gasUsed') }}
          <Tip class="mx-1" :content="$t('detail.message.tips.gasUsed')" />
          :
        </div>
      </dt>
      <dd class="message-value">
        {{ others.receipt.gasUsed | locale }}
      </dd>
    </dl>
    <dl v-if="others.baseFee" class="message-item">
      <dt class="message-key">
        <div class="flex items-center justify-start">
          Base Fee
          <Tip class="mx-1" :content="$t('detail.message.tips.baseFee')" />
          :
        </div>
      </dt>
      <dd class="message-value">
        {{ others.baseFee | filecoin }}
      </dd>
    </dl>
    <dl v-if="others.baseFeeBurn" class="message-item">
      <dt class="message-key">
        <div class="flex items-center justify-start">
          Base Fee Burn
          <Tip class="mx-1" :content="$t('detail.message.tips.baseFeeBurn')" />
          :
        </div>
      </dt>
      <dd class="message-value">
        {{ others.baseFeeBurn | filecoin }}
      </dd>
    </dl>
    <dl v-if="others.overEstimationBurn" class="message-item">
      <dt class="message-key">
        <div class="flex items-center justify-start">
          Over Estimation Burn
          <Tip class="mx-1" :content="$t('detail.message.tips.overEstimationBurn')" />
          :
        </div>
      </dt>
      <dd class="message-value">
        {{ others.overEstimationBurn | filecoin }}
      </dd>
    </dl>
    <dl v-if="others.minerTip" class="message-item">
      <dt class="message-key">
        <div class="flex items-center justify-start">
          Miner Tip
          <Tip class="mx-1" :content="$t('detail.message.tips.minerTip')" />
          :
        </div>
      </dt>
      <dd class="message-value">
        {{ others.minerTip | filecoin }}
      </dd>
    </dl>
    <dl v-if="others.penalty" class="message-item">
      <dt class="message-key">
        <div class="flex items-center justify-start">
          Miner Penalty
          <Tip class="mx-1" :content="$t('detail.message.tips.minerPenalty')" />
          :
        </div>
      </dt>
      <dd class="message-value">
        {{ others.penalty | filecoin }}
      </dd>
    </dl>
    <dl v-if="others.error" class="message-item">
      <dt class="message-key">
        {{ $t('detail.message.headers.error') }}
      </dt>
      <dd class="message-value">
        {{ others.error }}
      </dd>
    </dl>
    <dl class="flex items-start message-item">
      <dt class="message-key">
        {{ $t('detail.message.headers.params') }}
      </dt>
      <dd v-if="others.decodedParams" class="message-value flex-1 text-xs break-all">
        <pre class="whitespace-pre-wrap">{{ JSON.stringify(others.decodedParams, null, 2) }}</pre>
      </dd>
      <dd v-else class="message-value flex-1 break-all">
        {{ others.params || $t('detail.message.null') }}
      </dd>
    </dl>
    <dl v-if="others.receipt && others.receipt.exitCode === 0" class="flex items-start message-item">
      <dt class="message-key">
        {{ $t('detail.message.headers.return') }}
      </dt>
      <dd v-if="others.decodedReturnValue" class="message-value flex-1 text-xs break-all">
        <pre class="whitespace-pre-wrap">{{ JSON.stringify(others.decodedReturnValue, null, 2) }}</pre>
      </dd>
      <dd v-else class="message-value flex-1 break-all">
        {{ others.receipt.return || $t('detail.message.null') }}
      </dd>
    </dl>
  </div>
</template>

<script>
import { HOST } from '~/filecoin/filecoin.config'

export default {
  props: {
    message: { type: Object, default: () => ({}) }
  },

  data() {
    return { HOST, others: {}, loading: false }
  },

  async mounted() {
    this.loading = true
    this.others = await this.$axios.$get(`/message/${this.message.cid}/others`)
    this.loading = false
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
        @apply pl-4 w-36 break-all;
      }
      & .message-value {
        @apply mr-4 break-all;
      }
    }
  }
</style>
