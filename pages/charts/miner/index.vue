<template>
  <div class="container mx-auto flex flex-col">
    <div class="flex flex-grow-0 mt-6 font-medium"> {{ $t('chart.miner.title') }} </div>
    <div class="flex flex-col rounded-md my-4 bg-white">
        <div class="border-b border-background h-12 flex items-center pl-6"> {{ $t('chart.miner.headers.qualityAdjPowerPie') }} </div>
        <client-only>
            <PowerDistributionChart class="mx-4 mt-12"/>
        </client-only>
    </div>

    <div class="flex flex-col rounded-md my-4 bg-white">
        <div class="border-b border-background h-12 flex items-center pl-6"> {{ $t('chart.miner.headers.qualityAdjPowerDeltaLine') }} </div>
        <client-only>
            <PowerDeltaChart class="mx-4 mt-12"/>
        </client-only>
    </div>

  </div>
</template>

<script>
</script>