<template>
  <div v-loading="loading" class="min-h-60 py-4 bg-white">
    <div class="overflow-y-auto">
      <div
        v-for="item, index in eventLogs"
        :key="index"
        :class="{ 'border-t': index }"
        class="border-background py-1 pr-4"
      >
        <dl class="message-item">
          <dt class="message-key">
            {{ $t('detail.message.headers.address') }}
          </dt>
          <dd class="message-value">
            <AddressLink :id="item.address" class="text-main" />
          </dd>
        </dl>
        <dl v-if="item.name" class="message-item">
          <dt class="message-key">
            Name
          </dt>
          <dd class="message-value">
            {{ item.name.replace(/,/ig, ', ') }}
          </dd>
        </dl>
        <dl class="message-item">
          <dt class="message-key">
            {{ $t('detail.message.headers.topics') }}
          </dt>
          <dd class="flex flex-col text-xs font-mono">
            <div
              v-for="topic, _index in item.topics"
              :key="_index"
              class="flex items-center break-all"
              :class="{ 'my-1': (_index > 0) && (_index < item.topics.length - 1) }"
            >
              <div class="w-5 h-5 mr-2 flex items-center justify-center bg-gray-100 rounded-sm text-gray-500">
                {{ _index }}
              </div>
              {{ topic }}
            </div>
          </dd>
        </dl>
        <dl class="message-item">
          <dt class="message-key">
            {{ $t('detail.message.headers.data') }}
          </dt>
          <dd class="w-full py-2 bg-gray-100 break-all px-2 text-xs flex items-center">
            <pre class="whitespace-pre-wrap flex-1"><span>{{ item.data }}</span></pre>
          </dd>
        </dl>
        <dl class="message-item">
          <dt class="message-key">
            Log Index
          </dt>
          <dd class="message-value">
            {{ item.logIndex }}
          </dd>
        </dl>
        <dl class="message-item">
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
  },

  data() {
    return { eventLogs: [], loading: false }
  },

  async mounted() {
    this.loading = true
    this.eventLogs = await this.$axios.$get(`/message/${this.message.cid}/events`)
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
        @apply pl-4 w-24 break-all;
      }
      & .message-value {
        @apply mr-4 break-all;
      }
    }
  }
</style>
