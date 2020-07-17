<template>
    <nav class="mx-auto bg-main h-28 w-full">
       <div class="flex h-16 container mx-auto items-center pt-2 flex-row justify-between">
           <nuxt-link :to="localePath('/')">
               <img src="~/assets/img/home/logo.svg" alt="filFox.io" class="cursor-pointer h-6 lg:h-8 ml-4 sm:ml-0">
           </nuxt-link>
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

export default {
    components: {
        navigationBar
    },
    data() {
        return {
            mobileNavHidden: true,
            languages: ['中文','English','한국어'],
            selectedLanguage: this.$i18n.locale === 'zh' ? '中文' : 'English'
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
            else {
                if (this.$i18n.locale == 'en') {
                    return
                }
                this.$i18n.locale = 'en'
            }
            this.selectedLanguage = this.$i18n.locale === 'zh' ? '中文' : 'English'
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