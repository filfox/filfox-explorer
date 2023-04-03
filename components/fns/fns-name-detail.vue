<template>
  <div v-loading="loading" class="bg-white p-4 rounded-none lg:rounded-md my-8">
    <div>
      <h1 class="font-semibold">
        {{ $t('fns.address.overview') }}
      </h1>
      <div class="bg-card p-4 my-4 rounded-md text-sm">
        <div class="flex items-center flex-wrap">
          <div class="w-48 text-gray-700">
            {{ $t('fns.name.resolvedAddress') }}
          </div>
          <div>
            {{ detail.resolveAddress }}
          </div>
        </div>
        <div class="flex items-center mt-4">
          <div class="w-48 text-gray-700">
            {{ $t('fns.name.expiration') }}
          </div>
          <div>
            {{ detail.expiration | timestamp }}
          </div>
        </div>
        <div class="flex items-center mt-4 flex-wrap">
          <div class="w-48 text-gray-700">
            {{ $t('fns.name.registrant') }}
          </div>
          <AddressLink :id="detail.registrant" :format="18" class="text-main" />
        </div>
        <div class="flex items-center mt-4 flex-wrap">
          <div class="w-48 text-gray-700">
            {{ $t('fns.name.controller') }}
          </div>
          <AddressLink :id="detail.controller" :format="18" class="text-main" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    detail: {
      type: Object,
      default: () => ({
        name: '',
        controller: '',
        registrant: '',
        expiration: '',
        resolveAddress: ''
      })
    }
  }
}
</script>
