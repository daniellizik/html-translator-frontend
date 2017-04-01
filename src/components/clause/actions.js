import * as constants from './constants'
import { push } from 'react-router-redux'

/** 
 * startEditor
 * @param {string} hash
 */
export const startEditor = (hash) => push(hash) 

export const activateClause = (clauseIndex) => ({
  type: constants.CLAUSE_ACTIVATE,
  clauseIndex
})

/** 
 * addClause
 */
export const addClause = () => ({
  type: constants.CLAUSE_ADD
})

export const changeClauseName = (clauseIndex, name) => ({
  type: constants.CLAUSE_CHANGE_NAME,
  clauseIndex,
  name
})

/** 
 * removeClause
 * @param {number} index
 */
export const removeClause = (clauseIndex) => ({
  type: constants.CLAUSE_REMOVE,
  clauseIndex
})

/** 
 * removeQuery
 * @param {number} index
 */
export const removeQuery = (clauseIndex, queryIndex) => ({
  type: constants.QUERY_REMOVE,
  clauseIndex,
  queryIndex
})

/** 
 * addQuery
 * @param {number} clauseIndex
 */
export const addQuery = (clauseIndex) => ({
  type: constants.QUERY_ADD,
  clauseIndex
})

/** 
 * changeTarget
 * @param {string} target
 * @param {number} clauseIndex
 * @param {number} queryIndex
 */
export const changeTarget = (target, clauseIndex, queryIndex) => ({
  type: constants.QUERY_CHANGE_TARGET,
  target,
  clauseIndex,
  queryIndex
})

/** 
 * changeTargetValue
 * @param {string} targetValue
 * @param {number} clauseIndex
 * @param {number} queryIndex
 */
export const changeTargetValue = (targetValue, clauseIndex, queryIndex) => ({
  type: constants.QUERY_CHANGE_TARGET_VALUE,
  targetValue,
  clauseIndex,
  queryIndex
})

/** 
 * changeRule
 * @param {string} rule
 * @param {number} clauseIndex
 * @param {number} queryIndex
 */
export const changeRule = (rule, clauseIndex, queryIndex) => ({
  type: constants.QUERY_CHANGE_RULE,
  rule,
  clauseIndex,
  queryIndex
})

/** 
 * changeRuleValue
 * @param {string} ruleValue
 * @param {number} clauseIndex
 * @param {number} queryIndex
 */
export const changeRuleValue = (ruleValue, clauseIndex, queryIndex) => ({
  type: constants.QUERY_CHANGE_RULE_VALUE,
  ruleValue,
  clauseIndex,
  queryIndex
})

/** 
 * changeRuleValueFlags
 * @param {string} ruleValueFlags
 * @param {number} clauseIndex
 * @param {number} queryIndex
 */
export const changeRuleValueFlags = (ruleValueFlags, clauseIndex, queryIndex) => ({
  type: constants.QUERY_CHANGE_RULE_VALUE_FLAGS,
  ruleValueFlags,
  clauseIndex,
  queryIndex
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
