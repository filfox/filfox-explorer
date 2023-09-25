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
      <nuxt-link
        :to="localePath(`/message/internalTransfer/${message.cid}`)"
        target="_blank"
        class="ml-auto"
      >
        <el-button size="mini" round>
          {{ $t('shared.more') }}
        </el-button>
      </nuxt-link>
    </div>
    <div class="px-4 overflow-auto">
      <table class="hidden lg:table w-full table-fixed">
        <thead class="text-gray-600 text-sm m-2">
          <tr class="h-8">
            <th class="sticky top-0 bg-white z-10 w-1/4 font-normal">
              {{ $t('detail.message.internaltransfer.method') }}
            </th>
            <th class="sticky top-0 bg-white z-10 w-1/4 font-normal">
              {{ $t('detail.message.internaltransfer.from') }}
            </th>
            <th class="sticky top-0 bg-white z-10 w-1/8">
            </th>
            <th class="sticky top-0 bg-white z-10 w-1/4 font-normal">
              {{ $t('detail.message.internaltransfer.to') }}
            </th>
            <th class="sticky top-0 bg-white z-10 w-1/8 font-normal">
              {{ $t('detail.message.internaltransfer.value') }}
            </th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr
            v-for="(transfer, index) in subcalls"
            :key="index"
            :class="{ 'border-t': index }"
            class="h-11 border-background text-sm"
          >
            <td>
              <div class="flex items-center flex-row justify-center">
                {{ transfer.method }}
              </div>
            </td>
            <td>
              <div class="flex items-center flex-row justify-center">
                <AddressLink v-if="transfer.from" :id="transfer.from" :format="8" />
              </div>
            </td>
            <td>
              <div class="flex justify-center">
                <img src="~/assets/img/shared/to.svg" alt="3" class="w-4">
              </div>
            </td>
            <td>
              <div class="flex items-center flex-row justify-center">
                <AddressLink v-if="transfer.to" :id="transfer.to" :format="8" />
                <span v-else>N/A</span>
                <AddressTag :tag="transfer.toTag" type="pc" :style="{ maxWidth:'66%' }" />
              </div>
            </td>
            <td>
              {{ transfer.value | filecoin }}
            </td>
          </tr>
        </tbody>
      </table>
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
    this.subcalls = await this.$axios.$get(`/message/${this.message.cid}/subcalls`)
    this.loading = false
  }
}
</script>
