<template>
    <div class="flex flex-col py-4 mx-8">
        <p class="text-sm mt-4"> {{ $t('detail.address.miner.minerOverview.headers.qualityAdjPower')}} </p>
        <div class="flex flex-row items-center justify-between w-full">
            <p class=" font-medium text-2xl"> {{ addressData.miner.qualityAdjPower | size_metric(2) }}</p>
            <p class="text-sm"> {{$t('detail.address.miner.minerOverview.headers.rate')}}: {{ (addressData.miner.qualityAdjPower/addressData.miner.totalQualityAdjPower * 100).toFixed(2) }}% </p>
            <p class="text-sm"> {{$t('detail.address.miner.minerOverview.headers.rank')}}: {{ addressData.miner.qualityAdjPowerRank ? addressData.miner.qualityAdjPowerRank : N/A }} </p>
        </div>
        <div class="flex flex-row items-center justify-between w-full mt-4">
            <p class="text-sm"> {{ $t('detail.address.miner.minerOverview.headers.rawBytePower')}}: {{ addressData.miner.rawBytePower | size_metric(2) }}</p>
            <p class="text-sm"> {{ $t('detail.address.miner.minerOverview.headers.sectorSize')}}: {{ addressData.miner.sectorSize | size_metric(2) }} </p>
        </div>
        <div class="flex flex-row items-center justify-between w-full mt-1">
            <p class="text-sm"> {{ $t('detail.address.miner.minerOverview.headers.blockNums')}}: {{ addressData.miner.blocksMined }}</p>
            <p class="text-sm"> {{ $t('detail.address.miner.minerOverview.headers.qualityAdjPowerDelta24h')}}: {{ addressData.miner.qualityAdjPowerDelta24h | size_metric(2) }}</p>
        </div>
        <div class="flex flex-row items-center justify-between w-full mt-1">
            <p class="text-sm"> {{ $t('detail.address.miner.minerOverview.headers.blocksReward')}}: {{ addressData.miner.miningRewards | filecoin(2) }} </p>
            <p class="text-sm"> {{ $t('detail.address.miner.minerOverview.headers.qualityAdjPowerDeltaSpeed24h')}}: {{ addressData.miner.qualityAdjPowerDelta24h/24 | size_metric(2) }} / {{ $t('shared.time.hour') }} </p>
        </div>
    </div>
</template>

<script>

export default {
  props: {
    addressData: {
      type: Object,
      default: {}
    }
  },
};
</script>