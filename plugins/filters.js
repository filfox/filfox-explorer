import moment from 'moment'
import Vue from 'vue'

Vue.filter('percentage', (x, decimals = 2) => `${(x * 100).toFixed(decimals)}%`)

function addAmountDelimiters(string) {
  return string.replace(
    /^(-?)(\d{1,3})((\d{3})*)(\.\d+|)$/g,
    (_, sign, before, middle, __, after) => sign + before + middle.replace(/(\d{3})/g, ',$1') + after
  )
}

Vue.filter('coin', (value, precision = null) => {
  if (precision == null) {
    const s = value.toString().padStart(19, '0')
    return addAmountDelimiters(`${s.slice(0, -18)}.${s.slice(-18)}`.replace(/\.?0*$/g, ''))
  } else {
    return addAmountDelimiters((value / 1e18).toFixed(precision))
  }
})

Vue.filter('filecoin', (value, precision = null) => {
  if (value == null) {
    return 'N/A'
  }
  if (value === '0') {
    return '0 FIL'
  } else if (value.length <= 9) {
    return `${Number(value).toLocaleString()} AttoFIL`
  } else {
    return `${Vue.filter('coin')(value, precision)} FIL`
  }
})

Vue.filter('timestamp', (time, type = 'datetime') => {
  if (time == null) {
    return '-'
  } else {
    return moment(time * 1000).format({
      datetime: 'YYYY-MM-DD HH:mm:ss',
      date: 'YYYY-MM-DD',
      time: 'HH:mm:ss'
    }[type])
  }
})

Vue.filter('size_metric', (number, precision = null) => {
  const metrics = 'kMGTPEZY'
  let metricIndex = -1
  number = Number(number)
  var flag = false
  if (number < 0) {
      number = -number
      flag = true
  }
  while (number >= 2 ** 10) {
    ++metricIndex
    number /= 2 ** 10
  }
  if (precision == null) {
    return flag? `-${number} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B` : `${number} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B`
  } else {
    return flag? `-${number.toFixed(precision)} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B` : `${number.toFixed(precision)} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B`
  }
})