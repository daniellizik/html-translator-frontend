import * as constants from './constants'
import { push } from 'react-router-redux'

/** 
 * startEditor
 * @param {string} hash
 */
export const startEditor = (hash) => push(hash) 

/** 
 * addClause
 */
export const addClause = () => ({
  type: constants.CLAUSE_ADD
})

/** 
 * removeClause
 * @param {number} index
 */
export const removeClause = (index) => ({
  type: constants.CLAUSE_REMOVE,
  index
})

/** 
 * changeTarget
 * @param {string} target
 * @param {number} index
 */
export const changeTarget = (target, index) => ({
  type: constants.QUERY_CHANGE_TARGET,
  target,
  index
})

/** 
 * changeTargetValue
 * @param {string} targetValue
 * @param {number} index
 */
export const changeTargetValue = (targetValue, index) => ({
  type: constants.QUERY_CHANGE_TARGET_VALUE,
  targetValue,
  index
})

/** 
 * changeRule
 * @param {string} rule
 * @param {number} index
 */
export const changeRule = (rule, index) => ({
  type: constants.QUERY_CHANGE_RULE,
  rule,
  index
})

/** 
 * changeRuleValue
 * @param {string} ruleValue
 * @param {number} index
 */
export const changeRuleValue = (ruleValue, index) => ({
  type: constants.QUERY_CHANGE_RULE_VALUE,
  ruleValue,
  index
})

/** 
 * changeRuleValueFlags
 * @param {string} ruleValueFlags
 * @param {number} index
 */
export const changeRuleValueFlags = (ruleValueFlags, index) => ({
  type: constants.QUERY_CHANGE_RULE_VALUE_FLAGS,
  ruleValueFlags,
  index
})

/** 
 * addAttr
 * @param {string} attrKey
 * @param {string} attrVal
 * @param {number} index
 */
export const addAttr = (attrKey, attrVal, index) => ({
  type: constants.ADD_ATTR,
  attrKey,
  attrVal,
  index
})

export const removeAttrByKey = (attrKey, index) => ({
  type: constants.REMOVE_ATTR_BY_KEY,
  attrKey,
  index
})

export const removeAttrByValue = (attrVal, index) => ({
  type: constants.REMOVE_ATTR_BY_VALUE,
  attrVal,
  index
})

export const removeAllAttrs = (index) => ({
  type: constants.REMOVE_ALL_ATTRS,
  index
})
