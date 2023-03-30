<template>
  <div class="rounded-md my-4 py-4 bg-white mt-4">
    <p class="pl-8 pb-3 border-b border-background">
      {{ $t('detail.message.modules.transfer') }}
    </p>
    <div class="px-8">
      <table class="w-full table-fixed">
        <thead class="text-gray-600 text-sm m-2">
          <tr class="h-8">
            <th class="sticky top-0 bg-white z-10 w-1/4">
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
            class="h-12 border-b border-background text-sm"
          >
            <td>
              <div class="flex items-center flex-row justify-center">
                <AddressLink v-if="transfer.from" :id="transfer.from" :format="8" />
                <span v-else>N/A</span>
                <AddressTag :tag="transfer.fromTag" type="pc" :style="{maxWidth:'66%'}" />
              </div>
            </td>
            <td>
              <div class="flex justify-center">
                <img src="~/assets/img/shared/to.svg" alt="3" class="w-4">
              </div>
            </td>
            <td>
              <div class="flex items-center flex-row justify-center">
                <AddressLink v-if="transfer.to" :id="transfer.to" :format="8" />
                <span v-else>N/A</span>
                <AddressTag :tag="transfer.toTag" type="pc" :style="{maxWidth:'66%'}" />
              </div>
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

<style lang="postcss" scoped>
  .message-item {
    @apply flex items-center my-2;
  }
  .message-key {
    @apply w-56 flex-shrink-0 pl-8 pr-2 text-gray-600;
  }
  .message-value {
    @apply mr-8 flex flex-row items-center;
  }
</style>
