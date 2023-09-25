<template>
  <div>
    <MessageTransfers v-if="message.transfers && message.transfers.length" :message="message" />
    <MessageTokenTransfers v-if="message.tokenTransfers && message.tokenTransfers.length" :message="message" />
  </div>
</template>

<script>
export default {
  props: {
    message: { type: Object, required: true }
  }
}
</script>
