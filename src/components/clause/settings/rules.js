import * as constants from '../constants'

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

export const REGEX = ({before = '', ruleValue = '', ruleValueFlags = ''}) => {
  if (!before || !ruleValue)
    return false
  if (typeof before !== 'string' || typeof ruleValue !== 'string')
    return false
  if (ruleValueFlags && typeof ruleValueFlags !== 'string')
    return false
  let rx
  try {
    rx = new RegExp(ruleValue.replace(/\//g, '\\\\'), ruleValueFlags)
  }
  catch(e) {
    throw new Error(constants.CLAUSE_ERROR_INVALID_REGEX)
  }
  return rx.test(before)
}

export const HAS_NONE = ({before}) => {
  return before.length === 0
}

export const HAS_AT_LEAST = ({before, ruleValue}) => {
  return before.length >= ruleValue
}


// mutator  

export const ALL_REPLACE = ({ruleValue}) => {
  return ruleValue
}

export const START_OF = ({ ruleValue = '', before = '' }) => {
  return ruleValue + before
}

export const END_OF = ({ ruleValue = '', before = '' }) => {
  return before + ruleValue
}

export const REGEX_REPLACE = ({ruleValue = '', ruleValueFlags = '', targetValue = '', before = ''}) => {
  let rx
  try {
    rx = new RegExp((ruleValue).replace(/\//g, '\\\\'), ruleValueFlags)
  }
  catch(e) {
    throw new Error(constants.CLAUSE_ERROR_INVALID_REGEX)
  }
  return before.replace(rx, targetValue)
}

// implement these later...

export const ADD_ATTR = (base, ...attrs) => {
  return obj
}

export const REMOVE_ATTR = (obj) => {

}

export const REMOVE_ALL_ATTRS = (obj) => {

}
