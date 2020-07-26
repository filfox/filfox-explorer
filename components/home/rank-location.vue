<template>
    <div class="flex flex-row justify-center m-auto items-center text-center">
        <img v-if="location === 'unknown' || location == null" src="~/assets/img/home/unknown.png" alt="unknown" class="flex w-6 mr-2">
        <!-- <img v-if="location === 'japan'" src="~/assets/img/home/japan.png" alt="japan" class="w-6 mr-2"> -->
        <p class="flex"> {{ name }} </p>
    </div>
</template>

<script>
export default {
    props: {
        location: {
            type: String,
            default: 'unknown'
        },
        name: {
            type: String,
            default: '未知'
        }
    }
}
</script>
