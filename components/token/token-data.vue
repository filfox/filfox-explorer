<template>
  <div class="bg-white md:rounded-md">
    <section class="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-8 py-2 md:py-4 border-b md:border-b-2 border-background">
      <el-row>
        <el-button
          v-for="item in tabs"
          :key="item"
          size="mini"
          round
          v-bind="tab == item ? { type: 'primary', plain: true, class: ['pointer-events-none'] } : {}"
          @click="e => didTabSwitched(e, item)"
        >
          <span class="flex">
            {{ $t(`detail.token.data.${item}.title`) }} <img v-if="item == 'contract' && token.verified" src="@/assets/img/contract/ok.svg" class="w-3 h-3 ml-1">
          </span>
        </el-button>
      </el-row>
      <span v-if="/tx|holder/.test(tab)" class="text-xs text-main flex items-center mt-2.5 md:mt-0">
        <img
          src="@/assets/img/token/pie.svg"
          class="w-3 h-3 mr-1"
        />
        {{ $t(`detail.token.data.${tab == 'tx' ? 'totalOfTxs':'totalOfHolders'}`, { amount: totalCount }) }}
      </span>
    </section>
    <TokenDataTx v-if="tab == tabs[0]" @setTotalCount="val => totalCount = val" />
    <TokenDataInfo v-if="tab == tabs[1]" :token="token" @setTotalCount="val => totalCount = val" />
    <TokenDataHolder v-if="tab == tabs[2]" :token="token" />
    <TokenDataContract v-if="tab == tabs[3]" />
  </div>
</template>

<script>
export default {
  props: {
    token: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      tab: 'tx',
      tabs: ['tx', 'holder', 'info', 'contract'],
      totalCount: 0
    }
  },

  methods: {
    didTabSwitched(e, tab) {
      this.tab = tab
      let node = e.target

      while (true) {
        if (node?.tagName?.toLowerCase() === 'button') {
          node.blur()
          break
        } else {
          node = node.parentElement
        }
      }
    }
  }
}
</script>
