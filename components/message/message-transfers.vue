<template>
  <div class="bg-white">
    <div class="px-4 lg:px-8 pt-3 text-xs lg:text-sm text-gray-600">
      {{ $t('detail.message.transfer.filTransactions') }}
    </div>
    <div class="px-4 py-2">
      <table class="hidden lg:table w-full table-fixed">
        <thead class="text-gray-600 text-sm m-2">
          <tr class="h-8">
            <th class="sticky top-0 bg-white z-10 w-1/4 text-left pl-4">
              {{ $t('detail.message.transfer.from') }}
            </th>
            <th class="sticky top-0 bg-white z-10 w-1/8">
            </th>
            <th class="sticky top-0 bg-white z-10 w-1/4">
              {{ $t('detail.message.transfer.to') }}
            </th>
            <th class="sticky top-0 bg-white z-10 w-1/4">
              {{ $t('detail.message.transfer.value') }}
            </th>
            <th class="sticky top-0 bg-white z-10 w-1/8">
              {{ $t('detail.message.transfer.type') }}
            </th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr
            v-for="(transfer, index) in message.transfers"
            :key="index"
            :class="{ 'border-t': index }"
            class="h-11 border-background text-sm"
          >
            <td>
              <div class="flex items-center flex-row pl-4">
                <AddressLink v-if="transfer.from" :id="transfer.from" :format="8" />
                <span v-else>N/A</span>
                <AddressTag :tag="transfer.fromTag" type="pc" :style="{ maxWidth: '66%' }" />
              </div>
            </td>
            <td>
              <div class="flex justify-center">
                <img src="~/assets/img/shared/to.svg" alt="3" class="w-4">
              </div>
            </td>
            <td>
              <AddressLink v-if="transfer.to" :id="transfer.to" :format="8" />
              <span v-else>N/A</span>
              <span class="absolute inline-block" style="max-width: 66%">
                <AddressTag :tag="transfer.toTag" type="pc" />
              </span>
            </td>
            <td>
              {{ transfer.value | filecoin }}
            </td>
            <td>
              {{ $t('detail.transfer.types.' + transfer.type ) }}
            </td>
          </tr>
        </tbody>
      </table>
      <!-- mobile -->
      <ul class="lg:hidden">
        <li
          v-for="(transfer, index) in message.transfers"
          :key="index"
          :class="{ 'border-t': index }"
          class="py-2 text-xs leading-5"
        >
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('detail.message.transfer.from') }}</span>
            <AddressLink v-if="transfer.from" :id="transfer.from" :format="12" />
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('detail.message.transfer.to') }}</span>
            <AddressLink v-if="transfer.to" :id="transfer.to" :format="12" />
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('detail.message.transfer.value') }}</span>
            <span>{{ transfer.value | filecoin }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('detail.message.transfer.type') }}</span>
            <span>{{ $t('detail.transfer.types.' + transfer.type ) }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: { type: Object, required: true }
  }
}
</script>
