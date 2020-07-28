<template>
  <div class="pt-6">
    <div class="font-medium">
      {{ $t('detail.address.normal.title') }} {{ addressData.address }}
    </div>
    <div class="rounded-md my-4 bg-white pb-2">
      <div class="flex pl-8 py-4 font-medium border-b border-background">
        {{ $t('detail.address.normal.headers.overview') }}
      </div>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.address') }}
        </dt>
        <dd class="mr-4">
          <AddressLink :id="addressData.address" />
        </dd>
      </dl>

      <dl v-if="addressData.address[1] !== '0'" class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          ID
        </dt>
        <dd class="mr-4">
          <AddressLink :id="addressData.alias" />
        </dd>
      </dl>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.actor') }}
        </dt>
        <dd class="mr-4">
          {{ $t(`actor.${addressData.actor}`) }}
        </dd>
      </dl>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.balance') }}
        </dt>
        <dd class="mr-4">
          {{ addressData.balance | filecoin }}
        </dd>
      </dl>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.messages') }}
        </dt>
        <dd class="mr-4">
          {{ addressData.messageCount }}
        </dd>
      </dl>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.createTime') }}
        </dt>
        <dd class="mr-4">
          {{ addressData.createTimestamp | timestamp('datetime') }}
        </dd>
      </dl>

      <dl class="flex my-2 items-center">
        <dt class="w-1/8 pl-8 text-gray-600 px-2">
          {{ $t('detail.address.normal.headers.lastSeenTime') }}
        </dt>
        <dd class="mr-4">
          {{ addressData.lastSeenTimestamp | timestamp('datetime') }}
        </dd>
      </dl>

      <dl v-if="addressData.ownedMiners.length > 0" class="flex items-center my-2">
        <dt class="w-1/8 pl-8 text-gray-600 px-2 items-center">
          {{ $t('detail.address.normal.headers.ownedMiners') }}
        </dt>
        <dd class="flex flex-wrap flex-1 text-main">
          <p v-for="ownedMiner in addressData.ownedMiners" :key="ownedMiner" class="mr-4">
            <AddressLink :id="ownedMiner" />
          </p>
        </dd>
      </dl>

      <dl v-if="addressData.workerMiners.length > 0" class="flex items-center my-2">
        <dt class="w-1/8 pl-8 text-gray-600 px-2 items-center">
          {{ $t('detail.address.normal.headers.workers') }}
        </dt>
        <dd class="flex flex-wrap flex-1 text-main">
          <p v-for="worker in addressData.workerMiners" :key="worker" class="mr-4">
            <AddressLink :id="worker" />
          </p>
        </dd>
      </dl>
    </div>

    <div class="rounded-md pt-4 my-4 bg-white">
      <div class="flex ml-8 font-medium">
        {{ $t('blockchain.message.title') }}
      </div>
      <AddressMessageList :address="addressData.address" />
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
