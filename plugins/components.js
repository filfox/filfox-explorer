import Vue from 'vue'
import Link, { createLink } from '@/components/link'

Vue.component('Link', Link)
// Vue.component('AddressLink', createLink('address'))
Vue.component('BlockLink', createLink('block'))
Vue.component('MessageLink', createLink('message'))
Vue.component('PeerLink', createLink('peer'))
Vue.component('TipsetLink', createLink('tipset'))
Vue.component('DealLink', createLink('deal'))
