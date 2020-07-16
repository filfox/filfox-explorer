<template>
    <div class="flex flex-col flex-grow my-4">
        <div class="flex flex-row justify-between items-center">
            <div class="flex flex-col">
                <div class="flex flex-row items-center">
                 <img :src="merchant.icon" class="h-5 mr-2" v-if="merchant.icon"/>
                 <p class="text-base"> {{ merchant.name }} </p>
                </div>
                <p class="text-xs text-gray-500 mt-2"> {{ merchant.description }} </p>
            </div>
            <a class="border border-button text-button hover:text-main hover:border-main rounded-full px-4 text-xs py-1" :href="merchant.website ? merchant.website :''" v-if="merchant.website">  
                {{ $t('merchant.website') }}
            </a>
        </div>

        <div class="flex flex-col bg-white rounded-md mt-4">
            <p class="text-sm pl-6 py-2 border-b border-background font-medium"> {{ $t('merchant.powerOverview') }} </p>
            <div class="flex flex-row">
                <div class="h-56 w-1/2 flex bg-background ml-6 mr-2 my-4 rounded-sm">
                </div>
                <div class="h-56 w-1/2 flex bg-background mr-6 ml-2 my-4 rounded-sm">
                </div>
            </div>

            <div class="flex bg-background rounded-sm mb-4 mx-6">
                <table class="w-full table-fixed my-2">
                    <thead>
                        <tr class="text-sm text-gray-600">
                            <th class="w-1/5"> {{ $t('merchant.miner.miners') }} </th>
                            <th class="w-1/5"> {{ $t('merchant.miner.qualityAdjPower') }} </th>
                            <th class="w-1/5"> {{ $t('merchant.miner.powerDelta') }} </th>
                            <th class="w-1/5"> {{ $t('merchant.miner.blockReward') }} </th>
                            <th class="w-1/5"> {{ $t('merchant.miner.blocksMined') }} </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(miner, index) in merchant.miners" :key="index" class="text-sm text-center">
                            <td class="pt-2">
                                <AddressLink :id="miner.address"/>
                            </td>
                            <td class="pt-2">
                                {{ miner.qualityAdjPower | size_metric(2) }}
                            </td>
                            <td class="pt-2">
                                {{ (miner.qualityAdjPowerDelta/30/merchant.durationPercentage) | size_metric(2) }} / {{ $t('shared.time.day') }}
                            </td>
                            <td class="pt-2">
                                {{ miner.rewards | filecoin(2) }}
                            </td>
                            <td class="pt-2">
                                {{ miner.blocksMined }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="flex flex-col bg-white rounded-md mt-4">
            <div class="pl-6 flex flex-col">
                <p class="text-sm mt-2 font-medium"> {{ $t('merchant.sales.title') }} </p>
                <div class="flex flex-row items-center mt-1 mb-2">
                    <p class="text-xs text-gray-500"> {{ $t('merchant.sales.description') }} </p>
                    <div class="text-xs cursor-pointer text-main ml-2"> {{ $t('merchant.sales.issue') }} </div>
                </div>
            </div>
            
            <div v-for="(info, index) in merchant.miningMachines" :key="index" class="border-t border-background px-6">
                <div class="flex flex-row justify-between items-center mt-6 mb-2">
                    <p class="text-2xl font-semibold"> {{ info.name }} </p>
                    <div class="flex flex-row items-center">
                        <p class="text-xs"> {{ $t('merchant.sales.price') }}: </p>
                        <p class="text-2xl font-semibold"> ￥{{ info.price ? info.price : $t('merchant.unknown') }} </p>
                    </div>
                </div>

                <div class="flex flex-row justify-between items-center mb-2">
                    <div class="flex flex-row items-center"> 
                        <p class="text-xs"> {{ $t('merchant.sales.transparent')}}: </p>
                        <el-rate :value="info.transparencyRating" :disabled="true" :max="5" class="ml-2 mb-1"></el-rate>
                    </div>
                    <a class="border border-button text-button hover:text-main hover:border-main rounded-full px-3 text-xs py-1" :href="info.link ? info.link :''" v-if="info.link">  
                        {{ $t('merchant.sales.detail') }}
                    </a>
                </div>

                <div class="flex flex-col px-4 bg-background rounded-md py-2">
                    <p class="text-sm"> {{ $t('merchant.sales.services') }}: </p>
                    <div class="flex flex-row justify-between mt-1 text-sm text-gray-500" v-for="index of 3" :key="index" >
                        <p> {{ info.supportingServices[index].key + ': ' + info.supportingServices[index].value }} </p>
                        <p> {{ info.supportingServices[index+1].key + ': ' + info.supportingServices[index+1].value }} </p>
                    </div>
                </div>

                <div class="flex flex-col px-4 bg-background rounded-md py-2 mt-2 mb-4">
                    <p class="text-sm"> {{ $t('merchant.sales.hardware') }}: </p>
                    <div class="flex flex-row justify-between mt-1 text-sm text-gray-500" v-for="index of 3" :key="index" >
                        <p> {{ info.hardwareParameters[index].key + ': ' + info.hardwareParameters[index].value }} </p>
                        <p> {{ info.hardwareParameters[index+1].key + ': ' + info.hardwareParameters[index+1].value }} </p>
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
export default {
    props: {
        merchant: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {

        }
    },
}
</script>