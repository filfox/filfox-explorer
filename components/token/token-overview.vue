<template>
  <div class="bg-white md:rounded-md">
    <h1 class="px-4 md:px-8 py-2.5 md:py-4 font-medium border-b md:border-b-2 border-background">
      {{ $t('detail.token.overview.title') }}
    </h1>
    <div class="px-4 md:px-8 py-2">
      <dl v-for="(item, index) in overviewItems" :key="item" class="flex items-center justify-between md:justify-start my-2.5 md:my-3">
        <dt class="md:w-1/5 text-gray-600">
          {{ $t(`detail.token.overview.${item}`) }}
        </dt>
        <dd class="flex items-center">
          <span v-if="index == 0 && token.decimals">{{ tokenData[item] | parseToken(token.decimals) }}</span>
          <AddressLink v-else-if="index == 3" :id="tokenData[item]" class="hover:text-main" />
          <el-tag v-else-if="index == 4" size="mini" class="rounded-full" effect="dark">
            {{ tokenData[item] }}
          </el-tag>
          <span v-else>{{ tokenData[item] }}</span>
          <img
            v-if="index == 3"
            src="@/assets/img/token/copy.svg"
            class="w-4 h-4 ml-1 cursor-pointer"
            @click="didCopyContractAddrClicked"
          />
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard'

export default {
  props: {
    token: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      overviewItems: ['totalSupply', 'numberOfHolders', 'totalTransactionVolume', 'contractAddress', 'contractType']
    }
  },

  computed: {
    tokenData() {
      const td = {}
      td[this.overviewItems[0]] = this.token.totalSupply
      td[this.overviewItems[1]] = this.token.holderCount
      td[this.overviewItems[2]] = this.token.exchangeCount
      td[this.overviewItems[3]] = this.token.address
      td[this.overviewItems[4]] = this.token.type
      return td
    }
  },

  methods: {
    didCopyContractAddrClicked() {
      copy(this.token.address)
      this.$message.success(this.$t('shared.copySuccess'))
    }
  }
}
</script>
