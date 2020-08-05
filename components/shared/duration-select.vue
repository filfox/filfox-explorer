<template>
  <el-dropdown
    v-if="portable"
    trigger="click"
    :hide-on-click="true"
    class="border border-background px-2 rounded-sm"
    @command="command => duration = command"
  >
    <span class="el-dropdown-link text-sm">
      {{ durationName }} <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item in durations" :key="item.value" :command="item.value">
        {{ item.display }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <div v-else>
    <el-radio-group v-model="duration" size="mini" fill="#1a4fc9">
      <el-radio-button v-for="item in durations" :key="item.value" :label="item.value">
        {{ item.display }}
      </el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, required: true },
    portable: { type: Boolean, default: false }
  },
  data() {
    return {
      duration: this.value,
      durations: [
        { value: '24h', display: `24${this.$t('shared.time.hour')}` },
        { value: '7d', display: `7${this.$t('shared.time.day')}` },
        { value: '30d', display: `30${this.$t('shared.time.day')}` },
        { value: '1y', display: `1${this.$t('shared.time.year')}` }
      ]
    }
  },
  computed: {
    durationName() {
      return this.durations.find(x => x.value === this.duration).display
    }
  },
  watch: {
    value() {
      this.duration = this.value
    },
    duration() {
      this.$emit('input', this.duration)
    }
  }
}
</script>
