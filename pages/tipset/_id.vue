<template>
  <div class="flex">
    <div class="flex flex-col bg-background flex-grow lg:hidden">
      <div class="pl-4 border-b border-background bg-white">
        <div class="text-sm font-medium mt-2"> {{ $t('detail.tipset.title') }} </div>
        <div class="text-xs my-1"> #{{ height }} </div>
      </div>
      <div class="px-4 bg-white flex flex-row justify-between pt-2">
        <p class="text-gray-600 text-xs"> {{ $t('detail.tipset.headers.time') }} </p>
        <p class="text-xs"> {{ tipset.timestamp | timestamp }} </p>
      </div>
      <div class="px-4 bg-white flex flex-row justify-between pt-1">
        <p class="text-gray-600 text-xs"> {{ $t('detail.tipset.headers.totalMsgCount') }} </p>
        <p class="text-xs"> {{ tipset.messageCount }} </p>
      </div>
      <div class="px-4 bg-white flex flex-row justify-between pt-1 pb-2">
        <p class="text-gray-600 text-xs"> {{ $t('detail.tipset.headers.size') }} </p>
        <p class="text-xs"> {{ tipset.blockSize }} bytes </p>
      </div>

      <div class="mt-2 bg-white flex flex-grow flex-col">
        <p class="pl-4 text-sm font-medium py-2 border-b border-background mb-2"> {{$t('detail.tipset.all')}} </p>
        <div v-for="(block, index) in tipset.blocks" :key="index" class="rounded-sm mx-2 mb-2 shadow bg-white">
          <div class="flex flex-row justify-between mt-2 mx-2 pt-2">
            <p class="text-xs w-1/3"> {{ $t('detail.tipset.headers.id') }} </p>
            <BlockLink :id="block.cid" class="text-xs text-right" />
          </div>
          <div class="flex flex-row justify-between mt-2 mx-2">
            <p class="text-xs w-1/3"> {{ $t('detail.tipset.headers.miner') }} </p>
            <div class="flex flex-row-reverse items-center">
              <div v-if="block.minerTag" class="flex ml-1 text-xs rounded-full px-2 border text-gray-500 bg-background"> {{ block.minerTag[$i18n.locale] }} </div>
              <AddressLink :id="block.miner" class="text-xs text-main" />
            </div>
          </div>
          <div class="flex flex-row justify-between mt-2 mx-2">
            <p class="text-xs w-1/3"> {{ $t('detail.tipset.headers.bonus') }} </p>
            <p class="text-xs"> {{ block.reward | filecoin }} </p>
          </div>
          <div class="flex flex-row justify-between mt-2 mx-2 pb-2">
            <p class="text-xs w-1/3"> {{ $t('detail.tipset.headers.messageCount') }} </p>
            <p class="text-xs"> {{ block.messageCount }} </p>
          </div>
        </div>
      </div>

    </div>

    <div class="hidden container mx-auto lg:flex flex-col">
      <div class="flex flex-grow-0 mt-6 font-medium"> {{ $t('detail.tipset.title') }} #{{ height }} </div>
      <div class="flex flex-col flex-grow rounded-md my-4 bg-white">
        <div class="flex flex-col border-b border-background mt-2 pb-2">
            <dl class="flex flex-row my-2 items-center">
            <dt class="w-9/50 pl-8 text-gray-600 px-2"> {{ $t('detail.tipset.headers.time') }} </dt>
            <dd class="flex mr-4">  {{ tipset.timestamp | timestamp }} </dd>
            </dl>

            <dl class="flex flex-row my-2 items-center">
            <dt class="w-9/50 pl-8 text-gray-600 px-2"> {{ $t('detail.tipset.headers.totalMsgCount') }} </dt>
            <dd class="flex mr-4">  {{ tipset.messageCount }} </dd>
            </dl>

            <dl class="flex flex-row my-2 items-center">
            <dt class="w-9/50 pl-8 text-gray-600 px-2"> {{ $t('detail.tipset.headers.size') }} </dt>
            <dd class="flex mr-4">  {{ tipset.blockSize }} bytes </dd>
            </dl>
        </div>
        <p class="text-base my-4 ml-8"> {{$t('detail.tipset.all')}} </p>
        <div class="bg-background mx-8 mb-4 rounded-md flex flex-col py-2" v-for="(block, index) in tipset.blocks" :key="index">
          <dl class="flex flex-row my-1 items-center">
            <dt class="w-1/8 pl-8 text-gray-600 px-2"> {{ $t('detail.tipset.headers.id') }} </dt>
            <dd class="flex mr-4 text-main"> 
              <BlockLink :id="block.cid" />
            </dd>
          </dl>
          <dl class="flex flex-row my-1 items-center">
            <dt class="w-1/8 pl-8 text-gray-600 px-2"> {{ $t('detail.tipset.headers.miner') }} </dt>
            <dd class="flex mr-4">  
              <AddressLink :id="block.miner" class="text-main" />
              <MinerTag :tag="block.minerTag" :type="1" v-if="block.minerTag"/>
            </dd>
          </dl>
          <dl class="flex flex-row my-1 items-center">
            <dt class="w-1/8 pl-8 text-gray-600 px-2"> {{ $t('detail.tipset.headers.bonus') }} </dt>
            <dd class="flex mr-4">  {{ block.reward | filecoin }} </dd>
          </dl>
          <dl class="flex flex-row my-1 items-center">
            <dt class="w-1/8 pl-8 text-gray-600 px-2"> {{ $t('detail.tipset.headers.messageCount') }} </dt>
            <dd class="flex mr-4">  {{ block.messageCount }} </dd>
          </dl>    
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  async asyncData({$axios, error, params}) {
    try {
      const [tipset] = await Promise.all([
        $axios.$get(`/tipset/${params.id}`),
      ])
      return {tipset}
    } catch (err) {
      if (err?.response) {
        if (err.response.code === 404) {
          error({code: 404, message: `Tipset ${params.id} not found`})
        } else {
          error({code: err.response.status, message: err.response.statusText})
        }
      } else {
        error({code: 500, message: err.toString()})
      }
    }
  },
  data() {
    return {
      tipset: {},
      adjacentTipsets: []
    }
  },
  computed: {
    height() {
      return Number(this.$route.params.id)
    }
  },
  head() {
    return {
      title: `${this.$t('meta.titles.tipset')} ${this.height}`
    }
  }
}
</script>