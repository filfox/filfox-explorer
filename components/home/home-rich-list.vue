<template>
  <div class="flex flex-col w-1/2 bg-white ml-2 rounded-md">
    <div class="flex flex-row items-center justify-between border-b border-background">
      <HomeTitle type="richManRanks" class="flex flex-grow" />
      <el-button
        round
        size="mini"
        class="mr-4 focus:outline-none outline-none"
        v-on:click="didRichManListMoreBtnClicked"
      >{{ $t('shared.more') }}</el-button>
    </div>
    <table class="w-full table-fixed mt-2" v-if="!richListLoading">
      <thead class="text-gray-600 text-sm">
        <tr>
          <th>{{$t('home.richManRanks.tableHeaders.order')}}</th>
          <th>{{$t('home.richManRanks.tableHeaders.address')}}</th>
          <th>{{$t('home.richManRanks.tableHeaders.tag')}}</th>
          <th>{{$t('home.richManRanks.tableHeaders.balance')}}</th>
          <th>{{$t('home.richManRanks.tableHeaders.balanceRate')}}</th>
        </tr>
      </thead>
      <tbody class="text-center text-sm">
        <tr
          v-for="(rich, index) in richList.list"
          :key="index"
          class="border-b border-background h-10"
        >
          <td>
            <RankIndex :index="index+1" />
          </td>
          <td>
            <AddressLink :id="rich.address" :format="5" />
          </td>
          <td>
            <MinerTag :tag="rich.tag" />
          </td>
          <td>{{rich.balance | filecoin(0)}}</td>
          <td>{{ (rich.balance/richList.totalSupply * 100).toFixed(2) }}%</td>
        </tr>
      </tbody>
    </table>
    <div class="flex h-24" v-if="richListLoading" v-loading="richListLoading"></div>
  </div>
</template>

<script>
export default {
    props: {
        richList: {
            type: Object,
            default: {}
        },
        richListLoading: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        didRichManListMoreBtnClicked() {
         this.$router.push(this.localePath('/rich'))
        }
    }
}
</script>>