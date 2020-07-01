<template>
  <div class="flex flex-col w-full bg-white mb-2">
    <div class="flex flex-row items-center justify-between border-b border-background">
      <HomeTitle type="richManRanks" class="flex flex-grow" />
    </div>
    <table class="w-full table-fixed mt-2" v-if="!richListLoading">
      <thead class="text-gray-600 text-xs">
        <tr>
          <th class="w-1/6">{{$t('home.richManRanks.tableHeaders.order')}}</th>
          <th class="w-1/6">{{$t('home.richManRanks.tableHeaders.address')}}</th>
          <th class="w-1/4">{{$t('home.richManRanks.tableHeaders.tag')}}</th>
          <th class="w-1/4">{{$t('home.richManRanks.tableHeaders.balance')}}</th>
          <th class="w-1/6">{{$t('home.richManRanks.tableHeaders.balanceRate')}}</th>
        </tr>
      </thead>
      <tbody class="text-center text-xs">
        <tr
          v-for="(rich, index) in richList.list"
          :key="index"
          class="border-b border-background h-10"
        >
          <td>
            <RankIndex :index="index+1" />
          </td>
          <td>
            <AddressLink :id="rich.address" :format="3" />
          </td>
          <td>{{ rich.tag ? rich.tag[$i18n.locale] : '--' }}</td>
          <td>{{rich.balance | filecoin(0)}}</td>
          <td>{{ (rich.balance/richList.totalSupply * 100).toFixed(2) }}%</td>
        </tr>
      </tbody>
    </table>
    <div class="flex flex-grow items-center text-center h-12">
        <el-button class="flex m-auto focus:outline-none outline-none" size="mini" round v-on:click="didRichManListMoreBtnClicked"> {{ $t('home.minerRanks.moreBtn') }} </el-button> 
    </div>
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
         this.$router.push(this.localePath('/blockchain/rich'))
        }
    }
}
</script>>