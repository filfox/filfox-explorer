<template>
  <div class="bg-white p-4 rounded-md my-8">
    <div>
      <h1 class="font-bold">
        {{ $t('fns.address.overview') }}
      </h1>
      <div class="bg-card p-4 my-4 rounded-md">
        <div class="flex items-center flex-wrap">
          <div class="w-48 text-gray-700">
            {{ $t('fns.name.resolvedAddress') }}
          </div>
          <div class="text-main">
            {{ detail.resolveAddress }}
          </div>
        </div>
        <div class="flex items-center mt-4">
          <div class="w-48 text-gray-700">
            {{ $t('fns.name.expiration') }}
          </div>
          <div class="text-main">
            {{ detail.expiration | timestamp }}
          </div>
        </div>
        <div class="flex items-center mt-4 flex-wrap">
          <div class="w-48 text-gray-700">
            {{ $t('fns.name.registrant') }}
          </div>
          <div class="text-main">
            {{ detail.registrant }}
          </div>
        </div>
        <div class="flex items-center mt-4 flex-wrap">
          <div class="w-48 text-gray-700">
            {{ $t('fns.name.controller') }}
          </div>
          <div class="text-main">
            {{ detail.controller }}
          </div>
        </div>
      </div>
    </div>
    <!-- <div>
      <h1 class="font-bold">
        {{ $t('fns.address.names') }}
      </h1>
      <table class="w-full text-sm my-4">
        <thead class="text-gray-600 text-sm m-2">
          <tr class="h-12 bg-card">
            <th class="sticky top-0 z-10">
              {{ $t('fns.address.names') }}
            </th>
            <th class="sticky top-0 z-10">
              {{ $t('fns.address.expirationDate') }}
            </th>
          </tr>
        </thead>
        <tbody class="text-center bg-card">
          <tr
            v-for="(item, index) in names"
            :key="index"
            class="h-12 border-b border-background hover:bg-cardHighlight"
          >
            <td>
              <a :href="'http://app.filns.domains/domain/' + item.name" target="_blank" class="text-main cursor-pointer">{{ item.name }}</a>
            </td>
            <td>
              {{ item.expiration | timestamp }}
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->
  </div>
</template>
<script>
export default {
  props: {
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
