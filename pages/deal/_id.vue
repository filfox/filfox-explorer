<template>
  <div>
    <div class="bg-background lg:hidden">
      <div class="pl-4 border-b border-background bg-white">
        <div class="text-sm font-medium pt-2">
          {{ $t('detail.deal.title') }}
        </div>
        <div class="text-xs my-1">
          #{{ id }}
        </div>
      </div>
      <div class="px-4 bg-white flex justify-between pt-2">
        <p class="text-gray-600 text-xs">
          {{ $t('detail.deal.headers.id') }}
        </p>
        <DealLink :id="deal.id" class="text-xs" />
      </div>
      <div class="px-4 bg-white flex justify-between pt-1">
        <p class="text-gray-600 text-xs">
          {{ $t('detail.deal.headers.createTime') }}
        </p>
        <p class="text-xs">
          {{ deal.timestamp | timestamp('datetime') }}
        </p>
      </div>
      <div class="px-4 bg-white flex justify-between pt-1">
        <p class="text-gray-600 text-xs">
          {{ $t('detail.deal.headers.block') }}
        </p>
        <p class="text-xs">
          <TipsetLink :id="deal.height" class="text-xs" />
        </p>
      </div>
      <div class="px-4 bg-white flex justify-between pt-1 text-xs">
        <p class="text-gray-600">
          {{ $t('detail.deal.headers.message') }}
        </p>
        <MessageLink v-if="deal.message" :id="deal.message" />
        <p v-else>
          N/A
        </p>
      </div>
      <div class="px-4 bg-white flex justify-between pt-1">
        <p class="text-gray-600 text-xs">
          {{ $t('detail.deal.headers.cid') }}
        </p>
        <p class="text-xs break-all text-right w-2/3">
          {{ deal.pieceCid }}
        </p>
      </div>
      <div class="px-4 bg-white flex justify-between pt-1">
        <p class="text-gray-600 text-xs">
          {{ $t('detail.deal.headers.verified') }}
        </p>
        <p class="text-xs">
          {{ deal.verifiedDeal }}
        </p>
      </div>
      <div class="px-4 bg-white flex justify-between pt-1 pb-2">
        <p class="text-gray-600 text-xs">
          {{ $t('detail.deal.headers.status') }}
        </p>
        <p class="text-xs">
          {{ deal.status ? deal.status : 'N/A' }}
        </p>
      </div>

      <div class="mt-2 bg-white flex flex-col text-xs">
        <div class="flex flex-col justify-center items-center mt-4">
          <p class="text-xs">
            {{ $t('detail.deal.headers.client') }}
          </p>
          <img src="~/assets/img/deal/client.svg" alt="client" class="w-10 mt-1">
          <div class="flex items-center mt-1">
            <AddressLink :id="deal.client" :format="4" class="text-main" />
            <MinerTag v-if="deal.clientTag" :tag="deal.clientTag" :type="2" class="ml-1" />
          </div>
          <p class="text-xs mt-1">
            {{ $t('detail.deal.headers.collateral') }} : {{ deal.clientCollateral | filecoin(4) }}
          </p>
        </div>
        <div class="flex justify-center items-center my-4">
          <div class="bg-background rounded-md w-full py-4 mx-8">
            <div class="flex justify-center">
              <img src="~/assets/img/deal/file.svg" alt="client" class="w-5 mr-2">
              <p>{{ deal.pieceSize | size_metric(2) }}</p>
            </div>
            <div class="mt-1 justify-center flex">
              <img src="~/assets/img/deal/arrow-vertical.svg" alt="arrow" class="h-full w-2">
            </div>
            <div class="text-center text-xs text-dealTimeText mt-1">
              {{ deal.startTimestamp | timestamp('datetime') }} {{ $t('detail.deal.headers.to') }} {{ deal.endTimestamp | timestamp('datetime') }}
            </div>
            <div class="text-center text-xs mt-1">
              {{ $t('detail.deal.headers.fee') }}:{{ deal.storagePrice | filecoin }}
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center my-4">
          <p class="text-xs">
            {{ $t('detail.deal.headers.provider') }}
          </p>
          <img src="~/assets/img/deal/provider.svg" alt="provider" class="w-10 mt-1">
          <div class="flex items-center mt-1">
            <AddressLink :id="deal.provider" :format="4" class="text-main" />
            <MinerTag v-if="deal.providerTag" :tag="deal.providerTag" :type="2" class="ml-1" />
          </div>
          <p class="text-xs mt-1">
            {{ $t('detail.deal.headers.collateral') }} : {{ deal.providerCollateral | filecoin(4) }}
          </p>
        </div>
      </div>
    </div>

    <div class="hidden container mx-auto lg:block text-sm">
      <div class="mt-6 font-medium">
        {{ $t('detail.deal.title') }} #{{ id }}
      </div>
      <div class="rounded-md my-4 bg-white pb-2">
        <div class="border-b border-background pt-2 pb-2">
          <dl class="flex my-2 items-center">
            <dt class="w-9/50 pl-8 text-gray-600 px-2">
              {{ $t('detail.deal.headers.id') }}
            </dt>
            <dd class="flex mr-4">
              <DealLink :id="deal.id" />
            </dd>
          </dl>

          <dl class="flex my-2 items-center">
            <dt class="w-9/50 pl-8 text-gray-600 px-2">
              {{ $t('detail.deal.headers.createTime') }}
            </dt>
            <dd class="flex mr-4">
              {{ deal.timestamp | timestamp('datetime') }}
            </dd>
          </dl>

          <dl class="flex my-2 items-center">
            <dt class="w-9/50 pl-8 text-gray-600 px-2">
              {{ $t('detail.deal.headers.block') }}
            </dt>
            <dd class="flex mr-4">
              <TipsetLink :id="deal.height" />
            </dd>
          </dl>

          <dl class="flex my-2 items-center">
            <dt class="w-9/50 pl-8 text-gray-600 px-2">
              {{ $t('detail.deal.headers.message') }}
            </dt>
            <dd class="flex mr-4">
              <MessageLink v-if="deal.message" :id="deal.message" />
              <p v-else>
                N/A
              </p>
            </dd>
          </dl>

          <dl class="flex my-2 items-center">
            <dt class="w-9/50 pl-8 text-gray-600 px-2">
              {{ $t('detail.deal.headers.cid') }}
            </dt>
            <dd class="flex mr-4">
              {{ deal.pieceCid }}
            </dd>
          </dl>

          <dl class="flex my-2 items-center">
            <dt class="w-9/50 pl-8 text-gray-600 px-2">
              {{ $t('detail.deal.headers.verified') }}
            </dt>
            <dd class="flex mr-4">
              {{ deal.verifiedDeal }}
            </dd>
          </dl>

          <dl class="flex my-2 items-center">
            <dt class="w-9/50 pl-8 text-gray-600 px-2">
              {{ $t('detail.deal.headers.status') }}
            </dt>
            <dd class="flex mr-4">
              {{ deal.status ? deal.status : 'N/A' }}
            </dd>
          </dl>
        </div>
        <p class="text-sm py-4 pl-8">
          {{ $t('detail.deal.storageDetail') }}
        </p>
        <div class="flex flex-row h-48 text-sm">
          <div class="w-1/4 flex flex-col justify-center items-center">
            <p class="text-xs">
              {{ $t('detail.deal.headers.client') }}
            </p>
            <img src="~/assets/img/deal/client.svg" alt="client" class="w-10 mt-1">
            <div class="flex items-center mt-1">
              <AddressLink :id="deal.client" :format="4" class="text-main" />
              <MinerTag v-if="deal.clientTag" :tag="deal.clientTag" :type="1" />
            </div>
            <p class="text-xs mt-1">
              {{ $t('detail.deal.headers.collateral') }} : {{ deal.clientCollateral | filecoin(4) }}
            </p>
          </div>
          <div class="w-1/2 flex justify-center items-center">
            <div class="bg-background rounded-md w-full py-4">
              <div class="flex justify-center">
                <img src="~/assets/img/deal/file.svg" alt="client" class="w-5 mr-2">
                <p>{{ deal.pieceSize | size_metric(2) }}</p>
              </div>
              <div class="mt-1">
                <img src="~/assets/img/deal/arrow-horizontal.svg" alt="arrow" class="w-full h-3">
              </div>
              <div class="text-center text-xs text-dealTimeText mt-1">
                {{ deal.startTimestamp | timestamp('datetime') }} {{ $t('detail.deal.headers.to') }} {{ deal.endTimestamp | timestamp('datetime') }}
              </div>
              <div class="text-center text-xs mt-1">
                {{ $t('detail.deal.headers.fee') }}:{{ deal.storagePrice | filecoin }}
              </div>
            </div>
          </div>
          <div class="w-1/4 flex flex-col justify-center items-center">
            <p class="text-xs">
              {{ $t('detail.deal.headers.provider') }}
            </p>
            <img src="~/assets/img/deal/provider.svg" alt="provider" class="w-10 mt-1">
            <div class="flex items-center mt-1">
              <AddressLink :id="deal.provider" :format="4" class="text-main" />
              <MinerTag v-if="deal.providerTag" :tag="deal.providerTag" :type="1" />
            </div>
            <p class="text-xs mt-1">
              {{ $t('detail.deal.headers.collateral') }} : {{ deal.providerCollateral | filecoin(4) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  async asyncData({ $axios, error, params }) {
    try {
      const [deal] = await Promise.all([
        $axios.$get(`/deal/${params.id}`)
      ])
      return { deal }
    } catch (err) {
      if (err?.response) {
        if (err.response.code === 404) {
          error({ code: 404, message: `Deal ${params.id} not found` })
        } else {
          error({ code: err.response.status, message: err.response.statusText })
        }
      } else {
        error({ code: 500, message: err.toString() })
      }
    }
  },
  data() {
    return {
      deal: {}
    }
  },
  computed: {
    id() {
      return Number(this.$route.params.id)
    }
  },
  head() {
    return {
      title: `${this.$t('meta.titles.deal')} ${this.id}`
    }
  }
}
</script>
