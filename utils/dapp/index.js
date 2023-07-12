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

const formatNum = function(num, isCurrency=false) {
  const formatter = new Intl.NumberFormat( 'en-US', { maximumFractionDigits: 1,notation: "compact" , compactDisplay: "short" });
  const newNum = formatter.format(Number(num));
  return isCurrency ? '$'+newNum : newNum;
}

export { getMedalSrc, formatNum };
