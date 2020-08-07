<template>
  <div class="bg-white pb-2">
    <div class="font-medium text-sm pl-4 py-3 border-b border-background">
      {{ $t('detail.block.title') }}
    </div>

    <div class="mt-1"></div>

    <div class="block-item">
      <p class="w-1/4">
        {{ $t('detail.block.headers.cid') }}
      </p>
      <BlockLink :id="block.cid" class="w-3/4" />
    </div>

    <div class="block-item">
      <p class="w-1/4">
        {{ $t('detail.block.headers.height') }}
      </p>
      <TipsetLink :id="block.height" class="w-3/4 text-main" />
    </div>

    <div class="block-item">
      <p class="w-1/4">
        {{ $t('detail.block.headers.miner') }}
      </p>
      <div class="flex w-3/4 items-center">
        <AddressLink :id="block.miner" class="text-main" />
        <MinerTag v-if="block.minerTag" :tag="block.minerTag" :type="2" />
      </div>
    </div>

    <div class="block-item">
      <p class="w-1/4">
        {{ $t('detail.block.headers.time') }}
      </p>
      <p class="w-3/4">
        {{ block.timestamp | timestamp }}
      </p>
    </div>

    <div class="block-item">
      <p class="w-1/4">
        {{ $t('detail.block.headers.size') }}
      </p>
      <p class="w-3/4">
        {{ block.size }} Bytes
      </p>
    </div>

    <div class="block-item">
      <p class="w-1/4">
        {{ $t('detail.block.headers.messages') }}
      </p>
      <p class="w-3/4">
        {{ block.messageCount | locale }}
      </p>
    </div>

    <div class="block-item">
      <p class="w-1/4">
        {{ $t('detail.block.headers.reward') }}
      </p>
      <p class="w-3/4">
        {{ block.reward | filecoin }}
      </p>
    </div>
    <div class="block-item">
      <p class="w-1/4">
        {{ $t('detail.block.headers.winCount') }}
      </p>
      <p class="w-3/4">
        {{ block.winCount }}
      </p>
    </div>

    <div class="block-item">
      <p class="w-1/4">
        {{ $t('detail.block.headers.parents') }}
      </p>
      <div class="w-3/4 mb-1">
        <p v-for="parent in block.parents" :key="parent" class="text-main mt-1">
          <BlockLink :id="parent" />
        </p>
      </div>
    </div>

    <div class="block-item">
      <p class="w-1/4">
        {{ $t('detail.block.headers.parentWeight') }}
      </p>
      <p class="w-3/4">
        {{ block.timestamp | timestamp }}
      </p>
    </div>

    <div class="block-item">
      <p class="w-1/4">
        {{ $t('detail.block.headers.penalty') }}
      </p>
      <p class="w-3/4">
        {{ block.penalty | filecoin }}
      </p>
    </div>

    <div v-loading="loading" class="mt-4">
      <p class="pl-3 py-2 text-sm font-medium border-t border-background">
        {{ $t('blockchain.message.title') }}
      </p>

      <div class="flex items-center justify-between pb-1 mb-2">
        <p class="ml-4 h-8 items-center text-xs">
          {{ $t('blockchain.message.info.total') }} {{ messageList.totalCount }} {{ $t('blockchain.message.info.messages') }}
        </p>
        <el-select v-model="method" size="mini" class="mr-3">
          <el-option
            v-for="item in methodOptions"
            :key="item"
            :label="item == 'All' ? $t('blockchain.message.methods.all') : item"
            :value="item"
          />
        </el-select>
      </div>

      <div v-for="(message, index) in messageList.messages" :key="index" class="rounded-sm mx-3 mb-3 py-2 shadow bg-white">
        <div class="message-item">
          <p class="text-xs text-gray-800">
            {{ $t('blockchain.message.tableHeaders.id') }}:
          </p>
          <MessageLink :id="message.cid" :format="10" class="text-gray-800 text-xs" />
        </div>
        <div class="message-item">
          <p class="text-xs text-gray-800">
            {{ $t('blockchain.message.tableHeaders.from') }}:
          </p>
          <AddressLink :id="message.from" :format="12" class="text-main text-xs" />
        </div>
        <div class="message-item">
          <p class="text-xs text-gray-800">
            {{ $t('blockchain.message.tableHeaders.to') }}:
          </p>
          <AddressLink :id="message.to" :format="12" class="text-main text-xs" />
        </div>
        <div class="message-item">
          <p class="text-xs text-gray-800">
            {{ $t('blockchain.message.tableHeaders.method') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ message.method || 'N/A' }}
          </p>
        </div>
        <div class="message-item">
          <p class="text-xs text-gray-800">
            {{ $t('blockchain.message.tableHeaders.value') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ message.value | filecoin(4) }}
          </p>
        </div>
        <div class="message-item">
          <p class="text-xs text-gray-800">
            {{ $t('blockchain.message.tableHeaders.exitCode') }}:
          </p>
          <p v-if="message.receipt" class="text-xs text-gray-800">
            {{ message.receipt.exitCode | exit-code }}
          </p>
          <p v-else class="text-xs text-gray-800">
            N/A
          </p>
        </div>
      </div>
      <div class="flex items-center text-center h-16 bg-white">
        <el-pagination
          layout="prev, pager, next"
          :page-count="totalPageCount"
          :pager-count="5"
          :current-page="page + 1"
          class="mx-auto"
          @current-change="didCurrentPageChanged"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    block: { type: Object, required: true }
  },
  data() {
    return {
      messageList: {
        totalCount: 0,
        methods: []
      },
      page: 0,
      pageSize: 3,
      loading: false,
      method: 'All'
    }
  },
  computed: {
    totalPageCount() {
      return Math.ceil(this.messageList.totalCount / this.pageSize)
    },
    methodOptions() {
      return ['All', ...this.messageList.methods]
    }
  },
  watch: {
    method() {
      this.page = 0
      this.getMessagesList()
    }
  },
  mounted() {
    this.getMessagesList()
  },
  methods: {
    async getMessagesList() {
      this.loading = true
      const params = { pageSize: this.pageSize, page: this.page }
      if (this.method !== 'All') {
        params.method = this.method
      }
      this.messageList = await this.$axios.$get(`/block/${this.block.cid}/messages`, { params })
      this.loading = false
    },
    didCurrentPageChanged(currentPage) {
      this.page = currentPage - 1
      this.getMessagesList()
    }
  }
}
</script>

<style lang="postcss" scoped>
  .block-item {
    @apply flex justify-between items-center text-xs mx-4 my-1;
  }
  .message-item {
    @apply flex items-center justify-between mx-3 mt-1;
  }
</style>
