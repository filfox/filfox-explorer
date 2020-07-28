<template>
  <div class="bg-white pb-4">
    <div class="font-medium text-sm pl-4 py-3 border-b border-background">
      {{ $t('detail.message.title') }}
    </div>

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
        {{ $t('detail.message.headers.version') }}
      </p>
      <p class="flex w-3/4">
        {{ message.version }}
      </p>
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
        {{ $t('detail.message.headers.nonce') }}
      </p>
      <p class="flex w-3/4">
        {{ message.nonce }}
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 pt-2">
      <p class="flex w-1/4">
        {{ $t('detail.message.headers.method') }}
      </p>
      <p class="flex w-3/4">
        {{ message.method }}
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 pt-2">
      <p class="flex w-1/4">
        {{ $t('detail.message.headers.value') }}
      </p>
      <p class="flex w-3/4">
        {{ message.value | filecoin(4) }}
      </p>
    </div>

    <div class="flex justify-between items-center text-xs mx-4 pt-2">
      <p class="flex w-1/4">
        {{ $t('detail.message.headers.gasPrice') }}
      </p>
      <p class="flex w-3/4">
        {{ message.gasPrice | filecoin() }}
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

      <div v-if="message.receipt.exitCode === 0" class="flex justify-between items-center text-xs mx-4 pt-2">
        <p class="flex w-1/4">
          {{ $t('detail.message.headers.return') }}
        </p>
        <p class="flex w-3/4">
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
</template>

<script>
export default {
  props: {
    message: { type: Object, required: true }
  }
}
</script>
