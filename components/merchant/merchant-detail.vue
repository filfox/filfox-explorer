<template>
  <div class="my-4">
    <div class="flex justify-between items-center">
      <div class="w-3/4">
        <div class="flex items-center">
          <img v-if="merchant.icon" :src="merchant.icon" class="h-8 mr-2">
          <p class="text-base">
            {{ merchant.name }}
          </p>
        </div>
        <p class="text-xs text-gray-500 mt-2">
          {{ merchant.description }}
        </p>
      </div>
      <a
        v-if="merchant.website"
        class="border border-button text-button hover:text-main hover:border-main rounded-full px-4 text-xs py-1"
        :href="merchant.website"
        target="_blank"
      >
        {{ $t('merchant.website') }}
      </a>
    </div>

    <div class="bg-white rounded-md mt-4 pb-1">
      <p class="text-sm pl-6 py-2 border-b border-background font-medium">
        {{ $t('merchant.overview.title') }}
      </p>
      <div class="flex">
        <div class="w-1/2 flex bg-merchantBg ml-6 mr-2 my-4 rounded-sm">
          <MerchantPowerChart :merchant="name" />
        </div>
        <div class="flex flex-col w-1/2 bg-merchantBg mr-6 ml-2 my-4 rounded-sm">
          <div class="flex border-b border-gray-400 border-dashed pt-4 pb-3 mx-4 items-center h-full">
            <div class="w-full">
              <div class="flex justify-between text-xs text-gray-500">
                <p>{{ $t('merchant.overview.qualityAdjPower') }}</p>
              </div>
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <p class="text-xl font-medium">
                    {{ merchant.totalQualityAdjPower | size_metric(2) }}
                  </p>
                  <p class="text-xs ml-2 mt-1">
                    {{ $t('merchant.overview.rate') }}:
                    {{ merchant.totalQualityAdjPower / merchant.networkQualityAdjPower | percentage }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center border-b border-gray-400 border-dashed pt-4 pb-3 mx-4 h-full">
            <div class="w-full">
              <div class="flex justify-between text-xs text-gray-500">
                <p>{{ $t('merchant.overview.powerDelta') }}</p>
                <p>{{ $t('merchant.overview.minerEquivalent') }}</p>
              </div>
              <div class="flex justify-between items-center">
                <p class="text-xl font-medium">
                  {{ (merchant.totalQualityAdjPowerDelta / 30 / merchant.durationPercentage) | size_metric(2) }}
                  /
                  {{ $t('shared.time.day') }}
                </p>
                <p class="text-xl font-medium">
                  {{ merchant.equivalentMiners.toFixed(2) }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex items-center pt-4 pb-3 mx-4 h-full">
            <div class="w-full">
              <div class="flex justify-between text-sm text-gray-500">
                <p class="text-xs">
                  {{ $t('merchant.overview.blocksMined') }}
                </p>
                <p class="text-xs">
                  {{ $t('merchant.overview.blockReward') }}
                </p>
              </div>
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <p class="text-xl font-medium">
                    {{ merchant.totalBlocksMined }}
                  </p>
                  <p class="text-xs ml-2 mt-1">
                    {{ $t('merchant.overview.rate') }}:
                    {{ merchant.totalWeightedBlocksMined / merchant.networkWeightedBlocksMined | percentage }}
                  </p>
                </div>
                <p class="text-xl font-medium">
                  {{ merchant.totalRewards | filecoin(2) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex bg-merchantBg rounded-sm mb-4 mx-6">
        <table class="w-full table-fixed my-2">
          <thead>
            <tr class="text-sm text-tableHeaderColor">
              <th class="w-1/5 font-normal">
                {{ $t('merchant.miner.miners') }}
              </th>
              <th class="w-1/5 font-normal">
                {{ $t('merchant.miner.qualityAdjPower') }}
              </th>
              <th class="w-1/5 font-normal">
                {{ $t('merchant.miner.powerDelta') }}
              </th>
              <th class="w-1/5 font-normal">
                {{ $t('merchant.miner.blockReward') }}
              </th>
              <th class="w-1/5 font-normal">
                {{ $t('merchant.miner.blocksMined') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(miner, index) in merchant.miners" :key="index" class="text-sm text-center">
              <td class="pt-2">
                <AddressLink :id="miner.address" />
              </td>
              <td class="pt-2">
                {{ miner.qualityAdjPower | size_metric(2) }}
              </td>
              <td class="pt-2">
                {{ (miner.qualityAdjPowerDelta / 30 / merchant.durationPercentage) | size_metric(2) }} / {{ $t('shared.time.day') }}
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

    <div class="bg-white rounded-md mt-4 pt-1 pb-4">
      <div class="pl-6">
        <p class="text-sm mt-2 font-medium">
          {{ $t('merchant.sales.title') }}
        </p>
        <div class="flex items-center mt-1 mb-2">
          <p class="text-xs text-gray-500">
            {{ $t('merchant.sales.description') }}
          </p>
          <div class="text-xs cursor-pointer text-main ml-2" @click="didQuestionBtnClicked">
            {{ $t('merchant.sales.issue') }}
          </div>
        </div>
      </div>

      <div
        v-for="(info, machineIndex) in merchant.miningMachines"
        :key="machineIndex"
        class="border-t border-background px-6"
      >
        <div class="flex justify-between items-center mt-6 mb-2">
          <p class="text-2xl font-semibold">
            {{ info.name }}
          </p>
          <div class="flex items-center">
            <p class="text-xs">
              {{ $t('merchant.sales.price') }}:
            </p>
            <p class="text-2xl font-semibold">
              {{ info.price ? info.price : $t('merchant.unknown') }}
            </p>
          </div>
        </div>

        <div class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <p class="text-xs">
              {{ $t('merchant.sales.transparent') }}
            </p>
            <Tip :content="$t('merchant.sales.transparentDesp')" class="ml-1" />
            <p class="text-xs ml-1">
              :
            </p>
            <el-rate
              :value="info.transparencyRating"
              :disabled="true"
              :max="5"
              show-score
              text-color="#ff9900"
              class="ml-2 flex items-center mb-1"
            />
          </div>
          <a
            v-if="info.link"
            class="border border-button text-button hover:text-main hover:border-main rounded-full px-3 text-xs py-1"
            :href="info.link"
            target="_blank"
          >
            {{ $t('merchant.sales.detail') }}
          </a>
        </div>

        <div class="px-4 bg-merchantBg rounded-md py-2">
          <p class="text-sm">
            {{ $t('merchant.sales.services') }}:
          </p>
          <div v-for="index of 3" :key="index" class="flex justify-between mt-1 text-sm text-gray-500">
            <p>
              {{ info.supportingServices[(index - 1) * 2].key }}:
              {{ info.supportingServices[(index - 1) * 2].value }}
            </p>
            <p>
              {{ info.supportingServices[(index - 1) * 2 + 1].key }}:
              {{ info.supportingServices[(index - 1) * 2 + 1].value }}
            </p>
          </div>
        </div>

        <div class="px-4 bg-merchantBg rounded-md py-2 mt-2">
          <p class="text-sm">
            {{ $t('merchant.sales.hardware') }}:
          </p>
          <div v-for="index of 3" :key="index" class="flex justify-between mt-1 text-sm text-gray-500">
            <p>
              {{ info.hardwareParameters[(index - 1) * 2].key }}:
              {{ info.hardwareParameters[(index - 1) * 2].value }}
            </p>
            <p>
              {{ info.hardwareParameters[(index - 1) * 2 + 1].key }}:
              {{ info.hardwareParameters[(index - 1) * 2 + 1].value }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.el-rate__icon {
    margin-right: 0;
}

.el-rate__text {
    font-size: 13px;
    margin-left: 4px;
}

</style>

<script>
export default {
  props: {
    merchant: { type: Object, required: true },
    name: { type: String, default: '' }
  },
  methods: {
    didQuestionBtnClicked() {
      this.$message(this.$t('merchant.contact'))
    }
  }
}
</script>
