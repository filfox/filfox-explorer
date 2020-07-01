<template>
    <div class="flex flex-row h-10 lg:h-12 items-center pl-4">
        <img v-if="type == 'overview'" src="~/assets/img/home/overview.svg" alt="icon" class="w-4 lg:w-5">
        <img v-if="type == 'powerDistribution'" src="~/assets/img/home/power-distribution.svg" alt="icon" class="w-4 lg:w-5">
        <img v-if="type == 'powerDelta'" src="~/assets/img/home/power-delta.svg" alt="icon" class="w-4 lg:w-5">
        <img v-if="type == 'minerRanks'" src="~/assets/img/home/miner-ranks.svg" alt="icon" class="w-4 lg:w-5">
        <img v-if="type == 'recentTipsets'" src="~/assets/img/home/blocks.svg" alt="icon" class="w-4 lg:w-5" >
        <img v-if="type == 'richManRanks'" src="~/assets/img/home/rich.svg" alt="icon" class="w-4 lg:w-5">
        <div class="ml-2 text-sm lg:text-base"> {{$t('home.' + this.type + '.title')}} </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'overview'
        }
    }
}
</script>