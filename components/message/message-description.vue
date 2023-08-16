<template>
  <i18n
    v-if="detail.type === 'transfer'"
    path="detail.message.description.transfer"
    tag="p"
  >
    <template #sender>
      <AddressLink :id="detail.sender" :format="8" class="text-main" />
    </template>
    <template #receiver>
      <AddressLink :id="detail.receiver" :format="8" class="text-main" />
    </template>
    <template #value>
      {{ detail.value | filecoin(4) }}
    </template>
  </i18n>
  <p v-else-if="detail.type === 'create-account'">
    <i18n v-if="detail.value === '0'" path="detail.message.description.create-account">
      <template #createBy>
        <AddressLink :id="detail.createBy" :format="8" class="text-main" />
      </template>
      <template #actor>
        {{ $t(`actor.${detail.actor}`) }}
      </template>
      <template #idAddress>
        <AddressLink :id="detail.idAddress" :format="8" class="text-main" />
      </template>
    </i18n>
    <i18n v-else path="detail.message.description.create-account:transfer">
      <template #createBy>
        <AddressLink :id="detail.createBy" :format="8" class="text-main" />
      </template>
      <template #actor>
        {{ $t(`actor.${detail.actor}`) }}
      </template>
      <template #idAddress>
        <AddressLink :id="detail.idAddress" :format="8" class="text-main" />
      </template>
      <template #value>
        {{ detail.value | filecoin(4) }}
      </template>
    </i18n>
  </p>
  <p v-else></p>
</template>

<script>
export default {
  props: {
    detail: { type: Object, required: true }
  }
}
</script>
