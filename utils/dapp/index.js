function formatNum(num) {
  const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, notation: 'compact', compactDisplay: 'short' })
  return formatter.format(Number(num))
}

function getTextWith(text, fontStyle) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font = fontStyle || '16px'
  const dimension = context.measureText(text)
  return dimension.width
}

export { formatNum, getTextWith }
