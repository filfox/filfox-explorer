<template>
  <div class="bg-white">
    <div class="flex font-medium text-sm pl-4 py-3 border-b border-background">
      {{ $t('detail.address.normal.headers.overview') }}
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.address') }}
      </p>
      <AddressLink :id="addressData.address" class="flex w-3/4" />
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        ID
      </p>
      <p class="flex w-3/4">
        {{ addressData.alias }}
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.actor') }}
      </p>
      <p class="flex w-3/4">
        {{ $t(`actor.${addressData.actor}`) }}
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.balance') }}
      </p>
      <p class="flex w-3/4">
        {{ addressData.balance | filecoin }}
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.messages') }}
      </p>
      <p class="flex w-3/4">
        {{ addressData.messageCount }}
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.createTime') }}
      </p>
      <p class="flex w-3/4">
        {{ addressData.createTimestamp | timestamp('datetime') }}
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 mt-2">
      <p class="flex w-1/4">
        {{ $t('detail.address.normal.headers.lastSeenTime') }}
      </p>
      <p class="flex w-3/4">
        {{ addressData.lastSeenTimestamp | timestamp('datetime') }}
      </p>
    </div>

    <div v-if="addressData.ownedMiners.length > 0" class="flex justify-between text-xs mx-4 mt-2">
      <p class="w-1/4">
        {{ $t('detail.address.normal.headers.ownedMiners') }}
      </p>
      <div class="w-3/4">
        <p v-for="ownedMiner in addressData.ownedMiners" :key="ownedMiner" class="flex text-main pb-1">
          <AddressLink :id="ownedMiner" />
        </p>
      </div>
    </div>

    <div v-if="addressData.workerMiners.length > 0" class="flex justify-between text-xs mx-4 mt-2">
      <p class="w-1/4">
        {{ $t('detail.address.normal.headers.workers') }}
      </p>
      <div class="w-3/4">
        <p v-for="worker in addressData.workerMiners" :key="worker" class="pb-1 flex text-main">
          <AddressLink :id="worker" />
        </p>
      </div>
    </div>

    <div class="mt-4">
      <p class="pl-3 flex py-2 text-sm font-medium border-t border-background">
        {{ $t('blockchain.message.title') }}
      </p>
      <AddressMessageListMobile :address="addressData.address" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    addressData: { type: Object, required: true }
  }
}
</script>
