<template>
    <nav class="mx-auto bg-main h-28 w-full ">
       <div class="flex h-16 container mx-auto items-center pt-2">
           <nuxt-link :to="localePath('/')">
               <img src="~/assets/img/home/logo.svg" alt="filFox.io" class="cursor-pointer h-6 ml-4 lg:h-8 xl:ml-0">
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