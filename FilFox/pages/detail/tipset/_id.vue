<template>
  <div class="container mx-auto flex flex-col">
    <div class="flex flex-grow-0 mt-6 font-medium"> {{ $t('detail.tipset.title') }} #{{ height }} </div>
    <div class="flex flex-col flex-grow rounded-md my-4 bg-white">
      <div class="flex flex-col border-b border-background mt-2 pb-2">
          <dl class="flex flex-row my-2 items-center">
           <dt class="min-w-1/8 pl-8 text-gray-600 px-2"> {{ $t('detail.tipset.headers.time') }} </dt>
           <dd class="flex mr-4">  {{ tipset.timestamp | timestamp }} </dd>
          </dl>

          <dl class="flex flex-row my-2 items-center">
           <dt class="min-w-1/8 pl-8 text-gray-600 px-2"> {{ $t('detail.tipset.headers.size') }} </dt>
           <dd class="flex mr-4">  {{ tipset.blockSize }} bytes </dd>
          </dl>
      </div>
      <p class="text-base my-4 ml-8"> {{$t('detail.tipset.all')}} </p>
      <div class="bg-background mx-8 mb-4 rounded-md flex flex-col py-2" v-for="(block, index) in tipset.blocks" :key="block.hash">
        <dl class="flex flex-row my-1 items-center">
           <dt class="min-w-1/8 pl-8 text-gray-600 px-2"> {{ $t('detail.tipset.headers.id') }} </dt>
           <dd class="flex mr-4"> 
             <BlockLink :id="block.cid" />
           </dd>
        </dl>
         <dl class="flex flex-row my-1 items-center">
           <dt class="min-w-1/8 pl-8 text-gray-600 px-2"> {{ $t('detail.tipset.headers.miner') }} </dt>
           <dd class="flex mr-4 text-main">  
             <AddressLink :id="block.miner" />
           </dd>
        </dl>
        <dl class="flex flex-row my-1 items-center">
           <dt class="min-w-1/8 pl-8 text-gray-600 px-2"> {{ $t('detail.tipset.headers.bonus') }} </dt>
           <dd class="flex mr-4">  {{ block.reward | filecoin }} </dd>
        </dl>
        <dl class="flex flex-row my-1 items-center">
           <dt class="min-w-1/8 pl-8 text-gray-600 px-2"> {{ $t('detail.tipset.headers.messageCount') }} </dt>
           <dd class="flex mr-4">  {{ block.messageCount }} </dd>
        </dl>    
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
      title: `Tipset ${this.height}`
    }
  }
}
</script>