<template>
    <nav class="mx-auto bg-main h-28 w-full">
       <div class="flex h-16 container mx-0 lg:mx-auto items-center pt-2 flex-row justify-between">
           <nuxt-link :to="localePath('/')">
               <img src="~/assets/img/home/logo.svg" alt="filFox.io" class="cursor-pointer h-6 lg:h-8 ml-4 lg:ml-0">
           </nuxt-link>
           <button class="flex lg:hidden outline-none focus:outline-none mr-4" @click="didMobileMenuClicked">
               <img src="~/assets/img/home/menu.svg" alt="menu" class="cursor-pointer h-3">
           </button>
       </div>
       <navigationBar class="hidden lg:flex"/>
       <NavigationBarMobile class="lg:hidden" :class="{'hidden':mobileNavHidden}"/>
    </nav>
</template>

<script>
import navigationBar from "~/components/shared/navigation-bar";

export default {
    components: {
        navigationBar
    },
    data() {
        return {
            mobileNavHidden: true
        }
    },
    methods: {
        didMobileMenuClicked() {
            this.mobileNavHidden = !this.mobileNavHidden
        }
    }
}
</script>