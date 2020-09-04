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
      <p class="text-sm">
        {{ $t('detail.address.miner.minerOverview.headers.blockNums') }}:
        {{ addressData.miner.weightedBlocksMined }}
      </p>
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
          {{ $t('detail.address.miner.sectors.total') }} {{ addressData.miner.sectors | locale }} ,
        </span>
        <span class=" text-green-600">
          {{ $t('detail.address.miner.sectors.active') }} {{ addressData.miner.activeSectors | locale }} ,
        </span>
        <span class=" text-red-700">
          {{ $t('detail.address.miner.sectors.faults') }} {{ addressData.miner.faults | locale }} ,
        </span>
        <span class=" text-yellow-500">
          {{ $t('detail.address.miner.sectors.recoveries') }} {{ addressData.miner.recoveries | locale }}
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
