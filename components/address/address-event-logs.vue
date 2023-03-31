<template>
  <div v-loading="loading" class="w-full text-xs px-4 lg:px-10 lg:text-sm">
    <div v-for="item, index in eventLogs" :key="index" class="border-customGray-250 border-b py-3">
      <dl class="message-item">
        <dt class="message-key w-16">
          {{ $t('detail.message.headers.address') }}
        </dt>
        <dd class="message-value">
          <AddressLink :id="item.address" class="text-main" />
        </dd>
      </dl>
      <dl v-if="item.name" class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.name') }}
        </dt>
        <dd class="message-value">
          {{ item.name }}
        </dd>
      </dl>
      <dl class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.topics') }}
        </dt>
        <dd class="flex flex-col">
          <div v-for="topic, _index in item.topics" :key="_index" class="flex items-center mb-2 break-all">
            <div class="w-6 h-6 mr-2 flex items-center justify-center bg-gray-100 rounded-md text-gray-500">
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
          {{ $t('detail.message.headers.logIndex') }}
        </dt>
        <dd class="message-value">
          {{ item.logIndex }}
        </dd>
      </dl>
      <dl class="message-item">
        <dt class="message-key">
          {{ $t('detail.message.headers.removed') }}
        </dt>
        <dd class="message-value">
          {{ item.removed }}
        </dd>
      </dl>
    </div>
    <div class="flex items-center text-center h-16">
      <el-pagination
        layout="prev, pager, next, jumper"
        :page-count="totalCount"
        :current-page="page + 1"
        class="mx-auto"
        @current-change="p => page = p - 1"
      />
    </div>
  </div>
</template>
<script>

export default {
  props: {
    address: { type: String, required: true }
  },

  data() {
    return {
      loading: false,
      page: 0,
      pageSize: 10,
      totalCount: 0,
      eventLogs: []
    }
  },

  watch: {
    page() {
      this.getEventLogs()
    }
  },

  mounted() {
    this.getEventLogs()
  },

  methods: {
    async getEventLogs() {
      try {
        this.loading = true
        const { eventLogs, totalCount } = await this.$axios.$get(`/address/${this.address}/events`,
          { params: { page: this.page, pageSize: this.pageSize } })
        this.eventLogs = eventLogs
        this.totalCount = totalCount
      } catch (error) {
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
  .message-item {
    @apply flex items-center my-2;
    & .message-key {
      @apply w-56 flex-shrink-0 pr-2 text-gray-600;
    }
    & .message-value {
      @apply flex items-center;
    }
  }


  @media (max-width: 500px) {
    .message-item {
      & .message-key {
        @apply w-24 break-all;
      }
      & .message-value {
      @apply break-all;
    }
    }
  }
</style>
