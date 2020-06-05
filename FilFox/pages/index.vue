<template>
  <div class="container mx-auto">
    <!-- 全网概览 -->
    <div class="my-5">
      <div class="bg-white flex justify-between h-12 border-b border-background rounded-t-md">
        <div class="flex items-center ml-5">{{ $t('home.overview.title') }}</div>
        <button
          class="mr-5 text-center items-center"
          v-on:click="overviewExpanded = !overviewExpanded"
        >{{ $t('home.overview.foldBtn')}}</button>
      </div>
      <div class="bg-white p-5 rounded-b-md">
        <div class="grid grid-flow-row grid-cols-5 gap-4 text-center">
          <template v-if="overviewExpanded">
            <overviewCell v-for="(title,i) in overviewTitles" :key="i" :name="title" />
          </template>
          <template v-else>
            <overviewCell v-for="(title,i) in overviewTitles.slice(0,10)" :key="i" :name="title" />
          </template>
        </div>
      </div>
    </div>
    <!-- 图表 -->
    <div class="flex flex-row mb-5">
      <div class="flex-grow bg-white h-64 mr-2 rounded-md"></div>
      <div class="flex-grow bg-white h-64 ml-2 rounded-md"></div>
    </div>
    <!-- 挖矿排行榜 -->
    <div class="flex flex-grow flex-col mb-5 bg-white rounded-md">
      <div class="flex h-16 items-center ml-5">{{$t('home.minerRanks.title')}}</div>
      <div class="h-12"></div>
      <table class="table-auto border-t-2 border-background">
        <thead>
          <tr>
            <th class="py-2 text-xs text-gray-500" v-for="(value,key) in rankTableHeaders" :key="key"> {{ value }} </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <!-- 挖矿列表 -->
            <th></th>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 最新区块 富豪榜  -->
    <div class="flex flex-row mb-5">
      <!-- 最新区块 -->
      <div class="flex flex-grow flex-col bg-white mr-2 rounded-md">
        <div class="flex h-12 items-center ml-5">{{$t('home.lastBlocks.title')}}</div>
        <table class="table-auto border-t-2 border-background">
          <thead>
            <tr>
              <th class="py-2 text-xs text-gray-500" v-for="(value,key) in lastBlocksHeaders" :key="key"> {{ value }} </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <!-- 最新区块列表 -->
              <th></th>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 富豪榜 -->
      <div class="flex flex-grow flex-col bg-white mr-2 rounded-md">
        <div class="flex h-12 items-center ml-5">{{$t('home.richManRanks.title')}}</div>
        <table class="table-auto border-t-2 border-background">
          <thead>
            <tr>
              <th class="py-2 text-xs text-gray-500" v-for="(value,key) in richManRanksHeaders" :key="key"> {{ value }} </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <!-- 最新区块列表 -->
              <th></th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import overviewCell from "~/components/home/overview-cell";
export default {
  components: {
    overviewCell
  },
  data() {
    return {
      overviewExpanded: false,
      overviewTitles: this.$t("home.overview.titles"),
      rankTableHeaders: this.$t("home.minerRanks.tableHeaders"),
      lastBlocksHeaders: this.$t("home.lastBlocks.tableHeaders"),
      richManRanksHeaders:this.$t("home.richManRanks.tableHeaders")
    };
  }
};
</script>
