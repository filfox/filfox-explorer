<template>
  <div class="pb-4 bg-white">
    <div class="px-4 lg:px-8 pt-3 text-xs lg:text-sm text-gray-600 border-t border-background">
      {{ $t('detail.message.transfer.tokenTransactions') }}
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
            v-for="(transfer, index) in message.tokenTransfers"
            :key="index"
            :class="{ 'border-t': index }"
            class="h-11 border-background text-sm"
          >
            <td>
              <div class="flex items-center flex-row pl-4">
                <AddressLink v-if="transfer.from" :id="transfer.from" :format="8" />
                <span v-else>N/A</span>
                <AddressTag :tag="transfer.fromTag" type="pc" :style="{ maxWidth:'66%' }" />
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
                <AddressTag :tag="transfer.toTag" type="pc" :style="{ maxWidth:'66%' }" />
              </div>
            </td>
            <td>
              <div v-if="/erc20/i.test(transfer.type)" class="flex items-center justify-center">
                <img :src="transfer.tokenIcon" :alt="transfer.symbol" class="w-4 h-4 mr-1.5">
                {{ transfer.value | parseToken(transfer.decimals, 6) }}
                <NuxtLink :to="localePath(`/token/${transfer.token}`)" class="hover:underline hover:text-main ml-1">
                  {{ transfer.symbol }}
                </NuxtLink>
              </div>
              <div v-else class="text-xs">
                <div class="flex items-center justify-center">
                  <TokenIcon class="mr-1.5" :token-id="transfer.token" token-type="ERC721" />
                  <NuxtLink :to="localePath(`/token/${transfer.token}`)" class="font-semibold hover:underline hover:text-main">
                    {{ transfer.symbol }}
                  </NuxtLink>
                </div>
                <div class="font-light">
                  {{ transfer.name }}
                </div>
              </div>
            </td>
            <td>
              {{ transfer.type }}
            </td>
          </tr>
        </tbody>
      </table>
      <!-- mobile -->
      <ul class="lg:hidden">
        <li
          v-for="(transfer, index) in message.tokenTransfers"
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
            <span>
              <div v-if="/erc20/i.test(transfer.type)" class="flex items-center justify-center">
                <img :src="transfer.tokenIcon" :alt="transfer.symbol" class="w-3 h-3 mr-1.5">
                {{ transfer.value | parseToken(transfer.decimals, 6) }}
                <NuxtLink :to="localePath(`/token/${transfer.token}`)" class="hover:underline hover:text-main ml-1">
                  {{ transfer.symbol }}
                </NuxtLink>
              </div>
              <div v-else class="text-xs">
                <div class="flex items-center justify-center">
                  <TokenIcon class="mr-1.5" :token-id="transfer.token" token-type="ERC721" />
                  <NuxtLink :to="localePath(`/token/${transfer.token}`)" class="font-semibold hover:underline hover:text-main">
                    {{ transfer.symbol }}
                  </NuxtLink>
                </div>
                <div class="font-light">
                  {{ transfer.name }}
                </div>
              </div>
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('detail.message.transfer.type') }}</span>
            <span>{{ transfer.type }}</span>
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
