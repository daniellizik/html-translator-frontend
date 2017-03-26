import * as constants from './constants'
import { push } from 'react-router-redux'

/** 
 * startEditor
 * @param {string} hash
 */
export const startEditor = (hash) => push(hash) 

/** 
 * addClause
 * @param {string} stateKey
 */
export const addClause = (stateKey) => ({
  type: constants.ADD_CLAUSE,
  stateKey
})

/** 
 * removeClause
 * @param {string} stateKey
 * @param {number} index
 */
export const removeClause = (stateKey, index) => ({
  type: constants.REMOVE_CLAUSE,
  stateKey,
  index
})

/** 
 * changeTarget
 * @param {string} stateKey
 * @param {string} target
 * @param {number} index
 */
export const changeTarget = (stateKey, target, index) => ({
  type: constants.CHANGE_TARGET,
  stateKey,
  target,
  index
})

/** 
 * changeTargetValue
 * @param {string} stateKey
 * @param {string} targetValue
 * @param {number} index
 */
export const changeTargetValue = (stateKey, targetValue, index) => ({
  type: constants.CHANGE_TARGET_VALUE,
  targetValue,
  stateKey,
  index
})

/** 
 * changeRule
 * @param {string} stateKey
 * @param {string} rule
 * @param {number} index
 */
export const changeRule = (stateKey, rule, index) => ({
  type: constants.CHANGE_RULE,
  stateKey,
  rule,
  index
})

/** 
 * changeRuleValue
 * @param {string} stateKey
 * @param {string} ruleValue
 * @param {number} index
 */
export const changeRuleValue = (stateKey, ruleValue, index) => ({
  type: constants.CHANGE_RULE_VALUE,
  stateKey,
  ruleValue,
  index
})

/** 
 * changeRuleValueFlags
 * @param {string} stateKey
 * @param {string} ruleValueFlags
 * @param {number} index
 */
export const changeRuleValueFlags = (stateKey, ruleValueFlags, index) => ({
  type: constants.CHANGE_FLAGS,
  stateKey,
  ruleValueFlags,
  index
})

/** 
 * addAttr
 * @param {string} stateKey
 * @param {string} attrKey
 * @param {string} attrVal
 * @param {number} index
 */
export const addAttr = (stateKey, attrKey, attrVal, index) => ({
  type: constants.ADD_ATTR,
  stateKey,
  attrKey,
  attrVal,
  index
})

export const removeAttrByKey = (stateKey, attrKey, index) => ({
  type: constants.REMOVE_ATTR_BY_KEY,
  stateKey,
  attrKey,
  index
})

export const removeAttrByValue = (stateKey, attrVal, index) => ({
  type: constants.REMOVE_ATTR_BY_VALUE,
  stateKey,
  attrVal,
  index
})

export const removeAllAttrs = (stateKey, index) => ({
  type: constants.REMOVE_ALL_ATTRS,
  stateKey,
  index
})
