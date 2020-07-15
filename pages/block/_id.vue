<template>
  <div class="flex">
    <BlockDetail :block="block" class="hidden lg:flex"/>
    <BlockDetailMobile :block="block" class="lg:hidden"/>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params, query, error }) {
    const id = params.id;
    try {
      const block = await $axios.$get(`/block/${id}`, { params: query });
      return { block };
    } catch (err) {
      if (err?.response) {
        if (err.response.code === 404) {
          error({ code: 404, message: `Block ${id} not found` });
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
      block: {},
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  head() {
    return {
      title: `${this.$t('meta.titles.block')} ${this.id}`
    }
  }
};
</script>