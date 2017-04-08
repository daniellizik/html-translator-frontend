import * as constants from './constants'
import { push } from 'react-router-redux'

export const startEditor = (hash) => push(hash) 

// clause

export const activateClause = (clauseIndex) => ({
  type: constants.CLAUSE_ACTIVATE,
  clauseIndex
})

export const removeAllClauses = () => ({
  type: constants.CLAUSE_REMOVE_ALL
})

export const addClause = () => ({
  type: constants.CLAUSE_ADD
})

export const changeClauseName = (clauseIndex, name) => ({
  type: constants.CLAUSE_CHANGE_NAME,
  clauseIndex,
  name
})

export const removeClause = (clauseIndex) => ({
  type: constants.CLAUSE_REMOVE,
  clauseIndex
})

// query

export const removeQuery = (clauseIndex, ruleIndex) => ({
  type: constants.QUERY_REMOVE,
  clauseIndex,
  ruleIndex,
  ruleType: 'QUERY'
})

export const addQuery = (clauseIndex) => ({
  type: constants.QUERY_ADD,
  clauseIndex
})

export const changeTarget = (target, clauseIndex, ruleIndex) => ({
  type: constants.QUERY_CHANGE_TARGET,
  target,
  clauseIndex,
  ruleIndex,
  ruleType: 'QUERY'
})

export const changeTargetValue = (targetValue, clauseIndex, ruleIndex) => ({
  type: constants.QUERY_CHANGE_TARGET_VALUE,
  targetValue,
  clauseIndex,
  ruleIndex
})

export const changeRule = (rule, clauseIndex, ruleIndex) => ({
  type: constants.QUERY_CHANGE_RULE,
  rule,
  clauseIndex,
  ruleIndex,
  ruleType: 'QUERY'
})

export const changeRuleValue = (ruleValue, clauseIndex, ruleIndex) => ({
  type: constants.QUERY_CHANGE_RULE_VALUE,
  ruleValue,
  clauseIndex,
  ruleIndex,
  ruleType: 'QUERY'
})

export const changeRuleValueFlags = (ruleValueFlags, clauseIndex, ruleIndex) => ({
  type: constants.QUERY_CHANGE_RULE_VALUE_FLAGS,
  ruleValueFlags,
  clauseIndex,
  ruleIndex,
  ruleType: 'QUERY'
})

// mutate

export const removeMutation = (clauseIndex, ruleIndex) => ({
  type: constants.MUTATION_REMOVE,
  clauseIndex,
  ruleIndex,
  ruleType: 'MUTATION'
})

export const addMutation = (clauseIndex) => ({
  type: constants.MUTATION_ADD,
  clauseIndex
})

export const activateMutation = (active, clauseIndex, ruleIndex) => ({
  type: constants.MUTATION_ACTIVATE,
  active,
  clauseIndex,
  ruleIndex,
  ruleType: 'MUTATION'
})

export const mutationChangeRule = (rule, clauseIndex, ruleIndex) => ({
  type: constants.MUTATION_CHANGE_RULE,
  rule,
  clauseIndex,
  ruleIndex,
  ruleType: 'MUTATION'
})

export const mutationChangeRuleValue = (ruleValue, clauseIndex, ruleIndex) => ({
  type: constants.MUTATION_CHANGE_RULE_VALUE,
  ruleValue,
  clauseIndex,
  ruleIndex,
  ruleType: 'MUTATION'
})

export const addAttr = (attrKey, attrVal, index) => ({
  type: constants.MUTATION_ADD_ATTR,
  attrKey,
  attrVal,
  index,
  ruleType: 'MUTATION'
})

export const removeAttrByKey = (attrKey, index) => ({
  type: constants.MUTATION_REMOVE_ATTR_BY_KEY,
  attrKey,
  index,
  ruleType: 'MUTATION'
})

export const removeAttrByValue = (attrVal, index) => ({
  type: constants.MUTATION_REMOVE_ATTR_BY_VALUE,
  attrVal,
  index,
  ruleType: 'MUTATION'
})

export const removeAllAttrs = (index) => ({
  type: constants.MUTATION_REMOVE_ALL_ATTRS,
  index,
  ruleType: 'MUTATION'
})
