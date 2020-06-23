<template>
  <div class="container mx-auto flex flex-col">
      <NormalAddressDetail :addressData="addressData" v-if="addressData.actor === 'fil/1/account'"/>
      <MinerAddressDetail v-else :addressData="addressData"/>
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