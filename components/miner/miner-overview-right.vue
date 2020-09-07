<template>
  <div class="py-4 mx-8">
    <p class="text-sm mt-4">
      {{ $t('detail.address.miner.minerOverview.headers.qualityAdjPower') }}
    </p>
    <div class="flex items-center justify-between w-full">
      <p class="font-medium text-2xl">
        {{ addressData.miner.qualityAdjPower | size_metric(2) }}
      </p>
      <p class="text-sm">
        {{ $t('detail.address.miner.minerOverview.headers.rate') }}:
        {{ addressData.miner.qualityAdjPower / addressData.miner.totalQualityAdjPower | percentage }}
      </p>
      <p class="text-sm">
        {{ $t('detail.address.miner.minerOverview.headers.rank') }}:
        {{ addressData.miner.qualityAdjPowerRank || 'N/A' }}
      </p>
    </div>
    <div class="flex items-center justify-between w-full mt-4">
      <p class="text-sm">
        {{ $t('detail.address.miner.minerOverview.headers.rawBytePower') }}:
        {{ addressData.miner.rawBytePower | size_metric(2) }}
      </p>
      <div class="text-sm items-center justify-end flex">
        {{ $t('detail.address.miner.minerOverview.headers.WinCount') }}
        <Tip class="mx-1" :content="$t('home.minerRanks.tipsByBlock.winCount')" />
        :
        {{ addressData.miner.weightedBlocksMined }}
      </div>
    </div>
    <div class="flex items-center justify-between w-full mt-2">
      <p class="text-sm">
        {{ $t('detail.address.miner.minerOverview.headers.blocksReward') }}:
        {{ addressData.miner.totalRewards | filecoin(2) }}
      </p>
      <p class="text-sm">
        {{ $t('detail.address.miner.minerOverview.headers.sectorSize') }}:
        {{ addressData.miner.sectorSize | size_metric }}
      </p>
    </div>
    <div class="text-sm mt-2 items-center justify-between flex">
      <p>
        {{ $t('detail.address.miner.minerOverview.headers.sectors') }}:
      </p>
      <div>
        <span>
          {{ addressData.miner.sectors | locale }} {{ $t('detail.address.miner.sectors.total') }},
        </span>
        <span class=" text-green-600">
          {{ addressData.miner.activeSectors | locale }} {{ $t('detail.address.miner.sectors.active') }},
        </span>
        <span class=" text-red-700">
          {{ addressData.miner.faults | locale }} {{ $t('detail.address.miner.sectors.faults') }},
        </span>
        <span class=" text-yellow-500">
          {{ addressData.miner.recoveries | locale }} {{ $t('detail.address.miner.sectors.recoveries') }}
        </span>
      </div>
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
