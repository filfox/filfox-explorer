<template>
  <div class="container mx-auto">
    <div class="mt-4 lg:mt-6 font-medium text-xs lg:text-base ml-4 lg:ml-0">
      {{ $t('chart.gas.title') }}
    </div>

    <client-only>
      <BaseFeeChart class="my-4" />
    </client-only>

    <div class="bg-white lg:hidden pb-1">
      <div class="mt-2">
        <p class="pl-4 flex py-2 text-sm font-medium">
          {{ $t('chart.gas.headers.dailyStatistics') }}
        </p>

        <div
          v-for="(gas, index) in sortedGasList"
          :key="index"
          class="rounded-sm mx-3 mb-3 py-2 shadow bg-white text-xs text-gray-800"
        >
          <div class="message-item">
            <p>
              {{ $t('chart.gas.tableHeaders.method') }}:
            </p>
            <p>
              {{ gas.method || $t('chart.gas.all') }}
            </p>
          </div>
          <div class="message-item">
            <p>
              Gas Premium:
            </p>
            <p>
              {{ Math.round(gas.gasPremium) | filecoin(2) }}
            </p>
          </div>
          <div class="message-item">
            <p>
              {{ $t('chart.gas.tableHeaders.gasLimit') }}:
            </p>
            <p>
              {{ Math.round(gas.gasLimit) | locale }}
            </p>
          </div>
          <div class="message-item">
            <p>
              {{ $t('chart.gas.tableHeaders.gasUsed') }}:
            </p>
            <p>
              {{ Math.round(gas.gasUsed) | locale }}
            </p>
          </div>
          <div class="message-item">
            <p>
              {{ $t('chart.gas.tableHeaders.gasFee') }}:
            </p>
            <p>
              {{ gas.fee | filecoin(4) }}
            </p>
          </div>
          <div class="message-item">
            <p>
              {{ $t('chart.gas.tableHeaders.fee') }}:
            </p>
            <p>
              {{ gas.totalFee | filecoin(0) }}
              /
              {{ gas.totalFee / gasList[0].totalFee | percentage }}
            </p>
          </div>
          <div class="message-item">
            <p>
              {{ $t('chart.gas.tableHeaders.count') }}:
            </p>
            <p>
              {{ gas.count }} / {{ gas.count / gasList[0].count | percentage }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden container mx-auto lg:block">
      <div class="mt-6 font-medium">
        {{ $t('chart.gas.headers.dailyStatistics') }}
      </div>
      <div class="rounded-md my-4 bg-white pt-2">
        <div class="flex mx-4">
          <table class="w-full table-auto">
            <thead class="text-gray-600 text-sm m-2">
              <tr class="h-8">
                <th class="table-header">
                  {{ $t('chart.gas.tableHeaders.method') }}
                </th>
                <th class="table-header">
                  Gas Premium
                </th>
                <th class="table-header">
                  {{ $t('chart.gas.tableHeaders.gasLimit') }}
                </th>
                <th class="table-header">
                  {{ $t('chart.gas.tableHeaders.gasUsed') }}
                </th>
                <th class="table-header">
                  {{ $t('chart.gas.tableHeaders.gasFee') }}
                </th>
                <th class="table-header">
                  {{ $t('chart.gas.tableHeaders.fee') }}
                </th>
                <th class="table-header">
                  {{ $t('chart.gas.tableHeaders.count') }}
                </th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr
                v-for="(gas, index) in sortedGasList"
                :key="index"
                class="h-12 border-b border-background text-sm"
              >
                <td>
                  {{ gas.method || $t('chart.gas.all') }}
                </td>
                <td>
                  {{ Math.round(gas.gasPremium) | filecoin(2) }}
                </td>
                <td>
                  {{ Math.round(gas.gasLimit) | locale }}
                </td>
                <td>
                  {{ Math.round(gas.gasUsed) | locale }}
                </td>
                <td>
                  {{ gas.fee | filecoin(4) }}
                </td>
                <td>
                  {{ gas.totalFee | filecoin(6, true) }}
                  /
                  {{ gas.totalFee / gasList[0].totalFee | percentage }}
                </td>
                <td>
                  {{ gas.count }} / {{ gas.count / gasList[0].count | percentage }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, error }) {
    try {
      const gasList = await $axios.$get('/stats/message/fee')
      return { gasList }
    } catch (err) {
      if (err?.response) {
        error({ code: err.response.status, message: err.response.statusText })
      } else {
        error({ code: 500, message: err.toString() })
      }
    }
  },
  data() {
    return {
      gasList: []
    }
  },
  computed: {
    sortedGasList() {
      return this.gasList.slice().sort((x, y) => y.totalFee - x.totalFee)
    }
  },
  head() {
    return {
      title: this.$t('chart.gas.title')
    }
  }
}
</script>

<style lang="postcss" scoped>
  .message-item {
    @apply flex items-center justify-between mx-3 mt-1;
  }
  .table-header {
    @apply sticky top-0 bg-white z-10;
  }
</style>
