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
    <component :is="tabComponent" :token="token" @setTotalCount="val => totalCount = val" />
  </div>
</template>

<script>
import Tx from '~/components/token/token-data-tx'
import Info from '~/components/token/token-data-info'
import Holder from '~/components/token/token-data-holder'
import Contract from '~/components/token/token-data-contract'

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

  computed: {
    tabComponent() {
      return {
        tx: Tx,
        info: Info,
        holder: Holder,
        contract: Contract
      }[this.tab]
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
