export const getQueryString = (str, name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = str.match(reg)
  return r ? unescape(r[2]) : null
}
