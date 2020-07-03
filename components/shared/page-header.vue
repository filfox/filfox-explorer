<template>
    <nav class="mx-auto bg-main h-28 w-full">
       <div class="flex h-16 container mx-0 lg:mx-auto items-center pt-2">
           <nuxt-link :to="localePath('/')">
               <img src="~/assets/img/home/logo.svg" alt="filFox.io" class="cursor-pointer h-6 lg:h-8 ml-4 lg:ml-0">
           </nuxt-link>
       </div>
       <navigationBar/>
    </nav>
</template>

<script>
import navigationBar from "~/components/shared/navigation-bar";

export default {
    components: {
        navigationBar
    }
}
</script>