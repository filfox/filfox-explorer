<template>
    <div class="flex text-center m-auto"> 
        <img v-if="index === 1" src="~/assets/img/home/first.png" alt="1" class="m-auto w-6"/>
        <img v-if="index === 2" src="~/assets/img/home/second.png" alt="1" class="m-auto w-6"/>
        <img v-if="index === 3" src="~/assets/img/home/third.png" alt="1" class="m-auto w-6"/>
        <p v-if="index > 3" class="flex text-center m-auto"> {{ index }} </p>
    </div>
</template>

<script>
export default {
    props: {
        index: {
            type: Number,
            default: 1
        }
    }
}
</script>