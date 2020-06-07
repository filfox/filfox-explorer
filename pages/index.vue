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
      <div class="flex h-12 items-center ml-5">{{$t('home.minerRanks.title')}}</div>
      <div class="h-8"></div>
      <el-table :data="minerRanks" class="m-5 w-auto" :empty-text="$t('shared.tableEmptyText')">
        <el-table-column v-for="(value,key) in rankTableHeaders" :key="key" :label="value" ></el-table-column>
      </el-table>
    </div>

    <!-- 最新区块 富豪榜  -->
    <div class="flex flex-row mb-5">
      <!-- 最新区块 -->
      <div class="flex flex-grow flex-col bg-white mr-2 rounded-md">
        <div class="flex h-12 items-center ml-5">{{$t('home.lastBlocks.title')}}</div>
        <el-table :data="minerRanks" class="m-5 w-auto" :empty-text="$t('shared.tableEmptyText')">
         <el-table-column v-for="(value,key) in lastBlocksHeaders" :key="key" :label="value" ></el-table-column>
        </el-table>
      </div>

      <!-- 富豪榜 -->
      <div class="flex flex-grow flex-col bg-white mr-2 rounded-md">
        <div class="flex h-12 items-center ml-5">{{$t('home.richManRanks.title')}}</div>
        <el-table :data="minerRanks" class="m-5 w-auto" :empty-text="$t('shared.tableEmptyText')">
         <el-table-column v-for="(value,key) in richManRanksHeaders" :key="key" :label="value" ></el-table-column>
        </el-table>
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
      richManRanksHeaders:this.$t("home.richManRanks.tableHeaders"),
      minerRanks: [],
      lastBlocks: [],
      richManRanks: [],
      minerRanksLoading: true,
      lastBlocksLoading: true,
      richManRanksLoading: true,
    };
  }
};
</script>
