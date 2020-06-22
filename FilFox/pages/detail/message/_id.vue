<template>
  <div class="container mx-auto flex flex-col">
      <div class="flex flex-grow-0 mt-6 font-medium"> {{ $t('detail.message.title') }} </div>
      <div class="flex flex-col flex-grow rounded-md my-4 bg-white">
        <dl class="flex flex-row my-4 items-center">
          <dt class="min-w-1/8 pl-8 text-gray-600"> {{ $t('detail.message.headers.cid') }} </dt>
          <dd class="flex mr-4">  <BlockLink :id="id" plain /> </dd>
        </dl>

        <dl class="flex flex-row my-4 items-center">
          <dt class="min-w-1/8 pl-8 text-gray-600"> {{ $t('detail.message.headers.height') }} </dt>
          <dd class="flex mr-4">  <TipsetLink :id="message.height" class=" text-main" /> </dd>
        </dl>

        <dl class="flex flex-row my-4 items-center">
          <dt class="min-w-1/8 pl-8 text-gray-600"> {{ $t('detail.message.headers.time') }} </dt>
          <dd class="flex mr-4">  {{ message.timestamp | timestamp }} </dd>
        </dl>

        <dl class="flex flex-row items-center my-4">
          <dt class="min-w-1/8 pl-8 text-gray-600 items-center"> {{ $t('detail.message.headers.inBlocks') }} </dt>
          <dd class="flex flex-col mr-4">  
            <p v-for="block in message.blocks" :key="block" class="items-center flex text-main">
              <BlockLink :id="block" />
            </p>
          </dd>
        </dl>

        <dl class="flex flex-row my-4 items-center">
          <dt class="min-w-1/8 pl-8 text-gray-600"> {{ $t('detail.message.headers.version') }} </dt>
          <dd class="flex mr-4">  {{ message.version }} </dd>
        </dl>

        <dl class="flex flex-row my-4 items-center">
          <dt class="min-w-1/8 pl-8 text-gray-600"> {{ $t('detail.message.headers.from') }} </dt>
          <dd class="flex mr-4"> 
            <AddressLink :id="message.from" class="text-main"/> 
          </dd>
        </dl>

        <dl class="flex flex-row my-4 items-center">
          <dt class="min-w-1/8 pl-8 text-gray-600"> {{ $t('detail.message.headers.to') }} </dt>
          <dd class="flex mr-4">  
            <AddressLink :id="message.to" class="text-main"/> 
          </dd>
        </dl>

        <dl class="flex flex-row my-4 items-center">
          <dt class="min-w-1/8 pl-8 text-gray-600"> {{ $t('detail.message.headers.nonce') }} </dt>
          <dd class="flex mr-4">  {{ message.nonce }} </dd>
        </dl>

        <dl class="flex flex-row my-4 items-center">
          <dt class="min-w-1/8 pl-8 text-gray-600"> {{ $t('detail.message.headers.method') }} </dt>
          <dd class="flex mr-4">  {{ message.method }} </dd>
        </dl>

        <dl class="flex flex-row items-center my-4">
          <dt class="min-w-1/8 pl-8 text-gray-600"> {{ $t('detail.message.headers.params') }} </dt>
          <dd class="flex break-all mr-4">  {{ message.params }} </dd>
        </dl>

        <dl class="flex flex-row my-4 items-center">
          <dt class="min-w-1/8 pl-8 text-gray-600"> {{ $t('detail.message.headers.value') }} </dt>
          <dd class="flex mr-4">  {{ message.value | filecoin() }} </dd>
        </dl>

        <dl class="flex flex-row my-4 items-center">
          <dt class="min-w-1/8 pl-8 text-gray-600"> {{ $t('detail.message.headers.gasPrice') }} </dt>
          <dd class="flex mr-4">  {{ message.gasPrice | filecoin() }} </dd>
        </dl>

        <dl class="flex flex-row my-4 items-center">
          <dt class="min-w-1/8 pl-8 text-gray-600"> {{ $t('detail.message.headers.gasLimit') }} </dt>
          <dd class="flex mr-4">  {{ message.gasLimit | locale }} </dd>
        </dl>

        <template v-if="message.receipt">
          <dl class="flex flex-row my-4 items-center">
            <dt class="min-w-1/8 pl-8 text-gray-600"> {{ $t('detail.message.headers.gasUsed') }} </dt>
            <dd class="flex mr-4">  {{ message.receipt.gasUsed | locale  }} </dd>
          </dl>

          <dl class="flex flex-row my-4 items-center">
            <dt class="min-w-1/8 pl-8 text-gray-600"> {{ $t('detail.message.headers.exitCode') }} </dt>
            <dd class="flex mr-4">  {{ message.receipt.exitCode | exit-code  }} </dd>
          </dl>

          <dl v-if="message.receipt.exitCode === 0" class="flex flex-row my-4 items-center">
            <dt class="min-w-1/8 pl-8 text-gray-600"> {{ $t('detail.message.headers.return') }} </dt>
            <dd class="flex mr-4">  {{ message.receipt.return }} </dd>
          </dl>

          <dl v-else class="flex flex-row my-4 items-center">
            <dt class="min-w-1/8 pl-8 text-gray-600"> {{ $t('detail.message.headers.error') }} </dt>
            <dd class="flex mr-4">  {{ message.error }} </dd>
          </dl>
        </template>
      
      </div>
  </div>
</template>

<script>
export default {
  async asyncData({$axios, params, query, error}) {
    const id = params.id
    try {
      const message = await $axios.$get(`/message/${id}`, {params: query})
      return {message}
    } catch (err) {
      if (err?.response) {
        if (err.response.code === 404) {
          error({code: 404, message: `Message ${id} not found`})
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
      message: {}
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  head() {
    return {
      title: `Message ${this.id}`
    }
  }
}
</script>