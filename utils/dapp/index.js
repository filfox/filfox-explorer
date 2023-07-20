const getMedalSrc = (ranking) => {
  switch(ranking) {
    case 1:
      return require('@/assets/img/dapp/1st.svg');
    case 2:
      return require('@/assets/img/dapp/2nd.svg');
    case 3:
      return require('@/assets/img/dapp/3rd.svg');
    default:
      return "";
  }
}

const formatNum = function(num) {
  const formatter = new Intl.NumberFormat( 'en-US', { maximumFractionDigits: 1,notation: "compact" , compactDisplay: "short" });
  return formatter.format(Number(num));
}

function getTextWith(text, fontStyle) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font = fontStyle || '16px'
  const dimension = context.measureText(text)
  return dimension.width
}

export { getMedalSrc, formatNum, getTextWith };
