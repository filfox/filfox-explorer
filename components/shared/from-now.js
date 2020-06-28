import moment from 'moment'

moment.relativeTimeThreshold('ss', 0)

export default {
  name: 'FromNow',
  props: {
    timestamp: {
      validator(timestamp) {
        return timestamp == null || Number.isInteger(timestamp)
      }
    },
    tag: {type: String, default: 'span'},
    format: {type: String, default: 'moment'}
  },
  render(createElement) {
    if (this.timestamp == null) {
      return createElement(this.tag, this.$slots.default)
    } else {
      let display = ''
      if (this.format === 'moment') {
        display = moment(this.timestamp * 1000).fromNow()
      } else if (this.format === 'seconds') {
        const diff = Math.floor(Date.now() / 1000) - this.timestamp
        if (diff === 0) {
          return createElement(this.tag, this.$t('shared.time.justNow'))
        }
        if (diff >= 3600) {
          display = moment(this.timestamp * 1000).fromNow()
        } else {
          if (diff >= 60) {
            display += Math.floor(diff / 60) + this.$t('shared.time.min')
          }
          if (diff % 60) {
            display += diff % 60 + this.$t('shared.time.sec')
          }
          display += this.$t('shared.time.ago')
        }
      }
      return createElement(this.tag, display)
    }
  },
  mounted() {
    this.$interval = setInterval(() => this.$forceUpdate(), 1000)
  },
  beforeDestroy() {
    clearInterval(this.$interval)
  }
}
