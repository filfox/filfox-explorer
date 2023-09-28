<template>
  <div v-loading="loading" class="min-h-60 py-2 lg:py-4 bg-white">
    <div class="flex items-center mx-4 my-2 p-2 lg:px-4 bg-gray-100 text-gray-500">
      <span class="text-xs lg:text-sm">
        {{ $t('detail.message.internaltransfer.contractFrom') }}
        <AddressLink v-if="message.from" :id="message.from" :format="8" class="text-main mx-1 lg:mx-2" />
        {{ $t('detail.message.internaltransfer.contractTo') }}
        <AddressLink v-if="message.to" :id="message.to" :format="8" class="text-main mr-1 lg:mx-2" />
        {{ $t('detail.message.internaltransfer.produced', { amount: subcalls.length }) }}
      </span>
    </div>
    <div class="px-4 overflow-auto">
      <div class="mt-2 hidden lg:block">
        <div class="flex text-center text-gray-600">
          <span style="width: 5%"></span>
          <span style="width: 19%">{{ $t('detail.message.internaltransfer.method') }}</span>
          <span style="width: 19%">{{ $t('detail.message.internaltransfer.from') }}</span>
          <span class="flex-1"></span>
          <span style="width: 19%">{{ $t('detail.message.internaltransfer.to') }}</span>
          <span style="width: 19%">{{ $t('detail.message.internaltransfer.value') }}</span>
        </div>
        <div
          v-for="(transfer, index) in subcalls"
          :key="index"
          :class="{ 'border-t': index }"
          class="border-background py-2.75 cursor-pointer hover:bg-gray-100 transition duration-200"
          @click="transfer.expand = !transfer.expand"
        >
          <div class="flex items-center text-center">
            <span style="width: 5%"><i
              class="el-icon-arrow-right transform duration-200 transition"
              :class="{ 'rotate-90': transfer.expand }"
            ></i></span>
            <span style="width: 19%">{{ transfer.method || 'N/A' }}</span>
            <span style="width: 19%">
              <AddressLink v-if="transfer.from" :id="transfer.from" :format="8" class="hover:text-main hover:underline" />
            </span>
            <span class="flex-1">
              <img src="~/assets/img/shared/to.svg" alt="3" class="mx-auto w-4">
            </span>
            <span style="width: 19%">
              <AddressLink v-if="transfer.to" :id="transfer.to" :format="8" class="hover:text-main hover:underline" />
              <span v-else>N/A</span>
              <AddressTag :tag="transfer.toTag" type="pc" :style="{ maxWidth:'66%' }" />
            </span>
            <span style="width: 19%">{{ transfer.value | filecoin }}</span>
          </div>
          <div v-if="transfer.expand" class="px-6.5 py-4">
            <vue-json-pretty :data="transfer" />
          </div>
        </div>
      </div>

      <!-- mobile -->
      <ul class="lg:hidden">
        <li
          v-for="(transfer, index) in subcalls"
          :key="index"
          :class="{ 'border-t': index }"
          class="py-2 text-xs leading-5"
        >
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('detail.message.internaltransfer.method') }}</span>
            <span>{{ transfer.method }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('detail.message.internaltransfer.from') }}</span>
            <AddressLink v-if="transfer.from" :id="transfer.from" :format="12" />
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('detail.message.internaltransfer.to') }}</span>
            <AddressLink v-if="transfer.to" :id="transfer.to" :format="12" />
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">{{ $t('detail.message.internaltransfer.value') }}</span>
            <span>{{ transfer.value | filecoin }}</span>
          </div>
          <div class="flex justify-between items-center" @click="transfer.expand = !transfer.expand">
            <span class="text-gray-600">{{ $t('shared.more') }}</span>
            <i
              class="el-icon-arrow-right transform duration-200 transition"
              :class="{ 'rotate-90': transfer.expand }"
            ></i>
          </div>
          <div v-if="transfer.expand">
            <vue-json-pretty :data="transfer" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: { type: Object, default: () => ({}) }
  },

  data() {
    return { subcalls: [], loading: false }
  },

  async mounted() {
    this.loading = true
    const list = await this.$axios.$get(`/message/${this.message.cid}/subcalls`)
    this.subcalls = list.map(item => ({ ...item, expand: false }))
    this.loading = false
  }
}
</script>
