<template>
    <div class="flex flex-row items-center justify-center">
        <template v-if="type == 0" class="hidden lg:flex">
            <nuxt-link :to="localePath(`/merchant/${tag.merchant}`)" v-if="canClick" class=" hover:text-main"> {{ tag[$i18n.locale] ? tag[$i18n.locale] : '--'}} </nuxt-link>
            <div v-else> {{ tag[$i18n.locale] ? tag[$i18n.locale] : '--'}} </div>
        </template>
        <Signed :content="$t('tag.signed')" v-if="tag.signed && type== 0"/>
        <template v-if="type == 1">
            <nuxt-link :to="localePath(`/merchant/${tag.merchant}`)" v-if="canClick" class="hover:text-main hover:border-main hidden lg:flex ml-2 text-xs rounded-full px-2 border border-gray-400 items-center"> {{ tag[$i18n.locale] ? tag[$i18n.locale] : '--'}}<Signed :content="$t('tag.signed')" v-if="tag.signed && type== 1"/> </nuxt-link>
            <div v-else class="hidden lg:flex ml-2 text-xs rounded-full px-2 border border-gray-400 items-center"> {{ tag[$i18n.locale] ? tag[$i18n.locale] : '--'}}<Signed :content="$t('tag.signed')" v-if="tag.signed && type== 1"/> </div>
        </template>
        <div class="lg:hidden text-xs bg-background rounded-full px-2 text-gray-500 flex ml-1 items-center" v-if="type == 2"> 
            {{ tag[$i18n.locale] ? tag[$i18n.locale] : '--'}} 
            <Signed :content="$t('tag.signed')" v-if="tag.signed && type== 2"/>
        </div>
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
    },
    computed: {
        canClick() {
            return this.tag.merchant != null ? true: false
        }
    }
}
</script>