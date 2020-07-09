<template>
  <div class="flex">
    <div class="flex flex-grow flex-col bg-white lg:hidden">
      <div class="flex flex-grow-0 font-medium text-sm pl-4 py-3 border-b border-background"> {{ $t('detail.peer.title') }} </div>
       
       <div class="flex flex-row justify-between items-center text-xs mx-4 mt-2">
          <p class="flex w-1/4">{{ $t('detail.peer.headers.id') }}</p>
          <PeerLink :id="id" plain  class="flex w-3/4"/>
       </div>

       <div class="flex flex-row justify-between items-center text-xs mx-4 mt-2">
          <p class="flex w-1/4">{{ $t('detail.peer.headers.miners') }}</p>
          <p v-if="peer.miners.length" class="flex flex-wrap w-3/4">
                <AddressLink v-for="miner in peer.miners" :id="miner" :key="miner" class="mr-4 text-main" />
          </p>
          <p v-else class="flex w-3/4">Empty</p>
       </div>

       <div class="flex flex-row justify-between items-center text-xs mx-4 mt-2">
          <p class="flex w-1/4">{{ $t('detail.peer.headers.IP') }}</p>
          <div v-if="peer.addresses.length" class="flex w-3/4 flex-col">
                <p v-for="address in peer.addresses" :key="address" class="flex pb-1">{{ address | ip }}</p>
          </div>
          <p v-else class="flex w-3/4">{{ $t('shared.empty') }}</p>
       </div>
        
    </div>

    <div class="container mx-auto hidden lg:flex flex-col">
      <div class="flex flex-grow-0 mt-6 font-medium">{{ $t('detail.peer.title') }} </div>
      <div class="flex flex-col rounded-md my-4 bg-white py-4">
          <dl class="flex flex-row my-2 items-center">
            <dt class="w-1/8 pl-8 text-gray-600 px-2">{{ $t('detail.peer.headers.id') }}</dt>
            <dd class="flex mr-4">
              <PeerLink :id="id" plain />
            </dd>
          </dl>

          <dl class="flex flex-row my-2 items-center">
            <dt class="w-1/8 pl-8 text-gray-600 px-2">{{ $t('detail.peer.headers.miners') }}</dt>
            <dd class="flex mr-4">
              <p v-if="peer.miners.length" class="flex flex-wrap">
                <AddressLink v-for="miner in peer.miners" :id="miner" :key="miner" class="mr-4 text-main" />
              </p>
              <template v-else>Empty</template>
            </dd>
          </dl>

          <dl class="flex flex-row my-2 items-center">
            <dt class="w-1/8 pl-8 text-gray-600 px-2">{{ $t('detail.peer.headers.IP') }}</dt>
            <dd class="flex mr-4">
              <template v-if="peer.addresses.length">
                <p v-for="address in peer.addresses" :key="address">{{ address | ip }}</p>
              </template>
              <template v-else>{{ $t('shared.empty') }}</template>
            </dd>
          </dl>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  filters: {
    ip(address) {
      const matchResult = address.match(/^\/ip4\/((?:\d|\.)+)\/tcp\/\d+$/);
      return matchResult ? matchResult[1] : address;
    }
  },
  async asyncData({ $axios, params, error }) {
    const id = params.id;
    try {
      const peer = await $axios.$get(`/peer/${id}`);
      return { peer };
    } catch (err) {
      if (err?.response) {
        if (err.response.code === 404) {
          error({ code: 404, message: `Peer ${id} not found` });
        } else {
          error({
            code: err.response.status,
            message: err.response.statusText
          });
        }
      } else {
        error({ code: 500, message: err.toString() });
      }
    }
  },
  data() {
    return {
      peer: {}
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  head() {
    return {
      title: `Peer ${this.id}`
    };
  }
};
</script>