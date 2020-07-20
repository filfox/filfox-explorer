<template>
    <nav class="mx-auto bg-main h-28 w-full">
       <div class="flex h-16 container mx-auto items-center pt-2 flex-row justify-between">
           <nuxt-link :to="localePath('/')">
               <img src="~/assets/img/home/logo.svg" alt="filFox.io" class="cursor-pointer h-6 lg:h-8 ml-4 sm:ml-0">
           </nuxt-link>

           <div class="flex flex-row">
                <div class="hidden lg:flex flex-row items-center mr-6" v-if="network.multipleNetworks">
                    <img src="~/assets/img/home/switchNet.svg" alt="net" class="mr-2 w-5 flex">
                    <p class="text-white text-sm"> {{ $t('shared.currentNetwork') }} </p>
                    <el-dropdown class="mr-3 lg:mr-0 flex items-center outline-none focus:outline-none" trigger="click" :hide-on-click="true">
                            <span class="el-dropdown-link text-background text-sm">
                                {{ network.networks[network.currentNetwork].name }} <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(dic,i) in network.networks" :key="i" :command="i">
                                    <a :href="dic.url" target="blank" v-if="network.currentNetwork != i"> {{ dic.name }} </a> 
                                    <template v-else> {{ dic.name }} </template>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                    </el-dropdown>
                </div>

                <div class="flex flex-row items-center">
                    <img src="~/assets/img/home/language.svg" alt="china" class="mr-2">
                        <el-dropdown @command="didLanguageSwitched" class="mr-3 lg:mr-0 flex items-center outline-none focus:outline-none" trigger="click" :hide-on-click="true">
                                <span class="el-dropdown-link text-background text-sm">
                                    {{selectedLanguage}} <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(title,i) in languages" :key="i" :command="i"> {{ title }} </el-dropdown-item>
                                </el-dropdown-menu>
                        </el-dropdown>
                        <button class="flex lg:hidden outline-none focus:outline-none mr-4 sm:mr-0 items-center h-10" @click="didMobileMenuClicked">
                            <img src="~/assets/img/home/menu.svg" alt="menu" class="cursor-pointer h-3">
                        </button>
                </div>
           </div>
       </div>
       <navigationBar class="hidden lg:flex"/>
       <NavigationBarMobile class="lg:hidden" :class="{'hidden':mobileNavHidden}" v-on:hideIfNeeded="hideIfNeeded" />
    </nav>
</template>

<style>
.el-dropdown-link {
    outline: none;
}
*:focus {
    outline: none;
}
</style>

<script>
import navigationBar from "~/components/shared/navigation-bar";
import nconfig from "~/filecoin/filecoin.network"

export default {
    components: {
        navigationBar
    },
    data() {
        return {
            mobileNavHidden: true,
            languages: ['中文','English','한국어'],
            localeMap: {
                zh : '中文',
                en: 'English',
                ko: '한국어'
            },
            network: nconfig.network
        }
    },
    computed: {
        selectedLanguage() {
            return this.localeMap[this.$i18n.locale]
        }
    },
    methods: {
        didMobileMenuClicked() {
            this.mobileNavHidden = !this.mobileNavHidden
        },
        hideIfNeeded() {
            this.mobileNavHidden = true
        },
        didLanguageSwitched(command) {
            if (command == 0) {
                if (this.$i18n.locale == 'zh') {
                    return
                }
                this.$i18n.locale = 'zh'
            }
            else if(command == 1){
                if (this.$i18n.locale == 'en') {
                    return
                }
                this.$i18n.locale = 'en'
            }
            else {
                if (this.$i18n.locale == 'ko') {
                    return
                }
                this.$i18n.locale = 'ko'
            }
            if (this.$route.path.length == 3) {
                this.$router.push(this.localePath('/'))
            }
            else {
                this.$router.push(this.localePath(this.$route.path.slice(3)))
            }
        }
    },
}
</script>