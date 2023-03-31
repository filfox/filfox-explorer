<template>
  <div class="rounded-md my-4 py-4 bg-white">
    <p class="pl-8 pb-3 border-b border-background">
      {{ $t('detail.message.modules.logs') }}
    </p>
    <div class="max-h-136 overflow-y-auto">
      <div v-for="item, index in message.eventLogs" :key="index" class="border-b border-background">
        <dl class="message-item pt-2">
          <dt class="message-key">
            {{ $t('detail.message.headers.address') }}
          </dt>
          <dd class="message-value">
            <AddressLink :id="item.address" class="text-main" />
          </dd>
        </dl>
        <dl v-if="item.name" class="message-item pt-2">
          <dt class="message-key">
            Name
          </dt>
          <dd class="message-value">
            {{ item.name }}
          </dd>
        </dl>
        <dl class="message-item pt-2">
          <dt class="message-key">
            {{ $t('detail.message.headers.topics') }}
          </dt>
          <dd class="flex flex-col">
            <div v-for="topic, _index in item.topics" :key="_index" class="flex items-center mb-2">
              <div class="w-6 h-6 mr-2 flex items-center justify-center bg-gray-100 rounded-md text-gray-500">
                {{ _index }}
              </div>
              {{ topic }}
            </div>
          </dd>
        </dl>
        <dl class="message-item pt-2">
          <dt class="message-key">
            {{ $t('detail.message.headers.data') }}
          </dt>
          <dd class="w-full py-2 bg-gray-100 break-all px-2 text-xs flex items-center">
            <pre class="whitespace-pre-wrap flex-1"><span>{{ item.data }}</span></pre>
          </dd>
        </dl>
        <dl class="message-item pt-2">
          <dt class="message-key">
            Log Index
          </dt>
          <dd class="message-value">
            {{ item.logIndex }}
          </dd>
        </dl>
        <dl class="message-item pt-2">
          <dt class="message-key">
            Removed
          </dt>
          <dd class="message-value">
            {{ item.removed }}
          </dd>
        </dl>
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
    @apply flex items-center my-2;
  }
  .message-key {
    @apply w-56 flex-shrink-0 pl-8 pr-2 text-gray-600;
  }
  .message-value {
    @apply mr-8 flex flex-row items-center;
  }
</style>
