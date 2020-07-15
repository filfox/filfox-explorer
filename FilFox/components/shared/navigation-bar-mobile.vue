<template>
    <div class="bg-white flex flex-col overflow-hidden pb-1 border-b border-background">
        <div class="w-full flex">
            <el-input size="mini" suffix-icon="el-icon-search" :clearable="true" :placeholder="$t('nav.searchPlaceHolder')" v-model="searchText" class="mx-3 mt-3" @keyup.enter.native="search"></el-input>
        </div>

        <div class="flex ml-4 mr-1 flex-col mt-1">
            <el-collapse class="w-full">
                <el-collapse-item :title="blockchainTitle">
                    <div class="text-xs text-gray-500 mb-1" @click="handleBlocksCommand(0)"> {{ $t('nav.blocks.subMenus.0') }} </div>
                    <div class="text-xs text-gray-500 mb-1" @click="handleBlocksCommand(1)"> {{ $t('nav.blocks.subMenus.1') }} </div>
                    <div class="text-xs text-gray-500 mb-1" @click="handleBlocksCommand(2)"> {{ $t('nav.blocks.subMenus.2') }} </div>
                </el-collapse-item>
            </el-collapse>

            <div class="ranks text-sm py-2 cursor-pointer" @click="handleRanksSelect"> {{ $t('nav.ranks.title') }} </div>

            <el-collapse class="w-full">
                <el-collapse-item :title="chartTitle">
                    <div class="text-xs text-gray-500 mb-1" @click="handleChartsCommand(0)"> {{ $t('nav.charts.subMenus.0') }} </div>
                    <div class="text-xs text-gray-500 mb-1" @click="handleChartsCommand(1)"> {{ $t('nav.charts.subMenus.1') }} </div>
                </el-collapse-item>
            </el-collapse>

            <el-collapse class="w-full">
                <el-collapse-item :title="resourcesTitle">
                    <div class="text-xs text-gray-500 mb-1" @click="handleResourcesCommand(0)"> {{ $t('nav.resources.subMenus.0') }} </div>
                    <div class="text-xs text-gray-500 mb-1" @click="handleResourcesCommand(1)"> {{ $t('nav.resources.subMenus.1') }} </div>
                </el-collapse-item>
            </el-collapse>
        </div>    
        <div class="flex flex-grow" v-loading.fullscreen.lock="loading"></div>
    </div>
</template>

<style>
.ranks {
    font-size: 13px;
    color: #303133;
    font-weight: 500;
}
.el-collapse {
    border: none;
}
.el-collapse-item__content {
    padding-bottom: 0px;
}

.el-collapse-item__header {
    height: 40px;
    line-height: 40px;
    border: none;
}

.el-collapse-item__wrap {
    border: none;
}
</style>

<script>
export default {
    props: {
        mobileNavHidden: {
            type: Boolean,
            default:true
        }
    },
    data() {
        return {
            searchText:'',
            loading: false
        }
    },
    computed: {
        blockchainTitle() {
            return this.$t('nav.blocks.title')
        },
        chartTitle() {
            return this.$t('nav.charts.title')
        },
        resourcesTitle() {
            return this.$t('nav.resources.title')
        }
    },
    methods: {
        handleRanksSelect() {
            this.$router.push(this.localePath('/ranks'))
            this.hideIfNeeded()
        },
        handleBlocksCommand(index) {
            if (index == 0) {
                this.$router.push(this.localePath('/recent-tipsets'))
            }
            else if (index == 1) {
                this.$router.push(this.localePath('/messages'))
            }
            else {
                this.$router.push(this.localePath('/rich'))
            }
            this.hideIfNeeded()
        },
        handleChartsCommand(index) {
            if (index == 0) {
                this.$router.push(this.localePath('/charts/miner'))
            }
            else if (index == 1) {
                this.$message(this.$t('shared.notAvailable'))
                //this.$router.push(this.localePath('/charts/fil'))
            }
            this.hideIfNeeded()
        },
        handleResourcesCommand(index) {
            if (index == 0) {
                this.$message(this.$t('shared.notAvailable'))
                //this.$router.push(this.localePath('/resources/tools'))
            }
            else if (index == 1) {
                this.$message(this.$t('shared.notAvailable'))
                //this.$router.push(this.localePath('/resources/wiki'))
            }
            this.hideIfNeeded()
        },
        hideIfNeeded() {
            this.$emit('hideIfNeeded')
        },
        async search() {
            const id = this.searchText.trim()
            if (!id) {
                return
            }
            this.loading = true
            const result = await this.$axios.$get('/search', {params: {id}})
            switch (result?.type) {
            case 'tipset':
                this.searchString = ''
                this.$router.push(this.localePath('/tipset/' + result.height))
                break
            case 'block':
                this.searchString = ''
                this.$router.push(this.localePath('/block/' + result.cid))
                break
            case 'message':
                this.searchString = ''
                this.$router.push(this.localePath('/message/' + result.cid))
                break
            case 'address':
                this.searchString = ''
                this.$router.push(this.localePath('/address/' + result.address))
                break
            case 'peer':
                this.searchString = ''
                this.$router.push(this.localePath('/peer/' + result.id))
                break
            default:
                this.$message.error(this.$t('shared.noSearchResult'));
            }
            this.loading = false
            this.hideIfNeeded()
         }   
    }
}
</script>>