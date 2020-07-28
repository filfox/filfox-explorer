<template>
  <div class="container mx-auto">
    <div class="mt-6 font-medium">
      {{ $t('detail.message.title') }}
    </div>
    <div class="rounded-md my-4 pt-4 bg-white">
      <dl class="message-item">
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
        <dd class="flex flex-col mr-4">
          <p v-for="block in message.blocks" :key="block" class="items-center flex text-main">
            <BlockLink :id="block" />
          </p>
        </dd>
      </dl>

      <dl class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.version') }}
        </dt>
        <dd class="message-value">
          {{ message.version }}
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
          {{ $t('detail.message.headers.nonce') }}
        </dt>
        <dd class="message-value">
          {{ message.nonce }}
        </dd>
      </dl>

      <dl class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.method') }}
        </dt>
        <dd class="message-value">
          {{ message.method }}
        </dd>
      </dl>

      <dl class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.value') }}
        </dt>
        <dd class="message-value">
          {{ message.value | filecoin(4) }}
        </dd>
      </dl>

      <dl class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.gasPrice') }}
        </dt>
        <dd class="message-value">
          {{ message.gasPrice | filecoin() }}
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

      <template v-if="message.receipt">
        <dl class="message-item">
          <dt class="message-key">
            {{ $t('detail.message.headers.gasUsed') }}
          </dt>
          <dd class="message-value">
            {{ message.receipt.gasUsed | locale }}
          </dd>
        </dl>

        <dl class="message-item">
          <dt class="message-key">
            {{ $t('detail.message.headers.exitCode') }}
          </dt>
          <dd class="message-value">
            {{ message.receipt.exitCode | exit-code }}
          </dd>
        </dl>

        <dl v-if="message.receipt.exitCode === 0" class="message-item">
          <dt class="message-key">
            {{ $t('detail.message.headers.return') }}
          </dt>
          <dd class="message-value">
            {{ message.receipt.return ? message.receipt.return : $t('detail.message.null') }}
          </dd>
        </dl>
        <dl v-else class="message-item">
          <dt class="message-key">
            {{ $t('detail.message.headers.error') }}
          </dt>
          <dd class="message-value">
            {{ message.error }}
          </dd>
        </dl>

        <dl class="flex items-start my-2">
          <dt class="message-key">
            {{ $t('detail.message.headers.params') }}
          </dt>
          <dd class="message-value flex-1 break-all">
            {{ message.params ? message.params : $t('detail.message.null') }}
          </dd>
        </dl>
      </template>
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
    @apply flex items-center my-2;
  }
  .message-key {
    @apply w-1/8 pl-8 pr-2 text-gray-600;
  }
  .message-value {
    @apply mr-8;
  }
</style>
