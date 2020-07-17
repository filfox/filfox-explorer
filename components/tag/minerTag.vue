<template>
    <div class="flex flex-row items-center justify-center">
        <div class="hidden lg:flex" :class="{'cursor-pointer text-main': canClick}" v-if="type == 0" @click="didTagClicked" @mouseover="mouseOver()" @mouseleave="mouseLeave()"> {{ tag[$i18n.locale] ? tag[$i18n.locale] : '--'}} </div>
        <div class="hidden lg:flex ml-2 text-xs rounded-full px-2 border border-gray-400 items-center" :class="{'cursor-pointer text-main border-main': canClick}" v-if="type == 1" @mouseover="mouseOver()" @mouseleave="mouseLeave()" @click="didTagClicked"> 
            {{ tag[$i18n.locale] ? tag[$i18n.locale] : '--'}} 
            <Signed :content="$t('tag.signed')" v-if="tag.signed && type== 1"/>
        </div>
        <div class="lg:hidden text-xs bg-background rounded-full px-2 text-gray-500 flex ml-1 items-center" v-if="type == 2"> 
            {{ tag[$i18n.locale] ? tag[$i18n.locale] : '--'}} 
            <Signed :content="$t('tag.signed')" v-if="tag.signed && type== 2"/>
        </div>
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
    },
    data() {
        return {
            canClick: false
        }
    },
    methods: {
        didTagClicked() {
            if (this.tag.merchant != null) {
                this.$router.push(this.localePath(`/merchant/${this.tag.merchant}`))
            }
        },
        mouseOver() {
            if (this.tag.merchant != null) {
                this.canClick = true
            }
            else {
                this.canClick = false
            }
        },
        mouseLeave(obj) {
            this.canClick = false
        }
    }
}
</script>