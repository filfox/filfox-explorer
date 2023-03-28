<template>
  <div>
    <div class="bg-white rounded-md pb-2 mb-4 hidden lg:block">
      <div class="flex justify-between items-center p-4">
        <span class="text-sm lg:text-base flex items-center">
          <img src="../../assets/img/home/icon-fns.svg" alt="FNS" class="h-5 mr-2">
          {{ $t('fns.registrations.title') }}
        </span>
        <NuxtLink
          :to="localePath('/fns')"
          class="px-4 py-1 rounded-full border border-customGray-300 text-xs text-customGray-500 hover:border-main hover:text-main transition duration-200"
        >
          {{ $t('shared.more') }}
        </NuxtLink>
      </div>
      <table class="w-full text-sm font-light border-t border-customGray-100">
        <tr>
          <th
            v-for="({ key, label }, index) in columns"
            :key="key"
            :class="[index ? 'w-auto' : 'w-1/3']"
            class="text-customGray-400 text-sm font-light pt-4 pb-1"
          >
            {{ label }}
          </th>
        </tr>
        <tr v-for="{ owner, name, expires } in names" :key="name" class="text-center">
          <td>
            <AddressLink :id="owner" :format="18" class="text-main" />
          </td>
          <td>{{ name }}</td>
          <td>{{ expires | timestamp('datetime') }}</td>
          <td>
            <NuxtLink
              :to="localePath(`/fns/name/${name}`)"
              class="px-4 py-1 rounded text-xs font-semibold text-main bg-customBlue-200 border border-transparent hover:border-main transition duration-200"
            >
              {{ $t('shared.more') }}
            </NuxtLink>
          </td>
        </tr>
      </table>
    </div>
    <ul class="block lg:hidden my-2 bg-white p-3 text-xs font-light">
      <li
        v-for="item in names"
        :key="item.name"
        class="border-b border-customGray-100 py-2"
      >
        <div v-for="{ key, label } in columnsMobile" :key="key" class="flex justify-between items-center my-2">
          <span class="text-customGray-400">{{ label }}</span>
          <AddressLink v-if="key == 'owner'" :id="item[key]" :format="12" class="text-main" />
          <span v-else class="w-2/3 break-all text-right">{{ item[key] | lookfortime('datetime') }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { fnsServer } from '@/filecoin/filecoin.config'

export default {
  data() {
    return {
      columns: [
        { key: 'owner', label: this.$t('fns.registrations.address') },
        { key: 'name', label: this.$t('fns.registrations.name') },
        { key: 'expires', label: this.$t('fns.registrations.expiration') },
        { key: 'handle', label: this.$t('fns.registrations.handle') }
      ],
      names: []
    }
  },
  computed: {
    columnsMobile() {
      return this.columns.filter(({ key }) => key !== 'handle')
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const data = await this.$axios.$get(`${fnsServer}/registration/list`, {
        params: { pageSize: 10, page: 1 }
      })
      this.names = data.data.list
    }
  }
}
</script>

<style lang="postcss" scoped>
table {
  table-layout: auto;
  & td {
    @apply py-3 border-b border-customGray-100;
  }
  & tr:last-child td {
    @apply border-none;
  }
}
</style>
