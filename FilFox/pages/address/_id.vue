<template>
  <div class="container mx-auto flex flex-col">
      <template v-if="addressData.actor === 'fil/1/storageminer'"> 
          <MinerAddressDetail :addressData="addressData" class="hidden lg:flex"/>
          <MinerAddressDetailMobile :addressData="addressData" class="flex lg:hidden"/>
      </template>
      <template v-else>
          <NormalAddressDetail :addressData="addressData" />
      </template>
  </div>
</template>

<script>
export default {
    async asyncData({ $axios, params, query, error }) {
    const id = params.id;
    try {
      const addressData = await $axios.$get(`/address/${id}`, { params: query });
      return { addressData };
    } catch (err) {
      if (err?.response) {
        if (err.response.code === 404) {
          error({ code: 404, message: `Address ${id} not found` });
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
      addressData: {}
    }
  }
}
</script>