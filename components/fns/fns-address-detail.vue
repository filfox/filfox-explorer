<template>
  <div v-loading="loading" class="bg-white p-4 rounded-md my-8">
    <div>
      <h1 class="font-semibold">
        {{ $t('fns.address.overview') }}
      </h1>
      <div class="bg-card p-4 my-4 rounded-md text-sm">
        <div class="flex items-center">
          <div class="w-64 text-gray-700">
            {{ $t('fns.address.reverseRecord') }}
          </div>
          <NuxtLink :to="localePath(`/fns/name/${detail.reverseRecord}`)" class="text-main cursor-pointer">
            {{ detail.reverseRecord }}
          </NuxtLink>
        </div>
        <div class="flex items-center mt-4">
          <div class="w-64 text-gray-700">
            {{ $t('fns.address.registrant') }}
          </div>
          <AddressLink :id="detail.address" class="flex break-all text-main" />
        </div>
      </div>
    </div>
    <div>
      <h1 class="font-semibold">
        {{ $t('fns.address.names') }}
      </h1>
      <table class="w-full my-4 text-sm">
        <thead class="text-gray-600 m-2">
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
            v-for="(item, index) in detail.names"
            :key="index"
            class="h-12 border-b border-background hover:bg-cardHighlight"
          >
            <td>
              <NuxtLink :to="localePath(`/fns/name/${item.name}`)" class="text-main cursor-pointer">
                {{ item.name }}
              </NuxtLink>
            </td>
            <td>
              {{ item.expiration | timestamp }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h1 class="font-semibold">
        {{ $t('fns.address.realatedTransactions') }}
      </h1>
      <table class="w-full my-4 text-sm">
        <thead class="text-gray-600 m-2">
          <tr class="h-12 bg-card">
            <th class="sticky top-0 z-10">
              {{ $t('fns.address.block') }}
            </th>
            <th class="sticky top-0 z-10">
              {{ $t('fns.address.actions') }}
            </th>
            <th class="sticky top-0 z-10">
              {{ $t('fns.address.txHash') }}
            </th>
          </tr>
        </thead>
        <tbody class="text-center bg-card">
          <tr
            v-for="(item, index) in detail.transactions"
            :key="index"
            class="h-12 border-b border-background hover:bg-cardHighlight"
          >
            <td>
              <TipsetLink :id="item.blockNumber" class="text-main" />
            </td>
            <td>
              {{ item.type }}
            </td>
            <td class="hidden md:table-cell">
              <MessageLink :id="item.transactionHash" :format="10" />
            </td>
            <td class="md:hidden">
              <MessageLink :id="item.transactionHash" :format="5" />
            </td>
          </tr>
        </tbody>
      </table>
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
        reverseRecord: '',
        address: '',
        names: [],
        transactions: []
      })
    }
  }
}
</script>
