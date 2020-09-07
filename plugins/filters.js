import moment from 'moment'
import Vue from 'vue'
import exitCodes from '@/filecoin/exit-codes.json'

function toLocaleString(n) {
  return n.toLocaleString('en') || n.toString()
}

Vue.filter('locale', value => {
  if (typeof value === 'number') {
    return toLocaleString(value)
  } else {
    return addAmountDelimiters(value)
  }
})

Vue.filter('percentage', (x, decimals = 2) => `${(x * 100).toFixed(decimals)}%`)

function addAmountDelimiters(string) {
  return string.replace(
    /^(-?)(\d{1,3})((\d{3})*)(\.\d+|)$/g,
    (_, sign, before, middle, __, after) => sign + before + middle.replace(/(\d{3})/g, ',$1') + after
  )
}

Vue.filter('coin', (value, decimals, precision = null) => {
  if (precision == null) {
    const s = value.toString().padStart(decimals + 1, '0')
    return addAmountDelimiters(`${s.slice(0, -decimals)}.${s.slice(-decimals)}`.replace(/\.?0*$/g, ''))
  } else {
    return addAmountDelimiters((value / 10 ** decimals).toFixed(precision))
  }
})

Vue.filter('filecoin', (value, precision = null, nanoFixed = false) => {
  if (value == null) {
    return 'N/A'
  }
  value = toLocaleString(typeof value === 'string' ? Number(value) : value).replace(/,/g, '')
  const digits = value.includes('.') ? value.indexOf('.') : value.length
  if (value === '0') {
    return '0 FIL'
  } else if (digits <= 7) {
    return `${toLocaleString(Number(value))} attoFIL`
  } else if (digits <= 13) {
    if (nanoFixed) {
      return `${Vue.filter('coin')(value, 9, 0)} nanoFIL`
    } else {
      return `${Vue.filter('coin')(value, 9, precision)} nanoFIL`
    }
  } else {
    return `${Vue.filter('coin')(value, 18, precision)} FIL`
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
  let flag = false
  if (number < 0) {
    number = -number
    flag = true
  }
  while (number >= 2 ** 10) {
    ++metricIndex
    number /= 2 ** 10
  }
  if (precision == null) {
    return flag ? `-${number} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B` : `${number} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B`
  } else {
    return flag ? `-${number.toFixed(precision)} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B` : `${number.toFixed(precision)} ${metricIndex < 0 ? '' : `${metrics[metricIndex]}i`}B`
  }
})

Vue.filter('actor', actor => ({
  account: 'Account',
  cron: 'Cron',
  init: 'Init',
  multisig: 'Multisig',
  paymentchannel: 'Payment Channel',
  reward: 'Reward',
  storagemarket: 'Storage Market',
  storageminer: 'Storage Miner',
  storagepower: 'Storage Power',
  system: 'System',
  verifiedregistry: 'Verified Registry'
}[actor]))

Vue.filter('exit-code', code => exitCodes[code] ?? code)
