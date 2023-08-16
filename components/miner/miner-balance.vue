<template>
  <div class="flex">
    <div class="w-1/3 h-full">
      <MinerBalanceChart :address-data="addressData" />
    </div>
    <div class="py-4">
      <p class="text-sm mt-4">
        {{ $t('detail.address.miner.minerOverview.headers.balance') }}
      </p>
      <p class="font-medium text-2xl">
        {{ addressData.balance | filecoin(4) }}
      </p>
      <p class="flex items-center text-sm mt-4">
        {{ $t('detail.address.miner.minerOverview.headers.availableBalance') }}
        <Tip class="mx-1" :content="$t('detail.address.miner.minerOverview.tips.availableBalance')" />:
        {{ addressData.miner.availableBalance[0] === '-' ? '0' : addressData.miner.availableBalance | filecoin(4) }}
      </p>
      <p class="text-sm mt-2">
        {{ $t('detail.address.miner.minerOverview.headers.sectorPledge') }}:
        {{ addressData.miner.sectorPledgeBalance | filecoin(4) }}
      </p>
      <p class="text-sm mt-2">
        {{ $t('detail.address.miner.minerOverview.headers.lockedRewards') }}:
        {{ addressData.miner.vestingFunds | filecoin(4) }}
      </p>
      <p v-if="addressData.miner.availableBalance[0] === '-'" class="text-sm mt-2 text-red-700">
        {{ $t('detail.address.miner.minerOverview.headers.feeDebt') }}:
        {{ addressData.miner.availableBalance.slice(1) | filecoin(4) }}
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
