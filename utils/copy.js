const copy = content => {
  const txa = document.createElement('textarea')
  txa.value = content
  document.body.appendChild(txa)
  txa.select()
  document.execCommand('copy')
  document.body.removeChild(txa)
}

export default copy
