<template>
  <div class="flex flex-row">
    <div class="flex w-1/3 h-full">
      <MinerBalanceChart :address-data="addressData" />
    </div>
    <div class="py-4">
      <p class="text-sm mt-4">
        {{ $t('detail.address.miner.minerOverview.headers.balance') }}
      </p>
      <p class="font-medium text-2xl">
        {{ addressData.balance | filecoin(4) }}
      </p>
      <p class="text-sm mt-4">
        {{ $t('detail.address.miner.minerOverview.headers.availableBalance') }}: {{ addressData.miner.availableBalance | filecoin(4) }}
      </p>
      <p class="text-sm mt-2">
        {{ $t('detail.address.miner.minerOverview.headers.pledgeBalance') }}: {{ addressData.miner.pledgeBalance | filecoin(4) }}
      </p>
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
