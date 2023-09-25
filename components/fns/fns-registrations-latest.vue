<template>
  <div v-loading="loading" class="min-h-60">
    <table class="hidden lg:table w-full table-fixed text-sm mt-3">
      <thead class="text-gray-600 text-sm">
        <tr>
          <th
            v-for="({ key, label }, index) in columns"
            :key="key"
            :class="[index ? 'w-auto' : 'w-1/3']"
            class="text-customGray-400 text-sm font-normal"
          >
            {{ label }}
          </th>
        </tr>
      </thead>
      <tbody class="text-center text-sm">
        <tr
          v-for="({ owner, name, expires }, index) in names"
          :key="name"
          :class="{ 'border-t': index != 0 }"
          class="border-background h-10 transition duration-200 hover:bg-customBlue-200"
        >
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
      </tbody>
    </table>
    <ul class="block lg:hidden bg-white p-3 text-xs border-t border-customGray-100">
      <li
        v-for="item in names"
        :key="item.name"
        class="border-b border-customGray-100 py-1.5"
      >
        <div v-for="{ key, label } in columnsMobile" :key="key" class="flex justify-between items-center my-1.5">
          <span class="text-customGray-400">{{ label }}</span>
          <AddressLink v-if="key == 'owner'" :id="item[key]" :format="12" class="text-main" />
          <span v-else class="w-2/3 break-all text-right">{{ item[key] | lookfortime('datetime') }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { FNS_SERVER } from '@/filecoin/filecoin.config'

export default {
  data() {
    return {
      columns: [
        { key: 'owner', label: this.$t('fns.registrations.address') },
        { key: 'name', label: this.$t('fns.registrations.name') },
        { key: 'expires', label: this.$t('fns.registrations.expiration') },
        { key: 'handle', label: this.$t('fns.registrations.handle') }
      ],
      names: [],
      loading: false
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
      this.loading = true
      const data = await this.$axios.$get(`${FNS_SERVER}/registration/list`, { params: { pageSize: 5, page: 0 } })
      this.names = data.data.list
      this.loading = false
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>
