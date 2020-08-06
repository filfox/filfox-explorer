<template>
  <div class="pb-4">
    <div class="bg-white pb-3">
      <p class="pl-4 py-3 border-b border-background text-xs font-medium">
        {{ $t('detail.message.modules.overview') }}
      </p>
      <div class="flex justify-between items-center text-xs mx-4 mt-2">
        <p class="flex w-1/4">
          {{ $t('detail.message.headers.cid') }}
        </p>
        <MessageLink :id="message.cid" class="flex w-3/4" />
      </div>

      <div class="flex justify-between items-center text-xs mx-4 mt-2">
        <p class="flex w-1/4">
          {{ $t('detail.message.headers.height') }}
        </p>
        <TipsetLink :id="message.height" class=" text-main flex w-3/4" />
      </div>

      <div class="flex justify-between items-center text-xs mx-4 mt-2">
        <p class="flex w-1/4">
          {{ $t('detail.message.headers.time') }}
        </p>
        <p class="flex w-3/4">
          {{ message.timestamp | timestamp }}
        </p>
      </div>

      <div class="flex justify-between items-center text-xs mx-4 mt-2">
        <p class="flex w-1/4">
          {{ $t('detail.message.headers.inBlocks') }}
        </p>
        <div class="w-3/4">
          <p v-for="block in message.blocks" :key="block" class="items-center flex text-main mt-2">
            <BlockLink :id="block" />
          </p>
        </div>
      </div>

      <div class="flex justify-between items-center text-xs mx-4 pt-2">
        <p class="flex w-1/4">
          {{ $t('detail.message.headers.from') }}
        </p>
        <AddressLink :id="message.from" class="text-main w-3/4" />
      </div>

      <div class="flex justify-between items-center text-xs mx-4 pt-2">
        <p class="flex w-1/4">
          {{ $t('detail.message.headers.to') }}
        </p>
        <AddressLink :id="message.to" class="text-main w-3/4" />
      </div>

      <div class="flex justify-between items-center text-xs mx-4 pt-2">
        <p class="flex w-1/4">
          {{ $t('detail.message.headers.method') }}
        </p>
        <p class="flex w-3/4">
          {{ message.method || 'N/A' }}
        </p>
      </div>

      <div class="flex justify-between items-center text-xs mx-4 pt-2">
        <p class="flex w-1/4">
          {{ $t('detail.message.headers.value') }}
        </p>
        <p class="flex w-3/4">
          {{ message.value | filecoin }}
        </p>
      </div>

      <div class="flex justify-between items-center text-xs mx-4 pt-2">
        <p class="flex w-1/4">
          {{ $t('detail.message.headers.gasPrice') }}
        </p>
        <p class="flex w-3/4">
          {{ message.gasPrice | filecoin }}
        </p>
      </div>

      <div class="flex justify-between items-center text-xs mx-4 pt-2">
        <p class="flex w-1/4">
          {{ $t('detail.message.headers.gasLimit') }}
        </p>
        <p class="flex w-3/4">
          {{ message.gasLimit | locale }}
        </p>
      </div>
      <template v-if="message.receipt">
        <div class="flex justify-between items-center text-xs mx-4 pt-2">
          <p class="flex w-1/4">
            {{ $t('detail.message.headers.gasUsed') }}
          </p>
          <p class="flex w-3/4">
            {{ message.receipt.gasUsed | locale }}
          </p>
        </div>

        <div class="flex justify-between items-center text-xs mx-4 pt-2">
          <p class="flex w-1/4">
            {{ $t('detail.message.headers.exitCode') }}
          </p>
          <p class="flex w-3/4">
            {{ message.receipt.exitCode | exit-code }}
          </p>
        </div>
      </template>
    </div>

    <div v-if="message.transfers && message.transfers.length > 0" class="bg-white mt-2 pb-3">
      <p class="pl-4 py-3 border-b border-background text-xs font-medium">
        {{ $t('detail.message.modules.transfer') }}
      </p>
      <div v-for="(transfer, index) in message.transfers" :key="index" class="rounded-sm mx-3 mt-3 shadow bg-white py-2">
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.message.transfer.from') }}:
          </p>
          <div class="flex items-center flex-row justify-end">
            <AddressLink v-if="transfer.from" :id="transfer.from" :format="4" class="text-xs text-main" />
            <span v-else class="text-xs text-gray-800"> N/A </span>
            <MinerTag v-if="transfer.fromTag" :tag="transfer.fromTag" :type="2" />
          </div>
        </div>
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.message.transfer.to') }}:
          </p>
          <div class="flex items-center flex-row justify-end">
            <AddressLink v-if="transfer.to" :id="transfer.to" :format="4" class="text-xs text-main" />
            <span v-else class="text-xs text-gray-800"> N/A </span>
            <MinerTag v-if="transfer.toTag" :tag="transfer.toTag" :type="2" />
          </div>
        </div>
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.message.transfer.value') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ transfer.value | filecoin(2) }}
          </p>
        </div>
        <div class="flex items-center justify-between mx-3 mt-1">
          <p class="text-xs text-gray-800">
            {{ $t('detail.message.transfer.type') }}:
          </p>
          <p class="text-xs text-gray-800">
            {{ $t('detail.transfer.types.' + transfer.type ) }}
          </p>
        </div>
      </div>
    </div>

    <div class="bg-white mt-2 pb-3">
      <p class="pl-4 py-3 border-b border-background text-xs font-medium">
        {{ $t('detail.message.modules.others') }}
      </p>
      <div class="flex justify-between items-center text-xs mx-4 pt-2">
        <p class="flex w-1/4">
          {{ $t('detail.message.headers.version') }}
        </p>
        <p class="flex w-3/4">
          {{ message.version }}
        </p>
      </div>

      <div class="flex justify-between items-center text-xs mx-4 pt-2">
        <p class="flex w-1/4">
          {{ $t('detail.message.headers.nonce') }}
        </p>
        <p class="flex w-3/4">
          {{ message.nonce }}
        </p>
      </div>
      <template v-if="message.receipt">
        <div v-if="message.receipt.exitCode === 0" class="flex justify-between items-center text-xs mx-4 pt-2">
          <p class="flex w-1/4">
            {{ $t('detail.message.headers.return') }}
          </p>
          <p class="flex w-3/4 break-all">
            {{ message.receipt.return ? message.receipt.return : $t('detail.message.null') }}
          </p>
        </div>
        <div v-else class="flex justify-between items-center text-xs mx-4 pt-2">
          <p class="flex w-1/4">
            {{ $t('detail.message.headers.error') }}
          </p>
          <p class="flex w-3/4">
            {{ message.error }}
          </p>
        </div>

        <div class="flex justify-between items-start text-xs mx-4 pt-2">
          <p class="flex w-1/4">
            {{ $t('detail.message.headers.params') }}
          </p>
          <p class="flex break-all w-3/4">
            {{ message.params ? message.params : $t('detail.message.null') }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: { type: Object, required: true }
  }
}
</script>
