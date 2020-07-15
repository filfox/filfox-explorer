<template>
    <div class="flex flex-row items-center justify-center">
        <div class="hidden lg:flex" v-if="type == 0"> {{ tag[$i18n.locale] ? tag[$i18n.locale] : '--'}} </div>
        <div class="hidden lg:flex ml-2 text-xs rounded-full px-2 border border-gray-400 items-center" v-if="type == 1"> 
            {{ tag[$i18n.locale] ? tag[$i18n.locale] : '--'}} 
            <Signed :content="$t('tag.signed')" v-if="tag.signed && type== 1"/>
        </div>
        <div class="flex lg:hidden" v-if="type == 2"> {{ tag[$i18n.locale] ? tag[$i18n.locale] : '--'}} </div>
        <Signed :content="$t('tag.signed')" v-if="tag.signed && type== 0"/>
    </div>
</template>

<script>
export default {
    props: {
        tag: {
            type: Object,
            default() {
                return {}
            }
        },
        // 0 is normal, 1 is rounded for pc, 2 is for mobile
        type: {
            type: Number,
            default:0
        }
    }
}
</script>