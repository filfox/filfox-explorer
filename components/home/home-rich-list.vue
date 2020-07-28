<template>
  <div class="bg-white ml-2 rounded-md">
    <div class="flex flex-row items-center justify-between border-b border-background">
      <HomeTitle type="richManRanks" class="flex flex-grow" />
      <nuxt-link :to="localePath('/rich')" class="mr-4">
        <el-button
          round
          size="mini"
          class="focus:outline-none outline-none"
        >
          {{ $t('shared.more') }}
        </el-button>
      </nuxt-link>
    </div>
    <table v-if="!richListLoading" class="w-full table-fixed mt-2">
      <thead class="text-gray-600 text-sm">
        <tr>
          <th>{{ $t('home.richManRanks.tableHeaders.order') }}</th>
          <th>{{ $t('home.richManRanks.tableHeaders.address') }}</th>
          <th>{{ $t('home.richManRanks.tableHeaders.tag') }}</th>
          <th>{{ $t('home.richManRanks.tableHeaders.balance') }}</th>
          <th>{{ $t('home.richManRanks.tableHeaders.balanceRate') }}</th>
        </tr>
      </thead>
      <tbody class="text-center text-sm">
        <tr
          v-for="(rich, index) in richList.list"
          :key="index"
          class="border-b border-background h-10"
        >
          <td>
            <RankIndex :index="index + 1" />
          </td>
          <td>
            <AddressLink :id="rich.address" :format="5" />
          </td>
          <td>
            <MinerTag :tag="rich.tag" />
          </td>
          <td>{{ rich.balance | filecoin(0) }}</td>
          <td>{{ rich.balance / richList.totalSupply | percentage }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="richListLoading" v-loading="richListLoading" class="flex h-24"></div>
  </div>
</template>

<script>
export default {
  props: {
    richList: { type: Object, required: true },
    richListLoading: { type: Boolean, default: false }
  }
}
</script>
