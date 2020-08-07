<template>
  <div>
    <div class="bg-white lg:hidden pb-1">
      <div class="mt-2">
        <p class="pl-4 flex py-2 text-sm font-medium">
          {{ $t('chart.gas.title') }}
        </p>

        <div
          v-for="(gas, index) in gasList"
          :key="index"
          class="rounded-sm mx-3 mb-3 py-2 shadow bg-white text-xs text-gray-800"
        >
          <div class="message-item">
            <p>
              {{ $t('chart.gas.headers.method') }}:
            </p>
            <p>
              {{ gas.method ? gas.method : $t('chart.gas.all') }}
            </p>
          </div>
          <div class="message-item">
            <p>
              {{ $t('chart.gas.headers.gasPrice') }}:
            </p>
            <p>
              {{ gas.gasPrice | filecoin(2) }}
            </p>
          </div>
          <div class="message-item">
            <p>
              {{ $t('chart.gas.headers.gasLimit') }}:
            </p>
            <p>
              {{ gas.gasLimit | filecoin(2) }}
            </p>
          </div>
          <div class="message-item">
            <p>
              {{ $t('chart.gas.headers.gasUsed') }}:
            </p>
            <p>
              {{ gas.gasUsed | filecoin(2) }}
            </p>
          </div>
          <div class="message-item">
            <p>
              {{ $t('chart.gas.headers.fee') }}:
            </p>
            <p>
              {{ gas.fee | filecoin(2) }} / {{ gas.fee / gas.totalFee | percentage }}
            </p>
          </div>
          <div class="message-item">
            <p>
              {{ $t('chart.gas.headers.count') }}:
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
        {{ $t('chart.gas.title') }}
      </div>
      <div class="rounded-md my-4 bg-white pt-2">
        <div class="flex mx-4">
          <table class="w-full table-auto">
            <thead class="text-gray-600 text-sm m-2">
              <tr class="h-8">
                <th class="table-header">
                  {{ $t('chart.gas.headers.method') }}
                </th>
                <th class="table-header">
                  {{ $t('chart.gas.headers.gasPrice') }}
                </th>
                <th class="table-header">
                  {{ $t('chart.gas.headers.gasLimit') }}
                </th>
                <th class="table-header">
                  {{ $t('chart.gas.headers.gasUsed') }}
                </th>
                <th class="table-header">
                  {{ $t('chart.gas.headers.fee') }}
                </th>
                <th class="table-header">
                  {{ $t('chart.gas.headers.count') }}
                </th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr
                v-for="(gas, index) in gasList"
                :key="index"
                class="h-12 border-b border-background text-sm"
              >
                <td>
                  {{ gas.method ? gas.method : $t('chart.gas.all') }}
                </td>
                <td>
                  {{ gas.gasPrice | filecoin(2) }}
                </td>
                <td>
                  {{ gas.gasLimit | filecoin(2) }}
                </td>
                <td>
                  {{ gas.gasUsed | filecoin(2) }}
                </td>
                <td>
                  {{ gas.fee | filecoin(2) }} / {{ gas.fee / gas.totalFee | percentage }}
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
      gasList: {}
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
