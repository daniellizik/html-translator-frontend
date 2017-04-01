export const EQUALS = ({before, targetValue}) => {
  if (!before || !targetValue)
    return false
  if (before === targetValue)
    return true
  else
    return false
}

export const NOT_EQUALS = ({before, targetValue}) => {
  if (!before || !targetValue)
    return false
  if (typeof before !== 'string' || typeof targetValue !== 'string')
    return false
  if (before !== targetValue)
    return true
  else
    return false
}

export const LIKE = ({before, targetValue}) => {
  if (!before || !targetValue)
    return false
  if (typeof before !== 'string' || typeof targetValue !== 'string')
    return false
  if (before.toLowerCase().indexOf(targetValue.toLowerCase()) > -1)
    return true
  else
    return false
}

export const NOT_LIKE = ({before, targetValue}) => {
  if (!before || !targetValue)
    return false
  if (before.toLowerCase().indexOf(targetValue.toLowerCase()) > -1)
    return false
  else
    return true
}

export const REGEX = ({before, ruleValue, ruleValueFlags}) => {
  if (!before || !ruleValue)
    return false
  if (typeof before !== 'string' || typeof ruleValue !== 'string')
    return false
  if (ruleValueFlags && typeof ruleValueFlags !== 'string')
    return false
  const rx = new RegExp(ruleValue.replace(/\//g, '\\\\'), ruleValueFlags || '')
  return rx.test(before)
}

export const allReplace = (obj) => {
  return obj.targetValue
}

export const regexReplace = (obj) => {
  if (!obj || typeof obj !== 'object')
    return ''
  const rx = new RegExp((obj.ruleValue || '').replace(/\//g, '\\\\'), obj.ruleValueFlags || '')
  return (obj[obj.target] || '').replace(rx, obj.targetValue || '')
}

export const startOf = ({ targetValue = '', before = '' }) => {
  return targetValue + before
}

export const endOf = ({ targetValue = '', before = '' }) => {
  return before + targetValue
}

export const addAttr = (base, ...attrs) => {
  return obj
}

export const removeAttr = (obj) => {

}

export const removeAllAttrs = (obj) => {

}
