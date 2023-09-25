export const ADDRESS_0X0 = '0x0000000000000000000000000000000000000000'

export function matchTabToUrl(tabNum) {
  const url = new URL(window.location.href)
  const params = url.searchParams

  if (params.has('t')) {
    params.set('t', tabNum)
  } else {
    params.append('t', tabNum)
  }

  const newUrl = `${url.origin + url.pathname}?${params.toString()}`
  window.history.replaceState(null, null, newUrl)
}

export function isFil0x0Address(address) {
  return /^(f|t)410fa{32}onc6iji$/.test(address)
}

export function is0x0Address(address) {
  return isFil0x0Address(address) || address === ADDRESS_0X0
}

export function resolve0x0Address(address) {
  return is0x0Address(address) ? ADDRESS_0X0 : address
}
